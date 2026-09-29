import { welcome } from "../../content/home";
import CTAButton from "../ui/CTAButton";
import Media from "../ui/Media";
import SplitWords from "../ui/SplitWords";

export default function Welcome() {
  return (
    <div className="container split split--welcome">
      <div className="split__main">
        <p className="marker" data-reveal>
          <span className="marker__square" aria-hidden="true" />
          <span className="marker__index">01</span>
          <span className="marker__label">{welcome.label}</span>
        </p>
        <h2 className="display" id="welcome-title" data-reveal="words">
          <SplitWords text={welcome.title} />
        </h2>
        <p className="lead" data-reveal>
          {welcome.lead}
        </p>
        <dl className="facts" data-reveal>
          {welcome.facts.map((f) => (
            <div className="facts__item" key={f.label}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
        <div className="actions" data-reveal>
          <CTAButton href="#facilities">Tour the facility</CTAButton>
          <CTAButton href="#coaches" variant="outline">
            Meet the coaches
          </CTAButton>
        </div>
      </div>

      <div className="split__aside">
        <figure className="photo-frame photo-frame--tall">
          <span className="photo-frame__block" data-reveal="line" aria-hidden="true" />
          <div className="photo-frame__media" data-reveal="mask">
            <Media name="pitch" sizes="(min-width: 900px) 28vw, (min-width: 640px) 40vw, 92vw" />
          </div>
          <figcaption className="photo-frame__caption mono" data-reveal="fade">
            The strip · Westpark Dr
          </figcaption>
        </figure>
        <div className="spin-badge" data-parallax="0.18" aria-hidden="true">
          <div data-reveal="pop">
            <SpinBadge text={welcome.badge} />
          </div>
        </div>
      </div>
    </div>
  );
}

/** Circular text badge that slowly turns, with the ball's seam in the middle. */
function SpinBadge({ text }) {
  return (
    <svg className="spin-badge__svg" viewBox="0 0 200 200" focusable="false">
      <defs>
        <path id="spin-badge-circle" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
      </defs>
      <circle cx="100" cy="100" r="98" className="spin-badge__disc" />
      <g className="spin-badge__ring">
        <text className="spin-badge__text">
          <textPath href="#spin-badge-circle" textLength="462">
            {text.toUpperCase()}
          </textPath>
        </text>
      </g>
      <text x="100" y="118" textAnchor="middle" className="spin-badge__num">
        22
      </text>
    </svg>
  );
}
