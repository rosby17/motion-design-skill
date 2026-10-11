# Analyser une vidéo de référence image par image (avant d'écrire une ligne)

Quand le client (ou toi) montre une vidéo « je veux ce niveau-là », on ne copie pas : on la décortique pour en tirer la narration
et la grammaire visuelle, puis on réécrit tout avec le contenu du client. Ne jamais reprendre le texte ni cloner la voix d'un tiers.

## Méthode
1. **Planches** : extraire 4 images par seconde et les assembler en planches de 5 s
   (`ffmpeg -i ref.mp4 -vf "fps=4,scale=480:-1,tile=5x4" planches/p%02d.jpg`).
2. **Transcription minutée** au mot près (voir `voix-et-calage.md`).
3. **Tableau de narration** : temps · phrase de la voix · rôle (accroche, révélation, bénéfice, preuve, douleur, signature…).
4. **Tableau du plan** : temps · ce qu'on voit · technique (caméra, typo, transition, effet). Une ligne par changement d'image.
5. **Règles visuelles** : ce qui revient tout le long (typo, couleurs, lumière, rythme des coupes, alternance clair/sombre).
6. **Ce qui manque à notre moteur** : une colonne « manque → brique à ajouter » (et l'ajouter au modèle si elle resservira).

## Grammaire relevée sur une pub SaaS de référence (réutilisable)
1. **Typographie à deux voix** : mots ordinaires fins et gris clair, mot clé gras, plus grand, dans la couleur d'accent ; les mots
   arrivent un par un (sortie du flou + léger glissement + opacité), 2e ligne décalée.
2. **Illustrations 3D symboliques** pour chaque idée abstraite (argent, travail, cible, robot, produits) : objets brillants en pluie ou
   en orbite, profondeur de champ (objets proches flous).
3. **Interface réelle** à chaque fonction, dans un écran 3D incliné avec liseré lumineux : curseur, saisie, clics, onglets qui se remplissent.
4. **Alternance noir / blanc** : chapitres (questions) en noir, démonstrations en clair ; la lumière change toutes les 5 à 10 s.
5. **Lumière au sol** colorée et halo sous les éléments : jamais de fond plat.
6. **Caméra jamais immobile** : dérive lente, montée du bas, recul, coup de fouet flou entre deux idées, zoom qui traverse une icône
   (l'icône devient l'écran suivant).
7. **Preuves** : chronomètre géant, compteur, conversation réelle, avant / après.
8. **Rythme** : une coupe toutes les 1,5 à 3 s ; la voix commande, la musique accompagne.
9. **Fin posée** : logo qui arrive en tournant, signature, slogan tenu 3 s.

## Briques qu'une telle analyse fait souvent ajouter
Barre de recherche lumineuse où le texte se tape (puis recul) · chrono géant · icône 3D entourée de bulles de dialogue · mots qui
défilent sur des barres d'onde · carrousel d'icônes d'outils qui se rassemblent · logo + texte empilé mot par mot · mot barré en rouge
à la main · fond `sombre` / `clair` par scène · zoom traversant.
