# InKognito · Waitlist (Next.js 14 + Supabase + Resend)

Système complet d'inscription waitlist : table Supabase, API route, formulaire React, notification email.

## Installation

```bash
npm install @supabase/supabase-js resend
```

## Arborescence à copier dans ton projet Next.js

```
app/api/waitlist/route.ts        → API route (POST)
components/WaitlistForm.tsx      → Composant client
components/WaitlistForm.css      → Styles (optionnel, à importer)
lib/supabase.ts                  → Client Supabase admin (service role)
lib/resend.ts                    → Client Resend + sendWaitlistNotification
supabase/schema.sql              → Migration SQL
.env.local.example               → Template variables d'environnement
```

> ⚠️ Les imports utilisent l'alias `@/lib/...` — assure-toi que ton
> `tsconfig.json` a `"paths": { "@/*": ["./*"] }` (config par défaut de Next.js 14).

## 1. Base de données

Dans Supabase → **SQL Editor**, exécute `supabase/schema.sql`. Ça crée la table
`waitlist` avec contrainte d'unicité sur `email`, RLS activée, et un check
constraint sur `statut` (`en_attente` | `contacte` | `qualifie` | `ajoute`).

## 2. Variables d'environnement

Copie `.env.local.example` → `.env.local` et remplis :

- `NEXT_PUBLIC_SUPABASE_URL` — URL projet Supabase
- `SUPABASE_SERVICE_ROLE_KEY` — clé service role (Settings → API). **Jamais côté client.**
- `RESEND_API_KEY` — clé Resend
- `RESEND_FROM_EMAIL` — expéditeur (domaine vérifié dans Resend)
- `WAITLIST_NOTIFICATION_EMAIL` — destinataire des notifs (ton adresse)

## 3. Utilisation du formulaire

```tsx
// app/page.tsx ou n'importe quelle page
import WaitlistForm from '@/components/WaitlistForm';
import '@/components/WaitlistForm.css'; // optionnel

export default function Page() {
  return (
    <main>
      <h1>Rejoignez la bêta</h1>
      <WaitlistForm />
    </main>
  );
}
```

## Comportement

- **Validation côté client** (prénom non vide, email regex, téléphone ≥ 8 chiffres).
- **Validation côté serveur** identique + normalisation email (`trim().toLowerCase()`).
- **Doublons** : Postgres `unique` sur `email` → `23505` → l'API retourne `409`
  avec `field: 'email'` pour afficher le message inline.
- **Email** : la notification Resend est en `try/catch` — si Resend tombe,
  l'inscription reste enregistrée (pas de rollback).
- **RLS** : la table est verrouillée. L'API utilise la `service_role_key`
  côté serveur uniquement (pas exposée au navigateur).

## Test manuel

```bash
curl -X POST http://localhost:3000/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"prenom":"Jean","email":"jean@example.com","telephone":"06 12 34 56 78"}'
```

Réponses possibles : `201` (créé), `400` (validation), `409` (doublon), `500` (autre).
