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
  exacte, sans que vous ayez à y toucher. Il s'améliore à chaque post grâce à vos
  vraies stats LinkedIn, là où les autres IA écrivent à l'aveugle, une fois, puis
  oublient."

Contrainte respectée : zéro tiret long (règle perso, cf. mémoire
`feedback_no_em_dash`).

## Implémentation

1. Éditer les 3 blocs dans `InKognito Landing - Simple.html` (fichier source, non
   suivi par git).
2. Resynchroniser : `cp "InKognito Landing - Simple.html" index.html` (seul fichier
   HTML déployé).
3. Vérifier visuellement en local (ouverture du fichier) que rien ne déborde /
   ne casse la mise en page avec le nouveau H1.
4. Commit + push sur `main` → déploiement auto via GitHub Actions vers
   inkognito.fr. Confirmation demandée à Valentin avant le push.

## Hors scope

- Pas de changement sur les témoignages, le tableau comparatif, la FAQ ou les
  tarifs.
- Pas de test A/B outillé (pas d'infra de test A/B sur cette landing) — c'est un
  remplacement direct.
