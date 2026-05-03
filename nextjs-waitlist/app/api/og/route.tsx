import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#070C17',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Glow bas-droite */}
        <div
          style={{
            position: 'absolute',
            bottom: '-120px',
            right: '-120px',
            width: '700px',
            height: '700px',
            background:
              'radial-gradient(circle, rgba(26,143,255,0.22) 0%, transparent 70%)',
            borderRadius: '50%',
            display: 'flex',
          }}
        />
        {/* Glow haut-gauche */}
        <div
          style={{
            position: 'absolute',
            top: '-80px',
            left: '-80px',
            width: '450px',
            height: '450px',
            background:
              'radial-gradient(circle, rgba(10,102,194,0.18) 0%, transparent 70%)',
            borderRadius: '50%',
            display: 'flex',
          }}
        />

        {/* Badge */}
        <div
          style={{
            background: 'rgba(26,143,255,0.15)',
            border: '1px solid rgba(26,143,255,0.5)',
            borderRadius: '999px',
            padding: '8px 22px',
            color: '#bcdcff',
            fontSize: '15px',
            fontWeight: '600',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '36px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#1a8fff',
              display: 'flex',
            }}
          />
          Automatisation LinkedIn par IA
        </div>

        {/* Nom */}
        <div
          style={{
            fontSize: '96px',
            fontWeight: '700',
            color: '#ffffff',
            letterSpacing: '-0.03em',
            lineHeight: '1',
            marginBottom: '24px',
            display: 'flex',
          }}
        >
          InKognito
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: '30px',
            color: '#7c8aa8',
            textAlign: 'center',
            maxWidth: '780px',
            lineHeight: '1.45',
            marginBottom: '52px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <span>Postez sur LinkedIn chaque jour.</span>
          <span>100% votre voix, zéro effort.</span>
        </div>

        {/* URL */}
        <div
          style={{
            fontSize: '22px',
            color: '#1a8fff',
            fontWeight: '500',
            letterSpacing: '-0.01em',
            display: 'flex',
          }}
        >
          inkognito.fr
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
