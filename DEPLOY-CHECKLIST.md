# LAB-ROOT Pre-Deploy Checklist

## Build & Quality
- [x] `npm run check` (typecheck + lint + test + build) passes
- [x] Build output in `dist/` enthält komprimierte Assets (.gz, .br) — 30 .gz + 30 .br Dateien
- [x] Keine Konsolen-Warnungen im Build-Output

## SEO & Meta
- [x] `<title>` korrekt — "LAB-ROOT | Engineering für Medical, Industrial & IT"
- [x] `<meta description>` vorhanden und < 160 Zeichen
- [x] Open Graph Tags (og:title, og:description, og:image) komplett
- [x] Twitter Card Tags vorhanden
- [x] 2 JSON-LD Blöcke (LocalBusiness + Graph)
- [x] FAQPage Schema vorhanden
- [x] `robots.txt` erlaubt Crawling
- [x] `sitemap.xml` hat 1 URL (kein Hash-Fragment)
- [x] `canonical` URL korrekt (https://lab-root.com)

## Accessibility
- [x] Skip-to-Content Link vorhanden — "Zum Inhalt springen"
- [x] Alle Formularfelder haben Labels
- [x] Alle interaktiven Elemente sind per Tab erreichbar
- [x] `prefers-reduced-motion` respektiert
- [x] `forced-colors` Media Query vorhanden
- [x] Alle Modals haben Focus-Trap und Escape-Close

## Performance
- [x] Fonts haben `font-display: swap`
- [x] Fonts werden preloaded (Vite Plugin)
- [x] Lazy-Loading für Below-the-Fold Sections — 11 lazy() Imports
- [x] `content-visibility: auto` auf Sections
- [x] Keine `will-change` Leaks (nur temporär in Reveal)

## Security
- [x] CSP Meta-Tag wird im Build injiziert
- [x] Honeypot auf Kontaktformular
- [x] Keine Secrets im Frontend-Code
- [x] `.env.example` vorhanden

## Deployment
- [x] Dockerfile vorhanden und funktional
- [x] nginx.conf mit Caching und Security Headers
- [x] .dockerignore vorhanden
- [x] Version in package.json aktualisiert (5.0.0)

## Docker Build

```bash
docker build --build-arg UMAMI_WEBSITE_ID=<website-id> -t lab-root-web:5.x .
```

- `UMAMI_WEBSITE_ID`: Website-ID aus dem Umami-Dashboard (optional, leer = Analytics deaktiviert)
