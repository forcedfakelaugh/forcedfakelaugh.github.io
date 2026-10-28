# Lento

An interactive lighting website concept by Lucas Nguyen. Lento is a portfolio presentation, not a store or a claim to have designed the featured third-party lamp model.

- Art direction, copy, desktop geometry, studio lighting, interactive material setup, fallback illustration and scroll choreography were created for this showcase.
- Oryzo by Lusion (https://oryzo.ai/) informed the idea of a continuous, product-centred scroll story. No Oryzo code, models, textures, artwork or branding are used.
- Three.js 0.170.0 and its GLTFLoader/BufferGeometryUtils modules are vendored locally from the published npm package. Import paths are adjusted for local modules. MIT license retained in `vendor/LICENSE-three.txt`. The scene has no runtime model, texture or library requests to third-party hosts.
- DM Sans is loaded from Google Fonts under the SIL Open Font License.
- This uses real-time mesh rendering, not Gaussian splatting. The beveled desktop is generated in `app.js`; the lamp and notebook are imported glTF models.

## Detailed assets

The following Poly Haven assets are released under [CC0](https://polyhaven.com/license). Original artists are credited here even though attribution is optional. Downloaded 2026-10-27; each model's original file checksums were verified against the Poly Haven API metadata.

| Local asset | Source / artist | Adaptation |
| --- | --- | --- |
| `assets/desk-lamp.glb` | [Desk Lamp Arm 01](https://polyhaven.com/a/desk_lamp_arm_01), Kuutti Siitonen (modeling/texturing), Yann Kervran (original Blender rig) | 26K-triangle glTF with 1K PBR textures, packed as a 2,874,380-byte GLB. Shared images deduplicated. The web model uses the static pose; a shader recolors orange paint while retaining steel, scratches and labels. |
| `assets/notebook.glb` | [Binder Notebook](https://polyhaven.com/a/binder_notebook), DaDrood | Closed variant selected; glTF and 1K PBR textures packed into one GLB; scene scale and placement adjusted. |
| `assets/stone-*.jpg` | [Marble 01](https://polyhaven.com/a/marble_01), Rob Tuytel | 2K color, normal and roughness maps; UVs select a slab area without grout. |

The original assets and surface maps total approximately 6.7 MB. Models load asynchronously with simple local geometry as a fallback; their textures are embedded, with no external fetches. The lamp is revealed only after its first frame has been rendered in the current scroll pose. The fallback SVG appears only if 3D fails or JavaScript is disabled, so it cannot flash a different pose during loading. It is a stylized articulated-lamp illustration, not an image provided by the asset authors. The listing thumbnail, `assets/preview.png`, is a centered 1280 × 800 render of the actual 3D scene on a warm background.

Mobile and coarse-pointer devices load derived `desk-lamp-mobile.glb` and `notebook-mobile.glb` models: 9,402 and 3,837 triangles, with 512px textures, totaling 794,712 bytes instead of 4,762,524 bytes. These were generated from the original local models using glTF Transform 4.5.1: `weld`, then `simplify` (lamp ratio 0.35/error 0.001; notebook ratio 0.15/error 0.002), then `resize` to a maximum of 512 × 512. Material names, paint recoloring, model transforms and the clamp placement are retained. Desktop uses the original models.

## Interaction and fallback

The same canvas stays pinned through four scroll chapters on desktop and mobile. The opening uses an oversized Lento wordmark, a softly gridded studio backdrop and the complete mounted lamp. As visitors scroll, the opening copy clears, the background darkens, the desktop and notebook fade, and the camera framing moves toward the reflector. The next headline enters after the opening has cleared. The view then pulls back into the detail study and rotates the mounted assembly into the finish, brightness and angle configurator. The complete stage leaves with the end of the story before the closing copy and footer.

Native page scrolling drives the choreography directly; there is no wheel interception or scroll hijacking. Each chapter has an anchor, with separate portrait and landscape framing. Mobile uses a stable small-viewport height so browser-toolbar movement does not change its scroll landmarks. Hidden chapter panels are inert and excluded from the accessibility tree. Copy, controls, metadata and dynamic labels support the portfolio's VI/EN preference.

Reduced motion switches directly between chapter compositions without zoom, rotation or text travel. Without JavaScript or WebGL, all chapters return to normal document flow with local still illustrations. A WebGL failure disables visual controls; a no-JavaScript preview hides them. Original anchor navigation remains available in either fallback.

Mobile and coarse-pointer rendering caps pixel ratio at 1.25, anisotropy at 2, and shadow maps at 512px while retaining antialiasing and the smaller local models. One WebGL canvas renders on scroll, input, resize or asset completion on mobile, then stops as soon as material transitions settle. Desktop pixel ratio is capped at 1.8. Hidden tabs and scenes outside the viewport do not render.
