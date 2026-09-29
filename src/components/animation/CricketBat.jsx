import { forwardRef } from "react";

/**
 * Bat group. `transform-origin` is set on the handle so anime.js can
 * rotate it like a real swing rather than spinning around its center.
 */
const CricketBat = forwardRef(function CricketBat(_, ref) {
  return (
    <g ref={ref} className="cricket-bat" data-anim="bat" style={{ transformBox: "fill-box", transformOrigin: "10% 90%" }}>
      <rect x="-8" y="-70" width="16" height="70" rx="6" fill="var(--color-gold, #D4A017)" stroke="#8a6a10" strokeWidth="1.5" />
      <rect x="-5" y="-12" width="10" height="22" rx="3" fill="#2b1c10" />
    </g>
  );
});

export default CricketBat;
