"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Clock, FolderKanban, Layers3 } from "lucide-react";

type Difficulty = "Beginner" | "Intermediate" | "Advanced";
type ResumeImpact = "High" | "Medium" | "Low";

type Project = {
  id: number;
  title: string;
  difficulty: Difficulty;
  description: string;
  skills: string[];
  duration: string;
  resumeImpact: ResumeImpact;
};

type ProjectRecommendation = {
  title: string;
  description: string;
  difficulty: Difficulty;
  estimatedTime: string;
  technologies: string[];
};

type ResumeAnalysis = {
  projectRecommendations?: unknown;
};

type ResumeAnalysisRow = {
  analysis: ResumeAnalysis | null;
};

const difficultyStyles: Record<Difficulty, string> = {
  Beginner: "border-emerald-200 bg-emerald-50 text-emerald-700",
  Intermediate: "border-blue-200 bg-blue-50 text-blue-700",
  Advanced: "border-violet-200 bg-violet-50 text-violet-700",
};

const impactStyles: Record<ResumeImpact, string> = {
  High: "border-emerald-200 bg-emerald-50 text-emerald-700",
  Medium: "border-amber-200 bg-amber-50 text-amber-700",
  Low: "border-slate-200 bg-slate-50 text-slate-600",
};

function isDifficulty(value: unknown): value is Difficulty {
  return value === "Beginner" || value === "Intermediate" || value === "Advanced";
}

function isProjectRecommendation(value: unknown): value is ProjectRecommendation {
  if (!value || typeof value !== "object") {
    return false;
  }

  const project = value as Record<string, unknown>;

  return (
    typeof project.title === "string" &&
    typeof project.description === "string" &&
    isDifficulty(project.difficulty) &&
    typeof project.estimatedTime === "string" &&
    Array.isArray(project.technologies) &&
    project.technologies.every(technology => typeof technology === "string")
  );
}

function getResumeImpact(difficulty: Difficulty): ResumeImpact {
  return difficulty === "Beginner" ? "Medium" : "High";
}

function mapProjectRecommendation(project: ProjectRecommendation, index: number): Project {
  return {
    id: index + 1,
    title: project.title,
    difficulty: project.difficulty,
    description: project.description,
    skills: project.technologies,
    duration: project.estimatedTime,
    resumeImpact: getResumeImpact(project.difficulty),
  };
}

export default function ProjectRecommendations() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadProjectRecommendations() {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) {
          throw userError;
        }

        if (!user) {
          if (isMounted) {
            setProjects([]);
          }
          return;
        }

        const { data, error } = await supabase
          .from("resume_analysis")
          .select("analysis, analyzed_at, resumes!inner(user_id)")
          .eq("resumes.user_id", user.id)
          .order("analyzed_at", { ascending: false })
          .limit(1)
          .maybeSingle<ResumeAnalysisRow>();

        if (error) {
          throw error;
        }

        const rawProjects = data?.analysis?.projectRecommendations;
        const nextProjects = Array.isArray(rawProjects)
          ? rawProjects
              .filter(isProjectRecommendation)
              .map(mapProjectRecommendation)
          : [];

        if (isMounted) {
          setProjects(nextProjects);
        }
      } catch (error) {
        console.error("Unable to load project recommendations:", error);

        if (isMounted) {
          setProjects([]);
          setErrorMessage("We could not load your project recommendations right now. Please try again.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadProjectRecommendations();

    return () => {
      isMounted = false;
    };
  }, []);

  const summaryCards = useMemo(() => [
    {
      label: "Total Recommended Projects",
      value: projects.length,
      accent: "border-blue-200 bg-blue-50 text-blue-700",
    },
    {
      label: "Beginner Projects",
      value: projects.filter(project => project.difficulty === "Beginner").length,
      accent: "border-emerald-200 bg-emerald-50 text-emerald-700",
    },
    {
      label: "Intermediate Projects",
      value: projects.filter(project => project.difficulty === "Intermediate").length,
      accent: "border-sky-200 bg-sky-50 text-sky-700",
    },
    {
      label: "Advanced Projects",
      value: projects.filter(project => project.difficulty === "Advanced").length,
      accent: "border-violet-200 bg-violet-50 text-violet-700",
    },
  ], [projects]);

  return (
    <div className="space-y-6">
      <div className="rounded-[16px] border border-[var(--app-border)] bg-[var(--app-surface)] p-5 shadow-[var(--app-shadow)]">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px] border border-blue-200 bg-blue-50 text-[#2563eb]">
            <FolderKanban size={19} strokeWidth={2.2} />
          </div>
          <div className="min-w-0">
            <h1 className="font-['Plus_Jakarta_Sans',sans-serif] text-[22px] font-extrabold leading-tight text-[var(--app-text)]">
              Project Recommendations
            </h1>
            <p className="mt-1 text-[13px] leading-5 text-[var(--app-text-muted)]">
              Build projects that strengthen your resume and improve practical skills.
            </p>
          </div>
        </div>
      </div>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map(card => (
          <div
            key={card.label}
            className="rounded-[16px] border border-[var(--app-border)] bg-[var(--app-surface)] p-5 shadow-[var(--app-shadow)]"
          >
            <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl border ${card.accent}`}>
              <Layers3 size={17} strokeWidth={2.2} />
            </div>
            <p className="text-[12px] font-bold uppercase text-[var(--app-text-subtle)]">{card.label}</p>
            <p className="mt-2 font-['Plus_Jakarta_Sans',sans-serif] text-[30px] font-extrabold leading-none text-[var(--app-text)]">
              {card.value}
            </p>
          </div>
        ))}
      </section>

      {isLoading ? (
        <section className="rounded-[16px] border border-[var(--app-border)] bg-[var(--app-surface)] p-5 text-sm font-semibold text-[var(--app-text-muted)] shadow-[var(--app-shadow)] sm:p-6">
          Loading project recommendations...
        </section>
      ) : errorMessage ? (
        <section className="rounded-[16px] border border-[var(--app-border)] bg-[var(--app-surface)] p-5 text-sm font-semibold text-[var(--app-text-muted)] shadow-[var(--app-shadow)] sm:p-6">
          {errorMessage}
        </section>
      ) : projects.length === 0 ? (
        <section className="rounded-[16px] border border-dashed border-[var(--app-border)] bg-[var(--app-surface)] p-5 text-sm font-semibold text-[var(--app-text-muted)] shadow-[var(--app-shadow)] sm:p-6">
          No project recommendations found. Upload a resume to generate personalized project ideas.
        </section>
      ) : (
        <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {projects.map(project => (
            <article
              key={project.id}
              className="flex min-h-[360px] flex-col rounded-[16px] border border-[var(--app-border)] bg-[var(--app-surface)] p-5 shadow-[var(--app-shadow)] transition hover:border-blue-200 hover:bg-blue-50/40"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-[#2563eb] font-['Plus_Jakarta_Sans',sans-serif] text-[12px] font-extrabold text-white shadow-[0_8px_18px_rgba(37,99,235,0.18)]">
                    {project.id}
                  </div>
                  <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-[16px] font-extrabold leading-6 text-[var(--app-text)]">
                    {project.title}
                  </h2>
                </div>
                <span className={`shrink-0 rounded-full border px-3 py-1 text-xs font-bold ${difficultyStyles[project.difficulty]}`}>
                  {project.difficulty}
                </span>
              </div>

              <p className="mt-4 flex-1 text-[13.5px] leading-6 text-[var(--app-text-muted)]">
                {project.description}
              </p>

              <div className="mt-5">
                <p className="text-xs font-bold uppercase text-[var(--app-text-subtle)]">
                  Skills Required
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.skills.map(skill => (
                    <span
                      key={skill}
                      className="rounded-full border border-[var(--app-border)] bg-[var(--app-surface-muted)] px-3 py-1 text-xs font-bold text-[var(--app-text-muted)]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-muted)] px-4 py-3">
                  <p className="text-xs font-semibold text-[var(--app-text-subtle)]">Estimated Duration</p>
                  <div className="mt-1 flex items-center gap-2 text-sm font-bold text-[var(--app-text)]">
                    <Clock size={14} strokeWidth={2.2} aria-hidden="true" />
                    {project.duration}
                  </div>
                </div>

                <div className="rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-muted)] px-4 py-3">
                  <p className="text-xs font-semibold text-[var(--app-text-subtle)]">Resume Impact</p>
                  <span className={`mt-2 inline-flex rounded-full border px-3 py-1 text-xs font-bold ${impactStyles[project.resumeImpact]}`}>
                    {project.resumeImpact}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}
    </div>
  );
}
