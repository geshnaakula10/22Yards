import { useEffect, useRef } from "react";
import { useSceneTrack } from "../scroll/SceneTrack";

/** Thin fixed bar at the bottom of the viewport showing progress through the scenes. */
export default function ScrollProgressBar() {
  const track = useSceneTrack();
  const trackRef = useRef(null);
  const fillRef = useRef(null);

  useEffect(() => {
    if (track.reduced) return undefined;
    return track.subscribeFrame((f) => {
      const p = Math.min(1, Math.max(0, f.s / f.layout.scrollLength));
      fillRef.current.style.transform = `scaleX(${p.toFixed(4)})`;
      trackRef.current.style.opacity = p >= 1 ? "0" : "1";
    });
  }, [track]);

  if (track.reduced) return null;

  return (
    <div className="progress-track" ref={trackRef} aria-hidden="true">
      <div className="progress-fill" ref={fillRef} />
    </div>
  );
}
