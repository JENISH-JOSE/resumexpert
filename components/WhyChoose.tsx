"use client";
const features = [
  {
    title: 'AI Skill Gap Detection',
    description: 'Pinpoints the exact skills you are missing for your target role based on real-time job market data from thousands of active postings.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 3C6.58 3 3 6.58 3 11s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8z" stroke="#2563eb" strokeWidth="1.8"/>
        <path d="M11 7v5l3 3" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    stat: '94%', statLabel: 'gap accuracy',
  },
  {
    title: 'Personalized Learning Roadmap',
    description: 'Get a structured, week-by-week learning plan with curated courses, projects, and certifications tailored to your current skill level.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M3 17l4-4 4 4 8-8" stroke="#7c3aed" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="3" cy="17" r="1.5" fill="#7c3aed"/>
        <circle cx="7" cy="13" r="1.5" fill="#7c3aed"/>
        <circle cx="11" cy="17" r="1.5" fill="#7c3aed"/>
        <circle cx="19" cy="9" r="1.5" fill="#7c3aed"/>
      </svg>
    ),
    stat: '3x', statLabel: 'faster career growth',
  },
  {
    title: 'Project Recommendations',
    description: 'Discover portfolio projects proven to impress hiring managers in your specific domain, with step-by-step guidance to build and showcase them.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="#0891b2" strokeWidth="1.8"/>
        <rect x="12" y="3" width="7" height="7" rx="1.5" stroke="#0891b2" strokeWidth="1.8"/>
        <rect x="3" y="12" width="7" height="7" rx="1.5" stroke="#0891b2" strokeWidth="1.8"/>
        <rect x="12" y="12" width="7" height="7" rx="1.5" stroke="#0891b2" strokeWidth="1.8"/>
      </svg>
    ),
    stat: '200+', statLabel: 'project templates',
  },
  {
    title: 'Resume Score & Analysis',
    description: 'Receive a quantified resume score with specific, actionable suggestions to improve clarity, keyword density, and ATS compatibility.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M14 3H8a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V5a2 2 0 00-2-2z" stroke="#059669" strokeWidth="1.8"/>
        <path d="M9 8h4M9 11h4M9 14h2" stroke="#059669" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    stat: 'ATS', statLabel: 'optimized output',
  },
  {
    title: 'Domain-Specific Guidance',
    description: 'Career advice calibrated to your exact specialization — not generic tips. Software, data, design, product, cloud, finance, and more.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="8" stroke="#d97706" strokeWidth="1.8"/>
        <path d="M11 3a8 8 0 010 16M3 11h16" stroke="#d97706" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M7 5.5a10 10 0 010 11M15 5.5a10 10 0 010 11" stroke="#d97706" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    stat: '15+', statLabel: 'career domains',
  },
  {
    title: 'Interview Preparation',
    description: 'Access domain-specific interview questions, expected answers, and common assessment patterns drawn from real hiring processes.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M18 3H4a1 1 0 00-1 1v11a1 1 0 001 1h5l2 3 2-3h5a1 1 0 001-1V4a1 1 0 00-1-1z" stroke="#db2777" strokeWidth="1.8" strokeLinejoin="round"/>
        <path d="M7 8h8M7 11h5" stroke="#db2777" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    stat: '500+', statLabel: 'question bank',
  },
]

export default function WhyChoose() {
  return (
    <section id="features" style={{
      padding: '100px 24px',
      background: 'linear-gradient(180deg, #f8faff 0%, #fff 100%)',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'end', marginBottom: 64 }} className="why-header">
          <div className="why-left">
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              padding: '5px 14px', borderRadius: 100,
              border: '1px solid #e2e8f0', background: '#fff',
              marginBottom: 20,
            }} className="why-section-badge">
              <span style={{ fontSize: 12, fontWeight: 700, color: '#64748b', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Why Choose ResumeXpert
              </span>
            </div>
            <h2 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800,
              color: '#0f172a', letterSpacing: '-0.8px', margin: 0,
            }}>
              Everything you need to accelerate your career
            </h2>
          </div>
          <div className="why-right">
            <p style={{ fontSize: 16, color: '#64748b', lineHeight: 1.7, margin: 0 }}>
              ResumeXpert is not just a resume checker. It is a complete career intelligence platform that understands where you are, where you want to go, and exactly how to get there.
            </p>
          </div>
        </div>

        {/* Features grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 20 }} className="features-grid">
          {features.map((f, i) => (
            <FeatureCard key={i} {...f} />
          ))}
        </div>
      </div>

      <style>{`
        .why-header {
          display: grid !important;
          grid-template-columns: 1fr 1fr !important;
          gap: 48px !important;
          align-items: end !important;
          margin-bottom: 64px !important;
        }
        .why-left,
        .why-right {
          text-align: left !important;
        }
        .why-section-badge {
          display: inline-flex !important;
          margin-bottom: 20px !important;
        }
        .features-grid {
          display: grid !important;
          grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
          gap: 20px !important;
        }
        .feature-card {
          width: auto !important;
          max-width: none !important;
          margin: 0 !important;
          box-sizing: border-box !important;
        }

        @media (max-width: 767px) {
          .why-header {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
            text-align: center !important;
          }

          .why-left {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            text-align: center !important;
            width: 100% !important;
          }
          
          .why-right {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            text-align: center !important;
            width: 100% !important;
          }

          .why-section-badge {
  display: inline-flex !important;
  justify-content: center !important;
  align-items: center !important;
  margin: 0 auto 20px auto !important;
}

          .features-grid {
            grid-template-columns: 1fr !important;
            gap: 18px !important;
            justify-items: center !important;
          }

          .feature-card {
            width: min(92vw, 400px) !important;
            max-width: 400px !important;
            margin: 0 auto !important;
            box-sizing: border-box !important;
          }
        }
      `}</style>
    </section>
  )
}

function FeatureCard({ title, description, icon, stat, statLabel }: {
  title: string, description: string, icon: React.ReactNode, stat: string, statLabel: string
}) {
  return (
    <div className="feature-card" style={{
      padding: '28px', borderRadius: 16,
      background: '#fff', border: '1px solid #e2e8f0',
      transition: 'all 0.2s',
      cursor: 'default',
    }}
    onMouseEnter={e => {
      (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)'
      ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 36px rgba(15,23,42,0.08)'
      ;(e.currentTarget as HTMLDivElement).style.borderColor = '#bfdbfe'
    }}
    onMouseLeave={e => {
      (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'
      ;(e.currentTarget as HTMLDivElement).style.boxShadow = 'none'
      ;(e.currentTarget as HTMLDivElement).style.borderColor = '#e2e8f0'
    }}>
      <div style={{ marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12, background: '#f8fafc',
          border: '1px solid #e2e8f0',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {icon}
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 20, fontWeight: 800, color: '#0f172a', lineHeight: 1,
          }}>{stat}</div>
          <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 500, marginTop: 2 }}>{statLabel}</div>
        </div>
      </div>
      <h3 style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: 16, fontWeight: 700, color: '#0f172a', margin: '0 0 10px',
      }}>{title}</h3>
      <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.65, margin: 0 }}>{description}</p>
    </div>
  )
}
