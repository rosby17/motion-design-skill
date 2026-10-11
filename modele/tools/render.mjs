// Rendu final : Playwright capture chaque image, ffmpeg assemble en H.264 + AAC.
// Usage : node tools/render.mjs <format 169|916|11|45> <sortie.mp4> [fps=60] [début] [fin]
import { chromium } from 'playwright'; import { spawn } from 'child_process'; import path from 'path'; import fs from 'fs';
const f = process.argv[2] || '169', out = process.argv[3] || `renders/spot-${f}.mp4`;
const src = fs.readFileSync('timeline.js', 'utf8'); const TL = JSON.parse(src.slice(src.indexOf('=') + 1).trim().replace(/;$/, ''));
const FPS = +(process.argv[4] || 60), t0 = +(process.argv[5] || 0), t1 = +(process.argv[6] || TL.duration);
const W = f === '169' ? 1920 : 1080, H = { 169: 1080, 916: 1920, 11: 1080, 45: 1350 }[f];
const n = Math.round((t1 - t0) * FPS);
const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
  '-ss', String(t0), '-t', String(t1 - t0), '-i', 'audio/mix.wav',
  '-c:v', 'libx264', '-preset', 'slow', '-crf', '20', '-pix_fmt', 'yuv420p', '-profile:v', 'high', '-r', String(FPS),
  '-c:a', 'aac', '-b:a', '160k', '-shortest', '-movflags', '+faststart', out], { stdio: ['pipe', 'inherit', 'inherit'] });
const b = await chromium.launch(); const pg = await b.newPage({ viewport: { width: W, height: H } });
pg.on('pageerror', e => console.error('page:', e.message));
await pg.goto('file://' + path.resolve('index.html') + '?render&f=' + f); await pg.evaluate(() => window.ready);
const T0 = Date.now();
for (let i = 0; i < n; i++) {
  await pg.evaluate(t => window.renderAt(t), t0 + i / FPS);
  const buf = await pg.screenshot({ type: 'jpeg', quality: 95 });
  if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
  if (i % 600 === 0) console.log(`[${f}] ${i}/${n} images — ${((Date.now() - T0) / 1000).toFixed(0)} s`);
}
ff.stdin.end(); await new Promise(r => ff.on('close', r)); await b.close();
console.log('terminé :', out, ((Date.now() - T0) / 1000).toFixed(0), 's');
