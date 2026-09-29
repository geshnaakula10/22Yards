import { useCallback, useEffect, useRef, useState } from "react";
import { cta, navItems } from "../../content/site";
import { useActiveSection } from "../../state/activeSection";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const active = useActiveSection();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = useCallback(({ restoreFocus = true } = {}) => {
    setMenuOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  }, []);

  return (
    <header className={`site-header${scrolled || menuOpen ? " is-raised" : ""}`}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="site-header__bar">
        <a className="brand" href="#hero" aria-label="22 Yards Houston — back to top">
          <span className="brand__mark" aria-hidden="true" />
          <span className="brand__name">22 YARDS</span>
          <span className="brand__city">Houston</span>
        </a>

        <nav className="site-nav" aria-label="Primary">
          <ul>
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="site-nav__link"
                  aria-current={active === item.sectionId ? "location" : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a className="btn btn--primary btn--sm site-header__cta" href={cta.bookNow.href}>
          <span>{cta.bookNow.label}</span>
          <span className="btn__arrow" aria-hidden="true">↗</span>
        </a>

        <button
          ref={toggleRef}
          type="button"
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="menu-toggle__label">{menuOpen ? "Close" : "Menu"}</span>
          <span className={`menu-toggle__icon${menuOpen ? " is-open" : ""}`} aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
      </div>

      <MobileMenu open={menuOpen} onClose={closeMenu} active={active} />
    </header>
  );
}
