/**
 * Scene heading: a numbered marker ("03 — About us") above an oversized title.
 * `id` becomes the heading id so the scene's <section> can be labelled by it.
 */
export default function SectionHeading({ id, index, label, title, as: Tag = "h2", size = "lg", tone, children }) {
  return (
    <header className={`section-heading section-heading--${size}${tone ? ` section-heading--${tone}` : ""}`}>
      <p className="marker">
        <span className="marker__square" aria-hidden="true" />
        {index && <span className="marker__index">{index}</span>}
        <span className="marker__label">{label}</span>
      </p>
      <Tag className="section-heading__title" id={id}>
        {title}
      </Tag>
      {children}
    </header>
  );
}
