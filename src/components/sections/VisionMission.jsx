import { visionMission } from "../../content/home";
import SectionHeading from "../ui/SectionHeading";

export default function VisionMission() {
  return (
    <div className="container split split--mission">
      <div className="split__main">
        <SectionHeading id="mission-title" index="06" label="Vision & mission" title={visionMission.title} />
        <p className="lead" data-reveal>
          {visionMission.intro}
        </p>
        <p className="triad" data-parallax="0.12">
          {visionMission.words.map((w, i) => (
            <span key={w} className={`triad__word triad__word--${i + 1}`} data-reveal>
              {w}{" "}
            </span>
          ))}
        </p>
      </div>
      <div className="split__aside stack">
        {visionMission.cards.map((card, i) => (
          <article className="card card--accent" key={card.title} data-reveal data-spotlight>
            <p className="card__index mono" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h3 className="card__title">{card.title}</h3>
            <p className="card__lead">{card.lead}</p>
            <p className="body-text">{card.text}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
