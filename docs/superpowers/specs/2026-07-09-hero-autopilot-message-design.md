# Hero — message fusionné auto-pilot + data-learning (2026-07-09)

## Contexte

Le hero actuel de la landing (`InKognito Landing - Simple.html`) mène avec l'angle
"apprend de vos vraies stats LinkedIn" (badge + H1 "chaque jour, sans effort" en
filigrane). Les témoignages réels des users payants (Raphael, Pauline, Amine)
parlent massivement de soulagement / gain de temps / "ne plus y penser", pas de
la boucle data. Décision : faire remonter l'auto-pilot en tête du message, garder
la donnée comme preuve de différenciation juste en dessous, dans un message fusionné
plutôt que deux messages séparés.

## Scope

Uniquement le bloc hero : badge au-dessus du H1, le H1, et le paragraphe qui suit.
Aucune autre section ne change (témoignages, tableau comparatif "Pourquoi pas
juste Claude", FAQ, tarifs restent inchangés — ils appuient déjà l'angle auto-pilot
et data).

## Copy final

- **Badge** : "Le seul ghostwriter IA qui tourne pour vous, et qui apprend de vos
  vraies stats LinkedIn"
- **H1** : "Publiez sur LinkedIn. Vous n'y pensez plus."
- **Sous-texte** : "InKognito écrit, publie et programme vos posts dans votre voix
  exacte, selon une vraie stratégie de contenu, sans que vous ayez à y toucher.
  Il s'améliore à chaque post grâce à vos vraies stats LinkedIn, là où les autres
  IA écrivent à l'aveugle, une fois, puis oublient."

Ajout du 2026-07-09 (après premier passage) : clause stratégie insérée dans le
sous-texte pour éviter que l'auto-pilot ne se lise comme des posts publiés au
hasard — la stratégie (objectif, sujet, régularité) existe déjà plus bas dans la
page (section Fonctionnalités, "Un objectif derrière chaque post") mais
n'apparaissait pas dans le hero. Placement choisi : sous-texte plutôt que badge
(risque de débordement d'une pastille courte) ou H1 (doit rester un coup de poing
court).

Correctif du 2026-07-09 (2e passage, retour visuel de Valentin) : la première
version fusionnée (stratégie + stats + phrase "les autres IA écrivent à
l'aveugle") faisait 254 caractères et rendait sur 4 lignes dans le hero, bien
trop dense. Version finale retenue : une seule phrase de 148 caractères qui
fusionne stratégie et stats dans une seule clause ("une vraie stratégie de
contenu nourrie par vos vraies stats LinkedIn") et retire la phrase sur "les
autres IA" (déjà couverte en détail par le tableau comparatif "Pourquoi pas
juste Claude" plus bas dans la page) :

"InKognito écrit, publie et programme vos posts dans votre voix exacte, avec une
vraie stratégie de contenu nourrie par vos vraies stats LinkedIn."

Contrainte respectée : zéro tiret long (règle perso, cf. mémoire
`feedback_no_em_dash`).

## Implémentation

1. Éditer les 3 blocs dans `InKognito Landing - Simple.html` (fichier source, non
   suivi par git), resynchroniser vers `index.html` via `cp`.
2. Vérifier visuellement en local (ouverture du fichier) que rien ne déborde /
   ne casse la mise en page avec le nouveau H1.
3. Commit + push sur `main` → déploiement auto via GitHub Actions vers
   inkognito.fr. Confirmation demandée à Valentin avant le push.

Correctif du 2026-07-09 (4e passage) : ajout de l'aspect humain/authenticité
demandé par Valentin (malgré l'auto-pilot, le post reste dans la vraie voix et
les vraies expériences de l'utilisateur, jamais un style IA générique). Pour
tenir dans le même budget de longueur, la clause "stratégie de contenu" (déjà
expliquée plus bas dans la section Fonctionnalités) a été retirée du sous-texte
au profit de cet angle, plus fort pour lever l'objection "ça va sonner
robotique / inventer mes expériences". Sous-texte final :

"InKognito écrit, publie et programme vos posts dans votre voix exacte et vos
vraies expériences, jamais dans un style IA générique."

**Correctif de process (2026-07-09, 3e passage) :** le `cp` du point 1 a ramené
dans `index.html` des changements non liés qui traînaient dans `Simple.html`
depuis le 7 juillet sans avoir été synchronisés/poussés (retour au CTA paiement
Stripe direct, retrait du compteur d'impressions live). `index.html` a donc été
restauré depuis le dernier commit (`git show HEAD:index.html`) avant de
réappliquer uniquement les 3 changements de hero. **Décision structurelle
prise avec Valentin à cette occasion** : suppression de `InKognito Landing -
Simple.html` (source dupliquée, cause de la dérive) ainsi que de 2 fichiers
morts non référencés (`InKognito Landing.html`, `Inscription Beta.html`).
Désormais `index.html` est le seul fichier HTML de la landing à éditer — plus
d'étape de resynchronisation `cp`, donc plus de risque de drift entre un
brouillon local et le site en ligne.

## Hors scope

- Pas de changement sur les témoignages, le tableau comparatif, la FAQ ou les
  tarifs.
- Pas de test A/B outillé (pas d'infra de test A/B sur cette landing) — c'est un
  remplacement direct.
