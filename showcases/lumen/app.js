'use strict';
// Fictional examples for a single owner with a café and one holiday rental.
const notes = {
  cafeFeedback:{business:'coffee',kind:'Customer reviews',title:'What café customers are saying',meta:'Mira Coffee · September · 52 reviews',body:['<mark>16 of 52 reviews mention a long wait, usually between 7:30 and 9:00.</mark>','12 reviews praise the oat-milk flat white.','One regular wrote: “Love the coffee. Wish ordering before work was quicker.”']},
  cafePlan:{business:'coffee',kind:'Owner’s notes',title:'Ideas for the morning rush',meta:'Mira Coffee · September 28',body:['<mark>Try a dedicated person on the till from 7:30 to 9:00 for one week.</mark>','Mark a separate pickup spot so people collecting drinks do not block the queue.','Keep the drinks menu unchanged during the trial so we can compare wait times.']},
  cafeSales:{business:'coffee',kind:'Sales & expenses',title:'September café numbers',meta:'Mira Coffee · Monthly spreadsheet',body:['<mark>Sales: 112M₫. Ingredients: 36M₫. Rent: 18M₫. Wages: 32M₫. Other recorded costs: 8M₫.</mark>','18M₫ remains after these recorded costs.','The sheet does not include tax, the owner’s pay, or any costs that have not been entered.']},
  coldBrew:{business:'coffee',kind:'Cost sheet',title:'Bottled cold brew trial',meta:'Mira Coffee · 250 ml bottles',body:['<mark>Ingredients and packaging cost 21,400₫ per bottle. Proposed shelf price: 55,000₫.</mark>','Labour, rent and other overheads are not included in the bottle cost.','Start with 30 bottles for a weekend trial and record how many sell.']},
  bookings:{business:'rental',kind:'Booking calendar',title:'September stays',meta:'Garden House · One two-bedroom holiday rental',body:['<mark>9 of 20 available weekday nights booked. All 8 available weekend nights booked.</mark>','Two weekday nights were blocked for maintenance, leaving 28 available nights in total.','17 nights booked out of 28 available.']},
  enquiries:{business:'rental',kind:'Guest messages',title:'Recent booking enquiries',meta:'Garden House · September · 7 weekday enquiries',body:['<mark>7 people asked about weekday stays; 2 went on to book.</mark>','3 asked whether the Wi-Fi was reliable enough for working.','2 asked for a price for a three-night stay. There is no longer-stay offer yet.']},
  rates:{business:'rental',kind:'Price list',title:'Garden House nightly rates',meta:'Garden House · Current sample rates',body:['Weekday night: 1.4M₫. Weekend night: 2.1M₫.','<mark>There is no special rate for stays of three nights or longer.</mark>','Cleaning costs 250,000₫ per stay and is covered by the nightly price. Booking platform fees vary.']},
  guestReviews:{business:'rental',kind:'Guest reviews',title:'What Garden House guests are saying',meta:'Garden House · 18 recent reviews',body:['Average guest rating: 4.7 / 5. Guests often mention the quiet garden.','<mark>5 of the 18 reviews mention unreliable Wi-Fi in the upstairs bedroom.</mark>','One guest wrote: “Lovely quiet house, but the Wi-Fi kept dropping upstairs when I tried to work.”']},
  repairs:{business:'rental',kind:'Maintenance notes',title:'House repairs & quotes',meta:'Garden House · Last updated September 30',body:['<mark>The router has been reset twice. A mesh Wi-Fi upgrade is quoted at 4.8M₫ and has not been approved.</mark>','The kitchen tap was repaired on September 10.','No installation date has been booked for the Wi-Fi upgrade.']}
};
const questions = {
  focus:{short:'What should I focus on this week?',prompt:'What should I focus on this week across my café and rental?',keys:/focus|priorit|this week|attention|what.*(?:first|next)/i,sources:['cafeFeedback','bookings','repairs'],
    answer:[{p:'Two things deserve your attention: the café’s morning queue and the house Wi-Fi.'},{ul:['At the café, 16 of 52 reviews mention waiting, mostly before 9:00. Try a clearer order-and-pickup flow first [1].','At Garden House, the Wi-Fi upgrade is still an unapproved quote. Get a firm installation plan before advertising the house for working stays [3].']},{p:'Then work on filling weekdays: only 9 of 20 available weekday nights booked last month, while weekends filled completely [2].'}]},
  reply:{short:'Help me reply to a guest review',prompt:'Help me reply to the guest review about the Wi-Fi at Garden House.',keys:/reply|respond|draft|write.*(?:guest|review)/i,sources:['guestReviews','repairs'],
    answer:[{p:'Here’s a reply that acknowledges the problem without promising a fix that isn’t booked yet:'},{quote:'Thank you for staying with us, and for letting us know about the Wi-Fi. I’m sorry it interrupted your work. We know the upstairs connection needs attention and are looking into a more reliable setup. I’m glad you enjoyed the quiet garden, and I appreciate the honest feedback.'},{p:'The upgrade is still a quote, so I’ve left out any promise about an installation date [2]. The upstairs connection is also mentioned in other reviews [1]. This is a draft; nothing has been posted.'}]},
  weekdays:{short:'How can I fill empty weekdays?',prompt:'How can I get more weekday bookings at Garden House?',keys:/weekday|weeknight|empty|fill|book|occupan/i,sources:['bookings','enquiries','rates'],
    answer:[{p:'Start with people who already asked about staying longer, rather than cutting every nightly rate.'},{ul:['Last month, 9 of 20 available weekday nights booked; all 8 weekend nights filled [1].','7 people enquired about weekday stays, but only 2 booked. Two asked for a three-night price [2].','Your current price list has no longer-stay offer [3].']},{p:'Try a clear three-night weekday offer and track whether it brings in extra bookings after cleaning costs and platform fees. First sort out the Wi-Fi: three enquiries specifically asked about working from the house [2].'}]},
  repairs:{short:'What needs fixing at the house?',prompt:'What should I fix at Garden House based on recent guest reviews?',keys:/fix|repair|maintenance|wi-?fi|guest|house|rental/i,sources:['guestReviews','repairs'],
    answer:[{p:'The upstairs Wi-Fi is the clearest recurring issue.'},{ul:['5 of 18 reviews mention an unreliable connection upstairs, despite a strong overall rating of 4.7 / 5 [1].','The router has already been reset twice. A mesh upgrade is quoted at 4.8M₫, with approval and an installation date still outstanding [2].']},{p:'Ask the installer to confirm coverage in the upstairs bedroom, then test it there before telling guests the problem is solved. The kitchen tap is already recorded as repaired [2].'}]},
  pricing:{short:'Help me price bottled cold brew',prompt:'What price should I try for our bottled cold brew?',keys:/cold brew|bottle|price|pricing/i,sources:['coldBrew'],
    answer:[{p:'Your cost sheet proposes 55,000₫ for a 250 ml bottle. That’s a starting point for the planned 30-bottle weekend trial [1].'},{p:'At that price, 33,600₫ is left per bottle after the recorded 21,400₫ ingredient and packaging cost—about 61% of the selling price. That is before labour, rent and other overheads, so it isn’t net profit [1].'},{p:'After the trial, check how many sold and how much time they took to make before choosing a regular price.'}]},
  money:{short:'How did the café do last month?',prompt:'How did Mira Coffee do last month after expenses?',keys:/money|profit|cost|sales|earn|revenue|expenses|last month/i,sources:['cafeSales'],
    answer:[{p:'The café brought in 112M₫ in September. After the costs entered in your sheet, 18M₫ remains [1].'},{table:[['September','Amount'],['Sales','112M₫'],['Ingredients','−36M₫'],['Rent','−18M₫'],['Wages','−32M₫'],['Other recorded costs','−8M₫'],['Remaining before tax & owner’s pay','18M₫']]},{p:'Tax, your own pay and any missing expenses are not included, so don’t treat the 18M₫ as take-home profit yet [1].'}]},
  feedback:{short:'What are café customers saying?',prompt:'What are café customers saying, and what can I improve?',keys:/caf[eé]|coffee|customer|queue|wait|review|feedback/i,sources:['cafeFeedback','cafePlan'],
    answer:[{p:'They like the coffee. It’s the morning wait that needs a little help.'},{ul:['16 of 52 reviews mention waiting, usually between 7:30 and 9:00 [1].','The oat-milk flat white gets 12 positive mentions, so keep that part of the experience [1].']},{p:'Your notes already suggest a small trial: put one person on the till from 7:30 to 9:00 and mark a separate pickup spot. Try it for one week and compare wait times before changing the menu [2].'}]}
};
const pickNotes = business => Object.fromEntries(Object.entries(notes).filter(([,note]) => note.business === business));
const workspaces = {
  all:{name:'Everything',description:'Your coffee shop and holiday rental, in one place.',placeholder:'Ask about your café, your rental, or what to do next…',docs:notes,scenarios:Object.values(questions),suggestions:['focus','weekdays','reply']},
  coffee:{name:'Mira Coffee',description:'Customers, costs and everyday decisions at your café.',placeholder:'Ask about customers, costs, or an idea for the café…',docs:pickNotes('coffee'),scenarios:[questions.pricing,questions.money,questions.feedback],suggestions:['feedback','money','pricing']},
  rental:{name:'Garden House',description:'Bookings, guest reviews and taking care of the house.',placeholder:'Ask about bookings, guest reviews, or the house…',docs:pickNotes('rental'),scenarios:[questions.reply,questions.weekdays,questions.repairs],suggestions:['weekdays','repairs','reply']}
};
let workspace = 'all', docs, scenarios;
const fallback = {p:'I only have a few example answers in this demo. Try one of these questions to see how I can help:'};
const wordDelay = 20;
const icons = {
  search:'<svg viewBox="0 0 16 16"><circle cx="7" cy="7" r="4.5"/><path d="M10.5 10.5L14 14"/></svg>',
  read:'<svg viewBox="0 0 16 16"><path d="M4 2h5l3 3v9H4z"/><path d="M9 2v3h3M6 8h4M6 11h4"/></svg>',
  check:'<svg viewBox="0 0 16 16"><path d="M3 8.5l3 3 7-7"/></svg>',
  chevron:'<svg viewBox="0 0 16 16"><path d="M6 4l4 4-4 4"/></svg>',
  copy:'<svg viewBox="0 0 16 16"><rect x="5" y="5" width="8" height="8" rx="1.5"/><path d="M3 10V4a1 1 0 011-1h6"/></svg>',
  retry:'<svg viewBox="0 0 16 16"><path d="M13 8a5 5 0 11-1.5-3.5M13 3v3h-3"/></svg>',
  up:'<svg viewBox="0 0 16 16"><path d="M5 7v6H3V7zM5 7l3-5c1 0 2 .7 1.6 2L9 6h3.5a1 1 0 011 1.2l-1 5a1 1 0 01-1 .8H5"/></svg>',
  down:'<svg viewBox="0 0 16 16"><path d="M5 9V3H3v6zM5 9l3 5c1 0 2-.7 1.6-2L9 10h3.5a1 1 0 001-1.2l-1-5a1 1 0 00-1-.8H5"/></svg>'
};
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = selector => document.querySelector(selector);
const chat = $('#main'), thread = $('#thread'), input = $('#composer-input'), sendButton = $('#send'), composer = $('#composer');
const emptyState = $('#empty');
let run = 0, busy = false, readCount = 0;
const wait = ms => new Promise(done => setTimeout(done, reduceMotion ? 0 : ms));
const announce = text => { $('#status').textContent = text; };
const scrollDown = () => { thread.scrollTop = thread.scrollHeight; };
function element(tag, className, text){ const node = document.createElement(tag); if (className) node.className = className; if (text !== undefined) node.textContent = text; return node; }
function suggestionButton(scenario, className){
  const button = element('button', className);
  button.type = 'button';
  button.append(element('span', 'suggestion-dot'), element('span', '', scenario.short));
  button.addEventListener('click', () => ask(scenario.prompt));
  return button;
}
function renderSuggestions(){
  $('#suggestions').replaceChildren();
  workspaces[workspace].suggestions.forEach(key => $('#suggestions').append(suggestionButton(questions[key], 'suggestion')));
}
function renderWorkspaces(){
  for (const [key, space] of Object.entries(workspaces)){
    const button = element('button', 'business-tab', space.name);
    button.type = 'button';
    button.dataset.workspace = key;
    button.addEventListener('click', () => setWorkspace(key));
    $('#businesses').append(button);
  }
}
function setWorkspace(key){
  if (key === workspace && docs) return;
  if (docs) newChat();
  workspace = key;
  ({docs, scenarios} = workspaces[key]);
  const space = workspaces[key];
  document.querySelectorAll('[data-workspace]').forEach(item => item.setAttribute('aria-pressed', String(item.dataset.workspace === key)));
  $('#business-context').textContent = space.description;
  setSourceView('library');
  input.placeholder = space.placeholder;
  renderSuggestions();
  resetSources();
  renderLibrary();
  announce(`Switched to ${space.name}.`);
}
function renderLibrary(){
  const list = $('#library-list');
  list.replaceChildren();
  $('#library-count').textContent = String(Object.keys(docs).length).padStart(2, '0');
  for (const [key, doc] of Object.entries(docs)){
    const item = element('li'), button = element('button', 'library-doc');
    button.type = 'button';
    const icon = element('span', 'library-icon');
    icon.setAttribute('aria-hidden', 'true');
    icon.innerHTML = icons.read;
    const copy = element('span', 'library-copy');
    copy.append(element('strong', '', doc.title), element('small', '', doc.kind));
    button.append(icon, copy);
    button.addEventListener('click', () => openDoc(key));
    item.append(button);
    list.append(item);
  }
}
function setBusy(value){
  busy = value;
  sendButton.classList.toggle('stop', value);
  sendButton.setAttribute('aria-label', value ? 'Stop generating' : 'Send question');
  syncComposer();
}
function syncComposer(){ composer.classList.toggle('empty-input', !busy && !input.value.trim()); }
function resetSources(){
  readCount = 0;
  $('#source-list').innerHTML = '<li class="source-empty">The notes used in your answer will appear here.</li>';
  $('#cited-count').textContent = '0';
}
function addSource(key, index){
  const doc = docs[key], list = $('#source-list');
  list.querySelector('.source-empty')?.remove();
  const item = element('li', 'source'), button = element('button');
  button.type = 'button';
  button.dataset.source = index;
  button.innerHTML = `<span class="num">${index}</span><span style="flex:1"><small></small><strong></strong></span>`;
  button.querySelector('small').textContent = doc.kind;
  button.querySelector('strong').textContent = doc.title;
  button.addEventListener('click', () => openDoc(key));
  item.append(button);
  list.append(item);
  $('#cited-count').textContent = list.children.length;
}
function openDoc(key){
  const doc = docs[key];
  $('#doc-kind').textContent = doc.kind;
  $('#doc-title').textContent = doc.title;
  $('#doc-meta').textContent = doc.meta;
  $('#doc-body').innerHTML = doc.body.map(line => `<p>${line}</p>`).join('');
  $('#doc-dialog').showModal();
}
const popover = $('#cite-pop');
function showCitation(chip, key){
  const doc = docs[key], quote = doc.body.find(line => line.startsWith('<mark>')) ?? doc.body[0];
  popover.innerHTML = '<small></small><strong></strong><p></p>';
  popover.querySelector('small').textContent = doc.kind;
  popover.querySelector('strong').textContent = doc.title;
  popover.querySelector('p').textContent = `“${quote.replace(/<\/?mark>/g, '')}”`;
  popover.hidden = false;
  const box = chip.getBoundingClientRect(), width = popover.offsetWidth, height = popover.offsetHeight;
  popover.style.left = `${Math.max(12, Math.min(box.left - width / 2 + box.width / 2, innerWidth - width - 12))}px`;
  popover.style.top = `${box.top - height - 8 < 50 ? box.bottom + 8 : box.top - height - 8}px`;
}
function citation(index, sources){
  const chip = element('button', 'cite', index), key = sources[index - 1];
  chip.type = 'button';
  chip.setAttribute('aria-label', `Source ${index}: ${docs[key].title}`);
  chip.addEventListener('click', () => { popover.hidden = true; openDoc(key); });
  chip.addEventListener('mouseenter', () => showCitation(chip, key));
  chip.addEventListener('focus', () => showCitation(chip, key));
  chip.addEventListener('mouseleave', () => { popover.hidden = true; });
  chip.addEventListener('blur', () => { popover.hidden = true; });
  return chip;
}
async function streamInto(target, text, id, sources, delay = wordDelay){
  for (const part of text.split(/(\[\d\])/)){
    const match = part.match(/^\[(\d)\]$/);
    if (match){ target.append(citation(Number(match[1]), sources)); continue; }
    for (const word of part.split(/(?<=\s)/)){
      if (id !== run) return false;
      target.append(word);
      scrollDown();
      await wait(delay);
    }
  }
  return id === run;
}
async function renderBlock(block, body, id, sources){
  if (block.p) return streamInto(body.appendChild(element('p')), block.p, id, sources);
  if (block.quote) return streamInto(body.appendChild(element('blockquote')), block.quote, id, sources);
  if (block.ul){
    const list = body.appendChild(element('ul'));
    for (const text of block.ul) if (!await streamInto(list.appendChild(element('li')), text, id, sources)) return false;
    return true;
  }
  const scroll = body.appendChild(element('div', 'table-scroll')), table = scroll.appendChild(element('table'));
  for (const [rowIndex, row] of block.table.entries()){
    const tr = table.appendChild(element('tr'));
    for (const cell of row) if (!await streamInto(tr.appendChild(element(rowIndex ? 'td' : 'th')), cell, id, sources)) return false;
  }
  return true;
}
function addUserMessage(text){
  emptyState.remove();
  chat.classList.add('started');
  const message = element('div', 'message user');
  message.append(element('p', '', text));
  thread.append(message);
}
async function ask(text){
  text = text.trim();
  if (!text || busy) return;
  const id = ++run;
  let candidates = scenarios;
  if (workspace === 'all'){
    const coffee = /caf[eé]|coffee|cold brew/i.test(text);
    const rental = /rental|house|guest|stay|booking|wi-?fi/i.test(text);
    if (coffee !== rental) candidates = scenarios.filter(item => item.sources.every(key => notes[key].business === (coffee ? 'coffee' : 'rental')));
  }
  const asksForReply = /reply|respond|draft/i.test(text);
  const scenario = candidates.find(item => item.prompt === text) ?? candidates.find(item => (!asksForReply || item === questions.reply) && item.keys.test(text));
  input.value = ''; resizeInput();
  addUserMessage(text);
  resetSources();
  setBusy(true);
  const message = element('article', 'message assistant'), body = element('div', 'answer streaming');
  message.setAttribute('aria-busy', 'true');
  message.setAttribute('aria-label', 'Pip');
  thread.append(message);
  let completed = true;
  if (scenario){
    const progress = element('p', 'answer-progress', 'Looking through your notes…');
    message.append(progress);
    for (const key of scenario.sources){
      await wait(380);
      if (id !== run){ completed = false; break; }
      progress.textContent = `Reading ${docs[key].title.toLowerCase()}…`;
      addSource(key, ++readCount);
      scrollDown();
    }
    progress.textContent = completed ? `Based on ${readCount} ${readCount === 1 ? 'note' : 'notes'}` : 'Paused';
    message.append(body);
    if (completed) for (const block of scenario.answer) if (!(completed = await renderBlock(block, body, id, scenario.sources))) break;
  } else {
    message.append(body);
    completed = await renderBlock(fallback, body, id, []);
    if (completed){ const row = body.appendChild(element('div', 'inline-suggestions')); workspaces[workspace].suggestions.forEach(key => row.append(suggestionButton(questions[key], 'suggestion small'))); }
  }
  body.classList.remove('streaming');
  message.removeAttribute('aria-busy');
  if (!completed) body.append(element('p', 'stopped', 'Answer stopped.'));
  if (completed && scenario) message.append(actions(text));
  if (id === run) setBusy(false);
  scrollDown();
  announce(completed ? 'Pip finished answering.' : 'Answer stopped.');
}
function iconButton(icon, label){
  const button = element('button');
  button.type = 'button';
  button.innerHTML = icons[icon];
  button.setAttribute('aria-label', label);
  button.title = label;
  return button;
}
function actions(prompt){
  const bar = element('div', 'actions');
  const copy = iconButton('copy', 'Copy answer'), retry = iconButton('retry', 'Try again');
  copy.addEventListener('click', async () => {
    const text = copy.closest('.message').querySelector('.answer').innerText;
    try { await navigator.clipboard.writeText(text); copy.title = 'Copied'; announce('Answer copied.'); } catch { announce('Copy unavailable.'); }
  });
  retry.addEventListener('click', () => ask(prompt));
  bar.append(copy, retry);
  return bar;
}
function stop(){ run++; setBusy(false); }
function resizeInput(){ input.style.height = 'auto'; input.style.height = `${Math.min(input.scrollHeight, 180)}px`; syncComposer(); }
function setSourceView(view){
  const library = view === 'library';
  $('#library-tab').setAttribute('aria-pressed', String(library));
  $('#cited-tab').setAttribute('aria-pressed', String(!library));
  $('#library-panel').hidden = !library;
  $('#cited-panel').hidden = library;
}
function toggleSources(open){
  const panel = $('#sources'), next = open ?? !panel.classList.contains('open');
  panel.hidden = !next;
  panel.classList.toggle('open', next);
  if (next) $('#sources-close').focus();
  else $('#sources-toggle').focus();
  popover.hidden = true;
  $('#sources-toggle').setAttribute('aria-expanded', String(next));
}
function newChat(){ setSourceView('library'); stop(); toggleSources(false); chat.classList.remove('started'); thread.replaceChildren(emptyState); resetSources(); input.focus(); }
composer.addEventListener('submit', event => { event.preventDefault(); busy ? stop() : ask(input.value); });
input.addEventListener('keydown', event => { if (event.key === 'Enter' && !event.shiftKey && !event.isComposing){ event.preventDefault(); if (!busy) ask(input.value); } });
input.addEventListener('input', resizeInput);
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !$('#doc-dialog').open && $('#sources').classList.contains('open')){ toggleSources(false); $('#sources-toggle').focus(); }
  if (event.key === 'k' && (event.metaKey || event.ctrlKey)){ event.preventDefault(); newChat(); }
});
$('#new-chat').addEventListener('click', newChat);
$('#sources-toggle').addEventListener('click', () => toggleSources());
$('#library-tab').addEventListener('click', () => setSourceView('library'));
$('#cited-tab').addEventListener('click', () => setSourceView('cited'));
$('#sources-close').addEventListener('click', () => toggleSources(false));
thread.addEventListener('scroll', () => { popover.hidden = true; });
renderWorkspaces();
setWorkspace(workspace);
syncComposer();
