import BallGraphic from "../ball/BallGraphic";
import { useSceneTrack } from "../scroll/SceneTrack";
import SplitWords from "../ui/SplitWords";
import CTAButton from "../ui/CTAButton";
import Marquee from "../ui/Marquee";
import { hero } from "../../content/home";
import { contact, cta, pricing } from "../../content/site";

/**
 * Opening scene. The h1 carries the search-relevant line (the kicker) along
 * with the display words. The load-in is CSS (`[data-intro]` blocks and the
 * headline words, see sections.css), so it starts with the first paint.
 * The persistent ball drops into the `data-ball-anchor` slot once JS is
 * live; the static track draws a still ball there.
 */
export default function Hero() {
  const { live } = useSceneTrack();

  return (
    <div className="hero">
      <h1 className="hero__title" id="hero-title">
        <span className="hero__kicker" data-intro>
          <span className="hero__kicker-dot" aria-hidden="true" />
          {hero.kicker}
        </span>{" "}
        {hero.lines.map((line, i) => (
          <span key={line} className={`hero__line hero__line--${i + 1}`} data-anim>
            <SplitWords text={line} />{" "}
          </span>
        ))}
      </h1>

      <div className="hero__ball" data-ball-anchor>
        {!live && <BallGraphic className="ball-graphic--static" />}
      </div>

      <div className="hero__foot">
        <p className="hero__lede" data-intro>
          {hero.lede}
        </p>
        <div className="actions hero__actions" data-intro>
          <CTAButton href={cta.bookLane.href} size="lg">
            {cta.bookLane.label}
          </CTAButton>
          <CTAButton href="#coaching" variant="outline" size="lg">
            Coaching
          </CTAButton>
        </div>
        <dl className="hero__meta" data-intro>
          <div>
            <dt>Lanes from</dt>
            <dd>
              {pricing.lanes.from}
              <small>/{pricing.lanes.per === "month" ? "mo" : pricing.lanes.per}</small>
            </dd>
          </div>
          <div>
            <dt>Find us</dt>
            <dd>
              <a href={contact.maps} target="_blank" rel="noopener">
                Westpark Dr, Houston
                <span className="visually-hidden"> (opens Google Maps in a new tab)</span>
              </a>
            </dd>
          </div>
        </dl>
      </div>

      <div className="hero__band" data-intro>
        <Marquee items={hero.marquee} />
      </div>
    </div>
  );
}
