# SON — Contemporary Lacquer & Object Atelier (`/hidden/son/`)

Prepared 2 November 2026 as a self-initiated design and creative-engineering showcase by Lucas Nguyen. **SON** is a fictional contemporary Vietnamese lacquerware (*sơn mài*) furniture and object atelier set in Hạ Thái and Hà Nội. No commercial orders, payments, or external form submissions occur on this page; all custom sample plaques and shortlist selections exist only in the visitor's browser session.

## Art direction & interactive architecture

1. **Interactive Water-Sanding Studio (`#ban-mai`)**: Models the signature process of Vietnamese *sơn mài*, where crushed duck eggshell (*vỏ trứng*), 24K Kiêu Kỵ gold leaf (*vàng quỳ*), and nocturnal *sơn then* resin are buried beneath cinnabar vermilion (*sơn son*) and revealed by wet-sanding with stream whetstone and rainwater. Visitors can drag/polish directly across the high-DPI canvas or step through the five strata (`01`–`05`) with keyboard/pointer controls and adjustable grazing light.
2. **Asymmetric Museum Archive (`#hien-vat`)**: Four inaugural works (`S.01`–`S.04`) arranged in an asymmetric 12-column exhibition grid with category filtering (`Tất cả`, `Nội thất`, `Vật dụng`, `Bình phong`), an Exhibition/Index view switch (`Trưng bày / Mục lục`), and accessible `<dialog>` object dossiers.
3. **Warm *Giấy Dó* Curing Room Ledger (`#ghi-chep`)**: A high-contrast warm paper interlude explaining the polymerization of *Rhus succedanea* sap (*sơn ta*) in 80–85% monsoon humidity and darkness across 90 days.
4. **Bespoke Sample Plaque Composer (`#bang-mau`)**: Allows architects and collectors to configure an 18 × 12 cm sample board (choosing base ground, buried inlay, palm-polished mirror vs. water-stone matte honing, and sanding reveal depth), save it to their session shortlist, or export a 1200 × 1500 PNG specification sheet.

## Original studio imagery

All four object photographs were generated specifically for this showcase on 2 November 2026 and encoded into responsive WebP derivatives (`480w`, `960w`, `1440w`) in `assets/`:

| Local WebP files in `assets/` | Object code & title | Generation brief |
| --- | --- | --- |
| `table-480.webp`, `table-960.webp`, `table-1440.webp`, `preview.webp`, `share-preview.webp` | `S.01` — Bàn Trà Tĩnh Mặc (Tĩnh Mặc Low Table) | Monolithic low contemporary coffee table crafted in mirror-polished deep black Vietnamese lacquer (*sơn then*) with a hand-inlaid band of cracked ivory eggshell (*vỏ trứng*) and warm gold leaf along one chamfered edge, in a sunlit plaster and concrete room in Hanoi. |
| `vessel-480.webp`, `vessel-960.webp`, `vessel-1440.webp` | `S.02` — Bình Âm Chu Sa (Chu Sa Acoustic Vessel) | Sculptural contemporary Vietnamese lacquer vessel in deep cinnabar vermilion (*sơn son*) hand-sanded with water to reveal dark umber and 24K gold-leaf strata beneath the curved shoulder, resting on a charred-wood plinth. |
| `screen-480.webp`, `screen-960.webp`, `screen-1440.webp` | `S.03` — Bình Phong Sương Sớm (Sương Sớm Folding Screen) | Three-panel contemporary folding architectural screen finished in translucent burnt-amber lacquer (*cánh gián*) transitioning into a mist of crushed white eggshell and silver leaf near the base, on a travertine gallery floor. |
| `tray-480.webp`, `tray-960.webp`, `tray-1440.webp` | `S.04` — Khay Trà Khảm Ốc (Chuyên Mỹ Inlay Tea Tray) | Overhead three-quarter close-up of a cantilevered rectangular tea tray in stone-honed matte black Vietnamese lacquer with geometric mother-of-pearl (*khảm trai*) inlay lines beside a wrought brass tea scoop and linen cloth. |

## Typography & implementation

- **Fonts**: Local `Be Vietnam Pro` (`400`, `500`, `600`, `700`, `800`, `900`) subsets in `assets/` under the SIL Open Font License (`assets/FONT-LICENSE.txt`), paired with system `Georgia` and `Courier New`. Zero external font or script requests.
- **Bilingual VI / EN**: Full Vietnamese and English copy switchable live from the top bar and synced with `localStorage` (`lucas-portfolio-language`).
- **Accessibility & resilience**: Native `<dialog>` focus management, keyboard tablist navigation (`ArrowUp`/`ArrowDown`/`ArrowLeft`/`ArrowRight`/`Home`/`End`), SVG still fallback (`assets/still-plaque.svg`), and `prefers-reduced-motion` support.
