# ─── Stage 1: Compile Brotli modules ───
FROM nginx:1.27-alpine AS brotli-build
WORKDIR /root

RUN apk add --no-cache build-base git pcre2-dev zlib-dev openssl-dev \
    && NGINX_VERSION=$(nginx -v 2>&1 | sed 's/.*nginx\///') \
    && wget https://nginx.org/download/nginx-${NGINX_VERSION}.tar.gz \
    && tar zxf nginx-${NGINX_VERSION}.tar.gz \
    && git clone --recurse-submodules https://github.com/google/ngx_brotli.git \
    && cd nginx-${NGINX_VERSION} \
    && ./configure --with-compat --add-dynamic-module=../ngx_brotli \
    && make modules \
    && mkdir -p /brotli-modules \
    && cp objs/ngx_http_brotli_filter_module.so /brotli-modules/ \
    && cp objs/ngx_http_brotli_static_module.so /brotli-modules/

# ─── Stage 2: Build application ───
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# ─── Stage 3: Production ───
FROM nginx:1.27-alpine

# Build-Metadaten
ARG BUILD_DATE
ARG VCS_REF

LABEL org.opencontainers.image.title="LAB-ROOT Website" \
      org.opencontainers.image.description="Engineering für Medical, Industrial & IT" \
      org.opencontainers.image.url="https://lab-root.com" \
      org.opencontainers.image.source="https://github.com/Masdor/MasDor-web" \
      org.opencontainers.image.created="${BUILD_DATE}" \
      org.opencontainers.image.revision="${VCS_REF}"

# Install Brotli modules
COPY --from=brotli-build /brotli-modules/ngx_http_brotli_filter_module.so /usr/lib/nginx/modules/
COPY --from=brotli-build /brotli-modules/ngx_http_brotli_static_module.so /usr/lib/nginx/modules/

# Load Brotli modules in nginx main config
RUN sed -i '1i load_module /usr/lib/nginx/modules/ngx_http_brotli_static_module.so;' /etc/nginx/nginx.conf \
    && sed -i '1i load_module /usr/lib/nginx/modules/ngx_http_brotli_filter_module.so;' /etc/nginx/nginx.conf

# Copy application and server config
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy security headers snippet (inkludiert in jedem location-Block)
RUN mkdir -p /etc/nginx/snippets
COPY security-headers.conf /etc/nginx/snippets/security-headers.conf

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget -qO- http://localhost:80/ || exit 1

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
