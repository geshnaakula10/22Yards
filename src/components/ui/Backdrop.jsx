import Media from "./Media";

/**
 * Full-bleed scene backdrop: an optional photo under a tinted shade.
 * variant: "night" (deep navy) | "blue" (royal blue)
 * The photo is decorative here (its content is described elsewhere), so alt="".
 */
export default function Backdrop({ photo, variant = "night" }) {
  return (
    <div className={`bd bd--${variant}${photo ? " bd--photo" : ""}`}>
      {photo && <Media name={photo} alt="" sizes="100vw" className="bd__img" />}
      <div className="bd__shade" />
      <div className="bd__lines" />
    </div>
  );
}
