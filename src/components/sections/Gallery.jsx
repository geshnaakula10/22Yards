import { galleryItems } from "../../content/facilities";
import { cta } from "../../content/site";
import SectionHeading from "../ui/SectionHeading";
import CTAButton from "../ui/CTAButton";
import ImagePlaceholder from "../ui/ImagePlaceholder";

export default function Gallery() {
  return (
    <div className="container">
      <div className="heading-row" data-reveal>
        <SectionHeading id="gallery-title" index="07" label="Gallery" title="Inside 22 Yards" />
        <div className="heading-row__aside">
          <CTAButton href={cta.instagram.href} variant="outline">
            {cta.instagram.label}
          </CTAButton>
        </div>
      </div>
      <ul className="gallery-grid" role="list">
        {galleryItems.map((item) => (
          <li key={item.id} data-reveal>
            <ImagePlaceholder label={item.label} kind="Gallery image" ratio="4 / 3" />
          </li>
        ))}
      </ul>
    </div>
  );
}
