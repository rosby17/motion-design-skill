---
name: motion-design
description: Créer n'importe quelle vidéo de motion design (spot publicitaire client, pub de lancement SaaS, vidéo de présentation, vidéo YouTube longue, déclinaisons réseaux sociaux 9:16 / 16:9 / 4:5 / 1:1, vitrine multi-formats) avec la méthode de Roosevelt Mogo : moteur HTML + Playwright + ffmpeg, voix iziVoice calée au mot près, musique à −14 LUFS, design « au-delà des standards ». Utilise-le dès qu'on parle de spot, pub vidéo, motion design, animation, montage d'une vidéo client, déclinaison de formats ou retours client sur une vidéo.
---

# Motion design (méthode Roosevelt Mogo)

Tout ce qui a été appris en montant de vrais spots clients, des pubs SaaS, des vidéos de présentation et des chaînes YouTube,
rangé pour que n'importe qui puisse monter une vidéo de niveau professionnel avec Claude.

**Avant de commencer** : lis `prive/REGLAGES.md` s'il existe (dossiers, voix, charte et règles de l'utilisateur ; sinon propose-lui de
remplir `prive/REGLAGES.exemple.md`), puis `JOURNAL.md` (dernières leçons) et `projets/CATALOGUE.md` (un projet proche existe
peut-être : pars de son moteur). Après chaque projet, applique `APPRENTISSAGE.md`.

## Déroulé d'un projet

1. **Brief** (`references/clients-brief-et-retours.md`) : noter mot pour mot la demande et les retours (`01-brief-et-retours/`).
   Récupérer charte, logo ORIGINAL, vraies photos, numéros, site. Lister ce qui manque et le demander. Ce qui est validé (voix,
   musique, ordre des scènes) ne bouge plus sans demande.
2. **Référence** (si une vidéo modèle est fournie) : l'analyser image par image AVANT d'écrire (`references/analyser-une-reference.md`).
3. **Script** (`references/narration-et-script.md`) : une idée par phrase, tout ce qui compte dit ET montré, ne vendre que ce qui
   existe. Écrire pour l'oreille : nombres en lettres, sigles épelés, marque et lieux écrits comme ils se prononcent.
4. **Voix** (`references/voix-et-calage.md`) : iziVoice, une prise (ou une par phrase pour un texte long). Si la voix n'est pas imposée :
   4 à 6 essais sur le même passage. Transcription locale au mot près → `voice-segments.json` (cues + respirations).
5. **Concept** (`references/concept-et-briques.md`) : un fil rouge tiré du logo ou du sujet, un univers propre au sujet ; jamais la
   structure d'une vidéo précédente du même client. Choisir les briques vivantes du métier du client.
6. **Moteur** : partir de `modele/index.html` (ou du moteur du projet le plus proche). Une scène = un `div.scene` + une fonction
   `renderN(t)` pure. Tout se déclenche sur les cues de la voix (`qs('cue')`), jamais sur des secondes en dur.
   Vidéo longue YouTube : moteur Python + ffmpeg (`references/videos-longues.md`).
7. **Design** (`references/design-niveau-waouh.md`) : caméra toujours en mouvement, texte cinétique à deux voix, interfaces vivantes,
   profondeur, transitions qui racontent, preuves, fin posée. **Images IA** (`references/images-ia.md`) : prompts ChatGPT, le moteur
   tourne avec des visuels de secours en attendant.
8. **Contrôle** : `node tools/stills.mjs <format> t1 t2…` puis planche ; regarder CHAQUE scène avant le rendu complet (textes coupés,
   chevauchements, éléments hors cadre, image cohérente avec ce que dit la voix à ce moment). Relire `references/pieges.md`.
9. **Formats** (`references/formats-reseaux.md`) : PAR DÉFAUT seulement le **9:16 vertical** ; 16:9, 1:1, 4:5 sur demande
   (`?f=169|11|45`, une mise en page par scène, jamais un simple recadrage).
10. **Son et rendu** (`references/son-et-rendu.md`) : musique testée comme la voix, −14 LUFS, bruitages liés au sujet, x264 CRF 20
    (HEVC 3 Mb/s pour le grain), 60 i/s en 16:9, 30 i/s pour les réseaux.
11. **Livraison** (`references/livraison.md`) : voix + musique ET musique seule, noms explicites, ce qui est inventé signalé au client.
12. **Apprendre** : `APPRENTISSAGE.md` (journal, références, catalogue, modèle).

## Règles qui ne bougent pas
- **Un seul format par défaut : le vertical 9:16** (le plus partagé). Chaque format en plus coûte du temps de rendu et de contrôle.
- **L'effet « waouh, il a fait plus qu'il n'en faut »** : jamais un diaporama, la caméra bouge toujours, les interfaces sont vivantes,
  les textes sont cinétiques, une retouche ne fait jamais baisser le niveau.
- **Toujours vérifier soi-même** (planches d'images, transcription de la voix, LUFS) avant de dire que c'est fini ; signaler honnêtement
  ce qui est inventé (chiffres d'exemple, maquette, conversation fictive).
- **Respecter la marque du client** : logo original, charte relevée à la pipette, vraies photos, personnes qui ressemblent à son public.
- **Images dans ChatGPT** (ou le générateur de l'utilisateur), jamais par un outil de voix ; aucun secret ni donnée personnelle de client
  dans le skill.

## Le modèle (`modele/`)
- `index.html` : moteur de départ (4 formats via `?f=`, `L()` / `Y()` pour la mise en page, `renderAt(t)` pour le rendu).
- `tools/timeline-voice.mjs` (voix → `timeline.js`), `mix.mjs` (voix + musique, −14 LUFS), `render.mjs` (Playwright → ffmpeg),
  `stills.mjs` (images de contrôle), `media-list.mjs` (images disponibles), `cutout.swift` (détourage macOS Vision).
- `voice-segments-exemple.json` : exemple de calage d'une voix.
- Prérequis : Node 18+, Playwright (`npx playwright install chromium`), ffmpeg, un compte iziVoice (voix et musique), mlx-whisper ou
  équivalent pour les temps des mots, une police à télécharger (voir `README.md`).
