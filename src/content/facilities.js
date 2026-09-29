/** Facility counts exactly as shown on the current site. */
export const facilityStats = [
  { value: 6, suffix: "+", label: "Lanes" },
  { value: 2, suffix: "+", label: "Bowling machines" },
  { value: 1, suffix: "+", label: "Pro Shop" },
  { value: 1, suffix: "+", label: "Box cricket" },
];

/** Gallery images aren't available yet — these render as placeholders. */
export const galleryItems = Array.from({ length: 6 }, (_, i) => ({
  id: `gallery-${i + 1}`,
  label: `Gallery image ${i + 1}`,
}));
