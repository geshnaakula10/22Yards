import BallGraphic from "../ball/BallGraphic";
import { useSceneTrack } from "../scroll/SceneTrack";

/**
 * Unchanged hero composition. The ball itself is the persistent layer
 * (PersistentBall), which starts out centred on the `data-ball-anchor` slot
 * below the headline. With reduced motion, a static ball is drawn in place.
 */
export default function Hero() {
  const { reduced } = useSceneTrack();

  return (
    <div className="hero">
      <div className="copy" data-reveal>
        <p className="eyebrow">Indoor Cricket &middot; Houston</p>
        <h1 id="hero-title">
          PLAY. TRAIN. <span className="accent">COMPETE.</span>
        </h1>
      </div>
      <div className="scene-wrap" data-ball-anchor>
        {reduced && <BallGraphic />}
      </div>
      <p className="hero__cue" data-reveal aria-hidden="true">
        <span>Scroll</span>
        <span className="hero__cue-line" />
      </p>
    </div>
  );
}
