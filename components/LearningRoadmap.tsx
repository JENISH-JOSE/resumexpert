"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { BookOpen, Clock, Route } from "lucide-react";

type Difficulty = "Beginner" | "Intermediate" | "Advanced";

type RoadmapTopic = {
  id: number;
  topicName: string;
  difficulty: Difficulty;
  duration: string;
  description: string;
};

type ResumeAnalysis = {
  learningRoadmap?: unknown;
};

type ResumeAnalysisRow = {
  analysis: ResumeAnalysis | null;
};

const difficultyStyles: Record<Difficulty, string> = {
  Beginner: "border-emerald-200 bg-emerald-50 text-emerald-700",
  Intermediate: "border-blue-200 bg-blue-50 text-blue-700",
  Advanced: "border-violet-200 bg-violet-50 text-violet-700",
};

function parseRoadmapItem(item: string, index: number): RoadmapTopic {
  const separatorIndex = item.indexOf(":");
  const hasSeparator = separatorIndex !== -1;
  const topicName = hasSeparator ? item.slice(0, separatorIndex).trim() : item.trim();
  const description = hasSeparator ? item.slice(separatorIndex + 1).trim() : "";

  return {
    id: index + 1,
    topicName,
    description,
    difficulty: "Intermediate",
    duration: "Recommended",
  };
}

export default function LearningRoadmap() {
  const [roadmapTopics, setRoadmapTopics] = useState<RoadmapTopic[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadLearningRoadmap() {
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
            setRoadmapTopics([]);
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

        const rawRoadmap = data?.analysis?.learningRoadmap;
        const topics = Array.isArray(rawRoadmap)
          ? rawRoadmap
              .filter((item): item is string => typeof item === "string" && item.trim().length > 0)
              .map(parseRoadmapItem)
          : [];

        if (isMounted) {
          setRoadmapTopics(topics);
        }
      } catch (error) {
        console.error("Unable to load learning roadmap:", error);

        if (isMounted) {
          setRoadmapTopics([]);
          setErrorMessage("We could not load your learning roadmap right now. Please try again.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadLearningRoadmap();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="rounded-[16px] border border-[var(--app-border)] bg-[var(--app-surface)] p-5 shadow-[var(--app-shadow)]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px] border border-blue-200 bg-blue-50 text-[#2563eb]">
              <Route size={19} strokeWidth={2.2} />
            </div>
            <div className="min-w-0">
              <h1 className="font-['Plus_Jakarta_Sans',sans-serif] text-[22px] font-extrabold leading-tight text-[var(--app-text)]">
                Learning Roadmap
              </h1>
              <p className="mt-1 text-[13px] leading-5 text-[var(--app-text-muted)]">
                Personalized learning steps based on your latest resume analysis.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:min-w-[240px]">
            <RoadmapMetric label="Topics" value={roadmapTopics.length} />
            <RoadmapMetric label="Plan" value={roadmapTopics.length > 0 ? "Ready" : "--"} />
          </div>
        </div>
      </div>

      {isLoading ? (
        <section className="rounded-[16px] border border-[var(--app-border)] bg-[var(--app-surface)] p-5 text-sm font-semibold text-[var(--app-text-muted)] shadow-[var(--app-shadow)] sm:p-6">
          Loading learning roadmap...
        </section>
      ) : errorMessage ? (
        <section className="rounded-[16px] border border-[var(--app-border)] bg-[var(--app-surface)] p-5 text-sm font-semibold text-[var(--app-text-muted)] shadow-[var(--app-shadow)] sm:p-6">
          {errorMessage}
        </section>
      ) : roadmapTopics.length === 0 ? (
        <section className="rounded-[16px] border border-dashed border-[var(--app-border)] bg-[var(--app-surface)] p-5 text-sm font-semibold text-[var(--app-text-muted)] shadow-[var(--app-shadow)] sm:p-6">
          No learning roadmap found. Upload a resume to generate personalized learning topics.
        </section>
      ) : (
        <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {roadmapTopics.map(topic => (
            <article
              key={topic.id}
              className="flex min-h-[220px] flex-col rounded-[16px] border border-[var(--app-border)] bg-[var(--app-surface)] p-5 shadow-[var(--app-shadow)] transition hover:border-blue-200 hover:bg-blue-50/40"
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-[#2563eb] font-['Plus_Jakarta_Sans',sans-serif] text-[12px] font-extrabold text-white shadow-[0_8px_18px_rgba(37,99,235,0.18)]">
                    {topic.id}
                  </div>
                  <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-[16px] font-extrabold leading-6 text-[var(--app-text)]">
                    {topic.topicName}
                  </h2>
                </div>
                <span className={`shrink-0 rounded-full border px-3 py-1 text-xs font-bold ${difficultyStyles[topic.difficulty]}`}>
                  {topic.difficulty}
                </span>
              </div>

              <div className="flex items-center gap-2 text-[13px] font-bold text-[var(--app-text-muted)]">
                <Clock size={15} strokeWidth={2.2} aria-hidden="true" />
                {topic.duration}
              </div>

              <p className="mt-4 flex-1 text-[13.5px] leading-6 text-[var(--app-text-muted)]">
                {topic.description}
              </p>

              <div className="mt-5 flex items-center gap-2 border-t border-[var(--app-border)] pt-4 text-[12px] font-extrabold uppercase text-[var(--app-text-subtle)]">
                <BookOpen size={14} strokeWidth={2.2} />
                Learning step
              </div>
            </article>
          ))}
        </section>
      )}
    </div>
  );
}

function RoadmapMetric({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-muted)] px-3 py-3 text-center">
      <div className="mb-1 text-[11px] font-bold uppercase text-[var(--app-text-subtle)]">{label}</div>
      <div className="font-['Plus_Jakarta_Sans',sans-serif] text-[20px] font-extrabold leading-none text-[var(--app-text)]">
        {value}
      </div>
    </div>
  );
}
