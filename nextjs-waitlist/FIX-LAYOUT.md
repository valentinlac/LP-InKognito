# Fix : la page d'inscription s'affiche dans le layout du SaaS

## Pourquoi ça arrive

Ton projet Next.js a probablement une structure du genre :

```
app/
  layout.tsx              ← root layout (html/body, fonts, providers globaux)
  (dashboard)/            ← OU directement à la racine
    layout.tsx            ← layout AUTHENTIFIÉ (sidebar Dashboard / Générer / etc.)
    dashboard/page.tsx
    generer/page.tsx
    ...
    inscription-beta/page.tsx   ← ⚠️ ici → hérite de la sidebar
```

Tu as posé `inscription-beta/page.tsx` à un endroit où il hérite du layout
authentifié → la page s'affiche **dans** le shell du SaaS avec la sidebar.

## Solution : route group `(public)`

Les **route groups** Next.js (dossiers entre parenthèses) servent exactement à
ça : opter pour un layout différent **sans changer l'URL**.

### Étape 1 — Déplacer la page

Dans ton projet Next.js, déplace :

```
❌  app/inscription-beta/page.tsx          (ou là où elle est aujourd'hui)
✅  app/(public)/inscription-beta/page.tsx
```

L'URL reste **`/inscription-beta`** — les parenthèses ne comptent pas.

### Étape 2 — Créer le layout public

Crée `app/(public)/layout.tsx` :

```tsx
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
```

C'est tout. Ce layout est volontairement vide : il **remplace** le layout
authentifié pour les routes du groupe `(public)`. Ton `app/layout.tsx` racine
(html/body/fonts) reste appliqué — c'est obligatoire.

### Étape 3 — Vérifier qu'il n'y a pas de Provider qui ouvre la sidebar

Si dans ton `app/layout.tsx` racine tu as quelque chose qui rend la sidebar
**inconditionnellement** (ex: `<AppShell>` avec sidebar dedans), il faut soit :

**Option A** — déplacer le shell dans le layout authentifié :

```tsx
// app/layout.tsx (racine) — minimal
export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

// app/(app)/layout.tsx — le shell du SaaS, AVEC sidebar
export default function AppLayout({ children }) {
  return (
    <AppShell>{children}</AppShell>
  );
}
```

**Option B** — détecter le pathname dans ton root layout et masquer la sidebar
sur `/inscription-beta` (moins propre).

### Étape 4 — Le toast `1 error`

L'erreur "1 error" en bas à gauche de ton screenshot vient probablement d'un
provider d'erreur ou d'auth qui tourne dans ton root layout (ex: il tente de
fetch `/api/me` ou la session Supabase et échoue parce que l'utilisateur n'est
pas connecté). Une fois la page sortie du layout authentifié, ce provider ne
devrait plus s'exécuter.

Si l'erreur persiste, ouvre la console du navigateur (F12 → Console) et
copie-moi l'erreur exacte — je te dirai quoi adapter.

## Arborescence finale recommandée

```
app/
  layout.tsx                          ← root minimal (html/body/fonts)
  (app)/                              ← OU (dashboard), tes routes auth
    layout.tsx                        ← AppShell avec sidebar
    dashboard/page.tsx
    generer/page.tsx
    mon-style/page.tsx
    ...
  (public)/                           ← routes publiques sans sidebar
    layout.tsx                        ← layout vide
    inscription-beta/page.tsx         ← ✅ la page waitlist
  api/
    waitlist/route.ts
```

## Test

```bash
npm run dev
```

Va sur [http://localhost:3000/inscription-beta](http://localhost:3000/inscription-beta) — tu dois voir la page **plein écran**, sans sidebar.
