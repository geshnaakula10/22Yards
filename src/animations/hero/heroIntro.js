/**
 * Hero motion that needs JS. The load-in itself (headline words rising out
 * of their masks, blocks fading up) is pure CSS in sections.css, so it plays
 * from the first paint without waiting for the bundle.
 */

/** When the live ball starts its drop-in after the track goes live (ms). */
export const INTRO = {
  ballDelay: 180,
};

/** Scroll-scrubbed hero exit: the three headline lines shear apart as the hero leaves. */
export function heroExit(tl, content) {
  tl.add(
    {
      targets: content.querySelectorAll(".hero__line"),
      translateX: (_, i) => [0, i % 2 ? 160 : -160],
      duration: 1000,
      easing: "easeInQuad",
    },
    0
  );
}
