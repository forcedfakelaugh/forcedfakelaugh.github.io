# AFTERIMAGE

An original interactive light exhibition for Lucas Nguyen's portfolio. Layout, art direction, copy, three study presets, settings, print composition and static fallback are original to this showcase.

## React Bits

The light renderer adapts **Prism** by David Haz / React Bits:

- Component: https://reactbits.dev/backgrounds/prism
- Source: https://github.com/DavidHDev/react-bits/blob/e12c22192ac7b4b452c5e2feb9b586d74765d696/src/content/Backgrounds/Prism/Prism.jsx
- Pinned revision: `e12c22192ac7b4b452c5e2feb9b586d74765d696` (retrieved 2026-10-30).
- License: MIT + Commons Clause, retained verbatim in `LICENSE-react-bits.txt`.

`light-engine.js` retains the upstream Prism shader and adapts its lifecycle to native ES modules and WebGL2. No React, OGL, Three.js, CDN or package installation is needed. The three studies use authored geometry, orientation, colour and glow presets. Resolution is capped; animation stops offscreen, when the tab is hidden, and for reduced motion. A still fallback remains if WebGL2 cannot initialize or its context is lost.

The soft text entrances take inspiration from the React Bits Blur Text effect; their CSS/IntersectionObserver implementation is original. The page is an original application of React Bits, not a redistribution of its component library or tools.

## Images and prints

Study thumbnails and the preview are local captures of the actual adapted renderer. `assets/still.svg` is an original vector fallback. The art-print action captures the visitor's current composition locally and adds the exhibition's original layout and typography; no data is uploaded. PNG output is 1200 × 1500.

## Maintenance

Open `/showcases/afterimage/`. This draft is unlisted, available from `/hidden/`, and marked `noindex, nofollow`. Shared VI/EN copy lives in `showcases/locales/afterimage.js`. The complete route is included by the existing static build.

Run `npm run check`, `npm run build`, and `git diff --check`, then inspect desktop/mobile composition and exercise study selection, tuning, pause, reduced motion, and art-print download in a browser.
