import { Children, cloneElement, createContext, isValidElement, useContext, useMemo, useRef, useState } from "react";
import { SceneNearContext } from "./sceneNear";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useFontsReady, useHydrated } from "../../hooks/useMediaQuery";
import { useIsoLayoutEffect } from "../../hooks/useIsoLayoutEffect";
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
 * Extras per scene (all optional, see ScrollSection):
 * - a `[data-rail]` element inside the scene scrolls sideways instead of the
 *   content scrolling up (horizontal gallery); `[data-rail-item]` children get
 *   a little parallax on their image
 * - `backdrop`: a full-screen layer rendered *under* the ball, cross-faded
 *   with the scene (dark / photo scenes). Its `.bd__img` slowly zooms out.
 * - `tone="dark"`: while dark scenes dominate, <html data-tone="dark"> is set
 *   so fixed chrome (header, pitch ruler) can switch colours
 * - `[data-parallax="0.2"]` elements drift vertically across the scene's life
 *
 * `overlay` renders alongside the stage (the persistent ball, the pitch ruler)
 * and can subscribe to per-frame track state via useSceneTrack().subscribeFrame.
 *
 * The prerendered HTML — and anyone with prefers-reduced-motion — gets the
 * "static" track: ordinary, fully visible sections in document flow. The
 * live track switches on after hydration, once web fonts are in: every
 * scene sits inside the viewport in the live track, so a font swap there
 * would reflow all of them at once (a big layout shift). In the static
 * track only the hero is on screen, and its text is still held for the intro.
 */
export default function SceneTrack({ children, overlay }) {
  const prefersReduced = useReducedMotion();
  const hydrated = useHydrated();
  const fontsReady = useFontsReady();
  const live = hydrated && fontsReady && !prefersReduced;

  const trackRef = useRef(null);
  const stageRef = useRef(null);
  const markerRefs = useRef([]);
  const backdropRefs = useRef([]);
  const entries = useRef([]);
  const frameListeners = useRef(new Set());
  const lastFrame = useRef(null);
  // Scenes whose images may load (live track only). Grows as the viewer moves; never shrinks.
  const [near, setNear] = useState(() => new Set([0, 1, 2]));
  const nearRef = useRef(near);

  const scenes = Children.toArray(children).filter(isValidElement);

  const api = useMemo(
    () => ({
      live,
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
    [live]
  );

  useIsoLayoutEffect(() => {
    if (!live) {
      setScrollSmoothing(1);
      setActiveSection(null);
      return undefined;
    }

    setScrollSmoothing(0.12);
    const root = document.documentElement;
    const track = trackRef.current;
    const stage = stageRef.current;
    const list = entries.current.filter(Boolean).map((e) => {
      const rail = e.content.querySelector("[data-rail]");
      return {
        ...e,
        rail,
        railItems: rail
          ? [...rail.querySelectorAll("[data-rail-item]")].map((el) => ({ el, img: el.querySelector("img"), left: 0, width: 0 }))
          : [],
        railLeft: 0,
        parallax: [...e.content.querySelectorAll("[data-parallax]")].map((el) => ({ el, speed: Number(el.dataset.parallax) || 0.1 })),
        backdrop: backdropRefs.current[e.index] ?? null,
      };
    });
    list.forEach((e) => (e.backdropImg = e.backdrop?.querySelector(".bd__img") ?? null));

    const timelines = list.map((e) =>
      createSceneTimelines({ frame: e.frame, content: e.content, extendEnter: e.extendEnter, extendExit: e.extendExit })
    );
    const shifts = list.map(() => 0);
    const dormant = list.map(() => false);
    let state = null;
    let activeIndex = -1;
    let tone = null;

    function measure() {
      const vh = stage.clientHeight;
      const vw = document.documentElement.clientWidth;

      list.forEach((e, i) => {
        if (!e.rail) return;
        e.railLeft = e.rail.getBoundingClientRect().left + shifts[i];
        e.railItems.forEach((it) => {
          it.left = it.el.offsetLeft;
          it.width = it.el.offsetWidth;
        });
      });

      const layout = computeSceneLayout(
        list.map((e) => ({
          overflow: e.rail
            ? Math.max(0, Math.ceil(e.rail.scrollWidth - e.rail.clientWidth))
            : Math.max(0, Math.ceil(e.content.offsetHeight - vh)),
          hold: e.hold,
        })),
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
      const { layout, vw, vh } = state;
      const s = smoothed - state.trackTop;
      let best = -1;
      let bestWeight = 0;
      let darkWeight = 0;

      const progress = list.map((entry, i) => {
        const p = sceneProgress(layout.windows[i], s);
        timelines[i].seek(p.enter, p.exit);

        // Scenes that are fully off stage are made transparent (not hidden, so
        // keyboard focus can still reach them): nothing half-masked in them
        // gets painted, or counted as the page's largest paint.
        const isDormant = p.weight === 0;
        if (isDormant !== dormant[i]) {
          entry.frame.classList.toggle("is-dormant", isDormant);
          dormant[i] = isDormant;
        }

        if (p.shift !== shifts[i]) {
          if (entry.rail) entry.rail.style.transform = p.shift ? `translate3d(${-p.shift}px, 0, 0)` : "";
          else entry.content.style.transform = p.shift ? `translate3d(0, ${-p.shift}px, 0)` : "";
          shifts[i] = p.shift;
        }

        if (p.weight > 0) {
          entry.parallax.forEach(({ el, speed }) => {
            el.style.transform = `translate3d(0, ${((0.5 - p.local) * speed * vh).toFixed(1)}px, 0)`;
          });
          entry.railItems.forEach((it) => {
            if (!it.img) return;
            const center = entry.railLeft + it.left + it.width / 2 - p.shift;
            const d = (center - vw / 2) / vw;
            it.img.style.transform = `translate3d(${(-d * 70).toFixed(1)}px, 0, 0) scale(1.2)`;
          });
        }

        if (entry.backdrop) {
          entry.backdrop.style.opacity = p.weight.toFixed(3);
          entry.backdrop.style.visibility = p.weight > 0.001 ? "visible" : "hidden";
          if (entry.backdropImg && p.weight > 0) {
            entry.backdropImg.style.transform = `scale(${(1.14 - 0.14 * p.local).toFixed(4)})`;
          }
        }

        if (entry.tone === "dark") darkWeight += p.weight;
        if (p.weight > bestWeight) {
          bestWeight = p.weight;
          best = i;
        }
        return p;
      });

      if (best !== activeIndex) {
        list.forEach((e, i) => e.frame.classList.toggle("is-active", i === best));
        activeIndex = best;
        const want = [best - 1, best, best + 1, best + 2].filter((i) => i >= 0 && i < list.length);
        if (want.some((i) => !nearRef.current.has(list[i].index))) {
          nearRef.current = new Set([...nearRef.current, ...want.map((i) => list[i].index)]);
          setNear(nearRef.current);
        }
      }
      const nextTone = darkWeight > 0.5 ? "dark" : "light";
      if (nextTone !== tone) {
        root.dataset.tone = nextTone;
        tone = nextTone;
      }
      const pastTrack = raw - state.trackTop > layout.scrollLength + state.vh * 0.4;
      setActiveSection(pastTrack ? "contact" : list[best]?.id ?? null);

      lastFrame.current = { ...state, s, activeIndex, progress };
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
      const entry = list[i];
      entry.frame.scrollTop = 0; // focus can scroll clipped boxes; undo it
      entry.frame.scrollLeft = 0;
      const box = event.target.getBoundingClientRect();
      if (i === activeIndex && box.top >= 0 && box.bottom <= state.vh && box.left >= 0 && box.right <= state.vw) return;
      const offset = entry.rail && entry.rail.contains(event.target)
        ? box.left - entry.rail.getBoundingClientRect().left - state.vw * 0.2
        : box.top - entry.content.getBoundingClientRect().top - state.vh * 0.35;
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
        if (e.rail) e.rail.style.transform = "";
        e.railItems.forEach((it) => it.img && (it.img.style.transform = ""));
        e.parallax.forEach(({ el }) => (el.style.transform = ""));
        e.frame.classList.remove("is-active", "is-dormant");
      });
      delete root.dataset.tone;
      track.style.height = "";
      lastFrame.current = null;
    };
  }, [live, scenes.length]);

  return (
    <TrackContext.Provider value={api}>
      <div className={`track ${live ? "track--live" : "track--static"}`} ref={trackRef}>
        {live &&
          scenes.map((scene, i) => (
            <span
              key={scene.props.id}
              id={scene.props.id}
              className="track__marker"
              ref={(el) => (markerRefs.current[i] = el)}
              aria-hidden="true"
            />
          ))}
        {live && (
          <div className="track__backdrops" aria-hidden="true">
            {scenes.map((scene, i) =>
              scene.props.backdrop ? (
                <div key={scene.props.id} className="track__backdrop" ref={(el) => (backdropRefs.current[i] = el)}>
                  <SceneNearContext.Provider value={near.has(i)}>{scene.props.backdrop}</SceneNearContext.Provider>
                </div>
              ) : null
            )}
          </div>
        )}
        <div className="track__stage" ref={stageRef}>
          {scenes.map((scene, i) => cloneElement(scene, { index: i, near: !live || near.has(i) }))}
        </div>
        {overlay}
      </div>
    </TrackContext.Provider>
  );
}
