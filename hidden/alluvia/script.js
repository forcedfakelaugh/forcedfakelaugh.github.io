'use strict';
const products = {
  signature: {name: 'Vietnam Signature', lines: ['VIETNAM', 'SIGNATURE'], number: '02', kicker: 'MỘT VIỆT NAM THU NHỎ', description: 'Mang một chút quê nhà đi xa. Những hình vẽ Việt Nam trên chiếc hộp trắng, cùng 16 viên chocolate để chia sẻ.', count: 16, price: 235000, path: 'giftbox-alluvia-16pcs'},
  mekong: {name: 'Mekong Essence', lines: ['MEKONG', 'ESSENCE'], number: '01', kicker: 'GÓI GHÉM CHÂN THÀNH', description: 'Một lời cảm ơn vừa đủ ấm. Hộp quà đỏ, dây buộc mộc và những viên chocolate nhỏ để người nhận nhâm nhi.', count: 9, price: 175000, path: 'mekong-essence-gift-box-alluvia-chocolate-9-pcs'},
  landmark: {name: 'Landmark', lines: ['LANDMARK'], number: '03', kicker: 'MỘT GÓC SÀI GÒN', description: 'Một kỷ niệm từ chuyến đi. Hình chợ Bến Thành in trên hộp đỏ, bên trong là 10 viên chocolate cho những lần nhớ Sài Gòn.', count: 10, price: 150000, path: 'landmark-gift-box-alluvia-chocolate10pcs'},
  napolitan: {name: 'Napolitan', lines: ['NAPOLITAN'], number: '04', kicker: 'NIỀM VUI ĐỂ CHIA NHAU', description: 'Cho buổi gặp mặt thêm ngọt. Mở chiếc hộp vàng, chọn một thanh chocolate và dành phần còn lại cho những câu chuyện.', count: 10, price: 140000, path: 'napolitan-chocolate-box-alluvia-10pcs'}
};
const formatPrice = value => new Intl.NumberFormat('vi-VN').format(value) + 'đ';
const dialog = document.querySelector('#gift-dialog');
const quantity = document.querySelector('#quantity');
const note = document.querySelector('#gift-note');
let currentProduct = products.mekong;
let opener;
let currentKey = 'mekong';
const giftDrafts = new Map();
function updateSummary() {
  const amount = Math.max(1, Math.min(99, Math.trunc(Number(quantity.value) || 1)));
  quantity.value = String(amount);
  document.querySelector('#gift-total').textContent = formatPrice(currentProduct.price * amount);
  document.querySelector('#decrease').disabled = amount <= 1;
  document.querySelector('#increase').disabled = amount >= 99;
}
function updateNote() {
  document.querySelector('#note-count').textContent = String(note.value.length);
  const message = document.querySelector('#gift-message');
  message.textContent = note.value.trim();
  message.hidden = !note.value.trim();
}
document.querySelectorAll('[data-product]').forEach(button => {
  button.addEventListener('click', () => {
    const key = button.dataset.product;
    currentKey = key;
    currentProduct = products[key];
    opener = button;
    document.querySelector('#dialog-title').textContent = currentProduct.name;
    document.querySelector('#selected-description').textContent = `Hộp ${currentProduct.count} viên chocolate`;
    document.querySelector('#selected-price').textContent = formatPrice(currentProduct.price) + ' / hộp';
    const selectedImage = document.querySelector('#selected-image');
    selectedImage.src = `assets/${key}-480.webp`;
    selectedImage.alt = `Hộp quà ${currentProduct.name} của Alluvia`;
    document.querySelector('#official-product').href = 'https://alluviachocolate.com/products/' + currentProduct.path;
    const draft = giftDrafts.get(key);
    quantity.value = draft?.quantity || '1';
    note.value = draft?.note || '';
    updateSummary();
    updateNote();
    dialog.showModal();
    dialog.scrollTop = 0;
    document.body.classList.add('dialog-open');
    document.querySelector('#close-dialog').focus();
  });
});
document.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});
dialog.addEventListener('close', () => {
  giftDrafts.set(currentKey, { quantity: quantity.value, note: note.value });
  document.body.classList.remove('dialog-open');
  if (opener) opener.focus({ preventScroll: true });
});
document.querySelector('#decrease').addEventListener('click', () => { quantity.value = Number(quantity.value) - 1; updateSummary(); });
document.querySelector('#increase').addEventListener('click', () => { quantity.value = Number(quantity.value) + 1; updateSummary(); });
quantity.addEventListener('change', updateSummary);
quantity.addEventListener('input', () => { if (quantity.value !== '') updateSummary(); });
note.addEventListener('input', updateNote);
let selectedShelf = 'mekong';
const shelfTabs = Array.from(document.querySelectorAll('[data-shelf]'));
let shelfRequest = 0;
const shelfLoads = new Map();
const shelfStatus = document.querySelector('#shelf-status');
const shelfStage = document.querySelector('#gift-stage');
const shelfMotion = matchMedia('(prefers-reduced-motion: reduce)');
let shelfAnimation;
function loadShelf(key) {
  if (shelfLoads.has(key)) return shelfLoads.get(key);
  const image = new Image();
  image.sizes = document.querySelector('#shelf-image').sizes;
  image.srcset = `assets/${key}-480.webp 480w, assets/${key}-960.webp 960w`;
  image.src = `assets/${key}-960.webp`;
  const ready = image.decode().catch(error => { shelfLoads.delete(key); throw error; });
  shelfLoads.set(key, ready);
  return ready;
}
async function selectShelf(key, moveFocus = false) {
  const request = ++shelfRequest;
  if (moveFocus) shelfTabs.find(tab => tab.dataset.shelf === key)?.focus({ preventScroll: true });
  shelfStage.setAttribute('aria-busy', 'true');
  shelfStatus.textContent = `Đang mở hộp ${products[key].name}…`;
  try { await loadShelf(key); }
  catch {
    if (request !== shelfRequest) return false;
    shelfStage.setAttribute('aria-busy', 'false');
    shelfStatus.textContent = 'Chưa tải được hình hộp quà. Chọn lại hộp để thử thêm lần nữa.';
    return false;
  }
  if (request !== shelfRequest) return false;
  selectedShelf = key;
  const product = products[key];
  shelfTabs.forEach(tab => {
    const active = tab.dataset.shelf === key;
    tab.classList.toggle('is-selected', active);
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
    if (active && moveFocus) tab.focus({preventScroll: true});
  });
  document.querySelector('#gift-stage').setAttribute('aria-labelledby', 'tab-' + key);
  document.querySelector('#stage-number').textContent = product.number;
  document.querySelector('#shelf-kicker').textContent = product.kicker;
  const heading = document.querySelector('#shelf-name');
  heading.replaceChildren();
  product.lines.forEach((line, index) => {
    if (index) heading.append(document.createElement('br'));
    heading.append(document.createTextNode(line));
  });
  document.querySelector('#shelf-description').textContent = product.description;
  document.querySelector('#shelf-count').textContent = String(product.count).padStart(2, '0') + ' VIÊN / HỘP';
  document.querySelector('#shelf-price').textContent = formatPrice(product.price);
  document.querySelector('#shelf-select').dataset.product = key;
  const image = document.querySelector('#shelf-image');
  image.srcset = `assets/${key}-480.webp 480w, assets/${key}-960.webp 960w`;
  image.src = `assets/${key}-960.webp`;
  image.alt = 'Hộp quà ' + product.name + ' của Alluvia';
  shelfStage.setAttribute('aria-busy', 'false');
  shelfStatus.textContent = '';
  shelfAnimation?.cancel();
  if (!shelfMotion.matches) shelfAnimation = image.animate([{opacity:.7},{opacity:1}], {duration:240,easing:'cubic-bezier(.16,1,.3,1)'});
  return true;
}
shelfTabs.forEach(tab => {
  tab.addEventListener('click', () => selectShelf(tab.dataset.shelf));
  tab.addEventListener('keydown', event => {
    if (!['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const visible = shelfTabs.filter(item => !item.hidden);
    const index = visible.indexOf(tab);
    let next = index;
    if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = visible.length - 1;
    else next = (index + (['ArrowDown', 'ArrowRight'].includes(event.key) ? 1 : -1) + visible.length) % visible.length;
    selectShelf(visible[next].dataset.shelf, true);
    visible[next].scrollIntoView({block: 'nearest', inline: 'nearest', behavior: 'instant'});
  });
});
const mobileShelf = window.matchMedia('(max-width: 1000px)');
function updateShelfOrientation() { document.querySelector('.gift-tabs').setAttribute('aria-orientation', mobileShelf.matches ? 'horizontal' : 'vertical'); }
updateShelfOrientation();
mobileShelf.addEventListener('change', updateShelfOrientation);
let filterRequest = 0;
document.querySelectorAll('[data-budget]').forEach(button => {
  button.addEventListener('click', async () => {
    const request = ++filterRequest;
    const visible = shelfTabs.filter(tab => button.dataset.budget === 'all' || (button.dataset.budget === 'small' ? Number(tab.dataset.price) <= 175000 : Number(tab.dataset.price) > 175000));
    const next = visible.find(tab => tab.dataset.shelf === selectedShelf) || visible[0];
    if (!await selectShelf(next.dataset.shelf)) return;
    if (request !== filterRequest) return;
    document.querySelectorAll('[data-budget]').forEach(option => {
      const active = option === button;
      option.classList.toggle('is-active', active);
      option.setAttribute('aria-pressed', String(active));
    });
    shelfTabs.forEach(tab => { tab.hidden = !visible.includes(tab); });
    document.querySelector('#gift-count').textContent = `${visible.length} lựa chọn cho bạn`;
  });
});
const shelfObserver = new IntersectionObserver(entries => {
  if (!entries.some(entry => entry.isIntersecting)) return;
  shelfObserver.disconnect();
  Object.keys(products).forEach(key => loadShelf(key).catch(() => {}));
}, {rootMargin:'600px'});
shelfObserver.observe(document.querySelector('#gifts'));
shelfMotion.addEventListener('change', () => { if (shelfMotion.matches) shelfAnimation?.cancel(); });
