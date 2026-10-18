# Bild- und Schriftquellen

Stand: 15.09.2026. Das maschinenlesbare Register `assets-source/photo-credits.json` enthält für jedes aktive Stockfoto den Fotografen, die Foto-ID, Quelladresse, Erwerbsangabe und SHA-256 der Quelldatei. Keine Unsplash+-Bilder.

| Motiv                 | Fotograf                 | Fotoquelle                                             | Herkunft            |
| --------------------- | ------------------------ | ------------------------------------------------------ | ------------------- |
| Social Media          | Berke Citak              | [0cpyFsSUiSc](https://unsplash.com/photos/0cpyFsSUiSc) | Lieferung KERNSEITE |
| Unternehmensvideo     | Joao Marinho             | [5o0vN9pDwuY](https://unsplash.com/photos/5o0vN9pDwuY) | Lieferung KERNSEITE |
| SEO & GEO             | Growtika                 | [ANqHO-Jxkj8](https://unsplash.com/photos/ANqHO-Jxkj8) | Lieferung KERNSEITE |
| Würzburg              | Daniel Seßler            | [bN3WvTQQhFk](https://unsplash.com/photos/bN3WvTQQhFk) | Lieferung KERNSEITE |
| Handwerk              | benjamin lehman          | [EJU7A__krX0](https://unsplash.com/photos/EJU7A__krX0) | 2026-09-15          |
| Zahnarztpraxen        | Filip Rankovic Grobgaard | [rm7Mgu33tHU](https://unsplash.com/photos/rm7Mgu33tHU) | Lieferung KERNSEITE |
| Gastronomie           | Jason Leung              | [poI7DelFiVA](https://unsplash.com/photos/poI7DelFiVA) | 2026-09-15          |
| Lokale Dienstleister  | Ryoji Iwata              | [Fusx3dlbqpw](https://unsplash.com/photos/Fusx3dlbqpw) | 2026-09-15          |
| B2B-Mittelstand       | Ant Rozetsky             | [SLIFI67jv5k](https://unsplash.com/photos/SLIFI67jv5k) | 2026-09-15          |
| Hotelzimmer           | Vojtech Bruzek           | [Yrxr3bsPdS0](https://unsplash.com/photos/Yrxr3bsPdS0) | 2026-09-15          |
| Handwerk (Über uns)   | Minh Đức                 | [VOLs9P4Fqtk](https://unsplash.com/photos/VOLs9P4Fqtk) | 2026-10-18          |
| Arbeitsplatz am Abend | Avtar Singh              | [wT0oU24OJYU](https://unsplash.com/photos/wT0oU24OJYU) | 2026-10-18          |
| Laptop und Notizbuch  | Ionela Mat               | [2WxnKStKQTs](https://unsplash.com/photos/2WxnKStKQTs) | 2026-10-18          |
| Entwurfsskizze        | Kelly Sikkema            | [o2TRWThve_I](https://unsplash.com/photos/o2TRWThve_I) | 2026-10-18          |
| Werkbank mit Lampen   | Ali Kaan Uçar            | [j8UApawyq_c](https://unsplash.com/photos/j8UApawyq_c) | 2026-10-18          |
| Website (Laptop)      | Joshua Woroniecki        | [lzh3hPtJz9c](https://unsplash.com/photos/lzh3hPtJz9c) | 2026-10-18          |
| Google-Unternehmensprofil | Tamas Tuzes-Katai        | [rEn-AdBr3Ig](https://unsplash.com/photos/rEn-AdBr3Ig) | 2026-10-18          |
| Branding              | Andy Brown               | [8dgFq8Vbelo](https://unsplash.com/photos/8dgFq8Vbelo) | 2026-10-18          |
| Anzeigen              | Myriam Jessier           | [eveI7MOcSmw](https://unsplash.com/photos/eveI7MOcSmw) | 2026-10-18          |
| KI & Automatisierung  | Homa Appliances          | [sz1CHL7Pky0](https://unsplash.com/photos/sz1CHL7Pky0) | 2026-10-18          |

## Lizenz und Nachweise

Lizenzquelle: https://unsplash.com/license (am 15.09.2026 geprüft). Kommerzielle Verwendung und Bearbeitung sind von der Unsplash-Lizenz umfasst. Persönlichkeits-, Marken- und sonstige Drittrechte sind davon zu unterscheiden; die Branchenbilder illustrieren ein Thema und zeigen kein behauptetes KERNSEITE-Team und keine eigenen Räume.

Neu bezogene Motive: kostenlose Downloads auf Unsplash; Fotograf und Bild-ID auf den zugehörigen Seiten bzw. Downloadlinks abgeglichen. Restaurant, Produktion und Glasreinigung zusätzlich in der sichtbaren Fotoansicht geprüft. Handwerk und Hotelzimmer über die kostenlosen Suchergebnis-Downloads zugeordnet.

Bestandsmotive: Die vier Leistungsbilder und das Zahnarztbild wurden laut vorhandener Bildzuordnung durch KERNSEITE geliefert. Der Inhaber bestätigte am 15.09.2026 Unsplash als Herkunft aller Stockfotos. Für diese Dateien wird kein neues Download-Datum behauptet. Würzburg und Zahnarztquelle ließen sich zusätzlich auf der Fotoseite bestätigen. Für Berke Citak, Joao Marinho und Growtika beruht die konkrete Zuordnung auf den gelieferten Originaldateinamen.

## Aufbereitung

Originale liegen außerhalb von `public/` unter `assets-source/`. `scripts/build-images.py` erzeugt lokale WebP-/AVIF-Dateien in 640, 960, 1280 und 1600 Pixel Breite. Zuschnitt und Komprimierung; keine externe Einbettung. Öffentliche Credits: `/bildnachweise/`.

Fünf bisher nicht einzeln belegte Branchenmotive wurden durch neu zugeordnete Fotos ersetzt. Zwei zusätzliche Dekorationsmotive (Restaurantgalerie, Garten) wurden entfernt.

## Kundenprojekte und eigene Gestaltung

Die Screenshots von Kaya Döner Himmelstadt, Anna-Lena’s Kinderkörbchen und dem zugehörigen Google-Unternehmensprofil stammen aus der vorhandenen Lieferung. Die Projektfreigaben waren im bisherigen Repository als bestätigt dokumentiert; die schriftlichen Freigaben sind geschäftlich aufzubewahren. Die Fotos innerhalb der Kundenscreenshots sind Teil der abgebildeten Kundenauftritte. Keine erfundenen Bewertungen oder bearbeiteten Bewertungszahlen.

Wortmarke, Favicon und Open-Graph-Gestaltung gehören zur KERNSEITE-Gestaltung. Das frühere CRT-Motiv wird nicht mehr ausgeliefert.

## Schriften

Bricolage Grotesque und Inter werden lokal ausgeliefert. Lizenz: SIL Open Font License; Lizenztexte unter `public/fonts/`. Die vorhandenen Lizenztexte bleiben erhalten.

## Aktualisierte Projektscreenshots · 16.09.2026

Vom Nutzer in dieser Aufgabe bereitgestellte Screenshots: Babyschlafberatung Anna-Lena Korb (1901 × 909), Kaya Döner (1904 × 910), Bestattungen Gorhau (1905 × 909). Unveränderter Bildinhalt, als lokale WebP-Auslieferungen in 800/1200/1600 Pixeln sowie Originalbreite optimiert; keine extern geladenen Assets.

Die Domain `babyschlafberatung.example` ist ausdrücklich eine reservierte Beispieladresse und wird nur als Text gezeigt. Der Link führt auf die interne Projektseite. Babyschlafberatung und Gorhau sind als Entwürfe eingeordnet; der Gorhau-Pages-Link lieferte beim Abruf am 16.09.2026 HTTP 404 und wird deshalb nicht als funktionierende Website verlinkt. Die Darstellung ist kein Nachweis eines bereits veröffentlichten Kundenauftritts oder von Geschäftsergebnissen.

## Babyschlafberatung live · 10.10.2026

Neuer, von Anna-Lena Korb bereitgestellter Screenshot der veröffentlichten Website https://babyschlaf-coach.de (Original 2576 × 1788, Quelle `assets-source/references/case-babyschlafberatung-desktop.jpg`). Ausgeliefert unter neuem Dateinamen `babyschlafberatung-v2-desktop*.webp` (800/1200/1600/1904 Pixel, WebP Qualität 80), damit kein zwischengespeichertes altes Bild erscheint. Die Babyschlafberatung ist damit keine Entwurfsreferenz mehr und verlinkt auf die Live-Website. Der Smartphone-Scrollscreenshot in der Startseiten-Szene (`scroll/baby-phone.webp`) ist unverändert.

## Neugestaltung · 18.10.2026

Alle Referenzbilder wurden neu aufgenommen: automatische Bildschirmaufnahmen der veröffentlichten Kundenwebsites (Southframe Productions, Babyschlafberatung, Kaya Döner Himmelstadt, Anna-Lena’s Kinderkörbchen) am Laptop (1920 × 1200) und Smartphone (390 × 844, doppelte Pixeldichte), jeweils ohne Cookie-Hinweis. Quellen unter `assets-source/screenshots/`, Auslieferung über `scripts/build-references.py` als WebP unter `public/assets/references/`. Die Bilder zeigen die Kundenauftritte unverändert; die Fotos darin gehören zu den jeweiligen Kundenwebsites.

Die Referenz Bestattungen Gorhau und alle Konzeptstudien wurden entfernt, ebenso die alten Screenshots (`*-v2-*`, `scroll/`) und ihre Quelldateien.

Die fünf neuen Fotos der Startseite und der Seite „Über uns“ (Gruppe `agentur`) stammen von Unsplash und zeigen Werkstatt und Arbeitsplatz als Stimmung, nicht das KERNSEITE-Team oder eigene Räume.

Logo (Wortmarke mit türkisem Kern-Quadrat), Favicon („KS“ auf türkiser Kachel, Konturen aus Bricolage Grotesque), App-Symbole (`apple-touch-icon.png`, `icon-192.png`, `icon-512.png`) und das Open-Graph-Bild wurden neu gestaltet.
