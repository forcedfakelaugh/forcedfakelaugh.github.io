import { mount } from './vendor/hooks.js';
import { FaultyTerminal } from './vendor/terminal.js';
import { DotGrid } from './vendor/dotgrid.js';
import { GlitchText } from './vendor/glitch.js';
import { SpotlightCard } from './vendor/spotlight.js';
import { Magnet } from './vendor/magnet.js';
import { PixelCard } from './vendor/pixel.js';
import { createCarousel, EFFECTS } from './carousel.js';
import { createDecrypted, createClickSpark } from './text-and-spark.js';

// Same twelve images as Parallax. Accents are hand-picked from each image.
const responsive = '../selected-studies/assets/responsive/';
const parallax = '../selected-studies/';
const frames = [
  { slug: 'monsoon', name: 'Monsoon', category: 'Atmosphere & place', w: 2000, h: 1335, full: 'assets/monsoon-rain.webp', accent: '#ffb547', alt: 'Raindrops splash into a Hanoi street, catching amber and white light after dark.', note: 'Rain breaks the surface of a Hanoi street. Amber light gathers in the water.', credit: 'Photography by Hieu Do Quang / Unsplash.' },
  { slug: 'strata', name: 'Strata', category: 'Architecture & space', w: 2000, h: 1333, full: 'assets/strata-courtyard.webp', accent: '#9fd8c4', alt: 'A textured stone wall, glass doors and a slender tree reflected in a courtyard pool in Cam Ranh.', note: 'Layers of stone, glass and water in a quiet Cam Ranh courtyard.', credit: 'Photography by I P / Unsplash.' },
  { slug: 'lacquer', name: 'Lacquer', category: 'Material & craft', w: 1672, h: 941, full: 'assets/lacquer.webp', accent: '#ff5a4f', alt: 'A deep crimson lacquer box with a fine gold inlay and a partially raised lid against black.', note: 'Crimson, gold, and a little darkness. An intimate encounter with a crafted object.', credit: 'Original concept image, AI-generated.' },
  { slug: 'resonance', name: 'Resonance', category: 'Light & motion', w: 1672, h: 941, full: 'assets/resonance.webp', accent: '#e8f1ff', alt: 'Hundreds of slender white light rods form rolling waves in a dark reflective gallery.', note: 'One gesture, a thousand small movements. A room imagined as a wave of light.', credit: 'Original concept image, AI-generated.' },
  { slug: 'canopy', name: 'Canopy', category: 'Landscape & water', w: 2000, h: 1332, full: 'assets/canopy.webp', accent: '#7ee787', alt: 'A river threads through dense green jungle seen from above in Ubud, Bali.', note: 'A river disappears beneath the deep green canopy of Ubud, Bali.', credit: 'Photography by Geio Tischler / Unsplash.' },
  { slug: 'after-hours', name: 'After Hours', category: 'City & light', w: 2000, h: 1333, full: 'assets/after-hours.webp', accent: '#ff5fd2', alt: 'Illuminated signs and evening crowds line the Dōtonbori canal in Osaka.', note: 'Bright signs, evening crowds and a ribbon of water in Dōtonbori, Osaka.', credit: 'Photography by Tobias Reich / Unsplash.' },
  { slug: 'colonnade', name: 'Colonnade', category: 'Space & repetition', w: 2000, h: 1333, full: 'assets/colonnade.webp', accent: '#f0b98a', alt: 'Sunlit stone columns and repeating arches frame a walkway at Stanford University.', note: 'Warm stone, repeating arches and long shadows at Stanford University.', credit: 'Photography by Jason Leung / Unsplash.' },
  { slug: 'still-water', name: 'Still Water', category: 'Architecture & reflection', w: 1800, h: 1200, full: '../hien/assets/clay-pavilion.jpg', accent: '#7cc7ff', alt: 'Traditional lakeside architecture in Huế meets its reflection in the water.', note: 'Traditional lakeside architecture in Huế meets its reflection in the water.', credit: 'Photography by Dương Nhân / Pexels.' },
  { slug: 'ochre', name: 'Ochre', category: 'Colour & history', w: 1800, h: 1350, full: '../hien/assets/white-gallery.jpg', accent: '#ffd166', alt: 'The warm courtyard facade of the Ho Chi Minh City Museum of Fine Arts.', note: 'The warm courtyard facade of the Ho Chi Minh City Museum of Fine Arts.', credit: 'Photography by Phát Trương / Pexels.' },
  { slug: 'threshold', name: 'Threshold', category: 'Interior & daylight', w: 1800, h: 1270, full: '../hien/assets/tree-house-interior.jpg', accent: '#e6c79c', alt: 'Slatted timber and a reception opening filter the daylight in Đà Lạt.', note: 'Slatted timber and a reception opening filter the daylight in Đà Lạt.', credit: 'Photography by Kien Tran / Pexels.' },
  { slug: 'mai-le', name: 'Mai Lê', category: 'Painting & light', w: 1536, h: 1024, full: '../mai-le/assets/seascape.jpg', accent: '#5ee0d6', alt: 'A painterly seascape with blue waves, golden sunset light and a three-masted sailing ship.', note: 'Where the light goes. A seascape from the Mai Lê collection.', credit: 'From the Mai Lê concept. AI-generated artwork.' },
  { slug: 'la', name: 'LÁ', category: 'Identity & packaging', w: 1536, h: 1024, full: '../elseform/assets/la-tea.webp', accent: '#c6f135', alt: 'Three lime-green LÁ sparkling tea cans on a cobalt-blue background.', note: 'Lime green meets cobalt blue. Sparkling tea from the Elseform collection.', credit: 'From the Elseform concept. AI-generated packaging imagery.' }
];
const fullSrc = frame => (frame.full.startsWith('..') ? frame.full : parallax + frame.full);
const code = index => `RX-${String(index + 1).padStart(2, '0')}`;
const srcset = frame => `${responsive}${frame.slug}-480.webp 480w, ${responsive}${frame.slug}-960.webp 960w`;
const t = text => window.showcaseLanguage?.translate(text) ?? text;
const $ = selector => document.querySelector(selector);
const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
const touchOnly = window.matchMedia?.('(hover: none)').matches ?? false;
const narrow = window.innerWidth < 720;

const fx = { terminal: true, dotgrid: true, glitch: true, decrypt: true, spotlight: true, pixel: true, magnet: true, spark: true };

function lightTerminal() {
  const box = $('#terminal');
  const canvas = document.createElement('canvas');
  canvas.className = 'faulty-terminal-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  box.append(canvas);
  const { refs } = mount(FaultyTerminal, {
    tint: frames[0].accent, glyphs: 'characters', scale: 1.4, gridMul: [2, 1], digitSize: 1.3, timeScale: 0.35,
    scanlineIntensity: 0.45, glitchAmount: 1, flickerAmount: 1, noiseAmp: 1, curvature: 0.12, mouseStrength: 0.35,
    brightness: 0.75, glow: 0.55, persistence: 0.5, scramble: 0.7, mouseGlow: 0.8, vignette: 0.45, clickEffect: 'glitch',
    variation: 3, dpr: Math.min(window.devicePixelRatio || 1, narrow ? 1 : 1.25)
  }, r => {
    r.containerRef.current = box;
    r.canvasRef.current = canvas;
  });
  if (!refs.wakeRef.current) box.classList.add('is-offline');
  return refs;
}

function lightDotGrid() {
  const box = $('#dotgrid');
  const canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  box.append(canvas);
  const { refs } = mount(DotGrid, {
    dotSize: 2.5, gap: narrow ? 22 : 20, baseColor: '#262c33', activeColor: frames[0].accent, proximity: 170, strength: 1,
    shape: 'square', fade: 0.35, glow: 0.8, shockRadius: 420, shockStrength: 6, dpr: Math.min(window.devicePixelRatio || 1, 1.5)
  }, r => {
    r.canvasRef.current = canvas;
  });
  return refs;
}

function glitch(element, text, props) {
  element.classList.add('glitch', `glitch--${props.mode}`);
  element.style.setProperty('--glitch-color-a', '#00e5ff');
  element.style.setProperty('--glitch-color-b', '#ff2e88');
  element.setAttribute('aria-label', text);
  element.innerHTML = '<span class="glitch__text" aria-hidden="true"></span><span class="glitch__slice glitch__slice--a" aria-hidden="true"></span><span class="glitch__slice glitch__slice--b" aria-hidden="true"></span>';
  element.querySelectorAll('[aria-hidden]').forEach(span => { span.textContent = text; });
  return mount(GlitchText, { children: text, shadowColors: ['#00e5ff', '#ff2e88'], ...props }, r => {
    r.rootRef.current = element;
  }).refs;
}

function spotlight(element, props = {}) {
  element.classList.add('spotlight-card');
  element.style.setProperty('--spotlight-card-surface', '#0d1115');
  element.style.setProperty('--spotlight-card-border', 'rgba(255,255,255,.1)');
  element.style.setProperty('--spotlight-card-shadow', 'none');
  const layer = name => {
    const span = document.createElement('span');
    span.className = `spotlight-card__${name}`;
    span.setAttribute('aria-hidden', 'true');
    element.append(span);
    return span;
  };
  const light = layer('light');
  const grain = layer('grain');
  layer('border');
  const edge = layer('edge');
  return mount(SpotlightCard, { spotlightColor: frames[0].accent, intensity: 0.22, spotlightSize: 340, grain: 0.35, theme: 'dark', ...props }, r => {
    r.rootRef.current = element;
    r.lightRef.current = light;
    r.grainRef.current = grain;
    r.edgeRef.current = edge;
    grain.style.backgroundImage = r.NOISE;
  }).refs;
}

function magnet(element, props = {}) {
  const inner = document.createElement('span');
  inner.className = 'magnet-inner';
  element.replaceWith(inner);
  const wrapper = document.createElement('span');
  wrapper.className = 'magnet';
  inner.replaceWith(wrapper);
  wrapper.append(inner);
  inner.append(element);
  return mount(Magnet, { padding: 70, magnetStrength: 3, maxOffset: 16, tilt: 6, scale: 1.04, ...props }, r => {
    r.wrapperRef.current = wrapper;
    r.innerRef.current = inner;
  }).refs;
}

/* ---------------- Receiver: carousel and dossier ---------------- */
const renderSlide = index => {
  const frame = frames[index];
  const card = document.createElement('figure');
  card.className = 'frame-card';
  const image = document.createElement('img');
  image.src = `${responsive}${frame.slug}-960.webp`;
  image.srcset = srcset(frame);
  image.sizes = '(max-width: 900px) 92vw, 62vw';
  image.width = frame.w;
  image.height = frame.h;
  image.alt = frame.alt;
  image.draggable = false;
  image.decoding = 'async';
  if (index === 0) image.fetchPriority = 'high';
  card.append(image);
  card.insertAdjacentHTML('beforeend', `<span class="frame-sweep" aria-hidden="true"></span><span class="frame-bracket tl" aria-hidden="true"></span><span class="frame-bracket tr" aria-hidden="true"></span><span class="frame-bracket bl" aria-hidden="true"></span><span class="frame-bracket br" aria-hidden="true"></span><figcaption data-no-translate aria-hidden="true"><span>${code(index)}</span><span>${frame.w}×${frame.h}</span></figcaption>`);
  return card;
};

const carousel = createCarousel($('#carousel'), {
  count: frames.length,
  renderSlide,
  aspectRatio: narrow ? 1.25 : 16 / 10,
  onChange: index => tune(index),
  onActivate: index => inspect(index)
});

const dossier = {
  code: createDecrypted($('#d-code'), { speed: 30, maxIterations: 9, characters: '0123456789ABCDEF-/' }),
  name: createDecrypted($('#d-name'), { speed: 28, sequential: true, direction: 'center', characters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&/<>=+' }),
  category: createDecrypted($('#d-category'), { speed: 22, maxIterations: 8 })
};
const isEnabled = () => fx.decrypt;
Object.values(dossier).forEach(item => { item.enabled = isEnabled; });

// Bars double as a direct channel selector.
const bars = $('#bars');
frames.forEach((frame, index) => {
  const bar = document.createElement('button');
  bar.type = 'button';
  bar.className = 'bar';
  bar.dataset.index = index;
  bar.innerHTML = '<span class="bar-track"></span>';
  bar.addEventListener('click', () => carousel.goTo(index));
  bars.append(bar);
});

const archive = $('#archive');
const archiveTiles = frames.map((frame, index) => {
  const item = document.createElement('li');
  item.className = 'tile-item';
  item.innerHTML = `<button type="button" class="tile pixel-card"><canvas class="pixel-card-canvas" aria-hidden="true"></canvas><img src="${responsive}${frame.slug}-480.webp" alt="" width="480" height="${Math.round(480 * frame.h / frame.w)}" loading="lazy" decoding="async"><span class="tile-meta" data-no-translate><span>${code(index)}</span><strong>${frame.name}</strong></span></button>`;
  archive.append(item);
  const tile = item.querySelector('.tile');
  tile.style.setProperty('--tile-accent', frame.accent);
  tile.addEventListener('click', () => {
    carousel.goTo(index);
    $('#receiver').scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    $('#carousel').focus({ preventScroll: true });
  });
  return tile;
});

function renderDossier(index, animate) {
  const frame = frames[index];
  dossier.code.set(code(index), animate);
  dossier.name.set(frame.name, animate);
  dossier.category.set(t(frame.category), animate);
  $('#d-note').textContent = frame.note;
  $('#d-credit').textContent = frame.credit;
  $('#d-size').textContent = `${frame.w} × ${frame.h}`;
  $('#d-ratio').textContent = `${(frame.w / frame.h).toFixed(2)}:1`;
  $('#d-pixels').textContent = `${(frame.w * frame.h / 1e6).toFixed(1)} MP`;
  $('#counter').textContent = `${String(index + 1).padStart(2, '0')} / ${String(frames.length).padStart(2, '0')}`;
  $('#hud-frame').textContent = code(index);
  bars.querySelectorAll('.bar').forEach((bar, i) => {
    bar.classList.toggle('is-past', i < index);
    bar.classList.toggle('is-active', i === index);
    if (i === index) bar.setAttribute('aria-current', 'true');
    else bar.removeAttribute('aria-current');
    bar.setAttribute('aria-label', t('Tune to frame {number}').replace('{number}', i + 1).replace(/\{\w+\}/, i + 1));
  });
  archiveTiles.forEach((tile, i) => {
    tile.classList.toggle('is-current', i === index);
    tile.setAttribute('aria-label', `${code(i)} ${frames[i].name}`);
  });
}

function setAccent(accent) {
  document.documentElement.style.setProperty('--accent', accent);
  if (terminal) {
    terminal.settingsRef.current.tint = accent;
    terminal.wakeRef.current?.();
  }
  if (grid) {
    grid.settingsRef.current.activeColor = accent;
    grid.engineRef.current?.refresh();
  }
  for (const card of cards) {
    card.settingsRef.current.fill = card.settingsRef.current.fill.replaceAll(card.lastAccent, accent);
    card.settingsRef.current.edge = card.settingsRef.current.edge.replaceAll(card.lastAccent, accent);
    card.lastAccent = accent;
    card.wakeRef.current?.();
  }
  spark.color = accent;
}

function tune(index) {
  renderDossier(index, true);
  setAccent(frames[index].accent);
  const status = $('#carousel-status');
  status.textContent = `${code(index)} ${frames[index].name}`;
}

/* ---------------- Inspect ---------------- */
const dialog = $('#inspect');
function inspect(index) {
  const frame = frames[index];
  const image = $('#inspect-image');
  image.src = fullSrc(frame);
  image.alt = frame.alt;
  image.width = frame.w;
  image.height = frame.h;
  $('#inspect-code').textContent = `${code(index)} / ${frame.name}`;
  $('#inspect-credit').textContent = frame.credit;
  dialog.showModal();
}
$('#inspect-open').addEventListener('click', () => inspect(carousel.index));
$('#inspect-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });

/* ---------------- Transport ---------------- */
$('#prev').addEventListener('click', () => carousel.step(-1));
$('#next').addEventListener('click', () => carousel.step(1));
const modes = $('#modes');
EFFECTS.forEach(mode => {
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = mode;
  button.dataset.mode = mode;
  button.setAttribute('data-no-translate', '');
  button.setAttribute('aria-pressed', String(mode === 'scale'));
  button.addEventListener('click', () => {
    carousel.setMode(mode);
    modes.querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  });
  modes.append(button);
});
carousel.setMode('scale');

/* ---------------- Effects ---------------- */
const terminal = lightTerminal();
const grid = lightDotGrid();
const heroGlitch = glitch($('#hero-title'), 'RELAY/09', { mode: 'slices', speed: 0.9, offset: narrow ? 3 : 6, intensity: 0.3, skew: 2, flicker: true, trigger: 'always' });
const sectionGlitches = [...document.querySelectorAll('[data-glitch]')].map(heading =>
  glitch(heading, heading.textContent, { mode: 'rgb', offset: 7, intensity: 0.8, speed: 0.5, trigger: 'hover' }));
const spark = createClickSpark({ color: frames[0].accent, enabled: () => fx.spark });
const heroLine = createDecrypted($('#hero-line'), { speed: 22, sequential: true, characters: '01<>/\\|=+*#' });
heroLine.enabled = isEnabled;

const cards = [...document.querySelectorAll('[data-spotlight]')].map(element => {
  const refs = spotlight(element);
  refs.lastAccent = frames[0].accent;
  return refs;
});
const magnets = [...document.querySelectorAll('[data-magnet]')].map(element => magnet(element));
const pixels = archiveTiles.map((tile, index) => mount(PixelCard, {
  colors: ['#ffffff', frames[index].accent, frames[index].accent], gap: 6, speed: 40, pixelSize: 2.5, origin: 'pointer',
  glow: 0.6, glowColor: frames[index].accent, noFocus: true, intro: false, clickPulse: true, radius: 2
}, r => {
  r.containerRef.current = tile;
  r.canvasRef.current = tile.querySelector('canvas');
}).refs);

/* ---------------- FX bus ---------------- */
const apply = {
  terminal: on => {
    $('#terminal').hidden = !on;
    if (terminal.settingsRef) { terminal.settingsRef.current.pause = !on; terminal.settingsRef.current.mouseReact = on; terminal.settingsRef.current.clickEffect = on ? 1 : 0; terminal.wakeRef.current?.(); }
  },
  dotgrid: on => {
    $('#dotgrid').hidden = !on;
    grid.settingsRef.current.paused = !on;
    grid.engineRef.current?.refresh();
  },
  glitch: on => {
    [heroGlitch, ...sectionGlitches].forEach(item => {
      if (!item.original) item.original = { intensity: item.settingsRef.current.intensity, offset: item.settingsRef.current.offset };
      item.settingsRef.current.intensity = on ? item.original.intensity : 0;
      item.settingsRef.current.offset = on ? item.original.offset : 0;
      item.settingsRef.current.flicker = on && item === heroGlitch;
    });
  },
  decrypt: () => {},
  spotlight: on => document.documentElement.toggleAttribute('data-spotlight-off', !on),
  pixel: on => pixels.forEach(item => { item.settingsRef.current.opacity = on ? 1 : 0; item.engineRef.current?.wake(); }),
  magnet: on => magnets.forEach(item => { item.settingsRef.current.disabled = !on; item.wakeRef.current?.(); }),
  spark: () => {}
};
document.querySelectorAll('[data-fx]').forEach(button => {
  button.addEventListener('click', () => {
    const name = button.dataset.fx;
    fx[name] = !fx[name];
    button.setAttribute('aria-pressed', String(fx[name]));
    apply[name](fx[name]);
    $('#hud-fx').textContent = `${Object.values(fx).filter(Boolean).length + 1}/9`;
  });
});

/* ---------------- HUD: measured values only ---------------- */
const hud = { fps: $('#hud-fps'), view: $('#hud-view'), pointer: $('#hud-pointer') };
const updateView = () => { hud.view.textContent = `${innerWidth}×${innerHeight} @${Math.round((devicePixelRatio || 1) * 100) / 100}x`; };
addEventListener('resize', updateView);
updateView();
if (!touchOnly) addEventListener('pointermove', event => { hud.pointer.textContent = `${event.clientX},${event.clientY}`; }, { passive: true });
if (!reduced && !narrow) {
  let count = 0;
  let since = performance.now();
  const measure = now => {
    count++;
    if (now - since >= 500) {
      hud.fps.textContent = String(Math.round(count * 1000 / (now - since)));
      count = 0;
      since = now;
    }
    requestAnimationFrame(measure);
  };
  requestAnimationFrame(measure);
}

/* ---------------- Language-dependent rendering ---------------- */
function applyLanguage(animate = false) {
  heroLine.set(t('Twelve frames received. Signal clean.'), animate);
  carousel.setLabels(i => `${code(i)} ${frames[i].name}`);
  renderDossier(carousel.index, animate);
  window.showcaseLanguage?.refresh();
}
window.addEventListener('showcase-language', () => applyLanguage(false));

applyLanguage(false);
heroLine.set(t('Twelve frames received. Signal clean.'), true);
