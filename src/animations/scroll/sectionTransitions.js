import anime from "animejs";

/**
 * Builds the paused, scroll-scrubbed Anime.js timelines for one scene.
 *
 * - enter: the scene's `[data-reveal]` blocks rise and fade in, staggered
 * - exit:  the whole frame lifts slightly and fades out
 *
 * Neither ever plays on its own; the scene track seeks them from scroll
 * progress, which makes both directions (down and up) come for free.
 *
 * @param {{ frame: HTMLElement, content: HTMLElement, extendEnter?: (tl, content) => void }} opts
 */
export function createSceneTimelines({ frame, content, extendEnter }) {
  const reveals = content.querySelectorAll("[data-reveal]");

  const enter = anime.timeline({ autoplay: false, easing: "easeOutCubic" });
  enter.add({
    targets: reveals.length ? reveals : content,
    opacity: [0, 1],
    translateY: [36, 0],
    duration: 700,
    delay: anime.stagger(80),
  });
  extendEnter?.(enter, content);

  const exit = anime({
    targets: frame,
    opacity: [1, 0],
    translateY: [0, -40],
    duration: 1000,
    easing: "easeInQuad",
    autoplay: false,
  });

  let lastEnter = -1;
  let lastExit = -1;

  return {
    seek(enterP, exitP) {
      if (enterP !== lastEnter) {
        enter.seek(enterP * enter.duration);
        lastEnter = enterP;
      }
      if (exitP !== lastExit) {
        exit.seek(exitP * exit.duration);
        lastExit = exitP;
      }
    },
    destroy() {
      const targets = [frame, content, ...reveals];
      anime.remove(targets);
      targets.forEach((el) => {
        el.style.opacity = "";
        el.style.transform = "";
      });
    },
  };
}
