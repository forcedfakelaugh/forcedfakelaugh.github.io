# Coollab showcase

An independent creative studio concept based on Lucas's supplied design exploration. The studio description and projects are demonstration content, not claims of commissioned client work. Contact links lead to the portfolio owner's existing contact section.

## Design references

- Primary: `/Users/lucasnguyen/Desktop/coollab-gen/01-editorial.png`: the orange wordmark, oversized Vietnamese headline, whitespace and large tactile publication photograph.
- Supporting: `02-index.png` and `03-co-lab.png` from the same supplied folder: project names, interior and ceramic art direction, and the collaboration theme.
- Original frontend implementation; no external website code or stock photographs.

## Generated imagery

Created on 31 October 2026 with the built-in OpenAI image generation tool, using `01-editorial.png` as the style reference. All three selected images are original generated variations. Uncompressed PNG masters remain in the generation directory; the project contains all selected images as local, optimised WebP files in 640, 960 and 1536 pixel widths. No remote image requests.

- `assets/editorial-{640,960,1536}.webp`: culture publication, architectural photographs, paper and stone samples.
- `assets/interior-{640,960,1536}.webp`: ivory chair, travertine table and sunlit architecture.
- `assets/ceramics-{640,960,1536}.webp`: three handmade ceramic forms on limestone plinths.
- `assets/preview.webp`: a screenshot of the implemented page, rather than the original design mockup.

PNG master directory: `/Users/lucasnguyen/.codex/generated_images/01a191b6-7e17-7b80-89c9-265688dec9d1/`.

### editorial prompt

Use case: product-mockup. Input image 1 is a visual style reference for a new photograph, not an image to reproduce as a webpage. Create one standalone, high-end editorial photograph for the Coollab design studio website. Match the reference's warm ivory, limestone, soft grey and restrained burnt orange, tactile natural materials, subtle film grain, directional daylight and quiet art direction. No website, no UI, no border, no collage of separate panels, no watermark. Landscape 3:2 composition. Primary request: the hero photograph of an architectural culture publication identity, photographed perfectly overhead as an exquisitely arranged flat lay. A large warm-white clothbound book on the left, a tall narrow publication and a horizontal postcard on the right, small limestone and ribbed paper samples at the far right, a single burnt-orange swatch, a rough stone partly entering at left, a slender dried branch near the bottom. The book and stationery have monochrome photographs of curving concrete architecture with delicate branch shadows, generous blank cream margins, tiny orange typographic details. Only minimal printed text: 'Văn hoá', 'Con người', 'Không gian' set very small near the top left of the large book. Real deckled paper fibres, subtle debossing, natural shadows. Fill the image with this physical arrangement on pale warm grey plaster, closely matching the photograph in the reference, with no header or captions.

### interior prompt

Use case: product-mockup. Input image 1 is a visual style reference for a new photograph, not an image to reproduce as a webpage. Create one standalone, high-end editorial photograph for the Coollab design studio website. Match the reference's warm ivory, limestone, soft grey and restrained burnt orange, tactile natural materials, subtle film grain, directional daylight and quiet art direction. No website, no UI, no border, no collage of separate panels, no watermark. Landscape 3:2 composition. Primary request: a refined architectural interior photograph for a project called Không gian sống. A sculptural ivory boucle lounge chair beside a low cylindrical travertine table holding a single branch in a dark small ceramic vase. Warm limestone floor, curved plaster alcove, generous vertical glazing on the right, an olive tree visible just outside, soft afternoon sun casting leaf shadows. Wide environmental composition with chair slightly right of centre and confident architectural negative space on the left. Quiet contemporary Vietnamese gallery-home atmosphere, premium real photography, meticulous material realism. Absolutely no text or logos.

### ceramics prompt

Use case: product-mockup. Input image 1 is a visual style reference for a new photograph, not an image to reproduce as a webpage. Create one standalone, high-end editorial photograph for the Coollab design studio website. Match the reference's warm ivory, limestone, soft grey and restrained burnt orange, tactile natural materials, subtle film grain, directional daylight and quiet art direction. No website, no UI, no border, no collage of separate panels, no watermark. Landscape 3:2 composition. Primary request: a gallery photograph for a contemporary craft studio project called Xưởng thủ công. Three distinctive hand-built unglazed ivory ceramic sculptures on three monolithic limestone plinths at staggered heights: an elegant asymmetrical narrow vessel, a wide irregular wabi-sabi bowl, and a folded abstract sculptural vase. Objects clearly separated, beautiful handmade rough surfaces, subtly warm cream and sand palette, a small burnt-orange paper swatch resting discreetly on the lowest plinth. Strong afternoon sunlight from the left with diagonal shadows across a textured plaster wall, sophisticated museum editorial photography. Compose as a cohesive single scene, objects centred with breathing room, no text or logos.

## Fonts

Be Vietnam Pro, locally hosted from the existing portfolio's licensed font assets, weights 400, 500, 700 and 800 with Latin, Latin Extended and Vietnamese subsets. SIL Open Font License retained in `assets/FONT-LICENSE.txt`.

## Behaviour

- Three project stories in a native modal dialog with previous/next controls, left/right arrow keys, Escape to close, and native focus restoration.
- Responsive menu and native service disclosures.
- Shared Vietnamese/English preference and local font files. Vietnamese is the default when no language preference exists.
- Reduced-motion media query removes smooth scrolling and transitions.
- Unlisted homepage card and an entry in `/hidden/`; the page is marked `noindex, nofollow`.
