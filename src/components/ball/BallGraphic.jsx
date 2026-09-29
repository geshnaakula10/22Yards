import { useId } from "react";
import CricketBall from "../animation/CricketBall";

/**
 * The ball artwork: soft ground shadow + line-art ball, drawn in a 400x400
 * box. Refs let the persistent ball spin the seam (`seamRef`) and lift the
 * body off its shadow for hops (`bodyRef`, `shadowRef`).
 */
export default function BallGraphic({ seamRef, bodyRef, shadowRef, className = "" }) {
  const blur = `blurShadow-${useId().replace(/:/g, "")}`;
  return (
    <svg className={`ball-graphic ${className}`} viewBox="0 0 400 400" aria-hidden="true" focusable="false">
      <defs>
        <filter id={blur} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
      </defs>
      <ellipse
        ref={shadowRef}
        className="ball-graphic__shadow"
        cx="200"
        cy="336"
        rx="92"
        ry="12"
        fill="#10141c"
        opacity="0.16"
        filter={`url(#${blur})`}
      />
      <g ref={bodyRef} transform="translate(200,200)">
        <CricketBall seamRef={seamRef} />
      </g>
    </svg>
  );
}
