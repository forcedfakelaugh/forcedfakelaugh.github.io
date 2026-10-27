const studies = [
 {id:'001',title:'An angled dialogue.',short:'An angled dialogue',category:'form',label:'Form & mass',caption:'REFERENCE PHOTOGRAPH',source:'TAA DESIGN',image:'taa-balconies',alt:'Planted cantilevered balconies with warm lighting at Cat Vang Hotel, from TAA DESIGN',inquiry:'Intersection',material:'Solid planes / glass / planting',description:'Deep balconies project from the building in alternating layers. Trees and warm interior light soften the solid edges, opening small gardens above the street.',notes:'Solid balcony edges meet open pockets of greenery in this image from TAA DESIGN. The projecting volumes create depth, shade, and small outdoor spaces at each level. The schematic explores the meeting of a solid and a plane as an independent composition; it is not a drawing of this building.'},
 {id:'002',title:'The rhythm of repetition.',short:'The rhythm of repetition',category:'form',label:'Form & mass',caption:'REFERENCE PHOTOGRAPH',source:'TAA DESIGN',image:'taa-rhythm',alt:'Repeating rectangular facade frames and slatted screens surrounded by dense greenery, from TAA DESIGN',inquiry:'Module & repetition',material:'Slatted screens / glass / planting',description:'Deep rectangular frames repeat across the facade, enclosing glazed openings and planted ledges. Slatted screens cast narrow shadows, while cascading greenery softens the regular grid.',notes:'Warm-toned frames give the facade a clear sequence of repeating bays. Vertical slats add a finer rhythm within each frame, and plants spill across the edges to interrupt the grid. The accompanying elevation is an abstract study of repetition, not a drawing of this building.'},
 {id:'003',title:'A space held open.',short:'A space held open',category:'form',label:'Form & mass',caption:'REFERENCE PHOTOGRAPH',source:'UNSPLASH',image:'hive-singapore',alt:'Curved concrete walkways and hanging greenery around the central atrium of The Hive, Singapore',inquiry:'Figure & void',material:'Concrete / glass / planting',description:'At The Hive in Singapore, curved walkways gather around a tall central opening. Their layered edges and hanging plants give the void a visible shape, connecting the different levels through light and views.',notes:'The photograph looks down through the central space of The Hive. Rounded walkways project toward the opening, forming a sequence of shared edges around the void. Plants soften the concrete and reveal the depth between levels. The curved schematic explores enclosure independently; it does not reproduce the building plan.'}
];
const $ = selector => document.querySelector(selector);
let selected = 0;
let representation = 'photo';
const frame = (content, label) => `<svg viewBox="0 0 800 500" role="img" aria-label="${label}"><defs><pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse"><path d="M0 6L6 0" stroke="#b9bcb4" stroke-width=".5"/></pattern></defs>${content}<g fill="#85877f" font-family="Arial,sans-serif" font-size="9"><text x="48" y="460">ABSTRACT COMPOSITION</text><text x="660" y="460">NOT TO SCALE</text></g><path d="M48 434h90m-90-4v8m45-8v8m45-8v8" fill="none" stroke="#54594f"/></svg>`;
function intersectionDrawing() {
 // One parallel projection for the unit box and the cutting plane z = .2 + .6x.
 const project = ([x, y, z]) => `${+(170 + 260*x + 170*y).toFixed(2)} ${+(340 - 140*y - 110*z).toFixed(2)}`;
 const path = (points, closed = false) => `M${points.map(project).join('L')}${closed ? 'Z' : ''}`;
 const a = [0,0,0], b = [1,0,0], c = [1,1,0], d = [0,1,0];
 const e = [0,0,1], f = [1,0,1], g = [1,1,1], h = [0,1,1];
 const onPlane = (x, y) => [x, y, .2 + .6*x];
 const plane = [[-.2,-.2],[1.2,-.2],[1.2,1.2],[-.2,1.2]].map(([x,y]) => onPlane(x,y));
 // The section is bounded by the four vertical faces of the box.
 const [p, q, r, s] = [[0,0],[1,0],[1,1],[0,1]].map(([x,y]) => onPlane(x,y));
 return frame(`
  <g stroke-linejoin="round" stroke-linecap="round">
   <path d="M130 390H690M370 65V415" fill="none" stroke="#a3a79d" stroke-width="1" stroke-dasharray="4 5"/>
   <path d="${path([e,f,g,h],true)}" fill="#faf7f0" fill-opacity=".45"/>
   <path d="${path([a,b,f,e],true)}" fill="#f4ede2" fill-opacity=".5"/>
   <path d="${path([b,c,g,f],true)}" fill="#8c917f" fill-opacity=".08"/>
   <path d="${path(plane,true)}" fill="#8eaaa1" fill-opacity=".12" stroke="#7e8b80" stroke-width="1"/>
   <path d="${path([p,q,r,s],true)}" fill="url(#hatch)"/>
   <path d="${path([a,d,c])}${path([d,h])}" fill="none" stroke="#92988b" stroke-width="1" stroke-dasharray="5 5"/>
   <path d="${path([a,b,c,g,h,e,a])}${path([e,f,g])}${path([b,f])}" fill="none" stroke="#383d36" stroke-width="1.5"/>
   <path d="${path([r,s,p])}" fill="none" stroke="#cf382b" stroke-opacity=".5" stroke-width="1.5" stroke-dasharray="5 5"/>
   <path d="${path([p,q,r])}" fill="none" stroke="#cf382b" stroke-width="2.5"/>
   <path d="M430 252L465 300V348" fill="none" stroke="#cf382b" stroke-width=".8"/>
  </g>
  <g font-family="Arial" font-size="11" fill="#555b52">
   <text x="480" y="75">01 / SOLID</text>
   <text x="85" y="383">02 / PLANE</text>
   <text x="450" y="370" fill="#cf382b">LINE OF INTERSECTION</text>
  </g>`, 'Axonometric drawing of a solid cut by a single inclined plane, with visible and hidden intersection edges');
}
const drawings = [
 intersectionDrawing(),
 frame('<g fill="none" stroke="#383d36" stroke-width="1.3"><path d="M160 365V180H240V125H320V80H480V125H560V180H640V365Z" fill="url(#hatch)"/><path d="M160 225H640M160 270H640M160 315H640M240 180H560M320 125H480M200 180V365M240 125V365M280 125V365M320 80V365M360 80V365M400 80V365M440 80V365M480 80V365M520 125V365M560 180V365M600 180V365"/><path d="M130 380H670"/><rect x="360" y="225" width="40" height="45" fill="#cf382b" stroke="#cf382b"/></g><g fill="#555b52" font-family="Arial" font-size="11"><text x="162" y="405">REPEAT / MODULATE / REFLECT</text><path d="M453 246h-12m5-5-5 5 5 5" fill="none" stroke="#cf382b" stroke-width="1.3"/><text x="460" y="250" fill="#cf382b">ONE MODULE</text></g>', 'Abstract stepped elevation with a single module highlighted in red'),
 frame('<g fill="none" stroke="#383d36" stroke-width="1.5"><path d="M130 120Q400 400 670 120L670 230Q400 490 130 230Z" fill="url(#hatch)"/><path d="M180 75Q400 300 620 75M180 95Q400 320 620 95M180 115Q400 340 620 115M130 145Q400 425 670 145M130 170Q400 450 670 170M130 195Q400 475 670 195"/><path d="M400 50V410M95 230H705" stroke="#adb0a5" stroke-dasharray="4 6"/><ellipse cx="400" cy="150" rx="100" ry="70" stroke="#cf382b" stroke-width="2" stroke-dasharray="4 4"/></g><g fill="#cf382b" font-family="Arial" font-size="11"><text x="374" y="150">THE VOID</text></g>', 'Abstract curved enclosure around a highlighted central void')
];
function renderIndex(){
 if (!$('#project-list').children.length) {
  $('#project-list').innerHTML = studies.map(study => `<button class="project-item" data-id="${study.id}" aria-controls="viewer"><span class="project-number">${study.id.slice(1)}</span><span class="project-item-copy">${study.short}</span><span class="project-current" aria-hidden="true">${window.portfolioIcons.arrow("right")}</span></button>`).join('');
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
 $('#image-caption').textContent=`${study.id.slice(1)}.1 / ${study.caption} / ${study.source}`;
 $('#large-image-caption').textContent=`${study.caption} / ${study.source}`;
 $('#project-description').textContent=study.description;
 $('#project-inquiry').textContent=study.inquiry;
 $('#project-material').textContent=study.material;
 $('#sheet-number').textContent=`N-${study.id}`;
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
