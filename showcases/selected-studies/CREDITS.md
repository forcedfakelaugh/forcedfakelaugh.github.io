# Reference and provenance

## Interaction reference

[Huy Phan's portfolio](https://huyml.co/), inspected October 29, 2026, and the two user-supplied screenshots informed the stationary editorial columns, scrolling perspective image stream and synchronized project counter. The implementation is original local HTML, CSS and JavaScript. The reference's source code, client project imagery, personal identity, awards and commercial fonts were not copied.

The live [About](https://huyml.co/about), [Playground](https://huyml.co/playground), Contact overlay, and [Serious Business project presentation](https://huyml.co/project/serious-business) were also inspected. Their large typography, visual archive, overlapping contact cards, fixed project notes and thumbnail navigator informed the corresponding local pages. Some third-party Playground embeds failed to load on the reference; the layout itself was visible and inspected.

Lucas's biography, capabilities and email were taken from the existing local `lucas-portfolio/index.html` and `app.js`, not invented. The About monogram, typographic posters, and four Canvas 2D experiments are original.

## Original collection images

The four original images were generated with the built-in image generator on October 28, 2026. They are fictional concept imagery, not photographs documenting real buildings, installations or commissioned work. Lacquer and Resonance remain in the gallery; the original Monsoon and Strata are retained as an archive and replaced on screen by the Unsplash photographs below.

The images were converted to WebP at quality 88 without changing their composition. All four images and the complete prompt set (`assets/concept-prompts.json`) are included locally. No asset depends on the original development workspace. `assets/preview.webp` is a browser capture of this showcase's gallery.

- `monsoon.webp`: archived imagined rainy Saigon alley; no longer used in the gallery.
- `strata.webp`: archived conceptual limestone pavilion with suspended architectural layers; no longer used in the gallery.
- `lacquer.webp`: imagined crimson lacquer object with gold inlay.
- `resonance.webp`: imagined gallery installation of luminous rods.

Typography uses the device's Arial/Helvetica and Times fonts. The favicon is original. Optional navigation tones are generated with Web Audio; no sound files are used.

The portfolio return bar, SVG arrows, and Vietnamese/English controls use the shared components in `showcases/`. The Vietnamese catalog is `showcases/locales/selected-studies.js`.

## Selected photographs

The twelve-entry collection includes eight photographs. Five were selected from Unsplash on October 29, 2026 and saved locally as WebP images, at up to 2000 pixels wide and quality 85, without changing the source composition. Their source pages identify them as free under the [Unsplash License](https://unsplash.com/license). Gallery thumbnails crop responsively; the full-image view preserves each complete photograph.

| Study | Local asset | Photographer | Source and location |
| --- | --- | --- | --- |
| Monsoon | `assets/monsoon-rain.webp` | Hieu Do Quang | [Rhythm of the rain](https://unsplash.com/photos/a-wet-sidewalk-with-a-street-light-in-the-background-6fbBAd18FKY), Hanoi, Vietnam |
| Strata | `assets/strata-courtyard.webp` | I P | [Courtyard with a water feature](https://unsplash.com/photos/modern-building-exterior-with-a-tranquil-water-feature-9hj4WRa8QPc), Cam Ranh, Khánh Hòa, Vietnam |
| Canopy | `assets/canopy.webp` | Geio Tischler | [Aerial jungle](https://unsplash.com/photos/an-aerial-view-of-a-river-in-the-middle-of-a-forest-PwlwbdF0R3U), Ubud, Bali, Indonesia |
| After Hours | `assets/after-hours.webp` | Tobias Reich | [City canal at night](https://unsplash.com/photos/city-canal-at-night-with-bright-neon-signs-NHadNj6UIkk), Dōtonbori, Osaka, Japan |
| Colonnade | `assets/colonnade.webp` | Jason Leung | [Hallways with columns](https://unsplash.com/photos/brown-concrete-hallways-with-columns-r93UZeT3AQE), Stanford University, United States |

Three photographs reuse the locally stored Pexels images from [HIÊN](../hien/CREDITS.md), whose source table records the original photo links, photographers and locations. All eight are photographic references, not commissioned work or architecture by Lucas Nguyen.

| Study | Shared local asset | Photographer |
| --- | --- | --- |
| Still Water | `../hien/assets/clay-pavilion.jpg` | Dương Nhân |
| Ochre | `../hien/assets/white-gallery.jpg` | Phát Trương |
| Threshold | `../hien/assets/tree-house-interior.jpg` | Kien Tran |

## Shared concept artwork

- **Mai Lê** uses `../mai-le/assets/seascape.jpg`, titled *Where the light goes / Nơi ánh sáng đi qua*. It is an AI-generated painting illustration from the fictional artist portfolio, not a physical painting or a claim of real-world authorship. The original prompt and reference provenance remain in [Mai Lê credits](../mai-le/CREDITS.md).
- **LÁ** uses `../elseform/assets/la-tea.webp`, the original lime-green sparkling tea packaging on cobalt blue. It is AI-generated imagery of a fictional brand from the Elseform agency concept, not commissioned client work. See [Elseform credits](../elseform/CREDITS.md).

Both originals remain in their existing showcase directories, with their provenance shown in the study presentations.

## Responsive image derivatives

`assets/responsive/{study-slug}-{480,960}.webp` contains two smaller versions of each of the twelve gallery images above. They preserve the original aspect ratio and composition, with no additional crop. Generated locally with `cwebp -q 80 -m 6 -resize WIDTH 0 SOURCE -o OUTPUT`; the original files are unchanged and remain available in the full-image viewer. Credits and concept labels apply equally to these derivatives.
