# Images IA dans un projet motion

- **Les images se font dans ChatGPT** (ou le générateur choisi par l'utilisateur), pas par un outil de voix : un outil de voix qui
  sait aussi faire des images coûte vite très cher en crédits. Claude écrit les prompts ; la personne (ou sa tâche planifiée ChatGPT)
  génère ; Claude récupère les fichiers.
- Fichier `assets/gen/prompt-chatgpt.txt` : liste `N. [nom.png] (format) description`. Dans la réponse : le prompt complet dans un
  bloc copiable, les images de référence à joindre (chemin exact), le dossier et les noms où enregistrer.
- **Style des prompts client** : photo cinématographique hyper-réaliste ; lieu et personnes du pays du client (le préciser : pays,
  origine) ; même tenue que sur ses photos (tenue professionnelle sur un sujet technique) ; lumière soignée ; accents aux couleurs de
  la charte ; AUCUN texte ni logo dans l'image ; espace vide d'un côté pour le texte. Pour un client : pas de miniature YouTube.
- **Deux cadrages par scène** si plusieurs formats : paysage et portrait.
- **Vérifier CHAQUE image reçue** : personne qui ne correspond pas au public (on recadre la version paysage ou on redemande),
  texte déformé, mains, noms de fichiers décalés d'un rang (remettre l'ordre avant le rendu).
- **Le moteur n'attend pas** : `pick('assets/gen/flow/xx.png', 'secours.webm')` + `node tools/media-list.mjs` ; un visuel de secours
  (dégradé, vidéo, forme) tient la place, et dès que l'image arrive on relance le rendu.
- Une image par usage précis (fond d'ouverture, écran d'un téléphone, page d'un site, public cible…), jamais la même partout.
- **Détourage** d'un sujet (texte derrière lui, parallaxe, masque en cœur) : `swift tools/cutout.swift photo.jpg sujet.png`
  (macOS Vision, même cadrage que l'original).
- Banques d'images libres : filtrer selon le public du client avant de proposer quoi que ce soit.
