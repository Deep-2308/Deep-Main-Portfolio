import { ImageResponse } from 'next/og';
 
export const runtime = 'edge';
 
export const alt = 'Deep Kabariya | AI & Automation Engineer';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';
 
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#09090b', // match background (zinc-950)
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '80px',
          fontFamily: 'sans-serif',
          color: '#fafafa',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{ 
            width: '12px', 
            height: '12px', 
            borderRadius: '50%', 
            background: '#a3e635', // lime-400 (accent)
            marginRight: '16px' 
          }} />
          <p style={{ 
            fontSize: 24, 
            letterSpacing: '0.15em', 
            color: '#a1a1aa', // zinc-400
            textTransform: 'uppercase',
            margin: 0
          }}>
            SYSTEM.ONLINE
          </p>
        </div>
        
        <h1
          style={{
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            margin: '0 0 24px 0',
            maxWidth: '900px',
          }}
        >
          Deep Kabariya
        </h1>
        
        <p
          style={{
            fontSize: 36,
            color: '#a1a1aa', // zinc-400
            margin: 0,
            maxWidth: '800px',
            lineHeight: 1.4,
          }}
        >
          I build <span style={{ color: '#a3e635', marginLeft: '12px', marginRight: '12px' }}>AI tools</span> and <span style={{ color: '#a3e635', marginLeft: '12px', marginRight: '12px' }}>automation</span> that save small businesses real hours.
        </p>
        
        <div style={{ 
          display: 'flex', 
          marginTop: 'auto', 
          borderTop: '1px solid #27272a', // zinc-800
          paddingTop: '32px',
          width: '100%' 
        }}>
          <p style={{ fontSize: 24, color: '#71717a', margin: 0 }}>
            AI & Automation Engineer
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
