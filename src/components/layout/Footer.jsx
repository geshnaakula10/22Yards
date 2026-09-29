import { contact, cta, legalLinks, navItems, pricing, socials } from "../../content/site";
import { crest } from "../../content/media";
import CTAButton from "../ui/CTAButton";
import Icon from "../ui/Icon";

const dayRange = (days) => (days.length > 1 ? `${days[0].slice(0, 3)}–${days[days.length - 1].slice(0, 3)}` : days[0].slice(0, 3));

export default function Footer() {
  return (
    <footer className="site-footer" id="contact" aria-labelledby="contact-title">
      <div className="container">
        <div className="footer-top">
          <div>
            <p className="marker marker--dark">
              <span className="marker__square" aria-hidden="true" />
              <span className="marker__label">Contact</span>
            </p>
            <h2 className="footer-title" id="contact-title">
              See you at the <span className="footer-title__accent">crease.</span>
            </h2>
          </div>
          <div className="footer-cta">
            <div className="actions">
              <CTAButton href={cta.bookLane.href} size="lg">
                {cta.bookLane.label}
              </CTAButton>
              <CTAButton href={cta.directions.href} variant="light" size="lg">
                {cta.directions.label}
              </CTAButton>
            </div>
            <p className="footer-promo">
              Lanes from {pricing.lanes.from}/month · Box cricket packages from {pricing.boxCricket.from}/month.{" "}
              {pricing.boxCricket.detail}.
            </p>
          </div>
        </div>

        <div className="footer-grid">
          <div className="footer-col">
            <h3 className="footer-col__title">Visit</h3>
            <address>
              <a href={contact.maps} target="_blank" rel="noopener">
                {contact.address.line1}
                <br />
                {contact.address.line2}
                <span className="visually-hidden"> (opens Google Maps in a new tab)</span>
              </a>
            </address>
            {contact.hours && (
              <ul className="footer-hours" role="list">
                {contact.hours.map((h) => (
                  <li key={h.days.join()}>
                    <span>{dayRange(h.days)}</span> {h.opens}–{h.closes}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="footer-col">
            <h3 className="footer-col__title">Get in touch</h3>
            <ul role="list">
              <li>
                <a href={contact.phone.href}>
                  <Icon name="phone" size={16} /> {contact.phone.display}
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`}>
                  <Icon name="mail" size={16} /> {contact.email}
                </a>
              </li>
            </ul>
          </div>
          <nav className="footer-col" aria-label="Footer">
            <h3 className="footer-col__title">Explore</h3>
            <ul role="list" className="footer-col__links">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
              <li>
                <a href="#faq">FAQ</a>
              </li>
            </ul>
          </nav>
          <div className="footer-col">
            <h3 className="footer-col__title">Follow</h3>
            <ul role="list">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener">
                    <Icon name={s.label.toLowerCase()} size={16} /> {s.label}
                    <span className="visually-hidden"> — 22 Yards Houston (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-mark" aria-hidden="true">
          <img className="footer-mark__crest" src={crest.src} width={crest.width} height={crest.height} alt="" loading="lazy" />
          <p className="footer-wordmark">22 YARDS</p>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} 22 Yards Houston</p>
          <ul className="footer-legal" role="list">
            {legalLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
