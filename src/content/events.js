/**
 * "What's new" flyers from the live site's carousel. Rendered as ticket
 * cards (the flyer artwork isn't needed). Remove or replace entries as they
 * go out of date.
 */
export const flyers = [
  {
    id: "ta-sekar-camp",
    tag: "Camp",
    host: "Super Kings Academy",
    title: "Special bowling camp with T.A. Sekar",
    details: ["Former India and Tamil Nadu pacer"],
    dates: "Feb 27 – Mar 3",
    status: null,
  },
  {
    id: "u7-u17-classes",
    tag: "Classes",
    host: null,
    title: "Classes for U7 to U17",
    details: [],
    dates: null,
    status: "Registrations open",
  },
];

/** "Special events at 22Yards Houston" — descriptions condensed from the live Special Events page. */
export const eventsIntro = {
  title: "Host your event on the pitch",
  subtitle: "Prime choice for birthday parties, corporate events, and sporting events.",
};

export const eventTypes = [
  {
    id: "birthdays",
    title: "Birthday parties",
    text: "A cricket-themed celebration with activities tailored to age and skill level, exclusive facility access, and flexible catering — on-site or bring your own.",
    photo: "turf",
  },
  {
    id: "corporate",
    title: "Corporate events",
    text: "Team-building cricket matches, professional facilities for friendly competition, meeting space for presentations, and tailored catering.",
    photo: "teamEvent",
  },
  {
    id: "tournaments",
    title: "Tournaments",
    text: "Flexible lane and field usage for your format, with scheduling, umpiring and logistics support, plus refreshments and seating for players and spectators.",
    photo: "lanes",
  },
  {
    id: "clinics",
    title: "Workshops & clinics",
    text: "Batting, bowling and fielding clinics in small groups, with expert coaches and smart-lane video analysis.",
    photo: "nets",
  },
];
