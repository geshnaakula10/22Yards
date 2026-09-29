import { booking, contact, cta, pricing } from "../../content/site";
import SectionHeading from "../ui/SectionHeading";
import CTAButton from "../ui/CTAButton";

const laneFeatures = [
  "Six lanes with professional-grade Gabba nets",
  "BOLA and JUGS bowling machines with adjustable speeds",
  "Digital video analysis and the Cricket Shot Shaper",
  "Partitioned lanes for distraction-free practice",
];

const boxFeatures = ["Indoor box cricket all year round", "Designed for players of all skill levels"];

const policy = [
  { value: "1 hr", label: "Minimum booking — no maximum, subject to availability" },
  { value: "24 hr", label: "Notice to cancel or reschedule without a fee" },
  { value: "Groups", label: "Discounted rates for group bookings and long-term rentals" },
];

function Price({ from, per }) {
  return (
    <p className="price">
      <span className="price__from">from</span>
      <span className="price__amount">{from}</span>
      <span className="price__per">/{per}</span>
    </p>
  );
}

/** Final scene: pricing and booking, with the real booking system links. */
export default function LaneRentals() {
  return (
    <div className="container">
      <div className="heading-row">
        <SectionHeading id="lane-rentals-title" index="12" label="Lane rentals" title="Book a lane." size="xl" />
        <p className="lead heading-row__aside" data-reveal>
          Rent a lane by the hour or sign up for extended sessions at competitive rates.
        </p>
      </div>

      <div className="price-grid">
        <article className="price-card" data-reveal data-spotlight aria-labelledby="price-lanes">
          <p className="mono price-card__kicker" id="price-lanes">
            Lane rentals
          </p>
          <Price {...pricing.lanes} />
          <ul className="checklist" role="list">
            {laneFeatures.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <div className="actions price-card__actions">
            <CTAButton href={booking.lane} size="lg">
              {cta.bookLane.label}
            </CTAButton>
            <CTAButton href={booking.login} variant="ghost">
              {cta.memberLogin.label}
            </CTAButton>
          </div>
        </article>

        <article className="price-card price-card--blue" data-reveal data-spotlight aria-labelledby="price-box">
          <p className="mono price-card__kicker" id="price-box">
            Box cricket packages
          </p>
          <Price {...pricing.boxCricket} />
          <p className="price-card__detail">{pricing.boxCricket.detail}</p>
          <ul className="checklist" role="list">
            {boxFeatures.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <div className="actions price-card__actions">
            <CTAButton href={cta.boxCricket.href} variant="primary" size="lg">
              {cta.boxCricket.label}
            </CTAButton>
          </div>
        </article>
      </div>

      <ul className="policy" role="list">
        {policy.map((p) => (
          <li key={p.value} data-reveal>
            <strong>{p.value}</strong>
            <span>{p.label}</span>
          </li>
        ))}
      </ul>

      <p className="booking-contact" data-reveal>
        <span className="mono">Questions?</span>
        <a href={contact.phone.href}>{contact.phone.display}</a>
        <a href={`mailto:${contact.email}`}>{contact.email}</a>
      </p>
    </div>
  );
}
