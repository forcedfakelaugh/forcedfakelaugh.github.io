(() => {
  'use strict';
  const vaseSource = 'https://hienvanceramics.com/2021/03/23/binh-bo-o-gom-hien-van/';
  const products = {
    ivory: { name: 'Bình bổ ô', finish: 'Men ngà', category: 'Bình cắm hoa', type: 'Bình bổ ô', image: 'vase-ivory-551.webp', alt: 'Bình bổ ô men ngà cùng hoa loa kèn trắng', description: 'Thân bình chia múi, miệng gợi những cánh sen. Dáng bình bổ ô của Hiên Vân tìm cảm hứng từ gốm thời Lý và Trần. Sắc men ngà nhẹ nhàng bên những cành hoa trắng.', source: vaseSource },
    cup: { name: 'Cốc gốm', finish: 'Men nâu vàng', category: 'Dùng hằng ngày', type: 'Cốc vuốt tay', image: 'cup-1400.webp', alt: 'Chiếc cốc men nâu vàng đặt cạnh bình gốm mộc', description: 'Cốc được vuốt tay trên bàn xoay. Những khác biệt nhỏ ở dáng cốc và màu men khiến mỗi chiếc có một vẻ riêng. Một món gốm để cầm, để dùng, để dần thấy quen.', source: 'https://hienvanceramics.com/2017/05/09/136/' },
    blue: { name: 'Bình bổ ô', finish: 'Men lam', category: 'Bình cắm hoa', type: 'Bình bổ ô', image: 'vase-blue-551.webp', alt: 'Bình bổ ô men lam và những bông sen trắng', description: 'Cùng dáng bình chia múi, sắc men lam tạo nên một cảm giác khác. Trong hình ảnh của xưởng, bình đi cùng sen trắng, đặt trên mặt bàn gỗ giản dị.', source: vaseSource },
    cloud: { name: 'Người trốn trong mây', finish: 'Men tro', category: 'Bình gốm', type: 'Bình họa tiết', image: 'cloud-vases-960.webp', alt: 'Những bình gốm họa tiết người trốn trong mây với nhiều màu men', description: 'Một khuôn mặt thấp thoáng giữa những đám mây. Họa tiết được làm nổi trên thân bình, kết hợp cùng men tro. Mỗi sắc men làm những đường nét ấy hiện lên theo một cách riêng.', source: 'https://hienvanceramics.com/2018/11/06/hoa-tiet-nguoi-tron-trong-may/' },
    green: { name: 'Bình bổ ô', finish: 'Men lục', category: 'Bình cắm hoa', type: 'Bình bổ ô', image: 'vase-green-810.webp', alt: 'Bình bổ ô men lục đặt trong hiên nhà gỗ', description: 'Sắc men lục trên dáng bình bổ ô. Những đường múi dọc thân làm màu men chuyển nhẹ theo ánh sáng. Trong bức ảnh của Hiên Vân, bình mang những cành hoa vào một góc nhà cũ.', source: vaseSource },
    rooster: { name: 'Gà miếng cau', finish: 'Gốm trang trí', category: 'Tượng gốm', type: 'Gà miếng cau', image: 'rooster-1200.webp', alt: 'Gà miếng cau bằng gốm với họa tiết trang trí nhiều màu', description: 'Một chú gà nhỏ, dáng gợi miếng cau quen thuộc. Đây là mẫu gà được Hiên Vân giới thiệu năm 2017, với những đường trang trí và màu men trên thân gốm.', source: 'https://hienvanceramics.com/2017/05/05/ga-mieng-cau-2017/' }
  };
  const selected = new Set();
  const detailDialog = document.querySelector('#product-dialog');
  const selectionDialog = document.querySelector('#selection-dialog');
  const saveButton = document.querySelector('.save-product');
  const selectionItems = document.querySelector('#selection-items');
  let currentProduct = null;
  const dialogTriggers = new Map();
  let toastTimer;

  function notify(message) {
    const toast = document.querySelector('.toast');
    toast.textContent = message;
    toast.classList.add('visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('visible'), 2600);
  }

  function updateSaveButton() {
    const isSelected = selected.has(currentProduct);
    saveButton.setAttribute('aria-pressed', String(isSelected));
    saveButton.replaceChildren(document.createTextNode(isSelected ? 'Đã lưu món gốm này' : 'Lưu món gốm này'));
    const symbol = document.createElement('span');
    symbol.setAttribute('aria-hidden', 'true');
    symbol.textContent = isSelected ? '✓' : '+';
    saveButton.append(symbol);
  }

  function updateCount() {
    document.querySelectorAll('[data-count]').forEach(el => { el.textContent = selected.size; });
    document.querySelector('.selection-open').setAttribute('aria-label', `Xem ${selected.size} món gốm đã chọn`);
  }

  document.querySelectorAll('[data-filter]').forEach(button => {
    button.addEventListener('click', () => {
      const category = button.dataset.filter;
      document.querySelectorAll('[data-filter]').forEach(filter => {
        const active = filter === button;
        filter.classList.toggle('active', active);
        filter.setAttribute('aria-pressed', String(active));
      });
      let visible = 0;
      document.querySelectorAll('.product[data-product]').forEach(card => {
        card.hidden = category !== 'all' && card.dataset.category !== category;
        if (!card.hidden) visible += 1;
      });
      document.querySelector('.product-grid').classList.toggle('is-filtered', category !== 'all');
      document.querySelector('#filter-status').textContent = `Đang hiển thị ${visible} món gốm.`;
    });
  });

  document.querySelectorAll('[data-view]').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('[data-view]').forEach(view => {
        const active = view === button;
        view.classList.toggle('active', active);
        view.setAttribute('aria-pressed', String(active));
      });
      document.querySelector('.product-grid').classList.toggle('is-list', button.dataset.view === 'list');
      document.querySelector('#filter-status').textContent = button.dataset.view === 'list' ? 'Đang xem tư liệu theo mục lục.' : 'Đang xem tư liệu theo cách trưng bày.';
    });
  });

  document.querySelectorAll('[data-product]').forEach(button => {
    button.addEventListener('click', () => {
      currentProduct = button.dataset.product;
      dialogTriggers.set(detailDialog, button);
      document.querySelector('.toast').classList.remove('visible');
      document.querySelector('.toast').textContent = '';
      const product = products[currentProduct];
      document.querySelector('#detail-title').textContent = product.name;
      document.querySelector('#detail-category').textContent = `${product.category} · ${product.finish}`;
      document.querySelector('#detail-description').textContent = product.description;
      document.querySelector('#detail-type').textContent = product.type;
      const image = document.querySelector('#detail-image');
      image.src = `assets/${product.image}`;
      image.alt = product.alt;
      const original = document.querySelector(`.product[data-product="${currentProduct}"] img`);
      image.srcset = original.srcset;
      image.sizes = '(max-width: 760px) calc(100vw - 64px), 560px';
      image.width = original.width;
      image.height = original.height;
      document.querySelector('#detail-source').href = product.source;
      updateSaveButton();
      detailDialog.showModal();
      detailDialog.scrollTop = 0;
      detailDialog.querySelector('.close-dialog').focus({preventScroll:true});
    });
  });

  saveButton.addEventListener('click', () => {
    if (!currentProduct) return;
    if (selected.has(currentProduct)) selected.delete(currentProduct);
    else selected.add(currentProduct);
    updateSaveButton();
    updateCount();
    const product = products[currentProduct];
    notify(selected.has(currentProduct) ? `Đã lưu ${product.name.toLowerCase()}.` : 'Đã bỏ khỏi danh sách.');
  });

  function renderSelection() {
    selectionItems.replaceChildren();
    const preview = document.querySelector('#inquiry-preview');
    preview.hidden = selected.size === 0;
    document.querySelector('#copy-status').textContent = '';
    if (selected.size === 0) {
      const empty = document.createElement('div');
      empty.className = 'empty-selection';
      const text = document.createElement('p');
      text.textContent = 'Chưa có món gốm nào trong danh sách. Bạn cứ xem thong thả rồi lưu lại món mình thích.';
      const browse = document.createElement('button');
      browse.textContent = 'Xem những dáng gốm';
      browse.type = 'button';
      browse.addEventListener('click', () => { selectionDialog.close(); document.querySelector('#gom').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }); });
      empty.append(text, browse);
      selectionItems.append(empty);
      return;
    }
    for (const id of selected) {
      const product = products[id];
      const row = document.createElement('div');
      row.className = 'selected-item';
      const image = document.createElement('img');
      image.src = document.querySelector(`.product[data-product="${id}"] img`).getAttribute('srcset').split(',')[0].trim().split(' ')[0];
      image.alt = '';
      image.width = 65;
      image.height = 70;
      const info = document.createElement('div');
      const title = document.createElement('h3');
      title.textContent = product.name;
      const finish = document.createElement('p');
      finish.textContent = product.finish;
      info.append(title, finish);
      const remove = document.createElement('button');
      remove.type = 'button';
      remove.textContent = 'Bỏ';
      remove.setAttribute('aria-label', `Bỏ ${product.name}, ${product.finish} khỏi danh sách`);
      remove.addEventListener('click', () => {
        selected.delete(id);
        updateCount();
        renderSelection();
        const next = selectionItems.querySelector('button') || selectionDialog.querySelector('.close-dialog');
        next.focus();
      });
      row.append(image, info, remove);
      selectionItems.append(row);
    }
    const names = [...selected].map(id => `${products[id].name} (${products[id].finish.toLowerCase()})`).join(', ');
    document.querySelector('#inquiry-text').value = `Chào Hiên Vân, mình muốn hỏi thêm về ${names}. Xưởng cho mình xin thông tin về kích thước, giá và mẫu hiện có nhé. Cảm ơn xưởng!`;
  }

  document.querySelector('.selection-open').addEventListener('click', () => {
    renderSelection();
    dialogTriggers.set(selectionDialog, document.querySelector('.selection-open'));
    selectionDialog.showModal();
    selectionDialog.scrollTop = 0;
    selectionDialog.querySelector('.close-dialog').focus({preventScroll:true});
  });

  document.querySelectorAll('dialog').forEach(dialog => {
    dialog.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
    dialog.addEventListener('close', () => dialogTriggers.get(dialog)?.focus({preventScroll:true}));
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    });
  });

  document.querySelector('#copy-inquiry').addEventListener('click', async () => {
    const text = document.querySelector('#inquiry-text');
    const status = document.querySelector('#copy-status');
    try {
      if (!navigator.clipboard) throw new Error('Clipboard is not available');
      await navigator.clipboard.writeText(text.value);
      status.textContent = 'Đã sao chép. Bạn có thể gửi lời nhắn qua kênh liên hệ của xưởng.';
    } catch {
      text.focus();
      text.select();
      status.textContent = 'Lời nhắn đã được chọn. Bạn có thể sao chép bằng phím tắt trên thiết bị.';
    }
  });
  updateCount();
})();
