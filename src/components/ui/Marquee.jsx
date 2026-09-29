/**
 * Endless ticker band. Pure CSS animation (paused under reduced motion);
 * the track holds two copies of the list so the loop is seamless. The whole
 * band is decorative — every item is said properly elsewhere on the page.
 */
export default function Marquee({ items, className = "", ...rest }) {
  const list = (copy) => (
    <ul className="marquee__list" role="list" aria-hidden={copy ? "true" : undefined}>
      {items.map((item) => (
        <li key={item} className="marquee__item">
          <span>{item}</span>
          <svg className="marquee__sep" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
            <circle cx="10" cy="10" r="7.5" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M6.2 4.4q5 5.6 0 11.2M13.8 4.4q-5 5.6 0 11.2" fill="none" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </li>
      ))}
    </ul>
  );
  return (
    <div className={`marquee ${className}`} aria-hidden="true" {...rest}>
      <div className="marquee__track">
        {list(false)}
        {list(true)}
      </div>
    </div>
  );
}
