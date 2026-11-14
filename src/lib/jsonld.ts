import { activeCompany, hasCompleteBusinessData } from './config-validation';
import { site } from '../config/site';
import { openingHours } from '../config/company';
import { websiteOffer } from '../config/pricing';
import type { Service } from '../config/services';
import type { FaqItem } from '../config/faq';
import { canonicalFor, seo } from '../config/seo';

/**
 * Strukturierte Daten (JSON-LD).
 *
 * REGEL (Korrektur 8): Organization/LocalBusiness/ProfessionalService/Service werden
 * NUR erzeugt, wenn die dafür nötigen Echtdaten vollständig vorhanden sind. Andernfalls
 * geben die Helfer `null` zurück – niemals Platzhalter in strukturierte Daten schreiben.
 * BreadcrumbList und FAQPage (ohne PII) sind davon unabhängig.
 */

type Json = Record<string, unknown>;

/** Stabile Kennung des Unternehmens, auf die WebSite und Service verweisen. */
export const BUSINESS_ID = `${site.url.replace(/\/$/, '')}/#business`;

/** Absolute URL zu einem Pfad der Website. */
const abs = (path: string): string => `${site.url.replace(/\/$/, '')}${path}`;

/**
 * Tatsächlich betreutes Gebiet.
 *
 * Der Sitz steht in `address` (Erlabrunn) und wird davon nicht berührt:
 * `areaServed` beschreibt, wo gearbeitet wird, nicht wo das Büro steht.
 * Deutschland gehört dazu, weil Projekte bundesweit umgesetzt werden. Das
 * deckt sich mit der sichtbaren Aussage „Raum Würzburg. Projekte bundesweit.“
 */
const AREA_SERVED = [
  { '@type': 'City', name: 'Würzburg' },
  { '@type': 'City', name: 'Schweinfurt' },
  { '@type': 'AdministrativeArea', name: 'Unterfranken' },
  { '@type': 'Country', name: 'Deutschland' },
];

/** Gemeinde Erlabrunn (Ortsmitte), Sitz des Unternehmens. */
const GEO = { '@type': 'GeoCoordinates', latitude: 49.867, longitude: 9.85 };

/**
 * Leistungen, deckungsgleich mit den sichtbaren Leistungsseiten. Liefert
 * `knowsAbout` (Namen) und `makesOffer` (Angebote mit Link zur Seite).
 */
const OFFERS = [
  { name: 'Webdesign', path: '/leistungen/websites/' },
  { name: 'SEO & GEO', path: '/leistungen/seo-geo/' },
  { name: 'Google-Unternehmensprofil', path: '/leistungen/google-unternehmensprofil/' },
  { name: 'Branding', path: '/leistungen/branding/' },
  { name: 'Foto & Video', path: '/leistungen/unternehmensvideo/' },
  { name: 'Social Media', path: '/leistungen/social-media/' },
  { name: 'Performance Marketing', path: '/leistungen/performance-marketing/' },
  { name: 'KI & Automatisierung', path: '/leistungen/ki-automatisierung/' },
] as const;

/** Beschreibung für das Unternehmens-Schema (ohne Gedankenstriche). */
const BUSINESS_DESCRIPTION =
  'Webdesign aus Würzburg: individuelle Websites mit Design, Texten und SEO, die neue Kunden bringen.';

/** ProfessionalService/LocalBusiness der Marke, nur bei vollständiger Anschrift und Kontakt. */
export function organizationJsonLd(): Json | null {
  if (!hasCompleteBusinessData) return null;
  const c = activeCompany;
  return {
    '@context': 'https://schema.org',
    '@type': ['ProfessionalService', 'LocalBusiness'],
    '@id': BUSINESS_ID,
    name: c.brandName,
    founder: { '@type': 'Person', name: c.legalName },
    url: site.url.replace(/\/?$/, '/'),
    logo: abs('/icon-512.png'),
    image: abs(seo.defaultOgImage),
    description: BUSINESS_DESCRIPTION,
    telephone: c.phone,
    email: c.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: c.street,
      postalCode: c.postalCode,
      addressLocality: c.city,
      addressRegion: site.region.state,
      addressCountry: 'DE',
    },
    geo: GEO,
    areaServed: AREA_SERVED,
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [...openingHours.days],
      opens: openingHours.opens,
      closes: openingHours.closes,
    },
    priceRange: `ab ${websiteOffer.range.split('–')[0]?.trim()} €`,
    knowsAbout: OFFERS.map((o) => o.name),
    makesOffer: OFFERS.map((o) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: o.name, url: abs(o.path) },
    })),
    // Profile (Google-Unternehmensprofil, Instagram, LinkedIn …) in company.ts unter socialLinks pflegen.
    sameAs: c.socialLinks.map((s) => s.href),
  };
}

/** WebSite-Objekt, verweist als Herausgeber auf das Unternehmen. */
export function websiteJsonLd(): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url.replace(/\/$/, '')}/#website`,
    name: site.name,
    url: site.url.replace(/\/?$/, '/'),
    inLanguage: 'de-DE',
    ...(hasCompleteBusinessData ? { publisher: { '@id': BUSINESS_ID } } : {}),
  };
}

/** Einzelne Leistung – nur bei vollständiger Anschrift und Kontakt (Provider-Bezug). */
export function serviceJsonLd(service: Service): Json | null {
  if (!hasCompleteBusinessData) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.cardTitle,
    serviceType: service.label,
    description: service.teaser,
    provider: { '@id': BUSINESS_ID },
    areaServed: AREA_SERVED,
    url: canonicalFor(service.href),
  };
}

export interface BreadcrumbEntry {
  readonly name: string;
  readonly path: string;
}

/** BreadcrumbList – immer erlaubt (keine PII). */
export function breadcrumbJsonLd(entries: readonly BreadcrumbEntry[]): Json | null {
  if (entries.length < 2) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: entries.map((e, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: e.name,
      item: canonicalFor(e.path),
    })),
  };
}

/** FAQPage – nur aus tatsächlich sichtbaren Fragen (keine PII). */
export function faqPageJsonLd(items: readonly FaqItem[]): Json | null {
  if (!items.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}
