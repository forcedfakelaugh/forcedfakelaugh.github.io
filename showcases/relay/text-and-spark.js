// Native DOM ports of React Bits DecryptedText and ClickSpark (see CREDITS.md).
const reduce = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
const isSpace = char => /\s/.test(char);
const DEFAULT_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+';

// Each character holds its width with a hidden ghost, so scrambling never shifts the layout.
export function createDecrypted(element, { speed = 40, maxIterations = 10, sequential = false, direction = 'start', characters = DEFAULT_CHARS } = {}) {
  element.setAttribute('data-no-translate', '');
  const pool = Array.from(characters);
  const reader = document.createElement('span');
  reader.className = 'sr-only';
  const visual = document.createElement('span');
  visual.className = 'decrypted';
  visual.setAttribute('aria-hidden', 'true');
  element.replaceChildren(reader, visual);
  let chars = [];
  let glyphs = [];
  let timer = 0;
  let text = '';

  const build = () => {
    chars = Array.from(text);
    glyphs = [];
    visual.replaceChildren();
    let word = null;
    chars.forEach(char => {
      if (isSpace(char)) {
        word = null;
        visual.append(document.createTextNode(char));
        glyphs.push(null);
        return;
      }
      if (!word) {
        word = document.createElement('span');
        word.className = 'decrypted-word';
        visual.append(word);
      }
      const cell = document.createElement('span');
      cell.className = 'decrypted-cell';
      const ghost = document.createElement('span');
      ghost.className = 'decrypted-ghost';
      ghost.textContent = char;
      const glyph = document.createElement('span');
      glyph.className = 'decrypted-glyph';
      glyph.textContent = char;
      cell.append(ghost, glyph);
      word.append(cell);
      glyphs.push(glyph);
    });
  };

  const order = () => {
    const list = [];
    chars.forEach((char, index) => { if (!isSpace(char)) list.push(index); });
    if (direction === 'end') return list.reverse();
    if (direction === 'center') {
      const middle = Math.floor(chars.length / 2);
      return list.sort((a, b) => Math.abs(a - middle) - Math.abs(b - middle));
    }
    return list;
  };

  const paint = revealed => {
    glyphs.forEach((glyph, index) => {
      if (!glyph) return;
      const open = revealed === true || revealed.has(index);
      glyph.textContent = open ? chars[index] : pool[Math.floor(Math.random() * pool.length)];
      glyph.classList.toggle('is-encrypted', !open);
    });
  };

  const controller = {
    enabled: () => true,
    set(next, animate = true) {
      clearInterval(timer);
      timer = 0;
      if (next !== text) {
        text = next;
        reader.textContent = next;
        build();
      }
      if (!animate || reduce() || !controller.enabled()) {
        paint(true);
        return;
      }
      const revealed = new Set();
      const queue = order();
      let iteration = 0;
      paint(revealed);
      timer = setInterval(() => {
        iteration++;
        let done;
        if (sequential) {
          const index = queue.shift();
          if (index !== undefined) revealed.add(index);
          done = queue.length === 0;
        } else {
          done = iteration >= maxIterations;
        }
        paint(done ? true : revealed);
        if (done) {
          clearInterval(timer);
          timer = 0;
        }
      }, Math.max(16, speed));
    }
  };
  return controller;
}

// One fixed canvas for the page instead of the upstream per-burst canvases.
export function createClickSpark({ color = '#fff', enabled = () => true, size = 14, radius = 34, count = 10, width = 2, duration = 480 } = {}) {
  const canvas = document.createElement('canvas');
  canvas.className = 'spark-layer';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.append(canvas);
  const ctx = canvas.getContext('2d');
  const bursts = [];
  const api = { color };
  let raf = 0;
  const ratio = () => Math.min(window.devicePixelRatio || 1, 2);
  const resize = () => {
    canvas.width = Math.round(innerWidth * ratio());
    canvas.height = Math.round(innerHeight * ratio());
  };
  addEventListener('resize', resize);
  resize();
  const ease = t => 1 - Math.pow(1 - t, 3);
  const frame = now => {
    raf = 0;
    ctx.setTransform(ratio(), 0, 0, ratio(), 0, 0);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let b = bursts.length - 1; b >= 0; b--) {
      const burst = bursts[b];
      const p = (now - burst.start) / duration;
      if (p >= 1) {
        bursts.splice(b, 1);
        continue;
      }
      const e = ease(Math.max(0, p));
      ctx.strokeStyle = burst.color;
      ctx.lineCap = 'butt';
      ctx.globalAlpha = Math.pow(1 - p, 2) * 0.7;
      ctx.lineWidth = Math.max(0.5, width * (1 - p));
      ctx.beginPath();
      ctx.arc(burst.x, burst.y, 2 + radius * 0.6 * e, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 1 - Math.max(0, (p - 0.55) / 0.45);
      ctx.lineWidth = width;
      for (const spark of burst.sparks) {
        const distance = radius * spark.reach * e;
        const length = size * spark.reach * Math.pow(1 - p, 1.6);
        ctx.beginPath();
        ctx.moveTo(burst.x + Math.cos(spark.angle) * distance, burst.y + Math.sin(spark.angle) * distance);
        ctx.lineTo(burst.x + Math.cos(spark.angle) * (distance + length), burst.y + Math.sin(spark.angle) * (distance + length));
        ctx.stroke();
      }
    }
    if (bursts.length) raf = requestAnimationFrame(frame);
    else ctx.clearRect(0, 0, innerWidth, innerHeight);
  };
  addEventListener('pointerdown', event => {
    if (!enabled() || reduce()) return;
    bursts.push({
      x: event.clientX,
      y: event.clientY,
      start: performance.now(),
      color: api.color,
      sparks: Array.from({ length: count }, (_, i) => ({ angle: (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.25, reach: 0.8 + Math.random() * 0.4 }))
    });
    if (!raf) raf = requestAnimationFrame(frame);
  }, { passive: true });
  return api;
}
