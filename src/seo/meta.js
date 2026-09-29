import { SITE_URL, business, pricing } from "../content/site";

/** Page-level SEO copy for the homepage. Title ≈ 55 chars, description ≈ 155. */
export const meta = {
  title: "Indoor Cricket Lanes & Academy in Houston, TX | 22 Yards",
  description: `Houston’s indoor cricket facility: 6 pro lanes with Gabba nets, bowling machines, box cricket and coaching for ages 6+. Lanes from ${pricing.lanes.from}/month.`,
  url: `${SITE_URL}/`,
  siteName: business.name,
  locale: "en_US",
  image: {
    url: `${SITE_URL}/og-image.jpg`,
    width: 1200,
    height: 630,
    alt: "22 Yards Houston — Play. Train. Compete. Indoor cricket lanes, coaching and box cricket.",
  },
  themeColor: "#f8f7f3",
};
