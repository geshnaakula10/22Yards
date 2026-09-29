import { useEffect, useRef } from "react";
import anime from "animejs";
import BallGraphic from "./BallGraphic";
import { useSceneTrack } from "../scroll/SceneTrack";
import { BALL_BOX, ballFrame } from "../../animations/scroll/ballAnimation";

/**
 * The cricket ball as a single fixed layer that lives for the whole scene
 * track: it starts in the hero's ball slot, docks at the edge of the screen
 * for the following scenes (behind their content), keeps spinning with
 * scroll the entire time, and slides out just before the footer.
 *
 * Not rendered under prefers-reduced-motion — the hero shows a static ball.
 */
export default function PersistentBall() {
  const track = useSceneTrack();
  const wrapRef = useRef(null);
  const innerRef = useRef(null);
  const seamRef = useRef(null);

  // Same one-off entrance as the original hero.
  useEffect(() => {
    if (track.reduced) return undefined;
    const entrance = anime({
      targets: innerRef.current,
      scale: [0.85, 1],
      opacity: [0, 1],
      duration: 500,
      easing: "easeOutQuad",
    });
    return () => entrance.pause();
  }, [track.reduced]);

  useEffect(() => {
    if (track.reduced) return undefined;
    return track.subscribeFrame((f) => {
      const wrap = wrapRef.current;
      if (!wrap) return;
      const b = ballFrame(f.s, { ball: f.layout.ball, heroPose: f.heroPose, vw: f.vw, vh: f.vh });
      const half = BALL_BOX / 2;
      wrap.style.transform = `translate3d(${(b.x - half).toFixed(1)}px, ${(b.y - half).toFixed(1)}px, 0) scale(${b.scale.toFixed(4)})`;
      wrap.style.opacity = b.opacity.toFixed(3);
      wrap.style.visibility = b.opacity > 0.001 ? "visible" : "hidden";
      seamRef.current?.setAttribute("transform", `rotate(${b.rotation.toFixed(2)})`);
    });
  }, [track]);

  if (track.reduced) return null;

  return (
    <div className="ball-layer" ref={wrapRef} aria-hidden="true">
      <div className="ball-layer__inner" ref={innerRef}>
        <BallGraphic seamRef={seamRef} />
      </div>
    </div>
  );
}
