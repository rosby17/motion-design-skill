// Liste les fichiers médias présents (pour les remplacements automatiques). Usage : node tools/media-list.mjs
import fs from 'fs';
const files = ['assets/gen/flow', 'assets/stock'].flatMap(d => fs.existsSync(d) ? fs.readdirSync(d).map(f => `${d}/${f}`) : []).concat(['assets/photo.jpg']);
fs.writeFileSync('media-available.js', `// généré par tools/media-list.mjs\nwindow.AVAILABLE = ${JSON.stringify(files)};\n`);
console.log(files.join('\n'));
