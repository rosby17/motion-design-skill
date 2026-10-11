# Pièges rencontrés (à relire avant chaque rendu)

- **Chromium de Playwright ne lit pas le H.264** : vidéos de fond et vitrines en WebM VP9 (`-g 10` pour des recherches rapides).
- **Le ffmpeg du Mac (Homebrew) n'a souvent ni `drawtext` ni `libass`** : textes en HTML (moteur) ou en PNG + ffconcat, jamais via ffmpeg.
- **zsh ne découpe pas les variables** : `node tools/stills.mjs 169 $TS` passe UN seul argument → écrire `${=TS}`.
- **Ne jamais écrire avec ffmpeg dans le fichier qu'on lit** (`-i audio/voice.wav … audio/voice.wav` l'a vidé) : sortie dans un autre fichier.
- **Python** : le python système de macOS a parfois numpy + Pillow et celui de Homebrew non ; mettre mlx-whisper dans un environnement dédié.
- **Noms de variables** dans le moteur : ne pas appeler une fonction `s1()` si une scène s'appelle `s1` (« already declared », page blanche).
- **BSD sed** (macOS) ne connaît pas `\b` : remplacements complexes en python ou perl.
- **Masques de titres** (`overflow: hidden`) : un texte trop large est coupé net → réduire la police par format.
- **Timings** : une scène qui finit juste quand la voix finit sa phrase ne laisse rien voir (un site qui se charge) → respiration (`inserts`).
- **Clones de voix** : certains récitent un autre texte → toujours transcrire la prise avant de l'utiliser.
- **Transitions** : la première bande d'un balayage a la couleur du fond suivant ; même couleur que la scène = on croit à un texte coupé.
- **`background-clip:text`** ne suit pas les lettres transformées : pour une photo dans des lettres animées, un fond par lettre.
- **Traînées et particules** : les recalculer depuis les positions passées à l'instant t (pas d'état accumulé) pour un rendu image par image exact.
- **Images IA reçues** : noms décalés d'un rang, personne qui ne correspond pas au public → vérifier avant le rendu.
- **Deux sessions / personnes sur le même projet** : l'une change la voix ou la timeline pendant que l'autre livre → une seule à la fois,
  et vérifier `timeline.js` et la durée des rendus avant de livrer.
- **Téléchargements depuis un studio en ligne** : certaines URL exigent la session du navigateur (curl échoue) → télécharger depuis le navigateur.
