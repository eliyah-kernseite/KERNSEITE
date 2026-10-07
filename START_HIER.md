# KERNSEITE – dein überarbeiteter Website-Stand

Das Paket enthält den vollständigen Astro-Quellcode einschließlich lokaler Bilder,
Schriften und des PHP-Kontaktendpunkts. Farben und Schriftarten bleiben erhalten.

**Dies ist ein Quellcodepaket, noch kein direkt hochladbares Hostinger-Livepaket.**
Die vorhandene Produktionssperre bleibt aktiv, weil tatsächlicher Serverstandort,
Löschfrist für Anfragen und fachliche Freigaben noch fehlen. SMTP-Zugangsdaten sind
nicht enthalten und werden ausschließlich auf dem Zielserver hinterlegt.

- Prüfbericht und Gestaltungsentscheidungen: `docs/REDESIGN_2026-09-20.md`
- Hostinger-Anleitung: `docs/DEPLOYMENT_SHARED_HOSTING_DE.md`
- Konkrete Angaben und Freigaben: `docs/PRODUCTION_TODO.md`
- Bildnachweise: `docs/ASSET_LICENSES.md`

## Vorschau am Computer

Node ab 22.12 und pnpm 10.33 installieren, diesen Ordner im Terminal öffnen:

```bash
pnpm install --frozen-lockfile
pnpm build:preview
pnpm preview
```

Die angezeigte lokale Adresse im Browser öffnen. GitHub Pages benötigt den
Vorschau-Workflow und die darin vorhandene Anpassung auf `/KERNSEITE/`.
Die GitHub-Verbindung hat das Speichern mit HTTP 403 abgewiesen; der bisherige
öffentliche Stand wurde nicht überschrieben.

Die HTML-Vorschau ist absichtlich `noindex`. Sie verwendet für Anfragen das eigene
E-Mail-Programm. Die PHP-Variante für Hostinger entsteht erst beim freigegebenen
Produktionsbuild. Vorschau-Dateien dürfen nicht als Livepaket verwendet werden.
