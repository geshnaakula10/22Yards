/**
 * Stand-in for photos/flyers we don't have yet. Announced to screen readers
 * as an image with a descriptive label; visibly marked as a placeholder.
 */
export default function ImagePlaceholder({ label, kind = "Image", ratio = "4 / 3", tone = "light", className = "" }) {
  return (
    <div
      className={`placeholder placeholder--${tone} ${className}`}
      style={{ "--ratio": ratio }}
      role="img"
      aria-label={`${label} (image coming soon)`}
    >
      <span className="placeholder__tag">[{kind} placeholder]</span>
      <span className="placeholder__label">{label}</span>
    </div>
  );
}
