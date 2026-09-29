import {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { refreshScroll, setScrollSmoothing, subscribeScroll } from "../../animations/scroll/scrollEngine";
import { computeSceneLayout, sceneProgress, sceneScrollTarget } from "../../animations/scroll/sceneLayout";
import { createSceneTimelines } from "../../animations/scroll/sectionTransitions";
import { setActiveSection } from "../../state/activeSection";

const TrackContext = createContext(null);
export const useSceneTrack = () => useContext(TrackContext);

/**
 * Hosts the homepage "scenes". Every <ScrollSection> child is stacked inside
 * one pinned, viewport-sized stage; the track itself is just tall enough to
 * scroll through all of them. Scroll position (not time) drives each scene's
 * enter / hold / exit, so the page reads as a sequence of cross-fading
 * scenes that reverses cleanly when scrolling back up.
 *
 * `overlay` renders alongside the stage (used for the persistent ball) and
 * can subscribe to per-frame track state via useSceneTrack().subscribeFrame.
 *
 * With prefers-reduced-motion the track renders the scenes as ordinary,
 * fully visible sections in normal document flow.
 */
export default function SceneTrack({ children, overlay }) {
  const reduced = useReducedMotion();
  const trackRef = useRef(null);
  const stageRef = useRef(null);
  const markerRefs = useRef([]);
  const entries = useRef([]);
  const frameListeners = useRef(new Set());
  const lastFrame = useRef(null);

  const scenes = Children.toArray(children).filter(isValidElement);

  const api = useMemo(
    () => ({
      reduced,
      register(index, entry) {
        entries.current[index] = entry;
        return () => {
          if (entries.current[index] === entry) entries.current[index] = undefined;
        };
      },
      subscribeFrame(fn) {
        frameListeners.current.add(fn);
        if (lastFrame.current) fn(lastFrame.current);
        return () => frameListeners.current.delete(fn);
      },
    }),
    [reduced]
  );

  useLayoutEffect(() => {
    if (reduced) {
      setScrollSmoothing(1);
      setActiveSection(null);
      return undefined;
    }

    setScrollSmoothing(0.12);
    const track = trackRef.current;
    const stage = stageRef.current;
    const list = entries.current.filter(Boolean);
    const timelines = list.map((e) =>
      createSceneTimelines({ frame: e.frame, content: e.content, extendEnter: e.extendEnter })
    );
    const shifts = list.map(() => 0);
    let state = null;
    let activeIndex = -1;

    function measure() {
      const vh = stage.clientHeight;
      const vw = document.documentElement.clientWidth;
      const layout = computeSceneLayout(
        list.map((e) => ({ overflow: Math.max(0, Math.ceil(e.content.offsetHeight - vh)), hold: e.hold })),
        vh
      );

      track.style.height = `${layout.trackHeight}px`;
      layout.windows.forEach((w, i) => {
        const marker = markerRefs.current[i];
        if (marker) marker.style.top = `${w.enterEnd}px`;
      });

      // The hero's ball slot, relative to the pinned stage. Measured against
      // the hero content box so in-flight scene transforms cancel out.
      const hero = list[0].content;
      const slot = hero.querySelector("[data-ball-anchor]");
      const heroBox = hero.getBoundingClientRect();
      const slotBox = slot ? slot.getBoundingClientRect() : { left: vw / 2, top: vh / 2, width: 0, height: 0 };
      const heroPose = {
        x: slotBox.left - heroBox.left + slotBox.width / 2,
        y: slotBox.top - heroBox.top + slotBox.height / 2,
        size: slotBox.width,
      };

      state = {
        layout,
        vw,
        vh,
        heroPose,
        trackTop: track.getBoundingClientRect().top + window.scrollY,
      };
    }

    function update(smoothed, raw) {
      if (!state) return;
      const { layout } = state;
      const s = smoothed - state.trackTop;
      let best = -1;
      let bestWeight = 0;

      list.forEach((entry, i) => {
        const p = sceneProgress(layout.windows[i], s);
        timelines[i].seek(p.enter, p.exit);
        if (p.shift !== shifts[i]) {
          entry.content.style.transform = p.shift ? `translate3d(0, ${-p.shift}px, 0)` : "";
          shifts[i] = p.shift;
        }
        if (p.weight > bestWeight) {
          bestWeight = p.weight;
          best = i;
        }
      });

      if (best !== activeIndex) {
        list.forEach((e, i) => e.frame.classList.toggle("is-active", i === best));
        activeIndex = best;
      }
      const pastTrack = raw - state.trackTop > layout.scrollLength + state.vh * 0.4;
      setActiveSection(pastTrack ? "contact" : list[best]?.id ?? null);

      lastFrame.current = { ...state, s, activeIndex };
      frameListeners.current.forEach((fn) => fn(lastFrame.current));
    }

    let pending = 0;
    function relayout() {
      cancelAnimationFrame(pending);
      pending = requestAnimationFrame(() => {
        measure();
        refreshScroll();
      });
    }

    // Keyboard users: tabbing into a scene that isn't on screen scrolls the
    // page to that scene (and far enough into it to show the focused element).
    function onFocusIn(event) {
      const i = list.findIndex((e) => e.frame.contains(event.target));
      if (i < 0 || !state) return;
      list[i].frame.scrollTop = 0; // focus can scroll clipped boxes; undo it
      const box = event.target.getBoundingClientRect();
      if (i === activeIndex && box.top >= 0 && box.bottom <= state.vh) return;
      const offset = box.top - list[i].content.getBoundingClientRect().top - state.vh * 0.35;
      const top = state.trackTop + sceneScrollTarget(state.layout.windows[i], offset);
      window.scrollTo({ top, behavior: "instant" });
    }

    measure();
    const unsubscribe = subscribeScroll(update);

    if (window.location.hash) {
      document.getElementById(window.location.hash.slice(1))?.scrollIntoView();
    }

    const resizeObserver = new ResizeObserver(relayout);
    list.forEach((e) => resizeObserver.observe(e.content));
    resizeObserver.observe(stage);
    window.addEventListener("resize", relayout);
    track.addEventListener("focusin", onFocusIn);
    document.fonts?.ready.then(relayout);

    return () => {
      cancelAnimationFrame(pending);
      unsubscribe();
      resizeObserver.disconnect();
      window.removeEventListener("resize", relayout);
      track.removeEventListener("focusin", onFocusIn);
      timelines.forEach((t) => t.destroy());
      list.forEach((e) => {
        e.content.style.transform = "";
        e.frame.classList.remove("is-active");
      });
      track.style.height = "";
      lastFrame.current = null;
    };
  }, [reduced, scenes.length]);

  return (
    <TrackContext.Provider value={api}>
      <div className={`track ${reduced ? "track--static" : "track--live"}`} ref={trackRef}>
        {!reduced &&
          scenes.map((scene, i) => (
            <span
              key={scene.props.id}
              id={scene.props.id}
              className="track__marker"
              ref={(el) => (markerRefs.current[i] = el)}
              aria-hidden="true"
            />
          ))}
        <div className="track__stage" ref={stageRef}>
          {scenes.map((scene, i) => cloneElement(scene, { index: i }))}
        </div>
        {overlay}
      </div>
    </TrackContext.Provider>
  );
}
