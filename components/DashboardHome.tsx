"use client"

import { useEffect, useState, type ChangeEvent, type RefObject } from 'react'
import AIRecommendations from './AIRecommendations'
import ScoreCards from './ScoreCards'
import SkillsSection from './SkillsSection'

export type ResumeRecord = {
  id: string
  user_id: string
  file_name: string
  storage_path: string
  uploaded_at: string
}

export type ResumeAnalysis = {
  resumeScore: number;
  atsScore: number;
  skillsFound: string[];
  missingSkills: string[];
  suggestions: string[];
  learningRoadmap: string[];
  interviewQuestions: string[];
  projectRecommendations: {
    title: string;
    description: string;
    difficulty: "Beginner" | "Intermediate" | "Advanced";
    estimatedTime: string;
    technologies: string[];
  }[];
};

type DashboardHomeProps = {
  analysis: ResumeAnalysis | null;
  resume: ResumeRecord | null;
  fileInputRef: RefObject<HTMLInputElement | null>;
  uploadResume: () => void;
  handleResumeSelected: (event: ChangeEvent<HTMLInputElement>) => void;
  uploadMessage: string;
  uploadProgress: number;
  isUploading: boolean;
  isAnalysisLoading: boolean;
  careerGoal: string;
  setCareerGoal: (value: string) => void;
};

export default function DashboardHome({
  analysis,
  resume,
  fileInputRef,
  uploadResume,
  handleResumeSelected,
  uploadMessage,
  uploadProgress,
  isUploading,
  isAnalysisLoading,
  careerGoal,
  setCareerGoal,
}: DashboardHomeProps) {
  const [isContentVisible, setIsContentVisible] = useState(false)
  const resumeScore = analysis?.resumeScore ?? 0
  const atsScore = analysis?.atsScore ?? 0
  const averageScore = analysis ? Math.round((resumeScore + atsScore) / 2) : 0
  const skillsFoundCount = analysis?.skillsFound?.length ?? 0
  const missingSkillsCount = analysis?.missingSkills?.length ?? 0

  useEffect(() => {
    let isMounted = true

    if (isAnalysisLoading) {
      const frameId = window.requestAnimationFrame(() => {
        if (isMounted) {
          setIsContentVisible(false)
        }
      })

      return () => {
        isMounted = false
        window.cancelAnimationFrame(frameId)
      }
    }

    const timeoutId = window.setTimeout(() => {
      if (isMounted) {
        setIsContentVisible(true)
      }
    }, 40)

    return () => {
      isMounted = false
      window.clearTimeout(timeoutId)
    }
  }, [isAnalysisLoading])

  if (isAnalysisLoading) {
    return <DashboardSkeleton />
  }

  return (
    <div className="space-y-4" style={{ opacity: isContentVisible ? 1 : 0, transition: 'opacity 0.28s ease' }}>
      {/* Analysis header */}
      <div className="overflow-hidden rounded-[16px] border border-[var(--app-border)] bg-[var(--app-surface)] shadow-[var(--app-shadow)]">
        <div className="flex flex-col gap-4 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[12px] font-bold text-emerald-700">
                <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_3px_rgba(34,197,94,0.16)]" />
                Analysis Complete
              </span>
              {resume?.file_name ? (
                <span className="max-w-full truncate rounded-full border border-[var(--app-border)] bg-[var(--app-surface-muted)] px-3 py-1 text-[12px] font-semibold text-[var(--app-text-muted)]">
                  {resume.file_name}
                </span>
              ) : null}
            </div>
            <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 24, fontWeight: 850, color: 'var(--app-text)', letterSpacing: 0, margin: '0 0 8px', lineHeight: 1.12 }}>
              Resume Analysis Results
            </h1>
            <p className="max-w-2xl text-[14px] leading-6 text-[var(--app-text-muted)] sm:text-[14.5px]">
              Review your resume quality, ATS readiness, detected strengths, and skill gaps from the latest upload.
            </p>
          </div>

          <div className="grid min-w-0 grid-cols-3 gap-2 lg:min-w-[320px]">
            <HeaderMetric label="Overall" value={analysis ? `${averageScore}` : "--"} suffix="/100" />
            <HeaderMetric label="Strengths" value={`${skillsFoundCount}`} suffix="" />
            <HeaderMetric label="Gaps" value={`${missingSkillsCount}`} suffix="" />
          </div>
        </div>
      </div>

      {/* ── CAREER GOAL CARD ── */}
      <div style={{
        background: 'var(--app-surface)', borderRadius: 14, border: '1px solid var(--app-border)',
        padding: '18px 20px',
        display: 'flex', flexDirection: 'column', gap: 8,
        boxShadow: 'var(--app-shadow)',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}>
        <label htmlFor="career-goal-input" style={{ fontSize: 14.5, fontWeight: 700, color: 'var(--app-text)' }}>
          Career Goal <span style={{ color: '#ef4444' }}>*</span>
        </label>
        <input
          id="career-goal-input"
          type="text"
          value={careerGoal}
          onChange={(e) => setCareerGoal(e.target.value)}
          placeholder="e.g., Full Stack Developer, Data Analyst, Mechanical Engineer"
          style={{
            padding: '10px 14px',
            borderRadius: 9,
            border: '1.5px solid var(--app-border)',
            background: 'var(--app-surface)',
            color: 'var(--app-text)',
            fontSize: 13.5,
            fontWeight: 500,
            outline: 'none',
            cursor: 'text',
            transition: 'border-color 0.15s, box-shadow 0.15s',
            width: '100%',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = '#3b82f6';
            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'var(--app-border)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        />
        <span style={{ fontSize: 12.5, color: 'var(--app-text-muted)', marginTop: 2 }}>
          Enter the career path you want ResumeXpert to guide you toward.
        </span>
      </div>

      {/* ── RESUME CARD ── */}
      <div style={{
        background: 'var(--app-surface)', borderRadius: 14, border: '1px solid var(--app-border)',
        padding: '18px 20px',
        display: 'flex', alignItems: 'center', gap: 16,
        boxShadow: 'var(--app-shadow)',
      }} className="flex-col sm:flex-row">
        {/* PDF icon */}
        <div style={{
          width: 46, height: 46, borderRadius: 11, flexShrink: 0,
          background: '#fff1f2', border: '1px solid #fecdd3',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M13 2H6a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V7l-5-5z" stroke="#ef4444" strokeWidth="1.7" strokeLinejoin="round"/>
            <path d="M13 2v5h5" stroke="#ef4444" strokeWidth="1.7" strokeLinejoin="round"/>
            <path d="M8 13h6M8 10h3" stroke="#ef4444" strokeWidth="1.7" strokeLinecap="round"/>
          </svg>
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14.5, fontWeight: 700, color: 'var(--app-text)', marginBottom: 3 }}>
            {resume?.file_name ?? 'Resume.pdf'}
          </div>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} />
              <span style={{ fontSize: 12.5, color: 'var(--app-text-muted)' }}>
                {isUploading ? `Uploading ${uploadProgress}%` : uploadMessage || (resume ? 'Uploaded just now' : 'No resume uploaded')}
              </span>
              {resume ? (
                <>
                  <span style={{ fontSize: 12.5, color: '#cbd5e1' }}>•</span>
                  <span style={{ fontSize: 12.5, color: 'var(--app-text-muted)' }}>Analysis ready</span>
                </>
              ) : null}
            </div>
        </div>

        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row" style={{ flexShrink: 0 }}>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain,image/jpeg,image/png"
            style={{ display: 'none' }}
            onChange={handleResumeSelected}
          />

          <button
            disabled={isUploading}
            onClick={uploadResume}
            className="flex w-full items-center justify-center gap-2 sm:w-auto"
            style={{
            display: 'flex', alignItems: 'center', gap: 7,
            padding: '8px 14px', borderRadius: 9,
            border: '1.5px solid var(--app-border)', background: 'var(--app-surface)',
            fontSize: 13, fontWeight: 600, color: 'var(--app-text)',
            cursor: isUploading ? 'wait' : 'pointer', transition: 'all 0.15s',
          }}
          onMouseEnter={e => {
            if (!isUploading) {
              const el = e.currentTarget as HTMLButtonElement
              el.style.borderColor = '#93c5fd'
              el.style.background = '#f0f7ff'
            }
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLButtonElement
            el.style.borderColor = 'var(--app-border)'
            el.style.background = 'var(--app-surface)'
          }}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M6.5 9V2M4 5.5L6.5 3 9 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1.5 9.5v1.5A1 1 0 002.5 12h8a1 1 0 001-1V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            {isUploading ? `Uploading ${uploadProgress}%` : 'Upload New Resume'}
          </button>
        </div>
      </div>
 
      {/* ── SUPPORTED FORMATS & NOTE ── */}
      <div style={{
        background: 'var(--app-surface)',
        borderRadius: 14,
        border: '1px solid var(--app-border)',
        padding: '18px 20px',
        boxShadow: 'var(--app-shadow)',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div>
            <h3 style={{
              fontSize: 14.5,
              fontWeight: 800,
              color: 'var(--app-text)',
              margin: '0 0 8px 0',
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}>
              📄 Supported Formats
            </h3>
            <div style={{
              fontSize: 13.5,
              color: 'var(--app-text-muted)',
              lineHeight: 1.6,
              display: 'flex',
              flexDirection: 'column',
              gap: 4
            }}>
              <div>• PDF (Text-based)</div>
              <div>• DOCX</div>
              <div>• TXT</div>
              <div>• JPG / JPEG / PNG</div>
            </div>
          </div>
          <div style={{
            borderTop: '1px solid var(--app-border)',
            paddingTop: 12,
            marginTop: 4
          }}>
            <div style={{
              fontSize: 13.5,
              color: 'var(--app-text-muted)',
              margin: 0,
              lineHeight: 1.6
            }}>
              <span style={{ fontWeight: 700, color: 'var(--app-text)', display: 'inline-flex', alignItems: 'center', gap: 4, marginBottom: 4 }}>
                💡 Note:
              </span>
              <div>Scanned PDFs are currently not available.</div>
              <div>If your resume is a scanned PDF, please upload it as a JPG or PNG image instead.</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── STATS ROW ── */}
      <ScoreCards analysis={analysis} />

      {/* ── SKILLS ANALYSIS ── */}
      <SkillsSection analysis={analysis} />

      {/* ── AI RECOMMENDATIONS ── */}
      <div>
        <AIRecommendations analysis={analysis} />
      </div>
    </div>
  )
}

function HeaderMetric({ label, value, suffix }: { label: string; value: string; suffix: string }) {
  return (
    <div className="rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-muted)] px-3 py-2.5 text-center">
      <div className="mb-1 text-[11px] font-bold uppercase text-[var(--app-text-subtle)]">{label}</div>
      <div className="font-['Plus_Jakarta_Sans',sans-serif] text-[20px] font-extrabold leading-none text-[var(--app-text)]">
        {value}
        {suffix ? <span className="ml-0.5 text-[11px] font-bold text-[var(--app-text-subtle)]">{suffix}</span> : null}
      </div>
    </div>
  )
}

function DashboardSkeleton() {
  const cardStyle = {
    background: 'var(--app-surface)',
    borderRadius: 14,
    border: '1px solid var(--app-border)',
    padding: '18px 20px',
    boxShadow: 'var(--app-shadow)',
    position: 'relative' as const,
    overflow: 'hidden' as const,
  }

  const lineStyle = {
    height: 12,
    borderRadius: 999,
    background: 'linear-gradient(90deg, #e2e8f0 0%, #f8fafc 50%, #e2e8f0 100%)',
    backgroundSize: '200% 100%',
    animation: 'dashboard-shimmer 1.2s linear infinite',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <style>{`
        @keyframes dashboard-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
      <div style={{ ...cardStyle, padding: '20px 22px' }}>
        <div style={{ ...lineStyle, width: '56%', marginBottom: 10 }} />
        <div style={{ ...lineStyle, width: '72%', marginBottom: 18 }} />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} style={{ ...cardStyle, padding: '16px 16px', minHeight: 132 }}>
              <div style={{ ...lineStyle, width: '58%', marginBottom: 14 }} />
              <div style={{ ...lineStyle, width: '42%', marginBottom: 18 }} />
              <div style={{ ...lineStyle, width: '82%', marginBottom: 8 }} />
              <div style={{ ...lineStyle, width: '62%' }} />
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        {Array.from({ length: 2 }).map((_, index) => (
          <div key={index} style={{ ...cardStyle, padding: '20px 22px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 32, height: 32, borderRadius: 9, background: '#f1f5f9' }} />
              <div style={{ flex: 1 }}>
                <div style={{ ...lineStyle, width: '70%', marginBottom: 8 }} />
                <div style={{ ...lineStyle, width: '52%' }} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {Array.from({ length: index === 0 ? 4 : 3 }).map((_, chipIndex) => (
                <div key={chipIndex} style={{ ...lineStyle, width: 70 + chipIndex * 10, height: 26, borderRadius: 999 }} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ ...cardStyle, padding: '22px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: '#f1f5f9' }} />
          <div style={{ flex: 1 }}>
            <div style={{ ...lineStyle, width: '48%', marginBottom: 8 }} />
            <div style={{ ...lineStyle, width: '64%' }} />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} style={{ ...cardStyle, padding: '13px 16px', minHeight: 48 }}>
              <div style={{ ...lineStyle, width: index === 0 ? '88%' : '72%', marginTop: index === 0 ? 3 : 5 }} />
            </div>
          ))}
        </div>
      </div>

      <div style={{ ...cardStyle, padding: '22px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: '#f1f5f9' }} />
          <div style={{ flex: 1 }}>
            <div style={{ ...lineStyle, width: '50%', marginBottom: 8 }} />
            <div style={{ ...lineStyle, width: '62%' }} />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#e2e8f0' }} />
              <div style={{ ...lineStyle, width: `${70 - index * 8}%`, height: 12 }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
