import { useEffect, useRef } from "react";
import { contact, cta, navItems, socials } from "../../content/site";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { isNavActive } from "../../state/activeSection";
import Icon from "../ui/Icon";

/**
 * Full-screen menu for < 1100px. Escape closes it, focus moves into it on
 * open and stays inside it while open, and the page behind doesn't scroll.
 */
export default function MobileMenu({ open, onClose, active }) {
  const panelRef = useRef(null);

  // The page is scroll-locked while the menu is open, so close first and
  // follow the hash link once the lock has been released.
  const followLink = (event) => {
    const hash = event.currentTarget.getAttribute("href");
    if (!hash?.startsWith("#") || hash.length < 2) return;
    event.preventDefault();
    onClose({ restoreFocus: false });
    requestAnimationFrame(() => {
      history.pushState(null, "", hash);
      document.getElementById(hash.slice(1))?.scrollIntoView();
    });
  };
  const isDesktop = useMediaQuery("(min-width: 1100px)");

  // Growing past the breakpoint with the menu open: just close it.
  useEffect(() => {
    if (open && isDesktop) onClose({ restoreFocus: false });
  }, [open, isDesktop, onClose]);

  useEffect(() => {
    if (!open) return undefined;
    const panel = panelRef.current;
    const focusables = () => panel.querySelectorAll("a[href], button:not([disabled])");
    focusables()[0]?.focus();

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      // Keep Tab inside the menu panel + the header toggle.
      const toggle = document.querySelector(".menu-toggle");
      const items = [...focusables(), toggle].filter(Boolean);
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.documentElement.classList.add("menu-open");
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.documentElement.classList.remove("menu-open");
    };
  }, [open, onClose]);

  return (
    <div id="mobile-menu" className={`mobile-menu${open ? " is-open" : ""}`} ref={panelRef} hidden={!open}>
      <nav aria-label="Mobile">
        <ol className="mobile-menu__list">
          {navItems.map((item, i) => (
            <li key={item.href} style={{ "--i": i }}>
              <a
                href={item.href}
                className="mobile-menu__link"
                aria-current={isNavActive(item, active) ? "location" : undefined}
                onClick={followLink}
              >
                <span className="mobile-menu__index" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item.label}
                <Icon name="arrowRight" size={22} className="mobile-menu__arrow" />
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="mobile-menu__foot">
        <a className="btn btn--primary btn--block btn--lg" href={cta.bookNow.href} onClick={followLink}>
          <span className="btn__label">{cta.bookNow.label}</span>
          <span className="btn__arrow" aria-hidden="true">
            <Icon name="arrowRight" size={16} strokeWidth={2} />
            <Icon name="arrowRight" size={16} strokeWidth={2} />
          </span>
        </a>

        <div className="mobile-menu__contact">
          <a href={contact.phone.href}>
            <Icon name="phone" size={18} /> {contact.phone.display}
          </a>
          <a href={`mailto:${contact.email}`}>
            <Icon name="mail" size={18} /> {contact.email}
          </a>
          <p className="mobile-menu__socials">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener" aria-label={`22 Yards Houston on ${s.label} (opens in a new tab)`}>
                <Icon name={s.label.toLowerCase()} size={20} />
              </a>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}
