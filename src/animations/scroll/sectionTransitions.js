import anime from "animejs";

/**
 * Builds the paused, scroll-scrubbed Anime.js timelines for one scene.
 *
 * enter: every `[data-reveal]` block in the scene, staggered in document
 *        order. The attribute value picks the move:
 *          (empty) / "up"  rise + fade
 *          "words"         words slide up out of line masks (use <SplitWords>);
 *                          any .hl inside gets a highlighter swipe afterwards
 *          "mask"          clip-path wipe upwards, the image inside settles from a zoom
 *          "line"          draws in from the left (scaleX)
 *          "pop"           scale + fade (badges, stamps)
 *          "fade"          opacity only
 * exit:  the whole frame lifts, shrinks a touch and fades out.
 *
 * Neither ever plays on its own; the scene track seeks them from scroll
 * progress, which makes both directions (down and up) come for free.
 *
 * @param {{ frame: HTMLElement, content: HTMLElement,
 *           extendEnter?: (tl, content) => void, extendExit?: (tl, content) => void }} opts
 */
export function createSceneTimelines({ frame, content, extendEnter, extendExit }) {
  const reveals = [...content.querySelectorAll("[data-reveal]")];
  const touched = new Set(reveals);

  const enter = anime.timeline({ autoplay: false, easing: "easeOutExpo" });
  // Long scenes shouldn't leave their last block waiting: cap the total stagger.
  const step = Math.min(90, 760 / Math.max(1, reveals.length));

  reveals.forEach((el, i) => {
    const at = Math.round(i * step);
    switch (el.dataset.reveal) {
      case "words": {
        const words = el.querySelectorAll(".sw__i");
        words.forEach((w) => touched.add(w));
        enter.add({ targets: words, translateY: ["135%", "0%"], rotate: [5, 0], duration: 950, delay: anime.stagger(38) }, at);
        const marks = el.querySelectorAll(".hl");
        if (marks.length) {
          marks.forEach((m) => touched.add(m));
          enter.add(
            { targets: marks, backgroundSize: ["0% 100%", "100% 100%"], duration: 700, easing: "easeInOutQuart" },
            at + 380 + words.length * 20
          );
        }
        break;
      }
      case "mask": {
        enter.add(
          { targets: el, clipPath: ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"], duration: 1100, easing: "easeInOutQuart" },
          at
        );
        const img = el.querySelector("img");
        if (img) {
          touched.add(img);
          enter.add({ targets: img, scale: [1.28, 1], duration: 1500, easing: "easeOutQuart" }, at);
        }
        break;
      }
      case "line":
        enter.add({ targets: el, scaleX: [0, 1], duration: 1000, easing: "easeInOutQuart" }, at);
        break;
      case "pop":
        enter.add({ targets: el, opacity: [0, 1], scale: [0.6, 1], rotate: [-12, 0], duration: 900, easing: "easeOutBack" }, at);
        break;
      case "fade":
        enter.add({ targets: el, opacity: [0, 1], duration: 800, easing: "linear" }, at);
        break;
      default:
        enter.add({ targets: el, opacity: [0, 1], translateY: [48, 0], duration: 950 }, at);
    }
  });
  extendEnter?.(enter, content);

  const exit = anime.timeline({ autoplay: false, easing: "easeInQuad" });
  exit.add({ targets: frame, opacity: [1, 0], translateY: [0, -56], scale: [1, 0.975], duration: 1000 }, 0);
  extendExit?.(exit, content);

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
      // extendEnter/extendExit targets are marked with data-anim so they can be reset too.
      const targets = [frame, content, ...touched, ...content.querySelectorAll("[data-anim]")];
      anime.remove(targets);
      content.querySelectorAll("[data-count]").forEach((el) => (el.textContent = el.dataset.count));
      targets.forEach((el) => {
        el.style.opacity = "";
        el.style.transform = "";
        el.style.clipPath = "";
        el.style.backgroundSize = "";
      });
    },
  };
}
