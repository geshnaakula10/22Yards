import { useEffect, useLayoutEffect } from "react";

/** useLayoutEffect in the browser, useEffect during the prerender (avoids React's SSR warning). */
export const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
