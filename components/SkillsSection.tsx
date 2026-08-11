"use client"

import { CheckCircle2, Circle, ListChecks, TriangleAlert } from 'lucide-react'
import type { ReactNode } from 'react'

type ResumeAnalysis = {
  resumeScore: number;
  atsScore: number;
  coreSkills?: string[];
  skillsFound: string[];
  missingSkills: string[];
  suggestions: string[];
  learningRoadmap: string[];
  interviewQuestions: string[];
};

type SkillsSectionProps = {
  analysis: ResumeAnalysis | null;
};

export default function SkillsSection({ analysis }: SkillsSectionProps) {
  const coreSkills = analysis?.coreSkills ?? []
  const foundSkills = analysis?.skillsFound ?? []
  const missingSkills = analysis?.missingSkills ?? []
  const coreSkillNames = new Set(coreSkills.map((skill) => skill.toLowerCase()))
  const foundSkillNames = new Set(foundSkills.map((skill) => skill.toLowerCase()))
  const missingSkillNames = new Set(missingSkills.map((skill) => skill.toLowerCase()))
  const coverage = coreSkills.length > 0 ? Math.round((foundSkills.length / coreSkills.length) * 100) : 0

  return (
    <section className="rounded-[16px] border border-[var(--app-border)] bg-[var(--app-surface)] p-5 shadow-[var(--app-shadow)]">
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px] border border-blue-200 bg-blue-50 text-[#2563eb]">
            <ListChecks size={19} strokeWidth={2.2} />
          </div>
          <div className="min-w-0">
            <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-[16px] font-extrabold leading-tight text-[var(--app-text)]">
              Skills Analysis
            </h2>
            <p className="mt-1 text-[13px] leading-5 text-[var(--app-text-muted)]">
              Core skills compared against the skills found in your resume.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2 sm:min-w-[360px] sm:grid-cols-3">
          <SkillMetric label="Core" value={coreSkills.length || foundSkills.length + missingSkills.length} />
          <SkillMetric label="Found" value={foundSkills.length} tone="found" />
          <SkillMetric label="Missing" value={missingSkills.length} tone="missing" />
        </div>
      </div>

      <div className="mb-5 flex items-center gap-3">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-[var(--app-surface-subtle)]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#2563eb] to-[#059669] transition-[width] duration-700"
            style={{ width: `${Math.min(100, Math.max(0, coverage))}%` }}
          />
        </div>
        <span className="whitespace-nowrap text-[12px] font-extrabold text-[var(--app-text-muted)]">
          {coverage}% covered
        </span>
      </div>

      {coreSkills.length > 0 ? (
        <div className="mb-5">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h3 className="text-[13px] font-extrabold uppercase text-[var(--app-text-subtle)]">Core Skills</h3>
            <span className="text-[12px] font-bold text-[var(--app-text-muted)]">{coreSkills.length} expected</span>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
            {coreSkills.map((skill) => {
              const key = skill.toLowerCase()
              const isFound = foundSkillNames.has(key)
              const isMissing = missingSkillNames.has(key)

              return (
                <SkillRow
                  key={skill}
                  skill={skill}
                  state={isFound ? 'found' : isMissing ? 'missing' : 'neutral'}
                />
              )
            })}
          </div>
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        <SkillPanel
          title="Found Skills"
          subtitle={`${foundSkills.length} skills found in your resume`}
          icon={<CheckCircle2 size={18} strokeWidth={2.2} />}
          tone="found"
        >
          <SkillChips skills={foundSkills.filter((skill) => coreSkills.length === 0 || coreSkillNames.has(skill.toLowerCase()))} tone="found" emptyText="No matching skills found yet." />
        </SkillPanel>

        <SkillPanel
          title="Missing Skills"
          subtitle={`${missingSkills.length} skill gaps identified`}
          icon={<TriangleAlert size={18} strokeWidth={2.2} />}
          tone="missing"
        >
          <SkillChips skills={missingSkills} tone="missing" emptyText="No missing skills identified." />
        </SkillPanel>
      </div>
    </section>
  )
}

function SkillMetric({ label, value, tone = 'neutral' }: { label: string; value: number; tone?: 'neutral' | 'found' | 'missing' }) {
  const toneClass = tone === 'found'
    ? 'text-emerald-700'
    : tone === 'missing'
      ? 'text-amber-700'
      : 'text-[var(--app-text)]'

  return (
    <div className="rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-muted)] px-3 py-3 text-center">
      <div className="mb-1 text-[11px] font-bold uppercase text-[var(--app-text-subtle)]">{label}</div>
      <div className={`font-['Plus_Jakarta_Sans',sans-serif] text-[22px] font-extrabold leading-none ${toneClass}`}>{value}</div>
    </div>
  )
}

function SkillRow({ skill, state }: { skill: string; state: 'found' | 'missing' | 'neutral' }) {
  const style = state === 'found'
    ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
    : state === 'missing'
      ? 'border-amber-200 bg-amber-50 text-amber-800'
      : 'border-[var(--app-border)] bg-[var(--app-surface-muted)] text-[var(--app-text-muted)]'

  return (
    <div className={`flex min-h-10 items-center gap-2 rounded-xl border px-3 py-2 text-[12.5px] font-bold ${style}`}>
      {state === 'found' ? (
        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2.2} />
      ) : state === 'missing' ? (
        <TriangleAlert className="h-4 w-4 shrink-0 text-amber-600" strokeWidth={2.2} />
      ) : (
        <Circle className="h-4 w-4 shrink-0 text-[var(--app-text-subtle)]" strokeWidth={2.2} />
      )}
      <span className="min-w-0 truncate">{skill}</span>
    </div>
  )
}

function SkillPanel({ title, subtitle, icon, tone, children }: {
  title: string;
  subtitle: string;
  icon: ReactNode;
  tone: 'found' | 'missing';
  children: ReactNode;
}) {
  const toneClass = tone === 'found'
    ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
    : 'border-amber-200 bg-amber-50 text-amber-700'

  return (
    <div className="rounded-[15px] border border-[var(--app-border)] bg-[var(--app-surface-muted)] p-4">
      <div className="mb-4 flex items-center gap-3">
        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px] border ${toneClass}`}>
          {icon}
        </div>
        <div className="min-w-0">
          <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-[14px] font-extrabold leading-tight text-[var(--app-text)]">{title}</h3>
          <p className="mt-0.5 text-[12px] text-[var(--app-text-muted)]">{subtitle}</p>
        </div>
      </div>
      {children}
    </div>
  )
}

function SkillChips({ skills, tone, emptyText }: { skills: string[]; tone: 'found' | 'missing'; emptyText: string }) {
  if (skills.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-[var(--app-border)] px-3 py-4 text-center text-[12.5px] font-semibold text-[var(--app-text-muted)]">
        {emptyText}
      </div>
    )
  }

  const chipClass = tone === 'found'
    ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
    : 'border-amber-200 bg-amber-50 text-amber-800'

  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => (
        <span key={skill} className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12.5px] font-bold ${chipClass}`}>
          {tone === 'found' ? (
            <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-600" strokeWidth={2.3} />
          ) : (
            <TriangleAlert className="h-3.5 w-3.5 shrink-0 text-amber-600" strokeWidth={2.3} />
          )}
          {skill}
        </span>
      ))}
    </div>
  )
}
