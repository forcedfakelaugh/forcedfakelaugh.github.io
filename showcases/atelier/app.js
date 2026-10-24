'use strict';
const products = [
  { id: 'jacket', name: 'The Everyday Jacket', category: 'clothing', color: 'Washed ochre', price: 185, image: 'coat', tag: 'THE LAYERING EDIT', swatch: '#a58b60', sizes: ['XS', 'S', 'M', 'L'], description: 'An easy outer layer with a relaxed shape. Imagined for slow mornings, long walks, and everything in between.' },
  { id: 'dress', name: 'The After-Hours Dress', category: 'clothing', color: 'Soft rose', price: 165, image: 'dress', tag: 'A LITTLE OCCASION', swatch: '#bf8e94', sizes: ['XS', 'S', 'M', 'L'], description: 'A fluid silhouette with a little room for romance. An effortless piece for evenings that turn into stories.' },
  { id: 'knit', name: 'The Sunday Knit', category: 'clothing', color: 'Warm ivory', price: 125, image: 'knit', tag: 'EVERYDAY AFFECTION', swatch: '#d9ccb6', sizes: ['XS', 'S', 'M', 'L'], description: 'Soft texture, generous sleeves, and a shape that settles in. A conceptual staple for a slower kind of day.' },
  { id: 'bag', name: 'The City Companion', category: 'accessories', color: 'Midnight black', price: 145, image: 'bag', tag: 'THE FINISHING TOUCH', swatch: '#292523', sizes: ['One size'], description: 'A structured everyday companion with an understated finish. Imagined with room for your essentials and a little more.' }
];
const money = value => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
const cart = [];
let toastTimer;
function showToast(message) { const toast = document.querySelector('#toast'); toast.textContent = message; toast.classList.add('visible'); clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove('visible'), 2600); }
function openDialog(id) { document.querySelector(id).showModal(); document.body.classList.add('modal-open'); }
document.querySelectorAll('dialog').forEach(dialog => {
  dialog.addEventListener('close', () => { if (!document.querySelector('dialog[open]')) document.body.classList.remove('modal-open'); });
  dialog.addEventListener('click', event => { const rect = dialog.getBoundingClientRect(); if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close(); });
});
document.querySelectorAll('[data-close]').forEach(button => button.addEventListener('click', () => document.getElementById(button.dataset.close).close()));
function renderProducts(category = 'all') {
  const filtered = products.filter(product => category === 'all' || product.category === category);
  document.querySelector('#result-count').textContent = `${filtered.length} ${filtered.length === 1 ? 'piece' : 'pieces'}`;
  document.querySelector('#products').innerHTML = filtered.map(product => `<article class="product-card"><div class="product-image"><img src="assets/${product.image}.jpg" alt="${product.name} in ${product.color.toLowerCase()}" loading="lazy"><span class="product-tag">${product.tag}</span><button class="quick-view" data-product="${product.id}" aria-label="Quick view ${product.name}">Quick view &nbsp; +</button></div><div class="product-info"><div><button class="product-name" data-product="${product.id}"><h3>${product.name}</h3></button><p>${product.color}</p><span class="swatch" style="background:${product.swatch}" aria-hidden="true"></span></div><span class="product-price">${money(product.price)}</span></div></article>`).join('');
  document.querySelectorAll('[data-product]').forEach(button => button.addEventListener('click', () => showProduct(button.dataset.product)));
}
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => { document.querySelectorAll('[data-filter]').forEach(item => { item.classList.toggle('active', item === button); item.setAttribute('aria-pressed', String(item === button)); }); renderProducts(button.dataset.filter); }));
function showProduct(id) {
  const product = products.find(item => item.id === id);
  let selectedSize = product.sizes.includes('M') ? 'M' : product.sizes[0];
  document.querySelector('#product-detail').innerHTML = `<div class="detail-layout"><img src="assets/${product.image}.jpg" alt="${product.name}"><div class="detail-copy"><p class="eyebrow">THE EVERYDAY EDIT / VOLUME 01</p><h2 id="product-title">${product.name}</h2><p class="detail-price">${money(product.price)}</p><p>${product.description}</p><p>Colour: ${product.color}</p><label id="size-label">SELECT SIZE</label><div class="sizes" role="group" aria-labelledby="size-label">${product.sizes.map(size => `<button class="${size === selectedSize ? 'selected' : ''}" aria-pressed="${size === selectedSize}" data-size="${size}">${size}</button>`).join('')}</div><button id="add-to-bag" class="primary">Add to bag - ${money(product.price)}</button><p class="detail-note">Concept product · USD pricing · No real purchases</p></div></div>`;
  document.querySelectorAll('[data-size]').forEach(button => button.addEventListener('click', () => { selectedSize = button.dataset.size; document.querySelectorAll('[data-size]').forEach(item => { item.classList.toggle('selected', item === button); item.setAttribute('aria-pressed', String(item === button)); }); }));
  document.querySelector('#add-to-bag').addEventListener('click', () => { const existing = cart.find(item => item.id === id && item.size === selectedSize); if (existing) existing.quantity += 1; else cart.push({ id, size: selectedSize, quantity: 1 }); updateCount(); document.querySelector('#product-dialog').close(); showToast(`${product.name} added to your bag`); });
  openDialog('#product-dialog');
}
function updateCount() { document.querySelector('#bag-count').textContent = cart.reduce((sum, item) => sum + item.quantity, 0); }
function renderCart() {
  const container = document.querySelector('#cart-items'); const bottom = document.querySelector('#cart-bottom');
  if (!cart.length) { container.innerHTML = '<p class="empty-bag">A little room for<br>something lovely.</p>'; bottom.innerHTML = '<button class="primary" id="continue-shopping">Explore the collection</button><p>Your bag is empty. This is a simulated shopping experience.</p>'; document.querySelector('#continue-shopping').addEventListener('click', () => { document.querySelector('#cart-dialog').close(); document.querySelector('#collection').scrollIntoView({ behavior: 'smooth' }); }); return; }
  container.innerHTML = cart.map((item, index) => { const product = products.find(p => p.id === item.id); return `<div class="cart-item"><img src="assets/${product.image}.jpg" alt="${product.name}"><div><h3>${product.name}</h3><p>${product.color} / ${item.size}</p><div class="quantity"><button data-quantity="${index}" data-change="-1" aria-label="Decrease quantity of ${product.name}">−</button><span aria-label="Quantity">${item.quantity}</span><button data-quantity="${index}" data-change="1" aria-label="Increase quantity of ${product.name}">+</button></div></div><div class="item-right">${money(product.price * item.quantity)}<button class="remove" data-remove="${index}" aria-label="Remove ${product.name}">Remove</button></div></div>`; }).join('');
  const total = cart.reduce((sum, item) => sum + products.find(p => p.id === item.id).price * item.quantity, 0);
  bottom.innerHTML = `<div class="total"><span>Subtotal</span><strong>${money(total)}</strong></div><button class="primary" id="demo-checkout">Try demo checkout ↗</button><p>USD · Concept pricing. Shipping and tax are not calculated.<br>No payment or personal information is collected.</p>`;
  document.querySelectorAll('[data-quantity]').forEach(button => button.addEventListener('click', () => { const index = Number(button.dataset.quantity); cart[index].quantity += Number(button.dataset.change); if (cart[index].quantity <= 0) cart.splice(index, 1); updateCount(); renderCart(); }));
  document.querySelectorAll('[data-remove]').forEach(button => button.addEventListener('click', () => { cart.splice(Number(button.dataset.remove), 1); updateCount(); renderCart(); }));
  document.querySelector('#demo-checkout').addEventListener('click', () => { container.innerHTML = '<div class="checkout-success" role="status"><p class="eyebrow">THE END OF OUR LITTLE DEMO</p><h3>Good taste.<br>Great company.</h3><p>You’ve completed the concept shopping journey. No order was placed, and no payment was taken.</p><p>Like the experience? There’s more to explore in Lucas’s portfolio.</p></div>'; bottom.innerHTML = '<a class="primary" style="text-align:center" href="../../">Back to the portfolio ↗</a>'; cart.length = 0; updateCount(); });
}
document.querySelector('#open-bag').addEventListener('click', () => { renderCart(); openDialog('#cart-dialog'); });
renderProducts();
