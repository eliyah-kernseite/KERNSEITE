/** Fotoregister. Quellen und Dateiprüfsummen: assets-source/photo-credits.json. */
export type PhotoGroup = 'branchen' | 'leistungen' | 'agentur';
export interface PhotoSource {
  readonly group: PhotoGroup;
  readonly alt: string;
}
export const photos = {
  'social-media': { group: 'leistungen', alt: 'Smartphone mit verschiedenen Social-Media-Apps' },
  unternehmensvideo: { group: 'leistungen', alt: 'Kamera bei einer Videoaufnahme' },
  'seo-geo': { group: 'leistungen', alt: 'Visualisierung von SEO und Website-Analyse' },
  'standort-wuerzburg': {
    group: 'leistungen',
    alt: 'Blick über Würzburg mit Alter Mainbrücke und Dom',
  },
  handwerk: { group: 'branchen', alt: 'Werkzeuge, Holz und Bohrmaschine auf einer Werkbank' },
  zahnarztpraxen: { group: 'branchen', alt: 'Zahnärztliche Untersuchung in einer Praxis' },
  'gastronomie-hotels': { group: 'branchen', alt: 'Restaurantinterieur mit Tischen und Stühlen' },
  'lokale-dienstleister': { group: 'branchen', alt: 'Glasreinigung an einer Gebäudefassade' },
  'b2b-mittelstand': { group: 'branchen', alt: 'Innenraum einer industriellen Produktionshalle' },
  'handwerk-werkzeug': {
    group: 'agentur',
    alt: 'Handwerkzeug hängt an einer dunklen Werkstattwand',
  },
  'arbeitsplatz-abend': {
    group: 'agentur',
    alt: 'Laptop auf einem Holzschreibtisch im Licht einer Schreibtischlampe',
  },
  'laptop-notizbuch': {
    group: 'agentur',
    alt: 'Laptop, aufgeschlagenes Notizbuch und Kaffeetasse auf schwarzem Tisch',
  },
  'entwurf-skizze': {
    group: 'agentur',
    alt: 'Hand zeichnet mit Feinminenstift einen Entwurf auf Transparentpapier',
  },
  'werkbank-lampen': {
    group: 'agentur',
    alt: 'Werkbank mit Zangen und Werkzeug an der Wand im Licht zweier Lampen',
  },
  'website-laptop': {
    group: 'leistungen',
    alt: 'Laptop mit leuchtend buntem Bildschirm auf einem dunklen Holztisch',
  },
  'google-karte': {
    group: 'leistungen',
    alt: 'Hand hält ein Smartphone mit geöffneter Kartenansicht',
  },
  'branding-farben': {
    group: 'leistungen',
    alt: 'Schreibtisch mit Tastatur, Stiften und Farbmusterkarten',
  },
  'anzeigen-analyse': {
    group: 'leistungen',
    alt: 'Laptop auf schwarzem Tisch mit geöffnetem Analysebericht',
  },
  'ki-roboterarm': {
    group: 'leistungen',
    alt: 'Industrieroboterarm an einer Fertigungsstraße',
  },
  hotelzimmer: { group: 'branchen', alt: 'Hotelzimmer mit Doppelbett und warmem Licht' },
} as const satisfies Record<string, PhotoSource>;
export type PhotoKey = keyof typeof photos;
