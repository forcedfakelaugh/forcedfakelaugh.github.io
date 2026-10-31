# RELAY/09

An original concept for Lucas Nguyen's portfolio. The station is fictional. Layout, art direction, copy, the FX bus, the HUD and the per-frame accent system are original to this showcase. Concept direction was discussed with Codex; its RELAY/09 name and signal-archive idea were kept, and its advice to use only four effects was overruled because the brief asked for many.

## React Bits

All components are by David Haz / React Bits, pinned to revision `e12c22192ac7b4b452c5e2feb9b586d74765d696` (retrieved 2026-10-31). License: MIT + Commons Clause, retained verbatim in `LICENSE-react-bits.txt`. This page is an application of those components, not a redistribution of the library.

| Component | Local file | Adaptation |
| --- | --- | --- |
| [Faulty Terminal](https://reactbits.dev/backgrounds/faulty-terminal), [Dot Grid](https://reactbits.dev/backgrounds/dot-grid), [Glitch Text](https://reactbits.dev/text-animations/glitch-text), [Spotlight Card](https://reactbits.dev/components/spotlight-card), [Magnet](https://reactbits.dev/animations/magnet), [Pixel Card](https://reactbits.dev/components/pixel-card) | `vendor/*.js`, `effects.css` | Generated from upstream with only the JSX removed. `vendor/hooks.js` supplies one-shot hook stand-ins, so shaders and physics are unchanged and no React is loaded. |
| [Carousel](https://reactbits.dev/components/carousel) | `carousel.js` | Hand-ported to the DOM, keeping `pose()`, spring constants, drag release and wheel handling. Always loops; frame and round variants removed; mode can change at runtime. |
| [Decrypted Text](https://reactbits.dev/text-animations/decrypted-text) | `text-and-spark.js` | Hand-ported and reduced: scramble and sequential reveal only. Hover radius, flip effect and loop removed. |
| [Click Spark](https://reactbits.dev/animations/click-spark) | `text-and-spark.js` | Hand-ported and reduced: line sparks and ring on one fixed canvas. |

The ticker, scan sweep and frame brackets are original CSS.

## Images

No image files are added here. RELAY/09 loads the twelve Parallax frames directly from `../selected-studies/assets/`, `../hien/assets/`, `../mai-le/assets/` and `../elseform/assets/`. Their provenance is in [Parallax credits](../selected-studies/CREDITS.md). Each frame's credit is shown in the receiver. Lacquer and Resonance are AI-generated concept images, as are Mai Lê and LÁ. `assets/preview.webp` is a browser capture of this page.

Telemetry in the HUD (FPS, viewport, pointer) is measured live. Frame dimensions, ratio and megapixels are the source image's real values. No signal data is invented beyond the fictional station name and RX codes.

JetBrains Mono loads from Google Fonts, with system monospace fallbacks.

## Maintenance

Open `/showcases/relay/`. VI/EN copy lives in `showcases/locales/relay.js`. Elements that scramble are marked `data-no-translate` and are rendered with `showcaseLanguage.translate()` in `app.js`.
