/**
 * Turns the list of scenes into scroll windows (in px from the top of the
 * scene track). All scenes share one pinned stage; scroll position decides
 * which scene is entering, holding or exiting:
 *
 *   hero:   [ hold ........ | exit ]
 *   next:                 [ enter | hold (+ overflow) | exit ]
 *   next:                                        [ enter | hold ... ]
 *
 * A scene starts entering shortly after the previous one starts exiting, so
 * they cross-fade instead of being pushed up by the browser. Because every
 * window is a pure function of scroll position, scrolling up plays it all
 * in reverse.
 */

/** Durations in viewport heights of scroll. */
export const TIMING = {
  enter: 0.6,
  exit: 0.5,
  hold: 0.7,
  /** delay between the previous scene starting to exit and this one entering */
  handoff: 0.35,
  /** how long a tall scene holds before its content starts scrolling internally */
  holdLead: 0.25,
  /** ball glides from hero spot to its docked spot over this much scroll */
  ballDock: 0.8,
  /** ball leaves over this much scroll before the footer */
  ballExit: 0.6,
  /** pinned scroll after the ball has left, before the footer arrives */
  tail: 0.15,
};

/**
 * @param {{ overflow: number, hold?: number }[]} scenes - overflow = px of content taller than the stage
 * @param {number} vh - stage height in px
 */
export function computeSceneLayout(scenes, vh) {
  const windows = [];
  let prevExitStart = 0;

  scenes.forEach((scene, i) => {
    const first = i === 0;
    const last = i === scenes.length - 1;
    const enterStart = first ? 0 : prevExitStart + TIMING.handoff * vh;
    const enterEnd = first ? 0 : enterStart + TIMING.enter * vh;
    const holdLead = scene.overflow > 0 ? TIMING.holdLead * vh : 0;
    const exitStart = enterEnd + (scene.hold ?? TIMING.hold) * vh + holdLead + scene.overflow;
    // The last scene never fades: it scrolls away naturally with the footer.
    const exitEnd = last ? Infinity : exitStart + TIMING.exit * vh;

    windows.push({ enterStart, enterEnd, exitStart, exitEnd, holdLead, overflow: scene.overflow });
    prevExitStart = exitStart;
  });

  const hero = windows[0];
  const final = windows[windows.length - 1];
  const ball = {
    dockStart: hero.exitStart,
    dockEnd: hero.exitStart + TIMING.ballDock * vh,
    exitStart: final.exitStart,
    exitEnd: final.exitStart + TIMING.ballExit * vh,
  };
  const scrollLength = ball.exitEnd + TIMING.tail * vh;

  return { windows, ball, scrollLength, trackHeight: scrollLength + vh };
}

export const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);

/** Where to scroll (px from track top) so `offset` px of a scene's overflow is showing. */
export function sceneScrollTarget(win, offset = 0) {
  if (offset <= 0 || win.overflow <= 0) return win.enterEnd;
  return win.enterEnd + win.holdLead + Math.min(offset, win.overflow);
}

/** Per-frame progress for one scene at track scroll position `s`. */
export function sceneProgress(win, s) {
  const enter = win.enterEnd === win.enterStart ? 1 : clamp01((s - win.enterStart) / (win.enterEnd - win.enterStart));
  const exit = win.exitEnd === Infinity ? 0 : clamp01((s - win.exitStart) / (win.exitEnd - win.exitStart));
  const shift = win.overflow > 0 ? Math.min(win.overflow, Math.max(0, s - win.enterEnd - win.holdLead)) : 0;
  return { enter, exit, shift, weight: enter * (1 - exit) };
}
