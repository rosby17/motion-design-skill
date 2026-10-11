# Vidéos longues (YouTube 8 à 25 min) : montage par script Python + ffmpeg

Pour 10 à 25 minutes, on ne monte pas scène par scène en HTML : un moteur `montage.py` assemble images, voix, musique et textes.
Le défaut le plus reproché est « c'est basique » : il se corrige dans le MODÈLE de montage de la chaîne, pas vidéo par vidéo.

## Les images suivent la voix
- L'image à l'écran montre l'objet, le lieu ou le geste dont la voix parle À CE MOMENT : jamais des images posées en tranches égales.
- Repères phrase par phrase : transcription au mot près → 60 à 80 ancres → une image par ancre (36 à 45 images pour 13 min ; une
  image peut revenir). Une image différente toutes les 15 à 20 s au plus ; 4 photos pour 12 min = trop basique.
- Regarder la planche d'images (une vignette par ancre) AVANT le rendu.
- Mouvement permanent : zoom lent / travelling sur chaque image, fondus enchaînés, particules ou lueur, vignettage.
- Sujets d'actualité : écrans graphiques (cartes de citation, chiffres, classements) dans l'univers du sujet (stade de nuit pour le foot),
  coupes rapides, plans courts (< 3 s pour les extraits ré-édités).

## Textes et sous-titres
- Toujours des sous-titres karaoké mot à mot + des cartons de section, et un `.srt` pour YouTube.
- Sans sous-titres : afficher l'onde de la voix.
- Le ffmpeg de macOS n'a souvent ni `drawtext` ni `libass` : textes rendus en PNG (Pillow) puis assemblés par `ffconcat`.
- Logo de la chaîne assez grand pour se voir en miniature (≈ 230 px sur 1080p), éléments fixes de la marque toujours au même endroit.

## Musique
- Jamais une seule piste en boucle sur 10 min : enchaîner plusieurs pistes (ordre différent d'une vidéo à l'autre, fondus, même volume),
  réserve d'au moins 8 pistes par chaîne.
- Toujours audible : environ −14 dB sous la voix (on l'entend dans les pauses). À −27 dB, on ne l'entend plus.

## Rendu
- `libx264 -preset slow -crf 20 -tune animation` pour les styles dessinés, sinon `-crf 20` ; audio `aac 160k`, `-movflags +faststart`.
- Vidéos à grain / particules : HEVC 3 Mb/s (`hevc_videotoolbox` sur Mac) : 2 à 3 fois plus léger que le H.264 pour le même rendu.
- Version verticale (short) seulement pour les chaînes qui en ont besoin : extrait de 58 s à partir de l'accroche.

## Les fichiers d'une chaîne
`_montage/montage.py` (plan + rendu), `textes.py` (sous-titres, cartons, .srt), `ancres.json` (repères), une identité de chaîne
(logo, police, couleurs, musiques) et un ADN écrit (ton, structure, interdits). Toute nouvelle vidéo copie ce modèle : une erreur
dans le modèle se répète à chaque vidéo, d'où la règle de corriger le modèle d'abord.
