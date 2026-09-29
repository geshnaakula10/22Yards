import { useMediaQuery } from "./useMediaQuery";

/**
 * Tracks the user's `prefers-reduced-motion` setting live, so any
 * animation component can bail into a static/fade-only fallback.
 */
export function useReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
