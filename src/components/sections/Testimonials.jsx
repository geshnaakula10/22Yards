import { testimonials } from "../../content/home";
import SectionHeading from "../ui/SectionHeading";
import Icon, { Stars } from "../ui/Icon";

const initials = (name) =>
  name
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

/** Dark blue scene: reviews from the live site, verbatim. */
export default function Testimonials() {
  return (
    <div className="container">
      <div className="heading-row">
        <SectionHeading id="testimonials-title" index="10" label="Testimonials" title={testimonials.title} />
        <div className="heading-row__aside" data-reveal>
          <Icon name="quote" size={72} className="testimonials__mark" />
        </div>
      </div>
      <ul className="review-grid" role="list">
        {testimonials.items.map((r) => (
          <li className="review" key={r.name} data-reveal data-spotlight>
            <figure className="review__figure">
              <Stars count={5} />
              <blockquote className="review__quote">
                <p>“{r.text}”</p>
              </blockquote>
              <figcaption className="review__by">
                <span className="review__avatar" aria-hidden="true">
                  {initials(r.name)}
                </span>
                <span className="review__who">
                  <strong>{r.name}</strong>
                  <span className="mono">{r.topic}</span>
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </div>
  );
}
