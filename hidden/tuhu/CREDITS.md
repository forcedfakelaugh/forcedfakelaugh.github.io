# Tuhú Ceramics proposal

Independent, uncommissioned interface and campaign concept prepared for private outreach. This is not an official Tuhú storefront. No affiliation, endorsement, product availability or order fulfillment is implied. Product selection is stored locally in the browser and never sent to Tuhú.

Brand names, product designs and all photography belong to Tuhú Ceramics / Công ty TNHH Tuhu or their respective rights holders. Official imagery is reproduced only to illustrate this proposal to the brand. No stock or generated imagery was used. Assets were resized and converted to WebP, without recoloring products. Permission should be obtained from the rights holders before any broader commercial reuse.

Sources inspected and downloaded on 1 November 2026.

## Photography

| Local files | Official source page | Exact image source |
| --- | --- | --- |
| `assets/hero-800.webp`, `assets/hero-1600.webp`, `assets/preview.webp` | https://tuhuceramics.com/ | https://tuhuceramics.com/wp-content/uploads/2020/04/IMG_3868.jpg |
| `assets/editorial-480.webp`, `assets/editorial-900.webp` | https://tuhuceramics.com/ | https://tuhuceramics.com/wp-content/uploads/2020/01/Photoshoot-Tuhu-2017-1970-copy-1-1024x1024.jpg |
| `assets/hoai-yellow-480.webp`, `assets/hoai-yellow-900.webp` | https://tuhuceramics.online/products/chen-com-classic-hoa-tiet-hoai-yellow | https://product.hstatic.net/200000453839/product/sb22.tuhuceramics__6__3d5d1e845f30491b90feb2dde1349218_master.png |
| `assets/hoai-red-480.webp`, `assets/hoai-red-900.webp` | https://tuhuceramics.online/products/chen-com-classic-hoa-tiet-hoai-yellow | https://product.hstatic.net/200000453839/product/sb22.tuhuceramics__8__f3e90c68e081484aa1bcdaf398a8d520_master.png |
| `assets/hoai-brown-480.webp`, `assets/hoai-brown-900.webp` | https://tuhuceramics.online/products/chen-com-classic-hoa-tiet-hoai-yellow | https://product.hstatic.net/200000453839/product/sb22.tuhuceramics__9__3e7c1e6906304607a937d81ab27537ff_master.png |
| `assets/hoai-pink-480.webp`, `assets/hoai-pink-900.webp` | https://tuhuceramics.online/products/chen-com-classic-hoa-tiet-hoai-yellow | https://product.hstatic.net/200000453839/product/sb22.tuhuceramics__10__c151774adfea409a813c8fe934733ec3_master.png |
| `assets/hoai-coban-480.webp`, `assets/hoai-coban-900.webp` | https://tuhuceramics.online/products/chen-com-classic-hoa-tiet-hoai-yellow | https://product.hstatic.net/200000453839/product/sb22.tuhuceramics__7__5e11aa5d506049a59e9dbd1c9feae913_master.png |

Seven distinct source photographs, visually inspected before integration. Hero/editorial imagery shows a separate blue-patterned Tuhú dinnerware range; it is not presented as a Hoài color variant. All five Hoài colors use the exact images mapped to variants in the official product HTML. `preview.webp` is a crop of the official hero photograph. Mobile hero uses an intentional CSS crop of the same photograph. Product images retain their original photographed backgrounds.

## Factual information

- Brand story and relationship to Sông Bé ceramics: https://tuhuceramics.com/
- Hoài name, five colors, ceramic material, 12 cm diameter, 6 cm height, Vietnamese origin and care instructions: https://tuhuceramics.online/products/chen-com-classic-hoa-tiet-hoai-yellow
- The `/products/chen-bat-an-com-gia-dinh-hoai` slug currently resolves to the differently named Sơn ta product. It is intentionally not used for the Hoài selection.
- No prices, discounts, availability claims, shipping promises or customer testimonials are included in this proposal.
- Proposed Vietnamese campaign copy is original to this independent demo, not quoted official brand messaging.

## Implementation

Buildless HTML, CSS and JavaScript. No third-party runtime, analytics, remote fonts, forms or checkout. All displayed image files are local. Links to the brand's official shop open separately and do not transfer selections. The page uses `noindex,nofollow`; an unlisted route does not provide access control.


## Design references inspected for the second direction

Reference websites were opened and their actual imagery inspected on 1 November 2026. These are design references only. No photographs, brand assets, copy or code from these brands are included in the Tuhú demo.

- https://eastfork.com/ : the homepage puts pottery in use on a table and makes its colour palette a primary shopping path. Applied here: choosing and combining real Hoài colours is the main experience, supported by a compact photographic masthead. The tabletop context informed the restrained blue grid cloth.
- East Fork image inspected: https://eastfork.com/cdn/shop/files/26_Q3_FW_Resale_WEB-505672.jpg?v=1787086066&width=1000 . The arrangement combines cobalt glassware, warm ceramics and a geometric blue tablecloth, with objects arranged as a meal setting. Applied principle: coordinated setting rather than isolated marketing cards. This reference image is not shipped with the demo.
- https://1616arita.jp/en/ : the homepage presents vessels as distinct forms with clear surrounding space and carefully grouped colour families. Applied here: large circular object positions, original product photography and compact controls, keeping the object itself in view during colour selection.
- 1616 / arita japan image inspected: https://1616arita.jp/wp-content/uploads/2019/01/MilkCan-SugarCan-set_Yellow-LightPink.jpg . Paired yellow and pink vessels are composed on a simple tray against white. Applied principle: the objects and their proportions lead the composition. This reference image is not shipped with the demo.

The revised proposal is a table arranger, not a conventional product landing page. A new visitor starts with an explicitly labelled four-colour suggestion. Visitors can add bowls, select and remove an individual bowl, change the arrangement, or clear the table. A maximum of eight individual bowls is visualized at once; the visible note and summary disclose the full quantity when the selection is larger. All selection data remains on the browser, using the same local key as the initial demo. Circular crops retain the actual source backgrounds and do not recolour products.

## Typeface

Be Vietnam Pro by the Be Vietnam Pro authors, distributed under the SIL Open Font License 1.1. Local copies avoid font requests at runtime. License included at `assets/FONT-LICENSE.txt`.

- Typeface project: https://github.com/google/fonts/tree/main/ofl/bevietnampro
- Regular local file `assets/be-vietnam-pro-regular.ttf`: https://fonts.gstatic.com/s/bevietnampro/v12/QdVPSTAyLFyeg_IDWvOJmVES_Eww.ttf
- Bold local file `assets/be-vietnam-pro-bold.ttf`: https://fonts.gstatic.com/s/bevietnampro/v12/QdVMSTAyLFyeg_IDWvOJmVES_HSMIF8y.ttf
- License source: https://raw.githubusercontent.com/google/fonts/main/ofl/bevietnampro/OFL.txt

The locally bundled Be Vietnam Pro TTF sources were also encoded as WOFF2 for the buildless preview server and static delivery. Regular and bold faces include Vietnamese glyphs. The fallback is Arial.

## Share preview

`assets/share-preview.webp` is a browser screenshot of this independent proposal, resized to 1200 pixels wide and encoded as WebP. Its brand photographs and logos are the official assets credited above.

## Impeccable refinement, 1 November 2026

Refined using the [Impeccable](https://github.com/pbakaus/impeccable) polish and craft guidance.

The polish preserves the cobalt palette and interactive table. Tablet layouts now place the controls above the table; smaller screens get a separate photo and headline composition. Color, quantity and add controls have more room. The object note flows naturally on mobile, and both dialogs retain a visible close action and restore focus to their opener.
