'use strict';
const docs = {
  feedback:{kind:'Spreadsheet export',title:'Customer feedback — Q3',meta:'412 responses · updated Oct 2, 2026',body:['Responses tagged “wait time” rose to 31% of all comments, mostly between 7:30 and 9:00.','<mark>Oat-milk flat white is the most-praised drink, named in 86 positive comments.</mark>','Several regulars asked for a quieter seating area at the Riverside location.']},
  survey:{kind:'Meeting notes',title:'Survey readout with the café leads',meta:'Sep 24, 2026 · 6 attendees',body:['Morning queue is the headline issue; staff agree the second grinder helps but ordering is the bottleneck.','<mark>Proposal: pilot mobile pre-order at Old Quarter for six weeks before scaling.</mark>','Leads want feedback summaries monthly instead of quarterly.']},
  support:{kind:'Support log',title:'Inbox & review replies',meta:'Jul–Sep 2026 · 57 threads',body:['Most complaints resolve within a day; the slowest category is loyalty-card balance questions.','<mark>Loyalty-card questions make up 22% of threads and take 2.4 days on average.</mark>']},
  brief:{kind:'Product brief',title:'Cold brew line — v3 brief',meta:'Owner: Thảo · Sep 30, 2026',body:['Two SKUs: Classic (Đà Lạt robusta) and Citrus (with dried cam sành peel).','<mark>Target launch: second week of December, ahead of the holiday rush.</mark>','Bottled in 250 ml glass; returnable bottle scheme is optional for phase one.']},
  pricing:{kind:'Spreadsheet',title:'Cold brew pricing model',meta:'Finance · draft 4',body:['Unit cost at 600 bottles/week: 21,400₫.','<mark>Recommended shelf price 55,000₫, giving a 61% gross margin.</mark>','Bundle (3 bottles) at 150,000₫ keeps margin above 55%.']},
  calendar:{kind:'Calendar',title:'Marketing calendar — Q4',meta:'Shared · 14 events',body:['Nov 18–24: Old Quarter street festival stall confirmed.','<mark>Dec 9: newsletter slot reserved, currently unassigned.</mark>']},
  oldquarter:{kind:'Store report',title:'Old Quarter — September',meta:'Store lead: Minh',body:['Revenue 412M₫, 9,840 transactions, average ticket 41,900₫.','<mark>Peak hour 7:30–8:30 accounts for 27% of daily sales.</mark>','Staff turnover: one barista in the period.']},
  riverside:{kind:'Store report',title:'Riverside — September',meta:'Store lead: Linh',body:['Revenue 356M₫, 6,210 transactions, average ticket 57,300₫.','<mark>Average stay is 74 minutes; laptop seating is full most afternoons.</mark>','Food attach rate 48%, the highest in the group.']}
};
const scenarios = [
  {id:'feedback',short:'Summarize Q3 customer feedback',prompt:'What did customers tell us last quarter, and what should we fix first?',keys:/feedback|customer|review|complain|survey|fix/i,sources:['feedback','survey','support'],
   steps:[['search','Searching workspace for “feedback Q3”','23 matches'],['read','Reading Customer feedback — Q3','412 rows'],['read','Reading Survey readout with the café leads','2 pages'],['read','Reading Inbox & review replies','57 threads']],
   verify:['check','Cross-checking percentages against the raw export','3 figures confirmed'],
   answer:[{p:'Customers are happy with the coffee and frustrated by the wait. The morning queue is the clearest thing to fix first.'},
     {ul:['Wait time is now 31% of all comments, concentrated between 7:30 and 9:00 [1].','The oat-milk flat white is your best-loved drink, praised in 86 comments [1].','Loyalty-card questions are 22% of support threads and take 2.4 days to resolve [3].']},
     {p:'Your café leads already proposed a fix: a six-week mobile pre-order pilot at Old Quarter [2]. I’d start there, and answer loyalty questions with a saved reply to cut the response time.'}]},
  {id:'launch',short:'Draft a cold brew launch plan',prompt:'Draft a short launch plan for the cold brew line.',keys:/launch|cold brew|plan|price|bottle|product/i,sources:['brief','pricing','calendar'],
   steps:[['search','Searching workspace for “cold brew”','9 matches'],['read','Reading Cold brew line — v3 brief','4 pages'],['read','Reading Cold brew pricing model','3 tabs'],['read','Reading Marketing calendar — Q4','14 events']],
   verify:['check','Recalculating margin from unit cost','61.1% ✓'],
   answer:[{p:'Here’s a three-step plan built around the December target date [1].'},
     {table:[['When','What','Why'],['Nov 18–24','Sampling at the street festival stall','Early feedback on Classic vs Citrus [3]'],['Dec 9','Newsletter launch announcement','Slot is reserved and unassigned [3]'],['Dec 10+','Shelf launch at 55,000₫','61% gross margin at planned volume [2]']]},
     {p:'One open decision: the brief leaves the returnable bottle scheme optional [1]. I’d hold it for phase two so launch stays simple.'}]},
  {id:'locations',short:'Compare our two cafés',prompt:'How do Old Quarter and Riverside compare?',keys:/compare|location|store|caf|riverside|old quarter|branch/i,sources:['oldquarter','riverside'],
   steps:[['search','Searching workspace for store reports','2 matches'],['read','Reading Old Quarter — September','1 page'],['read','Reading Riverside — September','1 page']],
   verify:['check','Checking average ticket = revenue ÷ transactions','both match'],
   answer:[{p:'They are two different businesses under one name: Old Quarter is a fast morning stop, Riverside is a place people stay.'},
     {table:[['','Old Quarter','Riverside'],['Revenue','412M₫ [1]','356M₫ [2]'],['Transactions','9,840 [1]','6,210 [2]'],['Avg. ticket','41,900₫ [1]','57,300₫ [2]']]},
     {ul:['Old Quarter earns 27% of daily sales in a single morning hour [1].','Riverside guests stay 74 minutes on average and buy food with almost half of orders [2].']},
     {p:'Speeding up mornings matters most at Old Quarter; at Riverside, the bigger lever is seating and food.'}]}
];
const fallback = {p:'This demo has three scripted questions, so I can’t look into that one. Try one of these instead:'};
const models = {swift:{note:'Fast answers, light checking',wordDelay:28,stepDelay:520},deep:{note:'Slower, double-checks its figures',wordDelay:42,stepDelay:850}};
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = selector => document.querySelector(selector);
const thread = $('#thread'), input = $('#composer-input'), sendButton = $('#send');
const emptyState = $('#empty');
let model = 'swift', run = 0, busy = false, readCount = 0, stepCount = 0;
const wait = ms => new Promise(done => setTimeout(done, reduceMotion ? 0 : ms));
const announce = text => { $('#status').textContent = text; };
function element(tag, className, text){ const node = document.createElement(tag); if (className) node.className = className; if (text !== undefined) node.textContent = text; return node; }
function suggestionButton(scenario, className){
  const button = element('button', className, scenario.short);
  button.type = 'button';
  button.addEventListener('click', () => ask(scenario.prompt));
  return button;
}
function renderSuggestions(){
  scenarios.forEach(scenario => { $('#suggestions').append(suggestionButton(scenario, 'suggestion')); $('#history').append(suggestionButton(scenario, 'history-item')); });
}
function setBusy(value){
  busy = value;
  sendButton.classList.toggle('stop', value);
  sendButton.setAttribute('aria-label', value ? 'Stop generating' : 'Send question');
  sendButton.firstElementChild.textContent = value ? '■' : '↑';
}
function resetSources(){
  readCount = stepCount = 0;
  $('#source-list').innerHTML = '<li class="source-empty">Sources appear here as Lumen reads them.</li>';
  $('#source-count').textContent = '0';
  $('#run').hidden = true;
  setContext(0);
}
function setContext(percent){ $('#context-value').textContent = `${percent}%`; $('#context-bar').style.width = `${percent}%`; }
function addSource(key, index){
  const doc = docs[key], list = $('#source-list');
  list.querySelector('.source-empty')?.remove();
  const item = element('li', 'source'), button = element('button');
  button.type = 'button';
  button.dataset.source = index;
  button.innerHTML = `<span class="num">${index}</span><span><small></small><strong></strong></span>`;
  button.querySelector('small').textContent = doc.kind;
  button.querySelector('strong').textContent = doc.title;
  button.addEventListener('click', () => openDoc(key));
  item.append(button);
  list.append(item);
  $('#source-count').textContent = list.children.length;
}
function openDoc(key){
  const doc = docs[key];
  $('#doc-kind').textContent = doc.kind;
  $('#doc-title').textContent = doc.title;
  $('#doc-meta').textContent = doc.meta;
  $('#doc-body').innerHTML = doc.body.map(line => `<p>${line}</p>`).join('');
  $('#doc-dialog').showModal();
}
function focusSource(index){
  const card = document.querySelector(`.source [data-source="${index}"]`);
  if (!card) return;
  if (matchMedia('(max-width: 1100px)').matches) toggleSources(true);
  card.scrollIntoView({block:'nearest', behavior: reduceMotion ? 'auto' : 'smooth'});
  card.classList.remove('pulse'); void card.offsetWidth; card.classList.add('pulse');
}
function citation(index){
  const chip = element('button', 'cite', index);
  chip.type = 'button';
  chip.setAttribute('aria-label', `Show source ${index}`);
  chip.addEventListener('click', () => focusSource(index));
  return chip;
}
async function streamInto(target, text, id){
  for (const part of text.split(/(\[\d\])/)){
    const match = part.match(/^\[(\d)\]$/);
    if (match){ target.append(citation(match[1])); continue; }
    for (const word of part.split(/(?<=\s)/)){
      if (id !== run) return false;
      target.append(word);
      thread.scrollTop = thread.scrollHeight;
      await wait(models[model].wordDelay);
    }
  }
  return id === run;
}
async function renderBlock(block, body, id){
  if (block.p) return streamInto(body.appendChild(element('p')), block.p, id);
  if (block.ul){
    const list = body.appendChild(element('ul'));
    for (const text of block.ul) if (!await streamInto(list.appendChild(element('li')), text, id)) return false;
    return true;
  }
  const scroll = body.appendChild(element('div', 'table-scroll')), table = scroll.appendChild(element('table'));
  for (const [rowIndex, row] of block.table.entries()){
    const tr = table.appendChild(element('tr'));
    for (const cell of row) if (!await streamInto(tr.appendChild(element(rowIndex ? 'td' : 'th')), cell, id)) return false;
  }
  return true;
}
function addUserMessage(text){
  emptyState.remove();
  const message = element('div', 'message user');
  message.append(element('p', '', text));
  thread.append(message);
}
async function ask(text){
  text = text.trim();
  if (!text || busy) return;
  const id = ++run, started = performance.now(), scenario = scenarios.find(item => item.keys.test(text));
  input.value = ''; resizeInput();
  addUserMessage(text);
  resetSources();
  setBusy(true);
  const message = element('article', 'message assistant'), trace = element('details', 'trace'), summary = element('summary'), steps = element('ol', 'steps'), body = element('div', 'answer');
  message.setAttribute('aria-busy', 'true');
  summary.innerHTML = '<span class="spinner" aria-hidden="true"></span><span class="trace-label">Working…</span>';
  trace.open = true;
  trace.append(summary, steps);
  message.append(element('span', 'author', 'Lumen'), trace, body);
  thread.append(message);
  thread.scrollTop = thread.scrollHeight;
  let completed = true;
  if (scenario){
    $('#run').hidden = false;
    const plan = model === 'deep' ? [...scenario.steps, scenario.verify] : scenario.steps;
    for (const [kind, label, detail] of plan){
      if (id !== run){ completed = false; break; }
      const step = element('li', `step ${kind} active`);
      step.innerHTML = '<span class="step-icon" aria-hidden="true"></span><span class="step-label"></span><span class="step-detail"></span>';
      step.querySelector('.step-label').textContent = label;
      steps.append(step);
      thread.scrollTop = thread.scrollHeight;
      await wait(models[model].stepDelay);
      if (id !== run){ completed = false; break; }
      step.classList.remove('active');
      step.querySelector('.step-detail').textContent = detail;
      $('#run-steps').textContent = ++stepCount;
      if (kind === 'read'){ readCount++; addSource(scenario.sources[readCount - 1], readCount); $('#run-read').textContent = readCount; setContext(Math.min(18 * readCount + 6, 72)); }
      $('#run-time').textContent = `${((performance.now() - started) / 1000).toFixed(1)}s`;
    }
    if (completed) for (const block of scenario.answer) if (!(completed = await renderBlock(block, body, id))) break;
  } else {
    trace.remove();
    completed = await renderBlock(fallback, body, id);
    if (completed){ const row = body.appendChild(element('div', 'inline-suggestions')); scenarios.forEach(item => row.append(suggestionButton(item, 'suggestion small'))); }
  }
  $('#run-time').textContent = `${((performance.now() - started) / 1000).toFixed(1)}s`;
  summary.querySelector('.spinner')?.remove();
  summary.querySelector('.trace-label').textContent = completed ? `Worked through ${stepCount} step${stepCount === 1 ? '' : 's'}` : 'Stopped';
  if (scenario) trace.open = false;
  message.removeAttribute('aria-busy');
  if (!completed) body.append(element('p', 'stopped', 'Generation stopped.'));
  if (completed && scenario) message.append(actions(text));
  if (id === run) setBusy(false);
  announce(completed ? 'Lumen finished answering.' : 'Generation stopped.');
}
function actions(prompt){
  const bar = element('div', 'actions');
  const copy = element('button', '', 'Copy'), retry = element('button', '', 'Regenerate');
  copy.type = retry.type = 'button';
  copy.addEventListener('click', async event => {
    const text = event.target.closest('.message').querySelector('.answer').innerText;
    try { await navigator.clipboard.writeText(text); copy.textContent = 'Copied'; } catch { copy.textContent = 'Copy unavailable'; }
    setTimeout(() => { copy.textContent = 'Copy'; }, 1600);
  });
  retry.addEventListener('click', () => ask(prompt));
  bar.append(copy, retry);
  return bar;
}
function stop(){ run++; setBusy(false); }
function resizeInput(){ input.style.height = 'auto'; input.style.height = `${Math.min(input.scrollHeight, 160)}px`; }
function toggleSources(open){
  const panel = $('#sources'), next = open ?? !panel.classList.contains('open');
  panel.classList.toggle('open', next);
  $('#sources-toggle').setAttribute('aria-expanded', String(next));
}
$('#composer').addEventListener('submit', event => { event.preventDefault(); busy ? stop() : ask(input.value); });
input.addEventListener('keydown', event => { if (event.key === 'Enter' && !event.shiftKey && !event.isComposing){ event.preventDefault(); if (!busy) ask(input.value); } });
input.addEventListener('input', resizeInput);
document.querySelectorAll('[data-model]').forEach(button => button.addEventListener('click', () => {
  model = button.dataset.model;
  document.querySelectorAll('[data-model]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  $('#model-note').textContent = models[model].note;
}));
$('#new-chat').addEventListener('click', () => { stop(); thread.replaceChildren(emptyState); resetSources(); input.focus(); });
$('#sources-toggle').addEventListener('click', () => toggleSources());
$('#sources-close').addEventListener('click', () => toggleSources(false));
renderSuggestions();
