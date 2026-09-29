# 22 Yards Houston — Redesign

Vite + React + Anime.js. The homepage is a sequence of scroll-driven scenes on
a 22-yard "pitch": a persistent cricket ball spins, lofts and bounces from
scene to scene, a pitch ruler counts 0 → 22 yards down the left edge, and the
footer is the batter's crease ("See you at the crease.").

## Run
```bash
npm install
npm run dev       # dev server (client-rendered)
npm run build     # client build + SSR build + prerender → dist/
npm run preview   # serve dist/
```

`npm run build` prerenders the page: `dist/index.html` ships with all of its
content as real HTML (see "SEO" below). Deploy `dist/` as a static site.

## How the page works
- `SceneTrack` (components/scroll) pins one viewport-sized stage and stacks every
  `<ScrollSection>` inside it. The track is just tall enough to scroll through them.
- `animations/scroll/sceneLayout.js` turns the scenes into scroll windows:
  enter → hold → exit, with each scene entering shortly after the previous one
  starts to exit, so they cross-fade. Tall scenes hold longer and scroll their
  content internally; a scene with a `[data-rail]` scrolls it *sideways* instead
  (the gallery).
- `animations/scroll/sectionTransitions.js` builds paused Anime.js timelines per
  scene and *seeks* them from scroll position, so scrolling up reverses
  everything. Blocks opt in with `data-reveal`:
  | value | move |
  |---|---|
  | *(empty)* | rise + fade |
  | `words` | words slide up out of line masks (`<SplitWords>`); `.hl` highlights swipe in after |
  | `mask` | clip-path wipe upwards, the photo inside settles from a zoom |
  | `line` | draws in from the left |
  | `pop` | scale + fade |
  | `fade` | opacity only |
- `ScrollSection` options: `tone="dark"` (flips colour tokens; the header and
  ruler follow via `<html data-tone>`), `backdrop` (full-screen layer rendered
  *under* the ball, cross-faded with the scene), `extendEnter` / `extendExit`
  (scene-specific tweens), `hold`. `[data-parallax="0.15"]` elements drift.
- `animations/scroll/scrollEngine.js` is the single lerp-smoothed scroll loop;
  it only runs while scroll is settling.
- `PersistentBall` is one fixed layer: it drops into the hero's
  `[data-ball-anchor]` slot on load, lofts in an arc to its dock at the right
  edge (bottom-right corner on small screens), hops once per scene change, and
  slides out before the footer (`animations/scroll/ballAnimation.js`).
- The hero load-in is pure CSS (`sections.css`, "Load-in intro"), so it plays
  from the first paint without waiting for JavaScript.
- Pointer niceties (`animations/interactions/pointerFx.js`): magnetic buttons
  (`data-magnetic`) and a cursor spotlight on cards (`data-spotlight`).

### Static vs live track
The prerendered HTML — and anyone with `prefers-reduced-motion` — gets the
**static track**: ordinary, fully visible sections in document flow (no
pinning, no ball layer). After hydration, once web fonts have loaded, the
**live track** switches on. Waiting for fonts matters: in the live track every
scene sits inside the viewport, so a font swap would count as one big layout
shift. Scenes that are fully off stage are marked `is-dormant` (opacity 0 but
still focusable), so they're never painted or measured as the page's LCP.

Photos only load when their scene is near (`components/scroll/sceneNear.js`):
native lazy-loading can't tell stacked scenes apart.

## Adding a scene
```jsx
<ScrollSection id="my-section" tone="dark" backdrop={<Backdrop photo="nets" />}>
  <MySection />   {/* heading id="my-section-title"; blocks marked with data-reveal */}
</ScrollSection>
```
Every visible block inside a scene must sit in a `data-reveal` element —
including container backgrounds and borders — or it will show through on
other scenes.

## Content
All copy lives in `src/content/` and is taken from the live site
(22yardshouston.com, Sept 2026): pricing, booking links, coaches, reviews,
FAQs, programs and facility descriptions. Nothing is invented. The same files
feed the JSON-LD, so the structured data never drifts from the page.

### Photos
All photos are 22 Yards Houston's own (from the live site; no stock or AI
images). They live in `public/images/<name>-<width>.webp` (480/800/1200) and
are described in `src/content/media.js` (intrinsic size + alt text). To add
one: export WebP at those widths, then add an entry to `media.js` and use
`<Media name="…" sizes="…" />`.

## SEO
- **Prerendered HTML**: ~2,000 words of real content, one keyword-bearing
  `h1`, a clean `h2`/`h3` outline, and every image with alt text and dimensions.
  Crawlers that don't run JavaScript (Bing and the AI crawlers, mostly) see the whole page.
- **Head tags** from `src/seo/` via a Vite plugin (`vite.config.js`): title,
  description, canonical, Open Graph + Twitter card (`public/og-image.jpg`,
  1200×630), geo tags.
- **JSON-LD** (`src/seo/schema.js`): `Organization`,
  `SportsActivityLocation` (address, map, offers with prices, amenities,
  coaches), `WebSite`, `WebPage`, `FAQPage`. Deliberately no review/rating
  markup: Google ignores self-served reviews for local businesses.
- `public/robots.txt`, `public/sitemap.xml` (with image entries),
  `public/llms.txt` (fact sheet for AI search), web manifest and icons.
- **Performance**: self-hosted fonts (Fontsource) with the two critical files
  preloaded, responsive WebP, CSS-only hero intro. Measured on the production
  build: CLS 0, desktop LCP ≈ 0.5 s, mobile LCP ≈ 2.7 s under Lighthouse's
  mobile throttling *without* compression — enable gzip/brotli on the host.

## Before launch — open items
- **Old URLs**: the current site has `/about-us/`, `/coaching/`,
  `/lane-rentals/`, `/special-events/`, `/gallery/`, `/contact-us/`. 301-redirect
  them (e.g. to `/#coaching`) or, better, build them as real pages
  (`react-router-dom` is already a dependency and `src/pages/` is reserved) —
  otherwise their rankings are lost.
- **Legal pages**: the footer links to `/privacy-policy/`, `/terms-of-use/`,
  `/disclaimer/`, `/cancellation-release-and-waiver-liability/`; keep them live.
- **Opening hours**: not published on the live site. Set `contact.hours` in
  `content/site.js` and they appear in the footer and the schema.
- **What's new**: the T.A. Sekar camp (Feb 27 – Mar 3) is past; update
  `content/events.js`.
- **Booking**: `axon22yards.com` is used for booking and member login (as in
  the live header). The live top bar still links an older spawtz booking page — confirm which is current.
- Update `lastmod` in `public/sitemap.xml` when content changes, and keep the
  business name/address/phone identical to the Google Business Profile.

## Tuning
- Scene timings (enter/exit/hold/handoff): `TIMING` in `sceneLayout.js`
- Ball spin speed: `DEG_PER_VIEWPORT`; dock position/size: `dockPose`; hop
  height: `HOP` in `PersistentBall.jsx`
- Smoothing: `smoothing` in `scrollEngine.js`
- Colours, type, gutters: `styles/tokens.css`

## Parked for a later phase
`CricketBat.jsx`, `ImpactEffect.jsx`, and `animations/hero/buildHeroTimeline.js`
(bat swing + impact sequence) are kept but not wired in.
