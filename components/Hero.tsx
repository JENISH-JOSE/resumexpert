"use client";
import DashboardMockup from './DashboardMockup'

export default function Hero() {
  return (
    <section style={{
      paddingTop: 120,
      paddingBottom: 80,
      background: 'linear-gradient(160deg, #f8faff 0%, #eef4ff 40%, #f0f7ff 100%)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle, #c7d9ff 1px, transparent 1px)',
        backgroundSize: '32px 32px',
        opacity: 0.4,
      }} />

      {/* Glow blobs */}
      <div style={{
        position: 'absolute', top: -80, right: -80,
        width: 480, height: 480, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: -120, left: -60,
        width: 360, height: 360, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 64,
          alignItems: 'center',
        }} className="hero-grid">

          {/* Left */}
          <div className="hero-content">
            <div className="hero-badge">
              <span style={{
                width: 6, height: 6, borderRadius: '50%', background: '#2563eb',
                boxShadow: '0 0 0 3px rgba(37,99,235,0.2)',
              }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: '#1d4ed8', letterSpacing: '0.01em' }}>
                AI-Powered Career Intelligence
              </span>
            </div>

            <h1 className="hero-title">
              Build a Resume That<br />
              <span style={{
                background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Gets You Hired.</span>
            </h1>

            <p className="hero-description">
              Upload your resume, choose your career specialization, and receive AI-powered skill analysis, personalized career guidance, skill gap detection, learning roadmap, and project recommendations based on current industry expectations.
            </p>

            {/* Social proof */}
            <div className="hero-proof">
              <div style={{ display: 'flex' }}>
                {['#cbd5e1','#94a3b8','#64748b','#475569'].map((bg, i) => (
                  <div key={i} style={{
                    width: 32, height: 32, borderRadius: '50%',
                    background: bg, border: '2px solid #fff',
                    marginLeft: i === 0 ? 0 : -10,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#fff' }}>
                      {['A','B','C','D'][i]}
                    </span>
                  </div>
                ))}
              </div>
              <div>
                <div style={{ display: 'flex', gap: 2, marginBottom: 2 }}>
                  {[1,2,3,4,5].map(i => (
                    <svg key={i} width="13" height="13" viewBox="0 0 13 13" fill="#f59e0b">
                      <path d="M6.5 1l1.54 3.12 3.44.5-2.49 2.43.59 3.42L6.5 8.77l-3.08 1.7.59-3.42L1.52 4.62l3.44-.5L6.5 1z"/>
                    </svg>
                  ))}
                </div>
                <p style={{ fontSize: 13, color: '#64748b', margin: 0 }}>
                  Trusted by <strong style={{ color: '#0f172a' }}>12,000+</strong> professionals
                </p>
              </div>
            </div>
          </div>

          {/* Right: Dashboard */}
          <div className="hero-visual">
            <DashboardMockup />
          </div>
        </div>
      </div>

      <style>{`
        .hero-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          width: 100%;
        }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          border-radius: 100px;
          border: 1px solid #bfdbfe;
          background: rgba(219, 234, 254, 0.6);
          margin-bottom: 28px;
        }
        .hero-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(36px, 5vw, 58px);
          font-weight: 800;
          line-height: 1.08;
          color: #0f172a;
          letter-spacing: -1.5px;
          margin: 0 0 24px;
        }
        .hero-description {
          font-size: 17px;
          line-height: 1.7;
          color: #475569;
          max-width: 480px;
          margin: 0 0 40px;
        }
        .hero-proof {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-top: 40px;
        }
        .hero-visual {
          display: flex;
          justify-content: center;
          width: 100%;
        }
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .hero-content {
            text-align: center !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            width: 100% !important;
          }
          .hero-description {
            margin-left: auto !important;
            margin-right: auto !important;
            max-width: 100% !important;
          }
          .hero-visual { justify-content: center !important; width: 100% !important; }
          .hero-proof { justify-content: center !important; flex-wrap: wrap !important; }
        }
        @media (max-width: 767px) {
          .hero-grid { gap: 32px !important; }
          .hero-badge { margin-left: auto !important; margin-right: auto !important; }
          .hero-content { max-width: 100% !important; }
          .hero-title { width: 100% !important; }
          .hero-proof { margin-top: 24px !important; gap: 12px !important; }
          .hero-visual > * { width: min(90%, 480px) !important; max-width: 100% !important; }
        }
        @media (max-width: 640px) {
          .hero-content { width: 100% !important; }
          .hero-title { font-size: clamp(32px, 8vw, 40px) !important; }
          .hero-proof { flex-direction: column !important; align-items: center !important; }
        }
      `}</style>
    </section>
  )
}
