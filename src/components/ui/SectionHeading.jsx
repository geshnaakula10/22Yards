import SplitWords from "./SplitWords";

/**
 * Scene heading: a numbered marker ("03 — About us") above an oversized title.
 * `id` becomes the heading id so the scene's <section> can be labelled by it.
 *
 * Carries its own reveal attributes (marker rises, title words slide up out
 * of their line masks), so don't wrap it in another data-reveal.
 * `title` can be a string or SplitWords segments (with { mark } highlights).
 */
export default function SectionHeading({ id, index, label, title, as: Tag = "h2", size = "lg", children }) {
  return (
    <header className={`section-heading section-heading--${size}`}>
      <p className="marker" data-reveal>
        <span className="marker__square" aria-hidden="true" />
        {index && <span className="marker__index">{index}</span>}
        <span className="marker__label">{label}</span>
      </p>
      <Tag className="section-heading__title" id={id} data-reveal="words">
        <SplitWords text={title} />
      </Tag>
      {children}
    </header>
  );
}
