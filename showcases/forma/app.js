const studies = [
 {id:'001',title:'An angled dialogue.',short:'An angled dialogue',category:'form',label:'Form & mass',image:'concrete',alt:'Angular metal-clad building with a triangular glazed facade',inquiry:'Intersection',material:'Metal / glass',description:'A solid volume and a transparent plane meet at an acute angle. The study considers how a single diagonal can organise an entire composition.',notes:'Where two systems meet, a third space emerges. The opaque surface describes weight; the glazed plane describes lightness. This observation follows the line between them, from the ground to the cantilever. The accompanying schematic isolates that relationship as a simple composition of intersecting planes.'},
 {id:'002',title:'The rhythm of repetition.',short:'The rhythm of repetition',category:'envelope',label:'Building envelope',image:'facade',alt:'Three stepped glass towers reflecting the overcast sky',inquiry:'Module & repetition',material:'Reflective glazing',description:'A repeating grid gives scale to a large surface. Reflections interrupt its regularity, allowing the facade to register the city around it.',notes:'A facade is both a surface and a measuring device. Each repeated module offers a familiar unit; the accumulation of those units describes the whole. The schematic examines a stepped outline with a regular structural rhythm, using a single highlighted bay to make the pattern legible.'},
 {id:'003',title:'A space held open.',short:'A space held open',category:'form',label:'Form & mass',image:'curves',alt:'Curving white buildings framing an open blue sky',inquiry:'Figure & void',material:'Layered white surfaces',description:'Curved edges frame a piece of sky. The empty space becomes the centre of the composition, shaped by the buildings that surround it.',notes:'Sometimes the most important part of a building is the space it leaves behind. This study starts with the void: an opening that gathers light, connects views, and gives the surrounding mass a shared centre. The diagram is an abstract exploration of enclosure, not a drawing of the photographed building.'}
];
const $ = selector => document.querySelector(selector);
let selected = 0;
let representation = 'photo';
const frame = (content, label) => `<svg viewBox="0 0 800 500" role="img" aria-label="${label}"><defs><pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse"><path d="M0 6L6 0" stroke="#b9bcb4" stroke-width=".5"/></pattern></defs>${content}<g fill="#85877f" font-family="Arial,sans-serif" font-size="9"><text x="48" y="460">ABSTRACT COMPOSITION</text><text x="660" y="460">NOT TO SCALE</text></g><path d="M48 434h90m-90-4v8m45-8v8m45-8v8" fill="none" stroke="#54594f"/></svg>`;
const drawings = [
 frame('<g fill="none" stroke="#383d36" stroke-width="1.5"><path d="M170 340L430 340 600 200 340 200Z" fill="url(#hatch)"/><path d="M170 340V230L340 90 600 90V200M340 90V200M430 340V230L600 90M170 230H430"/><path d="M170 340L330 380 330 190 170 230M330 190L450 120 450 310 330 380"/><path d="M130 365H650M370 65V400" stroke="#a3a79d" stroke-dasharray="4 5"/><path d="M170 340L450 120" stroke="#cf382b" stroke-width="3"/></g><g font-family="Arial" font-size="11" fill="#555b52"><text x="480" y="75">01 / SOLID</text><text x="100" y="215">02 / PLANE</text><text x="440" y="375" fill="#cf382b">LINE OF INTERSECTION</text></g>', 'Abstract axonometric drawing of two intersecting volumes'),
 frame('<g fill="none" stroke="#383d36" stroke-width="1.3"><path d="M160 365V180H240V125H320V80H480V125H560V180H640V365Z" fill="url(#hatch)"/><path d="M160 225H640M160 270H640M160 315H640M240 180H560M320 125H480M200 180V365M240 125V365M280 125V365M320 80V365M360 80V365M400 80V365M440 80V365M480 80V365M520 125V365M560 180V365M600 180V365"/><path d="M130 380H670"/><rect x="360" y="225" width="40" height="45" fill="#cf382b" stroke="#cf382b"/></g><g fill="#555b52" font-family="Arial" font-size="11"><text x="162" y="405">REPEAT / MODULATE / REFLECT</text><text x="440" y="250" fill="#cf382b">← ONE MODULE</text></g>', 'Abstract stepped elevation with a single module highlighted in red'),
 frame('<g fill="none" stroke="#383d36" stroke-width="1.5"><path d="M130 120Q400 400 670 120L670 230Q400 490 130 230Z" fill="url(#hatch)"/><path d="M180 75Q400 300 620 75M180 95Q400 320 620 95M180 115Q400 340 620 115M130 145Q400 425 670 145M130 170Q400 450 670 170M130 195Q400 475 670 195"/><path d="M400 50V410M95 230H705" stroke="#adb0a5" stroke-dasharray="4 6"/><ellipse cx="400" cy="150" rx="100" ry="70" stroke="#cf382b" stroke-width="2" stroke-dasharray="4 4"/></g><g fill="#cf382b" font-family="Arial" font-size="11"><text x="374" y="150">THE VOID</text></g>', 'Abstract curved enclosure around a highlighted central void')
];
function renderIndex(){
 if (!$('#project-list').children.length) {
  $('#project-list').innerHTML = studies.map(study => `<button class="project-item" data-id="${study.id}" aria-controls="viewer"><span class="project-number">${study.id.slice(1)}</span><span class="project-item-copy">${study.short}</span><span class="project-current" aria-hidden="true">→</span></button>`).join('');
 }
 for (const button of $('#project-list').children) {
  const active=button.dataset.id===studies[selected].id;
  button.classList.toggle('active',active);
  if(active)button.setAttribute('aria-current','true');else button.removeAttribute('aria-current');
 }
}
function render(){
 const study=studies[selected];
 $('#project-title').textContent=study.title;
 $('#project-category').textContent=`${study.label.toUpperCase()} / STUDY ${study.id}`;
 $('#current-number').textContent=study.id.slice(1);
 $('#project-image').src=`assets/${study.image}.jpg`;
 $('#project-image').alt=study.alt;
 $('#image-caption').textContent=`${study.id.slice(1)}.1 / REFERENCE PHOTOGRAPH`;
 $('#project-description').textContent=study.description;
 $('#project-inquiry').textContent=study.inquiry;
 $('#project-material').textContent=study.material;
 $('#sheet-number').textContent=`F-${study.id}`;
 $('#drawing').innerHTML=drawings[selected];
 $('#notes-title').textContent=study.title;
 $('#notes-copy').textContent=study.notes;
 $('#notes-number').textContent=study.id;
 $('#page-count').textContent=`${selected+1} of ${studies.length}`;
 $('#previous').disabled=selected===0;
 $('#next').disabled=selected===studies.length-1;
 renderIndex();
}
$('#project-list').addEventListener('click',event=>{
 const button=event.target.closest('[data-id]');
 if(!button)return;
 selected=studies.findIndex(study=>study.id===button.dataset.id);
 render();
 if(matchMedia('(max-width:700px)').matches)$('#viewer').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
});
function step(delta){selected=Math.max(0,Math.min(studies.length-1,selected+delta));render();}
$('#previous').addEventListener('click',()=>step(-1));$('#next').addEventListener('click',()=>step(1));
for(const button of document.querySelectorAll('[data-view]'))button.addEventListener('click',()=>{representation=button.dataset.view;$('#photo-view').hidden=representation!=='photo';$('#drawing-view').hidden=representation!=='drawing';for(const item of document.querySelectorAll('[data-view]')){const active=item===button;item.classList.toggle('active',active);item.setAttribute('aria-pressed',String(active));}});
function openDialog(id){$(id).showModal();document.body.classList.add('modal-open');}
$('#info-open').addEventListener('click',()=>openDialog('#notes'));$('#practice-open').addEventListener('click',()=>openDialog('#practice'));
$('#expand').addEventListener('click',()=>{const study=studies[selected];$('#large-image').src=`assets/${study.image}.jpg`;$('#large-image').alt=study.alt;openDialog('#lightbox');});
for(const dialog of document.querySelectorAll('dialog')){dialog.querySelector('.close').addEventListener('click',()=>dialog.close());dialog.addEventListener('close',()=>document.body.classList.remove('modal-open'));dialog.addEventListener('click',event=>{const rect=dialog.getBoundingClientRect();if(event.target===dialog&&(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom))dialog.close();});}
render();
