import { facilityStats } from "../../content/facilities";
import { boxCricketPromo, contact, cta } from "../../content/site";
import SectionHeading from "../ui/SectionHeading";
import CTAButton from "../ui/CTAButton";

const [lanes, machines] = facilityStats;

/** Final scene: booking. Pulls together the booking facts shown across the current site. */
export default function LaneRentals() {
  return (
    <div className="container">
      <div data-reveal>
        <SectionHeading id="lane-rentals-title" index="08" label="Lane rentals" title="Book a lane." size="xl" />
      </div>

      <div className="booking-grid">
        <article className="card booking-card" data-reveal>
          <h3 className="card__title">Rental lanes</h3>
          <ul className="booking-card__facts" role="list">
            <li>
              <strong>
                {lanes.value}
                {lanes.suffix}
              </strong>{" "}
              {lanes.label.toLowerCase()}
            </li>
            <li>
              <strong>
                {machines.value}
                {machines.suffix}
              </strong>{" "}
              {machines.label.toLowerCase()}
            </li>
          </ul>
          <p className="placeholder-text">[Lane rates &amp; opening hours placeholder]</p>
          <CTAButton href={cta.bookLane.href} size="lg">
            {cta.bookLane.label}
          </CTAButton>
        </article>

        <article className="card booking-card booking-card--blue" data-reveal>
          <p className="mono booking-card__kicker">Box cricket</p>
          <h3 className="booking-card__headline">{boxCricketPromo.headline}</h3>
          <p className="booking-card__detail">{boxCricketPromo.detail}</p>
          <CTAButton href={boxCricketPromo.action.href} variant="primary" size="lg">
            {boxCricketPromo.action.label}
          </CTAButton>
        </article>
      </div>

      <p className="booking-contact" data-reveal>
        <span className="mono">Questions?</span>
        <a href={contact.phone.href}>{contact.phone.display}</a>
        <a href={`mailto:${contact.email}`}>{contact.email}</a>
      </p>
    </div>
  );
}
