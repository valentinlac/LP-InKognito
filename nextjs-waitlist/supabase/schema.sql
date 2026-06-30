-- ─────────────────────────────────────────────────────────────────
--  InKognito · Table waitlist
--  À exécuter dans Supabase → SQL Editor (ou via une migration).
-- ─────────────────────────────────────────────────────────────────

create extension if not exists "pgcrypto";

create table if not exists public.waitlist (
  id          uuid        primary key default gen_random_uuid(),
  prenom      text        not null,
  email       text        not null unique,
  telephone   text        not null,
  statut      text        not null default 'en_attente'
                check (statut in ('en_attente', 'contacte', 'qualifie', 'ajoute')),
  created_at  timestamptz not null default now()
);

create index if not exists waitlist_created_at_idx on public.waitlist (created_at desc);
create index if not exists waitlist_statut_idx     on public.waitlist (statut);

-- RLS : verrouillé par défaut. Les inserts passent par la service role key
-- côté serveur (API route) — pas d'accès direct depuis le client.
alter table public.waitlist enable row level security;

-- Aucune policy = aucun accès anon/authenticated. Seul service_role passe.
