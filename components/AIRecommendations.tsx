"use client"

import { Lightbulb, Sparkles } from 'lucide-react'

type ResumeAnalysis = {
  resumeScore: number;
  atsScore: number;
  skillsFound: string[];
  missingSkills: string[];
  suggestions: string[];
  learningRoadmap: string[];
  interviewQuestions: string[];
};

type AIRecommendationsProps = {
  analysis: ResumeAnalysis | null;
};

export default function AIRecommendations({ analysis }: AIRecommendationsProps) {
  const suggestions = analysis?.suggestions ?? []

  return (
    <section className="overflow-hidden rounded-[16px] border border-[var(--app-border)] bg-[var(--app-surface)] p-5 shadow-[var(--app-shadow)]">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px] border border-blue-200 bg-blue-50 text-[#2563eb]">
            <Lightbulb size={19} strokeWidth={2.2} />
          </div>
          <div className="min-w-0">
            <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-[16px] font-extrabold leading-tight text-[var(--app-text)]">
              AI Recommendations
            </h2>
            <p className="mt-1 text-[13px] leading-5 text-[var(--app-text-muted)]">
              Personalized suggestions to strengthen your resume.
            </p>
          </div>
        </div>

        <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-[12px] font-extrabold text-blue-700">
          <Sparkles size={13} strokeWidth={2.4} />
          {suggestions.length} suggestions
        </span>
      </div>

      {suggestions.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          {suggestions.map((recommendation, index) => (
            <article
              key={`${index}-${recommendation}`}
              className="group relative min-h-[112px] overflow-hidden rounded-[15px] border border-[var(--app-border)] bg-[var(--app-surface-muted)] p-4 transition hover:border-blue-200 hover:bg-blue-50/60"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-[#2563eb] font-['Plus_Jakarta_Sans',sans-serif] text-[12px] font-extrabold text-white shadow-[0_8px_18px_rgba(37,99,235,0.18)]">
                  {index + 1}
                </div>
                <div className="min-w-0">
                  <div className="mb-1.5 text-[11px] font-extrabold uppercase text-[var(--app-text-subtle)]">
                    Recommendation
                  </div>
                  <p className="m-0 text-[13.5px] font-medium leading-6 text-[var(--app-text)]">
                    {recommendation}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-[15px] border border-dashed border-[var(--app-border)] bg-[var(--app-surface-muted)] px-4 py-6 text-center text-[13px] font-semibold text-[var(--app-text-muted)]">
          No suggestions available yet.
        </div>
      )}
    </section>
  )
}
