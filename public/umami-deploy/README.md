# Umami Analytics Deployment

Self-hosted, DSGVO-konforme Analytics für lab-root.com.

## Setup

1. `.env` erstellen (siehe `.env.example`)
2. `docker compose up -d`
3. Nginx Proxy Manager: `analytics.lab-root.com` → `localhost:3001`
4. Login: `admin` / `umami` → Passwort sofort ändern
5. Website `lab-root.com` anlegen → Website-ID kopieren
6. In `index.html`: `data-website-id="<WEBSITE-ID>"`
7. Website deployen

## Daten

- Keine Cookies
- Keine personenbezogenen Daten
- IP-Adressen werden anonymisiert
- Daten bleiben auf eigenem Server
- DSGVO-konform ohne zusätzlichen Consent
