import { useSyncExternalStore } from "react";

/** Tiny store for "which homepage section is on screen" (drives nav highlighting). */
let active = null;
const listeners = new Set();

export function setActiveSection(id) {
  if (id === active) return;
  active = id;
  listeners.forEach((l) => l());
}

function subscribe(l) {
  listeners.add(l);
  return () => listeners.delete(l);
}

export function useActiveSection() {
  return useSyncExternalStore(subscribe, () => active, () => null);
}

/** Whether a nav item (see navItems in content/site.js) should light up for the active section. */
export const isNavActive = (item, active) => Boolean(active && item.match.includes(active));
