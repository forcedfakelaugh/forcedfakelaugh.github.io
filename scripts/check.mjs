import { readdir, readFile, access } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { resolve, dirname, extname } from 'node:path';
const root = process.cwd();
async function walk(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (['.git', 'dist', 'node_modules'].includes(entry.name)) continue;
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(path)); else files.push(path);
  }
  return files;
}
let issues = 0;
const svgIds = new Map();
const files = await walk(root);
for (const file of files) {
  if (['.js', '.mjs'].includes(extname(file))) {
    const result = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
    if (result.status !== 0) { console.error(result.stderr); issues++; }
  }
  if (extname(file) !== '.html') continue;
  const html = await readFile(file, 'utf8');
  for (const [, link] of html.matchAll(/(?:src|href)=["']([^"']+)["']/g)) {
    if (/^(?:[a-z][a-z\d+.-]*:|#|\/\/)/i.test(link)) continue;
    const pathname = decodeURIComponent(link.split(/[?#]/)[0]);
    if (!pathname) continue;
    const target = pathname.startsWith('/') ? resolve(root, '.' + pathname) : resolve(dirname(file), pathname);
    try {
      await access(target);
      const fragment = link.split('#')[1];
      if (fragment && extname(target) === '.svg') {
        if (!svgIds.has(target)) svgIds.set(target, new Set([...(await readFile(target, 'utf8')).matchAll(/\bid=["']([^"']+)["']/g)].map(match => match[1])));
        if (!svgIds.get(target).has(decodeURIComponent(fragment))) { console.error(`Missing SVG symbol: ${file} → ${link}`); issues++; }
      }
    } catch { console.error(`Missing local target: ${file} → ${link}`); issues++; }
  }
}
if (issues) process.exit(1);
console.log(`Syntax and local asset/link checks passed across ${files.length} files. No browser or database tests run.`);
