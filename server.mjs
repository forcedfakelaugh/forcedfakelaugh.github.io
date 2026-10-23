import { createServer } from 'node:http';
import { stat, readFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('.', import.meta.url));
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.woff2': 'font/woff2', '.ico': 'image/x-icon', '.md': 'text/plain; charset=utf-8', '.txt': 'text/plain; charset=utf-8' };
const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost');
    const pathname = decodeURIComponent(url.pathname);
    if (pathname.split('/').some(part => part.startsWith('.'))) { res.writeHead(404).end('Not found'); return; }
    let file = resolve(root, '.' + pathname);
    if (file !== root.slice(0, -1) && !file.startsWith(root)) { res.writeHead(404).end('Not found'); return; }
    if ((await stat(file)).isDirectory()) {
      if (!pathname.endsWith('/')) { res.writeHead(301, { Location: url.pathname + '/' + url.search }).end(); return; }
      file = resolve(file, 'index.html');
    }
    if (!types[extname(file)] || file.includes(`${sep}scripts${sep}`)) { res.writeHead(404).end('Not found'); return; }
    const data = await readFile(file);
    res.writeHead(200, { 'Content-Type': types[extname(file)], 'X-Content-Type-Options': 'nosniff', 'Cache-Control': 'no-cache' });
    res.end(req.method === 'HEAD' ? undefined : data);
  } catch { res.writeHead(404, { 'Content-Type': 'text/plain' }).end('Page not found'); }
});
server.on('error', error => { console.error(`Could not start preview: ${error.message}`); process.exit(1); });
server.listen(Number(process.env.PORT || 4174), '127.0.0.1', () => console.log(`Lucas portfolio: http://127.0.0.1:${server.address().port}`));
