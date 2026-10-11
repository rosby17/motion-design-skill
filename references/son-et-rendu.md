# Son et rendu

## Musique
- **Se teste comme la voix** : 2 ou 3 essais (iziVoice génère des musiques sur mesure), on garde celle qui porte le rythme.
- Couper une intro trop douce : la musique doit capter l'attention dès la première seconde.
- **Une musique par marque / par école** quand le client en a plusieurs : chacune son identité.
- Pour une vidéo longue : plusieurs pistes enchaînées (voir `videos-longues.md`).

## Mixage (`tools/mix.mjs`)
- Musique sous la voix avec compression déclenchée par la voix (`sidechaincompress`), puis `loudnorm=I=-14:TP=-1.5:LRA=11`.
- Repère : musique ≈ −14 dB sous la voix (on l'entend dans les pauses). Plus présente si le client le demande (compression plus douce).
- La fin naturelle du morceau est collée juste avant le logo (fondu enchaîné de 1 s) : la musique « conclut » avec la marque ;
  si la marque a une animation de logo, caler l'impact de la musique sur l'impact du logo.
- **Bruitages** discrets et liés au sujet : whoosh aux transitions, clics de l'interface, « logo » à la fin, bip de moniteur pour la
  santé, foule pour le foot. Une banque de bruitages réutilisable fait gagner beaucoup de temps.
- Version **musique seule** : `node tools/mix.mjs --musique-seule` (la musique prend la place de la voix, bruitages gardés).
- Vérifier : `ffmpeg -i x.mp4 -af ebur128 -f null - | grep I:` → −14 LUFS ± 0,5.

## Rendu (`tools/render.mjs <format> <sortie> [fps]`)
- Playwright : `renderAt(t)` pour chaque image (attend les vidéos `seeked`), capture JPEG 95, envoi à ffmpeg par un tube.
- `libx264 -preset slow -crf 20 -pix_fmt yuv420p -profile:v high`, audio `aac 160k`, `-movflags +faststart`.
- **Vidéos à grain ou à particules** : HEVC 3 Mb/s (`hevc_videotoolbox` sur Mac) : 2 à 3 fois plus léger sans perte visible.
- Temps indicatifs (Mac M1 Pro) : 84 s en 16:9 60 i/s ≈ 6-7 min ; 9:16 30 i/s ≈ 2,5 min ; 4:5 ≈ 2 min ; carré ≈ 1,5 min.
- Plusieurs rendus : un script séquentiel (`tools/rendu-livraison.sh`) qui recale chaque voix puis rend chaque version.
- Disque presque plein : copier un projet avec `cp -c` (clones APFS, aucun espace en plus).
