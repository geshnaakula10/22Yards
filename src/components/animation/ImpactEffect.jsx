import { forwardRef } from "react";

/**
 * A small radial burst of lines, hidden (opacity 0, scale 0) by default.
 * The hero timeline flashes it once at the moment of bat/ball contact.
 */
const ImpactEffect = forwardRef(function ImpactEffect(_, ref) {
  const lines = Array.from({ length: 8 });
  return (
    <g ref={ref} className="impact-effect" data-anim="impact" style={{ opacity: 0 }}>
      {lines.map((_, i) => {
        const angle = (i / lines.length) * 360;
        return (
          <line
            key={i}
            x1="0"
            y1="10"
            x2="0"
            y2="26"
            stroke="var(--color-gold, #D4A017)"
            strokeWidth="3"
            strokeLinecap="round"
            transform={`rotate(${angle})`}
          />
        );
      })}
    </g>
  );
});

export default ImpactEffect;
