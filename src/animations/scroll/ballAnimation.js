import { clamp01 } from "./sceneLayout";

/**
 * The persistent ball's scroll behaviour. It spins with scroll the whole
 * time; what changes is *where* it sits:
 *
 *   hero pose  → the slot beside the hero headline (measured from the DOM)
 *   dock pose  → a quiet spot at the right edge / bottom-right corner,
 *                behind the scene content so it never covers text. It lofts
 *                in an arc on the way there.
 *   hop        → every scene change after that bounces it once, like a
 *                delivery pitching on the 22 yards
 *   exit       → slides off to the right and fades just before the footer
 */

/** Same spin speed as the original hero: 900deg over its 220vh of scroll. */
const DEG_PER_VIEWPORT = 900 / 2.2;

/** Size of the ball's SVG box in px; poses scale it. */
export const BALL_BOX = 400;

export function dockPose(vw, vh) {
  if (vw >= 1024) {
    const size = Math.min(300, Math.max(200, vw * 0.17));
    return { x: vw - size * 0.3, y: vh * 0.56, size };
  }
  // Smaller screens: tucked into the bottom-right corner, mostly off-screen,
  // so it peeks out without sitting behind body text.
  if (vw >= 640) {
    const size = 160;
    return { x: vw - size * 0.2, y: vh - size * 0.26, size };
  }
  const size = 112;
  return { x: vw - size * 0.18, y: vh - size * 0.22, size };
}

const lerp = (a, b, t) => a + (b - a) * t;
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2); // easeInOutCubic

/**
 * Height of the current hop, 0 → 1 → 0 (a parabola), while a scene after
 * the first docked one is entering. Scenes 0 and 1 are skipped: that
 * handoff is the flight from the hero to the dock.
 * @param {{ enter: number }[]} progress - per-scene progress from the track
 */
export function hopHeight(progress) {
  for (let i = 2; i < progress.length; i++) {
    const t = progress[i].enter;
    if (t > 0 && t < 1) return 4 * t * (1 - t);
  }
  return 0;
}

/**
 * @param {number} s - smoothed scroll, px from the top of the scene track
 * @param {object} ctx - { ball windows, heroPose, vw, vh, reduced }
 * @returns {{ x, y, scale, opacity, rotation }}
 */
export function ballFrame(s, { ball, heroPose, vw, vh, reduced }) {
  const dock = dockPose(vw, vh);
  const dockRaw = clamp01((s - ball.dockStart) / (ball.dockEnd - ball.dockStart));
  const dockT = ease(dockRaw);
  const exitT = ease(clamp01((s - ball.exitStart) / (ball.exitEnd - ball.exitStart)));

  const size = lerp(heroPose.size, dock.size, dockT);
  const loft = Math.sin(Math.PI * dockRaw) * vh * 0.14;
  const x = lerp(heroPose.x, dock.x, dockT) + exitT * (vw - dock.x + dock.size);
  const y = lerp(heroPose.y, dock.y, dockT) - loft;
  const perViewport = reduced ? 0 : DEG_PER_VIEWPORT;

  return {
    x,
    y,
    scale: size / BALL_BOX,
    opacity: 1 - exitT,
    rotation: (Math.max(0, s) / vh) * perViewport,
  };
}
