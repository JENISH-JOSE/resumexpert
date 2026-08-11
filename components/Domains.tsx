"use client";
const domains = [
  {
    title: 'Software Engineering',
    description: 'Frontend, backend, full-stack, mobile, and systems engineering',
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <path d="M8 8l-5 5 5 5M18 8l5 5-5 5M14 5l-2 16" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    tags: ['React', 'Node.js', 'System Design', 'Algorithms'],
    accent: '#dbeafe',
    border: '#bfdbfe',
  },
  {
    title: 'Data Science & ML',
    description: 'Machine learning, deep learning, NLP, and data engineering',
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <path d="M3 20l5-5 4 4 5-7 6 8" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="8" cy="15" r="2" fill="#7c3aed"/>
        <circle cx="12" cy="19" r="2" fill="#7c3aed"/>
        <circle cx="17" cy="12" r="2" fill="#7c3aed"/>
        <circle cx="23" cy="20" r="2" fill="#7c3aed"/>
      </svg>
    ),
    tags: ['Python', 'PyTorch', 'MLOps', 'SQL'],
    accent: '#ede9fe',
    border: '#c4b5fd',
  },
  {
    title: 'Product Management',
    description: 'Product strategy, roadmapping, and go-to-market execution',
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <rect x="3" y="3" width="9" height="9" rx="2" stroke="#0891b2" strokeWidth="2"/>
        <rect x="14" y="3" width="9" height="9" rx="2" stroke="#0891b2" strokeWidth="2"/>
        <rect x="3" y="14" width="9" height="9" rx="2" stroke="#0891b2" strokeWidth="2"/>
        <path d="M14 18.5h9M18.5 14v9" stroke="#0891b2" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    tags: ['Roadmapping', 'OKRs', 'Agile', 'Analytics'],
    accent: '#cffafe',
    border: '#67e8f9',
  },
  {
    title: 'UX / Product Design',
    description: 'User research, interaction design, prototyping, and design systems',
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <circle cx="13" cy="13" r="4" stroke="#db2777" strokeWidth="2"/>
        <path d="M13 3v3M13 20v3M3 13h3M20 13h3M5.93 5.93l2.12 2.12M17.95 17.95l2.12 2.12M5.93 20.07l2.12-2.12M17.95 8.05l2.12-2.12" stroke="#db2777" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    tags: ['Figma', 'Design Systems', 'Usability', 'Prototyping'],
    accent: '#fce7f3',
    border: '#f9a8d4',
  },
  {
    title: 'Cloud & DevOps',
    description: 'Infrastructure, CI/CD, platform engineering, and SRE',
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <path d="M20 17.5a4.5 4.5 0 000-9H18.8A7 7 0 105.5 17.5" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M13 14v7M10 18l3 3 3-3" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    tags: ['AWS', 'Kubernetes', 'Terraform', 'Docker'],
    accent: '#d1fae5',
    border: '#6ee7b7',
  },
  {
    title: 'Cybersecurity',
    description: 'Application security, penetration testing, and compliance',
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <path d="M13 3L5 6v7c0 5 3.5 9 8 10 4.5-1 8-5 8-10V6l-8-3z" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 13l3 3 5-5" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    tags: ['OWASP', 'Pen Testing', 'SOC 2', 'Threat Modeling'],
    accent: '#fef3c7',
    border: '#fcd34d',
  },
  {
    title: 'Business Analysis',
    description: 'Requirements engineering, process modeling, and stakeholder management',
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <path d="M4 20V9h18v11H4zM4 9V6a1 1 0 011-1h16a1 1 0 011 1v3" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 14h8M9 17h5" stroke="#64748b" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    tags: ['BPMN', 'Agile', 'Stakeholders', 'SQL'],
    accent: '#f1f5f9',
    border: '#cbd5e1',
  },
  {
    title: 'Finance & FinTech',
    description: 'Quantitative analysis, financial modeling, and regulatory compliance',
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <circle cx="13" cy="13" r="10" stroke="#0f766e" strokeWidth="2"/>
        <path d="M13 7v2M13 17v2M9 11.5A2 2 0 0111 10h3a2 2 0 010 4h-2a2 2 0 000 4h3a2 2 0 002-2" stroke="#0f766e" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    tags: ['Python', 'Bloomberg', 'Risk Modeling', 'CFA'],
    accent: '#ccfbf1',
    border: '#5eead4',
  },
]

export default function Domains() {
  return (
    <section id="domains" style={{ padding: '100px 24px', background: '#fff' }}>
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
              Supported Career Domains
            </span>
          </div>
          <h2 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800,
            color: '#0f172a', letterSpacing: '-0.8px', marginBottom: 16,
          }}>
            Specialized guidance for every career path
          </h2>
          <p style={{ fontSize: 16, color: '#64748b', lineHeight: 1.7, margin: 0 }}>
            ResumeXpert covers 15+ career domains with domain-specific skill frameworks, job market insights, and curated learning paths.
          </p>
        </div>

        {/* Domains grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }} className="domains-grid">
          {domains.map((d, i) => (
            <DomainCard key={i} {...d} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1100px) {
          .domains-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 720px) {
          .domains-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .domains-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

function DomainCard({ title, description, icon, tags, accent, border }: {
  title: string, description: string, icon: React.ReactNode, tags: string[], accent: string, border: string
}) {
  return (
    <div style={{
      padding: '22px', borderRadius: 14,
      background: '#fff', border: '1px solid #e2e8f0',
      transition: 'all 0.2s', cursor: 'default',
    }}
    onMouseEnter={e => {
      (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)'
      ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 32px rgba(15,23,42,0.08)'
      ;(e.currentTarget as HTMLDivElement).style.borderColor = border
    }}
    onMouseLeave={e => {
      (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'
      ;(e.currentTarget as HTMLDivElement).style.boxShadow = 'none'
      ;(e.currentTarget as HTMLDivElement).style.borderColor = '#e2e8f0'
    }}>
      <div style={{
        width: 50, height: 50, borderRadius: 13,
        background: accent, border: `1px solid ${border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 14,
      }}>
        {icon}
      </div>
      <h3 style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: 15, fontWeight: 700, color: '#0f172a', margin: '0 0 6px',
      }}>{title}</h3>
      <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.5, margin: '0 0 14px' }}>{description}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
        {tags.map(tag => (
          <span key={tag} style={{
            padding: '2px 9px', borderRadius: 100,
            background: accent, color: '#475569',
            fontSize: 11, fontWeight: 600, border: `1px solid ${border}`,
          }}>{tag}</span>
        ))}
      </div>
    </div>
  )
}
