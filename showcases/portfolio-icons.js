// Small inline SVGs keep directional icons out of platform emoji fonts.
(() => {
  const paths = {
    left: 'M19 12H5M11 6l-6 6 6 6',
    right: 'M5 12h14M13 6l6 6-6 6',
    up: 'M12 19V5M6 11l6-6 6 6',
    down: 'M12 5v14M6 13l6 6 6-6',
    download: 'M12 3v12M7 10l5 5 5-5M5 19h14',
    swap: 'M4 7h15M15 3l4 4-4 4M20 17H5M9 13l-4 4 4 4',
    reset: 'M4 10a8 8 0 1 1 1 7M4 4v6h6',
  };
  // Outlined diagonals retain the original text glyph size and spacing.
  const diagonalPaths = {
    'up-right': 'M75 78L861 -711L871 -500L900 -500C902 -622 909 -690 930 -810C810 -789 742 -782 620 -780L620 -751L831 -741L46 49Z',
    'down-left': 'M928 -837L139 -49L129 -260L100 -260C98 -137 91 -71 70 50C191 29 257 22 380 20L380 -9L169 -19L957 -807Z',
    'up-left': 'M138.672 -722.656L437.012 -722.656L313.477 -599.121L861.328 -51.27L810.547 -0L262.207 -548.34L138.672 -424.805Z',
    'down-right': 'M861.328 -0L563.477 -0L687.012 -123.535L138.672 -671.875L189.941 -722.656L737.793 -174.805L861.328 -298.34Z',
  };
  const directions = { '←':'left', '↑':'up', '→':'right', '↓':'down', '↖':'up-left', '↗':'up-right', '↘':'down-right', '↙':'down-left', '↧':'download', '⇄':'swap', '↺':'reset' };
  function arrow(direction) {
    if (diagonalPaths[direction]) {
      return `<svg class="portfolio-arrow" data-direction="${direction}" data-arrow-style="text" xmlns="http://www.w3.org/2000/svg" viewBox="0 -900 1000 1000" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false"><path d="${diagonalPaths[direction]}"/></svg>`;
    }
    const path = paths[direction];
    if (!path) throw new Error(`Unknown arrow direction: ${direction}`);
    return `<svg class="portfolio-arrow" data-direction="${direction}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="${path}"/></svg>`;
  }
  // html() is for authored markup; text() escapes text before adding SVGs.
  function html(markup) { return String(markup).replace(/[←↑→↓↖↗↘↙↧⇄↺][\uFE0E\uFE0F]?/gu, match => arrow(directions[match[0]])); }
  function text(value) { return html(String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]))); }
  window.portfolioIcons = Object.freeze({arrow, html, text});
})();
