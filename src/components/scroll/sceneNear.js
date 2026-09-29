import { createContext, useContext } from "react";

/**
 * Whether a scene is close enough to the viewer to load its images.
 * In the live track every scene sits inside the viewport (stacked in the
 * pinned stage), so native lazy-loading can't tell them apart; the track
 * flips this on for the active scene and its neighbours instead.
 * Defaults to true (static track, footer, anything outside a scene).
 */
export const SceneNearContext = createContext(true);
export const useSceneNear = () => useContext(SceneNearContext);
