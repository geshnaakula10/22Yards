/**
 * Site-wide facts, taken from the live 22yardshouston.com (Sept 2026).
 * These also feed the JSON-LD in src/seo/schema.js, so keep them accurate.
 */

export const SITE_URL = "https://22yardshouston.com";

export const business = {
  name: "22 Yards Houston",
  legalName: "22Yards Houston",
  founded: "2023",
  tagline: "Indoor cricket academy & lanes in Houston, TX",
};

export const contact = {
  address: {
    line1: "14929 Westpark Dr, Ste 300",
    line2: "Houston, TX 77082",
    street: "14929 Westpark Dr Ste 300",
    city: "Houston",
    region: "TX",
    postalCode: "77082",
    country: "US",
  },
  email: "contact@22yardshouston.com",
  phone: { display: "(713) 570-9054", href: "tel:+17135709054", e164: "+1-713-570-9054" },
  maps: "https://maps.app.goo.gl/jwZmVnyFfhPr3jiP9",
  /**
   * Opening hours aren't published on the live site. (Its old schema says
   * 9–5 daily, which looks like a plugin default.) Fill this in to show them
   * in the footer and in the LocalBusiness schema, e.g.
   * [{ days: ["Monday", "Tuesday"], opens: "09:00", closes: "22:00" }]
   */
  hours: null,
};

export const socials = [
  { label: "Instagram", handle: "@22yards.htx", href: "https://www.instagram.com/22yards.htx/" },
  { label: "Facebook", handle: "22yardshouston", href: "https://www.facebook.com/22yardshouston/" },
];

export const booking = {
  lane: "https://axon22yards.com/book/houston",
  login: "https://axon22yards.com/login",
};

export const pricing = {
  lanes: { from: "$149.99", per: "month", amount: 149.99 },
  boxCricket: { from: "$400", per: "month", amount: 400, detail: "Teams of 6 with flexible hourly slots" },
};

/** Header / mobile menu / footer navigation. `match` = scene ids that light the item up. */
export const navItems = [
  { label: "About", href: "#about", match: ["about", "mission"] },
  { label: "Facilities", href: "#facilities", match: ["facilities", "amenities"] },
  { label: "Coaching", href: "#coaching", match: ["coaching", "coaches"] },
  { label: "Lane Rentals", href: "#lane-rentals", match: ["lane-rentals"] },
  { label: "Events", href: "#events", match: ["whats-new", "events"] },
  { label: "Gallery", href: "#gallery", match: ["gallery"] },
  { label: "Contact", href: "#contact", match: ["contact", "faq"] },
];

const mailto = (subject) => `mailto:${contact.email}?subject=${encodeURIComponent(subject)}`;

export const cta = {
  bookNow: { label: "Book now", href: "#lane-rentals" },
  bookLane: { label: "Book a lane", href: booking.lane },
  memberLogin: { label: "Member login", href: booking.login },
  coaching: { label: "Enquire about coaching", href: mailto("Coaching enquiry") },
  events: { label: "Plan your event", href: mailto("Event enquiry") },
  boxCricket: { label: "Ask about box cricket", href: mailto("Box cricket package") },
  instagram: { label: "Follow on Instagram", href: socials[0].href },
  directions: { label: "Get directions", href: contact.maps },
};

/** Legal pages on the current site. Keep these URLs live (or redirect them) when the new site ships. */
export const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy/" },
  { label: "Terms of Use", href: "/terms-of-use/" },
  { label: "Disclaimer", href: "/disclaimer/" },
  { label: "Waiver & Cancellations", href: "/cancellation-release-and-waiver-liability/" },
];
