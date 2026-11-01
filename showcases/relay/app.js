import { mount } from './vendor/hooks.js';
import { FaultyTerminal } from './vendor/terminal.js';
import { GlitchText } from './vendor/glitch.js';
import { Magnet } from './vendor/magnet.js';
import { PixelCard } from './vendor/pixel.js';
import { createCarousel } from './carousel.js';
import { createDecrypted } from './text-and-spark.js';

// Run It Forward: six AI-generated key visuals for the fictional RELAY brand.
const ACCENT = '#ff9f2e';
const base = './assets/campaign/';
const frames = [
  { slug: 'start', wearing: 'Curfew Singlet, Wetline 09', name: 'Go anyway.', w: 1536, h: 1024, alt: 'A sprinter in black kit with amber details bursts from a crouch on a wet city street at night.', note: 'The day took everything. Take the road back.' },
  { slug: 'stride', wearing: 'Last Light Short, Wetline 09', name: 'Keep your own time.', w: 1024, h: 1536, alt: 'A woman in a black crop top and shorts runs under sodium streetlights, the skyline blurred behind her.', note: 'No crowd. No finish line. Just the next streetlight.' },
  { slug: 'relay', wearing: 'Sodium Shell', name: 'Pass it on.', w: 1536, h: 1024, alt: 'One runner passes an amber baton to another across a blurred, rain-wet street.', note: 'Someone got you out the door. Get someone else out.' },
  { slug: 'kit', wearing: 'Sodium Shell', name: 'Let it rain.', w: 1536, h: 1024, alt: 'Close view of rain beading on a black ripstop running jacket with amber piping at the collar and sleeve.', note: 'The shell sheds the weather. The amber line keeps you seen.' },
  { slug: 'shoe', wearing: 'Wetline 09', name: 'Own the wet streets.', w: 1536, h: 1024, alt: 'A black and amber running shoe strikes a wet road, with water spray frozen by flash.', note: 'Grip for roads that never quite dry.' },
  { slug: 'crew', wearing: 'The Night Collection', name: 'Never alone.', w: 1536, h: 1024, alt: 'Three runners in matching black and amber kit cross a concrete overpass at dusk, the skyline behind them.', note: "Somewhere in this city, someone's already running." }
];
const products = [
  { name: 'Sodium Shell', type: 'Jacket', price: '$148', frame: 3, position: '60% 40%' },
  { name: 'Curfew Singlet', type: 'Top', price: '$58', frame: 0, position: '60% 30%' },
  { name: 'Last Light Short', type: 'Short', price: '$64', frame: 1, position: '50% 50%' },
  { name: 'Wetline 09', type: 'Shoe', price: '$165', frame: 4, position: '40% 60%' }
];
const srcset = frame => `${base}${frame.slug}-480.webp 480w, ${base}${frame.slug}-960.webp 960w`;
const t = text => window.showcaseLanguage?.translate(text) ?? text;
const $ = selector => document.querySelector(selector);
const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
const narrow = window.innerWidth < 720;

function lightTerminal() {
  const box = $('#terminal');
  const canvas = document.createElement('canvas');
  canvas.className = 'faulty-terminal-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  box.append(canvas);
  const { refs } = mount(FaultyTerminal, {
    tint: ACCENT, glyphs: 'characters', scale: 1.4, gridMul: [2, 1], digitSize: 1.3, timeScale: 0.35,
    scanlineIntensity: 0.45, glitchAmount: 1, flickerAmount: 1, noiseAmp: 1, curvature: 0.12, mouseStrength: 0.35,
    brightness: 0.75, glow: 0.55, persistence: 0.5, scramble: 0.7, mouseGlow: 0.8, vignette: 0.45, clickEffect: 'none',
    variation: 3, dpr: Math.min(window.devicePixelRatio || 1, narrow ? 1 : 1.25)
  }, r => {
    r.containerRef.current = box;
    r.canvasRef.current = canvas;
  });
  if (!refs.wakeRef.current) box.classList.add('is-offline');
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

/* ---------------- Campaign: carousel and caption ---------------- */
const renderSlide = index => {
  const frame = frames[index];
  const card = document.createElement('figure');
  card.className = 'frame-card';
  const image = document.createElement('img');
  image.src = `${base}${frame.slug}-960.webp`;
  image.srcset = srcset(frame);
  image.sizes = '(max-width: 900px) 92vw, 1100px';
  image.width = frame.w;
  image.height = frame.h;
  image.alt = t(frame.alt);
  image.draggable = false;
  image.decoding = 'async';
  card.append(image);
  card.insertAdjacentHTML('beforeend', '<span class="frame-sweep" aria-hidden="true"></span>');
  return card;
};

const carousel = createCarousel($('#carousel'), {
  count: frames.length,
  renderSlide,
  aspectRatio: narrow ? 1 : 3 / 2,
  onChange: index => tune(index),
  onActivate: index => inspect(index)
});

const captionName = createDecrypted($('#d-name'), { speed: 28, sequential: true, direction: 'center', characters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&/<>=+' });

// Bars double as a direct selector.
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

const lineup = $('#lineup');
const lineupTiles = products.map(product => {
  const frame = frames[product.frame];
  const item = document.createElement('li');
  item.innerHTML = `<button type="button" class="tile pixel-card"><canvas class="pixel-card-canvas" aria-hidden="true"></canvas><img src="${base}${frame.slug}-960.webp" alt="" width="${frame.w}" height="${frame.h}" loading="lazy" decoding="async" style="object-position:${product.position}"><span class="tile-meta"><strong data-no-translate>${product.name}</strong><span class="tile-info"><span>${product.type}</span> <span data-no-translate>${product.price}</span></span></span></button>`;
  lineup.append(item);
  const tile = item.querySelector('.tile');
  tile.addEventListener('click', () => {
    carousel.goTo(product.frame);
    $('#campaign').scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    $('#carousel').focus({ preventScroll: true });
  });
  return tile;
});

function renderCaption(index, animate) {
  const frame = frames[index];
  captionName.set(t(frame.name), animate);
  $('#d-note').textContent = t(frame.note);
  $('#d-wearing').textContent = `${t('Wearing')}: ${t(frame.wearing)}`;
  $('#counter').textContent = `${String(index + 1).padStart(2, '0')} / ${String(frames.length).padStart(2, '0')}`;
  bars.querySelectorAll('.bar').forEach((bar, i) => {
    bar.classList.toggle('is-past', i < index);
    bar.classList.toggle('is-active', i === index);
    if (i === index) bar.setAttribute('aria-current', 'true');
    else bar.removeAttribute('aria-current');
    bar.setAttribute('aria-label', t('Go to visual {number}').replace('{number}', i + 1));
  });
}

function tune(index) {
  renderCaption(index, true);
  $('#carousel-status').textContent = t(frames[index].name);
}

/* ---------------- Inspect ---------------- */
const dialog = $('#inspect');
function inspect(index) {
  const frame = frames[index];
  const image = $('#inspect-image');
  image.src = `${base}${frame.slug}.webp`;
  image.alt = t(frame.alt);
  image.width = frame.w;
  image.height = frame.h;
  $('#inspect-code').textContent = t(frame.name);
  dialog.showModal();
}
$('#inspect-open').addEventListener('click', () => inspect(carousel.index));
$('#inspect-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });

/* ---------------- Transport ---------------- */
$('#prev').addEventListener('click', () => carousel.step(-1));
$('#next').addEventListener('click', () => carousel.step(1));
carousel.setMode('tilt');

/* ---------------- Effects ---------------- */
lightTerminal();
glitch($('#hero-title'), 'RELAY', { mode: 'slices', speed: 0.9, offset: narrow ? 3 : 6, intensity: 0.3, skew: 2, flicker: true, trigger: 'always' });
const heroLine = createDecrypted($('#hero-line'), { speed: 22, sequential: true, characters: '01<>/\\|=+*#' });

document.querySelectorAll('[data-magnet]').forEach(element => magnet(element));
lineupTiles.forEach(tile => mount(PixelCard, {
  colors: ['#ffffff', ACCENT, ACCENT], gap: 6, speed: 40, pixelSize: 2.5, origin: 'pointer',
  glow: 0.6, glowColor: ACCENT, noFocus: true, intro: false, clickPulse: false, radius: 2
}, r => {
  r.containerRef.current = tile;
  r.canvasRef.current = tile.querySelector('canvas');
}));

/* ---------------- Contact: same address the portfolio publishes ---------------- */
$('#book').href = `mailto:${atob('bHVjYXNuZ3V5ZW4uc2hAZ21haWwuY29t')}?subject=${encodeURIComponent('Campaign concept')}`;

/* ---------------- Language-dependent rendering ---------------- */
function applyLanguage(animate = false) {
  heroLine.set(t('Run it forward.'), animate);
  carousel.setLabels(i => t(frames[i].name));
  renderCaption(carousel.index, animate);
  window.showcaseLanguage?.refresh();
}
window.addEventListener('showcase-language', () => applyLanguage(false));

applyLanguage(false);
heroLine.set(t('Run it forward.'), true);
