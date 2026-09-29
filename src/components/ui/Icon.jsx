/**
 * Line icons in the same stroke language as the ball. 24×24, currentColor.
 * Decorative by default (aria-hidden); pair with visible text.
 */
const paths = {
  lanes: (
    <>
      <path d="M3 20 8 4h8l5 16Z" />
      <path d="M12 4v16M5.5 12h13M7 7.5h10" />
      <path d="M11 17v3M13 17v3" />
    </>
  ),
  machine: (
    <>
      <rect x="3" y="11" width="11" height="8" rx="1.5" />
      <circle cx="8.5" cy="15" r="2" />
      <path d="M14 13.5 20 9" />
      <circle cx="20.5" cy="6.5" r="1.8" />
      <path d="M5 19v2M12 19v2" />
    </>
  ),
  box: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="1" />
      <path d="M10 15V9M12 15V9M14 15V9M9.5 9h5" />
      <path d="M3 17h18" strokeDasharray="2 2" />
    </>
  ),
  gym: (
    <>
      <path d="M6.5 8v8M17.5 8v8M4 10v4M20 10v4M6.5 12h11" />
    </>
  ),
  lounge: (
    <>
      <path d="M4 12V9a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3" />
      <path d="M3 12h18v4H3zM5 16v3M19 16v3" />
    </>
  ),
  shop: (
    <>
      <path d="M5 8h14l-1 12H6Z" />
      <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
    </>
  ),
  arrowUpRight: <path d="M7 17 17 7M9 7h8v8" />,
  arrowRight: <path d="M4 12h15M13 6l6 6-6 6" />,
  plus: <path d="M12 5v14M5 12h14" />,
  pin: (
    <>
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
  phone: <path d="M6.6 3.5h3l1.4 4-2 1.3a11 11 0 0 0 6.2 6.2l1.3-2 4 1.4v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2Z" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
    </>
  ),
  facebook: <path d="M14 21v-7.5h2.6l.4-3H14V8.6c0-.9.3-1.5 1.6-1.5H17V4.4a20 20 0 0 0-2.4-.1c-2.4 0-4 1.5-4 4.1v2.1H8v3h2.6V21" />,
  quote: <path d="M4 18v-5.5C4 8.4 6.2 6 10 5.5V8c-2 .5-3 1.9-3 4h3v6Zm10 0v-5.5c0-4.1 2.2-6.5 6-7V8c-2 .5-3 1.9-3 4h3v6Z" />,
};

export default function Icon({ name, size = 24, className = "", strokeWidth = 1.6, title }) {
  const filled = name === "quote";
  return (
    <svg
      className={`icon icon--${name} ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : "true"}
      role={title ? "img" : undefined}
      focusable="false"
    >
      {title && <title>{title}</title>}
      {paths[name]}
    </svg>
  );
}

/** Five-star row. Announced once as "5 out of 5 stars". */
export function Stars({ count = 5 }) {
  return (
    <span className="stars" role="img" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false" className={i < count ? "is-on" : ""}>
          <path d="m12 3 2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 16.8l-5.4 2.9 1.1-6.1-4.5-4.2 6.1-.8Z" fill="currentColor" />
        </svg>
      ))}
    </span>
  );
}
