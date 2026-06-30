import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { sendWaitlistNotification } from '@/lib/resend';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Body = {
  prenom?: unknown;
  email?: unknown;
  telephone?: unknown;
};

function bad(message: string, status = 400, field?: string) {
  return NextResponse.json({ ok: false, error: message, field }, { status });
}

export async function POST(req: Request) {
  let body: Body;
  try {
    body = await req.json();
  } catch {
    return bad('Corps de requête invalide.');
  }

  const prenom = typeof body.prenom === 'string' ? body.prenom.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const telephone = typeof body.telephone === 'string' ? body.telephone.trim() : '';

  if (!prenom) return bad('Le prénom est requis.', 400, 'prenom');
  if (prenom.length > 80) return bad('Prénom trop long.', 400, 'prenom');
  if (!email) return bad("L'email est requis.", 400, 'email');
  if (!EMAIL_RE.test(email) || email.length > 200) return bad('Adresse email invalide.', 400, 'email');
  if (!telephone) return bad('Le numéro de téléphone est requis.', 400, 'telephone');
  if (telephone.replace(/\D/g, '').length < 8) return bad('Numéro de téléphone invalide.', 400, 'telephone');

  const { data, error } = await supabaseAdmin
    .from('waitlist')
    .insert({ prenom, email, telephone })
    .select('id, created_at')
    .single();

  if (error) {
    // 23505 = unique_violation Postgres
    if (error.code === '23505') {
      return bad('Cette adresse email est déjà inscrite à la waitlist.', 409, 'email');
    }
    console.error('[waitlist] supabase insert failed', error);
    return bad("Une erreur est survenue. Réessayez dans un instant.", 500);
  }

  // L'email de notif ne doit pas casser l'inscription si Resend est down.
  try {
    await sendWaitlistNotification({
      prenom,
      email,
      telephone,
      submittedAt: data?.created_at ? new Date(data.created_at) : new Date(),
    });
  } catch (e) {
    console.error('[waitlist] resend notification failed', e);
  }

  return NextResponse.json({ ok: true, id: data?.id }, { status: 201 });
}
