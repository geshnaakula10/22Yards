import { clamp01 } from "./sceneLayout";

/**
 * The persistent ball's scroll behaviour. The ball itself is unchanged from
 * the hero phase: it only spins with scroll. What's new is *where* it sits:
 *
 *   hero pose  → the slot under the hero headline (measured from the DOM)
 *   dock pose  → a quiet spot at the right edge / bottom-right corner,
 *                behind the scene content so it never covers text
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
  if (vw >= 640) {
    const size = 170;
    return { x: vw - size * 0.28, y: vh - size * 0.42, size };
  }
  const size = 120;
  return { x: vw - size * 0.26, y: vh - size * 0.4, size };
}

const lerp = (a, b, t) => a + (b - a) * t;
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2); // easeInOutCubic

/**
 * @param {number} s - smoothed scroll, px from the top of the scene track
 * @param {object} ctx - { ball windows, heroPose, vw, vh, reduced }
 * @returns {{ x, y, scale, opacity, rotation }}
 */
export function ballFrame(s, { ball, heroPose, vw, vh, reduced }) {
  const dock = dockPose(vw, vh);
  const dockT = ease(clamp01((s - ball.dockStart) / (ball.dockEnd - ball.dockStart)));
  const exitT = ease(clamp01((s - ball.exitStart) / (ball.exitEnd - ball.exitStart)));

  const size = lerp(heroPose.size, dock.size, dockT);
  const x = lerp(heroPose.x, dock.x, dockT) + exitT * (vw - dock.x + dock.size);
  const y = lerp(heroPose.y, dock.y, dockT);
  const perViewport = reduced ? 0 : DEG_PER_VIEWPORT;

  return {
    x,
    y,
    scale: size / BALL_BOX,
    opacity: 1 - exitT,
    rotation: (Math.max(0, s) / vh) * perViewport,
  };
}
