export type ServiceKey =
  'websites' | 'seo-geo' | 'google' | 'branding' | 'ads' | 'video' | 'social' | 'ki';

export interface ServiceSection {
  readonly title: string;
  readonly body: string;
}

export interface Service {
  readonly key: ServiceKey;
  readonly slug: string;
  readonly href: string;
  readonly order: number;
  /** Kern-Leistung (Website) vs. andockende Erweiterung. */
  readonly isCore: boolean;
  /** Kurzes Navigations-/Karten-Label. */
  readonly label: string;
  /** Karten-Titel auf der Startseite. */
  readonly cardTitle: string;
  /** Kurzer Teaser (Karte, Übersicht). */
  readonly teaser: string;
  /** Konkretes Beispiel, das bei Hover/Fokus die Karte redaktionell erweitert. */
  readonly example: string;
  /** H1 der Detailseite. */
  readonly detailH1: string;
  /** Einleitung auf der Detailseite. */
  readonly intro: string;
  readonly problem: string;
  readonly solution: string;
  /** Typische Bestandteile. */
  readonly components: readonly string[];
  /** Nutzen. */
  readonly benefits: readonly string[];
  /** Ablauf-Schritte. */
  readonly steps: readonly string[];
  /** Passende Zielgruppen. */
  readonly audiences: readonly string[];
  /** Weitere redaktionelle Abschnitte der Detailseite. */
  readonly sections: readonly ServiceSection[];
}

export const services: readonly Service[] = [
  {
    key: 'websites',
    slug: 'websites',
    href: '/leistungen/websites/',
    order: 1,
    isCore: true,
    label: 'Websites',
    cardTitle: 'Individuelle Websites',
    teaser:
      'Der Kern. Struktur, Design, Inhalte und Technik werden für dein Unternehmen entwickelt und nicht aus einem Template zusammengeklickt.',
    example:
      'Beispiel: Ein Handwerksbetrieb bekommt eine klare Leistungsstruktur, schnelle Kontaktwege und eine Karriere-Sektion, die wirklich zum Betrieb passt. Keine Baukasten-Startseite.',
    detailH1: 'Websites, die nicht nur gut aussehen.',
    intro:
      'Deine Website soll nicht zeigen, dass du eine Website hast. Sie soll zeigen, warum man sich für dein Unternehmen entscheiden sollte.',
    problem:
      'Viele Unternehmensseiten sind technisch veraltet, langsam, schwer bedienbar und wirken austauschbar. Gute Betriebe verlieren dadurch Anfragen und Bewerber.',
    solution:
      'Jede KERNSEITE beginnt mit dem Unternehmen: Ziele, Zielgruppen und Nutzerführung. Darauf folgen individuelles Design, sauberer Code und eine Technik, die schnell, sicher und wartbar ist.',
    components: [
      'Strategie und Zieldefinition',
      'Seiten- und Nutzerführung (Informationsarchitektur)',
      'Individuelles Screendesign',
      'Responsive Entwicklung mit semantischem HTML',
      'SEO- und GEO-Grundlagen sowie strukturierte Daten',
      'Barrierearmut nach modernen Standards',
      'Performance-Optimierung',
      'Datenschutzfreundliche Umsetzung und sichere Formulare',
      'Hosting, Wartung und laufende Betreuung',
    ],
    benefits: [
      'Ein Auftritt, der zur tatsächlichen Qualität deines Betriebs passt',
      'Mehr qualifizierte Anfragen durch klare Nutzerführung',
      'Bessere Auffindbarkeit durch saubere Technik',
      'Volle Kontrolle: Inhalte lassen sich weiterentwickeln',
    ],
    steps: ['Strategie', 'Struktur', 'Design', 'Entwicklung', 'Veröffentlichung', 'Betreuung'],
    audiences: [
      'Handwerksbetriebe',
      'Praxen',
      'Gastronomie & Hotels',
      'Lokale Dienstleister',
      'B2B-Mittelstand',
    ],
    sections: [
      {
        title: 'Strategie vor Gestaltung',
        body: 'Bevor gestaltet wird, klären wir Ziele, Zielgruppen und die wichtigsten Wege durch die Seite. So entsteht eine Struktur, die Besucher führt statt verwirrt.',
      },
      {
        title: 'Individuelles Design statt Baukasten',
        body: 'Farben, Typografie und Bildsprache werden auf dein Unternehmen abgestimmt. Kein austauschbares Theme, sondern ein eigenständiger Auftritt.',
      },
      {
        title: 'Mobile Nutzerführung',
        body: 'Die meisten Besucher kommen über das Smartphone. Deshalb wird das mobile Layout eigenständig gestaltet und nicht einfach zusammengeschoben.',
      },
      {
        title: 'Performance & Technik',
        body: 'Optimierte Bilder, wenig JavaScript, saubere Auslieferung. Das Ergebnis lädt schnell und läuft auf normalem deutschen Webhosting.',
      },
      {
        title: 'SEO/GEO-Grundlage',
        body: 'SEO steht für Suchmaschinenoptimierung: technisch saubere, gut auffindbare Seiten. GEO meint die Optimierung für KI-Antwortsysteme, die klare Fakten über dein Unternehmen erkennen können.',
      },
      {
        title: 'Datenschutz & Barrierearmut',
        body: 'Standardmäßig ohne externe Tracker und ohne fremde CDNs. Semantische Struktur, Tastaturbedienbarkeit und ausreichende Kontraste als Qualitätsstandard.',
      },
    ],
  },
  {
    key: 'seo-geo',
    slug: 'seo-geo',
    href: '/leistungen/seo-geo/',
    order: 2,
    isCore: false,
    label: 'SEO & GEO',
    cardTitle: 'SEO & GEO',
    teaser:
      'Gefunden werden: in der Google-Suche und in KI-Antworten. SEO sorgt für saubere, auffindbare Seiten, GEO und GAIO verbessern die Verständlichkeit deiner Inhalte für KI-Antwortsysteme.',
    example:
      'Beispiel: Eine Praxis bekommt je Behandlungsschwerpunkt eine eigene, klar verständliche Seite. So finden Suchmaschinen und Antwortsysteme dieselbe Aussage.',
    detailH1: 'Gefunden werden. Und richtig wiedergegeben.',
    intro:
      'Suche passiert längst nicht mehr nur bei Google. Immer öfter beantworten Systeme die Frage direkt und nutzen dafür Inhalte, die sie irgendwo gelesen haben. Beides braucht dieselbe Grundlage: klare, überprüfbare Inhalte auf einer technisch sauberen Seite.',
    problem:
      'Viele Seiten sind technisch langsam, thematisch unscharf und beantworten keine konkrete Frage. Dann fehlt Google die Grundlage für ein gutes Ergebnis, und Antwortsysteme geben Falsches oder gar nichts wieder.',
    solution:
      'Wir bauen die Inhalte entlang echter Fragen auf, geben jeder Seite genau ein Thema, sorgen für saubere Technik und machen Fakten wie Standort, Leistungen und Zuständigkeit eindeutig auslesbar.',
    components: [
      'Themen- und Fragenrecherche statt Keyword-Listen',
      'Eine klare Aufgabe pro Seite (Struktur & interne Verlinkung)',
      'Technische Grundlagen: Ladezeit, semantisches HTML, Sitemap, Canonicals',
      'Strukturierte Daten für Unternehmen, Leistungen und FAQ',
      'Verständliche, beantwortende Textstruktur (GEO-tauglich)',
      'Lokale Signale für Würzburg und die Region',
    ],
    benefits: [
      'Deine Seiten sind für Menschen und Maschinen eindeutig',
      'Eindeutige Fakten als Grundlage für Antwortsysteme',
      'Mehr qualifizierte Anfragen statt Zufallsbesuche',
      'Eine Grundlage, die auch bei künftigen Suchsystemen trägt',
    ],
    steps: [
      'Bestandsaufnahme: Was ist auffindbar, was fehlt?',
      'Fragen und Themen je Zielgruppe sammeln',
      'Seitenstruktur und interne Verlinkung festlegen',
      'Inhalte beantwortend schreiben',
      'Technik und strukturierte Daten umsetzen',
      'Sichtbarkeit beobachten und nachschärfen',
    ],
    audiences: ['Lokale Dienstleister', 'Praxen', 'Gastronomie & Hotels', 'B2B-Mittelstand'],
    sections: [
      {
        title: 'Was GEO bedeutet',
        body: 'GEO steht für Generative Engine Optimization: die Optimierung für Systeme, die Antworten erzeugen statt Linklisten. Entscheidend sind klare Fakten, eindeutige Zuständigkeit und eine Struktur, die eine Frage tatsächlich beantwortet.',
      },
      {
        title: 'Was wir nicht versprechen',
        body: 'Keine Platzierungen, keine Garantien, keine Tricks. Sichtbarkeit lässt sich verbessern. Wir arbeiten an den Grundlagen, die du selbst in der Hand hast, und sagen offen, was Zeit braucht.',
      },
    ],
  },
  {
    key: 'google',
    slug: 'google-unternehmensprofil',
    href: '/leistungen/google-unternehmensprofil/',
    order: 3,
    isCore: false,
    label: 'Google-Sichtbarkeit',
    cardTitle: 'Google-Unternehmensprofil',
    teaser:
      'Gefunden werden, wenn es vor Ort zählt. Ein sauber gepflegtes Profil macht dein Angebot und deinen Standort für Google eindeutig.',
    example:
      'Beispiel: Eine Praxis erhält korrekte Kategorien, klare Leistungen, aktuelle Bilder und einen Prozess, um auf Bewertungen zu antworten.',
    detailH1: 'Gefunden werden, wenn es vor Ort zählt.',
    intro:
      'Wer in der Nähe sucht, entscheidet schnell. Ein konsistentes Google-Unternehmensprofil sorgt dafür, dass dein Unternehmen richtig verstanden und gefunden wird.',
    problem:
      'Unvollständige oder widersprüchliche Profildaten führen dazu, dass Google Angebot und Standort nicht eindeutig zuordnet und Interessenten dich bei passenden Suchanfragen schwerer finden.',
    solution:
      'Wir richten das Profil sauber ein oder optimieren es: passende Kategorien, klare Leistungen, aktuelle Inhalte und ein Prozess für Bewertungen, alles abgestimmt auf deine Website.',
    components: [
      'Analyse des bestehenden Profils',
      'Passende Kategorien und Leistungen',
      'Aussagekräftige Unternehmensbeschreibung',
      'Bilder und Aktualität',
      'Bewertungsprozess und Antworten',
      'Konsistente Kontaktdaten (NAP)',
      'Zusammenspiel mit der Website',
    ],
    benefits: [
      'Bessere lokale Auffindbarkeit',
      'Klarere Zuordnung von Angebot und Standort',
      'Mehr Vertrauen durch aktuelle, konsistente Angaben',
    ],
    steps: [
      'Analyse',
      'Einrichtung/Optimierung',
      'Inhalte & Bilder',
      'Bewertungsprozess',
      'Betreuung',
    ],
    audiences: ['Lokale Dienstleister', 'Praxen', 'Handwerk', 'Gastronomie & Hotels'],
    sections: [
      {
        title: 'Konsistente Unternehmensdaten',
        body: 'Name, Adresse und Telefonnummer müssen überall gleich sein. Widersprüche schwächen die lokale Sichtbarkeit.',
      },
      {
        title: 'Bewertungen und Antworten',
        body: 'Wir richten einen einfachen Prozess ein, um Bewertungen zu erhalten und professionell zu beantworten. Gekauft oder gefälscht wird dabei nichts.',
      },
      {
        title: 'Ehrliche Erwartungen',
        body: 'Wir geben keine Ranking-Garantien. Lokale Sichtbarkeit entsteht durch saubere Daten, Relevanz und kontinuierliche Pflege.',
      },
    ],
  },
  {
    key: 'branding',
    slug: 'branding',
    href: '/leistungen/branding/',
    order: 4,
    isCore: false,
    label: 'Branding & Design',
    cardTitle: 'Branding & Corporate Design',
    teaser:
      'Ein klares, wiedererkennbares Gesicht für dein Unternehmen: Logo, Farben, Schriften und die Regeln dahinter. Damit du überall gleich stark auftrittst.',
    example:
      'Beispiel: Ein Handwerksbetrieb bekommt ein überarbeitetes Logo, eine feste Farbwelt und Vorlagen für Visitenkarten, Fahrzeugbeschriftung und Social Media.',
    detailH1: 'Ein Auftritt, an den man sich erinnert.',
    intro:
      'Menschen erkennen dich, bevor sie lesen. Ein durchdachtes Corporate Design sorgt dafür, dass Website, Visitenkarte und Instagram wie aus einem Guss wirken.',
    problem:
      'Viele Betriebe haben über die Jahre ein Logo hier, eine Farbe dort und Schriften von überall gesammelt. Das wirkt unruhig und schwächt das Vertrauen, obwohl die Arbeit dahinter gut ist.',
    solution:
      'Wir entwickeln eine Markenidentität, die zu dir passt: Logo, Farben, Typografie und Bildsprache, festgehalten in einem verständlichen Styleguide, den du und andere sofort anwenden können.',
    components: [
      'Markenworkshop und Positionierung',
      'Logo-Entwicklung oder Überarbeitung',
      'Farbwelt und Typografie',
      'Bildsprache und Gestaltungsregeln',
      'Styleguide als handliches Dokument',
      'Geschäftsausstattung: Visitenkarte, Briefpapier, Signatur',
      'Vorlagen für Social Media und Präsentationen',
    ],
    benefits: [
      'Ein einheitlicher Auftritt auf allen Kanälen',
      'Mehr Wiedererkennung und Vertrauen',
      'Klare Regeln, die jeder umsetzen kann',
    ],
    steps: ['Workshop', 'Entwürfe', 'Feinschliff', 'Styleguide', 'Anwendung'],
    audiences: ['Gründer', 'Handwerk', 'Lokale Dienstleister', 'B2B-Mittelstand'],
    sections: [
      {
        title: 'Vom Logo zum System',
        body: 'Ein Logo allein ist noch keine Marke. Erst Farben, Schriften und klare Regeln machen daraus einen Auftritt, der überall funktioniert.',
      },
      {
        title: 'Passt zur Website',
        body: 'Weil Branding und Website aus einer Hand kommen, greift alles ineinander. Kein Abstimmen zwischen verschiedenen Agenturen.',
      },
    ],
  },
  {
    key: 'ads',
    slug: 'performance-marketing',
    href: '/leistungen/performance-marketing/',
    order: 5,
    isCore: false,
    label: 'Performance Marketing',
    cardTitle: 'Performance Marketing',
    teaser:
      'Deine Angebote gezielt vor die richtigen Menschen bringen. Mit Google und Meta Ads, passenden Landingpages und Zahlen, die du verstehst.',
    example:
      'Beispiel: Ein Betrieb sucht Azubis. Eine Kampagne auf Instagram führt auf eine eigene Karriereseite mit kurzem Bewerbungsformular.',
    detailH1: 'Mehr Anfragen. Planbar statt zufällig.',
    intro:
      'Gute Werbung erreicht nicht möglichst viele Menschen, sondern die richtigen. Wir planen Kampagnen, die zu deinem Ziel passen, und zeigen dir offen, was sie bringen.',
    problem:
      'Viele Anzeigen laufen ins Leere: falsche Zielgruppe, keine passende Zielseite, keine Messung. Das Budget ist weg, und niemand weiß, was gewirkt hat.',
    solution:
      'Wir verbinden Kampagne, Landingpage und Auswertung. So siehst du, welche Anzeige Anfragen bringt, und wir können das Budget dorthin lenken, wo es wirkt.',
    components: [
      'Zielklärung und Kampagnenplanung',
      'Google Ads (Suche und lokale Anzeigen)',
      'Meta Ads (Instagram und Facebook)',
      'Anzeigentexte und Motive',
      'Landingpages für Kampagnen',
      'Datenschutzkonformes Tracking',
      'Auswertung und Optimierung',
    ],
    benefits: [
      'Gezielte Reichweite statt Streuverlust',
      'Nachvollziehbare Ergebnisse',
      'Kampagnen und Website aus einer Hand',
    ],
    steps: ['Ziel', 'Planung', 'Anzeigen & Landingpage', 'Start', 'Auswertung'],
    audiences: ['Handwerk', 'Lokale Dienstleister', 'Gastronomie & Hotels', 'B2B-Mittelstand'],
    sections: [
      {
        title: 'Ehrliche Zahlen',
        body: 'Wir versprechen keine Wunderwerte. Du bekommst eine verständliche Auswertung, was die Kampagne gekostet und gebracht hat.',
      },
      {
        title: 'Budget bleibt deins',
        body: 'Das Werbebudget zahlst du direkt an Google oder Meta. Unsere Leistung für Planung, Umsetzung und Betreuung wird davon getrennt vereinbart.',
      },
    ],
  },
  {
    key: 'video',
    slug: 'unternehmensvideo',
    href: '/leistungen/unternehmensvideo/',
    order: 6,
    isCore: false,
    label: 'Foto & Video',
    cardTitle: 'Foto & Video Produktion',
    teaser:
      'Zeig, was Texte allein nicht vermitteln können. Fotos und Filme mit echten Einblicken schaffen Vertrauen, auf der Website und in Social Media.',
    example:
      'Beispiel: Ein kurzer Website-Clip zeigt Team und Arbeitsweise. Datenschutzfreundlich eingebunden, ohne Autoplay mit Ton.',
    detailH1: 'Zeig, was Texte allein nicht vermitteln können.',
    intro:
      'Menschen vertrauen dem, was sie sehen. Ein gutes Unternehmensvideo macht Atmosphäre, Team und Arbeitsweise erlebbar.',
    problem:
      'Reine Textseiten wirken oft distanziert. Gerade Vertrauen, Handschlagqualität und Atmosphäre lassen sich schwer beschreiben.',
    solution:
      'Von der Idee über Fotoshooting und Dreh bis zum Schnitt: Wir produzieren Bild- und Videomaterial entlang deiner Ziele und binden es performant und datenschutzfreundlich ein.',
    components: [
      'Konzeption und Briefing',
      'Fotoshootings für Team, Räume und Produkte',
      'Drehplanung und Dreh',
      'Unternehmensfilm',
      'Recruitingfilm',
      'Kurze Website-Clips',
      'Mitarbeiter- und Prozessaufnahmen',
      'Schnitt und Motion Design',
      'Technische Website-Integration',
    ],
    benefits: [
      'Mehr Vertrauen durch echte Einblicke',
      'Stärkere Wirkung auf Website und Social Media',
      'Unterstützung beim Recruiting',
    ],
    steps: ['Konzept', 'Planung', 'Shooting & Dreh', 'Schnitt', 'Einbindung'],
    audiences: ['Handwerk', 'Hotels & Gastronomie', 'B2B-Mittelstand', 'Praxen'],
    sections: [
      {
        title: 'Datenschutzfreundliche Einbindung',
        body: 'Keine automatisch startenden Videos mit Ton, kein fremder Player, der ungefragt lädt. Die Vorschau wird lokal ausgeliefert; der Player startet erst nach aktivem Klick.',
      },
      {
        title: 'Vom Clip bis zum Recruitingfilm',
        body: 'Kurze Sequenzen für die Startseite, ein ausführlicher Unternehmensfilm oder ein Recruitingfilm für offene Stellen, ganz nach deinem Ziel.',
      },
    ],
  },
  {
    key: 'social',
    slug: 'social-media',
    href: '/leistungen/social-media/',
    order: 7,
    isCore: false,
    label: 'Social Media',
    cardTitle: 'Social Media Content',
    teaser:
      'Eine Marke muss nicht jeden Tag posten. Sie muss erkennbar bleiben. Strategie und Wiedererkennung statt Aktionismus.',
    example:
      'Beispiel: Ein Brandbook definiert Look und Tonalität, ein Redaktionsplan sorgt für regelmäßige, erkennbare Beiträge.',
    detailH1: 'Eine Marke muss nicht jeden Tag posten. Sie muss erkennbar bleiben.',
    intro:
      'Guter Social-Media-Auftritt beginnt mit einer klaren Marke und einem realistischen Plan und nicht mit Dauerdruck.',
    problem:
      'Ohne Strategie und Wiedererkennung verpufft der Aufwand: uneinheitliche Beiträge, unklare Botschaft, keine Verbindung zur Website.',
    solution:
      'Wir schaffen einen erkennbaren Markenauftritt, planbare Inhalte und die Verbindung zu Website und Kampagnen.',
    components: [
      'Social-Media-Strategie',
      'Markenauftritt und Brandbook',
      'Content-Säulen',
      'Reels und Kurzvideos',
      'Redaktionelle Planung',
      'Laufende Betreuung',
      'Verbindung mit Website und Kampagnen',
    ],
    benefits: [
      'Wiedererkennbarer Auftritt',
      'Planbarkeit statt Aktionismus',
      'Verbindung von Reichweite und Website',
    ],
    steps: ['Strategie', 'Brandbook', 'Redaktionsplan', 'Produktion', 'Betreuung'],
    audiences: ['Gastronomie & Hotels', 'Handwerk', 'Lokale Dienstleister', 'B2B-Mittelstand'],
    sections: [
      {
        title: 'Brandbook als Grundlage',
        body: 'Ein kompaktes Brandbook legt Farben, Typografie, Bildsprache und Tonalität fest, damit jeder Beitrag erkennbar bleibt.',
      },
      {
        title: 'Realistische Frequenz',
        body: 'Lieber wenige, gute und konsistente Beiträge als täglicher Druck. Der Plan richtet sich nach deinen Ressourcen.',
      },
    ],
  },
  {
    key: 'ki',
    slug: 'ki-automatisierung',
    href: '/leistungen/ki-automatisierung/',
    order: 8,
    isCore: false,
    label: 'KI & Automatisierung',
    cardTitle: 'KI & Automatisierung',
    teaser:
      'Automatisiere Arbeit. Nicht die Beziehung zum Kunden. Sinnvolle Werkzeuge für wiederkehrende Abläufe, mit klaren Grenzen.',
    example:
      'Beispiel: Ein Website-Chatbot beantwortet häufige Fragen und bereitet Anfragen vor. Die eigentliche Beratung übernimmt ein Mensch.',
    detailH1: 'Automatisiere Arbeit. Nicht die Beziehung zum Kunden.',
    intro:
      'KI ist ein Werkzeug, keine Marke. Sinnvoll eingesetzt, nimmt sie Routinearbeit ab, ohne den persönlichen Kontakt zu ersetzen.',
    problem:
      'Wiederkehrende Anfragen, Terminkoordination und immer gleiche Fragen kosten Zeit. Gleichzeitig soll die Beziehung zum Kunden persönlich bleiben.',
    solution:
      'Wir setzen KI dort ein, wo sie klar hilft: Anfragen qualifizieren, Termine vorbereiten, FAQ automatisieren. Immer mit Übergabe an einen Menschen und mit Blick auf den Datenschutz.',
    components: [
      'Website-Chatbots',
      'Voice Agents',
      'Anfragequalifizierung',
      'Terminvorbereitung',
      'FAQ-Automatisierung',
      'CRM-Übergabe',
      'Individuelle Integrationen',
    ],
    benefits: [
      'Weniger Routinearbeit',
      'Schnellere erste Antworten',
      'Saubere Übergabe an einen Menschen',
    ],
    steps: ['Einsatzfälle klären', 'Konzept', 'Integration', 'Test', 'Betreuung'],
    audiences: ['B2B-Mittelstand', 'Lokale Dienstleister', 'Praxen', 'Handwerk'],
    sections: [
      {
        title: 'Ein Voice Agent, einfach erklärt',
        body: 'Ein Voice Agent ist ein sprachgesteuerter Assistent, der z. B. Anrufe annehmen, häufige Fragen beantworten oder Termine vorbereiten kann. Er ersetzt keine Beratung, sondern entlastet bei Routine.',
      },
      {
        title: 'Datenschutz und menschliche Übergabe',
        body: 'Automatisierung endet dort, wo persönliche Beratung beginnt. Übergaben an Menschen sind fester Bestandteil, nicht die Ausnahme.',
      },
      {
        title: 'Klare Grenzen',
        body: 'Kein „vollautomatisches Unternehmen“, keine futuristischen Versprechen. Nur das, was messbar Arbeit abnimmt.',
      },
    ],
  },
];

export function getService(key: ServiceKey): Service {
  const s = services.find((service) => service.key === key);
  if (!s) throw new Error(`Unbekannte Leistung: ${key}`);
  return s;
}
