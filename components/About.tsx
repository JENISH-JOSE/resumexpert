"use client";

import { BookOpen, Briefcase, FileText, Target } from 'lucide-react';

const aboutFeatures = [
  {
    title: 'ATS Resume Analysis',
    description: 'Optimize your resume for Applicant Tracking Systems with intelligent AI-powered feedback.',
    icon: FileText,
  },
  {
    title: 'Skill Gap Detection',
    description: 'Identify missing technical and soft skills based on your target career path.',
    icon: Target,
  },
  {
    title: 'Personalized Learning Roadmap',
    description: 'Receive a structured learning plan tailored to your resume and career goals.',
    icon: BookOpen,
  },
  {
    title: 'Interview Preparation',
    description: 'Practice common interview questions and improve your confidence with AI guidance.',
    icon: Briefcase,
  },
]

export default function About() {
  return (
    <section id="about" style={{ padding: '100px 24px', background: '#fff' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '0.85fr 1.15fr',
          gap: 56,
          alignItems: 'center',
        }} className="about-grid">
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              padding: '5px 14px', borderRadius: 100,
              border: '1px solid #e2e8f0', background: '#f8fafc',
              marginBottom: 20,
            }} className="about-section-badge">
              <span style={{ fontSize: 12, fontWeight: 700, color: '#64748b', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                About ResumeXpert
              </span>
            </div>
            <h2 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 'clamp(28px, 4vw, 42px)',
              fontWeight: 800,
              color: '#0f172a',
              letterSpacing: '-0.8px',
              lineHeight: 1.15,
              margin: 0,
            }}>
              Intelligent resume guidance for clearer career growth
            </h2>
          </div>

          <div className="about-copy-panel" style={{
            borderLeft: '3px solid #2563eb',
            paddingLeft: 28,
          }}>
            <p style={{
              fontSize: 17,
              color: '#475569',
              lineHeight: 1.8,
              margin: 0,
            }}>
              ResumeXpert is an AI-powered career platform that helps students and professionals improve their resumes through ATS analysis, skill-gap detection, personalized learning roadmaps, project recommendations, and interview preparation. Our goal is to simplify career growth with intelligent, actionable insights.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 16,
              marginTop: 32,
            }} className="about-feature-grid">
              {aboutFeatures.map(feature => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.title}
                    className="about-feature-card"
                    tabIndex={0}
                    role="group"
                    aria-label={feature.title}
                    style={{
                      border: '1px solid #e2e8f0',
                      borderRadius: 14,
                      background: '#f8fafc',
                      padding: 20,
                      boxShadow: '0 1px 4px rgba(15,23,42,0.04)',
                      transition: 'transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease',
                      outline: 'none',
                    }}
                  >
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 28,
                      height: 28,
                      borderRadius: 999,
                      background: 'rgba(37,99,235,0.08)',
                      color: '#2563eb',
                      marginBottom: 12,
                    }}>
                      <Icon size={14} strokeWidth={2.4} />
                    </div>
                    <h3 style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: 15,
                      fontWeight: 800,
                      color: '#0f172a',
                      letterSpacing: '-0.2px',
                      margin: '0 0 8px',
                    }}>
                      {feature.title}
                    </h3>
                    <p style={{
                      fontSize: 13.5,
                      color: '#64748b',
                      lineHeight: 1.65,
                      margin: 0,
                    }}>
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <button
              className="about-cta"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '14px 32px',
                borderRadius: 12,
                background: '#2563eb',
                border: 'none',
                fontSize: 15,
                fontWeight: 700,
                color: '#fff',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 4px 20px rgba(37,99,235,0.22)',
                marginTop: 28,
              }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 32px rgba(37,99,235,0.3)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 20px rgba(37,99,235,0.22)' }}
            >
              Upload Your Resume <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .about-feature-card:hover,
        .about-feature-card:focus-visible {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(15, 23, 42, 0.08);
          border-color: #2563eb;
        }

        .about-grid {
          display: grid !important;
          grid-template-columns: 0.85fr 1.15fr !important;
          gap: 56px !important;
          align-items: center !important;
        }
        .about-section-badge {
          display: inline-flex !important;
          width: auto !important;
          margin: 0 0 20px 0 !important;
        }
        .about-copy-panel {
          border-left: 3px solid #2563eb !important;
          border-top: 0 !important;
          padding-left: 28px !important;
          padding-top: 0 !important;
        }
        .about-feature-grid {
          display: grid !important;
          grid-template-columns: repeat(2, 1fr) !important;
          gap: 16px !important;
          margin-top: 32px !important;
        }
        .about-feature-card {
          width: auto !important;
          max-width: none !important;
          margin: 0 !important;
          box-sizing: border-box !important;
        }
        .about-cta {
          width: auto !important;
          margin-left: 0 !important;
          margin-right: 0 !important;
        }

        @media (max-width: 767px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .about-section-badge { display: flex !important; width: fit-content !important; margin-left: auto !important; margin-right: auto !important; }
          .about-copy-panel {
            border-left: 0 !important;
            border-top: 3px solid #2563eb !important;
            padding-left: 0 !important;
            padding-top: 20px !important;
          }
          .about-cta {
            width: min(92vw, 400px) !important;
            justify-content: center !important;
            margin-left: auto !important;
            margin-right: auto !important;
          }
        }
        @media (max-width: 640px) {
          .about-feature-grid { grid-template-columns: 1fr !important; gap: 12px !important; }
          .about-feature-card {
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
