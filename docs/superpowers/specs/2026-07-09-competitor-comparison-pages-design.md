# Pages comparatives concurrents — SEO/GEO (2026-07-09)

## Contexte

Objectif SEO/GEO : être cité par les moteurs IA (Perplexity, ChatGPT, AI
Overviews) et ressortir sur Google quand quelqu'un cherche "alternative à
Taplio", "meilleur outil IA LinkedIn", etc. Une landing d'une seule page a peu
de matière citable ; les pages comparatives nommées sont le format que ces
moteurs citent le plus.

Recherche faite avant rédaction (voir tool calls WebSearch/WebFetch de la
session) pour ne pas avancer d'affirmations fausses sur des concurrents nommés
— la publicité comparative nommée est encadrée en France (Code de la
consommation) : comparaisons uniquement sur des caractéristiques vérifiables,
objectives, non trompeuses, non dénigrantes.

## Concurrents ciblés (7 pages)

Taplio, Supergrow, AuthoredUp, MagicPost, EasyGen, RedactAI, PerfectPost.

Hors scope pour l'instant : **LinkPost** (linkpost.gg) — produit en waitlist,
aucun tarif public, pas encore lancé. Pas de valeur SEO tant qu'il n'y a pas de
recherches réelles sur ce nom, et rien à comparer sérieusement (pas de tarifs
vérifiables). À reprendre quand il sera public.

Faits vérifiés par outil (juillet 2026, sources dans l'historique de session) :
- **Taplio** : $39-199/mois, l'IA générative n'est dispo qu'à partir du plan à
  $65/mois (le palier $39 n'a aucun crédit IA). Publication auto une fois
  programmé, mais chaque post est écrit/validé manuellement. Analytics
  disponibles mais pas de boucle automatique vers la génération suivante.
- **Supergrow** : $19-139/mois. A une "Content DNA" (apprend le style) ET une
  boucle d'analytics avec recommandations — le concurrent le plus proche de
  notre argument data. Différence réelle : chez eux vous lisez le scorecard et
  décidez quoi écrire ; chez nous l'IA boucle ça seule dans la génération
  suivante.
- **AuthoredUp** : $14,95-19,95/mois. Éditeur/planificateur (300+ accroches,
  snippets), pas un générateur IA autonome.
- **MagicPost** : $19-79/mois. Générateur IA entraîné sur du contenu
  performant, import de style, mais pas de pilote automatique bout en bout
  documenté.
- **EasyGen** : $59,99/mois, un seul plan. Génère du texte IA uniquement,
  aucune programmation ni analytics ni carrousel.
- **RedactAI** : $24-66/mois (tarifs variables selon la source). "Style
  mirroring" en argument phare — proche de notre "voix exacte", mais pas de
  publication autonome documentée.
- **PerfectPost** : gratuit ou 19€/mois. Extension Chrome, planification +
  analytics + accroches IA, pas un générateur autonome de bout en bout.

**Constat transversal (vrai pour les 7)** : aucun de ces outils ne propose de
pilote automatique de bout en bout piloté par un objectif défini une seule
fois (créneau → génération → publication → apprentissage, sans intervention).
Tous nécessitent que l'utilisateur écrive/choisisse/valide chaque post. C'est
la différence honnête et vérifiable à utiliser sur les 7 pages, plutôt que de
prétendre être seuls sur "apprend de votre style/vos stats" (faux pour
Supergrow et RedactAI).

## Structure de page (template validé sur Taplio, décliné pour les 6 autres)

1. **Head** : title `InKognito vs <Concurrent> : quelle différence pour
   automatiser vos posts LinkedIn ?`, meta description, canonical
   `https://inkognito.fr/vs-<slug>.html`, OG/Twitter, `robots: index, follow`,
   mêmes polices/favicon que le reste du site.
2. **JSON-LD** : `FAQPage` avec 3 questions (mêmes thèmes que la home,
   spécifiques au concurrent) — c'est le format le plus cité par les IA.
3. **Nav** : logo + retour accueil + CTA "Commencer maintenant" (contrairement
   aux pages légales, page d'acquisition = doit convertir).
4. **Contenu** :
   - Intro honnête (2-3 phrases) + date de vérification des infos (juillet
     2026, sujet à changement).
   - Tableau comparatif : Prix, écrit dans votre voix, apprend de vos vraies
     stats LinkedIn, publie sans repasser dessus, stratégie par objectif.
     Uniquement des faits vérifiés ; pas d'affirmation négative non confirmée
     sur le concurrent (case vide/"non documenté" plutôt qu'une fausse
     affirmation).
   - "Ce qui est bon chez `<Concurrent>`" (reconnaissance honnête, requis
     légalement) + "Ce qui change avec InKognito" (le différenciateur réel :
     zéro intervention humaine dans la boucle).
   - Mini-FAQ (3 questions, correspond au JSON-LD).
   - CTA final + lien vers la vraie page tarifs du concurrent (bonne foi,
     réduit le risque légal, laisse le lecteur vérifier lui-même).
5. **Footer** : identique aux pages légales (Accueil / Confidentialité / CGU /
   Mentions légales).

## Hors page

- `sitemap.xml` : ajout des 7 URLs (`changefreq: monthly`, `priority: 0.6`).
- `index.html` : petit bloc de liens internes bas de page ("Vous hésitez avec
  un autre outil ? Taplio · Supergrow · ...") pour le maillage interne
  SEO/découverte, pas une nouvelle entrée de nav principale (7 liens
  clutterait le menu).

## Méthode de livraison

Taplio d'abord comme gabarit, validation visuelle, puis déclinaison des 6
autres avec le même moule et les faits déjà vérifiés ci-dessus (pas de
nouvelle recherche nécessaire, tout est déjà sourcé).

## Hors scope

- LinkPost (voir plus haut).
- Pas de champ de recherche/hub `/comparatifs` dédié pour l'instant — les 7
  pages sont autonomes, liées depuis la home et le sitemap.
