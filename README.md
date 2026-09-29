# 22 Yards Houston — Redesign

Vite + React + Anime.js. Current scope: the full homepage as a sequence of
scroll-driven scenes, with the persistent cricket ball (scroll → seam spins).

## Run
```bash
npm install
npm run dev
```

## How the page works
- `SceneTrack` (components/scroll) pins one viewport-sized stage and stacks every
  `<ScrollSection>` inside it. The track is just tall enough to scroll through them.
- `animations/scroll/sceneLayout.js` turns the scenes into scroll windows:
  enter → hold → exit, with each scene entering shortly after the previous one
  starts to exit, so they cross-fade. Scenes taller than the screen hold longer
  and scroll their content internally.
- `animations/scroll/sectionTransitions.js` builds paused Anime.js timelines per
  scene (`[data-reveal]` blocks stagger in, the frame lifts and fades out). They are
  *seeked* from scroll position, so scrolling up reverses everything.
- `animations/scroll/scrollEngine.js` is the single lerp-smoothed scroll loop;
  it only runs while scroll is settling.
- `PersistentBall` is one fixed layer: it starts in the hero's `[data-ball-anchor]`
  slot, docks at the right edge (bottom-right corner on mobile) behind the scene
  content, spins with scroll at the original hero speed, and slides out just
  before the footer (`animations/scroll/ballAnimation.js`).
- `prefers-reduced-motion`: scenes render as ordinary visible sections, no
  smoothing, and the hero draws a static ball.

## Adding a scene
```jsx
<ScrollSection id="my-section">   {/* id = nav anchor (#my-section) */}
  <MySection />                    {/* mark blocks with data-reveal; heading id="my-section-title" */}
</ScrollSection>
```
Every visible block inside a scene should sit in a `data-reveal` element.

## Content
All copy lives in `src/content/` and is taken from the current site's screenshots.
Anything not visible there is a placeholder (images, lane rates/hours, booking and
social URLs — see `PLACEHOLDER_URL` in `content/site.js`, legal links).

## Tuning
- Scene timings (enter/exit/hold/handoff): `TIMING` in `sceneLayout.js`
- Ball spin speed: `DEG_PER_VIEWPORT`; docked position/size: `dockPose` in `ballAnimation.js`
- Smoothing: `smoothing` in `scrollEngine.js`
- Colours, type, gutters: `styles/tokens.css`

## Parked for a later phase
`CricketBat.jsx`, `ImpactEffect.jsx`, and `animations/hero/buildHeroTimeline.js`
(bat swing + impact sequence) are kept but not wired in.
