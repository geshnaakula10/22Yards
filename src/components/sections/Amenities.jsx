import { amenities } from "../../content/facilities";
import SectionHeading from "../ui/SectionHeading";
import Media from "../ui/Media";
import Icon from "../ui/Icon";

/** "Our cutting-edge facilities" as a bento grid; three tiles carry photos. */
export default function Amenities() {
  return (
    <div className="container">
      <div className="heading-row">
        <SectionHeading id="amenities-title" index="05" label="Inside the facility" title="Our cutting-edge facilities" />
        <p className="body-text heading-row__aside" data-reveal>
          Our state-of-the-art indoor cricket facility is designed to cater to players of all levels, with advanced
          technology and high-quality equipment throughout.
        </p>
      </div>
      <ul className="bento" role="list">
        {amenities.map((a) => (
          <li key={a.id} className={`bento__item bento__item--${a.id}${a.photo ? " has-photo" : ""}`} data-reveal data-spotlight>
            {a.photo && (
              <div className="bento__photo">
                <Media name={a.photo} sizes="(min-width: 1100px) 36vw, (min-width: 640px) 50vw, 92vw" />
              </div>
            )}
            <div className="bento__body">
              <Icon name={a.icon} size={30} className="bento__icon" />
              <h3 className="bento__title">{a.title}</h3>
              <p className="bento__text">{a.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
