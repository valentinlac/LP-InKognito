import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  throw new Error(
    '[supabase] NEXT_PUBLIC_SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY manquant. Vérifie ton .env.local.'
  );
}

export const supabaseAdmin = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

export type WaitlistRow = {
  id: string;
  prenom: string;
  email: string;
  telephone: string;
  statut: 'en_attente' | 'contacte' | 'qualifie' | 'ajoute';
  created_at: string;
};
