# LAB-ROOT Website

Unternehmenswebsite von **LAB-ROOT** (Root Trading) — spezialisierte technische Dienstleistungen
fuer Medical Systems, Industrial Automation und IT-Infrastruktur.

Technologie-Stack: **React 19**, **TypeScript**, **Vite 6**, **CSS Modules**.

---

## Voraussetzungen

- Node.js >= 18
- npm >= 9

## Installation

```bash
npm install
```

## Entwicklung

```bash
npm run dev
```

Startet den Vite-Entwicklungsserver mit Hot Module Replacement unter `http://localhost:5173`.

## Verfuegbare Skripte

| Befehl            | Beschreibung                                |
| ----------------- | ------------------------------------------- |
| `npm run dev`     | Entwicklungsserver starten                  |
| `npm run build`   | TypeScript pruefen und Produktions-Build    |
| `npm run preview` | Produktions-Build lokal ansehen             |
| `npm run lint`    | ESLint ausfuehren                           |
| `npm test`        | Vitest-Tests ausfuehren (45 Tests)          |

## Projektstruktur

```
src/
├── components/          # React-Komponenten
│   ├── ui/              # Wiederverwendbare UI-Bausteine
│   │   ├── BackToTop    # Zurueck-nach-oben-Button
│   │   ├── Counter      # Animierter Zaehler
│   │   ├── HoverCard    # Hover-Karte fuer Services
│   │   ├── ParticleField# Partikel-Hintergrundanimation
│   │   └── Reveal       # Scroll-Einblend-Animation
│   ├── Navbar           # Navigation mit Mobile-Menue
│   ├── Hero             # Startbereich mit Partikelfeld
│   ├── Services         # Leistungen (Tabs mit Tastaturnavigation)
│   ├── Process          # 5-Schritte-Methode
│   ├── TrustBar         # Kompetenz-Tags (ISO, IEC, GMP, ...)
│   ├── About            # Team und Unternehmen
│   ├── Contact          # Kontaktformular mit Validierung
│   ├── Footer           # Fusszeile
│   ├── Legal            # Impressum / Datenschutz (Modal)
│   ├── CookieConsent    # Cookie-Banner
│   ├── ErrorBoundary    # Fehlergrenze fuer Lazy-Komponenten
│   └── __tests__/       # Komponenten-Tests
│
├── context/
│   └── NavigationContext # Scroll-Navigation & Menue-Zustand
│
├── data/                # Statische Inhalte (getrennt von Komponenten)
│   ├── navigation.ts    # Navigationslinks
│   ├── services.ts      # Drei Leistungsbereiche
│   ├── process.ts       # Methodikschritte
│   ├── team.ts          # Team, Kontaktpersonen, Firmeninfos
│   └── trust-tags.ts    # Kompetenz- und Compliance-Tags
│
├── hooks/               # Custom React Hooks
│   ├── useActiveSection # Erkennung der aktiven Sektion
│   ├── useContactForm   # Formular-State mit async Submit
│   ├── useCounter       # rAF-basierter Zaehler
│   ├── useInView        # IntersectionObserver-Wrapper
│   ├── useScrolled      # Scroll-Position-Erkennung
│   └── __tests__/       # Hook-Tests
│
├── styles/              # Globale Styles und Variablen
│   ├── fonts.css        # Schriftarten (DM Sans, JetBrains Mono)
│   ├── global.css       # CSS Custom Properties, Reset
│   └── shared.module.css# Gemeinsame CSS-Module-Klassen
│
├── types/
│   └── index.ts         # TypeScript-Typdefinitionen
│
└── test/
    └── setup.ts         # Vitest-Setup (jest-dom, Mocks)
```

## Architektur

### Seitenaufbau

Die Website ist eine Single-Page-Application mit folgendem Aufbau:

```
Navbar → Hero → Services → Process → TrustBar → About → Contact → Footer
```

Alle Sektionen unterhalb von Hero werden per `React.lazy()` und `Suspense` nachgeladen
(Code-Splitting). Eine `ErrorBoundary` faengt Ladefehler ab.

### Navigation

Der `NavigationContext` stellt `scrollTo`, `menuOpen`, `scrolled` und `activeSection`
zentral bereit. Komponenten greifen ueber den `useNavigation()`-Hook darauf zu —
kein Prop-Drilling noetig.

### Performance

- **Code-Splitting** — Lazy Loading aller Sektionen nach dem Hero
- **rAF-Throttling** — Scroll-Handler in `useScrolled` und `useActiveSection`
- **Debounced Resize** — ParticleField reagiert verzoegert auf Fensteraenderungen
- **CSS-Transitions** — BackToTop per Opacity/Transform statt bedingtem Rendern
- **requestAnimationFrame** — Counter-Animation statt `setInterval`

### Barrierefreiheit

- Semantisches HTML mit `<main>`, `<nav>`, `<footer>` Landmarks
- Focus-Trap und ESC-Schliessen in Modals (Legal, CookieConsent)
- Roving Tabindex und Pfeiltasten-Navigation in den Service-Tabs
- `aria-labelledby`, `aria-describedby`, `aria-controls` Verknuepfungen
- Formularfelder mit feldspezifischen Fehlermeldungen
- Skip-to-Content-Link

### Kontaktformular

- Validierung bei `onBlur` und live bei Eingabe nach erstem Fehler
- Async-Submit mit Ladezustand und Netzwerk-Fehlerbehandlung
- API-Endpunkt konfigurierbar ueber `VITE_CONTACT_API` Umgebungsvariable

## Tests

```bash
npm test
```

45 Tests in 6 Dateien, aufgeteilt in Hook- und Komponenten-Tests:

- `useContactForm` — Validierung, async Submit, Reset
- `useCounter` — Zaehleranimation mit rAF
- `useScrolled` — Scroll-Erkennung
- `useInView` — IntersectionObserver-Integration
- `Legal` — Focus-Trap, Tastatur, ARIA-Attribute
- `Contact` — Formularvalidierung, Submit-Flow, Fehlerzustaende

## Assets generieren

Die PWA-Icons und das Open-Graph-Bild werden aus der SVG-Favicon generiert:

```bash
node scripts/generate-icons.mjs
```

Erzeugt: `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `og-image.png`.

## Umgebungsvariablen

| Variable           | Standard                              | Beschreibung                     |
| ------------------ | ------------------------------------- | -------------------------------- |
| `VITE_CONTACT_API` | `https://lab-root.com/api/contact`    | Endpunkt fuer Kontaktformular    |

## Technologien

| Kategorie     | Technologie                                        |
| ------------- | -------------------------------------------------- |
| Framework     | React 19                                           |
| Sprache       | TypeScript 5.7 (strict)                            |
| Build-Tool    | Vite 6                                             |
| Styling       | CSS Modules + CSS Custom Properties                |
| Schriftarten  | DM Sans, JetBrains Mono (fontsource, variabel)     |
| Tests         | Vitest, Testing Library, jsdom                     |
| Linting       | ESLint 9 mit react-hooks und react-refresh Plugins |
| Bildgenerierung | sharp (Dev-Dependency)                           |

## Lizenz

Proprietaer — (c) LAB-ROOT / Root Trading
