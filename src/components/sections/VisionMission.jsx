import { visionMission } from "../../content/home";
import SectionHeading from "../ui/SectionHeading";
import ImagePlaceholder from "../ui/ImagePlaceholder";

export default function VisionMission() {
  return (
    <div className="container split split--mission">
      <div className="split__main">
        <div data-reveal>
          <SectionHeading id="mission-title" index="05" label="Vision & mission" title={visionMission.title} />
        </div>
        <p className="lead" data-reveal>
          {visionMission.intro}
        </p>
        <div data-reveal className="hide-mobile">
          <ImagePlaceholder label="Indoor nets and lanes" kind="Background photo" ratio="16 / 9" />
        </div>
      </div>
      <div className="split__aside stack">
        {visionMission.cards.map((card) => (
          <article className="card card--accent" key={card.title} data-reveal>
            <h3 className="card__title">{card.title}</h3>
            <p className="card__lead">{card.lead}</p>
            <p className="body-text">{card.text}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
