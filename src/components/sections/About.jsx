import { about } from "../../content/home";
import SectionHeading from "../ui/SectionHeading";
import CTAButton from "../ui/CTAButton";
import Media from "../ui/Media";
import Icon from "../ui/Icon";

export default function About() {
  return (
    <div className="container split split--about">
      <div className="split__main">
        <SectionHeading id="about-title" index="03" label={about.title} title={about.subtitle} />
        <p className="lead" data-reveal>
          {about.established}
        </p>
        <figure className="quote" data-reveal>
          <Icon name="quote" size={48} className="quote__mark" />
          <blockquote>
            <p>{about.quote.text}</p>
          </blockquote>
          <figcaption>— {about.quote.author}</figcaption>
        </figure>
      </div>

      <div className="split__aside">
        <figure className="photo-frame">
          <span className="photo-frame__block" data-reveal="line" aria-hidden="true" />
          <div className="photo-frame__media" data-reveal="mask">
            <Media name="nets" sizes="(min-width: 900px) 40vw, 92vw" />
          </div>
        </figure>
        <div className="stack" data-reveal>
          {about.body.map((p) => (
            <p key={p.slice(0, 24)} className="body-text">
              {p}
            </p>
          ))}
          <div className="actions">
            <CTAButton href="#mission" variant="secondary">
              Our vision &amp; mission
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  );
}
