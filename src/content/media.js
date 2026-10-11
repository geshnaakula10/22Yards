/**
 * Photos, all from 22 Yards Houston's own site (no stock). Each one is
 * exported as WebP at the listed widths: /images/<file>-<width>.webp
 *
 * To add or replace a photo: export the widths into public/images, then add
 * or edit an entry here. width/height are the intrinsic size (they set the
 * aspect ratio, which keeps the layout from shifting while the photo loads).
 */
const photo = (file, width, height, alt, widths = [480, 800, 1200]) => ({ file, width, height, alt, widths });

export const media = {
  birthdays: {
    src: "/images/birthdays.jpeg",
    width: 1066,
    height: 1600,
    alt: "Birthday parties at 22 Yards Houston",
  },
  workshops: {
    src: "/images/workshops.jpeg",
    width: 1066,
    height: 1600,
    alt: "Cricket workshops and clinics at 22 Yards Houston",
  },
  tournaments: {
    src: "/images/tournaments.jpeg",
    width: 1024,
    height: 683,
    alt: "Young cricket players shaking hands before a tournament",
  },
  pitch: photo(
    "pitch",
    1200,
    1600,
    "A blue synthetic pitch with stumps runs down the centre of the 22 Yards Houston indoor hall"
  ),
  nets: photo(
    "nets",
    1200,
    900,
    "Netted indoor cricket lanes with a stump at the far end, under bright hall lights"
  ),
  lanes: photo("lanes", 1200, 900, "Row of netted practice lanes on green turf, seen from the bowler's end"),
  turf: photo("turf", 1200, 900, "Open turf practice area with a blue pitch strip and netted lanes behind it"),
  lounge: photo(
    "lounge",
    1200,
    900,
    "Mezzanine lounge with long wooden tables overlooking the lanes, used for team meetings and events"
  ),
  teamEvent: photo(
    "team-event",
    1200,
    900,
    "A corporate group in matching shirts playing a friendly game inside the nets"
  ),
  coachHarmeet: photo("coach-harmeet", 400, 600, "Portrait of Head Coach Harmeet Singh", [400]),
  coachKamal: photo("coach-kamal", 400, 600, "Portrait of Coach Kamal Passi", [400]),
};

export const crest = { src: "/images/crest-128.webp", width: 128, height: 178 };
