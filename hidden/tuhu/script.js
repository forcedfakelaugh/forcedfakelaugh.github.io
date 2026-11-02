'use strict';

(() => {
  const colors = {
    yellow: { label: 'Vàng', index: '01' },
    red: { label: 'Đỏ', index: '02' },
    brown: { label: 'Nâu', index: '03' },
    pink: { label: 'Hồng', index: '04' },
    coban: { label: 'Xanh coban', index: '05' }
  };
  const storageKey = 'tuhu-proposal-selection-v1';
  const startingPalette = { yellow: 1, red: 1, pink: 1, coban: 1 };
  let selection = { ...startingPalette };
  let isSuggestion = true;
  let selectedColor = 'coban';
  let quantity = 1;
  let activeBowl = null;
  let layoutOffset = 0;
  let dialogTrigger;
  const image = document.querySelector('#product-image');
  const status = document.querySelector('#selection-status');
  const summary = document.querySelector('#summary-dialog');
  const details = document.querySelector('#details-dialog');
  const table = document.querySelector('#table-items');
  const quantityOutput = document.querySelector('#quantity');
  const less = document.querySelector('#quantity-less');
  const more = document.querySelector('#quantity-more');
  const shuffle = document.querySelector('#shuffle-table');
  const bowlActions = document.querySelector('#bowl-actions');
  const positions = {
    1: [[50, 23]],
    2: [[25, 50], [75, 50]],
    3: [[50, 23], [25, 72], [75, 72]],
    4: [[25, 28], [75, 28], [25, 72], [75, 72]],
    5: [[50, 20], [80, 39], [69, 76], [31, 76], [20, 39]],
    6: [[50, 20], [80, 35], [80, 67], [50, 80], [20, 67], [20, 35]],
    7: [[50, 18], [78, 30], [85, 57], [68, 79], [32, 79], [15, 57], [22, 30]],
    8: [[50, 17], [76, 26], [87, 50], [76, 74], [50, 83], [24, 74], [13, 50], [24, 26]]
  };

  try {
    const raw = localStorage.getItem(storageKey);
    const saved = raw ? JSON.parse(raw) : null;
    if (saved && typeof saved === 'object' && !Array.isArray(saved)) {
      selection = {};
      Object.keys(colors).forEach(key => {
        if (Number.isInteger(saved[key]) && saved[key] > 0 && saved[key] <= 99) selection[key] = saved[key];
      });
      isSuggestion = false;
    }
  } catch (_) { /* The arranger also works without browser storage. */ }
  function save() {
    try { localStorage.setItem(storageKey, JSON.stringify(selection)); } catch (_) { /* Nothing is sent to a server. */ }
  }
  function asset(key, size = 480) { return `assets/hoai-${key}-${size}.webp`; }
  function updateQuantity() {
    quantityOutput.textContent = String(quantity);
    less.disabled = quantity <= 1;
    more.disabled = quantity >= 12;
  }
  function setColor(key) {
    selectedColor = key;
    document.querySelector(`input[name="color"][value="${key}"]`).checked = true;
    image.srcset = `${asset(key)} 480w, ${asset(key, 900)} 900w`;
    image.src = asset(key);
    image.alt = `Chén Hoài màu ${colors[key].label.toLowerCase()}, họa tiết hoa trên nền men kem`;
    document.querySelector('#color-label').textContent = colors[key].label.toLowerCase();
    document.querySelector('#color-index').textContent = colors[key].index;
  }
  function deselect() {
    activeBowl = null;
    bowlActions.hidden = true;
    table.querySelectorAll('.table-bowl').forEach(button => button.setAttribute('aria-pressed', 'false'));
  }
  function placeElement(element, index, count) {
    const point = positions[count][(index + layoutOffset) % count];
    element.style.setProperty('--x', `${point[0]}%`);
    element.style.setProperty('--y', `${point[1]}%`);
    element.style.setProperty('--rotation', `${index % 2 ? 6 : -6}deg`);
  }
  function visibleColors(keys) {
    const result = [];
    let level = 0;
    while (result.length < 8) {
      let found = false;
      keys.forEach(key => {
        if (selection[key] > level && result.length < 8) { result.push(key); found = true; }
      });
      if (!found) break;
      level++;
    }
    return result;
  }

  function render() {
    deselect();
    const keys = Object.keys(colors).filter(key => selection[key]);
    const total = keys.reduce((sum, key) => sum + selection[key], 0);
    const visible = visibleColors(keys);
    document.querySelectorAll('[data-total]').forEach(node => { node.textContent = String(total); });
    document.querySelector('#table-title').textContent = total ? `${isSuggestion ? 'Gợi ý: ' : ''}${total} chén · ${keys.length} màu` : 'Bàn đang trống';
    document.querySelector('#table-description').textContent = total ? 'Mỗi người một màu. Cả nhà một bàn.' : 'Chọn một màu để bắt đầu nhé.';
    document.querySelector('#table-corner-note').textContent = total > 8 ? `Đang bày 8 / ${total} chén. Xem đủ trong bộ chén của bạn.` : 'Phối màu bằng ảnh sản phẩm thật';
    shuffle.disabled = visible.length < 2;
    table.dataset.visibleCount = String(visible.length);
    table.replaceChildren();
    if (!total) {
      for (let index = 0; index < 4; index++) {
        const place = document.createElement('span'); place.className = 'empty-place'; place.setAttribute('aria-hidden', 'true');
        placeElement(place, index, 4); table.append(place);
      }
    }
    visible.forEach((key, index) => {
      const bowl = document.createElement('button');
      bowl.type = 'button'; bowl.className = 'table-bowl'; bowl.dataset.bowlIndex = String(index); bowl.dataset.bowlColor = key;
      bowl.setAttribute('aria-label', `Chén ${index + 1}, Hoài ${colors[key].label.toLowerCase()}. Chọn để xem hoặc bỏ chiếc này.`);
      bowl.setAttribute('aria-pressed', 'false');
      placeElement(bowl, index, visible.length);
      const frame = document.createElement('span'); frame.className = 'bowl-image';
      const photo = document.createElement('img'); photo.src = asset(key); photo.alt = ''; photo.width = 480; photo.height = 480;
      frame.append(photo);
      const label = document.createElement('span'); label.className = 'bowl-label'; label.textContent = colors[key].label; label.setAttribute('aria-hidden', 'true');
      bowl.append(frame, label); table.append(bowl);
    });
    const rows = document.querySelector('#summary-items'); rows.replaceChildren();
    if (!total) {
      const empty = document.createElement('p'); empty.className = 'summary-empty'; empty.textContent = 'Bàn còn trống. Chọn màu bạn thích, hoặc thử gợi ý phối 4 màu nhé.'; rows.append(empty);
    }
    keys.forEach(key => {
      const row = document.createElement('div'); row.className = 'summary-row';
      const photo = document.createElement('img'); photo.src = asset(key); photo.alt = ''; photo.width = 70; photo.height = 70;
      const text = document.createElement('div');
      const title = document.createElement('h3'); title.textContent = `Hoài ${colors[key].label.toLowerCase()}`;
      const count = document.createElement('p'); count.textContent = `${selection[key]} chiếc chén`;
      text.append(title, count);
      const remove = document.createElement('button'); remove.type = 'button'; remove.className = 'remove-item'; remove.dataset.remove = key; remove.textContent = 'Bỏ màu này'; remove.setAttribute('aria-label', `Bỏ tất cả chén màu ${colors[key].label.toLowerCase()}`);
      row.append(photo, text, remove); rows.append(row);
    });
    document.querySelector('#clear-selection').disabled = !total;
  }

  less.addEventListener('click', () => { quantity = Math.max(1, quantity - 1); updateQuantity(); });
  more.addEventListener('click', () => { quantity = Math.min(12, quantity + 1); updateQuantity(); });
  document.querySelectorAll('input[name="color"]').forEach(input => input.addEventListener('change', () => {
    deselect(); setColor(input.value);
    status.textContent = `Đang chọn màu ${colors[selectedColor].label.toLowerCase()}. Thêm mấy chiếc vào bàn nào?`;
  }));
  document.querySelector('#add-selection').addEventListener('click', () => {
    const previous = selection[selectedColor] || 0;
    const added = Math.min(quantity, 99 - previous);
    selection[selectedColor] = previous + added;
    isSuggestion = false; save(); render();
    status.textContent = added ? `Đã bày thêm ${added} chén màu ${colors[selectedColor].label.toLowerCase()}.` : 'Bàn đã có 99 chén màu này. Thử thêm màu khác nhé.';
  });
  document.querySelector('#suggest-palette').addEventListener('click', () => {
    selection = { ...startingPalette }; isSuggestion = true; layoutOffset = 0; save(); render();
    status.textContent = 'Gợi ý 4 chiếc chén, 4 màu khác nhau. Bạn có thể thêm hoặc bớt từng chiếc.';
  });
  shuffle.addEventListener('click', () => {
    const bowls = [...table.querySelectorAll('.table-bowl')];
    layoutOffset = (layoutOffset + 1) % bowls.length;
    bowls.forEach((bowl, index) => placeElement(bowl, index, bowls.length));
    status.textContent = 'Đã đổi vị trí các chén trên bàn. Màu và số lượng vẫn giữ nguyên.';
  });
  table.addEventListener('click', event => {
    const bowl = event.target.closest('.table-bowl'); if (!bowl) return;
    const alreadySelected = bowl.getAttribute('aria-pressed') === 'true';
    deselect(); if (alreadySelected) return;
    activeBowl = bowl.dataset.bowlColor;
    bowl.setAttribute('aria-pressed', 'true'); setColor(activeBowl);
    document.querySelector('#active-bowl-label').textContent = `Hoài ${colors[activeBowl].label.toLowerCase()}`;
    bowlActions.hidden = false;
    status.textContent = `Đã chọn một chén màu ${colors[activeBowl].label.toLowerCase()} trên bàn.`;
  });
  document.querySelector('#remove-bowl').addEventListener('click', () => {
    if (!activeBowl) return;
    const key = activeBowl;
    selection[key]--;
    if (!selection[key]) delete selection[key];
    isSuggestion = false; save(); render();
    status.textContent = `Đã bỏ một chén màu ${colors[key].label.toLowerCase()}.`;
    const nextBowl = table.querySelector('.table-bowl');
    (nextBowl || document.querySelector('#add-selection')).focus();
  });
  document.querySelector('#deselect-bowl').addEventListener('click', () => {
    const current = table.querySelector('[aria-pressed="true"]'); deselect(); if (current) current.focus();
  });
  document.querySelector('#summary-items').addEventListener('click', event => {
    const button = event.target.closest('[data-remove]'); if (!button) return;
    const label = colors[button.dataset.remove].label.toLowerCase();
    delete selection[button.dataset.remove]; isSuggestion = false; save(); render();
    summary.querySelector('[data-close]').focus(); status.textContent = `Đã bỏ tất cả chén màu ${label}.`;
  });
  document.querySelector('#clear-selection').addEventListener('click', () => {
    selection = {}; isSuggestion = false; save(); render();
    summary.querySelector('[data-close]').focus(); status.textContent = 'Đã dọn bàn. Bắt đầu lại với màu bạn thích nhé.';
  });
  function openDialog(dialog, trigger) {
    dialogTrigger = trigger; dialog.showModal(); dialog.scrollTop = 0; document.body.classList.add('dialog-open'); dialog.querySelector('[data-close]').focus({preventScroll:true});
  }
  document.querySelectorAll('[data-open-summary]').forEach(button => button.addEventListener('click', () => openDialog(summary, button)));
  document.querySelectorAll('[data-open-details]').forEach(button => button.addEventListener('click', event => openDialog(details, event.currentTarget)));
  document.querySelectorAll('dialog').forEach(dialog => {
    dialog.querySelector('[data-close]').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    });
    dialog.addEventListener('close', () => { document.body.classList.remove('dialog-open'); if (dialogTrigger) dialogTrigger.focus({preventScroll:true}); });
  });
  const paletteObserver = new IntersectionObserver(entries => {
    if (!entries.some(entry => entry.isIntersecting)) return;
    paletteObserver.disconnect();
    Object.keys(colors).forEach(key => { const preview = new Image(); preview.src = asset(key); });
  }, {rootMargin:'400px'});
  paletteObserver.observe(document.querySelector('#hoai'));
  render();
  if (isSuggestion) status.textContent = 'Bắt đầu với gợi ý 4 màu. Cứ thêm, bớt theo ý bạn nhé.';
})();
