import { about } from "../../content/home";
import SectionHeading from "../ui/SectionHeading";
import CTAButton from "../ui/CTAButton";
import ImagePlaceholder from "../ui/ImagePlaceholder";

export default function About() {
  return (
    <div className="container split split--about">
      <div className="split__main">
        <div data-reveal>
          <SectionHeading id="about-title" index="03" label={about.title} title={about.subtitle} />
        </div>
        <p className="lead" data-reveal>
          {about.established}
        </p>
        <figure className="quote" data-reveal>
          <blockquote>
            <p>“{about.quote.text}”</p>
          </blockquote>
          <figcaption>— {about.quote.author}</figcaption>
        </figure>
      </div>

      <div className="split__aside">
        <div className="offset-frame" data-reveal>
          <ImagePlaceholder label="Indoor pitch with stumps" kind="Facility photo" ratio="4 / 3" />
        </div>
        <div className="stack" data-reveal>
          {about.body.map((p) => (
            <p key={p.slice(0, 24)} className="body-text">
              {p}
            </p>
          ))}
          <div className="actions">
            <CTAButton href="#mission" variant="secondary">
              More about us
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  );
}
