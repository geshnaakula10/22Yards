import { useId } from "react";
import { buildSeamPaths } from "../../animations/hero/seam";

export const BALL_RADIUS = 122;
const seam = buildSeamPaths(BALL_RADIUS);

/**
 * Line-art cricket ball: softly shaded white body, dark red outline, and a
 * bowed three-line seam band. Only the seam group rotates (via `seamRef`);
 * the outline stays fixed, which is what sells the spin.
 * Renders SVG children only — place inside an <svg> centered at (0,0).
 */
export default function CricketBall({ seamRef }) {
  const uid = useId().replace(/:/g, "");
  const clip = `ballClip-${uid}`;
  const shade = `ballShade-${uid}`;
  return (
    <>
      <defs>
        <clipPath id={clip}>
          <circle r={BALL_RADIUS} />
        </clipPath>
        <radialGradient id={shade} cx="0.36" cy="0.32" r="0.78" fx="0.3" fy="0.26">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.55" stopColor="#f7f4ee" />
          <stop offset="1" stopColor="#e3ddd0" />
        </radialGradient>
      </defs>
      <circle r={BALL_RADIUS} fill={`url(#${shade})`} stroke="var(--ball)" strokeWidth="7" />
      <g ref={seamRef} clipPath={`url(#${clip})`}>
        <path d={seam.outer1} fill="none" stroke="var(--ball)" strokeWidth="5" strokeLinecap="round" strokeDasharray="13 8" />
        <path d={seam.center} fill="none" stroke="var(--ball)" strokeWidth="2" />
        <path d={seam.outer2} fill="none" stroke="var(--ball)" strokeWidth="5" strokeLinecap="round" strokeDasharray="13 8" />
      </g>
      {/* specular glint, fixed (does not spin) */}
      <ellipse cx="-46" cy="-58" rx="26" ry="14" transform="rotate(-35 -46 -58)" fill="#fff" opacity="0.85" />
    </>
  );
}
