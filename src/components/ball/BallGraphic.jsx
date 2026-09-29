import CricketBall from "../animation/CricketBall";

/**
 * The hero ball artwork (unchanged): soft ground shadow + line-art ball,
 * drawn in a 400x400 box. Pass `seamRef` to spin the seam.
 */
export default function BallGraphic({ seamRef }) {
  return (
    <svg className="ball-graphic" viewBox="0 0 400 400" aria-hidden="true" focusable="false">
      <defs>
        <filter id="blurShadow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
      </defs>
      <ellipse cx="200" cy="326" rx="88" ry="12" fill="#10141c" opacity="0.12" filter="url(#blurShadow)" />
      <g transform="translate(200,200)">
        <CricketBall seamRef={seamRef} />
      </g>
    </svg>
  );
}
