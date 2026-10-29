# Lucas Nguyen - Freelance portfolio

A portfolio with interactive concept showcases. No package installation or backend services; some showcases include licensed, vendored rendering libraries.

## Local development

Requires Node.js 20 or later. No install step.

```sh
npm run dev
```

Open http://127.0.0.1:4174. Override with `PORT=4180 npm run dev` if needed.

```sh
npm run check
npm run build
```

`check` validates JavaScript syntax and local HTML asset/link targets; it is not an end-to-end browser test. `build` creates `dist/` for static hosting. Nothing is automatically published.

## Pages

- `/` - Main portfolio and selected work.
- `/showcases/selected-studies/` - Parallax, unlisted from the homepage and linked with a thumbnail from `/hidden/`, with `noindex`. An interactive portfolio with a scroll-driven perspective gallery, four original concept worlds, editorial About/Approach pages, layered Contact cards, scrolling project presentations and four live Canvas experiments. Includes shared VI/EN navigation and the faster gallery snap. Uses the original AI-generated Monsoon, Strata, Lacquer and Resonance images; see `showcases/selected-studies/CREDITS.md`.
- `/showcases/lento/` - Lento, unlisted from the homepage and linked from `/hidden/`, with `noindex`. An interactive lighting concept with a detailed Poly Haven desk lamp (2.87 MB), a compact desktop with a notebook and PBR surface textures, scroll-driven close-up views, finish/brightness/angle controls and warm evening lighting. VI/EN, reduced motion and a still fallback. Oryzo-inspired storytelling; no reference-site assets. See `showcases/lento/CREDITS.md`.
- `/hidden/` - Unlisted index of hidden showcases (client proposals and drafts), not linked from the homepage and marked `noindex`. Add new hidden showcases here.
- `/showcases/lumierreart-2/` - Lumiere Arts, listed on the homepage: a gallery redesign with an artwork wall, collection filters, wall previews, saved favourites and silk collections. Uses the gallery's existing artwork photography; see `showcases/lumierreart-2/CREDITS.md`.
- `/showcases/nature-island/` - Nature Island, an illustrated travel concept inspired by the Variations WordPress theme preview. Original SVG landscapes, three places to explore, three selectable day plans, and a downloadable itinerary in VI/EN. No reservations or external services. Sources and scope in `showcases/nature-island/CREDITS.md`.
- `/showcases/lumiere/` - Lumiere Arts, an unlisted redesign proposal for the real gallery at lumierearts.com: a scroll-driven hero that pulls back across a 6 m silk painting, four series with an artwork viewer and true-scale wall preview, a painting-to-scarf comparison slider with size pricing, art objects, artist section and a simulated inquiry list. Uses the client's own photography and catalogue data; see `showcases/lumiere/CREDITS.md`.
- `/showcases/mai-le/` - Mai Lê, a fictional Hội An painter: VI/EN throughout (Vietnamese by default, language preference saved locally), floating artwork entrance, asymmetric gallery of seven AI-generated paintings, including a seascape and a reference-based studio portrait, artwork detail dialogs with keyboard navigation, three wall colour previews, artist note and a simulated exhibition ticket. Inspired by the artist-portfolio film at https://vimeo.com/1226352297. Artwork provenance and generation prompts in `showcases/mai-le/CREDITS.md`.
- `/showcases/pulp-club/` - Original foodservice packaging concept inspired by Kanak Naturals' foodservice page. Browse and filter four forms, build a sample box, and preview a request without sending anything.
- `/showcases/serein/` - Solen Retreat, an editorial coastal retreat website, accommodation filters and simulated reservation preview.
- `/showcases/cham/` - Chàm indigo clothing storefront concept.
- `/showcases/orbit/` - Business analytics dashboard concept.
- `/showcases/nep/` - Nếp Architects, an architecture archive with minimal text-only project navigation, reference photography, original schematic drawings, and project notes. The former `/showcases/forma/` URL redirects here.
- `/showcases/hien/` - Hiên Studio, a fictional architecture practice reproducing part of an architecture-studio site Lucas built: splash, featured carousel, works grid in columns by project scale (tabs on mobile), discipline filters and project slideshows. English/Vietnamese follows the portfolio language setting, defaulting to Vietnamese. Pexels reference photography; sources in `showcases/hien/CREDITS.md`.
- `/showcases/pip/` - Pip, a helper for Cà phê Góc Nhỏ, Nhà Bên Vườn and Tiệm hoa Mây. A simple interface, thirteen fictional business notes and ten scripted questions about café finances, rental bookings, flower stock and deliveries. Answers link to their supporting notes; no model or backend calls.
- `/showcases/reu/` - Rêu, a Hội An restaurant and café concept: filterable menu (categories and dietary tags) with prices in ₫, opening hours with a live “open now” status computed in Asia/Ho_Chi_Minh time, and a simulated pickup basket whose “place order” only confirms that nothing was sent.
- `/showcases/halyard/` - Halyard, a SaaS landing page for a fictional changelog product: feature sections, monthly/yearly pricing toggle with computed savings across three tiers, a plan comparison table, FAQ accordion and a CTA that states it is a concept.
- `/showcases/moc/` - Mộc, a fictional herbal spa in Đà Lạt: lemongrass foot soaks, herbal compresses and oil massage, with a light botanical identity and a five-step appointment demo. Includes therapist compatibility, unavailable times, inline validation and a review; nothing is sent or booked. Original AI-created hero and illustrative Unsplash photos; provenance and prompt in `showcases/moc/CREDITS.md`. The former `/showcases/ember/` URL redirects here.

The concept demos use fictional brands, business data, rates, and transactions. There are no real reservations, purchases, payments, or business integrations. Portfolio case studies do not claim client results or measured commercial outcomes.

Solen Retreat lives in `showcases/serein/`. The duplicate standalone repository has been removed; this repository is the single source for all showcases.

## Asset notes

Solen Retreat includes locally downloaded illustrative Unsplash photos (villa `photo-1613490493576-7fde63acd811`, interior `photo-1600210492486-724fe5c67fb0`, ocean `photo-1518837695005-2083093ee35b`). See individual showcase documentation for additional asset credits. Fonts may load from Google Fonts with local fallbacks.

Pulp Club uses three original generated packaging still lifes, saved locally in `showcases/pulp-club/assets/`. Its footer credits the Kanak Naturals page as visual inspiration; it is a separate fictional brand and does not use Kanak's imagery.

## Scope

Designed for showcasing frontend craft: distinct art direction, responsive layouts, accessible controls, and focused interactions. No database, authentication, or production commerce system. The contact section reveals the business-card email and phone number on request, with buttons that copy each value to the clipboard and announce success or failure. Addresses are obfuscated in JavaScript and absent from the initial HTML; this deters basic text scrapers but does not prevent bots that execute JavaScript from retrieving them. No contact form or email service is used.

## Tidal

`showcases/tidal/` contains the Tidal ocean showcase as ordinary portfolio source files. Its entry point is `/showcases/tidal/`. The standalone Git metadata and hosting configuration have been removed. The renderer license is retained in `LICENSE-ocean.txt`.

Nếp Architects research references and photography sources are documented in `showcases/nep/CREDITS.md`.

Showcases share `showcases/portfolio-nav.css`: a fixed return link on the left, the project name centered, and one `VI / EN` button on the right, including on mobile. Vietnamese is the default; the homepage and showcases share the `lucas-portfolio-language` preference.

`showcases/portfolio-language.js` binds authored copy from `showcases/locales/` to text nodes and accessibility attributes, including content created by demo interactions. Catalog pairs are `[English, Vietnamese]`; `{name}` placeholders preserve dynamic values. Add matching copy when changing visitor-facing text. Mark user-supplied text with `data-no-translate`. Mai Lê, Hiên and Lumiere Arts keep their existing translation renderers and respond to the shared `showcase-language` event. Pip also translates its scripted answers and notes, with question routing in both languages. Language changes retain demo selections and form values.
