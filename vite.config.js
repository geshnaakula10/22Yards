import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { buildHeadTags } from "./src/seo/head.js";

/** Injects title, meta, Open Graph and JSON-LD (built from src/content) into index.html. */
function seoHead() {
  return {
    name: "22yards:seo-head",
    transformIndexHtml: () => buildHeadTags(),
  };
}

/**
 * Preloads the self-hosted font files the first screen needs (latin subsets
 * of Geist and Big Shoulders Display), so they arrive alongside the CSS
 * instead of after it. The file names are hashed, so they're found in the bundle.
 */
function preloadFonts(patterns) {
  return {
    name: "22yards:preload-fonts",
    apply: "build",
    transformIndexHtml: {
      order: "post",
      handler(_html, ctx) {
        return Object.keys(ctx.bundle ?? {})
          .filter((file) => patterns.some((p) => p.test(file)))
          .map((file) => ({
            tag: "link",
            attrs: { rel: "preload", as: "font", type: "font/woff2", href: `/${file}`, crossorigin: true },
            injectTo: "head",
          }));
      },
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    seoHead(),
    preloadFonts([/(^|\/)geist-latin-wght-normal-[\w-]+\.woff2$/, /(^|\/)big-shoulders-display-latin-wght-normal-[\w-]+\.woff2$/]),
  ],
});
