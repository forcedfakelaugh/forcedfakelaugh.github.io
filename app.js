document.getElementById('year').textContent = new Date().getFullYear();

// project filters
const chips = document.querySelectorAll('.chip');
const cards = document.querySelectorAll('.card');
chips.forEach(chip => chip.addEventListener('click', () => {
  chips.forEach(other => other.setAttribute('aria-pressed', String(other === chip)));
  const filter = chip.dataset.filter;
  cards.forEach(card => { card.hidden = filter !== 'all' && !card.dataset.tags.split(' ').includes(filter); });
}));

// highlight the nav link for the section in view
const links = [...document.querySelectorAll('.nav a')];
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
  });
}, { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));

// fade out before leaving for a showcase
const fader = document.querySelector('.fader');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
document.querySelectorAll('.card a').forEach(link => link.addEventListener('click', event => {
  if (reduced || event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
  event.preventDefault();
  fader.classList.add('out');
  setTimeout(() => { location.href = link.href; }, 240);
}));
addEventListener('pageshow', event => { if (event.persisted) fader.classList.remove('out'); });
