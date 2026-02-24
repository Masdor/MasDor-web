# Changelog

## [5.0.0] — 2026-02-24

### Added
- **Portfolio Section** — 9 filterable Referenzprojekte (Medical, Industrial, IT) mit Detail-Modal
- **FAQ Section** — 6-Item Akkordeon mit WAI-ARIA Pattern und Keyboard-Navigation
- **CTA Banner** — Gold-akzentuierter Call-to-Action zwischen FAQ und Kontakt
- **Scroll Progress Bar** — Goldene Fortschrittsanzeige am oberen Bildschirmrand
- **SVG Icon System** — Lucide React ersetzt alle Emoji/Unicode-Icons
- **Reveal Richtungsvarianten** — `direction` Prop (up/down/left/right/none)
- **Staggered Card Animations** — Gestaffelte Entry-Animationen bei Tab-Wechsel
- **Legal Modal Animation** — Fade + Scale Entry-Animation
- **FAQPage JSON-LD Schema** — Google Rich Snippets für FAQ-Einträge
- **WebSite/Organization JSON-LD** — Erweiterte Structured Data
- **Gzip + Brotli Compression** — Build-Plugin für komprimierte Assets
- **480px Breakpoint** — Optimiertes Layout für kleine Smartphones
- **Safe-Area Support** — iPhone Notch/Dynamic Island Handling
- **Phone Landscape Mode** — Angepasste Hero-Höhe
- **Touch-Target Minimum** — 44px via `pointer: coarse` Media Query
- **WCAG 2.1 AA** — Focus Double-Ring, aria-live Regions, forced-colors, prefers-contrast
- **`.sr-only` Utility** — Screen-Reader-Only Klasse
- **137 Tests** — 20 Test-Dateien mit umfassender Abdeckung

### Changed
- **CSS Architecture** — Design Tokens für Spacing, Font-Size, Transitions, Z-Index, Opacity
- **Services Tab-Transition** — requestAnimationFrame statt setTimeout(180)
- **Shimmer Animation** — Langsamerer, eleganterer Sweep (300% background-size)
- **Sitemap** — Reduziert auf 1 URL (Hash-Fragmente entfernt)
- **Build Target** — ES2022 statt ES2020
- **Chunk Strategy** — Separater Icon-Chunk für besseres Caching
- **Input Focus** — Stärkerer Focus-Indikator (0.25 statt 0.08 Opacity)
- **Contrast Fixes** — Opacity auf Text-Elementen durch explizite Farben ersetzt
- **Manifest** — Ergänzt um scope, orientation, categories, dir
- **Viewport** — `viewport-fit=cover` für Safe-Area-Support
- **Noscript** — Echter Inhalts-Fallback statt nur JavaScript-Hinweis
- **Navigation** — 6 Links (Referenzen hinzugefügt)

### Fixed
- Emoji-Rendering-Inkonsistenz across OS/Browser
- TrustBar fehlende Mobile-Styles
- Hero Glow-Overflow auf Mobile
- CookieConsent ohne Fokus-Management
- ScrollProgress unnötige Screen-Reader-Ansage
- Services Tab-IDs für aria-labelledby
- Legal Modal fehlende Fokus-Rückgabe

## [4.0.0] — 2026-02-23

- Initial production release
