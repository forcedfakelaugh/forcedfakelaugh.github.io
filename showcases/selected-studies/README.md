# Parallax

An original portfolio study inspired by Huy Phan's editorial gallery at `/showcases/selected-studies/`, listed in the homepage gallery with a screenshot thumbnail.

- A looping perspective gallery of twelve images: two original concepts, eight selected photographs, a painting from Mai Lê and the LÁ packaging concept from Elseform. Scroll, swipe, use the arrow keys, or select a project. Wheel snapping begins after 90 ms of inactivity; desktop uses 65 ms exponential easing.
- Mobile keeps neighboring photos visible in a diagonal stream. Touch tracking uses 45 ms easing and release uses 135 ms easing, with a small velocity-based coast before settling. The counter and project text blur during movement and sharpen at rest. A compact menu opens the other pages and collection index.
- Twelve study presentations with image details, full-image viewing, and a section navigator; a collection index; About, Approach, and Contact pages.
- A Playground with four Canvas 2D experiments: Ripple field, Orbital paths, Soft grid, and Light field. Each has pointer/touch interaction, intensity, pause, and reset controls.
- Shared portfolio navigation and VI/EN preferences, including inside dialogs. Reduced-motion preferences disable the gallery's tilt animation and pause the experiments by default.

Monsoon, Strata, Canopy, After Hours and Colonnade use local Unsplash photographs. Three other photographs reuse local Pexels assets from HIÊN. Each photograph has a photographer credit in its study page. The two original concept images describe possible future experiences; they are not completed 3D scenes. Mai Lê and LÁ retain their fictional concept and AI-generated artwork labels. See [CREDITS.md](CREDITS.md) and the bundled prompt manifest for provenance.

Run from the portfolio root with `npm run dev` (port 4174). Validate with `npm run check` and `npm run build`. This showcase has no additional runtime dependencies.
