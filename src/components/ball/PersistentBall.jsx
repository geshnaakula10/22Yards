import { useEffect, useRef } from "react";
import anime from "animejs";
import BallGraphic from "./BallGraphic";
import { useSceneTrack } from "../scroll/SceneTrack";
import { BALL_BOX, ballFrame, hopHeight, isPhone, isDesktop } from "../../animations/scroll/ballAnimation";
import { INTRO } from "../../animations/hero/heroIntro";

/** Hop / drop heights in SVG units (the box is 400), so they scale with the ball. */
const HOP = 150;
const DROP = 1100;

/**
 * The cricket ball as a single fixed layer that lives for the whole scene
 * track: it drops into the hero's ball slot on load, docks at the edge of the
 * screen for the following scenes (behind their content), hops on every
 * scene change, keeps spinning with scroll the entire time, and slides out
 * just before the footer. On phones it only plays the hero: it fades out as
 * the hero leaves (see ballFrame).
 *
 * Only rendered on the live track — the static track draws a still ball in the hero.
 */
export default function PersistentBall() {
  const track = useSceneTrack();
  const wrapRef = useRef(null);
  const spinRef = useRef(null);
  const bodyRef = useRef(null);
  const shadowRef = useRef(null);
  const lift = useRef({ drop: 1, hop: 0 });
  const desktopFinished = useRef(false);

  // One writer for the body/shadow, fed by both the drop-in and scroll hops.
  const applyLift = () => {
    const { drop, hop } = lift.current;
    const units = drop * DROP + hop * HOP;
    bodyRef.current?.setAttribute("transform", `translate(200,${(200 - units).toFixed(1)})`);
    const h = Math.min(1, units / HOP);
    shadowRef.current?.setAttribute("rx", (92 * (1 - 0.45 * h)).toFixed(1));
    shadowRef.current?.setAttribute("opacity", (0.16 * (1 - 0.7 * h)).toFixed(3));
  };

  useEffect(() => {
    if (!track.live) return undefined;
    // Very slow start: the prerendered still ball has already faded in (CSS,
    // 2.5s), so take over in place instead of re-dropping it.
    if (performance.now() > 2400) {
      lift.current.drop = 0;
      applyLift();
      return undefined;
    }
    applyLift();
    const drop = anime({
      targets: lift.current,
      drop: [1, 0],
      delay: INTRO.ballDelay,
      duration: 1500,
      easing: "easeOutBounce",
      update: applyLift,
    });
    return () => {
      drop.pause();
      lift.current.drop = 0;
    };
  }, [track.live]);

  useEffect(() => {
    if (!track.live) return undefined;
    let shown = null;
    return track.subscribeFrame((f) => {
      const wrap = wrapRef.current;
      if (!wrap) return;
      const b = ballFrame(f.s, { ball: f.layout.ball, heroPose: f.heroPose, vw: f.vw, vh: f.vh });
      const desktop = isDesktop(f.vw);
      // Keep the desktop opening retired even when the user scrolls back up.
      if (desktop && f.s >= f.layout.ball.dockStart) desktopFinished.current = true;
      // Fully out (on phones: everything after the hero): drop the layer from
      // rendering and skip the per-frame writes until it comes back.
      const visible = b.opacity > 0.001 && !(desktop && desktopFinished.current);
      if (visible !== shown) {
        wrap.style.visibility = visible ? "visible" : "hidden";
        wrap.style.display = visible ? "" : "none";
        shown = visible;
      }
      if (!visible) return;
      const half = BALL_BOX / 2;
      wrap.style.transform = `translate3d(${(b.x - half).toFixed(1)}px, ${(b.y - half).toFixed(1)}px, 0) scale(${b.scale.toFixed(4)})`;
      wrap.style.opacity = b.opacity.toFixed(3);
      spinRef.current?.setAttribute("transform", `rotate(${b.rotation.toFixed(2)})`);
      const hop = isPhone(f.vw) || desktop ? 0 : hopHeight(f.progress);
      if (hop !== lift.current.hop) {
        lift.current.hop = hop;
        applyLift();
      }
    });
  }, [track]);

  if (!track.live) return null;

  return (
    <div className="ball-layer" ref={wrapRef} aria-hidden="true">
      <BallGraphic spinRef={spinRef} bodyRef={bodyRef} shadowRef={shadowRef} />
    </div>
  );
}
