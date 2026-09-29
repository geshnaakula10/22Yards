import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App";

/**
 * Build-time render of the homepage (see scripts/prerender.mjs). The output
 * is the "static track" — every section in normal flow, fully visible — so
 * crawlers, link previews and no-JS visitors get the whole page. The client
 * hydrates it and then switches the scroll scenes on.
 */
export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
