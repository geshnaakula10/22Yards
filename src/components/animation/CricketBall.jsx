import { buildSeamPaths } from "../../animations/hero/seam";

export const BALL_RADIUS = 122;
const seam = buildSeamPaths(BALL_RADIUS);

/**
 * Line-art cricket ball: white fill, dark red outline, and a bowed
 * three-line seam band. Only the seam group rotates (via `seamRef`);
 * the outline stays fixed, which is what sells the spin.
 * Renders SVG children only — place inside an <svg> centered at (0,0).
 */
export default function CricketBall({ seamRef }) {
  return (
    <>
      <defs>
        <clipPath id="ballClip">
          <circle r={BALL_RADIUS} />
        </clipPath>
      </defs>
      <circle r={BALL_RADIUS} fill="var(--white)" stroke="var(--ball)" strokeWidth="7" />
      <g ref={seamRef} clipPath="url(#ballClip)">
        <path d={seam.outer1} fill="none" stroke="var(--ball)" strokeWidth="5" strokeLinecap="round" strokeDasharray="13 8" />
        <path d={seam.center} fill="none" stroke="var(--ball)" strokeWidth="2" />
        <path d={seam.outer2} fill="none" stroke="var(--ball)" strokeWidth="5" strokeLinecap="round" strokeDasharray="13 8" />
      </g>
    </>
  );
}
