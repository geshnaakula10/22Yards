/**
 * Prerender step (runs after `vite build` and `vite build --ssr`):
 * renders the app to HTML and writes it into dist/index.html, so the
 * shipped page contains all of its content before any JavaScript runs.
 */
import { readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssrDir = path.join(root, "dist-ssr");
const PLACEHOLDER = "<!--app-html-->";

const { render } = await import(pathToFileURL(path.join(ssrDir, "entry-server.js")).href);

const templatePath = path.join(dist, "index.html");
const template = await readFile(templatePath, "utf8");
if (!template.includes(PLACEHOLDER)) {
  throw new Error(`prerender: ${PLACEHOLDER} not found in dist/index.html`);
}

const appHtml = render();
await writeFile(templatePath, template.replace(PLACEHOLDER, appHtml));
await rm(ssrDir, { recursive: true, force: true });

console.log(`prerender: wrote dist/index.html (${(appHtml.length / 1024).toFixed(1)} kB of markup)`);
