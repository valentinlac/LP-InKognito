import { Resend } from 'resend';

const apiKey = process.env.RESEND_API_KEY;

if (!apiKey) {
  throw new Error('[resend] RESEND_API_KEY manquant. Vérifie ton .env.local.');
}

export const resend = new Resend(apiKey);

type NotificationPayload = {
  prenom: string;
  email: string;
  telephone: string;
  submittedAt: Date;
};

const FR_DATETIME = new Intl.DateTimeFormat('fr-FR', {
  dateStyle: 'full',
  timeStyle: 'short',
  timeZone: 'Europe/Paris',
});

export async function sendWaitlistNotification(p: NotificationPayload) {
  const from = process.env.RESEND_FROM_EMAIL || 'InKognito <onboarding@resend.dev>';
  const to = process.env.WAITLIST_NOTIFICATION_EMAIL;

  if (!to) {
    throw new Error('[resend] WAITLIST_NOTIFICATION_EMAIL manquant.');
  }

  const submittedAtFormatted = FR_DATETIME.format(p.submittedAt);

  return resend.emails.send({
    from,
    to,
    subject: `Nouvelle inscription waitlist InKognito — ${p.prenom}`,
    text: [
      `Nouvelle inscription waitlist InKognito.`,
      ``,
      `Prénom    : ${p.prenom}`,
      `Email     : ${p.email}`,
      `Téléphone : ${p.telephone}`,
      `Reçue le  : ${submittedAtFormatted}`,
      ``,
      `— InKognito`,
    ].join('\n'),
    html: `
      <div style="font-family:-apple-system,Helvetica,Arial,sans-serif;background:#070C17;color:#E8EDF5;padding:32px;border-radius:14px;max-width:520px;margin:0 auto">
        <h2 style="margin:0 0 18px;font-weight:500;letter-spacing:-.02em;color:#E8EDF5">Nouvelle inscription waitlist</h2>
        <p style="margin:0 0 22px;color:#7c8aa8;font-size:14px">Une nouvelle personne vient de rejoindre la bêta.</p>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <tr><td style="padding:8px 0;color:#7c8aa8;width:120px">Prénom</td><td style="padding:8px 0;color:#E8EDF5"><strong>${escape(p.prenom)}</strong></td></tr>
          <tr><td style="padding:8px 0;color:#7c8aa8">Email</td><td style="padding:8px 0;color:#E8EDF5">${escape(p.email)}</td></tr>
          <tr><td style="padding:8px 0;color:#7c8aa8">Téléphone</td><td style="padding:8px 0;color:#E8EDF5">${escape(p.telephone)}</td></tr>
          <tr><td style="padding:8px 0;color:#7c8aa8">Reçue le</td><td style="padding:8px 0;color:#E8EDF5">${escape(submittedAtFormatted)}</td></tr>
        </table>
      </div>
    `,
  });
}

function escape(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
}
