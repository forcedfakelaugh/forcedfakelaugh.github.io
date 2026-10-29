# Portfolio thumbnail refresh — 2026-10-29

The portfolio cards use these local WebP images. Lento is listed on the homepage; Orbit and Halyard remain in the hidden gallery.

| Project | File | Dimensions | Source |
| --- | --- | --- | --- |
| Lento | `showcases/lento/assets/preview-studio.webp` | 1586 × 992 | Built-in image generation edit of `showcases/lento/assets/preview.png`; WebP quality 85. |
| Orbit | `showcases/orbit/assets/preview.webp` | 1440 × 900 | Chrome capture of the local English dashboard, after fonts and localization loaded; WebP quality 88. |
| Halyard | `showcases/halyard/assets/preview.webp` | 1280 × 800 | Chrome capture of the local English landing page, after fonts and localization loaded; WebP quality 88. |

Orbit and Halyard show the actual interfaces. For these still captures only, the shared portfolio navigation and its body padding were hidden, and the product header/sidebar was positioned at the top. Orbit's below-the-fold transactions and footer were also hidden to give the complete charts a clean lower margin. These capture styles were injected into the browser and are not changes to the showcases.

Lento is illustrative AI-enhanced cover artwork. The source render, GLB assets and interactive scene were not replaced. The full-resolution generated PNG remains in the image tool's generated-images folder; the site serves the compressed WebP.

## Lento generation prompt

Mode: built-in `image_gen`, edit; opaque background.

Input: `showcases/lento/assets/preview.png`.

```text
Use case: lighting-weather. Asset type: polished portfolio project thumbnail, landscape 16:10, high resolution. Edit target: supplied Lento lamp render. Improve this into a beautiful editorial product image while retaining the same recognizable orange articulated architect lamp with two long jointed arms, exposed silver springs, flared metal shade, clamp attached to the right edge of the beige stone desktop, and the single brown notebook on the left. Keep the original lamp design, pose, orange paint, stone and notebook identities. Refine framing and perspective so the composition feels intentional and the lamp fills the frame with comfortable margins, complete shade and arm visible. Warm off-white studio backdrop with subtle light falloff, soft directional daylight from upper left, richer burnt-orange enamel, carefully controlled realistic specular highlights, detailed brushed metal springs, tactile pale stone and leather. Add grounded contact shadows, greater depth and a subtle warm light pool on the desktop. The tabletop may extend to the lower edge for a more natural product-photography composition. Elegant restrained art direction, warm neutral palette, crisp refined realism, sophisticated light and shadow. No extra objects, no text, no UI, no logos, no border, no watermark. Output only the product photograph.
```
