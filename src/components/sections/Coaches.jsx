import { coaches, hpc } from "../../content/programs";
import { contact } from "../../content/site";
import SectionHeading from "../ui/SectionHeading";
import CTAButton from "../ui/CTAButton";
import Media from "../ui/Media";

const trialHref = `mailto:${contact.email}?subject=${encodeURIComponent("Trial coaching session")}`;

/** Dark scene: the coaching staff, duotone portraits that warm up on hover. */
export default function Coaches() {
  return (
    <div className="container split split--coaches">
      <div className="split__main">
        <SectionHeading id="coaches-title" index="08" label="Coaches" title={coaches.title} />
        <p className="lead" data-reveal>
          {coaches.intro}
        </p>
        <p className="body-text" data-reveal>
          {hpc.features[0].text}
        </p>
        <div className="actions" data-reveal>
          <CTAButton href={trialHref} variant="primary">
            Book a trial session
          </CTAButton>
        </div>
      </div>
      <ul className="coach-grid split__aside" role="list">
        {coaches.people.map((person, i) => (
          <li className={`coach coach--${i + 1}`} key={person.id} data-reveal>
            <div className="coach__photo" data-reveal="mask">
              <Media name={person.photo} sizes="(min-width: 900px) 20vw, 45vw" />
            </div>
            <h3 className="coach__name">{person.name}</h3>
            <p className="coach__role mono">{person.role}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
