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

Scroll moves from the full scene to a closer view of the lamp mechanism, with a smooth half-turn that leaves the lamp facing right at the configurator. The opening and final positions stay fixed. The clamp fits the thickness and edge of the desktop; the desk and lamp turn together as one mounted assembly. The final scene lets visitors change the finish, brightness and viewing angle in a softly lit evening scene. Its scroll movement finishes at the configurator, and the scene scrolls away with that section before the closing copy and footer. The hero has a power switch. Copy, controls, metadata and dynamic labels support the portfolio's VI/EN preference.

The loaded 3D scene renders in front of page elements, including the header and its divider, while pointer events pass through to the links and controls beneath it. Reduced motion switches directly between the opening and final angles, disabling the scroll rotation, idle movement and smoothing; the pause control stops ambient motion while retaining explicit controls and scroll states. Mobile scenes are anchored below their corresponding text. Rendering resolution is capped, hidden tabs skip rendering, and a local SVG remains available when WebGL cannot start. If WebGL fails, visual controls are disabled rather than pretending to update the still illustration.

Mobile rendering caps pixel ratio at 1.25, anisotropy at 2, and shadow maps at 512px while retaining antialiasing. Its canvas uses the large viewport height to avoid buffer reallocations as browser toolbars move. Mobile and paused scenes render on input, scroll, resize or asset completion, then stop as soon as transitions settle. The render loop also sleeps while the scene is outside the viewport and resumes when it returns.
