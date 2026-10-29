document.getElementById('year').textContent = new Date().getFullYear();

// English stays in the HTML as the no-JavaScript fallback.
const vietnamese = {
  pageTitle: 'Lucas Nguyen - Kỹ sư AI & lập trình web',
  metaDescription: 'Lucas Nguyen - Kỹ sư AI và lập trình web tại Việt Nam. AI agent, trợ lý AI, website và các concept tương tác.',
  skip: 'Đến nội dung chính',
  logoLabel: 'Lucas Inc., trang chủ',
  darkModeLabel: 'Chế độ tối',
  navLabel: 'Điều hướng chính',
  navHome: 'Trang chủ', navWork: 'Dự án', navAbout: 'Giới thiệu', navHello: 'Liên hệ',
  introGreeting: 'Tớ là Lucas.', introBuild: 'Tớ xây dựng', introAi: 'công cụ AI', introEnd: 'và website.',
  lede: 'Tớ xây dựng AI agent, quy trình LLM cho các đội ngũ, cùng những website nhanh, dễ dùng cho doanh nghiệp trong và ngoài nước.',
  seeWork: 'Xem dự án', aboutLink: 'Một chút về tớ',
  workTitle: 'những concept tớ đã làm', filterLabel: 'Lọc dự án',
  filterAll: 'tất cả', filterFood: 'ăn uống & lưu trú', filterShop: 'cửa hàng', filterProduct: 'sản phẩm & công cụ', filterCreative: 'sáng tạo',
  pulpDescription: 'Website bao bì cho quán cà phê - xem bốn mẫu, chọn bộ dùng thử và xem trước yêu cầu.',
  maiLeDescription: 'Portfolio hoạ sĩ với tranh lơ lửng, phòng tranh, xem thử tranh trên tường và thiệp mời triển lãm.',
  lumiereDescription: 'Website phòng tranh với tranh lụa, khăn lụa, xem thử tác phẩm trên tường và lưu yêu thích.',
  tagArtGallery: 'phòng tranh',
  altLumiere: 'Vùng sống 5, tranh lụa của Nguyễn Văn Trinh cho Lumiere Arts',
  tagArtist: 'portfolio hoạ sĩ',
  parallaxDescription: 'Portfolio cuộn với thư viện ảnh phối cảnh, bốn thế giới ý tưởng và góc thử nghiệm tương tác.',
  tagInteractivePortfolio: 'portfolio tương tác',
  altParallax: 'Portfolio Parallax với thư viện ảnh nghiêng và thông tin dự án theo bố cục biên tập',
  fieldworkDescription: 'Mười một dải kim loại, ba hình thái biến đổi. Xoay tác phẩm, chọn chất liệu và khám phá góc nhìn mới.',
  tagSculpture: 'điêu khắc tương tác',
  altFieldwork: 'Triển lãm điêu khắc Fieldwork với mười một dải kim loại mạ crôm',
  lentoDescription: 'Đèn bàn khớp nối chi tiết trong không gian 3D. Khám phá cơ cấu, chọn màu và tìm ánh sáng của riêng bạn.',
  tagObjectStudy: 'thiết kế sản phẩm tương tác',
  altLento: 'Đèn kim loại khớp nối màu đất nung kẹp vào mép bàn đá',
  natureIslandDescription: 'Một hòn đảo minh hoạ với vịnh nhỏ, đường rừng và lịch trình một ngày theo nhịp điệu của bạn.',
  tagTravel: 'du lịch & khám phá',
  altNatureIsland: 'Hòn đảo minh hoạ màu xanh với đồi san hô, thuyền buồm và ngọn hải đăng sọc đỏ trắng',
  elseformDescription: 'Branding agency tại Sài Gòn với chữ lớn, nhận diện đầy màu sắc và câu chuyện của bốn thương hiệu giả định.',
  tagBranding: 'branding agency',
  altElseform: 'Bao bì LÁ xanh chanh trên nền xanh cobalt cho concept ELSEFORM AGENCY',
  altMaiLe: 'Tranh sơn dầu tạo bằng AI về cửa sổ đầy nắng cho concept hoạ sĩ Mai Lê',
  sereinDescription: 'Một chốn nghỉ bên biển Quy Nhơn. Xem phòng, chọn ngày và thử đặt kỳ nghỉ của bạn.',
  reuDescription: 'Thực đơn cho một căn bếp Hội An, ưu tiên điện thoại - lọc theo chế độ ăn, báo giờ mở cửa và giỏ món mang đi.',
  chamDescription: 'Một cửa hàng quần áo nhuộm chàm, để một sắc xanh tự kể chuyện.',
  mocDescription: 'Một tiệm spa thảo mộc ở Đà Lạt - xem bốn liệu trình, chọn kỹ thuật viên và trải nghiệm đặt lịch.',
  halyardDescription: 'Trang giới thiệu công cụ ghi chú phiên bản - đổi kỳ thanh toán, so sánh gói và giải đáp thắc mắc.',
  orbitDescription: 'Biến số liệu kinh doanh thành bảng tổng quan dễ đọc trong lúc uống cà phê sáng.',
  pipDescription: 'Trợ lý cho quán cà phê, nhà cho thuê và tiệm hoa - hỏi chuyện kinh doanh từ ghi chép của chủ.',
  nepDescription: 'Kho tư liệu kiến trúc yên tĩnh như chính công trình - điều hướng bằng chữ và bản vẽ sơ đồ.',
  hienDescription: 'Portfolio kiến trúc với danh mục công trình theo quy mô và thư viện ảnh từng dự án.',
  tidalDescription: 'Một thử nghiệm lập trình sáng tạo: mặt biển thời gian thực để bạn tự do dạo quanh.',
  halyardTagline: 'ra mắt rồi, kể cho rõ.', pipTagline: 'có gì khó, để Pip lo.',
  tagFoodservice: 'bao bì thực phẩm', tagHospitality: 'lưu trú', tagRestaurant: 'nhà hàng', tagFashion: 'thời trang',
  tagBooking: 'đặt lịch', tagDashboard: 'bảng tổng quan', tagAi: 'giao diện AI', tagArchitecture: 'kiến trúc', tagCreative: 'lập trình sáng tạo',
  conceptNote: 'Đây là các concept tương tác, không có đặt phòng, đơn hàng hay kết quả khách hàng thực tế.',
  aboutTitle: 'một chút về tớ',
  aboutText: 'Tớ là Lucas, lập trình viên tại Việt Nam, hằng ngày làm việc với AI agent, quy trình LLM và các sản phẩm dùng AI. Tớ thích biến ý tưởng hay thành thứ được chăm chút, tải nhanh và dễ dùng - dù trên điện thoại ở quán cà phê hay laptop lúc nửa đêm.',
  serviceAi: 'AI agent & trợ lý AI', serviceWorkflows: 'Quy trình LLM & tích hợp', serviceWeb: 'Website & trang giới thiệu', servicePrototypes: 'Bảng tổng quan & bản mẫu tương tác',
  helloTitle: 'cùng làm một thứ ra trò', helloText: 'Có dự án muốn trao đổi? Kể tớ nghe bạn đang muốn xây gì.', backTop: 'về đầu trang',
  contactReveal: 'Thông tin liên hệ', contactEmail: 'Email', contactPhone: 'Điện thoại',
  contactHint: 'Bấm để sao chép', copyEmail: 'Sao chép email', copyPhone: 'Sao chép số điện thoại',
  copiedEmail: 'Đã sao chép email.', copiedPhone: 'Đã sao chép số điện thoại.', copyError: 'Chưa sao chép được. Bạn hãy chọn nội dung và sao chép thủ công.',
  altPulp: 'Bao bì thực phẩm bằng xơ thực vật định hình', altSerein: 'Hồ bơi vô cực giữa hàng dừa nhìn ra biển',
  altReu: 'Con phố Hội An dưới ánh đèn lồng', altCham: 'Những tấm vải chàm phơi trong khoảng sân đầy nắng', altMoc: 'Ảnh tạo bằng AI về chậu ngâm chân, sả và túi chườm thảo mộc cho concept spa Mộc',
  altNep: 'Nghiên cứu kiến trúc Nếp Architects', altHien: 'Ảnh kiến trúc minh họa Hiên Studio', altTidal: 'Mặt biển trong thử nghiệm Tidal',
};

const languageBindings = [
  ['data-i18n', null], ['data-i18n-label', 'aria-label'], ['data-i18n-alt', 'alt'], ['data-i18n-content', 'content'],
].flatMap(([keyAttribute, targetAttribute]) => [...document.querySelectorAll(`[${keyAttribute}]`)].map(element => ({
  element, targetAttribute, key: element.getAttribute(keyAttribute),
  english: targetAttribute ? element.getAttribute(targetAttribute) : element.textContent,
})));
const languageSwitch = document.querySelector('.language-switch');
const languageLabels = document.querySelectorAll('[data-language]');
function setLanguage(language) {
  document.documentElement.lang = language;
  languageBindings.forEach(({ element, targetAttribute, key, english }) => {
    const value = language === 'vi' ? vietnamese[key] ?? english : english;
    if (targetAttribute) element.setAttribute(targetAttribute, value);
    else element.textContent = value;
  });
  languageLabels.forEach(label => label.classList.toggle('is-active', label.dataset.language === language));
  languageSwitch.setAttribute('aria-label', language === 'vi' ? 'Chuyển sang tiếng Anh' : 'Switch to Vietnamese');
  updateThemeControl();
}

const themeToggle = document.querySelector('.theme-toggle');
let savedTheme;
try { savedTheme = localStorage.getItem('lucas-portfolio-theme'); } catch {}
function updateThemeControl() {
  const dark = document.documentElement.dataset.theme === 'dark';
  const vi = document.documentElement.lang === 'vi';
  themeToggle.setAttribute('aria-pressed', String(dark));
  themeToggle.title = vi ? (dark ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối') : (dark ? 'Switch to light mode' : 'Switch to dark mode');
}
function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#1b201e' : '#f1efe9';
  updateThemeControl();
}
setTheme(savedTheme === 'dark' ? 'dark' : 'light');
themeToggle.hidden = false;
themeToggle.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  setTheme(theme);
  try { localStorage.setItem('lucas-portfolio-theme', theme); } catch {}
});

let savedLanguage;
try { savedLanguage = localStorage.getItem('lucas-portfolio-language'); } catch {}
setLanguage(savedLanguage === 'en' ? 'en' : 'vi');
languageSwitch.hidden = false;
languageSwitch.addEventListener('click', () => {
  const language = document.documentElement.lang === 'en' ? 'vi' : 'en';
  setLanguage(language);
  try { localStorage.setItem('lucas-portfolio-language', language); } catch {}
});

// hide card images until loaded so alt text never flashes
document.querySelectorAll('.card-image img').forEach(image => {
  if (image.complete) return;
  image.classList.add('is-loading');
  const reveal = () => image.classList.remove('is-loading');
  image.addEventListener('load', reveal, { once: true });
  image.addEventListener('error', reveal, { once: true });
});

// project filters
const chips = document.querySelectorAll('.chip');
const cards = document.querySelectorAll('.card');
chips.forEach(chip => chip.addEventListener('click', () => {
  chips.forEach(other => other.setAttribute('aria-pressed', String(other === chip)));
  const filter = chip.dataset.filter;
  cards.forEach(card => { card.hidden = card.hasAttribute('data-unlisted') || (filter !== 'all' && !card.dataset.tags.split(' ').includes(filter)); });
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

// Decode only on request to deter basic address scrapers. This is obfuscation,
// not access control: bots that execute JavaScript can still retrieve the details.
const contactToggle = document.querySelector('.contact-toggle');
const contactDetails = document.getElementById('contact-details');
let contactReady = false;
contactToggle.hidden = false;
contactToggle.addEventListener('click', () => {
  if (!contactReady) {
    const email = atob('bHVjYXNuZ3V5ZW4uc2hAZ21haWwuY29t');
    const phone = atob('Kzg0IDk4NCA5ODMgODcx');
    document.querySelector('#contact-email .contact-value').textContent = email;
    document.querySelector('#contact-phone .contact-value').textContent = phone;
    contactReady = true;
  }
  const expanded = contactToggle.getAttribute('aria-expanded') !== 'true';
  contactToggle.setAttribute('aria-expanded', String(expanded));
  contactDetails.hidden = !expanded;
});

const contactCopyButtons = document.querySelectorAll('.contact-copy');
const contactFeedback = document.querySelectorAll('[data-contact-feedback]');
let copyFeedbackTimer;
const pendingCopies = new WeakSet();
function clearCopyFeedback() {
  contactFeedback.forEach(message => { message.hidden = true; });
  contactCopyButtons.forEach(button => {
    button.querySelector('[data-copy-icon]').textContent = '⧉';
  });
}
contactCopyButtons.forEach(button => button.addEventListener('click', async () => {
  if (pendingCopies.has(button)) return;
  pendingCopies.add(button);
  clearTimeout(copyFeedbackTimer);
  clearCopyFeedback();
  try {
    await navigator.clipboard.writeText(button.querySelector('.contact-value').textContent);
    button.querySelector('[data-copy-icon]').textContent = '✓';
    const field = button.id === 'contact-email' ? 'email' : 'phone';
    document.querySelector(`[data-contact-feedback="${field}"]`).hidden = false;
    copyFeedbackTimer = setTimeout(clearCopyFeedback, 2500);
  } catch {
    document.querySelector('[data-contact-feedback="error"]').hidden = false;
  } finally {
    pendingCopies.delete(button);
  }
}));
