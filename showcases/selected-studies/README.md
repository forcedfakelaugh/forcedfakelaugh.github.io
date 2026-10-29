# Parallax

An original portfolio study inspired by Huy Phan's editorial gallery at `/showcases/selected-studies/`. Unlisted from the homepage and available through `/hidden/` with a gallery screenshot thumbnail. The showcase is marked `noindex, nofollow`.

- A looping perspective gallery of ten images: four original concepts and six selected Vietnam photographs. Scroll, swipe, use the arrow keys, or select a project. Snapping begins after 90 ms of wheel inactivity, with 65 ms exponential easing.
- Ten study presentations with image details, full-image viewing, and a section navigator; a collection index; About, Approach, and Contact pages.
- A Playground with four Canvas 2D experiments: Ripple field, Orbital paths, Soft grid, and Light field. Each has pointer/touch interaction, intensity, pause, and reset controls.
- Shared portfolio navigation and VI/EN preferences, including inside dialogs. Reduced-motion preferences disable the gallery's tilt animation and pause the experiments by default.

The six photographs reuse local Pexels assets from HIÊN, with photographer credits in their study pages. The four concept images describe possible future experiences; they are not completed 3D scenes. See [CREDITS.md](CREDITS.md) and the bundled prompt manifest for provenance.

Run from the portfolio root with `npm run dev` (port 4174). Validate with `npm run check` and `npm run build`. This showcase has no additional runtime dependencies.
