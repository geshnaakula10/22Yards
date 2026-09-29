import { programsIntro } from "../../content/home";
import { programs } from "../../content/programs";
import SectionHeading from "../ui/SectionHeading";
import CTAButton from "../ui/CTAButton";
import ImagePlaceholder from "../ui/ImagePlaceholder";

export default function Programs() {
  return (
    <div className="container split split--programs">
      <div className="split__main">
        <div data-reveal>
          <SectionHeading id="coaching-title" index="06" label={`Coaching · ${programsIntro.title}`} title={programsIntro.subtitle} size="md" />
        </div>
        <p className="body-text" data-reveal>
          {programsIntro.intro}
        </p>
        <ol className="program-list">
          {programs.map((program, i) => (
            <li className="program" key={program.id} data-reveal>
              <span className="program__index mono" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <div className="program__head">
                  <h3 className="program__name">{program.name}</h3>
                  <span className="chip chip--gold">{program.ages}</span>
                </div>
                <p className="body-text">{program.description}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="actions" data-reveal>
          <CTAButton href="#contact" variant="secondary">
            Ask about coaching
          </CTAButton>
        </div>
      </div>
      <div className="split__aside" data-reveal>
        <div className="offset-frame offset-frame--tall">
          <ImagePlaceholder label="Cricket bat, ball, stumps and pads on turf" kind="Program photo" ratio="3 / 2" />
        </div>
      </div>
    </div>
  );
}
