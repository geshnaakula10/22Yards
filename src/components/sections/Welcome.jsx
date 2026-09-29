import { welcome } from "../../content/home";
import { cta } from "../../content/site";
import CTAButton from "../ui/CTAButton";
import ImagePlaceholder from "../ui/ImagePlaceholder";

export default function Welcome() {
  return (
    <div className="container split split--welcome">
      <div className="split__main">
        <p className="marker" data-reveal>
          <span className="marker__square" aria-hidden="true" />
          <span className="marker__index">01</span>
          <span className="marker__label">{welcome.label}</span>
        </p>
        <h2 className="display" id="welcome-title" data-reveal>
          Your premier <mark className="hl">indoor cricket</mark> destination in Houston,&nbsp;TX
        </h2>
        <p className="lead" data-reveal>
          {welcome.lead}
        </p>
        <div className="actions" data-reveal>
          <CTAButton href={cta.bookLane.href}>{cta.bookLane.label}</CTAButton>
          <CTAButton href="#coaching" variant="outline">
            Explore coaching
          </CTAButton>
        </div>
      </div>
      <div className="split__aside" data-reveal>
        <ImagePlaceholder label="Indoor cricket lanes at 22 Yards Houston" kind="Hero image" ratio="4 / 5" />
      </div>
    </div>
  );
}
