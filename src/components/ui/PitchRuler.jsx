import { useEffect, useRef } from "react";
import { useSceneTrack } from "../scroll/SceneTrack";

const YARDS = 22;

/**
 * Scroll progress as a cricket pitch: the page is 22 yards long, from the
 * bowler's crease (top) to the batter's stumps (the footer, "see you at the
 * crease"). A vertical ruler on desktop, a thin bar along the bottom on
 * smaller screens. Decorative — the header nav is the real navigation.
 */
export default function PitchRuler() {
  const track = useSceneTrack();
  const rootRef = useRef(null);
  const fillRef = useRef(null);
  const markRef = useRef(null);
  const readoutRef = useRef(null);

  useEffect(() => {
    if (!track.live) return undefined;
    let lastYard = -1;
    return track.subscribeFrame((f) => {
      const p = Math.min(1, Math.max(0, f.s / f.layout.scrollLength));
      rootRef.current.style.setProperty("--p", p.toFixed(4));
      rootRef.current.classList.toggle("is-done", p >= 1);
      rootRef.current.classList.toggle("is-hero", f.activeIndex <= 0);
      const yard = Math.round(p * YARDS);
      if (yard !== lastYard) {
        readoutRef.current.textContent = String(yard).padStart(2, "0");
        lastYard = yard;
      }
    });
  }, [track]);

  if (!track.live) return null;

  return (
    <div className="pitch-ruler" ref={rootRef} aria-hidden="true">
      <div className="pitch-ruler__rail">
        {Array.from({ length: YARDS + 1 }, (_, i) => (
          <span key={i} className={`pitch-ruler__tick${i % 11 === 0 ? " is-major" : ""}`} style={{ "--i": i / YARDS }} />
        ))}
        <span className="pitch-ruler__fill" ref={fillRef} />
        <span className="pitch-ruler__mark" ref={markRef}>
          <span className="pitch-ruler__ball" />
          <span className="pitch-ruler__readout">
            <span ref={readoutRef}>00</span>
            <small>yds</small>
          </span>
        </span>
      </div>
      <svg className="pitch-ruler__stumps" viewBox="0 0 20 24" focusable="false">
        <path d="M5 6v17M10 6v17M15 6v17" />
        <path d="M3.5 4.5h6M10.5 4.5h6" />
      </svg>
    </div>
  );
}
