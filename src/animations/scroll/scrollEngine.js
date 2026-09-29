/**
 * One shared, lerp-smoothed scroll loop for the whole page.
 *
 * Every scroll-driven visual (scene transitions, the ball, the progress bar)
 * subscribes here instead of running its own rAF loop. The loop only runs
 * while the smoothed value is still catching up with the real scroll
 * position, so an idle page costs nothing.
 */

const subscribers = new Set();
let target = 0;
let current = 0;
let raf = 0;
let smoothing = 0.12;

function emit() {
  subscribers.forEach((fn) => fn(current, target));
}

function frame() {
  current += (target - current) * smoothing;
  if (Math.abs(target - current) < 0.1) current = target;
  emit();
  raf = current === target ? 0 : requestAnimationFrame(frame);
}

function onScroll() {
  target = window.scrollY;
  if (!raf) raf = requestAnimationFrame(frame);
}

/**
 * @param {(smoothed: number, raw: number) => void} fn - called with window scroll positions in px
 * @returns {() => void} unsubscribe
 */
export function subscribeScroll(fn) {
  if (subscribers.size === 0) {
    target = current = window.scrollY;
    window.addEventListener("scroll", onScroll, { passive: true });
  }
  subscribers.add(fn);
  fn(current, target);
  return () => {
    subscribers.delete(fn);
    if (subscribers.size === 0) {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      raf = 0;
    }
  };
}

/** 1 = no smoothing (used for prefers-reduced-motion). */
export function setScrollSmoothing(value) {
  smoothing = value;
}

/** Re-run every subscriber with the current values (e.g. after a relayout). */
export function refreshScroll() {
  target = window.scrollY;
  if (smoothing >= 1) current = target;
  emit();
  if (current !== target && !raf) raf = requestAnimationFrame(frame);
}
