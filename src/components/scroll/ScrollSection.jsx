import { useLayoutEffect, useRef } from "react";
import { useSceneTrack } from "./SceneTrack";

/**
 * One scene inside <SceneTrack>. Content stays declarative: mark the blocks
 * that should stagger in with `data-reveal`, and the track handles enter,
 * exit, reverse and tall-content scrolling.
 *
 * Every visible block should sit inside a `data-reveal` element, so nothing
 * shows before the scene enters.
 *
 * @param {string}   id           - anchor id used by nav links (#id)
 * @param {number}   [hold]       - extra dwell, in viewport heights
 * @param {function} [extendEnter] - (anime timeline, contentEl) => void, to add scene-specific enter tweens
 * @param {number}   index        - injected by SceneTrack
 */
export default function ScrollSection({ id, index, hold, extendEnter, className = "", children }) {
  const track = useSceneTrack();
  const frameRef = useRef(null);
  const contentRef = useRef(null);

  useLayoutEffect(
    () =>
      track.register(index, {
        id,
        hold,
        extendEnter,
        frame: frameRef.current,
        content: contentRef.current,
      }),
    [track, index, id, hold, extendEnter]
  );

  return (
    <section
      className={`scene scene--${id} ${className}`}
      id={track.reduced ? id : undefined}
      aria-labelledby={`${id}-title`}
    >
      <div className="scene__frame" ref={frameRef}>
        <div className="scene__content" ref={contentRef}>
          {children}
        </div>
      </div>
    </section>
  );
}
