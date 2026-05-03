import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://linkedin-saas-sepia.vercel.app'),
  title: {
    default: 'InKognito — Automatisez vos posts LinkedIn',
    template: '%s | InKognito',
  },
  description:
    'InKognito automatise vos posts LinkedIn dans votre voix exacte. Capturez une idée en 10 secondes, l'IA génère et publie à votre place.',
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    siteName: 'InKognito',
    locale: 'fr_FR',
    images: [{ url: '/api/og', width: 1200, height: 630, alt: 'InKognito' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/api/og'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body style={{ fontFamily: spaceGrotesk.style.fontFamily, margin: 0 }}>
        {children}
      </body>
    </html>
  );
}
