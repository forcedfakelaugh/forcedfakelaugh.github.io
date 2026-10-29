# Fieldwork

Interactive sculpture concept migrated from Lucas's standalone `huyml` project. Eleven procedural ribbons morph between Orbit, Helix and Bloom. The geometry, environment, lighting and materials are generated in code; there are no external models, HDR maps, photographs or fonts. The homepage thumbnail is a screenshot of the original exhibit.

The original design and controls are preserved. Portfolio additions are the return navigation, shared Vietnamese/English copy, a homepage card and small spacing adjustments for Vietnamese. The original `DESIGN.md` records the design process, which used the Design on the Flank workflow: https://github.com/Chien1618/design-on-the-flank. It describes historical work on the standalone project, not a new review of this migration.

## Files and maintenance

- `Fieldwork.tsx` is the retained original Framer component and source of truth.
- `assets/Fieldwork.js` is its checked-in JavaScript output, copied from the standalone production package.
- `assets/app.js` mounts the component; `assets/framer-adapter.js` supplies a minimal browser adapter. This does not establish compatibility with the real Framer editor.
- `../locales/fieldwork.js` contains the portfolio translations. The shared translator updates text nodes and accessibility labels without remounting the React component.
- `style.css` contains only portfolio-specific spacing adjustments.

After changing the component, transpile `Fieldwork.tsx` with esbuild (`--format=esm --target=es2022 --outfile=assets/Fieldwork.js`). The checked-in output needs no package installation for the portfolio's normal check/build commands. Recheck both languages and the stateful controls after changes.

## Runtime dependencies

The original pinned CDN dependencies remain: React 18.3.1 and React DOM 18.3.1 via the import map, and Three.js 0.180.0 loaded by the component from esm.sh. An internet connection is required. Three.js loading or WebGL failures display an illustrated still study; blocked React prevents the interactive component from mounting.

The standalone Cloudflare project, hosting configuration, development QA globals and unrelated concept images are not part of this showcase. Publishing the portfolio is a separate action.
