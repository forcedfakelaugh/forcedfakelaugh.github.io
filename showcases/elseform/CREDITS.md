# ELSEFORM AGENCY showcase

An original fictional Saigon branding agency concept. The names, projects, copy and visuals are demonstration content, not client work or a real agency.

Art direction reference: https://bratus.co/ (viewed 26 October 2026). The outlined/solid oversized headline, services column, restrained navigation and image-led project grid informed this interpretation. No Bratus source code, client images, logo or copy is used.

## Images

Created using the built-in OpenAI image generation tool on 26 October 2026. Original PNGs retained in the generation directory; optimised local WebP files are used by the site.

- `assets/la-tea.webp`: original LÁ sparkling tea packaging concept.
- `assets/mua-coffee.webp`: original MÙA coffee packaging concept.
- `assets/vom.svg`: original code-authored identity artwork for VÒM.
- `assets/song.svg`: original flat SÓNG typography poster. `song-art.js` adds gentle CSS motion to the same identity; no WebGL or external graphics library is used.

### LÁ generation prompt

Use case: product-mockup. Create a photorealistic art-directed packaging campaign photograph, landscape 3:2 aspect ratio, for a fictional contemporary Vietnamese sparkling tea brand called LÁ. For a premium experimental branding agency website project. Scene: entire seamless background and floor are vivid cobalt blue #293ae2. Three tall slim aluminum beverage cans in electric acid yellow-green with elegant oversized dark navy typographic word 'LÁ', a delicate single leaf graphic and very tiny tasteful product details. One standing can foreground slightly right of center, a second laid diagonally behind to left, third farther right with condensation. Realistic metallic edges, crisp condensation beads and dramatic hard afternoon studio shadows cast across cobalt surface. The arrangement fills the frame boldly yet ample 20% negative space at left. One very small fresh green tea leaf near bottom right. Refined graphic-design portfolio, sculptural composition, exceptional product photography and believable perspective. Only main readable label word LÁ, no watermarks, no surrounding UI, no text outside cans, no real brands.

### MÙA generation prompt

Use case: product-mockup. Create a photorealistic premium branding agency portfolio photograph in landscape 3:2 for a fictional Vietnamese specialty coffee brand MÙA. A refined tactile editorial still life: two upright boxy coffee bags with squared folded tops, warm cream packaging with giant bold dark red word 'MÙA' and a minimal sun-and-field geometric illustration in vermilion and rust. A burgundy espresso cup placed beside them. Rust red painted background and terracotta tabletop, hard warm side lighting, subtle real paper grain, deep sharp shadows. One bag foreground left of center, second behind to right, balanced generous breathing space. Rich warm analog tones, crisp typography, photographed with a medium format camera, artistic contemporary Vietnamese brand identity case study. Only large readable word MÙA, small secondary label 'CÀ PHÊ', no watermarks, no UI, no extra logos or real brands.

## Typeface

Be Vietnam Pro, distributed by Google Fonts under the SIL Open Font License. Font subsets are hosted locally; license in `assets/FONT-LICENSE.txt`.

## Interaction

Four local project studies, category filtering, browser-history-aware project links, keyboard-accessible modal dialogs, a menu, service disclosures, and optional headline/motion animation. Vietnamese is the default through the portfolio's shared language bootstrap. Contact links lead to the portfolio owner’s existing contact section.

## Headline motion

The type/backspace interaction follows the public Motion “Typewriter: Change Content” reference: https://motion.dev/examples/js-typewriter-change-content. The local implementation is independent; no Motion+ source or package is included. It handles Vietnamese grapheme clusters, full-text screen-reader labels, language changes and reduced-motion preferences.
