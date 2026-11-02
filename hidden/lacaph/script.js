(() => {
  'use strict';
  const products = {
    set: {
      label: 'PHA & THƯỞNG THỨC', name: 'Lacàph Vietnamese Phin Coffee Set',
      title: 'Pha một phin, ngồi lại một chút.',
      description: 'Signature Phin Blend đi cùng Microfilter Phin Brewer. Một bộ quà dành cho người thích tự pha ly cà phê buổi sáng.',
      image: 'set', alt: 'Bộ quà Vietnamese Phin Coffee Set của Lacàph',
      url: 'https://www.lacaph.com/all-products/gifting-bundles/lacaph-vietnamese-phin-coffee-set'
    },
    phin: {
      label: 'CHO NGƯỜI MÊ PHA PHIN', name: 'Lacàph Microfilter Phin Brewer',
      title: 'Một chiếc phin, bao buổi sáng.',
      description: 'Dáng phin quen thuộc, thêm lớp lọc kim loại mịn. Món quà nhỏ cho người đã có loại cà phê yêu thích của riêng mình.',
      image: 'phin', alt: 'Phin Microfilter Lacàph màu vàng cùng hộp và túi vải',
      url: 'https://www.lacaph.com/all-products/gifting-bundles/microfilter-phin-brewer'
    },
    book: {
      label: 'CHO NGƯỜI THÍCH KHÁM PHÁ', name: 'Đặc Đen Đắng: The Vietnamese Coffee Book',
      title: 'Thêm một trang, thêm một chuyện.',
      description: '224 trang về cà phê Việt Nam: lịch sử, những quán lâu đời và những người làm nghề. Để đọc cùng một ly cà phê mới pha.',
      image: 'book-cutout', alt: 'Bìa trước và bìa sau cuốn Đặc Đen Đắng',
      url: 'https://www.lacaph.com/all-products/gifting-bundles/dac-den-dang-the-vietnamese-coffee-book'
    }
  };
  const dialog = document.querySelector('#note-dialog');
  const message = document.querySelector('#gift-message');
  const recipient = document.querySelector('#recipient');
  const copyStatus = document.querySelector('#copy-status');
  let activeProduct = 'set';
  let previousFocus = null;
  const imageSources = {"phin-cutout": "assets/phin-cutout-480.webp 375w", "set-cutout": "assets/set-cutout-480.webp 480w, assets/set-cutout-1000.webp 769w", "phin-detail": "assets/phin-detail-480.webp 480w, assets/phin-detail-1000.webp 800w", "set": "assets/set-480.webp 480w, assets/set-1000.webp 1000w", "phin": "assets/phin-480.webp 480w, assets/phin-1000.webp 900w", "book-cutout": "assets/book-cutout-480.webp 480w, assets/book-cutout-1000.webp 1000w"};
  const imageLoads = new Map();
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let ritualAnimation;
  function prepareImage(base, sizes) {
    const key = base + sizes;
    if (imageLoads.has(key)) return imageLoads.get(key);
    const image = new Image();
    image.sizes = sizes;
    image.srcset = imageSources[base];
    image.src = `assets/${base}-1000.webp`;
    const ready = image.decode().catch(error => { imageLoads.delete(key); throw error; });
    imageLoads.set(key, ready);
    return ready;
  }
  function assignImage(image, base, sizes, alt) {
    image.sizes = sizes;
    image.srcset = imageSources[base];
    image.src = `assets/${base}-1000.webp`;
    image.alt = alt;
  }
  let giftRequest = 0;
  const giftSizes = '(max-width:800px) 250px, 370px';
  document.querySelector('#gift-select').addEventListener('change', async event => {
    const key = event.target.value;
    const request = ++giftRequest;
    const status = document.querySelector('#gift-status');
    const product = products[key];
    status.textContent = 'Đang xem món quà…';
    try { await prepareImage(product.image, giftSizes); }
    catch {
      if (request !== giftRequest) return;
      event.target.value = activeProduct;
      status.textContent = 'Chưa tải được ảnh. Chọn lại món quà để thử lại.';
      return;
    }
    if (request !== giftRequest) return;
    activeProduct = key;
    assignImage(document.querySelector('#gift-image'), product.image, giftSizes, product.alt);
    document.querySelector('#official-product').href = product.url;
    document.querySelector('#note-product').textContent = product.name;
    status.textContent = '';
  });
  const ritualSteps = [
    {kicker:'MICROFILTER PHIN BREWER', title:'Quen dáng. Mịn từng giọt.', description:'Lacàph giữ lại dáng phin quen thuộc và thêm một lớp lọc kim loại mịn. Đặt phin lên ly, dành một chút thời gian cho cà phê.', label:'ĐIỂM KHÁC BIỆT', value:'Lớp lọc Microfilter', image:'phin-cutout', link:'Xem chiếc phin', url:products.phin.url},
    {kicker:'SIGNATURE PHIN BLEND', title:'Đậm vị. Vừa quen, vừa mới.', description:'Signature Phin Blend có hương sôcôla đen, hạt phỉ và chút chua nhẹ của trái cây. Pha cùng Microfilter Phin Brewer trong bộ quà cà phê Việt Nam.', label:'HƯƠNG VỊ', value:'Sôcôla đen · Hạt phỉ', image:'set-cutout', link:'Xem bộ pha phin', url:products.set.url},
    {kicker:'VIETNAMESE BLACK COFFEE', title:'Chờ cà phê. Thêm chút chuyện.', description:'Thử công thức cà phê đen Việt Nam của Lacàph. Chuẩn bị chiếc ly yêu thích, xem hướng dẫn rồi tự pha một phin cho mình.', label:'CÔNG THỨC LACÀPH', value:'Cà phê đen Việt Nam', image:'phin-detail', link:'Xem công thức pha', url:'https://www.lacaph.com/coffee-recipes/vietnamese-black-coffee'}
  ];
  const stepButtons = [...document.querySelectorAll('.ritual-nav [data-step]')];
  const mobileLayout = window.matchMedia('(max-width: 800px)');
  function updateTabOrientation() {
    document.querySelector('.ritual-nav').setAttribute('aria-orientation', mobileLayout.matches ? 'horizontal' : 'vertical');
  }
  mobileLayout.addEventListener('change', updateTabOrientation);
  updateTabOrientation();
  let currentStep = 0;
  const ritualSizes = '(max-width:800px) 300px, (max-width:1100px) 36vw, 490px';
  const ritualImage = document.querySelector('#ritual-image');
  assignImage(ritualImage, 'phin-cutout', ritualSizes, products.phin.alt);
  let stepRequest = 0;
  async function changeStep(index, focus = false) {
    const step = ritualSteps[index];
    const request = ++stepRequest;
    const panel = document.querySelector('#ritual-panel');
    const status = document.querySelector('#ritual-status');
    if (focus) stepButtons[index].focus({preventScroll:true});
    panel.setAttribute('aria-busy','true');
    status.textContent = 'Đang mở bước tiếp theo…';
    try { await prepareImage(step.image, ritualSizes); }
    catch {
      if (request !== stepRequest) return;
      panel.setAttribute('aria-busy','false');
      status.textContent = 'Chưa tải được ảnh. Chọn lại bước để thử lại.';
      return;
    }
    if (request !== stepRequest) return;
    currentStep = index;
    document.querySelector('.brew-room').dataset.step = index;
    stepButtons.forEach((button, i) => {
      button.classList.toggle('is-active', i === index);
      button.setAttribute('aria-selected', String(i === index));
      button.tabIndex = i === index ? 0 : -1;
      if (focus && i === index) button.focus();
    });
    document.querySelector('#ritual-panel').setAttribute('aria-labelledby', `ritual-tab-${index}`);
    document.querySelector('#ritual-kicker').textContent = step.kicker;
    document.querySelector('#ritual-title').textContent = step.title;
    document.querySelector('#ritual-description').textContent = step.description;
    document.querySelector('#fact-label').textContent = step.label;
    document.querySelector('#fact-value').textContent = step.value;
    assignImage(ritualImage, step.image, ritualSizes, ['Phin Microfilter Lacàph cùng hộp và túi vải', 'Bộ quà cà phê phin Việt Nam của Lacàph', 'Cận cảnh chiếc phin Microfilter Lacàph'][index]);
    const source = document.querySelector('#ritual-source');
    source.href = step.url;
    source.textContent = step.link + ' →';
    document.querySelector('#step-progress').textContent = `0${index + 1} / 03`;
    document.querySelector('#next-step').setAttribute('aria-label', index === 2 ? 'Quay lại bước đầu' : 'Bước tiếp theo');
    panel.setAttribute('aria-busy','false');
    status.textContent = '';
    ritualAnimation?.cancel();
    if (!motion.matches) ritualAnimation = ritualImage.animate([{opacity:.65},{opacity:1}],{duration:280,easing:'cubic-bezier(.16,1,.3,1)'});
  }
  stepButtons.forEach((button, index) => {
    button.addEventListener('click', () => changeStep(index));
    button.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (index + 1) % 3;
      else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (index + 2) % 3;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = 2;
      else return;
      event.preventDefault(); changeStep(next, true);
    });
  });
  document.querySelector('#next-step').addEventListener('click', () => changeStep((currentStep + 1) % 3));

  function updatePreview() {
    document.querySelector('#preview-to').textContent = recipient.value.trim() ? `Gửi ${recipient.value.trim()},` : 'Gửi người mình quý,';
    document.querySelector('#preview-message').textContent = message.value || 'Lời nhắn của bạn sẽ hiện ở đây.';
    document.querySelector('#message-count').textContent = `${message.value.length} / 180`;
    copyStatus.textContent = '';
    document.querySelector('#copy-fallback').hidden = true;
  }
  recipient.addEventListener('input', updatePreview);
  message.addEventListener('input', updatePreview);
  document.querySelectorAll('[data-open-note]').forEach(button => button.addEventListener('click', () => {
    previousFocus = button;
    document.querySelector('#note-product').textContent = products[activeProduct].name;
    updatePreview();
    dialog.showModal();
    document.body.classList.add('dialog-open');
    dialog.scrollTop = 0;
    document.querySelector('#close-note').focus({preventScroll:true});
  }));
  document.querySelector('#close-note').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('dialog-open');
    previousFocus?.focus({preventScroll: true});
  });
  document.querySelectorAll('button[data-color]').forEach(button => button.addEventListener('click', () => {
    document.querySelector('#note-preview').dataset.color = button.dataset.color;
    document.querySelectorAll('button[data-color]').forEach(choice => choice.setAttribute('aria-pressed', String(choice === button)));
  }));
  document.querySelector('#copy-note').addEventListener('click', async () => {
    const text = `${document.querySelector('#preview-to').textContent}\n\n${message.value}`;
    try {
      await navigator.clipboard.writeText(text);
      copyStatus.textContent = 'Đã sao chép. Bạn có thể dán vào lời nhắn của mình.';
    } catch {
      const fallback = document.querySelector('#copy-fallback');
      fallback.value = text;
      fallback.hidden = false;
      fallback.focus();
      fallback.select();
      copyStatus.textContent = 'Lời nhắn đầy đủ đã được chọn bên dưới. Bạn có thể sao chép bằng bàn phím.';
    }
  });
  const ritualObserver = new IntersectionObserver(entries => {
    if (!entries.some(entry => entry.isIntersecting)) return;
    ritualObserver.disconnect();
    ritualSteps.forEach(step => prepareImage(step.image, ritualSizes).catch(() => {}));
  });
  ritualObserver.observe(document.querySelector('.brew-room'));
  const giftObserver = new IntersectionObserver(entries => {
    if (!entries.some(entry => entry.isIntersecting)) return;
    giftObserver.disconnect();
    Object.values(products).forEach(product => prepareImage(product.image, giftSizes).catch(() => {}));
  },{rootMargin:'400px'});
  giftObserver.observe(document.querySelector('#gifts'));
  motion.addEventListener('change', () => { if (motion.matches) ritualAnimation?.cancel(); });
  updatePreview();
})();
