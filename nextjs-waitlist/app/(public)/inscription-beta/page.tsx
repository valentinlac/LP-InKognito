import WaitlistForm from '@/components/WaitlistForm';
import '@/components/WaitlistForm.css';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rejoindre la bêta',
  description:
    'Places limitées. Inscrivez-vous à la waitlist InKognito et automatisez vos posts LinkedIn dans votre voix exacte. Tarif gelé à vie pour les bêta-testeurs.',
  alternates: {
    canonical: 'https://linkedin-saas-sepia.vercel.app/inscription-beta',
  },
  openGraph: {
    title: 'InKognito — Rejoignez la bêta privée',
    description:
      'Places limitées. Tarif gelé à vie pour les bêta-testeurs.',
    url: 'https://linkedin-saas-sepia.vercel.app/inscription-beta',
  },
};

export default function InscriptionBetaPage() {
  return (
    <main className="ib-main">
      <div className="ib-wrap">
        <div className="ib-badge">
          <span className="ib-badge-dot" />
          Accès bêta — Places limitées
        </div>

        <h1 className="ib-title">
          <span className="ib-grad-white">Rejoignez la bêta</span>
          <br />
          <span className="ib-grad-blue">d&apos;InKognito.</span>
        </h1>

        <p className="ib-sub">
          Soyez parmi les premiers à automatiser vos posts LinkedIn dans votre
          voix exacte. Tarif gelé à vie pour les bêta-testeurs.
        </p>

        <div className="ib-card">
          <WaitlistForm />
        </div>
      </div>

      <style>{`
        .ib-main {
          min-height: 100vh;
          background: #070C17;
          color: #E8EDF5;
          font-family: inherit;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 120px 6vw 80px;
        }
        .ib-wrap {
          width: 100%;
          max-width: 560px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .ib-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(120deg, rgba(26,143,255,.28), rgba(96,174,255,.14));
          border: 1px solid rgba(26,143,255,.65);
          padding: 6px 14px;
          border-radius: 999px;
          font-size: 11px;
          color: #bcdcff;
          font-weight: 600;
          letter-spacing: .16em;
          text-transform: uppercase;
          margin-bottom: 24px;
        }
        .ib-badge-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #1a8fff;
          box-shadow: 0 0 10px 3px rgba(26,143,255,.75);
        }
        .ib-title {
          font-size: clamp(34px, 4.8vw, 48px);
          font-weight: 500;
          letter-spacing: -.03em;
          line-height: 1.1;
          margin: 0 0 16px;
          text-align: center;
        }
        .ib-grad-white {
          background: linear-gradient(130deg, #ffffff 0%, #c8deff 55%, #9ec4ff 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }
        .ib-grad-blue {
          background: linear-gradient(110deg, #1a8fff 0%, #60aeff 50%, #93d4ff 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }
        .ib-sub {
          font-size: 16px;
          color: #7c8aa8;
          max-width: 460px;
          margin: 0 auto 44px;
          line-height: 1.65;
          text-align: center;
        }
        .ib-card {
          width: 100%;
          background: rgba(9,15,28,.96);
          border: 1px solid rgba(26,143,255,.28);
          border-radius: 22px;
          padding: 38px 36px 34px;
          box-shadow:
            0 0 0 1px rgba(26,143,255,.10),
            0 0 40px 8px rgba(26,143,255,.10),
            0 0 100px 24px rgba(10,102,194,.06);
        }
      `}</style>
    </main>
  );
}
