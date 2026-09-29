/** Facility counts exactly as shown on the live site, with a line of its own copy for each. */
export const facilityStats = [
  { value: 6, suffix: "+", label: "Lanes", note: "Professional-grade Gabba nets, designed to simulate real-match conditions." },
  { value: 2, suffix: "+", label: "Bowling machines", note: "BOLA and JUGS machines with adjustable speeds and deliveries." },
  { value: 1, suffix: "+", label: "Pro shop", note: "The latest cricket gear and apparel from leading brands." },
  { value: 1, suffix: "+", label: "Box cricket", note: "Indoor box cricket all year round, for every skill level." },
];

/** "Our cutting-edge facilities" — titles and descriptions from the live homepage. */
export const amenities = [
  {
    id: "lanes",
    icon: "lanes",
    title: "Advanced cricket lanes",
    text: "Six advanced cricket lanes equipped with professional-grade Gabba nets, designed to simulate real-match conditions.",
    photo: "nets",
  },
  {
    id: "machines",
    icon: "machine",
    title: "High-tech bowling machines",
    text: "Variable speed controls, spin and swing options, and automated line adjustments.",
  },
  {
    id: "box",
    icon: "box",
    title: "Box cricket",
    text: "Experience the thrill of cricket all year round at our state-of-the-art indoor box cricket facility, designed for players of all skill levels.",
    photo: "turf",
  },
  {
    id: "gym",
    icon: "gym",
    title: "Fitness gym",
    text: "Tailored specifically for cricketers, with equipment and programs that build strength, flexibility, endurance and agility.",
  },
  {
    id: "lounge",
    icon: "lounge",
    title: "Relaxation areas",
    text: "Dedicated spaces with comfortable seating for players to relax, hold team meetings and talk strategy.",
    photo: "lounge",
  },
  {
    id: "shop",
    icon: "shop",
    title: "ProShop & gear store",
    text: "Our on-site ProShop is stocked with the latest cricket gear and apparel from leading brands.",
  },
];

/** Horizontal gallery rail. Keys point into content/media.js. */
export const galleryItems = [
  { id: "g-pitch", photo: "pitch", caption: "The strip" },
  { id: "g-nets", photo: "nets", caption: "Gabba-net lanes" },
  { id: "g-team", photo: "teamEvent", caption: "Corporate game day" },
  { id: "g-turf", photo: "turf", caption: "Open turf" },
  { id: "g-lounge", photo: "lounge", caption: "The mezzanine lounge" },
  { id: "g-lanes", photo: "lanes", caption: "Bowler’s-end view" },
];
