# LAB-ROOT Design Token System

Definiert in `src/styles/global.css` unter `:root`. Alle Tokens sind CSS Custom Properties.

## Gold Opacity Scale

Abgestufte Transparenzen der Akzentfarbe Gold (#CFA956).

| Token | Wert | Verwendung |
|-------|------|------------|
| `--gold-2` | 2% | Sehr subtile Hintergründe |
| `--gold-4` | 4% | Subtile Hintergründe (Icons, Logo-Box) |
| `--gold-6` | 6% | Leichte Hintergründe (Badges, aktive Tabs, Stats) |
| `--gold-8` | 8% | Borders (Standard), Nav-Scrolled, Form-Borders |
| `--gold-10` | 10% | Borders (betont), Tagline-Border |
| `--gold-12` | 12% | Divider-Gradients, Badge-Borders |
| `--gold-15` | 15% | Hover-Borders, Scroll-Arrow |
| `--gold-18` | 18% | Aktive Tab-Borders |
| `--gold-20` | 20% | HoverCard-Hover, Reset-Button-Border, Scrollbar |
| `--gold-25` | 25% | Button-Hover-Shadows |
| `--gold-30` | 30% | Starke Hover-Borders (BackToTop, Avatar) |
| `--gold-35` | 35% | Scrollbar-Hover, Reset-Button-Hover |

## White Opacity Scale

Abgestufte Transparenzen fuer Karten und Borders auf dunklem Hintergrund.

| Token | Wert | Verwendung |
|-------|------|------------|
| `--white-4` | 4% | Outline-Button-Background, Nav-Link-Hover |
| `--white-5` | 5% | Mobile-Toggle-Hover, Modal-Close-Hover |
| `--white-6` | 6% | Leichte Borders (Principle-Pills) |
| `--white-8` | 8% | Input-Borders (= `--card-border` Wert) |
| `--white-12` | 12% | Outline-Button-Border, Hover-Borders |
| `--white-15` | 15% | Input-Hover-Borders |

## Spacing Scale

4px-Grid-Basis. Alle Werte in `rem`.

| Token | Wert | px |
|-------|------|----|
| `--sp-1` | 0.25rem | 4px |
| `--sp-2` | 0.5rem | 8px |
| `--sp-3` | 0.75rem | 12px |
| `--sp-4` | 1rem | 16px |
| `--sp-5` | 1.25rem | 20px |
| `--sp-6` | 1.5rem | 24px |
| `--sp-7` | 1.75rem | 28px |
| `--sp-8` | 2rem | 32px |
| `--sp-9` | 2.5rem | 40px |
| `--sp-10` | 3rem | 48px |
| `--sp-11` | 3.5rem | 56px |
| `--sp-12` | 4rem | 64px |
| `--sp-14` | 5rem | 80px |
| `--sp-16` | 5.5rem | 88px |
| `--sp-18` | 6.25rem | 100px |
| `--sp-20` | 7.5rem | 120px |
| `--sp-22` | 8.125rem | 130px |
| `--sp-24` | 10rem | 160px |

## Font Size Scale

| Token | Wert | Verwendung |
|-------|------|------------|
| `--fs-2xs` | 9px | Footer-Logo |
| `--fs-xs` | 11px | Labels, Badges, Mono-Tags |
| `--fs-sm` | 12px | Mono-Tags, Footer-Text, Trust-Tags |
| `--fs-base-sm` | 13px | Kleine Buttons, Beschreibungen |
| `--fs-base` | 14px | Standard-Text, Nav-Links |
| `--fs-md` | 15px | Button-Text, Inputs, Content-Intro |
| `--fs-lg` | 16px | Email-Links, Mobile-Links |
| `--fs-xl` | 17px | Content-Subtitles, Step-Titles |
| `--fs-2xl` | 18px | Value-Titles, BackToTop-Icon |
| `--fs-3xl` | 20px | Team-Titles |
| `--fs-4xl` | 22px | Success-Title, Focus-Icons |
| `--fs-5xl` | 24px | Modal-Titles, Error-Titles |
| `--fs-6xl` | 28px | Modal-Close |
| `--fs-7xl` | 32px | Stat-Values |
| `--fs-8xl` | 48px | Error-Icons, Success-Icons |
| `--fs-9xl` | 72px | Process-Step-Nummern |

**Hinweis:** `clamp()`-Werte fuer responsive Schriftgroessen werden NICHT durch Tokens ersetzt.

## Transition Presets

Jeder Token enthaelt Dauer + Easing-Funktion.

| Token | Wert | Verwendung |
|-------|------|------------|
| `--tr-fast` | 0.2s ease | Schnelles UI-Feedback (Links, Toggle) |
| `--tr-base` | 0.25s ease-out | Standard-Uebergaenge (Panel, Tabs) |
| `--tr-mid` | 0.3s ease-out | Card-Uebergaenge, Buttons |
| `--tr-slow` | 0.35s ease-out | Betonte Animationen (Cards, Avatare) |
| `--tr-slower` | 0.4s ease-out | Navbar-Uebergaenge, Cookie-Banner |

**Hinweis:** Wo das Original `ease` statt `ease-out` verwendet, bleibt der hartcodierte Wert erhalten.

## Z-Index Scale

| Token | Wert | Verwendung |
|-------|------|------------|
| `--z-base` | 1 | Hero-Content |
| `--z-above` | 2 | Scroll-Indicator, TrustBar |
| `--z-backtop` | 999 | BackToTop-Button |
| `--z-nav` | 1000 | Navbar |
| `--z-cookie` | 1500 | Cookie-Consent-Banner |
| `--z-modal` | 2000 | Legal-Modal |
| `--z-skip` | 9999 | Skip-to-Content-Link |

## Divider Gradient

| Token | Wert |
|-------|------|
| `--divider-gradient` | `linear-gradient(90deg, transparent, var(--gold-12), transparent)` |

Wird fuer die goldene Trennlinie zwischen Sektionen verwendet (`.sectionWithDivider`, `.sectionDivider`).

## Shared CSS Utilities

Definiert in `src/styles/shared.module.css`:

- `.monoLabel` — Basis Mono-Label (11px, uppercase, 2px spacing)
- `.monoLabelGold` — Mono-Label in Goldfarbe
- `.monoLabelMuted` — Mono-Label in Sekundaerfarbe
- `.sectionWithDivider` — Fuegt goldene `::before`-Trennlinie hinzu
