/**
 * Site-wide facts taken from the current 22yardshouston.com screenshots.
 * Anything not visible there is marked as a placeholder rather than invented.
 */

// Links whose real destinations weren't visible in the screenshots.
// Swap these for the real URLs (booking system, social profiles, etc.).
export const PLACEHOLDER_URL = "#";

export const contact = {
  address: {
    line1: "14929 Westpark Dr, Ste 300",
    line2: "Houston, TX 77082",
  },
  email: "contact@22yardshouston.com",
  phone: { display: "(713) 570-9054", href: "tel:+17135709054" },
};

export const socials = [
  { label: "Facebook", href: PLACEHOLDER_URL },
  { label: "Instagram", href: PLACEHOLDER_URL },
];

/** Header / mobile menu / footer navigation. Hashes point at homepage scenes. */
export const navItems = [
  { label: "About", href: "#about", sectionId: "about" },
  { label: "Coaching", href: "#coaching", sectionId: "coaching" },
  { label: "Lane Rentals", href: "#lane-rentals", sectionId: "lane-rentals" },
  { label: "Special Events", href: "#whats-new", sectionId: "whats-new" },
  { label: "Gallery", href: "#gallery", sectionId: "gallery" },
  { label: "Contact", href: "#contact", sectionId: "contact" },
];

export const cta = {
  // The current site's BOOK NOW is a dropdown whose options weren't visible,
  // so it points at the lane-rental scene for now.
  bookNow: { label: "Book now", href: "#lane-rentals" },
  bookLane: { label: "Book a rental lane", href: PLACEHOLDER_URL },
  instagram: { label: "View on Instagram", href: PLACEHOLDER_URL },
};

/** Top-bar promotion on the current site. */
export const boxCricketPromo = {
  headline: "Box Cricket Packages Starting from $400/month",
  detail: "Teams of 6 with flexible hourly slots",
  action: { label: "Subscribe", href: PLACEHOLDER_URL },
};
