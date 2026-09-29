import { useRef } from "react";
import { eventTypes, eventsIntro } from "../../content/events";
import { cta } from "../../content/site";
import SectionHeading from "../ui/SectionHeading";
import CTAButton from "../ui/CTAButton";
import Media from "../ui/Media";
import Icon from "../ui/Icon";

/**
 * Event types as big editorial rows. On fine pointers, hovering a row
 * floats a photo that follows the cursor; touch screens get a thumbnail
 * in each row instead.
 */
export default function Events() {
  const listRef = useRef(null);

  const onMove = (e) => {
    const list = listRef.current;
    const r = list.getBoundingClientRect();
    list.style.setProperty("--px", `${(e.clientX - r.left).toFixed(0)}px`);
    list.style.setProperty("--py", `${(e.clientY - r.top).toFixed(0)}px`);
  };
  const setActive = (i) => () => {
    listRef.current.dataset.active = i;
  };
  const clear = () => {
    delete listRef.current.dataset.active;
  };

  return (
    <div className="container">
      <div className="heading-row">
        <SectionHeading id="events-title" index="09" label="Special events" title={eventsIntro.title} />
        <div className="heading-row__aside stack" data-reveal>
          <p className="body-text">{eventsIntro.subtitle}</p>
          <div className="actions">
            <CTAButton href={cta.events.href} variant="secondary">
              {cta.events.label}
            </CTAButton>
          </div>
        </div>
      </div>

      <div className="event-list" ref={listRef} onPointerMove={onMove} onPointerLeave={clear}>
        <ol className="event-list__rows" role="list">
          {eventTypes.map((ev, i) => (
            <li className="event-row" key={ev.id} data-reveal onPointerEnter={setActive(i)}>
              <span className="event-row__index mono" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="event-row__title">{ev.title}</h3>
              <p className="event-row__text">{ev.text}</p>
              <div className="event-row__thumb">
                <Media name={ev.photo} alt="" sizes="320px" />
              </div>
              <Icon name="arrowUpRight" size={28} className="event-row__arrow" />
            </li>
          ))}
        </ol>
        <div className="event-preview" aria-hidden="true">
          {eventTypes.map((ev, i) => (
            <div className="event-preview__img" key={ev.id} data-i={i}>
              <Media name={ev.photo} alt="" sizes="320px" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
