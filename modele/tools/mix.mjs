// Mix : voix calée (audio/voice.wav) + musique IziVoice (corps + fin naturelle calée sur le logo),
// musique baissée automatiquement sous la voix, normalisée à -14 LUFS. Usage : node tools/mix.mjs
import fs from 'fs'; import { execSync as x } from 'child_process';
const src = fs.readFileSync('timeline.js', 'utf8'); const TL = JSON.parse(src.slice(src.indexOf('=') + 1).trim().replace(/;$/, ''));
const MUSIC = 'audio/musique-energizing.mp3';
const END_SRC = 150.0, XF = 1.0;                 // début de la fin naturelle dans le morceau, durée du fondu enchaîné
const hit = ((TL.cues.logo || {}).start ?? TL.voiceEnd) - .55;   // la fin du morceau démarre juste avant le logo (cue « logo »)
const body = hit + XF;                           // longueur du corps (jusqu'à la fin du fondu)
const D = TL.duration;
const f = [
  `[1:a]atrim=0:${body},asetpts=PTS-STARTPTS[mb]`,
  `[1:a]atrim=${END_SRC},asetpts=PTS-STARTPTS[me]`,
  `[mb][me]acrossfade=d=${XF}:c1=tri:c2=tri,aresample=48000,aformat=channel_layouts=stereo,volume=0.55,afade=t=in:d=0.4,apad=whole_dur=${D},atrim=0:${D}[mus]`,
  `[0:a]aresample=48000,aformat=channel_layouts=stereo,asplit=2[v1][v2]`,
  `[mus][v1]sidechaincompress=threshold=0.025:ratio=7:attack=25:release=380:makeup=1[duck]`,
  `[duck][v2]amix=inputs=2:normalize=0:duration=first,loudnorm=I=-14:TP=-1.5:LRA=11,aresample=48000[out]`,
].join(';');
x(`ffmpeg -y -loglevel error -i audio/voice.wav -i "${MUSIC}" -filter_complex "${f}" -map "[out]" -ac 2 -ar 48000 -t ${D} audio/mix.wav`);
const lufs = x(`ffmpeg -hide_banner -i audio/mix.wav -af ebur128 -f null - 2>&1 | grep -E "^ +I:" | tail -1`).toString().trim();
console.log('mix ok —', D, 's —', lufs, '— fin de musique à', hit.toFixed(2), 's');
