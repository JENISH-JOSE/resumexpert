"use client";
import { useRouter } from 'next/navigation'
import { signInWithGoogle } from '../lib/auth'

export default function CTA() {
  const router = useRouter()

  return (
    <section style={{ padding: '100px 24px', background: '#f8faff' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 60%, #1e40af 100%)',
          borderRadius: 24, padding: '80px 64px',
          position: 'relative', overflow: 'hidden',
          textAlign: 'center',
        }}>
          {/* Background decoration */}
          <div style={{
            position: 'absolute', top: -60, right: -60,
            width: 300, height: 300, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', bottom: -80, left: -40,
            width: 240, height: 240, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(37,99,235,0.25) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          {/* Grid pattern */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
            pointerEvents: 'none',
          }} />

          <div style={{ position: 'relative' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '6px 16px', borderRadius: 100,
              border: '1px solid rgba(255,255,255,0.2)',
              background: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(8px)',
              marginBottom: 28,
            }}>
              <span style={{
                width: 6, height: 6, borderRadius: '50%', background: '#4ade80',
                boxShadow: '0 0 0 3px rgba(74,222,128,0.25)',
              }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.85)', letterSpacing: '0.01em' }}>
                Free to get started — no credit card required
              </span>
            </div>

            <h2 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 'clamp(30px, 5vw, 52px)', fontWeight: 800,
              color: '#fff', letterSpacing: '-1px',
              margin: '0 0 20px', lineHeight: 1.1,
            }}>
              Your next job starts with<br />a stronger resume.
            </h2>

            <p style={{
              fontSize: 17, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7,
              maxWidth: 480, margin: '0 auto 44px',
            }}>
              Join 12,000+ professionals who used ResumeXpert to land roles at top companies. Get your AI career analysis in under 60 seconds.
            </p>

            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '14px 28px', borderRadius: 12,
                background: '#fff', border: 'none',
                fontSize: 15, fontWeight: 700, color: '#0f172a',
                cursor: 'pointer', transition: 'all 0.2s',
                boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
              }}
              onClick={signInWithGoogle}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 32px rgba(0,0,0,0.3)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)' }}>
                <GoogleIcon />
                Continue with Google
              </button>

              <button style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '14px 28px', borderRadius: 12,
                background: 'rgba(255,255,255,0.1)',
                border: '1.5px solid rgba(255,255,255,0.2)',
                fontSize: 15, fontWeight: 600, color: '#fff',
                cursor: 'pointer', transition: 'all 0.2s',
                backdropFilter: 'blur(8px)',
              }}
              onClick={() => router.push('/sample-report')}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.15)'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.35)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.1)'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.2)' }}>
                View Sample Report
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {/* Logos */}
            <div style={{ marginTop: 52 }}>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 24 }}>
                Professionals from these companies trust ResumeXpert
              </p>
              <div style={{ display: 'flex', gap: 40, justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
                {['Google', 'Microsoft', 'Stripe', 'Airbnb', 'Notion', 'Figma'].map(co => (
                  <span key={co} style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: 16, fontWeight: 700, color: 'rgba(255,255,255,0.25)',
                    letterSpacing: '-0.3px',
                  }}>{co}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function GoogleIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 16 16" fill="none">
      <path d="M15.68 8.18c0-.57-.05-1.12-.14-1.64H8v3.1h4.3a3.68 3.68 0 01-1.6 2.42v2h2.59c1.52-1.4 2.39-3.46 2.39-5.88z" fill="#4285F4"/>
      <path d="M8 16c2.16 0 3.97-.72 5.3-1.94l-2.59-2c-.72.48-1.63.77-2.71.77-2.08 0-3.85-1.41-4.48-3.3H.85v2.07A8 8 0 008 16z" fill="#34A853"/>
      <path d="M3.52 9.53A4.8 4.8 0 013.27 8c0-.53.09-1.04.25-1.53V4.4H.85A8 8 0 000 8c0 1.29.31 2.51.85 3.6l2.67-2.07z" fill="#FBBC05"/>
      <path d="M8 3.18c1.17 0 2.22.4 3.05 1.2l2.28-2.28C11.97.72 10.16 0 8 0A8 8 0 00.85 4.4l2.67 2.07C4.15 4.58 5.92 3.18 8 3.18z" fill="#EA4335"/>
    </svg>
  )
}
