/// <reference types="vitest/config" />
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { compression } from 'vite-plugin-compression2'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

/** Injects <link rel="preload"> tags for .woff2 font assets discovered during the build. */
function fontPreloadPlugin(): Plugin {
  return {
    name: 'font-preload',
    apply: 'build',
    enforce: 'post',
    transformIndexHtml: {
      order: 'post',
      handler(_html, ctx) {
        if (!ctx.bundle) return []
        return Object.keys(ctx.bundle)
          .filter(name => name.endsWith('.woff2'))
          .map(name => ({
            tag: 'link' as const,
            attrs: { rel: 'preload', as: 'font', type: 'font/woff2', crossorigin: '', href: `/${name}` },
            injectTo: 'head-prepend' as const,
          }))
      },
    },
  }
}

export default defineConfig({
  plugins: [
    react(),
    fontPreloadPlugin(),
    compression({
      algorithms: ['gzip', 'brotliCompress'],
      exclude: [/\.(br)$/, /\.(gz)$/],
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'es2022',
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-core': ['react', 'react-dom'],
          'icons': ['lucide-react'],
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    css: { modules: { classNameStrategy: 'non-scoped' } },
  },
})
