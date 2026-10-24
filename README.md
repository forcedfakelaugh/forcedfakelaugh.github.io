# Lucas Nguyen - Freelance portfolio

A portfolio with eleven interactive concept showcases. No dependencies or backend services.

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
- `/showcases/pulp-club/` - Original foodservice packaging concept inspired by Kanak Naturals' foodservice page. Browse and filter four forms, build a sample box, and preview a request without sending anything.
- `/showcases/serein/` - Editorial luxury hospitality site, accommodation filters and simulated reservation preview.
- `/showcases/atelier/` - Fashion storefront concept.
- `/showcases/orbit/` - Business analytics dashboard concept.
- `/showcases/forma/` - Architecture archive with minimal text-only project navigation, reference photography, original schematic drawings, and project notes.
- `/showcases/hien/` - Hiên Studio, a fictional architecture practice reproducing part of an architecture-studio site Lucas built: splash, featured carousel, works grid in columns by project scale (tabs on mobile), discipline filters, project slideshows and an English/Vietnamese switch. Unsplash stand-in photography; sources in `showcases/hien/CREDITS.md`.
- `/showcases/lumen/` - AI research assistant concept: scripted agent trace (search, read, verify), streamed answers with inline citations, source panel and document previews over a fictional café workspace. No model or network calls.
- `/showcases/reu/` - Rêu, a Hội An restaurant and café concept: filterable menu (categories and dietary tags) with prices in ₫, opening hours with a live “open now” status computed in Asia/Ho_Chi_Minh time, and a simulated pickup basket whose “place order” only confirms that nothing was sent.
- `/showcases/halyard/` - Halyard, a SaaS landing page for a fictional changelog product: feature sections, monthly/yearly pricing toggle with computed savings across three tiers, a plan comparison table, FAQ accordion and a CTA that states it is a concept.
- `/showcases/ember/` - Ember, a booking flow for a fictional Đà Lạt bathhouse: ritual → therapist → date and time (unavailable slots disabled) → details with inline validation → review, ending in a summary that states no booking was made. Unsplash stand-in photography; sources in `showcases/ember/CREDITS.md`.

The concept demos use fictional brands, business data, rates, and transactions. There are no real reservations, purchases, payments, or business integrations. Portfolio case studies do not claim client results or measured commercial outcomes.

Serein lives in `showcases/serein/`. The duplicate standalone repository has been removed; this repository is the single source for all showcases.

## Asset notes

Serein includes locally downloaded illustrative Unsplash photos (villa `photo-1613490493576-7fde63acd811`, interior `photo-1600210492486-724fe5c67fb0`, ocean `photo-1518837695005-2083093ee35b`). See individual showcase documentation for additional asset credits. Fonts may load from Google Fonts with local fallbacks.

Pulp Club uses three original generated packaging still lifes, saved locally in `showcases/pulp-club/assets/`. Its footer credits the Kanak Naturals page as visual inspiration; it is a separate fictional brand and does not use Kanak's imagery.

## Scope

Designed for showcasing frontend craft: distinct art direction, responsive layouts, accessible controls, and focused interactions. No database, authentication, or production commerce system. Contact details must be supplied by Lucas before adding a real contact destination.

## Tidal

`showcases/tidal/` contains the Tidal ocean showcase as ordinary portfolio source files. Its entry point is `/showcases/tidal/`. The standalone Git metadata and hosting configuration have been removed. The renderer license is retained in `LICENSE-ocean.txt`.

FORMA research references and photography sources are documented in `showcases/forma/CREDITS.md`.

All showcases share `showcases/portfolio-nav.css` and a fixed “Back to portfolio” bar linking to the selected-work section, including at mobile sizes.
