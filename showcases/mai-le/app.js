const paintings = [
  { id: 'window', title: 'An open window', year: '2026', size: '60 × 90 cm', description: 'The window was open before anyone woke. A little garden light, finding its way into the room.', alt: 'Oil painting of green shutters, white flowers and pears in a sunlit room' },
  { id: 'tea', title: 'Tea for no occasion', year: '2025', size: '45 × 65 cm', description: 'Two cups, though only one person is home. The small, unnecessary rituals that make a day our own.', alt: 'Oil painting of a blue and white teapot, two cups, pink pomelo and rose linen' },
  { id: 'room', title: 'The room at four', year: '2026', size: '50 × 75 cm', description: 'Nothing moves but the light. In an hour, this will be another room entirely.', alt: 'Oil painting of a wooden chair, terracotta floor and afternoon light in an ochre room' },
  { id: 'flowers', title: 'Marigolds, Tuesday', year: '2024', size: '40 × 60 cm', description: 'Flowers from the morning market. No birthday, no visitors. Just a Tuesday that needed a little orange.', alt: 'Oil painting of orange marigolds in a celadon vase with green limes' },
  { id: 'self-portrait', title: 'Self-portrait, afternoon', year: '2026', size: '50 × 75 cm', description: 'A pause between brushstrokes. The palette still in hand, the afternoon finding its way across a familiar studio wall.', alt: 'Oil-painted portrait based on a supplied photograph: an artist in a brown apron, looking down at her palette beside a pink abstract canvas' },
  { id: 'breakfast', title: 'A little longer', year: '2026', size: '40 × 60 cm', description: 'A papaya, a bowl, and nowhere to be just yet. An ordinary morning, given all the time it needs.', alt: 'Oil painting of papaya, a white bowl and a glass of tea beside a sunny window' },
  { id: 'seascape', title: 'Where the light goes', year: '2026', size: '90 × 60 cm', description: 'The sea keeps nothing still. A small ship on the horizon, and all that evening light finding its way back to shore.', alt: 'Impasto oil painting of blue and teal breaking waves, golden sunset reflections and a three-masted sailing ship' },
];
const artDialog = document.querySelector('#art-dialog');
const visitDialog = document.querySelector('#visit-dialog');
const detailImage = document.querySelector('#detail-image');
const detailStage = document.querySelector('#detail-stage');
const wallToggle = document.querySelector('#wall-toggle');
const wallOptions = document.querySelector('#wall-options');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let current = 0;
let opener;

function openDialog(dialog, source) {
  opener = source;
  dialog.showModal();
  document.body.classList.add('modal-open');
  dialog.scrollTop = 0;
}

function renderPainting(index) {
  current = (index + paintings.length) % paintings.length;
  const painting = paintings[current];
  detailImage.src = `assets/${painting.id}.jpg`;
  detailImage.alt = painting.alt;
  document.querySelector('#detail-title').textContent = painting.title;
  document.querySelector('#detail-meta').textContent = `${painting.year} · Oil study · ${painting.size}`;
  document.querySelector('#detail-description').textContent = painting.description;
  document.querySelector('#detail-counter').textContent = `${String(current + 1).padStart(2, '0')} / ${String(paintings.length).padStart(2, '0')}`;
  document.querySelector('.enquiry').open = false;
}

document.querySelectorAll('[data-art]').forEach(button => button.addEventListener('click', () => {
  renderPainting(paintings.findIndex(painting => painting.id === button.dataset.art));
  setWall(false);
  openDialog(artDialog, button);
}));

for (const dialog of [artDialog, visitDialog]) {
  dialog.querySelector('[data-close]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('modal-open');
    opener?.focus({ preventScroll: true });
  });
}

document.querySelector('#art-prev').addEventListener('click', () => renderPainting(current - 1));
document.querySelector('#art-next').addEventListener('click', () => renderPainting(current + 1));
artDialog.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
    renderPainting(current + (event.key === 'ArrowRight' ? 1 : -1));
  }
});

function setWall(enabled) {
  detailStage.classList.toggle('on-wall', enabled);
  wallToggle.setAttribute('aria-pressed', String(enabled));
  wallToggle.innerHTML = enabled ? 'Back to the painting <span>↙</span>' : 'See it on a wall <span>↗</span>';
  wallOptions.hidden = !enabled;
}
wallToggle.addEventListener('click', () => setWall(wallToggle.getAttribute('aria-pressed') !== 'true'));
const wallColours = { chalk: '#e9e6dd', sand: '#d4c3a8', sage: '#a7afa0' };
document.querySelectorAll('[data-wall]').forEach(button => button.addEventListener('click', () => {
  detailStage.style.setProperty('--wall', wallColours[button.dataset.wall]);
  document.querySelectorAll('[data-wall]').forEach(swatch => swatch.setAttribute('aria-pressed', String(swatch === button)));
}));

const visitForm = document.querySelector('#visit-form');
const confirmation = document.querySelector('#visit-confirmation');
const visitDate = document.querySelector('#visit-date');
// Fixed dates belong to the fictional exhibition; UTC avoids timezone-dependent weekdays.
for (let day = new Date('2026-11-18T12:00:00Z'); day <= new Date('2026-12-20T12:00:00Z'); day.setUTCDate(day.getUTCDate() + 1)) {
  if (![2, 4, 6].includes(day.getUTCDay())) continue;
  const option = document.createElement('option');
  option.value = day.toISOString().slice(0, 10);
  option.textContent = day.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' });
  visitDate.append(option);
}
document.querySelector('#visit-open').addEventListener('click', event => openDialog(visitDialog, event.currentTarget));
visitForm.addEventListener('submit', event => {
  event.preventDefault();
  const time = new FormData(visitForm).get('time');
  document.querySelector('#invitation-date').textContent = `${visitDate.selectedOptions[0].textContent} 2026 · ${time}`;
  visitForm.hidden = true;
  confirmation.hidden = false;
  document.querySelector('#visit-reset').focus({ preventScroll: true });
});
document.querySelector('#visit-reset').addEventListener('click', () => {
  confirmation.hidden = true;
  visitForm.hidden = false;
  visitForm.reset();
  visitDate.focus({ preventScroll: true });
});

// A small, scroll-driven drift gives the opening paintings a little depth.
const floaters = [...document.querySelectorAll('.floating')];
const hero = document.querySelector('.hero');
const heroTitle = document.querySelector('.hero-title');
let framePending = false;
function updateDrift() {
  const progress = reducedMotion.matches ? 0 : Math.min(1, Math.max(0, window.scrollY / hero.offsetHeight));
  floaters.forEach((painting, index) => painting.style.setProperty('--drift', `${progress * (index % 2 ? -85 : 60)}px`));
  heroTitle.style.opacity = String(1 - progress * .8);
  framePending = false;
}
addEventListener('scroll', () => {
  if (!framePending) { requestAnimationFrame(updateDrift); framePending = true; }
}, { passive: true });
reducedMotion.addEventListener('change', updateDrift);
updateDrift();
