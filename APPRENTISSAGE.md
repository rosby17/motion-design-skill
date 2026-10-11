# Comment le skill apprend

Après chaque projet (ou chaque jour de travail motion), Claude :

1. Lance `python3 outils/recolter.py` : liste les projets motion modifiés depuis la dernière récolte (fichiers `.html`, `.mjs`, `.py`
   de moteur, `GUIDE.md`, retours client, mémoires) et met à jour `outils/derniere-recolte.txt`.
2. Pour chaque projet listé : lit ce qui a changé (moteur, retours, versions), puis
   - ajoute une entrée datée dans `JOURNAL.md` (validé / rejeté par Roosevelt ou le client, techniques nouvelles, pièges) ;
   - reporte les règles durables dans le bon fichier de `references/` (une règle = une ligne, avec le « pourquoi ») ;
   - ajoute ou met à jour la ligne du projet dans `projets/CATALOGUE.md` ;
   - si une brique est réutilisable (scène, transition, outil), l'ajoute à `modele/` en gardant le modèle fonctionnel dans les 4 formats
     (`node modele/tools/stills.mjs 169 1 2` etc.).
   - écrit les règles dans `references/` de façon NEUTRE (aucun nom de client, aucun chemin personnel) : elles sont publiées ;
     les réglages propres à l'utilisateur vont dans `prive/REGLAGES.md` ;
   - ajoute aussi la ligne anonymisée du projet dans `prive/public/CATALOGUE.md` (catalogue de la version publique).
3. Commit : `git add -A && git commit -m "Récolte AAAA-MM-JJ : <projets>"`.
4. Version publique (quand l'utilisateur le demande) : `python3 outils/publier-public.py` (copie anonymisée, contrôle des mots
   interdits de `prive/mots-interdits.txt`, commit et push du dépôt public).

Règles : ne jamais copier de secrets (clés API, mots de passe) ni de données personnelles de clients dans le skill ;
les noms de clients restent dans le catalogue interne, jamais dans un contenu publié (règle d'anonymat de la chaîne).
