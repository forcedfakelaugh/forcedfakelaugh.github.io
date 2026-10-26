import { execFileSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { basename, extname } from 'node:path';
const sources = [
  'showcases/mai-le/assets/window.jpg',
  'showcases/hien/assets/tree-house.jpg',
  'showcases/cham/assets/hero-daylight.jpg',
  'showcases/elseform/assets/la-tea.webp',
  'showcases/reu/assets/hoi-an-street.jpg',
  'showcases/nep/assets/taa-balconies.jpg',
  'showcases/serein/assets/villa.jpg',
  'showcases/moc/assets/herbal-spa.jpg',
  'showcases/pulp-club/assets/packaging-hero.jpg',
  'showcases/tidal/ocean-still.jpg',
];
mkdirSync('assets/thumbs', { recursive: true });
for (const source of sources) {
  const name = basename(source, extname(source));
  for (const width of [640, 1280]) execFileSync('cwebp', ['-quiet', '-q', '78', '-resize', String(width), '0', source, '-o', `assets/thumbs/${name}-${width}.webp`]);
}
console.log(`Generated ${sources.length * 2} thumbnails in assets/thumbs/.`);
