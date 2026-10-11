# Décliner une vidéo en formats réseaux (Facebook / Instagram Ads)

**Par défaut : seulement le 9:16** (TikTok, Reels, Stories). Le moteur garde les 4 mises en page possibles, mais on ne rend et on ne
contrôle les autres formats que s'ils sont demandés : chaque format en plus coûte du temps de rendu et de contrôle.

| Format | Taille | Usage | i/s |
|---|---|---|---|
| 16:9 | 1920×1080 | YouTube, site, fil ordinateur | 60 |
| 9:16 | 1080×1920 | Reels, Stories, TikTok | 30 |
| 4:5 | 1080×1350 | Fil Facebook / Instagram mobile (le plus d'espace à l'écran) | 30 |
| 1:1 | 1080×1080 | Fil, carrousels, emplacements carrés | 30 |

## Dans le moteur
- `?f=169|916|11|45`, `W`/`H` selon le format, `L(valeur16:9, valeurVertical, valeurCarré)`, `Y()` pour les ordonnées.
- 4:5 = mise en page carrée décalée de 135 px vers le bas (`OY`) avec fonds étendus : une seule mise en page à maintenir pour 2 formats.
- Blocs complexes (fenêtres d'app, cartes, téléphone, navigateur, calendrier) : construits à leur taille d'origine dans un `frame([x, y, échelle])`.
- Titres : 1 ligne en 16:9, 2 lignes en vertical / carré (`mtitle`). Phrases longues : `whiteSpace: normal` + largeur W − 100.
- Textes centrés en vertical : `row()` (rangée flex centrée) pour les pastilles.
- Médias plein cadre en `W×H` + `object-fit: cover`.
- Points de zoom / d'ouverture (tablette, billet) calculés depuis le cadre du format, jamais en dur.
- Contrôler chaque format avec `stills.mjs` : textes coupés par le masque (réduire la police), éléments sous le logo de coin.

## Vitrine « 1 spot, 4 formats » (pour montrer le savoir-faire)
Page 4:5 sombre (charte du créateur) : 16:9 en haut, 9:16 + 4:5 + 1:1 en dessous, étiquettes de format, cadre rouge qui passe d'une
tuile à l'autre, étapes « Script → Voix off IA → Motion design → 4 formats » en bas. Les rendus sont convertis en WebM VP9 `-g 10`
(Chromium de Playwright ne lit pas le H.264) et recalés image par image (`video.currentTime` puis attente de `seeked`).
Demander l'accord du client avant de publier la vitrine.
