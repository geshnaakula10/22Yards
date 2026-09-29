/**
 * Link styled as a button.
 * variant: "primary" (gold, main actions) | "secondary" (blue) | "outline" | "light" (for dark backgrounds)
 */
export default function CTAButton({ href, variant = "primary", size, arrow = true, className = "", children, ...rest }) {
  const classes = ["btn", `btn--${variant}`, size && `btn--${size}`, className].filter(Boolean).join(" ");
  return (
    <a className={classes} href={href} {...rest}>
      <span>{children}</span>
      {arrow && (
        <span className="btn__arrow" aria-hidden="true">
          →
        </span>
      )}
    </a>
  );
}
