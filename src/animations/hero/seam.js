/**
 * Builds the three seam paths (two dashed outer stitch lines flanking a
 * thin solid centerline) as a bowed curve between two points on the
 * ball's edge — the same geometry validated in the design preview.
 */
export function buildSeamPaths(R, entryAngle = 24, exitAngle = 202, bows = [84, 98, 112]) {
  const point = (deg) => {
    const a = (deg * Math.PI) / 180;
    return [R * Math.sin(a), -R * Math.cos(a)];
  };
  const [x1, y1] = point(entryAngle);
  const [x2, y2] = point(exitAngle);
  const arc = (bow) => `M ${x1.toFixed(1)} ${y1.toFixed(1)} Q ${bow} 0 ${x2.toFixed(1)} ${y2.toFixed(1)}`;
  const [outerBow1, centerBow, outerBow2] = bows;
  return { outer1: arc(outerBow1), center: arc(centerBow), outer2: arc(outerBow2) };
}
