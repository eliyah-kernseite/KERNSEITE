export type CaseFilter =
  | 'referenz'
  | 'websites'
  | 'google'
  | 'video'
  | 'social'
  | 'ki'
  | 'gastronomie'
  | 'lokale-dienstleister'
  | 'kreativ';

/** Gemeinsame Felder aller Arbeiten. */
interface WorkCommon {
  readonly slug: string;
  readonly href: string;
  readonly title: string;
  readonly industryLabel: string;
  readonly tagline: string;
  readonly filters: readonly CaseFilter[];
}

/** Lokal gespeicherter Screenshot des Kundenprojekts. */
export interface WorkScreenshot {
  /** Bildpfad des echten Screenshots (WebP). */
  readonly src: string;
  /** Responsive Varianten für `srcset`. */
  readonly srcset?: string;
  readonly width: number;
  readonly height: number;
  readonly alt: string;
}

/** Vom Nutzer bereitgestelltes Projekt; noch unveröffentlichte Entwürfe tragen stage. */
export interface ProjectWork extends WorkCommon {
  readonly kind: 'project';
  /** Projektname laut bereitgestellten Angaben. */
  readonly client: string;
  /** z. B. "Gastronomie · Website · digitale Speisekarte". */
  readonly category: string;
  /** Große redaktionelle Projektüberschrift. */
  readonly headline: string;
  /** Kurzbeschreibung für das Karussell der Startseite (eigener Text, kein Tagline-Duplikat). */
  readonly teaser: string;
  /** Überschrift des Abschluss-Banners auf der Projektseite (siehe CtaBanner `markedTitle`). */
  readonly ctaTitle: readonly [string, string, string, string];
  /** Eigene Kurztexte je Seite, damit derselbe Satz nicht auf mehreren Seiten steht. */
  readonly blurbs?: Partial<Record<'home' | 'arbeiten' | 'websites' | 'leistungen', string>>;
  /** Optionaler Seitentitel, falls „Titel: Website-Entwurf“ zu lang wird. */
  readonly seoTitle?: string;
  /** Fragen und Antworten zum Projekt (Projektseite). */
  readonly faqs: readonly { readonly question: string; readonly answer: string }[];
  /** Live-Website (href, ggf. Punycode für IDN). */
  readonly liveUrl?: string;
  readonly stage?: 'preview';
  /** Reservierte Beispieldomain, nur zur Anzeige, niemals als externer Link. */
  readonly previewDomain?: string;
  /** Anzeige-Label der Live-Website (Unicode). */
  readonly liveLabel: string;
  /**
   * Ist die Live-URL im Build-Environment bestätigt/erreichbar? Wird `false`, wenn die URL
   * (noch) nicht verifiziert werden konnte – dann Hinweis, dass Link/Screenshots geprüft
   * bzw. ergänzt werden. Keine erfundenen Ergebnisse.
   */
  readonly verified: boolean;
  readonly situation: string;
  readonly solution: string;
  /** Leistungsumfang (beschreibend, keine erfundenen Kennzahlen). */
  readonly scope: readonly string[];
  readonly screenshotDesktop: WorkScreenshot;
  readonly screenshotMobile: WorkScreenshot;
}

export type Work = ProjectWork;

/** Neue Screenshots (Oktober 2026), erzeugt mit `scripts/build-references.py`. */
function screens(
  file: string,
  altDesktop: string,
  altMobile: string,
): Pick<ProjectWork, 'screenshotDesktop' | 'screenshotMobile'> {
  const base = '/assets/references';
  return {
    screenshotDesktop: {
      src: `${base}/${file}-desktop-1440.webp`,
      srcset: [640, 960, 1440, 1920]
        .map((w) => `${base}/${file}-desktop-${w}.webp ${w}w`)
        .join(', '),
      width: 1920,
      height: 1200,
      alt: altDesktop,
    },
    screenshotMobile: {
      src: `${base}/${file}-mobile-390.webp`,
      srcset: `${base}/${file}-mobile-390.webp 390w, ${base}/${file}-mobile-780.webp 780w`,
      width: 780,
      height: 1688,
      alt: altMobile,
    },
  };
}

/** Echte Kundenprojekte, in der Reihenfolge der Startseite. */
const projects: readonly ProjectWork[] = [
  {
    kind: 'project',
    slug: 'southframe-productions',
    href: '/arbeiten/southframe-productions/',
    title: 'Southframe Productions',
    headline: 'Bewegung ab der ersten Sekunde.',
    teaser:
      'Dunkles Design mit viel Bewegung: Die Referenzvideos laufen als gebogene Filmrolle durch den Startbildschirm.',
    client: 'Southframe Productions',
    industryLabel: 'Videoproduktion',
    category: 'Videoproduktion · Website · Motion Design',
    ctaTitle: ['Deine Arbeit bewegt etwas.', 'Zeigt das deine ', 'Website', ' auch?'],
    blurbs: {
      home: 'Für zwei Videografen aus Würzburg, die Musikvideos und Clips für Artists drehen. Die Seite wirkt selbst wie ein Film.',
      arbeiten:
        'Filmrolle im Startbildschirm, eine Scroll-Fahrt durch Dreh, Schnitt und Grading und offene Preise direkt auf der Startseite.',
      websites: 'Wer hier landet, sieht sofort echte Videos und findet die Preise ohne Suchen.',
      leistungen:
        'Viel Motion, offene Preise und ein kurzer Weg zur Anfrage: so stellt sich ein Videoteam online vor.',
    },
    tagline:
      'Ein dunkler, filmischer Auftritt für ein Videoteam aus Würzburg, mit bewegten Referenzen, offenen Preisen und schnellem Weg zur Anfrage.',
    liveUrl: 'https://southframeproductions.de',
    liveLabel: 'southframeproductions.de',
    verified: true,
    filters: ['referenz', 'websites', 'kreativ'],
    situation:
      'Southframe Productions dreht Musikvideos und Hochkantclips für Rapper, Newcomer und Independent Artists. Wer ein Video sucht, will zuerst sehen, wie die Arbeit aussieht, und danach wissen, was sie kostet.',
    solution:
      'Die Startseite zeigt die Referenzvideos als gebogene Filmrolle, die beim Laden in Bewegung kommt. Beim Scrollen läuft der Ablauf von Dreh über Schnitt bis Grading mit. Die Preise stehen offen auf der Startseite, die Anfrage ist von jeder Seite aus einen Klick entfernt.',
    scope: [
      'Individuelle Website mit Motion Design',
      'Bewegter Startbildschirm aus den eigenen Referenzvideos',
      'Preisübersicht und Anfrageformular',
      'SEO für Musikvideo und Videodreh in Würzburg',
    ],
    faqs: [
      {
        question: 'Warum so viel Bewegung auf der Website?',
        answer:
          'Southframe verkauft bewegte Bilder. Eine Website, die still steht, würde dazu nicht passen. Die Animationen zeigen den Stil des Teams, bevor jemand ein Video anklickt. Wer im Browser weniger Bewegung eingestellt hat, sieht die Seite ruhig.',
      },
      {
        question: 'Warum stehen die Preise direkt auf der Startseite?',
        answer:
          'Artists mit kleinem Budget fragen oft gar nicht erst an, wenn sie den Preis nicht kennen. Offene Preise nehmen diese Hürde. Die Anfragen, die kommen, passen dadurch besser.',
      },
      {
        question: 'Lädt die Seite trotz Videos schnell?',
        answer:
          'Ja. Die Videos werden erst geladen, wenn sie gebraucht werden, und der erste Bildschirm kommt mit leichten Vorschaubildern aus. So bleibt die Seite auch am Handy flott.',
      },
      {
        question: 'Wo finde ich die Website?',
        answer:
          'Die Website ist unter southframeproductions.de online. Den direkten Link findest du oben auf dieser Seite.',
      },
      {
        question: 'Geht so ein Auftritt auch für andere Kreative?',
        answer:
          'Ja, etwa für Fotografen, Musiker, Tattoo-Studios oder Eventtechnik. Wie viel Bewegung passt, klären wir am Anfang gemeinsam. Der Orientierungsrahmen für Unternehmenswebsites liegt meist bei 1.500 bis 5.500 Euro netto.',
      },
    ],
    ...screens(
      'southframe',
      'Startseite von Southframe Productions am Laptop: „Musikvideos & Content für Artists“ über einer gebogenen Reihe aus Videostandbildern.',
      'Startseite von Southframe Productions auf dem Smartphone mit großer Überschrift und bewegter Filmrolle.',
    ),
  },
  {
    kind: 'project',
    slug: 'babyschlafberatung',
    href: '/arbeiten/babyschlafberatung/',
    title: 'Anna-Lena Korb · Babyschlafberatung',
    headline: 'Nähe und Vertrauen von Anfang an.',
    teaser:
      'Ruhige Bildsprache, klar beschriebene Angebote und ein direkter Weg zum Kennenlerngespräch.',
    seoTitle: 'Babyschlafberatung Anna-Lena Korb: Referenz',
    client: 'Anna-Lena Korb',
    industryLabel: 'Babyschlafberatung',
    category: 'Beratung · Website · Kontaktanfrage',
    ctaTitle: ['Dein Angebot verdient Vertrauen.', 'Zeigt deine ', 'Website', ' das schon?'],
    blurbs: {
      home: 'Eine Website für eine Schlafberatung, auf der Eltern Angebote, Preise und die Person hinter der Beratung schnell finden.',
      arbeiten:
        'Website für eine Babyschlafberatung mit verständlichen Angeboten und Preisen, persönlicher Vorstellung und kurzem Weg zum Kennenlernen.',
      websites:
        'Die Struktur ordnet Beratung, Angebote und Preise so, dass sich Eltern auch in einer müden Minute schnell zurechtfinden.',
      leistungen:
        'Eltern sehen auf einen Blick, wie die Beratung abläuft, was sie kostet und wie sie ein erstes Gespräch vereinbaren.',
    },
    tagline:
      'Eine persönliche Website, die Eltern Orientierung gibt und den Weg zum Kennenlerngespräch einfach macht.',
    liveUrl: 'https://babyschlaf-coach.de',
    liveLabel: 'babyschlaf-coach.de',
    verified: true,
    filters: ['referenz', 'websites', 'lokale-dienstleister'],
    situation:
      'Eltern möchten verstehen, wie eine Schlafberatung begleitet, welche Angebote es gibt und wer ihnen zur Seite steht.',
    solution:
      'Die Website verbindet eine ruhige Bildsprache mit verständlichen Angeboten, Preisen und einem direkten Weg zum Kennenlernen.',
    scope: [
      'Individuelle Gestaltung für Anna-Lena Korb',
      'Struktur für Beratung, Angebote und Preise',
      'Persönliche Vorstellung und Schlafwissen',
      'Klarer Einstieg zum Kennenlerngespräch',
    ],
    faqs: [
      {
        question: 'Für wen ist die Website gedacht?',
        answer:
          'Für Eltern, die sich Unterstützung beim Schlaf ihres Babys oder Kleinkinds wünschen. Wer nach einer Schlafberatung sucht, ist oft müde und verunsichert. Deshalb soll die Website von Anfang an Ruhe ausstrahlen, Fragen verständlich beantworten und zeigen, wer hinter der Beratung steht.',
      },
      {
        question: 'Wie entstehen Nähe und Vertrauen auf einer Beratungs-Website?',
        answer:
          'Vor allem dadurch, dass man die Beraterin kennenlernt, bevor man sie anruft. Die Website stellt Anna-Lena Korb persönlich vor, die Bilder sind ruhig, die Sprache nimmt Eltern ernst, und Angebote und Preise stehen offen da. So wissen Eltern schon vor dem ersten Gespräch, was sie erwartet.',
      },
      {
        question: 'Wie ist die Seite aufgebaut?',
        answer:
          'Die Website gliedert sich in Schlafberatung, Ablauf, Kosten, eine persönliche Vorstellung und einen Ratgeber mit Schlafwissen. Jeder Bereich beantwortet eine Frage, die Eltern vor der Buchung haben, und führt zum nächsten Schritt.',
      },
      {
        question: 'Warum ist der Weg zum Kennenlerngespräch so wichtig?',
        answer:
          'Bei einer Beratung entscheidet das persönliche Gespräch. Die Website hat die Aufgabe, die Hemmschwelle bis dahin möglichst klein zu machen. Deshalb führt die Website an mehreren Stellen direkt zum Kennenlernen, ohne aufdringlich zu wirken.',
      },
      {
        question: 'Ist die Website schon online?',
        answer:
          'Ja. Die Babyschlafberatung von Anna-Lena Korb ist unter babyschlaf-coach.de online. Eltern finden dort Angebote, Kosten und den Weg zum kostenlosen Kennenlernen.',
      },
      {
        question: 'Passt so ein Auftritt auch zu anderen Beratungsangeboten?',
        answer:
          'Ja. Coaching, Hebammen oder Familienberatung stehen vor ähnlichen Aufgaben: Menschen müssen Vertrauen fassen, bevor sie sich melden. Die Kombination aus persönlicher Vorstellung, klaren Angeboten und einfachem Erstkontakt lässt sich gut auf solche Angebote übertragen.',
      },
      {
        question: 'Welche Rolle spielen Bilder auf dieser Website?',
        answer:
          'Eine große. Die Bildsprache ist bewusst ruhig und warm gehalten, mit viel Raum und sanften Farben. Ein schlafendes Baby im Einstieg zeigt sofort, worum es geht, ohne viele Worte. Außerdem wirkt die Seite durch die Bilder einladend und persönlich, so wie die Beratung selbst.',
      },
      {
        question: 'Wie ist das Projekt abgelaufen?',
        answer:
          'Nach der Abstimmung des Entwurfs folgten Feinschliff an Texten und Bildern, die technische Umsetzung und eine gemeinsame Prüfung aller Seiten. Erst als alles passte, ging die Website online. Diesen Ablauf durchläuft jedes Projekt bei KERNSEITE, unabhängig von Branche und Umfang.',
      },
    ],
    ...screens(
      'babyschlafberatung',
      'Startseite der Babyschlafberatung Anna-Lena Korb am Laptop: schlafendes Neugeborenes im Arm und die Überschrift „Ruhigere Nächte mit Nähe und einem Plan, der zu euch passt“.',
      'Startseite der Babyschlafberatung auf dem Smartphone mit Überschrift und den Schaltflächen für Kennenlernen und Schlafberatung.',
    ),
  },
  {
    kind: 'project',
    slug: 'kaya-doener-himmelstadt',
    href: '/arbeiten/kaya-doener-himmelstadt/',
    title: 'Kaya Döner Himmelstadt',
    headline: 'Appetit auf den ersten Klick.',
    teaser: 'Dunkles Design, digitale Speisekarte und Anrufmöglichkeiten direkt bei den Angeboten.',
    client: 'Kaya Döner Himmelstadt',
    industryLabel: 'Gastronomie',
    category: 'Gastronomie · Website · digitale Speisekarte',
    ctaTitle: ['Deine Gäste haben Hunger.', 'Macht deine ', 'Website', ' Appetit?'],
    blurbs: {
      home: 'Eine Website für einen Imbiss in Himmelstadt, die Speisekarte, Wochenangebote und Anfahrt schnell erreichbar macht.',
      arbeiten:
        'Digitale Speisekarte, gesonderte Wochenangebote und eine eigene Seite für Kontakt und Anfahrt, verbunden durch eine direkte Nutzerführung.',
      websites:
        'Wer hungrig sucht, findet hier mit wenigen Klicks, was es gibt, und kann direkt anrufen.',
    },
    tagline:
      'Ein klarer und appetitlicher Webauftritt mit direkter Nutzerführung, digitaler Speisekarte und schnellem Zugang zu Standort und Kontakt.',
    liveUrl: 'https://www.kaya-doener-himmelstadt.de',
    liveLabel: 'www.kaya-doener-himmelstadt.de',
    verified: true,
    filters: ['referenz', 'websites', 'gastronomie'],
    situation:
      'Wer unterwegs nach einem Imbiss sucht, braucht schnell eine Antwort: Was gibt es, wann ist geöffnet und wie lässt sich bestellen? Bei Kaya Döner in Himmelstadt ging es deshalb vor allem um genau diese Wege.',
    solution:
      'Die Website führt von der Startseite zur digitalen Speisekarte, zu Wochenangeboten sowie Kontakt und Anfahrt. Anrufmöglichkeiten stehen direkt bei den entscheidenden Informationen. Das dunkle Design gibt den Speisen Raum und hält Text und Aktionen gut unterscheidbar.',
    scope: [
      'Individuelle Website',
      'Digitale Speisekarte und gesonderte Wochenangebote',
      'Direkte Anrufmöglichkeiten und Kontakt-/Anfahrtsseite',
      'Responsive Gestaltung mit gut lesbaren Angeboten',
    ],
    faqs: [
      {
        question: 'Was brauchen Gäste von einer Imbiss-Website?',
        answer:
          'Schnelle Antworten. Wer Hunger hat, will wissen, was es gibt, wann geöffnet ist und wie er bestellen kann. Die Website von Kaya Döner Himmelstadt macht schon beim ersten Klick Appetit und führt ohne Umwege zur Speisekarte und zum Telefon.',
      },
      {
        question: 'Warum ein dunkles Design?',
        answer:
          'Auf dem dunklen Hintergrund kommen die Fotos der Speisen besonders gut zur Geltung. Gleichzeitig bleiben Texte, Preise und Schaltflächen klar voneinander unterscheidbar. Das sorgt für Übersicht, auch auf kleinen Bildschirmen.',
      },
      {
        question: 'Wie funktioniert die digitale Speisekarte?',
        answer:
          'Die Speisekarte ist direkt auf der Website gut lesbar, auch auf dem Smartphone. Wochenangebote stehen gesondert, damit sie in der Karte nicht untergehen. Anrufmöglichkeiten sind dort platziert, wo die Entscheidung fällt.',
      },
      {
        question: 'Wie finden Gäste den Weg zum Imbiss?',
        answer:
          'Kontakt und Anfahrt haben eine eigene Seite, damit Gäste aus Himmelstadt und Umgebung schnell den Weg finden. Für spontane Besuche ist zusätzlich ein gepflegtes Google-Unternehmensprofil wichtig, das dieselben Öffnungszeiten und Kontaktdaten zeigt.',
      },
      {
        question: 'Warum ist diese Referenz für andere Gastronomen interessant?',
        answer:
          'Weil die Anforderungen ähnlich sind: Speisekarte, Öffnungszeiten, Anfahrt und ein schneller Weg zum Telefon. Diese Referenz zeigt, wie sich das übersichtlich und appetitlich umsetzen lässt, ob für Imbiss, Pizzeria, Café oder Restaurant.',
      },
      {
        question: 'Wie ist die Website aufgebaut?',
        answer:
          'Die Startseite begrüßt mit dem Claim „Döner. Dürüm. Dein Kaya.“ und einem großen Foto. Von dort geht es direkt zur digitalen Speisekarte, zu den Wochenangeboten sowie zu Kontakt und Anfahrt. Der Anrufbutton ist von jeder wichtigen Stelle aus erreichbar, damit Bestellungen ohne Umwege möglich sind.',
      },
      {
        question: 'Wo finde ich die Website?',
        answer:
          'Die Website ist unter www.kaya-doener-himmelstadt.de online. Den direkten Link findest du oben auf dieser Seite.',
      },
      {
        question: 'Was kostet eine vergleichbare Gastronomie-Website?',
        answer:
          'Das hängt vom Umfang ab, etwa von der Zahl der Seiten, der Speisekarte und gewünschten Funktionen. Der Orientierungsrahmen für Unternehmenswebsites liegt meist bei 1.500 bis 5.500 Euro netto. Nach dem ersten Gespräch bekommst du ein schriftliches Angebot.',
      },
    ],
    ...screens(
      'kaya-doener',
      'Startseite von Kaya Döner Himmelstadt am Laptop: „Döner. Dürüm. Dein Kaya.“ in großer Schrift neben einem Dönerfoto.',
      'Startseite von Kaya Döner auf dem Smartphone mit Claim, Speisekarten-Button und Anrufbutton.',
    ),
  },
  {
    kind: 'project',
    slug: 'kinderkoerbchen',
    href: '/arbeiten/kinderkoerbchen/',
    title: 'Anna-Lena’s Kinderkörbchen',
    headline: 'Vertrauen, bevor man sich kennt.',
    teaser: 'Warme Farbwelt und ein persönlicher Einstieg, der die Betreuungsperson vorstellt.',
    client: 'Anna-Lena’s Kinderkörbchen',
    industryLabel: 'Kindertagespflege',
    category: 'Kindertagespflege · Website · lokale Sichtbarkeit',
    ctaTitle: ['Menschen wählen Menschen.', 'Stellt deine ', 'Website', ' dich vor?'],
    blurbs: {
      home: 'Eine Kindertagespflege, die sich Eltern persönlich vorstellt und ihr Angebot verständlich bündelt.',
      arbeiten:
        'Persönlicher Auftritt mit klarer Struktur für Angebot und Vertrauen, ergänzt durch das Google-Unternehmensprofil in der lokalen Suche.',
      websites:
        'Eltern lernen hier zuerst den Menschen kennen und finden danach alle Informationen zum Angebot und zur Kontaktaufnahme.',
    },
    tagline:
      'Ein warmer, persönlicher Webauftritt, auf dem Eltern zuerst die Betreuungsperson kennenlernen und danach alles zum Angebot finden.',
    // IDN: Punycode als href, Unicode als Anzeige.
    liveUrl: 'https://www.xn--kinderkrbchen-omb.com',
    liveLabel: 'www.kinderkörbchen.com',
    verified: true,
    filters: ['referenz', 'websites', 'lokale-dienstleister'],
    situation:
      'Bei der Wahl einer Kindertagespflege möchten Eltern die Betreuungsperson und das Angebot kennenlernen. Anna-Lena’s Kinderkörbchen brauchte dafür einen persönlichen, gut verständlichen Auftritt.',
    solution:
      'Eine warme Farbwelt und der persönliche Einstieg stellen die Betreuungsperson vor. Die Seitenstruktur bündelt die Informationen zum Angebot und führt zur Kontaktaufnahme. Das vorhandene Google-Unternehmensprofil ergänzt den Website-Auftritt in der lokalen Suche.',
    scope: [
      'Individuelle Website',
      'Struktur für Angebot und Vertrauen',
      'Responsive Darstellung für alle Geräte',
      'Grundlagen für die Auffindbarkeit',
    ],
    faqs: [
      {
        question: 'Warum ist Vertrauen bei der Kindertagespflege so wichtig?',
        answer:
          'Eltern vertrauen der Tagespflege ihr Kind an. Bevor man sich kennt, ist die Website oft der erste Eindruck. Sie soll zeigen, wer die Betreuungsperson ist, wie das Angebot aussieht und wie Eltern Kontakt aufnehmen können.',
      },
      {
        question: 'Was macht diese Referenz besonders?',
        answer:
          'Die warme Farbwelt und der persönliche Einstieg mit Porträtfoto und Begrüßung. Zuerst sieht man die Betreuungsperson, danach folgen klar gegliederte Informationen zum Angebot.',
      },
      {
        question: 'Welche Rolle spielt das Google-Unternehmensprofil?',
        answer:
          'Eltern suchen eine Betreuung meist in der Nähe. Das Google-Unternehmensprofil von Anna-Lena’s Kinderkörbchen zeigt Standort und Kontakt direkt in der Suche und ergänzt so die Website. Wichtig ist, dass beide Auftritte dieselben Angaben verwenden.',
      },
      {
        question: 'Eignet sich das auch für andere Betreuungsangebote?',
        answer:
          'Ja, etwa für Tagesmütter und Tagesväter, Kitas, Nachhilfe oder Familienangebote. Überall dort, wo Eltern eine persönliche Entscheidung treffen, helfen eine warme Gestaltung, echte Fotos und eine einfache Kontaktaufnahme.',
      },
      {
        question: 'Wie wurde die Seite für das Smartphone umgesetzt?',
        answer:
          'Die Website ist responsiv aufgebaut und passt sich jeder Bildschirmgröße an. Viele Eltern informieren sich zwischendurch auf dem Handy. Deshalb sind Texte gut lesbar, Bilder sauber skaliert und die Kontaktmöglichkeiten auch auf kleinen Displays schnell zu finden.',
      },
    ],
    ...screens(
      'kinderkoerbchen',
      'Startseite von Anna-Lena’s Kinderkörbchen am Laptop: „Tagesmutter in Eisingen bei Würzburg“ neben einem Porträtfoto.',
      'Startseite von Anna-Lena’s Kinderkörbchen auf dem Smartphone mit Hinweis auf einen freien Betreuungsplatz.',
    ),
  },
];

/** Alle Arbeiten sind echte Kundenprojekte. */
export const works: readonly Work[] = projects;

/** Referenzen für „Ausgewählte Arbeiten“ auf der Startseite. */
export const featuredProjects: readonly ProjectWork[] = projects;

export function getWork(slug: string): Work | undefined {
  return works.find((w) => w.slug === slug);
}

export const workFilters: readonly { readonly key: CaseFilter; readonly label: string }[] = [
  { key: 'websites', label: 'Websites' },
  { key: 'gastronomie', label: 'Gastronomie' },
  { key: 'kreativ', label: 'Kreative' },
  { key: 'lokale-dienstleister', label: 'Lokale Dienstleister' },
];
