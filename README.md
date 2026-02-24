# LAB-ROOT — Engineering für Medical, Industrial & IT

Firmenwebsite von [LAB-ROOT](https://lab-root.com) – spezialisierte technische Dienstleistungen für Medical Systems, Industrial Automation und IT-Infrastruktur.

## Tech Stack

- React 19 + TypeScript
- Vite 6 (Build + Dev)
- CSS Modules
- Vitest + React Testing Library

## Entwicklung

```bash
npm install
npm run dev        # Dev-Server auf localhost:5173
npm test           # Tests ausführen
npm run build      # Production-Build
npm run build:report  # Build + Bundle-Analyse
```

## Deployment

Docker-basiert mit Nginx Alpine:

```bash
docker compose up -d --build
```

Der Container exponiert Port 80 und wird über Nginx Proxy Manager mit SSL terminiert.

## Projektstruktur

```
src/
├── components/       # React-Komponenten + CSS Modules
├── components/ui/    # Wiederverwendbare UI-Elemente
├── context/          # NavigationContext (Scroll, Menu)
├── data/             # Statische Daten (Services, Team, Navigation)
├── hooks/            # Custom Hooks (useInView, useCounter, useContactForm)
├── styles/           # Globale Styles, Fonts, Shared CSS Modules
├── types/            # TypeScript-Interfaces
└── test/             # Test-Setup
```
