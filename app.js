document.getElementById('year').textContent = new Date().getFullYear();

// English stays in the HTML as the no-JavaScript fallback.
const vietnamese = {
  pageTitle: 'Lucas Nguyen - Kỹ sư AI & lập trình web',
  metaDescription: 'Lucas Nguyen - Kỹ sư AI và lập trình web tại Việt Nam. AI agent, trợ lý AI, website và 11 concept tương tác.',
  skip: 'Đến nội dung chính',
  logoLabel: 'Lucas Inc., trang chủ',
  darkModeLabel: 'Chế độ tối',
  navLabel: 'Điều hướng chính',
  navHome: 'Trang chủ', navWork: 'Dự án', navAbout: 'Giới thiệu', navHello: 'Liên hệ',
  introStart: 'Mình là Lucas. Mình làm ', introAi: 'công cụ AI', introEnd: ' và website.',
  lede: 'Mình làm AI agent, quy trình LLM cho các đội ngũ, cùng những website nhanh, dễ dùng cho doanh nghiệp trong và ngoài nước.',
  seeWork: 'Xem dự án', aboutLink: 'Một chút về mình →',
  workTitle: 'những concept mình đã làm', filterLabel: 'Lọc dự án',
  filterAll: 'tất cả', filterFood: 'ăn uống & lưu trú', filterShop: 'cửa hàng', filterProduct: 'sản phẩm & công cụ', filterCreative: 'sáng tạo',
  pulpDescription: 'Website bao bì cho quán cà phê - xem bốn mẫu, chọn bộ dùng thử và xem trước yêu cầu.',
  sereinDescription: 'Ngôi nhà ba phòng bên vách biển Quy Nhơn, xoay quanh giờ sau hoàng hôn - giờ mặt trời lặn thực tế và lịch chọn đêm nghỉ.',
  reuDescription: 'Thực đơn cho một căn bếp Hội An, ưu tiên điện thoại - lọc theo chế độ ăn, báo giờ mở cửa và giỏ món mang đi.',
  atelierDescription: 'Một cửa hàng thời trang nhẹ nhàng, nhường chỗ cho quần áo kể chuyện.',
  emberDescription: 'Trải nghiệm đặt lịch nhà tắm Đà Lạt - chọn liệu trình, kỹ thuật viên, giờ hẹn và xem lại thông tin.',
  halyardDescription: 'Trang giới thiệu công cụ ghi chú phiên bản - đổi kỳ thanh toán, so sánh gói và giải đáp thắc mắc.',
  orbitDescription: 'Biến số liệu kinh doanh thành bảng tổng quan dễ đọc trong lúc uống cà phê sáng.',
  lumenDescription: 'Bản mẫu trợ lý nghiên cứu có dẫn nguồn - tìm kiếm, đọc, kiểm chứng rồi mới trả lời.',
  formaDescription: 'Kho tư liệu kiến trúc yên tĩnh như chính công trình - điều hướng bằng chữ và bản vẽ sơ đồ.',
  hienDescription: 'Dựng lại một phần website kiến trúc mình từng làm - phân loại theo quy mô, slideshow dự án, có tiếng Anh và tiếng Việt.',
  tidalDescription: 'Một thử nghiệm lập trình sáng tạo: mặt biển thời gian thực để bạn tự do dạo quanh.',
  halyardTagline: 'ra mắt rồi, kể cho rõ.', lumenTagline: 'hôm nay mình tìm hiểu gì nhỉ?',
  tagFoodservice: 'bao bì thực phẩm', tagHospitality: 'lưu trú', tagRestaurant: 'nhà hàng', tagFashion: 'thời trang',
  tagBooking: 'đặt lịch', tagDashboard: 'bảng tổng quan', tagAi: 'giao diện AI', tagArchitecture: 'kiến trúc', tagCreative: 'lập trình sáng tạo',
  conceptNote: 'Đây đều là concept tự thực hiện với thương hiệu giả định, không có đặt phòng, đơn hàng hay kết quả khách hàng thực tế.',
  aboutTitle: 'một chút về mình',
  aboutText: 'Mình là Lucas, lập trình viên tại Việt Nam, hằng ngày làm việc với AI agent, quy trình LLM và các sản phẩm dùng AI. Mình thích biến ý tưởng hay thành thứ được chăm chút, tải nhanh và dễ dùng - dù trên điện thoại ở quán cà phê hay laptop lúc nửa đêm.',
  serviceAi: 'AI agent & trợ lý AI', serviceWorkflows: 'Quy trình LLM & tích hợp', serviceWeb: 'Website & trang giới thiệu', servicePrototypes: 'Bảng tổng quan & bản mẫu tương tác',
  helloTitle: 'cùng làm một thứ ra trò', helloText: 'Mình nhận hợp tác freelance. Thông tin liên hệ sẽ có sớm.', backTop: 'về đầu trang ↑',
  altPulp: 'Bao bì thực phẩm bằng xơ thực vật định hình', altSerein: 'Mặt biển lúc chạng vạng, ngay sau hoàng hôn',
  altReu: 'Con phố Hội An dưới ánh đèn lồng', altAtelier: 'Bộ ảnh thời trang Atelier', altEmber: 'Rừng thông trong sương, ảnh mở đầu concept nhà tắm Ember',
  altForma: 'Nghiên cứu kiến trúc Forma', altHien: 'Ảnh kiến trúc minh họa Hiên Studio', altTidal: 'Mặt biển trong thử nghiệm Tidal',
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
