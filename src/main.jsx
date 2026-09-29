import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = document.getElementById("root");
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Production HTML is prerendered (scripts/prerender.mjs): hydrate it.
// The dev server serves an empty root: render from scratch.
if (root.firstElementChild) ReactDOM.hydrateRoot(root, app);
else ReactDOM.createRoot(root).render(app);
