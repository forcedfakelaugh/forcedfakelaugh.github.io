'use strict';
const products = [
  { id: 'jacket', name: 'The Dye-House Jacket', category: 'Clothing', color: 'Washed indigo', dips: 8, price: 185, image: 'jacket', sizes: ['XS', 'S', 'M', 'L'], description: 'A boxy work jacket that fades along every seam. Imagined for market mornings, motorbike rides and the years after.' },
  { id: 'set', name: 'The Leaf Set', category: 'Clothing', color: 'Night indigo', dips: 14, price: 210, image: 'set', sizes: ['XS', 'S', 'M', 'L'], description: 'A relaxed tunic and trouser with pale leaf embroidery. A conceptual pairing for warm evenings and long dinners.' },
  { id: 'scarf', name: 'The Resist-Print Scarf', category: 'Accessories', color: 'Indigo and undyed', dips: 5, price: 65, image: 'scarf', sizes: ['One size'], description: 'The pattern comes from binding the cloth before each dip, so no two are alike. Imagined in light cotton for heat, wind and sun.' },
  { id: 'wrap', name: 'The Deep-Dip Wrap', category: 'Accessories', color: 'Deepest indigo', dips: 20, price: 95, image: 'cloth', sizes: ['One size'], description: 'A long cotton wrap dipped until it is almost black-blue. Wear it, sit on it, pack it for the night bus north.' }
];
const cart = [];
const money = value => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
const pad = value => String(value).padStart(2, '0');
const dipLabel = count => `${count} ${count === 1 ? 'dip' : 'dips'}`;
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

// Shade stops sampled from the colour card: undyed sky blue at one dip, near-black at twenty.
const stops = [[1, [213, 223, 235]], [3, [167, 186, 211]], [6, [108, 136, 174]], [10, [52, 80, 125]], [20, [20, 29, 51]]];
function shadeFor(dips) {
  const upper = stops.findIndex(([at]) => at >= dips);
  if (upper <= 0) return `rgb(${stops[Math.max(upper, 0)][1]})`;
  const [fromAt, from] = stops[upper - 1]; const [toAt, to] = stops[upper];
  const t = (dips - fromAt) / (toAt - fromAt);
  return `rgb(${from.map((value, i) => Math.round(value + (to[i] - value) * t))})`;
}
const shadeName = dips => dips <= 2 ? 'Sky' : dips <= 4 ? 'Washed' : dips <= 8 ? 'Mid' : dips <= 15 ? 'Night' : 'Deepest';

let toastTimer;
function showToast(message) { const toast = document.querySelector('#toast'); toast.textContent = message; toast.classList.add('visible'); clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove('visible'), 2600); }
function openDialog(id) { document.querySelector(id).showModal(); document.body.classList.add('modal-open'); }
document.querySelectorAll('dialog').forEach(dialog => {
  dialog.addEventListener('close', () => { if (!document.querySelector('dialog[open]')) document.body.classList.remove('modal-open'); });
  dialog.addEventListener('click', event => { const rect = dialog.getBoundingClientRect(); if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close(); });
});
document.querySelectorAll('[data-close]').forEach(button => button.addEventListener('click', () => document.getElementById(button.dataset.close).close()));

// Colour card: twenty cells, one per dip, with the named stops labelled.
const namedStops = { 1: 'Sky', 3: 'Washed', 6: 'Mid', 10: 'Night', 20: 'Deepest' };
document.querySelector('#shade-card').innerHTML = Array.from({ length: 20 }, (_, i) => {
  const dips = i + 1; const name = namedStops[dips];
  return `<li style="--shade:${shadeFor(dips)}" class="${dips >= 8 ? 'on-dark' : ''}${name ? ' labelled' : ''}">${name ? `<span><b>${pad(dips)}</b><span>${name}</span></span>` : ''}</li>`;
}).join('');

// Order book: one card per piece; hovering lowers it into its own shade.
const ledger = document.querySelector('#ledger');
ledger.innerHTML = products.map((product, index) => `<div class="ledger-row" role="listitem" style="--shade:${shadeFor(product.dips)}"><button type="button" data-product="${product.id}" aria-label="View ${product.name}"><span class="row-media"><img src="assets/${product.image}.jpg" alt="" loading="lazy"><span class="row-dipcount" aria-hidden="true">${pad(product.dips)}<small>${dipLabel(product.dips)}</small></span></span><span class="row-info"><span class="row-no">No. ${pad(index + 1)}</span><span class="row-name">${product.name}</span><span class="row-price">${money(product.price)}</span><span class="row-shade"><i></i><span>${product.color}</span></span></span></button></div>`).join('');
ledger.querySelectorAll('[data-product]').forEach(button => button.addEventListener('click', () => showProduct(button.dataset.product)));

function showProduct(id) {
  const product = products.find(item => item.id === id);
  let selectedSize = product.sizes.includes('M') ? 'M' : product.sizes[0];
  document.querySelector('#product-detail').innerHTML = `<div class="detail-layout"><img src="assets/${product.image}.jpg" alt="${product.name}"><div class="detail-copy"><p class="kicker">${product.category}</p><h2 id="product-title">${product.name}</h2><p class="detail-price">${money(product.price)}</p><p>${product.description}</p><p class="detail-shade" style="--shade:${shadeFor(product.dips)}"><i></i><span>${product.color}</span><span>${dipLabel(product.dips)}</span></p><p class="size-label" id="size-label">Select size</p><div class="sizes" role="group" aria-labelledby="size-label">${product.sizes.map(size => `<button type="button" class="${size === selectedSize ? 'selected' : ''}" aria-pressed="${size === selectedSize}" data-size="${size}">${size}</button>`).join('')}</div><button type="button" id="add-to-bag" class="primary">Add to bag - ${money(product.price)}</button><p class="detail-note">Concept product · USD pricing · No real purchases</p></div></div>`;
  document.querySelectorAll('[data-size]').forEach(button => button.addEventListener('click', () => { selectedSize = button.dataset.size; document.querySelectorAll('[data-size]').forEach(item => { item.classList.toggle('selected', item === button); item.setAttribute('aria-pressed', String(item === button)); }); }));
  document.querySelector('#add-to-bag').addEventListener('click', () => { const existing = cart.find(item => item.id === id && item.size === selectedSize); if (existing) existing.quantity += 1; else cart.push({ id, size: selectedSize, quantity: 1 }); updateCount(); document.querySelector('#product-dialog').close(); showToast(`${product.name} added to your bag`); });
  openDialog('#product-dialog');
}

function updateCount() { document.querySelector('#bag-count').textContent = cart.reduce((sum, item) => sum + item.quantity, 0); }
function renderCart() {
  const container = document.querySelector('#cart-items'); const bottom = document.querySelector('#cart-bottom');
  if (!cart.length) { container.innerHTML = '<p class="empty-bag">Nothing in the vat yet.</p>'; bottom.innerHTML = '<button type="button" class="primary" id="continue-shopping">Open the order book</button><p>Your bag is empty. This is a simulated shopping experience.</p>'; document.querySelector('#continue-shopping').addEventListener('click', () => { document.querySelector('#cart-dialog').close(); document.querySelector('#pieces').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' }); }); return; }
  container.innerHTML = cart.map((item, index) => { const product = products.find(p => p.id === item.id); return `<div class="cart-item"><img src="assets/${product.image}.jpg" alt="${product.name}"><div><h3>${product.name}</h3><p>${product.color} / ${item.size}</p><div class="quantity"><button type="button" data-quantity="${index}" data-change="-1" aria-label="Decrease quantity of ${product.name}">−</button><span aria-label="Quantity">${item.quantity}</span><button type="button" data-quantity="${index}" data-change="1" aria-label="Increase quantity of ${product.name}">+</button></div></div><div class="item-right">${money(product.price * item.quantity)}<button type="button" class="remove" data-remove="${index}" aria-label="Remove ${product.name}">Remove</button></div></div>`; }).join('');
  const subtotal = cart.reduce((sum, item) => sum + products.find(p => p.id === item.id).price * item.quantity, 0);
  bottom.innerHTML = `<div class="total"><span>Subtotal</span><strong>${money(subtotal)}</strong></div><button type="button" class="primary" id="demo-checkout">Try demo checkout ↗</button><p>USD · Concept pricing. Shipping and tax are not calculated.</p><p>No payment or personal information is collected.</p>`;
  document.querySelectorAll('[data-quantity]').forEach(button => button.addEventListener('click', () => { const index = Number(button.dataset.quantity); cart[index].quantity += Number(button.dataset.change); if (cart[index].quantity <= 0) cart.splice(index, 1); updateCount(); renderCart(); }));
  document.querySelectorAll('[data-remove]').forEach(button => button.addEventListener('click', () => { cart.splice(Number(button.dataset.remove), 1); updateCount(); renderCart(); }));
  document.querySelector('#demo-checkout').addEventListener('click', () => { container.innerHTML = '<div class="checkout-success" role="status"><p class="kicker">The end of our little demo</p><h3>Dyed, aired, <em>done.</em></h3><p>You’ve completed the concept shopping journey. No order was placed, and no payment was taken.</p><p>Like the experience? There’s more to explore in Lucas’s portfolio.</p></div>'; bottom.innerHTML = '<a class="primary" href="../../">Back to the portfolio ↗</a>'; cart.length = 0; updateCount(); });
}
document.querySelector('#open-bag').addEventListener('click', () => { renderCart(); openDialog('#cart-dialog'); });

// Dip slider in the process section.
const range = document.querySelector('#dip-range');
function updateDip() {
  const dips = Number(range.value);
  const swatch = document.querySelector('#dip-swatch');
  swatch.style.background = shadeFor(dips);
  swatch.classList.toggle('on-dark', dips >= 6);
  document.querySelector('#dip-big').textContent = pad(dips);
  document.querySelector('#dip-count').textContent = dipLabel(dips);
  document.querySelector('#dip-shade').textContent = shadeName(dips);
}
range.addEventListener('input', updateDip);
updateDip();

// Scrolling dips the page: the background deepens from one dip to twenty, and the type flips to undyed cotton once the blue is dark enough.
const root = document.documentElement;
const gaugeLabel = document.querySelector('#gauge-label');
let gaugeQueued = false;
function updateGauge() {
  gaugeQueued = false;
  const max = root.scrollHeight - innerHeight;
  const progress = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
  const dips = 1 + progress * 19;
  root.style.setProperty('--vat', shadeFor(dips));
  const dark = dips >= 7.5;
  if (root.dataset.dark !== String(dark)) {
    root.dataset.dark = String(dark);
    root.style.setProperty('--fg', dark ? '#f3efe6' : '#141d33');
    root.style.setProperty('--fg-soft', dark ? 'rgba(243,239,230,.72)' : 'rgba(20,29,51,.68)');
    root.style.setProperty('--rule', dark ? 'rgba(243,239,230,.24)' : 'rgba(20,29,51,.22)');
  }
  const label = `Dip ${pad(Math.round(dips))}`;
  if (gaugeLabel.textContent !== label) gaugeLabel.textContent = label;
}
addEventListener('scroll', () => { if (!gaugeQueued) { gaugeQueued = true; requestAnimationFrame(updateGauge); } }, { passive: true });
addEventListener('resize', updateGauge);
updateGauge();

document.querySelector('.dip-image').classList.add('is-dipped');

// Size the giant wordmarks so they run exactly edge to edge of their measure.
function fitWordmarks() {
  document.querySelectorAll('.giant, .footer-mark').forEach(mark => {
    mark.style.fontSize = '';
    const available = mark.parentElement.clientWidth - Math.max(mark.offsetLeft, 0) * 2;
    mark.style.fontSize = `${parseFloat(getComputedStyle(mark).fontSize) * available / mark.scrollWidth}px`;
  });
}
document.fonts.ready.then(fitWordmarks);
addEventListener('resize', fitWordmarks);
