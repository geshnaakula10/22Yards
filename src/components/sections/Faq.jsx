import { faqs } from "../../content/home";
import { contact } from "../../content/site";
import SectionHeading from "../ui/SectionHeading";
import Icon from "../ui/Icon";

/**
 * FAQ accordion on native <details> (keyboard and screen-reader friendly,
 * and the answers stay in the HTML for search engines). The same list is
 * emitted as FAQPage structured data (src/seo/schema.js).
 */
export default function Faq() {
  return (
    <div className="container split split--faq">
      <div className="split__main">
        <SectionHeading id="faq-title" index="13" label="FAQ" title="Got questions? We have answers." />
        <p className="body-text" data-reveal>
          Can’t find what you’re looking for? Call{" "}
          <a className="text-link" href={contact.phone.href}>
            {contact.phone.display}
          </a>{" "}
          or email{" "}
          <a className="text-link" href={`mailto:${contact.email}`}>
            {contact.email}
          </a>
          .
        </p>
      </div>
      <div className="split__aside faq-list">
        {faqs.map((f, i) => (
          <details className="faq" key={f.q} data-reveal open={i === 0 ? true : undefined}>
            <summary className="faq__q">
              <span>{f.q}</span>
              <span className="faq__icon" aria-hidden="true">
                <Icon name="plus" size={18} strokeWidth={2} />
              </span>
            </summary>
            <div className="faq__a">
              <p>{f.a}</p>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
