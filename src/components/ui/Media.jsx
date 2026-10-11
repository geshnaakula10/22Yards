import { media } from "../../content/media";
import { useSceneNear } from "../scroll/sceneNear";

/**
 * Responsive photo from content/media.js. Always carries its intrinsic
 * width/height (no layout shift) and descriptive alt text.
 *
 * Inside the live scene track, the image only gets its source once its
 * scene is near (see sceneNear.js); everywhere else it's a normal lazy image.
 *
 * @param {string}  name      - key in content/media.js
 * @param {string}  [sizes]   - rendered width hint for srcset selection
 * @param {boolean} [priority] - above-the-fold image: eager + high fetch priority
 * @param {string}  [alt]     - override the default alt ("" for decorative)
 */
export default function Media({ name, sizes = "(min-width: 900px) 45vw, 100vw", priority = false, alt, className = "", ...rest }) {
  const near = useSceneNear();
  const m = media[name];
  if (!m) return null;
  const srcSet = m.src ? undefined : m.widths.map((w) => `/images/${m.file}-${w}.webp ${w}w`).join(", ");
  const fallback = m.src ?? `/images/${m.file}-${m.widths.find((w) => w >= 800) ?? m.widths[m.widths.length - 1]}.webp`;
  const load = near || priority;

  return (
    <img
      className={`media-img ${className}`}
      src={load ? fallback : undefined}
      srcSet={load ? srcSet : undefined}
      sizes={sizes}
      width={m.width}
      height={m.height}
      alt={alt ?? m.alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchpriority={priority ? "high" : undefined}
      {...rest}
    />
  );
}
