"use client"

import { Award, Gauge, Target } from 'lucide-react'
import { useEffect, useRef, useState, type ReactNode } from 'react'

type ResumeAnalysis = {
  resumeScore: number;
  atsScore: number;
  skillsFound: string[];
  missingSkills: string[];
  suggestions: string[];
  learningRoadmap: string[];
  interviewQuestions: string[];
};

type ScoreCardsProps = {
  analysis: ResumeAnalysis | null;
};

export default function ScoreCards({ analysis }: ScoreCardsProps) {
  const [displayedValues, setDisplayedValues] = useState({
    resumeScore: 0,
    atsScore: 0,
    skillsFound: 0,
    missingSkills: 0,
  })

  const animationFrameRef = useRef<number | null>(null)

  useEffect(() => {
    if (!analysis) {
      const frameId = window.requestAnimationFrame(() => {
        setDisplayedValues({ resumeScore: 0, atsScore: 0, skillsFound: 0, missingSkills: 0 })
      })

      return () => window.cancelAnimationFrame(frameId)
    }

    const duration = 1000
    const targetValues = {
      resumeScore: analysis.resumeScore ?? 0,
      atsScore: analysis.atsScore ?? 0,
      skillsFound: analysis.skillsFound?.length ?? 0,
      missingSkills: analysis.missingSkills?.length ?? 0,
    }

    const startTime = window.performance.now()

    const tick = (now: number) => {
      const progress = Math.min(1, (now - startTime) / duration)
      const eased = 1 - Math.pow(1 - progress, 3)

      setDisplayedValues({
        resumeScore: Math.round(targetValues.resumeScore * eased),
        atsScore: Math.round(targetValues.atsScore * eased),
        skillsFound: Math.round(targetValues.skillsFound * eased),
        missingSkills: Math.round(targetValues.missingSkills * eased),
      })

      if (progress < 1) {
        animationFrameRef.current = window.requestAnimationFrame(tick)
      }
    }

    animationFrameRef.current = window.requestAnimationFrame(tick)

    return () => {
      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [analysis])

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-2">
      <StatCard label="Resume Score" value={displayedValues.resumeScore} suffix="/100" color="#2563eb" softColor="#eff6ff" borderColor="#bfdbfe" progress={Math.min(100, displayedValues.resumeScore)}
        icon={<Award size={18} strokeWidth={2.2} />}
        description="Structure, clarity, impact"
        status={getScoreStatus(displayedValues.resumeScore)}
        emphasis
      />
      <StatCard label="ATS Score" value={displayedValues.atsScore} suffix="/100" color="#0f766e" softColor="#ccfbf1" borderColor="#99f6e4" progress={Math.min(100, displayedValues.atsScore)}
        icon={<Gauge size={18} strokeWidth={2.2} />}
        description="Keyword and parser fit"
        status={getScoreStatus(displayedValues.atsScore)}
        emphasis
      />
    </div>
  )
}

function getScoreStatus(score: number) {
  if (score >= 80) {
    return { label: 'Excellent', color: '#047857', bg: '#ecfdf5', border: '#a7f3d0' }
  }

  if (score >= 60) {
    return { label: 'Good', color: '#b45309', bg: '#fffbeb', border: '#fde68a' }
  }

  return { label: 'Needs Work', color: '#be123c', bg: '#fff1f2', border: '#fecdd3' }
}

function StatCard({ label, value, suffix, color, softColor, borderColor, progress, icon, description, status, emphasis = false, footerLabel }: {
  label: string, value: number, suffix: string, color: string, softColor: string, borderColor: string,
  progress: number, icon: ReactNode, description: string,
  status: { label: string; color: string; bg: string; border: string }, emphasis?: boolean, footerLabel?: string
}) {
  return (
    <div className="relative overflow-hidden rounded-[16px] border border-[var(--app-border)] bg-[var(--app-surface)] p-5 shadow-[var(--app-shadow)]">
      {emphasis ? (
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1" style={{ background: `linear-gradient(90deg, ${color}, ${color}55)` }} />
      ) : null}

      <div className="mb-5 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <span className="block text-[12px] font-bold uppercase text-[var(--app-text-subtle)]">{label}</span>
          <span className="mt-1 block text-[12.5px] font-medium leading-5 text-[var(--app-text-muted)]">{description}</span>
        </div>
        <div style={{ width: 38, height: 38, borderRadius: 11, background: softColor, border: `1px solid ${borderColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color, flexShrink: 0 }}>{icon}</div>
      </div>

      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: emphasis ? 38 : 34, fontWeight: 850, color: 'var(--app-text)', letterSpacing: 0, lineHeight: 1 }}>
          {value}<span style={{ fontSize: 14, fontWeight: 700, color: 'var(--app-text-subtle)', letterSpacing: 0 }}>{suffix}</span>
        </div>
        <span style={{ fontSize: 11.5, fontWeight: 800, color: status.color, background: status.bg, border: `1px solid ${status.border}`, padding: '4px 9px', borderRadius: 999, whiteSpace: 'nowrap' }}>
          {status.label}
        </span>
      </div>

      <div className="mb-2 flex items-center gap-2">
        <div style={{ color }}>
          <Target size={13} strokeWidth={2.4} />
        </div>
        <div style={{ height: 7, background: 'var(--app-surface-subtle)', borderRadius: 999, overflow: 'hidden', flex: 1 }}>
          <div style={{ height: '100%', width: `${progress}%`, borderRadius: 999, background: `linear-gradient(90deg, ${color}, ${color}99)`, transition: 'width 0.7s ease' }} />
        </div>
      </div>
      {footerLabel ? (
        <div className="text-[10.5px] font-bold uppercase text-[var(--app-text-subtle)]">{footerLabel}</div>
      ) : (
        <div className="flex justify-between text-[10.5px] font-bold text-[var(--app-text-subtle)]">
          <span>0</span>
          <span>50</span>
          <span>100</span>
        </div>
      )}
    </div>
  )
}
