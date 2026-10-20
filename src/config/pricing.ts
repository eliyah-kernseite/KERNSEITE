/** Unverbindlicher Budgetrahmen für B2B-Projekte; Umfang wird im Angebot vereinbart. */
export const websiteOffer = {
  range: '1.499–5.500 €',
  note: 'Orientierungsrahmen für Unternehmenswebsites. Nettopreise, zuzüglich gesetzlicher Umsatzsteuer, soweit diese anfällt. Den verbindlichen Umfang und Preis erhältst du im Angebot.',
  includes: [
    'Struktur und individuelle Gestaltung deiner Seiten',
    'Abgestimmte Texte und Einbindung deiner Bilder',
    'Responsive Umsetzung für Smartphone und Desktop',
    'Technische SEO-Grundlage und klare Kontaktwege',
    'Gemeinsame Prüfung und Begleitung beim Live-Gang',
  ],
  additionalCosts:
    'Domain, Hosting und laufende Pflege (ab 50 € im Monat) werden separat vereinbart. Zusätzliche Fotografie, Video und Rechtsberatung sind nicht im Orientierungsrahmen enthalten.',
} as const;

/** Warum eine Website laufend gepflegt werden sollte. */
export const careReasons = [
  {
    title: 'Google bleibt nicht stehen.',
    text: 'Suchverhalten und Konkurrenz ändern sich laufend. Wer neue Suchbegriffe einarbeitet und Inhalte ergänzt, bleibt sichtbar.',
  },
  {
    title: 'Neue Regeln kommen.',
    text: 'Vorgaben zu Datenschutz, Cookies oder Barrierefreiheit ändern sich. Deine Website wird angepasst, bevor daraus ein Problem wird.',
  },
  {
    title: 'Fehler passieren leise.',
    text: 'Ein Formular, das nicht mehr sendet, ein toter Link, ein Browser-Update: Ohne Pflege merkt es oft erst der Kunde, der dich nicht erreicht.',
  },
  {
    title: 'Dein Betrieb verändert sich.',
    text: 'Neue Leistungen, Preise, Öffnungszeiten oder Bilder. Eine aktuelle Seite zeigt, dass bei dir etwas los ist.',
  },
] as const;

/** Monatliche Pflegepakete. Preise netto; Laufzeit und Details stehen im Angebot. */
export const carePlans = [
  {
    key: 'basis',
    name: 'Pflege Basis',
    price: 50,
    lead: 'Deine Website bleibt technisch sauber und aktuell.',
    includes: [
      'Monatlicher Technik-Check: Links, Formular, Ladezeit',
      'Fehler beheben, sobald sie auffallen',
      'Geänderte rechtliche Vorgaben technisch umsetzen',
      'Kleine Änderungen wie Öffnungszeiten, Preise oder Texte (bis 30 Minuten im Monat)',
    ],
  },
  {
    key: 'plus',
    name: 'Pflege Plus',
    price: 150,
    lead: 'Alles aus Basis, dazu wird deine Website laufend besser gefunden.',
    includes: [
      'Alles aus Pflege Basis',
      'SEO-Pflege: Suchbegriffe prüfen und neue Keywords einarbeiten',
      'Neue Inhalte, Bilder oder Leistungsseiten (bis 2 Stunden im Monat)',
      'Google-Unternehmensprofil aktuell halten',
      'Monatlicher Kurzbericht, wie du gefunden wirst',
    ],
  },
] as const;

export const careNote =
  'Monatlich, netto zzgl. gesetzlicher Umsatzsteuer, soweit diese anfällt. Laufzeit und Details stehen im Angebot. Hosting und Domain sind nicht enthalten.';
