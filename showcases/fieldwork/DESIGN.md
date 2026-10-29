# FIELDWORK / design plan

An interactive sculpture exhibit built with the [Design on the Flank](https://github.com/Chien1618/design-on-the-flank) workflow. The primary deliverable is one self-contained Framer Code Component, `Fieldwork.tsx`; a small local preview renders the same component for inspection.

## Direction

Warm ivory, near-black oversized typography, vermilion accents, and a polished chrome sculpture. An editorial composition gives the artwork room: typography on the left, artwork on the right, fine rules and three numbered study selectors underneath. Mobile stacks the composition rather than shrinking it. Content describes a fictional digital exhibit, without invented credentials or testimonials.

## Discussion with the design subagent

We compared a continuously deformed knot with shared, transformable hoops. We chose eleven broad, rounded metal ribbons: simpler resource ownership, smooth transitions, and stronger differences between forms. The subagent emphasized large negative spaces, dark bands in the reflected environment, a fixed camera during shape changes, visible pause/reset actions, and separate mobile composition. We rejected excessive glow, bouncing transitions, and visually similar shape variants.

## Experience

1. Orbit opens with nested tilted ribbons and a strong central void.
2. Helix opens into a stepped vertical spiral.
3. Bloom spreads into a radial rosette.
4. Each study selector morphs the existing objects in roughly 1.2 seconds. Drag or arrow keys rotate the sculpture. Pause and Reset view are always available.
5. A compact settings panel changes material finish and rotation speed. An About panel explains the study and interaction.

## Framer controls

| Label | Prop | Visible result |
| --- | --- | --- |
| Studio | studioName | Header wordmark and footer |
| First word / Second word | firstWord / secondWord | Hero typography |
| Introduction | introduction | Editorial description |
| Background / Ink / Accent | background / ink / accent | Component palette |
| Initial study | initialStudy | Selected sculpture arrangement |
| Finish | finish | Chrome, copper, or ink material |
| Speed | speed | Rotation rate; zero stops rotation |
| Auto rotate | autoRotate | Initial playback state |
| Show settings | showSettings | Visitor access to finish/speed panel |

## Technical approach

React 18-compatible TSX; Framer property controls; Three.js 0.180.0 loaded from esm.sh inside an effect. The sculpture and reflected studio environment are generated in code; no model, HDR, photo, or font asset is required. Use one shared ribbon geometry, material, and a single render loop per instance. Clamp pixel ratio, resize from the container, pause offscreen, respect reduced motion, handle loading/context failures, and dispose all owned resources.

The preview uses a deliberately minimal Framer adapter. It can verify rendering and prop behavior, but cannot prove Framer Canvas/Preview compatibility.

## Acceptance

Inspect wide desktop and mobile renders; exercise all three silhouettes, drag/keyboard, pause/reset, settings, and About. Check live props, reduced motion, blocked network/WebGL, multiple instances, remounting, and no horizontal overflow. Run the available esbuild syntax check. Record only checks actually performed. Deliver locally; publication is outside this component task.
