# Skill « Motion design » pour Claude Code (méthode Roosevelt Mogo)

Un skill Claude Code qui monte des vidéos de motion design de niveau professionnel : spots publicitaires pour vos clients, pubs de
lancement SaaS, vidéos de présentation, vidéos YouTube longues, déclinaisons 9:16 / 16:9 / 4:5 / 1:1.
Méthode : un moteur HTML (chaque scène est une fonction du temps) rendu image par image avec Playwright et ffmpeg, une voix off
iziVoice calée au mot près, une musique mixée à −14 LUFS, et un design qui va « au-delà des standards ».

Tout vient de vrais projets livrés à de vrais clients : ce qui a plu, ce qui a été rejeté, les pièges, les briques qui font dire « waouh ».

## Ce qu'il contient
- `SKILL.md` : le déroulé d'un projet, du brief à la livraison (point d'entrée du skill).
- `references/` : narration et script, analyse d'une vidéo de référence, concept et boîte à briques, design « waouh », voix et calage,
  images IA, formats réseaux, son et rendu, vidéos longues YouTube, clients (brief, retours, validation), livraison, pièges.
- `modele/` : un moteur de départ (4 formats) et ses outils (`timeline-voice`, `mix`, `render`, `stills`, `media-list`, `cutout`).
- `projets/CATALOGUE.md` : les types de projets réalisés et ce que chacun apprend.
- `JOURNAL.md`, `APPRENTISSAGE.md`, `outils/recolter.py` : le skill apprend de chacun de vos projets.
- `prive/REGLAGES.exemple.md` : vos dossiers, vos voix, votre charte (à copier en `prive/REGLAGES.md`).

## Installation
```bash
git clone https://github.com/rosby17/motion-design-skill.git ~/motion-design-skill
ln -s ~/motion-design-skill ~/.claude/skills/motion-design
cp ~/motion-design-skill/prive/REGLAGES.exemple.md ~/motion-design-skill/prive/REGLAGES.md   # puis remplissez-le
```
Dans Claude Code, demandez simplement : « Fais-moi un spot de 60 s pour… » : le skill se déclenche tout seul.

## Prérequis
- Node 18+ et Playwright (`npx playwright install chromium`), ffmpeg.
- Un compte iziVoice (voix off et musique) relié à Claude Code (serveur MCP iziVoice).
- Pour le temps des mots : mlx-whisper (Mac Apple Silicon) ou faster-whisper / whisper.cpp.
- Pour le détourage (`cutout.swift`) : macOS.
- Police : le modèle utilise Neue Montreal (Pangram Pangram, gratuite pour un usage personnel) : téléchargez-la sur
  https://pangrampangram.com/products/neue-montreal et placez les .otf dans `modele/assets/fonts/` (ou changez de police).

## Auteur
Roosevelt Mogo, motion designer : formation complète « Motion Design IA » sur roosevelt-formation.tools-cl.com.
