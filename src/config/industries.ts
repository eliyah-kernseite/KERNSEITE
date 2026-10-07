export interface Industry {
  readonly slug: string;
  readonly href: string;
  readonly label: string;
  readonly title: string;
  /**
   * Titel für Suchergebnisse. Die sichtbare Überschrift bleibt markenstark;
   * hier steht, wonach tatsächlich gesucht wird. Eine Branche = eine
   * Suchintention, keine Aufzählung von Schreibvarianten.
   */
  readonly seoTitle: string;
  /** Beschreibung für Suchergebnisse, 140–160 Zeichen, in ganzen Sätzen. */
  readonly metaDescription: string;
  /** Beschriftung des Abschluss-CTA – benennt das Vorhaben, nicht die Aktion. */
  readonly ctaLabel: string;
  /** Kurzes Nutzenargument für die typografische Branchenliste. */
  readonly argument: string;
  readonly detailH1: string;
  readonly intro: string;
  /** Eigenständige Schwerpunkte (kein Textklon zwischen Branchen). */
  readonly focus: readonly { readonly title: string; readonly body: string }[];
  /** Passende Leistungen (service keys). */
  readonly relatedServices: readonly string[];
  /** Kurztexte der passenden Leistungen, je Branche eigenständig. */
  readonly relatedTeasers: Readonly<Record<string, string>>;
  /** Überschrift des Abschluss-Banners, je Branche eigenständig. */
  readonly ctaTitle: string;
  /** Text zur passenden Referenz, falls vorhanden. */
  readonly referenceText?: string;
  /** Text im Abschluss-Banner, je Branche eigenständig. */
  readonly ctaText: string;
  /** Häufige Fragen der Branche (eigenständig, kein Textklon). */
  readonly faqs: readonly { readonly question: string; readonly answer: string }[];
}

export const industries: readonly Industry[] = [
  {
    slug: 'handwerk',
    href: '/branchen/handwerk/',
    label: 'Handwerk',
    title: 'Handwerk',
    seoTitle: 'Webdesign für Handwerker',
    metaDescription:
      'Website für Handwerksbetriebe: Leistungen verständlich zeigen, regional gefunden werden und Anfragen wie Bewerbungen einfach machen.',
    ctaLabel: 'Website fürs Handwerk besprechen',
    argument: 'Zeig deine Qualität, gewinne Aufträge und Bewerber. Mit klaren Kontaktwegen.',
    detailH1: 'Websites fürs Handwerk. Leistungen zeigen, Anfragen erleichtern.',
    intro:
      'Ein etablierter Betrieb verdient einen Auftritt, der die tatsächliche Qualität zeigt und neben Kunden auch Bewerber überzeugt.',
    focus: [
      {
        title: 'Leistungen verständlich darstellen',
        body: 'Eigene Seiten für deine wichtigsten Leistungen zeigen Material, Vorgehen und passende Projektbeispiele. Ob Reparatur, Ausbau oder Maßanfertigung: Interessenten erkennen, mit welchem Anliegen sie bei dir richtig sind.',
      },
      {
        title: 'Passende Anfragen erhalten',
        body: 'Dein Einsatzgebiet, die Art des Vorhabens und der gewünschte Termin helfen bei der Einordnung. Ein kurzes Anfrageformular kann diese Angaben direkt abfragen.',
      },
      {
        title: 'Referenzen und Baustellen',
        body: 'Abgeschlossene Projekte und Baustellen zeigen greifbar, was der Betrieb kann. Mit echten Bildern statt Stockfotos.',
      },
      {
        title: 'Bewerber gewinnen',
        body: 'Eine ehrliche Karriere-Sektion mit Einblicken ins Team spricht Fachkräfte an, die zu modernen Betrieben wollen.',
      },
      {
        title: 'Schnelle Kontaktwege',
        body: 'Anruf, Rückrufwunsch oder kurzes Formular: Der schnellste Weg zur Anfrage steht im Vordergrund.',
      },
    ],
    relatedServices: ['websites', 'google', 'video'],
    ctaTitle: 'Eine Website, die zeigt, was dein Betrieb kann.',
    relatedTeasers: {
      websites:
        'Eine eigene Website für deinen Betrieb, die Leistungen, Referenzen und Kontaktwege sauber ordnet und nicht nach Baukasten aussieht.',
      google:
        'Ein gepflegtes Google-Profil zeigt Einsatzgebiet, Leistungen und Erreichbarkeit, wenn jemand in deiner Nähe einen Handwerksbetrieb sucht.',
      video:
        'Echte Bilder von Baustelle, Werkstatt und Team zeigen, wie dein Betrieb arbeitet, und helfen auch bei der Suche nach Fachkräften.',
    },
    ctaText:
      'Im ersten Gespräch klären wir, welche Leistungen, Aufträge und Bewerber für deinen Betrieb wirklich zählen.',
    faqs: [
      {
        question: 'Was gehört auf die Website eines Handwerksbetriebs?',
        answer:
          'Im Mittelpunkt stehen deine Leistungen, dein Einsatzgebiet und echte Bilder aus deiner Arbeit. Dazu kommen eine kurze Vorstellung des Betriebs, Referenzen, Kontaktwege und bei Bedarf ein Bereich für Bewerber. Wichtig ist, dass Kunden schnell erkennen, ob du für ihr Anliegen der richtige Ansprechpartner bist.',
      },
      {
        question: 'Brauche ich als Handwerker eine Website, wenn die Auftragslage gut ist?',
        answer:
          'Auch bei voller Auftragslage informieren sich Kunden und Bewerber online, bevor sie anrufen. Eine gute Website zeigt Leistungen und Qualität und hilft dir, gezielter die Aufträge zu bekommen, die zu deinem Betrieb passen. Außerdem ist sie eine wichtige Anlaufstelle für Fachkräfte, die einen neuen Arbeitgeber suchen.',
      },
      {
        question: 'Wie bekomme ich gute Fotos von meinen Baustellen?',
        answer:
          'Oft reichen schon sorgfältig gemachte Handyfotos von fertigen Arbeiten, Material und Werkstatt. Wir sagen dir vorher, worauf du achten solltest. Für Teamfotos, Imagefilme oder Aufnahmen für die Karriereseite planen wir auf Wunsch einen eigenen Foto- und Drehtermin.',
      },
      {
        question: 'Wie wird mein Betrieb in der Region gefunden?',
        answer:
          'Eine Website, die deine Leistungen fürs jeweilige Einsatzgebiet klar benennt, ein gepflegtes Google-Unternehmensprofil und einheitliche Kontaktdaten sind eine gute Grundlage. Wie weit oben du erscheinst, hängt auch vom Wettbewerb ab. Eine bestimmte Platzierung kann deshalb niemand seriös versprechen.',
      },
      {
        question: 'Wie kann die Website Anfragen erleichtern?',
        answer:
          'Indem sie die wichtigsten Angaben gleich mit abfragt: Art des Vorhabens, Ort, gewünschter Zeitraum und bei Bedarf Fotos. So weißt du schon vor dem Rückruf, worum es geht, und kannst besser einschätzen, ob der Auftrag passt. Für Kunden ist ein kurzes Formular oft angenehmer als ein Anruf zur falschen Zeit.',
      },
    ],
  },
  {
    slug: 'zahnarztpraxen',
    href: '/branchen/zahnarztpraxen/',
    label: 'Zahnarztpraxen',
    title: 'Zahnarztpraxen & medizinische Praxen',
    seoTitle: 'Webdesign für Zahnarztpraxen',
    metaDescription:
      'Praxis-Website, die Vertrauen schafft: ruhige Nutzerführung, klar erklärte Leistungen und einfache Terminwege. Ganz ohne Heilversprechen.',
    ctaLabel: 'Praxis-Website besprechen',
    argument: 'Vertrauen, ruhige Nutzerführung und klare Terminwege. Ohne Heilversprechen.',
    detailH1: 'Praxis-Websites, die Vertrauen schaffen und Termine erleichtern.',
    intro:
      'Patientinnen und Patienten entscheiden sich für Menschen, denen sie vertrauen. Eine ruhige, klare Website unterstützt genau das.',
    focus: [
      {
        title: 'Vertrauen und ruhige Nutzerführung',
        body: 'Klare Struktur, angenehme Bildsprache und verständliche Sprache. Nichts Reißerisches, nichts Überladenes.',
      },
      {
        title: 'Leistungen und Behandlungsschwerpunkte',
        body: 'Eigene Leistungsseiten erklären Behandlungsabläufe und organisatorische Fragen. Medizinische Inhalte und berufsrechtliche Pflichtangaben werden von der Praxis geliefert und fachlich freigegeben.',
      },
      {
        title: 'Team',
        body: 'Ein sympathisches, echtes Team-Kapitel senkt die Hemmschwelle für den ersten Termin.',
      },
      {
        title: 'Terminwege',
        body: 'Klare Wege zum Termin: Telefon, Formular oder ein externer Terminlink, der sich erst nach Klick öffnet.',
      },
      {
        title: 'Lokale Sichtbarkeit',
        body: 'Ein konsistentes Google-Profil hilft, wenn Menschen in der Nähe eine Praxis suchen.',
      },
    ],
    relatedServices: ['websites', 'google', 'ki'],
    ctaTitle: 'Eine Praxis-Website, die Patienten Sicherheit gibt.',
    relatedTeasers: {
      websites:
        'Eine Praxis-Website, die Behandlungen verständlich erklärt, das Team vorstellt und Patienten schnell zum Termin führt.',
      google:
        'Ein vollständiges Praxisprofil bei Google macht Adresse, Sprechzeiten und Kontakt für Patienten aus der Umgebung sofort sichtbar.',
      ki: 'Wiederkehrende Fragen und Abläufe rund um Termine lassen sich sinnvoll automatisieren, ohne den persönlichen Kontakt zu ersetzen.',
    },
    ctaText:
      'Im ersten Gespräch klären wir, was Patientinnen, Patienten und dein Praxisteam von der Website brauchen.',
    faqs: [
      {
        question: 'Was macht gute Praxis-Websites aus?',
        answer:
          'Gute Praxis-Websites schaffen Vertrauen, bevor Patientinnen und Patienten die Praxis betreten. Sie zeigen das Team, erklären Behandlungen verständlich und beantworten organisatorische Fragen: Wo ist die Praxis, wann sind Sprechzeiten und wie komme ich zu einem Termin? Eine ruhige Gestaltung hilft gerade Menschen, die mit einem mulmigen Gefühl zum Zahnarzt gehen.',
      },
      {
        question: 'Wie lässt sich die Vergabe von Terminen erleichtern?',
        answer:
          'Je nach Praxis über eine gut sichtbare Telefonnummer, ein Anfrageformular oder ein externes Buchungssystem. Externe Terminlinks öffnen sich erst nach einem Klick, damit keine Daten ungefragt übertragen werden. Welche Lösung passt, hängt von euren Abläufen an der Rezeption ab.',
      },
      {
        question: 'Wer liefert die medizinischen Inhalte?',
        answer:
          'Medizinische Aussagen, Behandlungsbeschreibungen und berufsrechtliche Pflichtangaben kommen von der Praxis und werden von euch fachlich freigegeben. Wir helfen dabei, sie verständlich zu formulieren und übersichtlich aufzubereiten. Heilversprechen und reißerische Formulierungen lassen wir bewusst weg.',
      },
      {
        question: 'Hilft die Website auch bei der Personalsuche?',
        answer:
          'Ja. Wer sich in einer Praxis bewirbt, schaut sich vorher meist die Website an. Ein eigener Bereich mit echten Einblicken ins Team, offenen Stellen und einem einfachen Bewerbungsweg macht die Praxis als Arbeitgeber sichtbar.',
      },
      {
        question: 'Welche Termine lassen sich online anfragen?',
        answer:
          'Das entscheidet die Praxis. Häufig eignen sich Kontrolltermine, Prophylaxe oder ein Erstgespräch für neue Patientinnen und Patienten. Akute Beschwerden sollten weiterhin telefonisch geklärt werden. Die Website macht diesen Unterschied klar sichtbar, damit niemand bei einem dringenden Anliegen im Formular landet.',
      },
      {
        question: 'Wie wirkt eine Praxis-Website auf ängstliche Patienten?',
        answer:
          'Ruhige Farben, freundliche Fotos des Teams und eine sachliche, warme Sprache nehmen Druck heraus. Hilfreich sind auch kurze Erklärungen, was bei einem ersten Termin passiert. Wer vorher weiß, was ihn erwartet, kommt entspannter in die Praxis.',
      },
    ],
  },
  {
    slug: 'gastronomie-hotels',
    href: '/branchen/gastronomie-hotels/',
    label: 'Gastronomie & Hotels',
    title: 'Gastronomie & Hotels',
    seoTitle: 'Webdesign für Gastronomie & Hotels',
    metaDescription:
      'Restaurant- und Hotel-Website: Atmosphäre zeigen, Speisekarte aktuell halten, Reservierung und Buchung erleichtern, Google-Profil verbinden.',
    ctaLabel: 'Website-Projekt besprechen',
    argument: 'Atmosphäre spürbar machen und Reservierungen bzw. Buchungen erleichtern.',
    detailH1: 'Websites für Gastronomie und Hotels, die Lust auf einen Besuch machen.',
    intro:
      'Bei Gastgebern zählt die Atmosphäre. Bilder, Video und klare Wege zur Reservierung oder Buchung machen den Unterschied.',
    focus: [
      {
        title: 'Atmosphäre',
        body: 'Die Stimmung des Hauses wird visuell erlebbar, mit hochwertigen Bildern und Videos statt Standardfotos.',
      },
      {
        title: 'Für Restaurants: Speisekarte und Öffnungszeiten',
        body: 'Eine mobil lesbare Speisekarte führt direkt zum Angebot. Öffnungszeiten, Standort, Anruf und Reservierungsweg sind schnell erreichbar. Das Projekt Kaya zeigt eine solche Umsetzung.',
      },
      {
        title: 'Für Hotels: Zimmer und Buchungsweg',
        body: 'Zimmerkategorien, Ausstattung, Anreise und Fragen zum Aufenthalt werden getrennt aufbereitet. Ein vorhandenes Buchungssystem kann nach technischer und datenschutzrechtlicher Prüfung angebunden werden; dessen Kosten sind separat zu berücksichtigen.',
      },
      {
        title: 'Google-Profil',
        body: 'Öffnungszeiten, Bilder und Bewertungen werden konsistent gepflegt, damit spontane Gäste dich finden.',
      },
      {
        title: 'Lokale und touristische Suche',
        body: 'Inhalte werden so strukturiert, dass sowohl Menschen aus der Region als auch Reisende dich finden.',
      },
    ],
    relatedServices: ['websites', 'video', 'google'],
    ctaTitle: 'Eine Website, die Lust auf deinen Betrieb macht.',
    referenceText:
      'So kann ein Gastro-Auftritt aussehen: Speisekarte und Wochenangebote stehen im Mittelpunkt, Anruf und Anfahrt sind jederzeit schnell erreichbar.',
    relatedTeasers: {
      websites:
        'Eine Website mit Speisekarte, Angeboten, Öffnungszeiten und Anfahrt, die auf dem Smartphone genauso gut funktioniert wie am Rechner.',
      video:
        'Fotos von Gerichten, Räumen und Team machen Lust auf einen Besuch, auf der Website ebenso wie in Social Media.',
      google:
        'Wer spontan essen gehen oder übernachten will, sucht bei Google. Ein aktuelles Profil zeigt Öffnungszeiten, Lage und Kontakt auf einen Blick.',
    },
    ctaText:
      'Im ersten Gespräch klären wir, was deine Gäste vor dem Besuch wissen wollen und wie sie am liebsten reservieren oder buchen.',
    faqs: [
      {
        question: 'Was erwarten Gäste von einer Restaurant-Website?',
        answer:
          'Vor allem schnelle Antworten: Was gibt es, wann ist geöffnet, wo ist das Lokal und wie reserviere oder bestelle ich? Gute Bilder und ein Gefühl für die Atmosphäre machen Lust auf einen Besuch. Alles sollte auf dem Smartphone funktionieren, denn dort wird meist gesucht.',
      },
      {
        question: 'Wie halte ich Speisekarte und Öffnungszeiten aktuell?',
        answer:
          'Wir bauen Speisekarte und Öffnungszeiten so auf, dass Änderungen schnell erledigt sind, entweder von dir selbst oder nach Absprache von uns. Wichtig ist, dass Website und Google-Profil dieselben Angaben zeigen. Widersprüchliche Öffnungszeiten verärgern Gäste.',
      },
      {
        question: 'Kann ich ein Reservierungs- oder Buchungssystem einbinden?',
        answer:
          'Ja, vorhandene Systeme lassen sich nach technischer und datenschutzrechtlicher Prüfung anbinden. Externe Inhalte laden erst nach einem Klick, damit Gäste selbst entscheiden. Die Kosten des jeweiligen Anbieters kommen zu den Websitekosten hinzu.',
      },
      {
        question: 'Lohnen sich eigene Fotos und Videos?',
        answer:
          'Für Gastgeber fast immer. Gäste wollen sehen, wie es bei dir aussieht und was auf den Teller kommt. Echte Aufnahmen von Speisen, Räumen, Terrasse oder Zimmern vermitteln die Atmosphäre deutlich besser als Stockfotos. Einen Foto- oder Drehtermin planen wir auf Wunsch mit.',
      },
      {
        question: 'Was ist bei Hotel-Websites besonders wichtig?',
        answer:
          'Gäste wollen Zimmer, Ausstattung und Lage vergleichen, bevor sie buchen. Klare Zimmerseiten mit guten Bildern, Informationen zur Anreise und Antworten auf typische Fragen zu Frühstück, Parken oder Haustieren helfen dabei. Ein deutlich sichtbarer Weg zur Buchung oder Anfrage sollte auf jeder Seite erreichbar sein.',
      },
    ],
  },
  {
    slug: 'lokale-dienstleister',
    href: '/branchen/lokale-dienstleister/',
    label: 'Lokale Dienstleister',
    title: 'Lokale Dienstleister',
    seoTitle: 'Webdesign für lokale Dienstleister',
    metaDescription:
      'Website für lokale Dienstleister: Leistungen klar benennen, im Einzugsgebiet gefunden werden und die Kontaktaufnahme kurz halten.',
    ctaLabel: 'Website-Projekt besprechen',
    argument: 'Klare Leistungen, regionale Auffindbarkeit und einfache Kontaktaufnahme.',
    detailH1: 'Websites für Dienstleister. Verständlich, persönlich, erreichbar.',
    intro:
      'Ob Beratung, Pflege oder Service: Wer lokal Dienstleistungen anbietet, braucht Klarheit, Vertrauen und einen einfachen Weg zur Anfrage.',
    focus: [
      {
        title: 'Klare Leistungen',
        body: 'Für jedes Angebot werden Zielgruppe, Ablauf und der nächste Schritt verständlich beschrieben. Bei einer Kindertagespflege sind das andere Fragen als bei einer Gebäudereinigung oder Beratung.',
      },
      {
        title: 'Regionale Auffindbarkeit',
        body: 'Region und Leistungsgebiet werden eindeutig kommuniziert und für die lokale Suche aufbereitet.',
      },
      {
        title: 'Bewertungen',
        body: 'Ein einfacher Prozess für Bewertungen stärkt das Vertrauen neuer Interessenten.',
      },
      {
        title: 'Kontakt und Termin',
        body: 'Kurze Wege zur Anfrage: Formular, Telefon oder ein externer Terminlink, der sich erst nach Klick öffnet.',
      },
      {
        title: 'Vertrauen',
        body: 'Echte Einblicke und eine ehrliche Darstellung schaffen die Grundlage für die erste Anfrage.',
      },
    ],
    relatedServices: ['websites', 'google', 'ki'],
    ctaTitle: 'Eine Website, die zeigt, wer hinter deinem Angebot steht.',
    referenceText:
      'Ein Beispiel aus der Kindertagespflege: Die Website stellt zuerst den Menschen vor und bündelt danach alle Informationen, die Eltern für ihre Entscheidung brauchen.',
    relatedTeasers: {
      websites:
        'Eine persönliche Website, die dein Angebot klar beschreibt, dich als Ansprechpartner zeigt und den Weg zur Anfrage kurz hält.',
      google:
        'Für Dienstleister vor Ort ist das Google-Profil oft der erste Kontakt. Gepflegte Angaben zu Leistungen und Erreichbarkeit helfen Menschen aus der Nähe, dich zu finden.',
      ki: 'Terminanfragen, Rückfragen und Erinnerungen lassen sich teilweise automatisieren. Das spart Zeit, die du für deine Kunden brauchst.',
    },
    ctaText:
      'Im ersten Gespräch klären wir, wie Interessenten dich finden und was sie vor der ersten Anfrage wissen müssen.',
    faqs: [
      {
        question: 'Für welche Dienstleister eignet sich das?',
        answer:
          'Für alle, die ihre Leistung vor Ort oder in der Region anbieten: Beratung, Betreuung, Pflege, Reinigung, Coaching und vieles mehr. Gemeinsam ist ihnen, dass Kunden einer Person vertrauen müssen. Die Website sollte deshalb zeigen, wer hinter dem Angebot steht, und zugleich klar beschreiben, was du anbietest.',
      },
      {
        question: 'Wie wirkt meine Website persönlich, ohne unprofessionell zu sein?',
        answer:
          'Mit echten Fotos, einer kurzen Vorstellung in deinen eigenen Worten und einer Sprache, die zu dir passt. Professionell wird es durch eine klare Struktur, gute Lesbarkeit und verlässliche Angaben. Das Projekt Anna-Lena’s Kinderkörbchen zeigt, wie ein warmer, persönlicher Auftritt aussehen kann.',
      },
      {
        question: 'Wie bleibe ich erreichbar, ohne ständig ans Telefon zu müssen?',
        answer:
          'Ein kurzes Anfrageformular, ein Rückrufwunsch oder ein externer Terminlink nehmen Anfragen auch dann an, wenn du gerade beim Kunden bist. Wichtig ist, dass klar ist, wann du dich zurückmeldest. So bist du gut erreichbar und behältst trotzdem die Ruhe für deine Arbeit.',
      },
      {
        question: 'Wie werde ich in meinem Einzugsgebiet gefunden?',
        answer:
          'Nenne dein Leistungsgebiet klar auf der Website, pflege ein Google-Unternehmensprofil mit denselben Angaben und bitte zufriedene Kunden um ehrliche Bewertungen. Das schafft eine gute Grundlage für die lokale Suche. Eine bestimmte Platzierung kann dabei niemand garantieren.',
      },
      {
        question: 'Was kostet eine Website für Dienstleister?',
        answer:
          'Der Orientierungsrahmen für Unternehmenswebsites liegt meist bei 1.500 bis 5.500 Euro netto. Viele Dienstleister kommen mit einer übersichtlichen Website aus wenigen, gut gemachten Seiten aus. Den genauen Umfang und Preis legen wir nach dem ersten Gespräch in einem schriftlichen Angebot fest.',
      },
    ],
  },
  {
    slug: 'b2b-mittelstand',
    href: '/branchen/b2b-mittelstand/',
    label: 'B2B-Mittelstand',
    title: 'B2B-Mittelstand',
    seoTitle: 'B2B-Webdesign für den Mittelstand',
    metaDescription:
      'B2B-Website für mittelständische Unternehmen: erklärungsbedürftige Leistungen verständlich darstellen und qualifizierte Anfragen erzeugen.',
    ctaLabel: 'B2B-Website besprechen',
    argument: 'Komplexe Leistungen verständlich machen und qualifizierte Anfragen erzeugen.',
    detailH1: 'B2B-Websites, die komplexe Leistungen verständlich machen.',
    intro:
      'Im B2B entscheiden oft mehrere Personen. Eine gute Website macht komplexe Leistungen verständlich und liefert die richtigen Informationen.',
    focus: [
      {
        title: 'Komplexe Leistungen verständlich machen',
        body: 'Technische oder erklärungsbedürftige Angebote werden strukturiert und nachvollziehbar aufbereitet.',
      },
      {
        title: 'Ansprechpartner',
        body: 'Klare Ansprechpartner und Zuständigkeiten senken die Hürde für die erste Kontaktaufnahme.',
      },
      {
        title: 'Cases',
        body: 'Projektbeispiele erläutern die Aufgabe, die eingesetzte Lösung und den jeweiligen Leistungsumfang. Technische Datenblätter oder weiterführende Unterlagen können passend verlinkt werden.',
      },
      {
        title: 'Recruiting',
        body: 'Fachkräfte informieren sich online. Eine überzeugende Karriere-Sektion unterstützt die Personalgewinnung.',
      },
      {
        title: 'Lead-Qualifizierung',
        body: 'Ein Anfrageformular kann Produktbereich, benötigte Leistung und Zeitrahmen abfragen. So erhält der zuständige Ansprechpartner die Informationen, die er für ein erstes Gespräch braucht.',
      },
    ],
    relatedServices: ['websites', 'ki', 'video'],
    ctaTitle: 'Eine Website, die komplexe Leistungen greifbar macht.',
    relatedTeasers: {
      websites:
        'Eine Unternehmenswebsite, die erklärungsbedürftige Leistungen gliedert und Entscheidern schnell zeigt, ob ihr zusammenpasst.',
      ki: 'Anfragen vorsortieren, Informationen bündeln, Routine in Vertrieb und Service entlasten: Automatisierung dort, wo sie wirklich hilft.',
      video:
        'Ein Film über Fertigung, Abläufe oder Team zeigt Kunden und Bewerbern, wie dein Unternehmen arbeitet, bevor der erste Termin stattfindet.',
    },
    ctaText:
      'Im ersten Gespräch klären wir, welche Informationen Einkauf, Technik und Geschäftsführung bei dir suchen.',
    faqs: [
      {
        question: 'Was ist bei B2B-Webdesign anders?',
        answer:
          'Im B2B entscheiden selten einzelne Personen spontan. Einkauf, Technik und Geschäftsführung schauen mit unterschiedlichen Fragen auf deine Website. Gutes B2B-Webdesign gibt jeder dieser Gruppen die passenden Informationen, von der Leistungsübersicht bis zu technischen Details und Ansprechpartnern.',
      },
      {
        question: 'Wie stellen wir erklärungsbedürftige Produkte verständlich dar?',
        answer:
          'Wir beginnen beim Nutzen für den Kunden und gehen dann in die Tiefe. Klare Gliederung, kurze Absätze, Grafiken und Projektbeispiele machen komplexe Leistungen greifbar. Datenblätter und weiterführende Unterlagen bleiben verfügbar, ohne die Seite zu überladen.',
      },
      {
        question: 'Hilft die Website auch beim Recruiting im Mittelstand?',
        answer:
          'Ja. Fachkräfte informieren sich häufig zuerst online über mögliche Arbeitgeber. Eine Karriereseite mit echten Einblicken, Ansprechpartnern und einem einfachen Bewerbungsweg zeigt, warum sich ein Wechsel in deinen Betrieb lohnt.',
      },
      {
        question: 'Wie läuft die Abstimmung mit mehreren Beteiligten?',
        answer:
          'Wir legen zu Beginn fest, wer Inhalte liefert, wer Rückmeldungen bündelt und wer freigibt. Ein fester Ansprechpartner auf deiner Seite macht die Abstimmung deutlich einfacher. Entwürfe und Zwischenstände teilen wir über eine gemeinsame Vorschau, die alle Beteiligten ansehen können.',
      },
      {
        question: 'Was unterscheidet gute B2B-Websites von einer Firmenbroschüre?',
        answer:
          'Eine Broschüre zählt auf, was ein Unternehmen kann. Gute B2B-Websites beantworten die Fragen der Besucher: Löst ihr mein Problem, habt ihr Erfahrung in meinem Bereich und wer ist mein Ansprechpartner? Sie führen gezielt zu den passenden Informationen und machen die Anfrage einfach.',
      },
      {
        question: 'Wie messen wir, ob die Website funktioniert?',
        answer:
          'Mit deiner Freigabe werten wir die Google Search Console aus und schauen uns die Qualität der eingehenden Anfragen an. Wichtig ist nicht die reine Besucherzahl, sondern ob die richtigen Unternehmen Kontakt aufnehmen. Daraus leiten wir ab, welche Inhalte wir weiter verbessern.',
      },
    ],
  },
];

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}
