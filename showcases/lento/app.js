import * as THREE from './vendor/three.module.min.js';
import { GLTFLoader } from './vendor/GLTFLoader.js';

const sceneElement = document.querySelector('#scene');
const canvas = document.querySelector('#lamp-canvas');
const motionQuery = matchMedia('(prefers-reduced-motion: reduce)');
const mobileQuality = innerWidth < 761 || matchMedia('(pointer: coarse)').matches;
const finishes = { clay: { color: '#b95735', name: 'Terracotta' }, chalk: { color: '#ded8ca', name: 'Chalk' }, olive: { color: '#626954', name: 'Olive' } };
const state = { finish: 'clay', brightness: .75, on: true, paused: motionQuery.matches, rotation: 0, pointerX: 0, pointerY: 0 };
const sections = ['top', 'inside', 'play'].map(id => document.getElementById(id));
const translate = text => window.showcaseLanguage?.translate(text) || text;
let renderer, renderFrame = 0, contextLost = false;
let requestRender = () => {};

function labels() {
  document.querySelectorAll('[data-power]').forEach(button => {
    button.setAttribute('aria-pressed', String(state.on));
    button.setAttribute('aria-label', translate(state.on ? 'Turn the lamp off' : 'Turn the lamp on'));
    button.querySelector('[data-power-label]').textContent = translate(state.on ? 'Lights on' : 'Lights off');
  });
  document.querySelector('#finish-name').textContent = translate(finishes[state.finish].name);
  document.querySelector('#motion-toggle').setAttribute('aria-pressed', String(state.paused));
  document.querySelector('#motion-toggle').setAttribute('aria-label', translate(state.paused ? 'Resume ambient motion' : 'Pause ambient motion'));
  document.querySelector('[data-motion-label]').textContent = translate(state.paused ? 'Resume motion' : 'Pause motion');
  document.querySelector('[data-motion-icon]').textContent = state.paused ? '▷' : 'Ⅱ';
}
document.querySelectorAll('[data-finish]').forEach(button => button.addEventListener('click', () => {
  state.finish = button.dataset.finish;
  document.querySelectorAll('[data-finish]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  labels(); requestRender();
}));
document.querySelectorAll('[data-power]').forEach(button => button.addEventListener('click', () => { state.on = !state.on; labels(); requestRender(); }));
document.querySelector('#brightness').addEventListener('input', event => {
  state.brightness = Number(event.target.value) / 100;
  document.querySelector('#brightness-value').textContent = `${event.target.value}%`;
  state.on = true; labels(); requestRender();
});
document.querySelector('#rotation').addEventListener('input', event => { state.rotation = Number(event.target.value) * Math.PI / 180; requestRender(); });
document.querySelector('#motion-toggle').addEventListener('click', () => { state.paused = !state.paused; labels(); requestRender(); });
motionQuery.addEventListener('change', event => { state.paused = event.matches; labels(); requestRender(); });
window.addEventListener('showcase-language', () => { labels(); requestRender(); });
window.addEventListener('pointermove', event => {
  if (event.pointerType !== 'mouse' || state.paused) return;
  state.pointerX = event.clientX / innerWidth - .5;
  state.pointerY = event.clientY / innerHeight - .5;
  requestRender();
}, { passive: true });
window.addEventListener('scroll', () => { requestRender(); }, { passive: true });
labels();

function fallback(message = 'A still preview is shown because 3D is unavailable on this device.') {
  sceneElement.classList.remove('is-ready');
  document.body.classList.add('is-static');
  document.querySelector('#render-status').textContent = translate(message);
  document.querySelectorAll('.configurator button,.configurator input,[data-power],#motion-toggle').forEach(control => { control.disabled = true; });
  if (renderFrame) cancelAnimationFrame(renderFrame);
  renderFrame = 0;
  requestRender = () => {};
}

try {
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, mobileQuality ? 1.25 : 1.8));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  initScene();
} catch (error) {
  console.warn('Lento 3D preview unavailable:', error);
  fallback();
}

function initScene() {
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-5, 5, 2.8, -2.8, .1, 80);
  camera.position.set(0, 4.5, 9);
  camera.lookAt(0, 1.45, 0);
  const screenUp = new THREE.Vector3(0, 1, 0).applyQuaternion(camera.quaternion);
  const world = new THREE.Group(); scene.add(world);
  const lamp = new THREE.Group(); world.add(lamp);
  const lampMaterials = [];
  let lampEmitter;
  const scenery = new THREE.Group(); world.add(scenery);

  // A small, locally generated studio environment provides broad reflections.
  const environmentScene = new THREE.Scene();
  environmentScene.add(new THREE.Mesh(new THREE.BoxGeometry(18, 18, 18), new THREE.MeshBasicMaterial({ color: '#bcb9ad', side: THREE.BackSide })));
  for (const [x, y, z, width, height, color] of [[-5, 3, 3, 4, 7, '#ffffff'], [5, 5, 0, 3, 6, '#f6ead3'], [0, 6, -5, 5, 3, '#ffffff']]) {
    const panel = new THREE.Mesh(new THREE.PlaneGeometry(width, height), new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide }));
    panel.position.set(x, y, z); panel.lookAt(0, 1, 0); environmentScene.add(panel);
  }
  const pmrem = new THREE.PMREMGenerator(renderer);
  const environment = pmrem.fromScene(environmentScene, .04);
  scene.environment = environment.texture;
  pmrem.dispose();
  environmentScene.traverse(object => { if (object.isMesh) { object.geometry.dispose(); object.material.dispose(); } });

  const stone = new THREE.MeshStandardMaterial({ color: '#b5b3a6', roughness: .94, envMapIntensity: .25 });
  const textures = new THREE.TextureLoader();
  const surfaceMap = (file, options = {}) => {
    const texture = textures.load(`assets/${file}`, () => { requestRender(); }, undefined, () => {
      sceneElement.dataset.surfaceDetail = 'partial';
    });
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(...(options.repeat || [1, 1]));
    texture.offset.set(...(options.offset || [0, 0]));
    texture.anisotropy = Math.min(mobileQuality ? 2 : 8, renderer.capabilities.getMaxAnisotropy());
    if (options.color) texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  };
  // Use one uninterrupted stone slab, excluding the source texture's grout lines.
  const stoneUV = { repeat: [.22, .14], offset: [.10, .05] };
  stone.map = surfaceMap('stone-color.jpg', { ...stoneUV, color: true });
  stone.normalMap = surfaceMap('stone-normal.jpg', stoneUV);
  stone.normalScale.set(.18, .18);
  stone.roughnessMap = surfaceMap('stone-roughness.jpg', stoneUV);
  const mesh = (geometry, material, parent, x = 0, y = 0, z = 0) => {
    const object = new THREE.Mesh(geometry, material); object.position.set(x, y, z);
    object.castShadow = true; object.receiveShadow = true; parent.add(object); return object;
  };
  // The model's upper jaw rests at y=0; its screw pad sits 0.02016m below.
  // Fit the tabletop between those jaws, with its right edge inside the clamp.
  const lampScale = 4.1;
  const deskThickness = .02016 * lampScale;
  const deskEdge = .95;
  const deskWidth = 2.15, deskDepth = 1.45;
  const deskCenter = deskEdge - deskWidth / 2;
  const deskShape = new THREE.Shape();
  const halfWidth = deskWidth / 2 - .012, halfDepth = deskDepth / 2 - .012, radius = .045;
  deskShape.moveTo(-halfWidth + radius, -halfDepth);
  deskShape.lineTo(halfWidth - radius, -halfDepth);
  deskShape.quadraticCurveTo(halfWidth, -halfDepth, halfWidth, -halfDepth + radius);
  deskShape.lineTo(halfWidth, halfDepth - radius);
  deskShape.quadraticCurveTo(halfWidth, halfDepth, halfWidth - radius, halfDepth);
  deskShape.lineTo(-halfWidth + radius, halfDepth);
  deskShape.quadraticCurveTo(-halfWidth, halfDepth, -halfWidth, halfDepth - radius);
  deskShape.lineTo(-halfWidth, -halfDepth + radius);
  deskShape.quadraticCurveTo(-halfWidth, -halfDepth, -halfWidth + radius, -halfDepth);
  const deskGeometry = new THREE.ExtrudeGeometry(deskShape, { depth: deskThickness - .012, bevelEnabled: true, bevelThickness: .006, bevelSize: .012, bevelSegments: 3, steps: 1, curveSegments: 12 });
  deskGeometry.rotateX(Math.PI / 2);
  deskGeometry.translate(deskCenter, -.006, 0);
  const deskPosition = deskGeometry.attributes.position;
  const deskUV = deskGeometry.attributes.uv;
  for (let i = 0; i < deskPosition.count; i++) {
    deskUV.setXY(i, (deskPosition.getX(i) - deskCenter) / deskWidth + .5, deskPosition.getZ(i) / deskDepth + .5);
  }
  mesh(deskGeometry, stone, scenery);
  // One small notebook keeps the desktop coherent and the lamp prominent.
  const book = new THREE.Group(); scenery.add(book); book.position.set(-.47, -.01, .08); book.rotation.y = -.12; book.scale.setScalar(.72);
  const coverMat = new THREE.MeshStandardMaterial({ color: '#6b735e', roughness: .9 });
  mesh(new THREE.BoxGeometry(.95, .065, 1.15), coverMat, book, 0, .015);
  mesh(new THREE.BoxGeometry(.91, .11, 1.1), new THREE.MeshStandardMaterial({ color: '#e6ddc8', roughness: .9 }), book, 0, .09);
  mesh(new THREE.BoxGeometry(.95, .027, 1.15), coverMat, book, 0, .16);
  const models = new GLTFLoader();
  models.loadAsync(`assets/desk-lamp${mobileQuality ? '-mobile' : ''}.glb`).then(({ scene: model }) => {
    if (contextLost) return;
    let emittingMesh;
    model.scale.setScalar(lampScale);
    model.rotation.y = Math.PI / 2;
    model.position.set(deskEdge - .018 * lampScale, 0, .3);
    model.traverse(object => {
      if (!object.isMesh) return;
      object.castShadow = object.receiveShadow = true;
      for (const material of Array.isArray(object.material) ? object.material : [object.material]) {
        material.envMapIntensity = 1.1;
        for (const key of ['map', 'normalMap', 'roughnessMap', 'metalnessMap']) {
          if (material[key]) material[key].anisotropy = Math.min(mobileQuality ? 2 : 8, renderer.capabilities.getMaxAnisotropy());
        }
        if (material.name.endsWith('_light')) {
          emittingMesh = object;
          lampEmitter = material;
          material.emissive.set('#ffd8a0');
          material.emissiveIntensity = 2.5 * state.brightness;
        } else {
          // Recolor only the orange painted surfaces; preserve steel and wear.
          const finishUniform = { value: new THREE.Color(finishes[state.finish].color) };
          material.onBeforeCompile = shader => {
            shader.uniforms.lentoFinish = finishUniform;
            shader.fragmentShader = shader.fragmentShader.replace('#include <common>', '#include <common>\nuniform vec3 lentoFinish;');
            shader.fragmentShader = shader.fragmentShader.replace('#include <map_fragment>', `#include <map_fragment>
              float paintMask = smoothstep(1.35, 2.5, diffuseColor.r / max(diffuseColor.g, 0.012)) * smoothstep(0.045, 0.16, diffuseColor.r);
              float paintShade = clamp(diffuseColor.r / 0.32, 0.25, 1.8);
              diffuseColor.rgb = mix(diffuseColor.rgb, lentoFinish * paintShade, paintMask);`);
          };
          material.customProgramCacheKey = () => 'lento-painted-metal-v1';
          lampMaterials.push(finishUniform);
        }
      }
    });
    lamp.add(model);
    world.updateMatrixWorld(true);
    if (emittingMesh) {
      const lightCenter = new THREE.Box3().setFromObject(emittingMesh).getCenter(new THREE.Vector3());
      bulb.position.copy(lamp.worldToLocal(lightCenter));
      bulb.position.y -= .12;
    }
    sceneElement.dataset.lamp = 'ready';
    requestRender();
  }).catch(error => {
    console.warn('Lento lamp model unavailable:', error);
    fallback();
  });
  const loadProp = async (file, fallbackObject, { width: propWidth, x, z, rotation }) => {
    try {
      const { scene: model } = await models.loadAsync(`assets/${file}${mobileQuality ? '-mobile' : ''}.glb`);
      const bounds = new THREE.Box3().setFromObject(model);
      const size = bounds.getSize(new THREE.Vector3());
      const center = bounds.getCenter(new THREE.Vector3());
      const factor = propWidth / Math.max(size.x, size.z);
      model.scale.setScalar(factor);
      model.position.set(-center.x * factor, -bounds.min.y * factor + .006, -center.z * factor);
      model.traverse(object => {
        if (!object.isMesh) return;
        object.castShadow = object.receiveShadow = true;
        for (const material of Array.isArray(object.material) ? object.material : [object.material]) {
          material.envMapIntensity = .7;
          for (const key of ['map', 'normalMap', 'roughnessMap', 'metalnessMap']) {
            if (material[key]) material[key].anisotropy = Math.min(mobileQuality ? 2 : 8, renderer.capabilities.getMaxAnisotropy());
          }
        }
      });
      const placement = new THREE.Group();
      placement.name = file;
      placement.position.set(x, 0, z);
      placement.rotation.y = rotation;
      placement.add(model);
      scenery.add(placement);
      scenery.remove(fallbackObject);
      fallbackObject.traverse(object => { if (object.isMesh) object.geometry.dispose(); });
      sceneElement.dataset[file] = 'ready';
      requestRender();
    } catch (error) {
      sceneElement.dataset[file] = 'fallback';
      console.warn(`Lento ${file} detail unavailable:`, error);
    }
  };
  loadProp('notebook', book, { width: .82, x: -.47, z: .08, rotation: -.12 });
  const glowCanvas = document.createElement('canvas'); glowCanvas.width = glowCanvas.height = 128;
  const glowContext = glowCanvas.getContext('2d');
  const glowGradient = glowContext.createRadialGradient(64, 64, 0, 64, 64, 64);
  glowGradient.addColorStop(0, 'rgba(255,204,111,.7)'); glowGradient.addColorStop(.4, 'rgba(255,201,107,.35)'); glowGradient.addColorStop(1, 'rgba(255,201,107,0)');
  glowContext.fillStyle = glowGradient; glowContext.fillRect(0, 0, 128, 128);
  const glow = new THREE.Mesh(new THREE.PlaneGeometry(deskWidth - .15, deskDepth - .15), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(glowCanvas), transparent: true, depthWrite: false, opacity: .18, blending: THREE.AdditiveBlending }));
  glow.position.set(deskCenter, .008, 0); glow.rotation.x = -Math.PI / 2; scenery.add(glow);

  const fill = new THREE.HemisphereLight('#fff9eb', '#8c8475', .4); scene.add(fill);
  const key = new THREE.DirectionalLight('#fff3dc', 2.2); key.position.set(-3.5, 7, 4); scene.add(key);
  const shadowSize = mobileQuality ? 512 : 2048;
  key.castShadow = true; key.shadow.mapSize.set(shadowSize, shadowSize);
  key.shadow.camera.left = -7; key.shadow.camera.right = 7; key.shadow.camera.top = 7; key.shadow.camera.bottom = -7;
  key.shadow.normalBias = .025; key.shadow.bias = -.0001; key.shadow.radius = 4;
  const rim = new THREE.DirectionalLight('#ffffff', 1.4); rim.position.set(4, 3, -3); scene.add(rim);
  const bulb = new THREE.PointLight('#ffcc91', 10 * state.brightness, 7, 2); bulb.position.set(-.08, 2.25, 1.62); lamp.add(bulb);

  let mobile = innerWidth < 761, height = 0, width = 0;
  let bounds = [], clock = 0, last = performance.now(), sceneInView = true;
  let lampTurn = 0;
  const color = new THREE.Color();
  const mobileStages = [...document.querySelectorAll('[data-mobile-stage]')];
  const mobileCamera = camera.clone();
  const projectedBounds = new THREE.Box3();
  const corner = new THREE.Vector3();
  let stageBounds = [];
  const stagePoses = [
    { turn: -.4, zoom: .93 },
    { turn: .9, zoom: 1.04 },
    { turn: -2.7, zoom: .93 },
  ];
  // Fit the actual mesh bounds to a portrait frame, including the clamp and desk.
  function frameMobileCamera(frame, zoom) {
    mobileCamera.updateMatrixWorld(true);
    world.updateMatrixWorld(true);
    projectedBounds.makeEmpty();
    world.traverse(object => {
      if (!object.isMesh || object === glow) return;
      if (!object.geometry.boundingBox) object.geometry.computeBoundingBox();
      const { min, max } = object.geometry.boundingBox;
      for (let i = 0; i < 8; i++) {
        corner.set(i & 1 ? max.x : min.x, i & 2 ? max.y : min.y, i & 4 ? max.z : min.z);
        corner.applyMatrix4(object.matrixWorld).applyMatrix4(mobileCamera.matrixWorldInverse);
        projectedBounds.expandByPoint(corner);
      }
    });
    const centerX = (projectedBounds.min.x + projectedBounds.max.x) / 2;
    const centerY = (projectedBounds.min.y + projectedBounds.max.y) / 2;
    const aspect = frame.width / frame.height;
    const halfHeight = Math.max(
      (projectedBounds.max.y - projectedBounds.min.y) / 2,
      (projectedBounds.max.x - projectedBounds.min.x) / (2 * aspect),
    ) / zoom;
    mobileCamera.left = centerX - halfHeight * aspect;
    mobileCamera.right = centerX + halfHeight * aspect;
    mobileCamera.top = centerY + halfHeight;
    mobileCamera.bottom = centerY - halfHeight;
    mobileCamera.updateProjectionMatrix();
  }
  function renderMobile() {
    // One GPU canvas renders into real layout slots. No pixel anchors or jumps
    // between chapters, and no 3D drawing over text or touch controls.
    const canvasRect = canvas.getBoundingClientRect();
    renderer.setScissorTest(false);
    renderer.setViewport(0, 0, width, height);
    renderer.clear();
    renderer.setScissorTest(true);
    world.position.set(0, 0, 0);
    world.scale.setScalar(1);
    world.visible = true;
    let activeChapter = 0, closest = Infinity;
    stageBounds.forEach((frame, index) => {
      const top = frame.top - scrollY - canvasRect.top;
      if (top >= height || top + frame.height <= 0) return;
      const distance = Math.abs(top + frame.height / 2 - height / 2);
      if (distance < closest) { activeChapter = index; closest = distance; }
      const pose = stagePoses[index];
      const progress = clamp((height - top) / (height + frame.height));
      const travel = motionQuery.matches || state.paused ? 0 : (progress - .5) * .5;
      world.rotation.y = pose.turn + travel + (index === 2 ? lampTurn : 0);
      frameMobileCamera(frame, pose.zoom);
      const bottom = height - top - frame.height;
      renderer.setViewport(frame.left, bottom, frame.width, frame.height);
      renderer.setScissor(frame.left, Math.max(0, bottom), frame.width, Math.max(0, Math.min(height, top + frame.height) - Math.max(0, top)));
      renderer.render(scene, mobileCamera);
    });
    renderer.setScissorTest(false);
    renderer.setViewport(0, 0, width, height);
    return activeChapter;
  }
  const clamp = value => Math.max(0, Math.min(1, value));
  const smooth = value => { const t = clamp(value); return t * t * (3 - 2 * t); };
  const mix = THREE.MathUtils.lerp;
  const measure = (force = false) => {
    const nextWidth = innerWidth, nextHeight = sceneElement.clientHeight;
    if (!force && width === nextWidth && height === nextHeight) return;
    const resized = width !== nextWidth || height !== nextHeight;
    width = nextWidth; height = nextHeight; mobile = width < 761;
    // Only reallocate the drawing buffer when its actual CSS size changes.
    if (resized) renderer.setSize(width, height, false);
    const halfHeight = 2.8;
    camera.left = -halfHeight * width / height; camera.right = halfHeight * width / height;
    camera.top = halfHeight; camera.bottom = -halfHeight; camera.updateProjectionMatrix();
    bounds = sections.map(section => { const rect = section.getBoundingClientRect(); return { top: rect.top + scrollY, height: rect.height }; });
    stageBounds = mobileStages.map(stage => {
      const rect = stage.getBoundingClientRect();
      return { top: rect.top + scrollY, left: rect.left, width: rect.width, height: rect.height };
    });
    requestRender();
  };
  let measureFrame = 0;
  window.addEventListener('resize', () => {
    if (!measureFrame) measureFrame = requestAnimationFrame(() => { measureFrame = 0; measure(); });
  }, { passive: true });
  const layoutObserver = new ResizeObserver(() => measure(true));
  sections.forEach(section => layoutObserver.observe(section));
  mobileStages.forEach(stage => layoutObserver.observe(stage));
  document.fonts.ready.then(() => measure(true));
  window.addEventListener('showcase-language', () => requestAnimationFrame(() => measure(true)));
  measure();

  function draw(now) {
    renderFrame = 0;
    if (contextLost) return;
    if (document.hidden || !sceneInView) { last = now; return; }
    const dt = Math.min((now - last) / 1000, .05); last = now;
    if (!state.paused) clock += dt;
    const revealing = sceneElement.dataset.lamp === 'ready' && !sceneElement.classList.contains('is-ready');
    const damping = revealing || motionQuery.matches ? 1 : 1 - Math.exp(-dt * 8);
    const scroll = scrollY;
    let x = camera.right * .43, y = -.05, scale = 1.12, targetInspection = 0, sectionIndex = 0, turnProgress = 0;
    if (!mobile) {
      const anatomyIn = smooth((scroll - bounds[1].top + height * .65) / (height * .85));
      const playIn = smooth((scroll - bounds[2].top + height * .9) / (height * .65));
      const turnStart = bounds[1].top - height * .65;
      const turnEnd = bounds[2].top - height * .25;
      turnProgress = smooth((scroll - turnStart) / (turnEnd - turnStart));
      targetInspection = anatomyIn * (1 - playIn);
      x = mix(camera.right * .37, -camera.right * .48, playIn);
      scale = mix(mix(1.12, 1.32, targetInspection), .94, playIn);
      y = mix(-.05, 1, playIn) - targetInspection * .2;
      if (anatomyIn > .5) sectionIndex = 1;
      if (playIn > .5) sectionIndex = 2;
    }
    world.visible = true;
    // Reduced motion retains useful scroll states without interpolated travel.
    const movement = state.paused || mobile ? 0 : Math.sin(clock * .45) * .035;
    const pointerRotation = state.paused || mobile ? 0 : state.pointerX * .22;
    // Half a turn leaves the lamp facing right at the configurator.
    // Reduced motion switches poses directly without the scroll-driven spin.
    const scrollTurn = mobile ? 0 : (motionQuery.matches ? (sectionIndex === 2 ? 1 : 0) : turnProgress) * Math.PI;
    const targetTurn = state.rotation + pointerRotation + movement - scrollTurn;
    lampTurn = mix(lampTurn, targetTurn, damping);
    if (Math.abs(lampTurn - targetTurn) < .001) lampTurn = targetTurn;
    world.position.copy(screenUp).multiplyScalar(y); world.position.x = x;
    world.scale.setScalar(scale);
    // Turn the mounted assembly together so the jaws never leave the desk edge.
    world.rotation.y = -.35 + lampTurn;
    color.set(finishes[state.finish].color);
    for (const uniform of lampMaterials) uniform.value.lerp(color, damping);
    const intensity = state.on ? state.brightness : 0;
    if (lampEmitter) lampEmitter.emissiveIntensity = mix(lampEmitter.emissiveIntensity, intensity * 2.5, damping);
    bulb.intensity = mix(bulb.intensity, intensity * 10, damping);
    glow.material.opacity = intensity * .24;
    const settling = lampTurn !== targetTurn
      || lampMaterials.some(uniform => Math.abs(uniform.value.r - color.r) + Math.abs(uniform.value.g - color.g) + Math.abs(uniform.value.b - color.b) > .001)
      || Math.abs(bulb.intensity - intensity * 10) > .001
      || (lampEmitter && Math.abs(lampEmitter.emissiveIntensity - intensity * 2.5) > .001);
    if (mobile) sectionIndex = renderMobile();
    else renderer.render(scene, camera);
    // Reveal only a rendered model in the current scroll pose, never a stale frame.
    if (revealing) sceneElement.classList.add('is-ready');
    if (sceneElement.dataset.chapter !== String(sectionIndex)) sceneElement.dataset.chapter = String(sectionIndex);
    if ((!state.paused && !mobile) || settling) requestRender();
  }
  requestRender = () => {
    if (!renderFrame && !contextLost && !document.hidden && sceneInView) renderFrame = requestAnimationFrame(draw);
  };
  new IntersectionObserver(([entry]) => {
    sceneInView = entry.isIntersecting;
    if (sceneInView) requestRender();
  }).observe(sceneElement);
  requestRender();
  canvas.addEventListener('webglcontextlost', event => { event.preventDefault(); contextLost = true; fallback('The 3D preview paused. Reload to try again.'); });
  document.addEventListener('visibilitychange', () => { requestRender(); last = performance.now(); });
  window.addEventListener('pagehide', () => { if (renderFrame) cancelAnimationFrame(renderFrame); renderFrame = 0; });
  window.addEventListener('pageshow', event => { if (event.persisted && !contextLost) { last = performance.now(); requestRender(); } });
}
