import ballUrl from "../../assets/images/cricket-ball.webp";

/** Drawn radius; matches the previous line-art ball's outer edge so poses keep their size. */
const BALL_RADIUS = 125;

/**
 * Cricket ball artwork (from the Figma design). The image is cropped tight
 * to the ball, so its center sits at (0,0) and spin pivots on the ball's
 * true center. The whole ball rotates via `spinRef`.
 * Renders SVG children only — place inside an <svg> centered at (0,0).
 */
export default function CricketBall({ spinRef }) {
  return (
    <g ref={spinRef}>
      <image
        href={ballUrl}
        x={-BALL_RADIUS}
        y={-BALL_RADIUS}
        width={BALL_RADIUS * 2}
        height={BALL_RADIUS * 2}
        preserveAspectRatio="xMidYMid meet"
      />
    </g>
  );
}
