import { useRef } from "react";
import { useSceneTrack } from "./SceneTrack";
import { SceneNearContext } from "./sceneNear";
import { useIsoLayoutEffect } from "../../hooks/useIsoLayoutEffect";

/**
 * One scene inside <SceneTrack>. Content stays declarative: mark the blocks
 * that should stagger in with `data-reveal` (see sectionTransitions.js for
 * the variants), and the track handles enter, exit, reverse and tall-content
 * scrolling.
 *
 * Every visible block should sit inside a `data-reveal` element, so nothing
 * shows before the scene enters. (The hero is the exception: it runs its own
 * load-in intro.)
 *
 * @param {string}    id            - anchor id used by nav links (#id)
 * @param {number}    [hold]        - extra dwell, in viewport heights
 * @param {"dark"}    [tone]        - scene sits on a dark backdrop; flips text tokens and fixed chrome
 * @param {ReactNode} [backdrop]    - full-screen layer behind the scene (and behind the ball)
 * @param {function}  [extendEnter] - (anime timeline, contentEl) => void, to add scene-specific enter tweens
 * @param {function}  [extendExit]  - (anime timeline, contentEl) => void, to add scene-specific exit tweens
 * @param {number}    index         - injected by SceneTrack
 * @param {boolean}   near          - injected by SceneTrack (see sceneNear.js)
 */
export default function ScrollSection({ id, index, near = true, hold, tone, backdrop, extendEnter, extendExit, className = "", children }) {
  const track = useSceneTrack();
  const frameRef = useRef(null);
  const contentRef = useRef(null);

  useIsoLayoutEffect(
    () =>
      track.register(index, {
        id,
        index,
        hold,
        tone,
        extendEnter,
        extendExit,
        frame: frameRef.current,
        content: contentRef.current,
      }),
    [track, index, id, hold, tone, extendEnter, extendExit]
  );

  const classes = ["scene", `scene--${id}`, tone && `scene--${tone}`, className].filter(Boolean).join(" ");

  return (
    <SceneNearContext.Provider value={near}>
      <section className={classes} id={track.live ? undefined : id} aria-labelledby={`${id}-title`}>
        {/* In the static track the backdrop lives in the section; in the live track SceneTrack renders it under the ball. */}
        {!track.live && backdrop && (
          <div className="scene__backdrop" aria-hidden="true">
            {backdrop}
          </div>
        )}
        <div className="scene__frame" ref={frameRef}>
          <div className="scene__content" ref={contentRef}>
            {children}
          </div>
        </div>
      </section>
    </SceneNearContext.Provider>
  );
}
