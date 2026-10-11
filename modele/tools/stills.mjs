// Images fixes de contrôle : node tools/stills.mjs <format> t1 t2 ...  → stills/<format>-tXX.jpg
import { chromium } from 'playwright'; import fs from 'fs'; import path from 'path';
const f = process.argv[2], times = process.argv.slice(3).map(Number);
const W = f === '169' ? 1920 : 1080, H = { 169: 1080, 916: 1920, 11: 1080, 45: 1350 }[f];
const b = await chromium.launch(); const pg = await b.newPage({ viewport: { width: W, height: H } });
const errs = []; pg.on('pageerror', e => errs.push(e.message));
await pg.goto('file://' + path.resolve('index.html') + '?render&f=' + f);
await pg.evaluate(() => window.ready);
fs.mkdirSync('stills', { recursive: true });
for (const t of times) { await pg.evaluate(t => window.renderAt(t), t); await pg.screenshot({ path: `stills/${f}-t${t.toFixed(2).padStart(6, '0')}.jpg`, type: 'jpeg', quality: 80 }); }
console.log(f, times.length, 'images', errs.length ? '\nERREURS:\n' + errs.join('\n') : 'ok');
await b.close();
