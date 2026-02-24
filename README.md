# LAB-ROOT Website

> Engineering für Medical, Industrial & IT — [lab-root.com](https://lab-root.com)

## Tech Stack

- **React 19** + TypeScript
- **Vite 6** — Build, HMR, Font-Preloading, CSP-Injection
- **CSS Modules** — Scoped Styles mit Design Tokens
- **Lucide React** — SVG Icon System
- **Vitest** + Testing Library — 137 Tests

## Development

```bash
npm install
npm run dev          # Development server (http://localhost:5173)
npm run build        # Production build
npm run preview      # Preview production build
npm run test         # Run all tests
npm run test:watch   # Tests im Watch-Modus
npm run test:ui      # Vitest UI
npm run lint         # ESLint
npm run build:report # Build mit Bundle-Analyse
```

## Project Structure

```
src/
├── components/       # React Komponenten
│   ├── ui/           # Wiederverwendbare UI (Reveal, Icon, HoverCard, etc.)
│   └── __tests__/    # Komponenten-Tests
├── context/          # React Context (Navigation)
├── data/             # Statische Daten (Services, Projects, FAQ, etc.)
├── hooks/            # Custom Hooks (useContactForm, useCounter, useInView)
├── styles/           # Globale Styles + Shared CSS Modules
├── test/             # Test Setup
└── types/            # TypeScript Interfaces
public/               # Statische Assets (Favicon, OG-Image, Manifest)
```

## Sections

| Section | ID | Beschreibung |
|---|---|---|
| Hero | `#home` | Tagline, Stats, CTA |
| Services | `#leistungen` | 3 Tabs (Medical/Industrial/IT) mit Focus-Cards |
| Process | `#methode` | 5-Schritte Engineering-Prozess |
| TrustBar | — | Kompetenz-Tags (ISO, IEC, Docker, etc.) |
| About | `#about` | Werte + Team |
| Portfolio | `#referenzen` | 9 Projekte mit Filter und Detail-Modal |
| FAQ | `#faq` | 6 Fragen im Akkordeon |
| CTA Banner | — | Call-to-Action → Kontakt |
| Contact | `#kontakt` | Formular + Kontaktdaten |

## Deployment

Die Seite läuft als Docker-Container hinter Nginx Proxy Manager auf `194.164.54.111`.

```bash
# Build
npm run build

# Docker
docker build -t lab-root-web .
docker run -d --name lab-root-web -p 8080:80 lab-root-web
```

Nginx-Konfiguration: siehe `nginx.conf` im Projekt.

## Design System

- **Farben**: `--gold` (#CFA956), `--dark` (#0b0f15), Service-Akzente (Medical grün, IT blau)
- **Fonts**: DM Sans (UI), JetBrains Mono (Mono/Labels)
- **Spacing**: 4px Grid (`--sp-1` bis `--sp-24`)
- **Animations**: `prefers-reduced-motion` respektiert, CSS-only
- **Accessibility**: WCAG 2.1 AA, forced-colors, prefers-contrast
