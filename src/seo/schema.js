import { SITE_URL, business, contact, pricing, socials } from "../content/site";
import { faqs } from "../content/home";
import { amenities } from "../content/facilities";
import { coaches, programs } from "../content/programs";
import { media } from "../content/media";
import { meta } from "./meta";

const id = (hash) => `${SITE_URL}/#${hash}`;
const photoUrl = (key) => `${SITE_URL}/images/${media[key].file}-1200.webp`;

/**
 * JSON-LD for the homepage, built from the same content files the page
 * renders, so the markup never drifts from what's on screen.
 *
 * Deliberately left out: review/aggregateRating markup (Google ignores
 * self-served reviews for local businesses and can treat them as spam) and
 * openingHours until real hours are set in content/site.js.
 */
export function buildJsonLd() {
  const address = {
    "@type": "PostalAddress",
    streetAddress: contact.address.street,
    addressLocality: contact.address.city,
    addressRegion: contact.address.region,
    postalCode: contact.address.postalCode,
    addressCountry: contact.address.country,
  };

  const business_ = {
    "@type": "SportsActivityLocation",
    "@id": id("business"),
    name: business.name,
    alternateName: business.legalName,
    description:
      "Indoor cricket facility and academy in Houston, TX with six lanes with professional-grade Gabba nets, bowling machines, box cricket, a cricket-specific fitness gym, a pro shop, and junior and senior coaching programs.",
    url: `${SITE_URL}/`,
    telephone: contact.phone.e164,
    email: contact.email,
    address,
    hasMap: contact.maps,
    areaServed: { "@type": "City", name: "Houston" },
    image: ["pitch", "nets", "lanes", "turf", "lounge"].map(photoUrl),
    logo: `${SITE_URL}/logo.png`,
    sameAs: socials.map((s) => s.href),
    foundingDate: business.founded,
    priceRange: `${pricing.lanes.from}–${pricing.boxCricket.from}/month`,
    currenciesAccepted: "USD",
    parentOrganization: { "@id": id("organization") },
    amenityFeature: amenities.map((a) => ({ "@type": "LocationFeatureSpecification", name: a.title, value: true })),
    employee: coaches.people.map((p) => ({ "@type": "Person", name: p.name, jobTitle: p.role })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Lanes, box cricket and coaching",
      itemListElement: [
        {
          "@type": "Offer",
          name: "Indoor cricket lane rental",
          description: "Rent a lane by the hour or sign up for extended sessions. Minimum booking one hour.",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: pricing.lanes.amount,
            priceCurrency: "USD",
            unitText: "MONTH",
            description: `From ${pricing.lanes.from} per month`,
          },
        },
        {
          "@type": "Offer",
          name: "Box cricket package",
          description: pricing.boxCricket.detail,
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: pricing.boxCricket.amount,
            priceCurrency: "USD",
            unitText: "MONTH",
            description: `From ${pricing.boxCricket.from} per month`,
          },
        },
        ...programs.map((p) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: p.name,
            serviceType: "Cricket coaching",
            description: p.description,
            audience: { "@type": "PeopleAudience", audienceType: p.ages.label },
          },
        })),
      ],
    },
  };

  if (contact.hours?.length) {
    business_.openingHoursSpecification = contact.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    }));
  }

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": id("organization"),
        name: business.name,
        alternateName: business.legalName,
        url: `${SITE_URL}/`,
        logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
        email: contact.email,
        telephone: contact.phone.e164,
        foundingDate: business.founded,
        sameAs: socials.map((s) => s.href),
      },
      business_,
      {
        "@type": "WebSite",
        "@id": id("website"),
        url: `${SITE_URL}/`,
        name: business.name,
        publisher: { "@id": id("organization") },
        inLanguage: "en-US",
      },
      {
        "@type": "WebPage",
        "@id": id("webpage"),
        url: meta.url,
        name: meta.title,
        description: meta.description,
        isPartOf: { "@id": id("website") },
        about: { "@id": id("business") },
        primaryImageOfPage: { "@type": "ImageObject", url: meta.image.url, width: meta.image.width, height: meta.image.height },
        inLanguage: "en-US",
      },
      {
        "@type": "FAQPage",
        "@id": id("faq"),
        isPartOf: { "@id": id("webpage") },
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}
