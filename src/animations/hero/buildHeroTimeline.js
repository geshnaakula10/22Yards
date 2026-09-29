import anime from "animejs";

/**
 * Builds (but does not auto-play) the hero cricket sequence:
 * text enters -> ball appears -> ball travels -> bat prepares ->
 * bat swings -> impact -> ball launches off toward the next section.
 *
 * @param {Object} refs - DOM/SVG-group refs: { headline, ball, bat, impact, trail }
 * @param {"desktop"|"mobile"} variant - controls the trajectory shape
 * @param {() => void} [onComplete] - fired when the ball exits, used to
 *   trigger the next section's entrance
 */
export function buildHeroTimeline(refs, variant = "desktop", onComplete) {
  const { headline, ball, bat, impact } = refs;
  const tl = anime.timeline({
    easing: "easeOutQuart",
    autoplay: false,
    complete: onComplete,
  });

  const isMobile = variant === "mobile";

  // 1 — headline enters as staggered lines
  tl.add({
    targets: headline,
    translateY: [40, 0],
    opacity: [0, 1],
    delay: anime.stagger(90),
    duration: 700,
  });

  // 2 — ball appears at its starting mark
  tl.add(
    {
      targets: ball,
      opacity: [0, 1],
      scale: [0.4, 1],
      duration: 350,
      easing: "easeOutBack",
    },
    "-=150"
  );

  // 3 — ball travels toward the bat.
  // Desktop: long horizontal arc. Mobile: short vertical/diagonal drop —
  // this is a distinct composition, not a scaled-down desktop version.
  tl.add({
    targets: ball,
    translateX: isMobile ? [0, 40] : [0, 420],
    translateY: isMobile ? [-160, 0] : [-30, 0],
    rotate: isMobile ? 220 : 540,
    duration: isMobile ? 650 : 900,
    easing: "easeInQuad",
  });

  // 4 — bat prepares (small backswing) as ball closes in
  tl.add(
    {
      targets: bat,
      rotate: [0, -18],
      duration: 260,
      easing: "easeOutQuad",
    },
    "-=350"
  );

  // 5 — bat swings through contact
  tl.add({
    targets: bat,
    rotate: [-18, 55],
    duration: 220,
    easing: "easeInQuart",
  });

  // 6 — impact flash, synced to the swing landing
  tl.add(
    {
      targets: impact,
      opacity: [0, 1, 0],
      scale: [0.3, 1.4],
      duration: 320,
      easing: "easeOutExpo",
    },
    "-=60"
  );

  // 7 — ball launches off-screen toward the next section
  tl.add(
    {
      targets: ball,
      translateX: isMobile ? "+=60" : "+=560",
      translateY: isMobile ? "+=520" : "+=40",
      rotate: "+=720",
      opacity: [1, 0],
      duration: isMobile ? 700 : 620,
      easing: "easeInQuad",
    },
    "-=80"
  );

  // 8 — bat resets for a loopable idle state
  tl.add(
    {
      targets: bat,
      rotate: 0,
      duration: 400,
      easing: "easeOutQuad",
    },
    "-=300"
  );

  return tl;
}

/**
 * Reduced-motion fallback: a simple, fast cross-fade with no
 * trajectory, rotation, or impact flash.
 */
export function buildReducedMotionTimeline(refs) {
  const { headline, ball, bat } = refs;
  const tl = anime.timeline({ autoplay: false, easing: "easeOutQuad" });
  tl.add({ targets: headline, opacity: [0, 1], duration: 300 });
  tl.add({ targets: [ball, bat], opacity: [0, 1], duration: 300 }, "-=200");
  return tl;
}
