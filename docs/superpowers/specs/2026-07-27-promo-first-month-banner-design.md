# Bandeau promo "1er mois à 19€" (2026-07-27)

## Contexte

Une partenaire (Rolly) va publier un post LinkedIn sur InKognito et doit relayer
un lien donnant à ses lecteurs le 1er mois à 19€ (au lieu de 44€), puis 44€/mois
ensuite. Deux contraintes posées par Valentin :

- Pas de commission affiliée pour elle, ni de vraie infra de codes promo
  réutilisable : c'est du one-off pour ce post précis.
- Pas question de relayer un lien `buy.stripe.com` brut dans le post ("ça fait
  pas fou") : le lien doit passer par la landing page `inkognito.fr` d'abord,
  pour garder le contexte/la légitimité de la page avant le paiement.

Aucun mécanisme de prix promotionnel n'existe aujourd'hui, ni côté LP (le prix
affiché est toujours 44€/33€), ni côté app (`start-trial` ne connaît que le prix
plein + 7 jours d'essai gratuit, pas de coupon).

## Décisions prises (brainstorming)

- **L'offre remplace l'essai gratuit** pour les visiteurs de ce lien : paiement
  immédiat de 19€ (pas de carte "essai 7 jours"), 44€/mois dès le renouvellement
  suivant.
- **One-off** : un seul code promo codé en dur côté LP, aucune table/admin de
  gestion de codes promo. Si un futur partenariat se présente, on généralisera à
  ce moment-là.
- **Bandeau dédié**, plutôt que réutiliser un CTA existant : tous les CTA de la
  page disent aujourd'hui "essai gratuit", ce qui serait trompeur pour un flux de
  paiement immédiat. Le reste du site (nav, hero, carte tarifs) reste inchangé
  pour tout le monde d'autre — zéro régression sur le funnel par défaut.
- **Code** : `rolly19` (slug basé sur son nom).

## Architecture

Tout se passe dans ce repo (`LP-InKognito`), rien à changer côté `linkedin-saas`.

1. **Stripe (dashboard, manuel, fait par Valentin)** :
   - Un coupon "montant fixe 25€, devise EUR, durée **une fois**" (44€ − 25€ =
     19€ sur la 1ère facture uniquement, retour automatique à 44€ ensuite).
   - Un **nouveau** Payment Link sur le même prix mensuel que le lien existant
     (`STRIPE_PRICE_ID_MONTHLY` / `STRIPE_PAYMENT_LINK` dans `linkedin-saas`),
     avec ce coupon attaché en dur (pas "autoriser les codes promo" — le
     visiteur n'a rien à taper, le prix réduit est automatique sur ce lien).
   - Ce nouveau lien Stripe (`https://buy.stripe.com/xxxx`) est codé en dur
     côté LP à l'étape 2.

2. **LP (`index.html`)** :
   - Nouveau script, sur le modèle exact des blocs `?ref=`/`?src=` déjà en
     place (~ligne 2557-2600) : lit `?promo=` dans l'URL, le persiste dans
     `localStorage.ik_promo` pour survivre à la navigation (ancre, retour en
     arrière), avec fallback sur cette valeur si le paramètre n'est plus dans
     l'URL.
   - Si le code capté vaut exactement `rolly19` (comparaison en dur, pas de
     mapping générique), injecte un bandeau en haut du `<body>` (avant la nav),
     en flux normal — pas de position sticky/overlay, donc aucun risque de
     chevaucher la nav existante ou de nécessiter un offset de scroll.
   - Sinon (aucun code, ou code différent) : aucun changement visible, la page
     se comporte exactement comme aujourd'hui.

## Bandeau — contenu et style

- Copie : "Offre spéciale : 19 € le premier mois (au lieu de 44 €), puis
  44 €/mois. Sans engagement." (repris de la formulation déjà utilisée dans la
  section Tarifs, zéro tiret long — cf. mémoire `feedback_no_em_dash`).
- Bouton : "Profiter de l'offre", `href` = le Payment Link Stripe créé à
  l'étape 1, cible directe (pas de passage par `/login` : le paiement sans
  compte préexistant est déjà géré par le webhook `linkedin-saas`, qui range la
  ligne dans `pending_paid_emails` et la raccroche automatiquement au premier
  login).
- Palette : bleus existants du site uniquement (`#2E8FE8`/`#70B5F9`/`#0A66C2`),
  jamais de violet (cf. mémoire `feedback_no_violet`). Pas de pastille/badge
  générique ni d'icône (cf. mémoire `feedback_no_generic_icons` /
  `feedback_ui_taste_no_pills_concrete_copy`) : texte simple + chiffres
  concrets (19€, 44€), pas d'abstraction marketing.
- Pas de bouton de fermeture : le bandeau n'apparaît que pour les visiteurs
  venus du lien de Rolly (paramètre explicite), donc pas besoin de pouvoir le
  masquer.

## Erreurs / robustesse

Purement additif et gated par le paramètre `promo=rolly19` : si le script
échoue silencieusement (ex. `localStorage` indisponible, déjà le cas pour
`ik_ref`/`ik_src` avec leurs `try/catch`), la page se comporte exactement comme
aujourd'hui pour tout le monde. Aucun risque de régression sur le funnel par
défaut (essai gratuit → `/login`).

## Test

Manuel, en local (`index.html` ouvert directement ou via un petit serveur
statique) puis en preview avant push :

1. Visiter `?promo=rolly19` → bandeau visible, bouton pointe vers le bon lien
   Stripe, layout de la nav/hero non cassé.
2. Visiter sans paramètre → aucun bandeau, page identique à aujourd'hui.
3. Visiter avec `?promo=rolly19`, puis naviguer vers une ancre de la même page
   (ex. `#pricing`) → bandeau toujours visible (persistance `localStorage`).
4. Visiter avec un `?promo=` différent (ex. `?promo=autrechose`) → aucun
   bandeau (comparaison stricte, pas de mapping générique dans cette v1).

## Hors scope

- Pas de table/admin de gestion de codes promo réutilisable (cf. décision
  one-off ci-dessus) — si un futur partenariat similaire arrive, généraliser ce
  mécanisme à ce moment-là (ex. sur le modèle de `lead_magnet_links` côté
  `linkedin-saas`, mais côté LP il faudrait alors une vraie source de données,
  pas un `<script>` statique).
- Pas de tracking PostHog dédié sur le clic du bandeau (le clic sur les CTA
  `/login` existants a déjà un tracker `cta_click`, mais ce bandeau ne passe
  pas par `/login`) — ajout possible plus tard si le volume le justifie, pas
  nécessaire pour un usage one-off.
- Pas de changement côté `linkedin-saas` (app, webhook, `pricing.ts`) : le
  paiement passe par un Payment Link Stripe autonome, entièrement configuré
  côté dashboard Stripe.
