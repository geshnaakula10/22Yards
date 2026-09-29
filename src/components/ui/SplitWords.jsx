import { Fragment } from "react";

/**
 * Splits text into per-word line masks for the "words" reveal:
 *   <span class="sw"><span class="sw__i">word</span></span>
 * The text content is unchanged (real spaces between words), so headings
 * read and index exactly as written.
 *
 * `text` is a string or an array of segments; `{ mark: "…" }` segments are
 * wrapped in the gold highlighter (<mark class="hl">). Non-breaking spaces
 * keep words together.
 */
export default function SplitWords({ text }) {
  const segments = Array.isArray(text) ? text : [text];
  return segments.map((seg, i) =>
    typeof seg === "string" ? (
      <Fragment key={i}>{words(seg)}</Fragment>
    ) : (
      <mark className="hl" key={i}>
        {words(seg.mark)}
      </mark>
    )
  );
}

function words(str) {
  return str.split(/( +)/).map((part, i) =>
    part === "" ? null : /^ +$/.test(part) ? (
      " "
    ) : (
      <span className="sw" key={i}>
        <span className="sw__i">{part}</span>
      </span>
    )
  );
}
