import Icon from "./Icon";

const isExternal = (href = "") => /^https?:\/\//.test(href);

/**
 * Link styled as a button.
 * variant: "primary" (gold, main actions) | "secondary" (blue) | "outline" | "light" (for dark backgrounds) | "ghost"
 *
 * External links open in a new tab (and say so to screen readers) with a ↗
 * arrow; in-page links get →. Buttons are magnetic on fine pointers
 * (animations/interactions/pointerFx.js).
 */
export default function CTAButton({ href, variant = "primary", size, arrow = true, className = "", children, ...rest }) {
  const external = isExternal(href);
  const classes = ["btn", `btn--${variant}`, size && `btn--${size}`, className].filter(Boolean).join(" ");
  const icon = external ? "arrowUpRight" : "arrowRight";
  return (
    <a
      className={classes}
      href={href}
      data-magnetic
      {...(external ? { target: "_blank", rel: "noopener" } : {})}
      {...rest}
    >
      <span className="btn__label">{children}</span>
      {external && <span className="visually-hidden"> (opens in a new tab)</span>}
      {arrow && (
        <span className="btn__arrow" aria-hidden="true">
          <Icon name={icon} size={16} strokeWidth={2} />
          <Icon name={icon} size={16} strokeWidth={2} />
        </span>
      )}
    </a>
  );
}
