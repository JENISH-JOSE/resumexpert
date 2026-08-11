"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Brain, BriefcaseBusiness, ClipboardList, MessageSquareText } from "lucide-react";
import type { ReactNode } from "react";

type InterviewFilter = "All" | "Technical" | "HR" | "Aptitude";

type InterviewPreparationData = {
  technical: string[];
  hr: string[];
  aptitudeTopics: string[];
};

type ResumeAnalysis = {
  interviewPreparation?: unknown;
};

type ResumeAnalysisRow = {
  analysis: ResumeAnalysis | null;
};

type GuideSection = {
  filter: Exclude<InterviewFilter, "All">;
  title: string;
  description: string;
  items: string[];
  accent: string;
  badge: string;
  icon: ReactNode;
};

const filters: InterviewFilter[] = ["All", "Technical", "HR", "Aptitude"];

const emptyInterviewPreparation: InterviewPreparationData = {
  technical: [],
  hr: [],
  aptitudeTopics: [],
};

function getStringList(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string" && item.trim().length > 0)
    : [];
}

function parseInterviewPreparation(value: unknown): InterviewPreparationData {
  if (!value || typeof value !== "object") {
    return emptyInterviewPreparation;
  }

  const preparation = value as Record<string, unknown>;

  return {
    technical: getStringList(preparation.technical),
    hr: getStringList(preparation.hr),
    aptitudeTopics: getStringList(preparation.aptitudeTopics),
  };
}

export default function InterviewPreparation() {
  const [activeFilter, setActiveFilter] = useState<InterviewFilter>("All");
  const [interviewPreparation, setInterviewPreparation] = useState<InterviewPreparationData>(emptyInterviewPreparation);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadInterviewPreparation() {
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
            setInterviewPreparation(emptyInterviewPreparation);
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

        const nextInterviewPreparation = parseInterviewPreparation(data?.analysis?.interviewPreparation);

        if (isMounted) {
          setInterviewPreparation(nextInterviewPreparation);
        }
      } catch (error) {
        console.error("Unable to load interview preparation:", error);

        if (isMounted) {
          setInterviewPreparation(emptyInterviewPreparation);
          setErrorMessage("We could not load your interview guide right now. Please try again.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadInterviewPreparation();

    return () => {
      isMounted = false;
    };
  }, []);

  const guideSections = useMemo<GuideSection[]>(() => [
    {
      filter: "Technical",
      title: "Technical Interview Questions",
      description: "Role-focused questions based on your resume, projects, and skills.",
      items: interviewPreparation.technical,
      accent: "border-blue-200 bg-blue-50 text-blue-700",
      badge: "Technical",
      icon: <Brain size={18} strokeWidth={2.2} />,
    },
    {
      filter: "HR",
      title: "HR Interview Questions",
      description: "Profile-driven prompts for motivation, behavior, strengths, and fit.",
      items: interviewPreparation.hr,
      accent: "border-violet-200 bg-violet-50 text-violet-700",
      badge: "HR",
      icon: <MessageSquareText size={18} strokeWidth={2.2} />,
    },
    {
      filter: "Aptitude",
      title: "Aptitude Preparation Topics",
      description: "Core aptitude areas every candidate should revise before interviews.",
      items: interviewPreparation.aptitudeTopics,
      accent: "border-sky-200 bg-sky-50 text-sky-700",
      badge: "Aptitude",
      icon: <ClipboardList size={18} strokeWidth={2.2} />,
    },
  ], [interviewPreparation]);

  const visibleSections = useMemo(() => (
    activeFilter === "All"
      ? guideSections
      : guideSections.filter(section => section.filter === activeFilter)
  ), [activeFilter, guideSections]);

  const totalItems = interviewPreparation.technical.length + interviewPreparation.hr.length + interviewPreparation.aptitudeTopics.length;

  const summaryCards = useMemo(() => [
    {
      label: "Total Guide Items",
      value: totalItems,
      accent: "border-blue-200 bg-blue-50 text-blue-700",
      icon: <BriefcaseBusiness size={17} strokeWidth={2.2} />,
    },
    {
      label: "Technical",
      value: interviewPreparation.technical.length,
      accent: "border-blue-200 bg-blue-50 text-blue-700",
      icon: <Brain size={17} strokeWidth={2.2} />,
    },
    {
      label: "HR",
      value: interviewPreparation.hr.length,
      accent: "border-violet-200 bg-violet-50 text-violet-700",
      icon: <MessageSquareText size={17} strokeWidth={2.2} />,
    },
    {
      label: "Aptitude",
      value: interviewPreparation.aptitudeTopics.length,
      accent: "border-sky-200 bg-sky-50 text-sky-700",
      icon: <ClipboardList size={17} strokeWidth={2.2} />,
    },
  ], [interviewPreparation, totalItems]);

  return (
    <div className="space-y-6">
      <div className="rounded-[16px] border border-[var(--app-border)] bg-[var(--app-surface)] p-5 shadow-[var(--app-shadow)]">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px] border border-blue-200 bg-blue-50 text-[#2563eb]">
            <BriefcaseBusiness size={19} strokeWidth={2.2} />
          </div>
          <div className="min-w-0">
            <h1 className="font-['Plus_Jakarta_Sans',sans-serif] text-[22px] font-extrabold leading-tight text-[var(--app-text)]">
              Interview Guide
            </h1>
            <p className="mt-1 text-[13px] leading-5 text-[var(--app-text-muted)]">
              Prepare with questions and aptitude topics tailored to your resume analysis.
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
              {card.icon}
            </div>
            <p className="text-[12px] font-bold uppercase text-[var(--app-text-subtle)]">{card.label}</p>
            <p className="mt-2 font-['Plus_Jakarta_Sans',sans-serif] text-[30px] font-extrabold leading-none text-[var(--app-text)]">
              {card.value}
            </p>
          </div>
        ))}
      </section>

      <section className="rounded-[16px] border border-[var(--app-border)] bg-[var(--app-surface)] p-2 shadow-[var(--app-shadow)]">
        <div className="flex flex-wrap gap-2">
          {filters.map(filter => {
            const active = filter === activeFilter;

            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`rounded-[11px] px-4 py-2.5 text-sm font-bold transition ${
                  active
                    ? "bg-blue-600 text-white shadow-[0_2px_10px_rgba(37,99,235,0.28)]"
                    : "border border-[var(--app-border)] bg-[var(--app-surface-muted)] text-[var(--app-text-muted)] hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </section>

      {isLoading ? (
        <section className="rounded-[16px] border border-[var(--app-border)] bg-[var(--app-surface)] p-5 text-sm font-semibold text-[var(--app-text-muted)] shadow-[var(--app-shadow)] sm:p-6">
          Loading interview guide...
        </section>
      ) : errorMessage ? (
        <section className="rounded-[16px] border border-[var(--app-border)] bg-[var(--app-surface)] p-5 text-sm font-semibold text-[var(--app-text-muted)] shadow-[var(--app-shadow)] sm:p-6">
          {errorMessage}
        </section>
      ) : totalItems === 0 ? (
        <section className="rounded-[16px] border border-dashed border-[var(--app-border)] bg-[var(--app-surface)] p-5 text-sm font-semibold text-[var(--app-text-muted)] shadow-[var(--app-shadow)] sm:p-6">
          No interview guide found. Upload a resume to generate personalized interview preparation.
        </section>
      ) : (
        <section className="grid gap-3 md:grid-cols-2">
          {visibleSections.map(section => (
            <article
              key={section.filter}
              className="rounded-[16px] border border-[var(--app-border)] bg-[var(--app-surface)] p-5 shadow-[var(--app-shadow)]"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex min-w-0 items-start gap-3">
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px] border ${section.accent}`}>
                    {section.icon}
                  </div>
                  <div className="min-w-0">
                    <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-[16px] font-extrabold leading-6 text-[var(--app-text)]">
                      {section.title}
                    </h2>
                    <p className="mt-1 text-[13px] leading-5 text-[var(--app-text-muted)]">
                      {section.description}
                    </p>
                  </div>
                </div>
                <span className={`shrink-0 rounded-full border px-3 py-1 text-xs font-bold ${section.accent}`}>
                  {section.badge}
                </span>
              </div>

              {section.items.length === 0 ? (
                <p className="mt-5 rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-muted)] px-4 py-3 text-sm font-semibold text-[var(--app-text-muted)]">
                  No {section.filter.toLowerCase()} items found in the latest analysis.
                </p>
              ) : (
                <ol className="mt-5 space-y-3">
                  {section.items.map((item, index) => (
                    <li
                      key={`${section.filter}-${index}-${item}`}
                      className="flex gap-3 rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-muted)] px-4 py-3 text-[13.5px] leading-6 text-[var(--app-text)]"
                    >
                      <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border text-xs font-extrabold ${section.accent}`}>
                        {index + 1}
                      </span>
                      <span className="pt-0.5">{item}</span>
                    </li>
                  ))}
                </ol>
              )}
            </article>
          ))}
        </section>
      )}
    </div>
  );
}
