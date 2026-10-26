# CHÀM - source credits

Fictional indigo clothing label by Lucas Nguyen. "Chàm" is the Vietnamese word for indigo. Product names, prices and brand are invented for a portfolio demonstration. No real orders, payments, stock or manufacturing claims. Photography is illustrative: it does not show CHÀM products, a CHÀM workshop, or Vietnamese dyeing specifically.

Photographs downloaded from Unsplash on 2026-10-26, subject to the Unsplash license (https://unsplash.com/license):

- `assets/hero.jpg` - indigo cloths drying on a line, by Dimaz Fakhruddin - https://unsplash.com/photos/Pz8O67wagn0
- `assets/jacket.jpg` - denim work jacket on a hanger, by Logan Weaver (@LGNWVR) - https://unsplash.com/photos/7LF_C4xkogA
- `assets/set.jpg` - dark blue outfit with leaf embroidery, by IMANA - https://unsplash.com/photos/1yuBIFIxBYI
- `assets/scarf.jpg` - blue and white patterned fabric on a wooden frame, by mark wang - https://unsplash.com/photos/dncixQiSJuM
- `assets/cloth.jpg` - dark blue pleated fabric, by Tim Mossholder - https://unsplash.com/photos/91PGEPmwT60
- `assets/dye-vat.jpg` - worker dyeing fabric in a workshop, by C Cai - https://unsplash.com/photos/yMg8G-s7TfM

Fonts: Newsreader and Archivo served by Google Fonts, with local system fallbacks. The favicon is original SVG artwork.

## Scope

Dependency-free HTML, CSS and JavaScript. Dye-house layout: a scroll gauge counts dips from undyed to deepest indigo, an order-book product list with a hover/focus preview, and a dip slider that mixes the shade. Accessible native product dialogs, size selection, bag quantity edits/removal, calculated USD subtotal and explicitly simulated checkout. Bag state is held in memory and resets on refresh. No external APIs, backend, accounts or payment collection.

Validation: `node --check app.js`.
