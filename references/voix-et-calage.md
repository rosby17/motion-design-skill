# Voix off et calage au mot près

## Générer (iziVoice)
- Outil MCP `izivoice` : `generate_speech(voice_id, text, speed)` puis `get_task_status` → `audio_url` à télécharger avec curl.
- **Une seule prise pour tout le texte** sur un spot (ton homogène). Pour un texte long (≥ 1 min 30, ou une pub de plusieurs
  minutes) : **une prise par phrase ou par paragraphe**, chacune transcrite au mot près, puis assemblées : on refait une phrase sans
  tout régénérer.
- Vitesse : préciser la vitesse quand on présente des essais (certains outils appliquent un ralenti par défaut). « Voix plus forte »
  = vitesse naturelle (1.0) + compression + présence au mixage.
- Les réglages de la voix choisie (identifiant, vitesse) sont dans `prive/REGLAGES.md` s'il existe.
- Trouver une voix : `list_voices(language: fr, page_size: 300)` puis chercher dans le fichier (le résultat est trop gros pour le chat).
- Ne jamais cloner la voix d'un tiers sans son accord (narrateur d'une pub de référence, etc.).

## Essais de voix
- 4 à 6 voix sur le **même passage** (accroche + titre + offre), fichiers `0-actuelle.mp3`, `1-nom-style.mp3`… dans `audio/tests-voix/`,
  dossier ouvert pour le client, tableau « voix / style ». Inclure au moins une voix au public local (accent du pays du client).
- Le client ne veut pas d'aller-retour : faire les essais, les transcrire, choisir la plus juste, garder les autres à disposition.
- **Toujours transcrire une prise avant de l'utiliser** : certains clones récitent un AUTRE texte que celui demandé.

## Temps des mots
- Transcrire en local (les outils de voix transcrivent mal leurs propres fichiers) : mlx-whisper sur Mac Apple Silicon,
  `mlx_whisper.transcribe(f, language="fr", word_timestamps=True, path_or_hf_repo="mlx-community/whisper-large-v3-turbo")`
  (ailleurs : faster-whisper ou whisper.cpp avec horodatage des mots).
- Compléter avec les silences : `ffmpeg -i voix.mp3 -af silencedetect=noise=-38dB:d=0.15 -f null -`.
- Whisper « invente » parfois du texte après la fin : vérifier le volume réel de la fin avant de couper.
- La transcription ne prouve pas la prononciation (un nom de marque peut être transcrit comme un mot courant) : écouter.

## voice-segments.json
`{ file, tempo, lead, tail, inserts: [{at, dur, why}], segments: [[cue, début, fin, texte]] }` (temps dans la prise source).
- `inserts` = respirations ajoutées au montage (laisser un numéro affiché, une page se charger, une pause musicale).
- `node tools/timeline-voice.mjs <fichier>` → `audio/voice.wav` + `timeline.js` (cues recalées + enveloppe de la voix pour les effets).
- Plusieurs voix possibles pour un même moteur : un fichier `voice-segments-<voix>.json` par voix ; changer de voix = relancer
  timeline + mix, les scènes suivent toutes seules.
- Exemple complet : `modele/voice-segments-exemple.json`.
