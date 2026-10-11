// Builds audio/voice.wav + timeline.js from a single IziVoice take and voice-segments.json.
// Source times are mapped through tempo, lead-in and inserted pauses. Usage: node tools/timeline-voice.mjs
import fs from 'fs'; import { execSync as x } from 'child_process';
const cfg = JSON.parse(fs.readFileSync(process.argv[2] || 'voice-segments.json', 'utf8'));
const FPS = 60, SR = 48000, k = 1 / cfg.tempo;
const ins = [...cfg.inserts].sort((a, b) => a.at - b.at);
const map = s => cfg.lead + s * k + ins.filter(i => i.at <= s).reduce((a, i) => a + i.dur, 0);
const srcDur = +x(`ffprobe -v error -show_entries format=duration -of csv=p=0 "${cfg.file}"`).toString();
const voiceEnd = map(srcDur);
const duration = +(voiceEnd + cfg.tail).toFixed(3);
// cut source at insert points, delay each piece to its mapped start
const cuts = [0, ...ins.map(i => i.at), srcDur];
const parts = cuts.slice(0, -1).map((a, i) => ({ a, b: cuts[i + 1] }));
const f = parts.map((p, i) => `[0]atrim=${p.a}:${p.b},asetpts=PTS-STARTPTS,aresample=${SR},atempo=${cfg.tempo},adelay=${Math.round(map(p.a) * 1000)}:all=1[p${i}]`).join(';');
const mix = parts.map((_, i) => `[p${i}]`).join('') + `amix=inputs=${parts.length}:normalize=0,apad=whole_dur=${duration}[out]`;
x(`ffmpeg -y -loglevel error -i "${cfg.file}" -filter_complex "${f};${mix}" -map "[out]" -ar ${SR} -ac 1 -t ${duration} audio/voice.wav`);
const pcm = x(`ffmpeg -loglevel error -i audio/voice.wav -f f32le -ac 1 -ar ${SR} -`, { maxBuffer: 1 << 28 });
const s = new Float32Array(pcm.buffer, pcm.byteOffset, pcm.length / 4);
const hop = SR / FPS, env = [];
for (let i = 0; i * hop < s.length; i++) {
  let a = 0; const o = Math.floor(i * hop);
  for (let j = 0; j < hop && o + j < s.length; j++) a += s[o + j] ** 2;
  env.push(Math.sqrt(a / hop));
}
const mx = Math.max(...env) || 1;
const cues = Object.fromEntries(cfg.segments.map(([id, a, b, text]) => [id, { start: +map(a).toFixed(3), end: +map(b).toFixed(3), text }]));
const TL = { duration, fps: FPS, voiceEnd: +voiceEnd.toFixed(3), cues, env: env.map(v => +Math.min(1, v / mx * 1.4).toFixed(3)) };
fs.writeFileSync('timeline.js', `// généré par tools/timeline-voice.mjs — ne pas modifier à la main\nwindow.TL=${JSON.stringify(TL)};\n`);
console.log('durée totale', duration, '— fin de voix', voiceEnd.toFixed(2));
for (const [id, c] of Object.entries(cues)) console.log(c.start.toFixed(2).padStart(6), c.end.toFixed(2).padStart(6), id);
