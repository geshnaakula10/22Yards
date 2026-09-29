import { boxCricketPromo, contact, cta, navItems, socials } from "../../content/site";
import CTAButton from "../ui/CTAButton";

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
            <CTAButton href={cta.bookNow.href} size="lg">
              {cta.bookNow.label}
            </CTAButton>
            <p className="footer-promo">
              {boxCricketPromo.headline}. {boxCricketPromo.detail}.
            </p>
          </div>
        </div>

        <div className="footer-grid">
          <div className="footer-col">
            <h3 className="footer-col__title">Visit</h3>
            <address>
              {contact.address.line1}
              <br />
              {contact.address.line2}
            </address>
          </div>
          <div className="footer-col">
            <h3 className="footer-col__title">Get in touch</h3>
            <ul role="list">
              <li>
                <a href={contact.phone.href}>{contact.phone.display}</a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </li>
            </ul>
          </div>
          <nav className="footer-col" aria-label="Footer">
            <h3 className="footer-col__title">Explore</h3>
            <ul role="list">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="footer-col">
            <h3 className="footer-col__title">Follow</h3>
            <ul role="list">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} aria-label={`22 Yards Houston on ${s.label}`}>
                    {s.label} <span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="footer-wordmark" aria-hidden="true">
          22 YARDS
        </p>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} 22 Yards Houston</p>
          <p className="placeholder-text placeholder-text--dark">[Legal links placeholder]</p>
        </div>
      </div>
    </footer>
  );
}
