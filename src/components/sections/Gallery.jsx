import { galleryItems } from "../../content/facilities";
import { media } from "../../content/media";
import { cta } from "../../content/site";
import SectionHeading from "../ui/SectionHeading";
import CTAButton from "../ui/CTAButton";
import Media from "../ui/Media";

/**
 * Horizontal photo rail. In the live track, vertical scroll drives it
 * sideways (SceneTrack finds the `data-rail`); in the static track it's a
 * native swipeable row.
 */
export default function Gallery() {
  return (
    <div className="gallery">
      <div className="container">
        <div className="heading-row">
          <SectionHeading id="gallery-title" index="11" label="Gallery" title="Inside 22 Yards" />
          <div className="heading-row__aside" data-reveal>
            <CTAButton href={cta.instagram.href} variant="outline">
              {cta.instagram.label}
            </CTAButton>
          </div>
        </div>
      </div>
      <div className="rail-viewport">
        <ul className="rail" data-rail role="list">
          {galleryItems.map((item, i) => {
            const m = media[item.photo];
            return (
              <li
                className={`rail__item${m.height > m.width ? " rail__item--portrait" : ""}`}
                key={item.id}
                data-rail-item
                data-reveal
              >
                <figure className="rail__figure">
                  <div className="rail__media">
                    <Media name={item.photo} sizes="(min-width: 900px) 42vw, 82vw" />
                  </div>
                  <figcaption className="rail__caption">
                    <span className="mono">{String(i + 1).padStart(2, "0")}</span> {item.caption}
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
