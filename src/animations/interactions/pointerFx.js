/**
 * Small pointer niceties, delegated from one document listener:
 *
 * - `[data-magnetic]`  the element leans toward the cursor while hovered
 * - `[data-spotlight]` exposes the cursor position as --mx / --my so CSS can
 *                      draw a soft light that follows it
 *
 * Only on devices with a fine, hovering pointer and without reduced motion.
 * @returns {() => void} teardown
 */
export function initPointerFx() {
  const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (!fine.matches || reduced.matches) return () => {};

  let magnet = null;
  let frame = 0;
  let last = null;

  function release(el) {
    el.style.transform = "";
    el.classList.remove("is-magnetized");
  }

  function apply() {
    frame = 0;
    const e = last;
    const target = e.target instanceof Element ? e.target : null;

    const spot = target?.closest("[data-spotlight]");
    if (spot) {
      const r = spot.getBoundingClientRect();
      spot.style.setProperty("--mx", `${(e.clientX - r.left).toFixed(0)}px`);
      spot.style.setProperty("--my", `${(e.clientY - r.top).toFixed(0)}px`);
    }

    const m = target?.closest("[data-magnetic]") ?? null;
    if (m !== magnet) {
      if (magnet) release(magnet);
      magnet = m;
    }
    if (m) {
      const r = m.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      m.classList.add("is-magnetized");
      m.style.transform = `translate3d(${(dx * 0.2).toFixed(1)}px, ${(dy * 0.3).toFixed(1)}px, 0)`;
    }
  }

  function onMove(e) {
    last = e;
    if (!frame) frame = requestAnimationFrame(apply);
  }

  function onLeave() {
    if (magnet) release(magnet);
    magnet = null;
  }

  document.addEventListener("pointermove", onMove, { passive: true });
  document.documentElement.addEventListener("pointerleave", onLeave);
  return () => {
    cancelAnimationFrame(frame);
    onLeave();
    document.removeEventListener("pointermove", onMove);
    document.documentElement.removeEventListener("pointerleave", onLeave);
  };
}
