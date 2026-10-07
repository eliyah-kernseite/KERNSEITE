import type { FaqItem } from './faq';
import type { ServiceKey } from './services';

/**
 * Regionale Landingpages (Footer-verlinkt).
 *
 * Standortwahrheit wie in `site.ts`: Der Sitz liegt in Erlabrunn bei Würzburg.
 * Würzburg und Schweinfurt sind bediente Orte, nicht Sitz. Jede Seite hat
 * eigenständigen Inhalt; keine Ortsnamen-Klone für weitere Städte. Umliegende
 * Orte werden im Text genannt statt mit eigenen Seiten.
 */
export interface Region {
  readonly slug: string;
  readonly href: string;
  /** Kurzname für Breadcrumb und Footer. */
  readonly label: string;
  readonly seoTitle: string;
  /** Beschreibung für Suchergebnisse, 140–160 Zeichen. */
  readonly metaDescription: string;
  readonly h1: string;
  readonly lead: string;
  /** Foto nur, wenn tatsächlich ein passendes Motiv vorliegt. */
  readonly photo?: 'standort-wuerzburg';
  readonly ctaLabel: string;
  /** Text im Abschluss-Banner, je Region eigenständig. */
  readonly ctaText: string;
  readonly focusTitle: string;
  readonly focus: readonly { readonly title: string; readonly body: string }[];
  readonly areaTitle: string;
  readonly areaText: string;
  readonly relatedServices: readonly ServiceKey[];
  readonly faqs: readonly FaqItem[];
}

export const regions: readonly Region[] = [
  {
    slug: 'webdesign-wuerzburg',
    href: '/webdesign-wuerzburg/',
    label: 'Webdesign Würzburg',
    seoTitle: 'Werbeagentur & Webdesign Würzburg',
    metaDescription:
      'Deine Digital- und Werbeagentur bei Würzburg: individuelle Websites, SEO und Google-Unternehmensprofil. Persönlich betreut, Termine vor Ort möglich.',
    h1: 'Webdesign und Werbeagentur für Würzburg.',
    lead: 'KERNSEITE sitzt in Erlabrunn, direkt vor den Toren Würzburgs. Wir entwickeln Websites für Unternehmen aus der Region und kümmern uns darum, dass Kunden aus der Umgebung dich finden.',
    photo: 'standort-wuerzburg',
    ctaLabel: 'Dein Projekt besprechen',
    ctaText:
      'Ein erstes Gespräch ist unverbindlich. Gern bei einem Kaffee vor Ort oder ganz einfach am Telefon.',
    focusTitle: 'Was du von uns bekommst',
    focus: [
      {
        title: 'Persönlich statt Callcenter',
        body: 'Du sprichst direkt mit Eliyah Korb. Termine vor Ort sind nach Absprache gern möglich, vieles klären wir auch schnell per Telefon oder Video.',
      },
      {
        title: 'Websites, die zu dir passen',
        body: 'Keine Vorlage mit ausgetauschtem Logo. Struktur, Texte und Gestaltung entstehen für dein Unternehmen und für die Fragen, die deine Kunden wirklich stellen.',
      },
      {
        title: 'Gefunden werden in der Region',
        body: 'Saubere Technik, klare Inhalte und ein gepflegtes Google-Unternehmensprofil helfen, dass dich Menschen aus der Region bei der Suche finden.',
      },
      {
        title: 'Alles aus einer Hand',
        body: 'Website, SEO, Google-Profil und auf Wunsch Video und Social Media. Als kleine Digitalagentur stimmen wir alles aufeinander ab, statt einzelne Bausteine zu verkaufen.',
      },
    ],
    areaTitle: 'Für Unternehmen aus der ganzen Region',
    areaText:
      'Wir betreuen Unternehmen in Würzburg und im ganzen Umland: in Erlabrunn, Zellingen, Veitshöchheim, Höchberg, Ochsenfurt, Kitzingen, Karlstadt, Marktheidenfeld und Schweinfurt. Ob Handwerksbetrieb, Praxis, Gastronomie oder Dienstleister: Wir kennen die Region und wissen, wie Kunden hier suchen. Und weil sich vieles digital abstimmen lässt, begleiten wir Projekte genauso gern in ganz Deutschland.',
    relatedServices: ['websites', 'seo-geo', 'google'],
    faqs: [
      {
        question: 'Bist du eine Werbeagentur oder ein Webdesigner?',
        answer:
          'Beides passt. Unser Schwerpunkt sind individuelle Websites. Dazu kommen Suchmaschinenoptimierung, das Google-Unternehmensprofil, Branding, Werbeanzeigen, Foto und Video sowie Social Media. Du hast dabei immer einen festen Ansprechpartner.',
      },
      {
        question: 'Können wir uns in Würzburg persönlich treffen?',
        answer:
          'Ja. Unser Sitz ist in Erlabrunn, ganz in der Nähe. Ein Treffen in der Stadt oder bei dir im Betrieb ist nach Absprache gern möglich. Viele Abstimmungen laufen trotzdem bequem per Telefon, Video und gemeinsamer Vorschau.',
      },
      {
        question: 'Was kostet eine Website bei KERNSEITE?',
        answer:
          'Die meisten Unternehmenswebsites liegen zwischen 1.500 und 5.500 Euro netto. Der genaue Preis hängt von Umfang, Seitenanzahl und Funktionen ab. Nach dem ersten Gespräch bekommst du ein klares Angebot.',
      },
      {
        question: 'Für welche Branchen arbeitet ihr in der Region?',
        answer:
          'Für Handwerksbetriebe, Praxen, Gastronomie, Hotels, lokale Dienstleister und mittelständische Unternehmen. Ein Beispiel aus dem Umland ist die Website von Kaya Döner in Himmelstadt. Jede Website entsteht individuell für das jeweilige Unternehmen.',
      },
    ],
  },
  {
    slug: 'webdesign-schweinfurt',
    href: '/webdesign-schweinfurt/',
    label: 'Webdesign Schweinfurt',
    seoTitle: 'Webdesign & Werbeagentur Schweinfurt',
    metaDescription:
      'Websites für Unternehmen in Schweinfurt und Umgebung: individuelles Webdesign, SEO und Google-Profil. Persönlich betreut aus dem Raum Würzburg.',
    h1: 'Webdesign für Unternehmen in Schweinfurt.',
    lead: 'Schweinfurt ist eine starke Industrie- und Handwerksstadt. Wir helfen Betrieben aus der Region, das auch online zu zeigen, mit einer Website, die Kunden und Bewerber überzeugt.',
    ctaLabel: 'Projekt in Schweinfurt besprechen',
    ctaText:
      'Erzähl kurz, was dein Betrieb macht und wen du erreichen willst. Den Rest klären wir im persönlichen Gespräch.',
    focusTitle: 'Worauf es in Schweinfurt ankommt',
    focus: [
      {
        title: 'Mittelstand verständlich zeigen',
        body: 'Viele Schweinfurter Unternehmen arbeiten für andere Firmen. Wir bringen erklärungsbedürftige Leistungen so auf den Punkt, dass Einkäufer und Entscheider schnell verstehen, was du kannst.',
      },
      {
        title: 'Fachkräfte gewinnen',
        body: 'Gute Leute suchen online nach Arbeitgebern. Eine Karriereseite mit echten Einblicken und einem einfachen Bewerbungsweg macht deinen Betrieb für sie sichtbar.',
      },
      {
        title: 'Lokal gefunden werden',
        body: 'Ein vollständiges Google-Unternehmensprofil und eine klar aufgebaute Website sorgen dafür, dass dich Kunden aus Schweinfurt und dem Landkreis leichter finden.',
      },
      {
        title: 'Kurze Wege, fester Ansprechpartner',
        body: 'Du arbeitest direkt mit Eliyah Korb zusammen. Termine in Schweinfurt sind nach Absprache möglich, alles Weitere stimmen wir unkompliziert per Telefon und Video ab.',
      },
    ],
    areaTitle: 'Schweinfurt und Umgebung',
    areaText:
      'Wir betreuen Unternehmen in Schweinfurt, Gochsheim, Schwebheim, Werneck, Niederwerrn, Bergrheinfeld und im ganzen Landkreis. Unser Sitz liegt in Erlabrunn bei Würzburg, also mitten in Unterfranken. So verbinden wir persönliche Nähe mit der Erfahrung aus Projekten in der ganzen Region.',
    relatedServices: ['websites', 'google', 'video'],
    faqs: [
      {
        question: 'Betreut ihr auch Unternehmen in Schweinfurt?',
        answer:
          'Ja. Wir arbeiten für Unternehmen in Schweinfurt und dem Landkreis. Persönliche Termine sind nach Absprache möglich. Den Großteil stimmen wir per Telefon, Video und gemeinsamer Website-Vorschau ab.',
      },
      {
        question: 'Eignet sich KERNSEITE auch für Industrie und B2B?',
        answer:
          'Ja. Gerade erklärungsbedürftige Leistungen profitieren von einer klaren Website. Wir ordnen dein Angebot so, dass Geschäftskunden schnell finden, was sie suchen, und der Weg zur Anfrage kurz bleibt.',
      },
      {
        question: 'Wie lange dauert ein Website-Projekt?',
        answer:
          'Meist einige Wochen, je nach Umfang und wie schnell Inhalte und Freigaben vorliegen. Den Zeitplan legen wir gemeinsam zu Beginn fest.',
      },
      {
        question: 'Bietet KERNSEITE in Schweinfurt auch Leistungen einer Werbeagentur?',
        answer:
          'Ja. Neben Webdesign gehören Branding, Foto und Video, Social Media und Werbeanzeigen zum Angebot. Für Schweinfurter Betriebe bedeutet das: ein Ansprechpartner für den gesamten Auftritt, von der Website bis zur Anzeige in den sozialen Netzwerken.',
      },
      {
        question: 'Was kostet eine Website für ein Unternehmen aus Schweinfurt?',
        answer:
          'Es gelten dieselben Preise wie überall: Der Orientierungsrahmen liegt meist bei 1.500 bis 5.500 Euro netto, abhängig von Umfang und Funktionen. Termine vor Ort in Schweinfurt sprechen wir vorher gemeinsam ab.',
      },
      {
        question: 'Kann KERNSEITE auch eine Karriereseite für meinen Betrieb erstellen?',
        answer:
          'Ja. Gerade in Schweinfurt suchen viele Betriebe Fachkräfte. Eine Karriereseite mit echten Einblicken, klaren Angaben zu offenen Stellen und einem einfachen Bewerbungsweg kann Teil deiner Website sein oder als eigener Bereich entstehen.',
      },
    ],
  },
];
