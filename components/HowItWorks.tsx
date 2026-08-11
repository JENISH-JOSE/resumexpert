"use client"
const steps = [
  {
    step: '01',
    title: 'Upload Your Resume',
    description: 'Upload your existing resume in PDF or DOCX format. Our AI parser extracts every skill, experience, and qualification in seconds.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14 2v6h6M12 18v-6M9 15l3-3 3 3" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    color: '#dbeafe',
  },
  {
    step: '02',
    title: 'Choose Your Domain',
    description: 'Select your target career domain — Software Engineering, Data Science, Product Management, UX Design, DevOps, and more.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="#7c3aed" strokeWidth="1.8"/>
        <path d="M12 2a14.5 14.5 0 010 20M2 12h20" stroke="#7c3aed" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    color: '#ede9fe',
  },
  {
    step: '03',
    title: 'AI Analyzes Your Profile',
    description: 'Our AI cross-references your profile against thousands of real job descriptions to identify skill gaps and opportunities specific to your target role.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#0891b2" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    color: '#cffafe',
  },
  {
    step: '04',
    title: 'Get Your Career Roadmap',
    description: 'Receive a personalized action plan with curated learning resources, project ideas, certifications, and a week-by-week roadmap to reach your goal.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M9 11l3 3L22 4" stroke="#059669" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="#059669" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    color: '#d1fae5',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" style={{ padding: '100px 24px', background: '#fff' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto 64px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            padding: '5px 14px', borderRadius: 100,
            border: '1px solid #e2e8f0', background: '#f8fafc',
            marginBottom: 20,
          }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#64748b', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              How It Works
            </span>
          </div>
          <h2 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800,
            color: '#0f172a', letterSpacing: '-0.8px', marginBottom: 16,
          }}>
            From resume to roadmap<br />in four steps
          </h2>
          <p style={{ fontSize: 16, color: '#64748b', lineHeight: 1.7, margin: 0 }}>
            ResumeXpert turns your existing resume into a precise, personalized career intelligence report — no guesswork, no generic advice.
          </p>
        </div>

        {/* Steps grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 20,
          position: 'relative',
        }} className="steps-grid">
          {/* Connector line */}
          <div style={{
            position: 'absolute', top: 36, left: '12.5%', right: '12.5%',
            height: 1, background: 'linear-gradient(90deg, #e2e8f0 0%, #bfdbfe 50%, #e2e8f0 100%)',
            zIndex: 0,
          }} className="connector-line" />

          {steps.map((s, i) => (
            <StepCard key={i} {...s} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .steps-grid { grid-template-columns: 1fr 1fr !important; }
          .connector-line { display: none !important; }
        }
        @media (max-width: 768px) {
          .steps-grid { grid-template-columns: 1fr !important; gap: 18px !important; }
          .step-card {
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

function StepCard({ step, title, description, icon, color }: {
  step: string, title: string, description: string, icon: React.ReactNode, color: string
}) {
  return (
    <div className="step-card" style={{
      padding: '28px 24px', borderRadius: 16,
      background: '#fff', border: '1px solid #e2e8f0',
      position: 'relative', zIndex: 1,
      transition: 'all 0.2s',
      cursor: 'default',
    }}
    onMouseEnter={e => {
      (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'
      ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 16px 40px rgba(15,23,42,0.08)'
      ;(e.currentTarget as HTMLDivElement).style.borderColor = '#bfdbfe'
    }}
    onMouseLeave={e => {
      (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'
      ;(e.currentTarget as HTMLDivElement).style.boxShadow = 'none'
      ;(e.currentTarget as HTMLDivElement).style.borderColor = '#e2e8f0'
    }}>
      {/* Step number */}
      <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12,
          background: color,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          {icon}
        </div>
        <span style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 12, fontWeight: 800, color: '#94a3b8', letterSpacing: '0.1em',
        }}>{step}</span>
      </div>
      <h3 style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: 17, fontWeight: 700, color: '#0f172a',
        margin: '0 0 10px', letterSpacing: '-0.2px',
      }}>{title}</h3>
      <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.65, margin: 0 }}>{description}</p>
    </div>
  )
}
