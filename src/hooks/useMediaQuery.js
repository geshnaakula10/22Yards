import { useSyncExternalStore } from "react";

/**
 * Live media-query match. Server render (and hydration) always sees `false`,
 * then React re-renders with the real value — so prerendered HTML hydrates
 * without mismatches.
 */
export function useMediaQuery(query) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false
  );
}

export function useIsMobile() {
  return useMediaQuery("(max-width: 768px)");
}

const noopSubscribe = () => () => {};

/**
 * true once web fonts have loaded (or after `timeout` ms, whichever is first).
 * false during the server render and hydration.
 */
let fontsReady = false;
const FONT_TIMEOUT = 1500;
function subscribeFonts(onChange) {
  if (fontsReady) return () => {};
  const done = () => {
    if (fontsReady) return;
    fontsReady = true;
    onChange();
  };
  const timer = setTimeout(done, FONT_TIMEOUT);
  (document.fonts?.ready ?? Promise.resolve()).then(done);
  return () => clearTimeout(timer);
}
export function useFontsReady() {
  return useSyncExternalStore(
    subscribeFonts,
    () => fontsReady,
    () => false
  );
}

/** false during the server render and hydration, true once running in the browser. */
export function useHydrated() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  );
}
