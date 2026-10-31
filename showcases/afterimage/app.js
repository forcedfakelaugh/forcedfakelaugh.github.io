import { createLightEngine } from './light-engine.js';

const $ = selector => document.querySelector(selector);
const canvas = $('#light-canvas');
const artwork = $('#artwork');
const fallback = $('.artwork-fallback');
const reduce = matchMedia('(prefers-reduced-motion: reduce)');
const scenes = [
  { name: 'Refraction', description: 'A single beam. A thousand ways to see it.', image: 'refraction' },
  { name: 'Dispersion', description: 'Every colour was already there. Let it unfold.', image: 'dispersion' },
  { name: 'Afterglow', description: 'The light moves on. The feeling stays.', image: 'afterglow' },
];
let scene = 0;
let paused = reduce.matches;
let posterUrl;
let captureInProgress = false;
const translate = value => window.showcaseLanguage?.translate(value) || value;

function unavailable() {
  artwork.classList.remove('is-ready');
  $('#render-status').hidden = false;
  $('#pause-button').disabled = true;
  $('#tune-button').disabled = true;
  $('#tune-panel').hidden = true;
  $('#tune-button').setAttribute('aria-expanded', 'false');
  $('#live-label').textContent = 'A still light study';
}

const engine = createLightEngine(canvas, { onUnavailable: unavailable, onReady() {
  artwork.classList.add('is-ready');
  $('#render-status').hidden = true;
  $('#pause-button').disabled = reduce.matches;
  $('#tune-button').disabled = false;
  $('#live-label').textContent = reduce.matches ? 'Reduced motion' : paused ? 'A moment of stillness' : 'A living light study';
} });
if (engine.ready) {
  artwork.classList.add('is-ready');
} else {
  unavailable();
}

function updatePause() {
  engine.setPaused(paused);
  document.body.classList.toggle('is-paused', paused);
  $('#pause-button').disabled = reduce.matches || !engine.ready;
  $('#pause-button').setAttribute('aria-pressed', String(paused));
  $('#pause-button').setAttribute('aria-label', paused ? 'Play motion' : 'Pause motion');
  $('#pause-label').textContent = reduce.matches ? 'Still' : paused ? 'Play' : 'Pause';
  $('#pause-icon').textContent = paused ? '▷' : 'Ⅱ';
  if (engine.ready) $('#live-label').textContent = reduce.matches ? 'Reduced motion' : paused ? 'A moment of stillness' : 'A living light study';
}
updatePause();
$('#pause-button').addEventListener('click', () => {
  paused = !paused;
  updatePause();
});
reduce.addEventListener('change', event => {
  paused = event.matches;
  updatePause();
});

function selectScene(index) {
  scene = index;
  engine.setScene(index);
  $('#scene-number').textContent = `0${index + 1}`;
  $('#scene-description').textContent = scenes[index].description;
  fallback.src = `./assets/${scenes[index].image}.webp`;
  document.querySelectorAll('[data-scene]').forEach(button => {
    const active = Number(button.dataset.scene) === index;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });
}
document.querySelectorAll('[data-scene]').forEach(button => button.addEventListener('click', () => selectScene(Number(button.dataset.scene))));
document.querySelectorAll('[data-open-scene]').forEach(button => button.addEventListener('click', () => {
  selectScene(Number(button.dataset.openScene));
  $('#exhibit').scrollIntoView({ behavior: reduce.matches ? 'instant' : 'smooth' });
  document.querySelector(`[data-scene="${scene}"]`).focus({ preventScroll: true });
}));

function setTune(open, returnFocus = false) {
  $('#tune-panel').hidden = !open;
  $('#tune-button').setAttribute('aria-expanded', String(open));
  if (open) $('#close-tune').focus({ preventScroll: true });
  if (returnFocus) $('#tune-button').focus({ preventScroll: true });
}
$('#tune-button').addEventListener('click', () => setTune($('#tune-panel').hidden));
$('#close-tune').addEventListener('click', () => setTune(false, true));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !$('#tune-panel').hidden) setTune(false, true);
});
document.addEventListener('pointerdown', event => {
  if (!event.target.closest('#tune-panel, #tune-button') && !$('#tune-panel').hidden) setTune(false);
});
document.querySelectorAll('[data-palette]').forEach(button => button.addEventListener('click', () => {
  const palette = Number(button.dataset.palette);
  engine.setPalette(palette);
  document.querySelectorAll('[data-palette]').forEach(item => {
    const active = Number(item.dataset.palette) === palette;
    item.classList.toggle('is-active', active);
    item.setAttribute('aria-pressed', String(active));
  });
}));
$('#intensity').addEventListener('input', event => {
  const value = Number(event.target.value);
  $('#intensity-value').value = `${value}%`;
  engine.setEnergy(value / 100);
});

const dialog = $('#print-dialog');
async function captureMoment() {
  if (captureInProgress) return;
  captureInProgress = true;
  try {
    const poster = document.createElement('canvas');
    poster.width = 1200;
    poster.height = 1500;
    const context = poster.getContext('2d');
    context.fillStyle = '#101110';
    context.fillRect(0, 0, 1200, 1500);
    let source = canvas;
    if (engine.ready && engine.renderStill()) { /* Capture the just-rendered buffer synchronously. */ }
    else {
      await fallback.decode();
      source = fallback;
    }
    const sourceWidth = source.naturalWidth || source.width;
    const sourceHeight = source.naturalHeight || source.height;
    const factor = Math.min(1100 / sourceWidth, 1000 / sourceHeight);
    const width = sourceWidth * factor;
    const height = sourceHeight * factor;
    context.drawImage(source, (1200 - width) / 2, 260 + (1000 - height) / 2, width, height);
    context.strokeStyle = '#e9e7df45';
    context.lineWidth = 1;
    context.strokeRect(45, 45, 1110, 1410);
    context.fillStyle = '#d9f596';
    context.font = '18px monospace';
    context.fillText('✳  ' + translate('STUDIES IN LIGHT'), 80, 100);
    context.textAlign = 'right';
    context.fillText(`0${scene + 1} / ∞`, 1120, 100);
    context.textAlign = 'left';
    context.fillStyle = '#eeede6';
    context.font = '500 147px Arial';
    context.fillText('AFTERIMAGE', 67, 255, 1070);
    context.font = '500 65px Arial';
    context.fillText(translate(scenes[scene].name), 80, 1325);
    context.fillStyle = '#a1a49a';
    context.font = '20px Arial';
    context.fillText(translate('A moment, made yours.'), 80, 1370);
    context.fillStyle = '#d9f596';
    context.textAlign = 'right';
    context.font = '18px monospace';
    context.fillText('LUCAS NGUYEN / 2026', 1120, 1370);
    const blob = await new Promise(resolve => poster.toBlob(resolve, 'image/png'));
    if (!blob) throw new Error('Could not create the art print.');
    if (posterUrl) URL.revokeObjectURL(posterUrl);
    posterUrl = URL.createObjectURL(blob);
    $('#print-image').src = posterUrl;
    $('#download-print').href = posterUrl;
    $('#download-print').download = `afterimage-${scenes[scene].image}.png`;
    setTune(false);
    dialog.showModal();
    document.body.classList.add('has-dialog');
    engine.setPaused(true);
  } catch (error) {
    $('#render-status').textContent = 'The print could not be created. Please try again.';
    $('#render-status').hidden = false;
    console.error(error);
  } finally {
    captureInProgress = false;
  }
}
$('#capture-button').addEventListener('click', captureMoment);
$('#closing-capture').addEventListener('click', captureMoment);
$('#close-print').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) {
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
} });
dialog.addEventListener('close', () => {
  document.body.classList.remove('has-dialog');
  engine.setPaused(paused);
});

if ('IntersectionObserver' in window) {
  document.documentElement.classList.add('motion-ready');
  const reveal = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-revealed');
      reveal.unobserve(entry.target);
    });
  }, { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(element => reveal.observe(element));
}
window.addEventListener('pagehide', event => {
  if (event.persisted) return;
  engine.destroy();
  if (posterUrl) URL.revokeObjectURL(posterUrl);
});
