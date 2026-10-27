import { mkdir, copyFile, cp, access } from 'node:fs/promises';
await mkdir('dist', { recursive: true });
for (const file of ['index.html', 'style.css', 'app.js', 'favicon.svg']) await copyFile(file, `dist/${file}`);
for (const directory of ['assets', 'showcases', 'hidden']) {
  try { await access(directory); } catch { continue; }
  await cp(directory, `dist/${directory}`, { recursive: true, filter: source => !source.split(/[\\/]/).some(part => ['.git', '.openai', 'node_modules'].includes(part)) });
}
console.log('Built portfolio and showcases in dist/.');
