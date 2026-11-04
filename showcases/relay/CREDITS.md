# RELAY

A concept campaign for Lucas Nguyen's portfolio. RELAY is a fictional sportswear brand; its product names and prices are invented. Layout, art direction, copy and the campaign concept are original to this showcase. Concept direction and reviews were discussed with Codex.

## React Bits

All components are by David Haz / React Bits, pinned to revision `e12c22192ac7b4b452c5e2feb9b586d74765d696` (retrieved 2026-10-31). License: MIT + Commons Clause, retained verbatim in `LICENSE-react-bits.txt`. This page is an application of those components, not a redistribution of the library.

| Component | Local file | Adaptation |
| --- | --- | --- |
| [Faulty Terminal](https://reactbits.dev/backgrounds/faulty-terminal), [Glitch Text](https://reactbits.dev/text-animations/glitch-text), [Magnet](https://reactbits.dev/animations/magnet), [Pixel Card](https://reactbits.dev/components/pixel-card) | `vendor/*.js`, `effects.css` | Generated from upstream with only the JSX removed. `vendor/hooks.js` supplies one-shot hook stand-ins, so shaders and physics are unchanged and no React is loaded. |
| [Carousel](https://reactbits.dev/components/carousel) | `carousel.js` | Hand-ported to the DOM, keeping `pose()`, spring constants, drag release and wheel handling. Always loops; frame and round variants removed; uses the fade transition. |
| [Decrypted Text](https://reactbits.dev/text-animations/decrypted-text) | `text-and-spark.js` | Hand-ported and reduced: scramble and sequential reveal only. Hover radius, flip effect and loop removed. |

The scan sweep is original CSS.

## Images

**Run It Forward** uses six original AI-generated 3:2 key visuals in `assets/campaign/` (`1536 × 1024`, `960 × 640` and `480 × 320` WebP), shot to a raw 35mm flash night-running brief set on wet streets and bridges in Vietnam. RELAY is a fictional brand and the athletes are fictional. Generation brief is in [IMAGE-PROMPTS.md](IMAGE-PROMPTS.md). `assets/preview.webp` is a browser capture of the page.

JetBrains Mono loads from Google Fonts for display type and controls; body copy uses the system sans.

## Maintenance

Open `/showcases/relay/`. VI/EN copy lives in `showcases/locales/relay.js`. Elements that scramble are marked `data-no-translate` and are rendered with `showcaseLanguage.translate()` in `app.js`.
