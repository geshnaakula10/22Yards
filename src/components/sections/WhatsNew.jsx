import { whatsNew } from "../../content/home";
import { events } from "../../content/events";
import { cta } from "../../content/site";
import SectionHeading from "../ui/SectionHeading";
import CTAButton from "../ui/CTAButton";
import ImagePlaceholder from "../ui/ImagePlaceholder";

export default function WhatsNew() {
  return (
    <div className="container">
      <div className="heading-row" data-reveal>
        <SectionHeading id="whats-new-title" index="02" label="Special events" title={whatsNew.title} />
        <p className="body-text heading-row__aside">{whatsNew.intro}</p>
      </div>

      <ul className="event-grid" role="list">
        {events.map((event) => (
          <li key={event.id} className="event-card" data-reveal>
            <ImagePlaceholder label={event.imageLabel} kind="Event flyer" ratio="4 / 3" tone="blue" />
            <div className="event-card__body">
              <div className="event-card__meta">
                <span className="chip chip--blue">{event.tag}</span>
                {event.status && <span className="chip chip--gold">{event.status}</span>}
              </div>
              {event.host && <p className="event-card__host">{event.host}</p>}
              <h3 className="event-card__title">{event.title}</h3>
              {event.details.map((d) => (
                <p key={d} className="event-card__detail">
                  {d}
                </p>
              ))}
              {event.dates && (
                <p className="event-card__dates">
                  <span className="mono">Dates</span> {event.dates}
                </p>
              )}
            </div>
          </li>
        ))}
        <li className="event-card event-card--follow" data-reveal>
          <p className="mono event-card__kicker">Latest flyers</p>
          <p className="event-card__follow-title">New flyers and updates are posted on Instagram.</p>
          <CTAButton href={cta.instagram.href} variant="light">
            {cta.instagram.label}
          </CTAButton>
        </li>
      </ul>
    </div>
  );
}
