'use strict';
const workspaces = {
  mira:{name:'Mira Coffee Co.',initial:'M',color:'#e9b26b',meta:'48 docs · Google Drive, Sheets',about:'Mira Coffee Co.’s documents',placeholder:'Ask about feedback, launches, or locations…',
   docs:{
    feedback:{kind:'Spreadsheet export',title:'Customer feedback - Q3',meta:'412 responses · updated Oct 2, 2026',tokens:21.6,body:['Responses tagged “wait time” rose to 31% of all comments, mostly between 7:30 and 9:00.','<mark>Oat-milk flat white is the most-praised drink, named in 86 positive comments.</mark>','Several regulars asked for a quieter seating area at the Riverside location.']},
    survey:{kind:'Meeting notes',title:'Survey readout with the café leads',meta:'Sep 24, 2026 · 6 attendees',tokens:4.1,body:['Morning queue is the headline issue; staff agree the second grinder helps but ordering is the bottleneck.','<mark>Proposal: pilot mobile pre-order at Old Quarter for six weeks before scaling.</mark>','Leads want feedback summaries monthly instead of quarterly.']},
    support:{kind:'Support log',title:'Inbox & review replies',meta:'Jul–Sep 2026 · 57 threads',tokens:9.8,body:['Most complaints resolve within a day; the slowest category is loyalty-card balance questions.','<mark>Loyalty-card questions make up 22% of threads and take 2.4 days on average.</mark>']},
    brief:{kind:'Product brief',title:'Cold brew line - v3 brief',meta:'Owner: Thảo · Sep 30, 2026',tokens:5.2,body:['Two SKUs: Classic (Đà Lạt robusta) and Citrus (with dried cam sành peel).','<mark>Target launch: second week of December, ahead of the holiday rush.</mark>','Bottled in 250 ml glass; returnable bottle scheme is optional for phase one.']},
    pricing:{kind:'Spreadsheet',title:'Cold brew pricing model',meta:'Finance · draft 4',tokens:3.4,body:['Unit cost at 600 bottles/week: 21,400₫.','<mark>Recommended shelf price 55,000₫, giving a 61% gross margin.</mark>','Bundle (3 bottles) at 150,000₫ keeps margin above 55%.']},
    calendar:{kind:'Calendar',title:'Marketing calendar - Q4',meta:'Shared · 14 events',tokens:1.9,body:['Nov 18–24: Old Quarter street festival stall confirmed.','<mark>Dec 9: newsletter slot reserved, currently unassigned.</mark>']},
    oldquarter:{kind:'Store report',title:'Old Quarter - September',meta:'Store lead: Minh',tokens:2.7,body:['Revenue 412M₫, 9,840 transactions, average ticket 41,900₫.','<mark>Peak hour 7:30–8:30 accounts for 27% of daily sales.</mark>','Staff turnover: one barista in the period.']},
    riverside:{kind:'Store report',title:'Riverside - September',meta:'Store lead: Linh',tokens:2.5,body:['Revenue 356M₫, 6,210 transactions, average ticket 57,300₫.','<mark>Average stay is 74 minutes; laptop seating is full most afternoons.</mark>','Food attach rate 48%, the highest in the group.']}
   },
   scenarios:[
    {id:'feedback',icon:'✦',short:'Summarize Q3 customer feedback',prompt:'What did customers tell us last quarter, and what should we fix first?',keys:/feedback|customer|review|complain|survey|fix/i,sources:['feedback','survey','support'],scores:[.94,.88,.71],
     think:'The user wants a summary of Q3 feedback and a priority. I should find the raw feedback export first, then look for anything the team already discussed so I don’t recommend something they’ve ruled out. Support threads may show a second problem the survey misses.',
     steps:[['search','search_workspace','"feedback Q3"','23 results'],['read','read_document','Customer feedback - Q3','412 rows'],['read','read_document','Survey readout with the café leads','2 pages'],['read','read_document','Inbox & review replies','57 threads']],
     verify:['check','verify_figures','31%, 86, 22%','3/3 match'],
     answer:[{p:'Customers are happy with the coffee and frustrated by the wait. The morning queue is the clearest thing to fix first.'},
       {ul:['Wait time is now 31% of all comments, concentrated between 7:30 and 9:00 [1].','The oat-milk flat white is your best-loved drink, praised in 86 comments [1].','Loyalty-card questions are 22% of support threads and take 2.4 days to resolve [3].']},
       {p:'Your café leads already proposed a fix: a six-week mobile pre-order pilot at Old Quarter [2]. I’d start there, and answer loyalty questions with a saved reply to cut the response time.'}]},
    {id:'launch',icon:'◇',short:'Draft a cold brew launch plan',prompt:'Draft a short launch plan for the cold brew line.',keys:/launch|cold brew|plan|price|bottle|product/i,sources:['brief','pricing','calendar'],scores:[.96,.83,.64],
     think:'A launch plan needs a date, a price and a channel. The product brief should have the date, finance’s pricing model the price, and the marketing calendar any slots already booked. I’ll keep it to three steps.',
     steps:[['search','search_workspace','"cold brew"','9 results'],['read','read_document','Cold brew line - v3 brief','4 pages'],['read','read_document','Cold brew pricing model','3 tabs'],['read','read_document','Marketing calendar - Q4','14 events']],
     verify:['check','run_calculation','(55000 − 21400) ÷ 55000','61.1% ✓'],
     answer:[{p:'Here’s a three-step plan built around the December target date [1].'},
       {table:[['When','What','Why'],['Nov 18–24','Sampling at the street festival stall','Early feedback on Classic vs Citrus [3]'],['Dec 9','Newsletter launch announcement','Slot is reserved and unassigned [3]'],['Dec 10+','Shelf launch at 55,000₫','61% gross margin at planned volume [2]']]},
       {p:'One open decision: the brief leaves the returnable bottle scheme optional [1]. I’d hold it for phase two so launch stays simple.'}]},
    {id:'locations',icon:'⇄',short:'Compare our two cafés',prompt:'How do Old Quarter and Riverside compare?',keys:/compare|location|store|caf|riverside|old quarter|branch/i,sources:['oldquarter','riverside'],scores:[.97,.97],
     think:'Two store reports for September should be enough. Revenue alone would be misleading, so I’ll compare transactions and average ticket too, then look for what makes each place different.',
     steps:[['search','search_workspace','type:store-report month:sep','2 results'],['read','read_document','Old Quarter - September','1 page'],['read','read_document','Riverside - September','1 page']],
     verify:['check','run_calculation','revenue ÷ transactions','both match'],
     answer:[{p:'They are two different businesses under one name: Old Quarter is a fast morning stop, Riverside is a place people stay.'},
       {table:[['','Old Quarter','Riverside'],['Revenue','412M₫ [1]','356M₫ [2]'],['Transactions','9,840 [1]','6,210 [2]'],['Avg. ticket','41,900₫ [1]','57,300₫ [2]']]},
       {ul:['Old Quarter earns 27% of daily sales in a single morning hour [1].','Riverside guests stay 74 minutes on average and buy food with almost half of orders [2].']},
       {p:'Speeding up mornings matters most at Old Quarter; at Riverside, the bigger lever is seating and food.'}]}
   ]},
  tessera:{name:'Tessera Labs',initial:'T',color:'#b39cff',meta:'126 docs · Notion, Linear, Slack',about:'Tessera Labs’ engineering and customer docs',placeholder:'Ask about incidents, churn, or the roadmap…',
   docs:{
    churn:{kind:'Analysis',title:'Churn analysis - Q3',meta:'Revenue ops · Oct 6, 2026',tokens:7.4,body:['Logo churn was 2.8% in Q3, up from 1.9% in Q2.','<mark>41% of churned accounts cited reliability, most of them after the August outage.</mark>','Price was named by 18%; missing features by 23%.']},
    nps:{kind:'Survey export',title:'NPS comments - Q3',meta:'293 responses',tokens:12.3,body:['NPS fell to 34 from 41 last quarter.','<mark>Most requested feature: bulk invoice export, asked for by 64 accounts.</mark>','Detractors mention “webhooks” more than any other word.']},
    postmortem:{kind:'Incident review',title:'Webhook delays - Oct 14',meta:'SEV-2 · authored by Đức',tokens:5.8,body:['Webhooks were delayed up to 47 minutes for 312 customers.','<mark>Root cause: the queue consumer pinned itself to a single partition after the Oct 13 deploy.</mark>','Action items: partition-lag alerting, and a load test before any queue change.']},
    oncall:{kind:'Pager log',title:'On-call log - October',meta:'Auto-exported from PagerDuty',tokens:3.1,body:['Median time to acknowledge: 4 minutes.','<mark>23 pages this month, 9 of them from the webhook queue.</mark>']},
    sprint:{kind:'Retro notes',title:'Sprint 21 retro',meta:'Oct 17, 2026 · 8 attendees',tokens:2.6,body:['Velocity 38 points against 45 planned.','<mark>Two engineers spent half the sprint on incident follow-ups.</mark>','Team wants a rotating “reliability week” each quarter.']},
    roadmap:{kind:'Roadmap',title:'Q4 product roadmap',meta:'Linear project · 14 issues',tokens:4.4,body:['Multi-region webhook delivery moved to Q1.','<mark>Bulk export is scheduled for sprint 23, starting Nov 17.</mark>']}
   },
   scenarios:[
    {id:'churn',icon:'↘',short:'Why did churn rise in Q3?',prompt:'Why did churn go up last quarter?',keys:/churn|cancel|lost|leav|retention/i,sources:['churn','nps','postmortem'],scores:[.95,.81,.69],
     think:'Churn is a revenue-ops question, so start from their analysis. Then check whether survey comments tell the same story, and whether a specific incident lines up with the timing.',
     steps:[['search','search_workspace','"churn Q3"','14 results'],['read','read_document','Churn analysis - Q3','6 pages'],['read','read_document','NPS comments - Q3','293 rows'],['read','read_document','Webhook delays - Oct 14','3 pages']],
     verify:['check','run_calculation','2.8 − 1.9','+0.9 pts ✓'],
     answer:[{p:'Mostly reliability. Logo churn rose from 1.9% to 2.8%, and the biggest reason given was uptime, not price [1].'},
      {ul:['41% of churned accounts cited reliability, clustered after the August outage [1].','Detractors mention “webhooks” more than any other word, and NPS fell from 41 to 34 [2].','October’s webhook delay hit 312 customers for up to 47 minutes, so the risk hasn’t gone away [3].']},
      {p:'Price matters less than you might think (18% [1]). Fixing webhook reliability is the retention play.'}]},
    {id:'incident',icon:'⚑',short:'Summarize the webhook incident',prompt:'Summarize the October webhook incident for the leadership update.',keys:/incident|outage|webhook|postmortem|down|page/i,sources:['postmortem','oncall','sprint'],scores:[.97,.78,.62],
     think:'Leadership wants impact, cause, and what it cost us, in a few lines. The postmortem has the first two; the pager log and the retro show the knock-on cost.',
     steps:[['search','search_workspace','"webhook incident"','8 results'],['read','read_document','Webhook delays - Oct 14','3 pages'],['read','read_document','On-call log - October','23 pages'],['read','read_document','Sprint 21 retro','2 pages']],
     verify:['check','cross_reference','incident date ↔ pager log','consistent ✓'],
     answer:[{p:'Here’s a version you can paste into the update:'},
      {quote:'On Oct 14, webhooks were delayed by up to 47 minutes for 312 customers [1]. A deploy the day before left the queue consumer reading from a single partition [1]. The queue caused 9 of October’s 23 pages [2], and incident follow-up took half of two engineers’ sprint [3]. We’re adding partition-lag alerts and load testing all queue changes.'},
      {p:'If you want a sharper ask, the retro suggests a quarterly reliability week [3].'}]},
    {id:'build',icon:'◇',short:'What should we build next?',prompt:'Based on customer feedback, what should we build next?',keys:/build|feature|roadmap|next|request|prioriti/i,sources:['nps','roadmap','churn'],scores:[.91,.86,.74],
     think:'Look at what customers ask for most, then check what’s already planned so I don’t recommend something that’s already scheduled, and weigh it against churn reasons.',
     steps:[['search','search_workspace','"feature request"','31 results'],['read','read_document','NPS comments - Q3','293 rows'],['read','read_document','Q4 product roadmap','14 issues'],['read','read_document','Churn analysis - Q3','6 pages']],
     verify:['check','cross_reference','requests ↔ roadmap','1 overlap'],
     answer:[{p:'Keep bulk export where it is, and pull multi-region webhooks forward.'},
      {table:[['Item','Demand','Status'],['Bulk invoice export','64 accounts asked [1]','Sprint 23, Nov 17 [2]'],['Multi-region webhooks','Top churn reason, 41% [3]','Pushed to Q1 [2]']]},
      {p:'Bulk export is the most requested feature, but reliability is what’s losing accounts [3]. I’d bring webhooks back into Q4.'}]}
   ]},
  villas:{name:'Hồ Tràm Villas',initial:'H',color:'#6fd3a8',meta:'31 docs · Google Drive',about:'Hồ Tràm Villas’ bookings, reviews and ops docs',placeholder:'Ask about bookings, reviews, or rates…',
   docs:{
    occupancy:{kind:'Report',title:'Occupancy - September',meta:'Front office · 12 villas',tokens:3.6,body:['Overall occupancy 68%, average daily rate 3.2M₫.','<mark>Weekday occupancy is 49%; weekends run at 94%.</mark>']},
    corporate:{kind:'Inquiry tracker',title:'Corporate retreat inquiries',meta:'Sales inbox · since Aug 1',tokens:2.9,body:['Most asked for a meeting room with a projector.','<mark>11 companies asked about weekday team retreats; 3 booked.</mark>','The two lost deals went to resorts with packaged meals.']},
    rates:{kind:'Rate card',title:'Rate card 2026',meta:'Revenue · v2',tokens:1.8,body:['Weekday villa 2.6M₫, weekend villa 4.1M₫.','<mark>No midweek or group package is currently offered.</mark>']},
    reviews:{kind:'Review export',title:'Guest reviews - Q3',meta:'Booking.com + Google · 214 reviews',tokens:16.2,body:['Average rating 4.6 / 5.','<mark>Slow Wi-Fi in the garden villas comes up in 21 reviews.</mark>','Breakfast is mentioned in 38% of five-star reviews.']},
    maintenance:{kind:'Maintenance log',title:'Maintenance log - Jun–Sep',meta:'Facilities',tokens:4.7,body:['Pool pump serviced Aug 3.','<mark>Garden villa router replaced twice since June; contractor quotes 18M₫ for a mesh upgrade.</mark>']}
   },
   scenarios:[
    {id:'weekdays',icon:'◐',short:'How do we fill weekdays?',prompt:'Weekends are full. How do we fill weekdays?',keys:/weekday|fill|occupan|empty|book/i,sources:['occupancy','corporate','rates'],scores:[.93,.84,.77],
     think:'First confirm how big the weekday gap is. Then look for demand that already exists midweek, and check whether our pricing gives those guests a reason to book.',
     steps:[['search','search_workspace','"occupancy weekday"','6 results'],['read','read_document','Occupancy - September','2 pages'],['read','read_document','Corporate retreat inquiries','11 rows'],['read','read_document','Rate card 2026','1 page']],
     verify:['check','run_calculation','(94 − 49)','45 pt gap ✓'],
     answer:[{p:'There’s already midweek demand you’re not converting: team retreats.'},
      {ul:['Weekdays run at 49% against 94% on weekends [1].','11 companies asked about weekday retreats, but only 3 booked [2].','There is no group or midweek package on the rate card today [3].']},
      {p:'I’d package a Tuesday–Thursday retreat with the meeting room and meals included. The two lost deals went to resorts that offered exactly that [2].'}]},
    {id:'complaints',icon:'✦',short:'What are guests unhappy about?',prompt:'What are guests complaining about in recent reviews?',keys:/complain|review|guest|unhappy|rating|wifi|wi-fi/i,sources:['reviews','maintenance'],scores:[.96,.72],
     think:'Read the review export for recurring complaints, then check the maintenance log to see whether the issue is known and what fixing it would cost.',
     steps:[['search','search_workspace','"reviews Q3"','4 results'],['read','read_document','Guest reviews - Q3','214 reviews'],['read','read_document','Maintenance log - Jun–Sep','38 entries']],
     verify:['check','cross_reference','reviews ↔ maintenance','same villas ✓'],
     answer:[{p:'Ratings are strong overall at 4.6 [1], and one complaint stands out: Wi-Fi in the garden villas.'},
      {ul:['Slow Wi-Fi comes up in 21 reviews, all from garden villas [1].','The router there has been replaced twice since June [2].','A mesh upgrade is quoted at 18M₫ [2].']},
      {p:'Swapping routers hasn’t worked. The mesh upgrade costs about six weekday nights of revenue and fixes a problem that keeps appearing in public reviews.'}]},
    {id:'reply',icon:'✎',short:'Draft a reply to a Wi-Fi review',prompt:'Draft a reply to a guest review complaining about the Wi-Fi.',keys:/draft|reply|respond|write/i,sources:['reviews','maintenance'],scores:[.88,.85],
     think:'A good reply admits the problem, says what we’re doing about it, and stays short. I should check that the fix is real before promising it.',
     steps:[['search','search_workspace','"wifi garden villa"','5 results'],['read','read_document','Guest reviews - Q3','214 reviews'],['read','read_document','Maintenance log - Jun–Sep','38 entries']],
     verify:['check','policy_check','tone + no promised dates','passes ✓'],
     answer:[{p:'Here’s a short reply. It owns the problem without promising a date the team hasn’t agreed to:'},
      {quote:'Thank you for staying with us, and for being honest about the Wi-Fi. You’re right: the signal in the garden villas hasn’t been good enough [1]. We’ve replaced the router there already, and we’re now upgrading the whole area to a mesh network [2]. We’d love to welcome you back, with breakfast on us.'},
      {p:'Only send the mesh-network line once the 18M₫ upgrade is approved [2].'}]}
   ]}
};
let workspace = 'mira', docs, scenarios;
const fallback = {p:'This demo has three scripted questions per workspace, so I can’t look into that one. Try one of these instead:'};
const models = {flash:{name:'Lumen 2 Flash',wordDelay:24,stepDelay:480,thinkDelay:9},pro:{name:'Lumen 2 Pro',wordDelay:34,stepDelay:780,thinkDelay:16}};
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
let model = 'flash', run = 0, busy = false, readCount = 0, stepCount = 0, tokens = 0;
const wait = ms => new Promise(done => setTimeout(done, reduceMotion ? 0 : ms));
const announce = text => { $('#status').textContent = text; };
const scrollDown = () => { thread.scrollTop = thread.scrollHeight; };
function element(tag, className, text){ const node = document.createElement(tag); if (className) node.className = className; if (text !== undefined) node.textContent = text; return node; }
function suggestionButton(scenario, className){
  const button = element('button', className);
  button.type = 'button';
  if (className.startsWith('suggestion')) button.append(element('i', '', scenario.icon));
  button.append(scenario.short);
  button.addEventListener('click', () => ask(scenario.prompt));
  return button;
}
function renderSuggestions(){
  $('#suggestions').replaceChildren(); $('#history').replaceChildren();
  scenarios.forEach(scenario => { $('#suggestions').append(suggestionButton(scenario, 'suggestion')); $('#history').append(suggestionButton(scenario, 'history-item')); });
}
function renderWorkspaces(){
  for (const [key, space] of Object.entries(workspaces)){
    const button = element('button', 'workspace');
    button.type = 'button';
    button.dataset.workspace = key;
    button.style.setProperty('--ws', space.color);
    button.innerHTML = '<span class="ws-icon" aria-hidden="true"></span><span><span class="ws-name"></span><small></small></span>';
    button.querySelector('.ws-icon').textContent = space.initial;
    button.querySelector('.ws-name').textContent = space.name;
    button.querySelector('small').textContent = space.meta;
    button.addEventListener('click', () => setWorkspace(key));
    $('#workspaces').append(button);
    $('#ws-switch').append(new Option(space.name, key));
  }
  $('#ws-switch').addEventListener('change', event => setWorkspace(event.target.value));
}
function setWorkspace(key){
  if (key === workspace && docs) return;
  if (docs) newChat();
  workspace = key;
  ({docs, scenarios} = workspaces[key]);
  const space = workspaces[key];
  document.querySelectorAll('[data-workspace]').forEach(item => item.setAttribute('aria-pressed', String(item.dataset.workspace === key)));
  $('#ws-switch').value = key;
  $('#ws-about').textContent = space.about;
  input.placeholder = space.placeholder;
  renderSuggestions();
  resetSources();
  announce(`Switched to ${space.name}.`);
}
function setBusy(value){
  busy = value;
  sendButton.classList.toggle('stop', value);
  sendButton.setAttribute('aria-label', value ? 'Stop generating' : 'Send question');
  syncComposer();
}
function syncComposer(){ composer.classList.toggle('empty-input', !busy && !input.value.trim()); }
function resetSources(){
  readCount = stepCount = 0; tokens = 2.1;
  $('#source-list').innerHTML = '<li class="source-empty">Documents appear here as Lumen retrieves them.</li>';
  $('#source-count').textContent = '0';
  $('#run-steps').textContent = $('#run-read').textContent = '0';
  $('#run-time').textContent = '0.0s';
  setContext();
}
function setContext(){
  $('#context-value').textContent = `${tokens.toFixed(1)}k / 128k tokens`;
  $('#context-bar').style.width = `${Math.min(tokens / 128 * 100, 100)}%`;
}
function addSource(key, index, score){
  const doc = docs[key], list = $('#source-list');
  list.querySelector('.source-empty')?.remove();
  const item = element('li', 'source'), button = element('button');
  button.type = 'button';
  button.dataset.source = index;
  button.innerHTML = `<span class="num">${index}</span><span style="flex:1"><small></small><strong></strong><span class="score"><i style="--s:${score * 100}%"></i>${score.toFixed(2)}</span></span>`;
  button.querySelector('small').textContent = doc.kind;
  button.querySelector('strong').textContent = doc.title;
  button.addEventListener('click', () => openDoc(key));
  item.append(button);
  list.append(item);
  $('#source-count').textContent = list.children.length;
  tokens += doc.tokens; setContext();
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
  chip.addEventListener('click', () => focusSource(index));
  chip.addEventListener('mouseenter', () => showCitation(chip, key));
  chip.addEventListener('focus', () => showCitation(chip, key));
  chip.addEventListener('mouseleave', () => { popover.hidden = true; });
  chip.addEventListener('blur', () => { popover.hidden = true; });
  return chip;
}
async function streamInto(target, text, id, sources, delay = models[model].wordDelay){
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
function toolCard([kind, name, arg]){
  const card = element('div', `tool ${kind === 'check' ? 'verify' : ''} active`);
  card.innerHTML = `<div class="tool-head"><span class="tool-icon">${icons[kind]}</span><span class="tool-name"></span><span class="tool-arg"><b></b></span><span class="tool-status">running</span></div>`;
  card.querySelector('.tool-name').textContent = name;
  card.querySelector('.tool-arg b').textContent = `(${arg.startsWith('"') ? arg : `"${arg}"`})`;
  return card;
}
async function ask(text){
  text = text.trim();
  if (!text || busy) return;
  const id = ++run, started = performance.now(), scenario = scenarios.find(item => item.prompt === text) ?? scenarios.find(item => item.keys.test(text)), current = models[model];
  input.value = ''; resizeInput();
  addUserMessage(text);
  resetSources();
  setBusy(true);
  const message = element('article', 'message assistant'), orb = element('span', 'orb thinking'), body = element('div', 'answer streaming');
  orb.setAttribute('aria-hidden', 'true');
  message.setAttribute('aria-busy', 'true');
  message.setAttribute('aria-label', 'Lumen');
  message.append(orb);
  thread.append(message);
  scrollDown();
  let completed = true;
  const elapsed = () => `${((performance.now() - started) / 1000).toFixed(1)}s`;
  if (scenario){
    const thinking = element('details', 'thinking-block'), summary = element('summary'), thoughts = element('p', 'thoughts');
    summary.innerHTML = `${icons.chevron}<span class="shimmer">Thinking</span>`;
    thinking.open = true;
    thinking.append(summary, thoughts);
    message.append(thinking);
    completed = await streamInto(thoughts, scenario.think, id, scenario.sources, current.thinkDelay);
    summary.lastElementChild.className = '';
    summary.lastElementChild.textContent = completed ? `Thought for ${elapsed()}` : 'Stopped thinking';
    thinking.open = false;
    const tools = message.appendChild(element('div', 'tools'));
    const plan = model === 'pro' ? [...scenario.steps, scenario.verify] : scenario.steps;
    for (const step of plan){
      if (!completed || id !== run){ completed = false; break; }
      const card = tools.appendChild(toolCard(step));
      scrollDown();
      await wait(current.stepDelay);
      if (id !== run){ completed = false; break; }
      card.classList.remove('active');
      card.querySelector('.tool-status').textContent = step[3];
      $('#run-steps').textContent = ++stepCount;
      if (step[0] === 'read'){ readCount++; addSource(scenario.sources[readCount - 1], readCount, scenario.scores[readCount - 1]); $('#run-read').textContent = readCount; }
      $('#run-time').textContent = elapsed();
    }
    message.append(body);
    if (completed) for (const block of scenario.answer) if (!(completed = await renderBlock(block, body, id, scenario.sources))) break;
  } else {
    message.append(body);
    completed = await renderBlock(fallback, body, id, []);
    if (completed){ const row = body.appendChild(element('div', 'inline-suggestions')); scenarios.forEach(item => row.append(suggestionButton(item, 'suggestion small'))); }
  }
  $('#run-time').textContent = elapsed();
  orb.classList.remove('thinking');
  body.classList.remove('streaming');
  message.removeAttribute('aria-busy');
  if (!completed) body.append(element('p', 'stopped', 'Generation stopped.'));
  if (completed && scenario) message.append(actions(text, `${current.name} · ${readCount} sources · ${elapsed()}`));
  if (id === run) setBusy(false);
  announce(completed ? 'Lumen finished answering.' : 'Generation stopped.');
}
function iconButton(icon, label){
  const button = element('button');
  button.type = 'button';
  button.innerHTML = icons[icon];
  button.setAttribute('aria-label', label);
  button.title = label;
  return button;
}
function actions(prompt, meta){
  const bar = element('div', 'actions');
  const copy = iconButton('copy', 'Copy answer'), retry = iconButton('retry', 'Regenerate'), up = iconButton('up', 'Good answer'), down = iconButton('down', 'Bad answer');
  copy.addEventListener('click', async () => {
    const text = copy.closest('.message').querySelector('.answer').innerText;
    try { await navigator.clipboard.writeText(text); copy.title = 'Copied'; announce('Answer copied.'); } catch { announce('Copy unavailable.'); }
  });
  retry.addEventListener('click', () => ask(prompt));
  [up, down].forEach(button => {
    button.setAttribute('aria-pressed', 'false');
    button.addEventListener('click', () => { const on = button.getAttribute('aria-pressed') !== 'true'; up.setAttribute('aria-pressed', 'false'); down.setAttribute('aria-pressed', 'false'); button.setAttribute('aria-pressed', String(on)); });
  });
  bar.append(copy, retry, up, down, element('span', 'meta', meta));
  return bar;
}
function stop(){ run++; setBusy(false); }
function resizeInput(){ input.style.height = 'auto'; input.style.height = `${Math.min(input.scrollHeight, 180)}px`; syncComposer(); }
function toggleSources(open){
  const panel = $('#sources'), next = open ?? !panel.classList.contains('open');
  panel.classList.toggle('open', next);
  $('#sources-toggle').setAttribute('aria-expanded', String(next));
}
function setModel(next){
  model = next;
  $('#model-name').textContent = models[model].name;
  document.querySelectorAll('[data-model]').forEach(item => item.setAttribute('aria-checked', String(item.dataset.model === model)));
  $('#think-toggle').setAttribute('aria-pressed', String(model === 'pro'));
}
function toggleMenu(open){
  const button = $('#model-button'), menu = $('#model-menu');
  menu.hidden = !open;
  button.setAttribute('aria-expanded', String(open));
  if (open) menu.querySelector('[aria-checked=true]').focus();
}
function newChat(){ stop(); chat.classList.remove('started'); thread.replaceChildren(emptyState); resetSources(); input.focus(); }
composer.addEventListener('submit', event => { event.preventDefault(); busy ? stop() : ask(input.value); });
input.addEventListener('keydown', event => { if (event.key === 'Enter' && !event.shiftKey && !event.isComposing){ event.preventDefault(); if (!busy) ask(input.value); } });
input.addEventListener('input', resizeInput);
$('#model-button').addEventListener('click', () => toggleMenu($('#model-menu').hidden));
document.querySelectorAll('[data-model]').forEach(button => button.addEventListener('click', () => { setModel(button.dataset.model); toggleMenu(false); $('#model-button').focus(); }));
$('#think-toggle').addEventListener('click', () => setModel(model === 'pro' ? 'flash' : 'pro'));
document.addEventListener('click', event => { if (!event.target.closest('.picker')) toggleMenu(false); });
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !$('#model-menu').hidden){ toggleMenu(false); $('#model-button').focus(); }
  if (event.key === 'k' && (event.metaKey || event.ctrlKey)){ event.preventDefault(); newChat(); }
});
$('#new-chat').addEventListener('click', newChat);
$('#sources-toggle').addEventListener('click', () => toggleSources());
$('#sources-close').addEventListener('click', () => toggleSources(false));
thread.addEventListener('scroll', () => { popover.hidden = true; });
renderWorkspaces();
setWorkspace(workspace);
syncComposer();
