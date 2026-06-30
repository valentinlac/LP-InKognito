# InKognito Waitlist — Ce qu'il te reste à faire

## ✅ Ce que j'ai fait (déjà prêt dans `nextjs-waitlist/`)

- [x] Schéma SQL Supabase (`supabase/schema.sql`)
- [x] Client Supabase admin (`lib/supabase.ts`)
- [x] Client Resend + template email (`lib/resend.ts`)
- [x] API route POST `/api/waitlist` avec validation, doublons, fallback Resend (`app/api/waitlist/route.ts`)
- [x] Composant React `<WaitlistForm />` avec validation et états (`components/WaitlistForm.tsx`)
- [x] Styles CSS alignés sur la palette InKognito (`components/WaitlistForm.css`)
- [x] Page Next.js prête à l'emploi (`app/inscription-beta/page.tsx`)
- [x] Template `.env.local.example`
- [x] `README.md` avec instructions
- [x] Cette checklist

---

## 👉 Ce que TOI tu dois faire (ordre exact)

### 1. Copier les fichiers dans ton projet Next.js

Depuis le dossier `nextjs-waitlist/`, copie vers ton projet :

| Source                              | Destination dans ton projet         |
| ----------------------------------- | ----------------------------------- |
| `app/api/waitlist/route.ts`         | `app/api/waitlist/route.ts`         |
| `app/inscription-beta/page.tsx`     | `app/inscription-beta/page.tsx`     |
| `components/WaitlistForm.tsx`       | `components/WaitlistForm.tsx`       |
| `components/WaitlistForm.css`       | `components/WaitlistForm.css`       |
| `lib/supabase.ts`                   | `lib/supabase.ts`                   |
| `lib/resend.ts`                     | `lib/resend.ts`                     |
| `supabase/schema.sql`               | `supabase/schema.sql` (ou ailleurs) |

> Vérifie que `tsconfig.json` a bien `"paths": { "@/*": ["./*"] }` (par défaut sur Next.js 14).

### 2. Installer les dépendances

```bash
npm install @supabase/supabase-js resend
```

### 3. Créer la table dans Supabase

1. Va sur [supabase.com](https://supabase.com) → ton projet → **SQL Editor**
2. Colle le contenu de `supabase/schema.sql`
3. Clique **Run**

Tu peux vérifier dans **Table Editor** que `waitlist` apparaît.

### 4. Récupérer tes clés

**Supabase** → Project Settings → API :
- `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
- `service_role` (secret) → `SUPABASE_SERVICE_ROLE_KEY` ⚠️ JAMAIS côté client

**Resend** → [resend.com/api-keys](https://resend.com/api-keys) :
- Crée une clé → `RESEND_API_KEY`

### 5. Configurer `.env.local`

À la racine de ton projet Next.js, crée `.env.local` :

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...

RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=InKognito <onboarding@resend.dev>
WAITLIST_NOTIFICATION_EMAIL=valacaille9@gmail.com
```

> Pour `RESEND_FROM_EMAIL` : tu peux utiliser `onboarding@resend.dev` pour tester
> tout de suite. Pour la production, vérifie ton domaine sur Resend
> ([resend.com/domains](https://resend.com/domains)) et utilise une adresse de
> ton domaine (ex: `InKognito <hello@inkognito.app>`).

### 6. Tester en local

```bash
npm run dev
```

Ouvre [http://localhost:3000/inscription-beta](http://localhost:3000/inscription-beta) et soumets le formulaire.

Vérifie ensuite :
- ✅ Ligne créée dans Supabase (Table Editor → `waitlist`)
- ✅ Email reçu sur `valacaille9@gmail.com`

### 7. Test API en ligne de commande (optionnel)

```bash
curl -X POST http://localhost:3000/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"prenom":"Jean","email":"jean@test.com","telephone":"06 12 34 56 78"}'
```

Codes de retour :
- `201` → créé ✅
- `400` → validation échouée
- `409` → email déjà inscrit
- `500` → erreur serveur

### 8. Brancher le bouton de ta landing existante

Dans ta landing Next.js, fais pointer les CTA "Démarrer / Essai gratuit / Bêta"
vers `/inscription-beta` :

```tsx
<Link href="/inscription-beta" className="btn-hero">
  Rejoindre la bêta
</Link>
```

---

## 🔒 Sécurité — points importants

- La **service role key** Supabase est utilisée **uniquement côté serveur**
  (dans l'API route). Elle n'est jamais bundlée côté client.
- La table `waitlist` a **RLS activée sans policy** → personne ne peut lire/écrire
  depuis le navigateur, seulement via l'API route.
- Validation côté serveur dupliquée du côté client (jamais faire confiance au front).

## ❓ Si quelque chose ne marche pas

| Symptôme | Cause probable | Solution |
| --- | --- | --- |
| 500 sur l'API | env vars manquantes | vérifie `.env.local` puis redémarre `npm run dev` |
| Email pas reçu | Resend non configuré | vérifie `RESEND_API_KEY` ; si domaine non vérifié, utilise `onboarding@resend.dev` |
| Email en spam | domaine non vérifié | vérifie ton domaine sur Resend |
| 409 sur tous les essais | email déjà en base | supprime la ligne dans Supabase ou change d'email |
| `Cannot find module '@/lib/...'` | alias TS manquant | ajoute `"paths": { "@/*": ["./*"] }` dans `tsconfig.json` |
