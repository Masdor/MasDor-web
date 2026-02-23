# Verbesserungsplan LAB-ROOT v4

## Phase 1 — Kritisch (sofort)

### 1.1 Verbleibende Inline-Styles entfernen
**Dateien:** Navbar.tsx, Services.tsx, Process.tsx, About.tsx, Contact.tsx, Reveal.tsx, HoverCard.tsx
**Problem:** 13 Stellen nutzen noch `style={{}}` statt CSS Modules
**Lösung:**
- Services: Dynamische Accent-Farben über CSS Custom Properties + `data-accent` Attribut steuern
- Shared-Subtitles: `.subtitleCentered` Klasse für `maxWidth + margin: auto` Pattern
- Contact: `:not(:last-child)` statt bedingtem marginBottom
- Reveal: `transitionDelay` über CSS Custom Property `--delay` setzen
- HoverCard: Hover-States rein über CSS `:hover` + CSS Custom Property `--accent`

### 1.2 Footer-Farben fixen
**Datei:** Footer.module.css:65,69
**Problem:** Hardcoded `#555` statt CSS Variable
**Lösung:** `color: var(--text-secondary)` verwenden

### 1.3 ARIA-Attribute ergänzen
**Dateien:** Contact.tsx, Services.tsx, alle Button-Komponenten
**Was fehlt:**
- Contact-Form: `aria-required`, `aria-invalid`, `aria-describedby`, `htmlFor` auf Labels
- Services-Tabs: `role="tablist"`, `role="tab"`, `aria-selected`, `aria-controls`
- Alle `<button>`: explizites `type="button"` (verhindert ungewolltes Form-Submit)

### 1.4 Unnötige Font-Varianten entfernen
**Problem:** Cyrillic, Greek, Vietnamese Subsets werden geladen (43 KB unnötig für deutsche Seite)
**Lösung:** Nur `latin` Subset importieren
```tsx
import '@fontsource-variable/dm-sans/wght.css'  // → latin-only import
```
Oder: Self-hosted WOFF2 nur mit Latin-Range (wie bereits im public/fonts/ vorbereitet)

### 1.5 og:image + apple-touch-icon
**Datei:** index.html
**Problem:** Social-Media-Sharing zeigt kein Vorschaubild
**Lösung:**
- OG-Image erstellen (1200×630px) mit LAB-ROOT Branding
- Apple-Touch-Icon (180×180px)
- Meta-Tags in index.html ergänzen

---

## Phase 2 — Hoch (zeitnah)

### 2.1 useCounter Hook fixen
**Datei:** hooks/useCounter.ts
**Probleme:**
- Kein `isMounted`-Guard → setState nach Unmount möglich
- Animation startet nicht neu bei Parameter-Änderung
**Lösung:** `isMounted` Flag + Reset-Logik bei `trigger === false`

### 2.2 Tablet-Breakpoint (768–1024px)
**Dateien:** Process.module.css, About.module.css, Services.module.css
**Problem:** 5-Spalten-Grid springt direkt auf 1 Spalte
**Lösung:**
- Process: `repeat(3, 1fr)` bei Tablet
- About Values: `repeat(2, 1fr)` bei Tablet
- Services Content-Grid: Stacken bei < 900px

### 2.3 Service-Accent-Farben in CSS Variables
**Dateien:** global.css, services.ts, Services.tsx
**Problem:** Accent-Farben (#22c55e, #CFA956, #3b82f6) als Inline-Styles
**Lösung:**
```css
:root {
  --color-medical: #22c55e;
  --color-industrial: var(--gold);
  --color-it: #3b82f6;
}
```
Services.tsx: `data-service="medical"` Attribut + CSS-Selektoren

### 2.4 React.memo für scroll-intensive Komponenten
**Dateien:** Navbar.tsx, HoverCard.tsx
**Problem:** Navbar rendert bei jedem Scroll-Event alle NavLinks neu
**Lösung:** NavLink als `React.memo()` Wrapper

### 2.5 ErrorBoundary Logging
**Datei:** ErrorBoundary.tsx
**Problem:** Fehler werden nicht geloggt → kein Debugging in Production möglich
**Lösung:** `componentDidCatch` mit console.error + optionalem Error-Reporting

---

## Phase 3 — Mittel (Qualität)

### 3.1 PWA-Manifest
- `/public/manifest.json` erstellen
- `<link rel="manifest">` in index.html
- Icons generieren (192×192, 512×512)

### 3.2 Contact-Form Backend
**Problem:** Formular sendet keine Daten — nur Fake-Erfolg
**Optionen:**
- A) `mailto:` Link als Fallback (kein Backend nötig)
- B) Formspree/Netlify Forms Integration
- C) Eigene API-Route mit E-Mail-Versand

### 3.3 TypeScript Strict Checks
**Datei:** tsconfig.app.json
- `noUnusedLocals: true`
- `noUnusedParameters: true`
- Non-null Assertions durch Guards ersetzen

### 3.4 CSS `composes` refaktorieren
**Datei:** shared.module.css
- `composes` durch eigenständige Klassen ersetzen (weniger Specificity-Probleme)

### 3.5 Testing Setup
- Vitest + React Testing Library konfigurieren
- Tests für: useContactForm, useCounter, Contact-Validierung, Services-Tab-Wechsel
