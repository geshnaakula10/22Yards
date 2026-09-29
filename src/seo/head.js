import { meta } from "./meta";
import { buildJsonLd } from "./schema";

/**
 * <head> tags for the homepage, injected by the Vite plugin in vite.config.js
 * (dev and build). Plain JS, no JSX, so the config can import it.
 * @returns {import("vite").HtmlTagDescriptor[]}
 */
export function buildHeadTags() {
  const m = (attrs) => ({ tag: "meta", attrs, injectTo: "head" });
  // Escape "<" so the JSON can never close its <script> early.
  const jsonLd = JSON.stringify(buildJsonLd()).replace(/</g, "\\u003c");

  return [
    { tag: "title", children: meta.title, injectTo: "head-prepend" },
    m({ name: "description", content: meta.description }),
    { tag: "link", attrs: { rel: "canonical", href: meta.url }, injectTo: "head" },
    m({ name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" }),
    m({ name: "theme-color", content: meta.themeColor }),

    m({ property: "og:type", content: "website" }),
    m({ property: "og:site_name", content: meta.siteName }),
    m({ property: "og:locale", content: meta.locale }),
    m({ property: "og:url", content: meta.url }),
    m({ property: "og:title", content: meta.title }),
    m({ property: "og:description", content: meta.description }),
    m({ property: "og:image", content: meta.image.url }),
    m({ property: "og:image:width", content: String(meta.image.width) }),
    m({ property: "og:image:height", content: String(meta.image.height) }),
    m({ property: "og:image:alt", content: meta.image.alt }),

    m({ name: "twitter:card", content: "summary_large_image" }),
    m({ name: "twitter:title", content: meta.title }),
    m({ name: "twitter:description", content: meta.description }),
    m({ name: "twitter:image", content: meta.image.url }),
    m({ name: "twitter:image:alt", content: meta.image.alt }),

    m({ name: "geo.region", content: "US-TX" }),
    m({ name: "geo.placename", content: "Houston" }),

    { tag: "script", attrs: { type: "application/ld+json" }, children: jsonLd, injectTo: "head" },
  ];
}
