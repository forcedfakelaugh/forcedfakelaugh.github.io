(() => {
  'use strict';
  const roasts = {
    light: { method: 'Pour-over', label: 'Rang sáng', name: 'City roast', taste: 'Quế · Cam chanh · Hạnh nhân', level: 1 },
    medium: { method: 'Espresso / Drip', label: 'Rang vừa', name: 'Vienna roast', taste: 'Caramel · Hạnh nhân · Sô-cô-la', level: 2 },
    dark: { method: 'French press', label: 'Rang đậm', name: 'French roast', taste: 'Sô-cô-la đen · Khói · Mạch nha', level: 3 }
  };
  const prices = { 250: 200000, 500: 400000, 1000: 800000 };
  const state = { roast: 'light', size: 250, quantity: 1 };
  const money = amount => new Intl.NumberFormat('vi-VN').format(amount) + ' đ';
  const $ = selector => document.querySelector(selector);
  const dialog = $('#coffee-dialog');
  function render() {
    const roast = roasts[state.roast];
    document.querySelectorAll('[data-roast]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.roast === state.roast)));
    document.querySelectorAll('[data-size]').forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.size) === state.size)));
    $('#roast-label').textContent = roast.label.toLocaleUpperCase('vi');
    $('#roast-name').textContent = roast.name;
    $('#roast-taste').textContent = roast.taste;
    document.querySelectorAll('.roast-scale span').forEach((bar, index) => bar.classList.toggle('active', index < roast.level));
    $('#quantity').textContent = state.quantity;
    $('#decrease').disabled = state.quantity === 1;
    $('#increase').disabled = state.quantity === 10;
    $('#total').textContent = money(prices[state.size] * state.quantity);
  }
  document.querySelectorAll('[data-roast]').forEach(button => button.addEventListener('click', () => { state.roast = button.dataset.roast; render(); }));
  document.querySelectorAll('[data-size]').forEach(button => button.addEventListener('click', () => { state.size = Number(button.dataset.size); render(); }));
  $('#decrease').addEventListener('click', () => { state.quantity = Math.max(1, state.quantity - 1); render(); });
  $('#increase').addEventListener('click', () => { state.quantity = Math.min(10, state.quantity + 1); render(); });
  $('#preview-button').addEventListener('click', () => {
    const roast = roasts[state.roast];
    $('#summary-method').textContent = roast.method;
    $('#summary-roast').textContent = roast.label + ' (' + roast.name + ')';
    $('#summary-size').textContent = (state.size === 1000 ? '1 kg' : state.size + ' g') + ' × ' + state.quantity + ' túi';
    $('#summary-total').textContent = money(prices[state.size] * state.quantity);
    dialog.showModal();
    dialog.scrollTop = 0;
    $('#close-dialog').focus({preventScroll:true});
    document.body.style.overflow = 'hidden';
  });
  $('#close-dialog').addEventListener('click', () => dialog.close());
  $('#edit-choice').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => { document.body.style.overflow = ''; $('#preview-button').focus({ preventScroll: true }); });
  render();
})();
