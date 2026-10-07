# Deployment auf Hostinger

Die Website besteht aus statischen HTML-, CSS- und JavaScript-Dateien. Das direkte
Kontaktformular benötigt zusätzlich PHP und den vorhandenen SMTP-Endpunkt.
Produktionsdomain: **https://www.kernseite.com**. Die Variante ohne www wird umgeleitet.

## Voraussetzungen

- Hostinger-Webhosting mit PHP ab 8.1, `mbstring` und Unterstützung der `.htaccess`-Regeln
- HTTPS für kernseite.com und www.kernseite.com
- Tatsächlichen Hostingvertragspartner und Serverstandort aus dem gebuchten Paket kennen
- Funktionierendes Firmenpostfach und SMTP-Zugang; Google Workspace ist hinterlegt
- Node ab 22.12, pnpm 10.33 und Composer zum Erstellen des Pakets

Serverstandort laut Hostinger-Panel: Deutschland (Frankfurt am Main), hinterlegt in
`src/config/company.ts`. Alle Freigaben in `src/config/release.ts` sind gesetzt
(Stand 2026-10-07); `pnpm build:production` erzeugt damit einen deploybaren Build.

## Automatisch veröffentlichen (GitHub → Hostinger)

Hostinger kann den Astro-Code nicht selbst bauen. Deshalb baut GitHub ihn:

1. Jeder Push auf `main` startet `.github/workflows/deploy-hostinger.yml`.
   Der Workflow baut den Produktionsstand, führt die QA aus, installiert
   PHPMailer und legt das fertige Paket (Inhalt von `public_html`) auf den
   Branch `hostinger-deploy`.
2. Hostinger zieht genau diesen Branch nach `public_html`.

Einmalige Einrichtung in Hostinger:

1. Vorher die bestehende Website in `public_html` sichern (Dateimanager →
   herunterladen). Für das erste Git-Deployment muss `public_html` leer sein.
   Die `.env` oberhalb von `public_html` bleibt unberührt.
2. hPanel → Websites → kernseite.com → Erweitert → **GIT**.
3. Da das Repository privat ist: den dort angezeigten **SSH-Schlüssel** kopieren
   und in GitHub unter Repository → Settings → Deploy keys → Add deploy key
   eintragen (nur Lesezugriff).
4. Repository: `git@github.com:eliyah-kernseite/KERNSEITE.git`,
   Branch: `hostinger-deploy`, Verzeichnis: leer lassen (= `public_html`).
   **Erstellen**.
5. Beim neuen Eintrag **Auto-Deployment** aktivieren und die angezeigte
   Webhook-URL in GitHub unter Settings → Webhooks → Add webhook eintragen
   (Content type `application/json`, Ereignis „Just the push event“).

Danach gilt: Änderung auf `main` → GitHub baut (2–3 Minuten) → Hostinger
veröffentlicht automatisch. Manuell auslösen: GitHub → Actions →
„Deploy (Hostinger)“ → Run workflow, oder in Hostinger unter GIT → Deploy.

`public/.htaccess` sperrt das von Hostinger angelegte `.git`-Verzeichnis
gegen Abruf aus dem Web.

## Paket manuell erstellen (Alternative)

```bash
pnpm install --frozen-lockfile
pnpm copy-fonts
pnpm build:production
pnpm qa
cd php
composer install --no-dev --no-interaction --prefer-dist
cd ..
node scripts/assemble-deploy.mjs
```

`deploy/public_html/` enthält anschließend Website, Bilder, Schriften, `.htaccess`
und den PHP-Endpunkt mit PHPMailer. Dieses Verzeichnis ist der Upload-Inhalt.
Die geschützte Umgebungsdatei wird separat eingerichtet.

Vorschau- und CI-Builds sind ausdrücklich keine Produktionspakete. Die
entsprechenden Marker und Deploy-Guards bleiben bestehen.

## In Hostinger hochladen

1. Den Inhalt von `deploy/public_html/` in `public_html` der Domain hochladen.
2. Versteckte `.htaccess`-Dateien mit übertragen.
3. Die `.env` anhand der mitgelieferten `.env.example` **oberhalb von public_html**
   anlegen. Sie gehört weder ins Git-Repository noch in einen öffentlichen Download.
4. SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, SMTP_FROM und CONTACT_TO
   für den tatsächlichen Versandweg konfigurieren. ALLOWED_ORIGIN auf
   `https://www.kernseite.com` setzen. Die weiteren Vorgaben in `.env.example` beachten.
5. Domain, www-Weiterleitung, TLS und Fehlerseite prüfen. Bei vorgeschaltetem Proxy
   die HTTPS-Erkennung passend zur realen Hostinger-Konfiguration prüfen.
6. Eine echte Formularanfrage senden und Empfang, Antwortadresse und Fehlerfall prüfen.
7. Produktions-`robots.txt`, Canonicals, Sitemap und Indexierung kontrollieren.
   Sitemap in den eingerichteten Suchmaschinenkonten einreichen.

Der Versandtest auf dem Zielhosting ist noch nicht erfolgt. Zugangsdaten müssen
serverseitig eingerichtet werden; sie sind nicht Teil des Quellcodepakets.

## GitHub-Pages-Vorschau

GitHub Pages führt kein PHP aus. In der Vorschau öffnet das Kontaktformular deshalb
das E-Mail-Programm mit der vorbereiteten Anfrage. Erst das eigene E-Mail-Programm
versendet die Nachricht. Telefon- und E-Mail-Links sind ebenfalls vorhanden.
Der Produktionsbuild verwendet den PHP-Endpunkt mit Rückmeldung des Servers.
