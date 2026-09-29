import { whatsNew } from "../../content/home";
import { flyers } from "../../content/events";
import { cta, socials } from "../../content/site";
import SectionHeading from "../ui/SectionHeading";
import CTAButton from "../ui/CTAButton";
import Icon from "../ui/Icon";

/** Announcements as ticket stubs. */
export default function WhatsNew() {
  const instagram = socials.find((s) => s.label === "Instagram");
  return (
    <div className="container">
      <div className="heading-row">
        <SectionHeading id="whats-new-title" index="02" label="What’s new" title={whatsNew.title} />
        <p className="body-text heading-row__aside" data-reveal>
          {whatsNew.intro}
        </p>
      </div>

      <ul className="ticket-grid" role="list">
        {flyers.map((flyer, i) => (
          <li key={flyer.id} className="ticket" data-reveal data-spotlight>
            <div className="ticket__stub" aria-hidden="true">
              <span className="ticket__tag">{flyer.tag}</span>
              <span className="ticket__no">No. {String(i + 1).padStart(2, "0")}</span>
            </div>
            <div className="ticket__body">
              <p className="ticket__kind mono">
                <span className="visually-hidden">Type: </span>
                {flyer.tag}
                {flyer.host && <> · {flyer.host}</>}
              </p>
              <h3 className="ticket__title">{flyer.title}</h3>
              {flyer.details.map((d) => (
                <p key={d} className="ticket__detail">
                  {d}
                </p>
              ))}
              <div className="ticket__foot">
                {flyer.dates && (
                  <p className="ticket__dates">
                    <span className="mono">Dates</span> {flyer.dates}
                  </p>
                )}
                {flyer.status && <span className="chip chip--gold">{flyer.status}</span>}
              </div>
            </div>
          </li>
        ))}
        <li className="ticket ticket--follow" data-reveal>
          <div className="ticket__body">
            <p className="ticket__kind mono">
              <Icon name="instagram" size={16} /> {instagram.handle}
            </p>
            <p className="ticket__follow-title">New flyers and updates are posted on Instagram.</p>
            <CTAButton href={cta.instagram.href} variant="light">
              {cta.instagram.label}
            </CTAButton>
          </div>
        </li>
      </ul>
    </div>
  );
}
