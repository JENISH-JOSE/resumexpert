"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import {
  ArrowLeft,
  Award,
  Gauge,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  Map,
  HelpCircle,
  Sparkles,
  BookOpen,
  AlertTriangle,
  Loader2,
  FileSearch,
} from "lucide-react";

type ReportDetailsProps = {
  reportId: string;
};

type JsonRecord = Record<string, unknown>;

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

// Helper function to safely normalize string or object items from JSON
function formatItem(item: unknown): { title: string; subtitle?: string } {
  if (item === null || item === undefined) return { title: "" };
  if (typeof item === "string") return { title: item };
  if (typeof item === "number" || typeof item === "boolean") return { title: String(item) };
  if (isRecord(item)) {
    const title =
      item.title ??
      item.name ??
      item.skill ??
      item.question ??
      item.step ??
      item.topic ??
      item.suggestion ??
      item.heading ??
      Object.values(item)[0] ??
      JSON.stringify(item);

    const subtitle =
      item.description ??
      item.detail ??
      item.details ??
      item.answer ??
      item.reason ??
      item.duration ??
      item.level ??
      item.explanation ??
      undefined;

    return {
      title: typeof title === "string" ? title : String(title ?? ""),
      subtitle: typeof subtitle === "string" ? subtitle : subtitle ? String(subtitle) : undefined,
    };
  }
  return { title: String(item) };
}

export default function ReportDetails({ reportId }: ReportDetailsProps) {
  const router = useRouter();
  const [report, setReport] = useState<JsonRecord | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadReport() {
      const { data, error } = await supabase
        .from("resume_analysis")
        .select("analysis")
        .eq("resume_id", reportId)
        .single();

      if (error) {
        console.error(error);
      } else if (isRecord(data.analysis)) {
        setReport(data.analysis);
      }

      setLoading(false);
    }

    void loadReport();
  }, [reportId]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 space-y-4">
        <div className="p-4 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 animate-pulse">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
        <p className="text-slate-600 dark:text-slate-400 font-medium text-sm">
          Loading report...
        </p>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center max-w-md mx-auto space-y-4">
        <div className="p-4 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-500">
          <FileSearch className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Report not found.</h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          Could not find analysis data for this report ID.
        </p>
      </div>
    );
  }

  // Safe extraction of metrics and array sections
  const resumeScoreValue = report.resumeScore ?? report.resume_score;
  const atsScoreValue = report.atsScore ?? report.ats_score;
  const resumeScore = typeof resumeScoreValue === "number" ? resumeScoreValue : null;
  const atsScore = typeof atsScoreValue === "number" ? atsScoreValue : null;

  const rawSkillsFound = report.skillsFound ?? report.skills_found ?? null;
  const skillsFound = Array.isArray(rawSkillsFound) ? rawSkillsFound : [];

  const rawMissingSkills = report.missingSkills ?? report.missing_skills ?? null;
  const missingSkills = Array.isArray(rawMissingSkills) ? rawMissingSkills : [];

  const rawSuggestions = report.suggestions ?? null;
  const suggestions = Array.isArray(rawSuggestions) ? rawSuggestions : [];

  const rawRoadmap = report.learningRoadmap ?? report.learning_roadmap ?? null;
  const learningRoadmap = Array.isArray(rawRoadmap) ? rawRoadmap : [];

  const rawQuestions = report.interviewQuestions ?? report.interview_questions ?? null;
  const interviewQuestions = Array.isArray(rawQuestions) ? rawQuestions : [];

  // Score badge metadata generator
  const getScoreBadge = (score: number | null) => {
    if (score === null) return null;
    if (score >= 80) {
      return {
        label: "Excellent",
        bg: "bg-emerald-50 dark:bg-emerald-950/50",
        text: "text-emerald-700 dark:text-emerald-400",
        border: "border-emerald-200 dark:border-emerald-800",
        bar: "bg-emerald-500",
      };
    }
    if (score >= 60) {
      return {
        label: "Good",
        bg: "bg-amber-50 dark:bg-amber-950/50",
        text: "text-amber-700 dark:text-amber-400",
        border: "border-amber-200 dark:border-amber-800",
        bar: "bg-amber-500",
      };
    }
    return {
      label: "Needs Work",
      bg: "bg-rose-50 dark:bg-rose-950/50",
      text: "text-rose-700 dark:text-rose-400",
      border: "border-rose-200 dark:border-rose-800",
      bar: "bg-rose-500",
    };
  };

  const resumeScoreBadge = typeof resumeScore === "number" ? getScoreBadge(resumeScore) : null;
  const atsScoreBadge = typeof atsScore === "number" ? getScoreBadge(atsScore) : null;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 text-slate-800 dark:text-slate-200">
      <button
        type="button"
        onClick={() => {
          if (window.history.length > 1) {
            router.back();
          } else {
            router.push("/dashboard");
          }
        }}
        className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back
      </button>

      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 font-semibold text-xs uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>AI Analysis Report</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Resume Analysis Dashboard
          </h1>
        </div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60 self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
          <span>Report Loaded</span>
        </div>
      </div>

      {/* 1 & 2. Resume Score & ATS Score */}
      {(typeof resumeScore === "number" || typeof atsScore === "number") && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Resume Score */}
          {typeof resumeScore === "number" && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">Resume Score</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Overall quality rating</p>
                  </div>
                </div>
                {resumeScoreBadge && (
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${resumeScoreBadge.bg} ${resumeScoreBadge.text} ${resumeScoreBadge.border}`}>
                    {resumeScoreBadge.label}
                  </span>
                )}
              </div>

              <div className="flex items-baseline space-x-2 my-4">
                <span className="text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                  {resumeScore}
                </span>
                <span className="text-lg font-medium text-slate-400 dark:text-slate-500">/ 100</span>
              </div>

              <div className="space-y-1.5">
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-700 ease-out rounded-full ${resumeScoreBadge?.bar || "bg-indigo-600"}`}
                    style={{ width: `${Math.min(100, Math.max(0, resumeScore))}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
                  <span>0</span>
                  <span>50</span>
                  <span>100</span>
                </div>
              </div>
            </div>
          )}

          {/* ATS Score */}
          {typeof atsScore === "number" && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
                    <Gauge className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">ATS Score</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">ATS system compatibility</p>
                  </div>
                </div>
                {atsScoreBadge && (
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${atsScoreBadge.bg} ${atsScoreBadge.text} ${atsScoreBadge.border}`}>
                    {atsScoreBadge.label}
                  </span>
                )}
              </div>

              <div className="flex items-baseline space-x-2 my-4">
                <span className="text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                  {atsScore}
                </span>
                <span className="text-lg font-medium text-slate-400 dark:text-slate-500">/ 100</span>
              </div>

              <div className="space-y-1.5">
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-700 ease-out rounded-full ${atsScoreBadge?.bar || "bg-purple-600"}`}
                    style={{ width: `${Math.min(100, Math.max(0, atsScore))}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
                  <span>0</span>
                  <span>50</span>
                  <span>100</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3 & 4. Skills Found & Missing Skills */}
      {(skillsFound.length > 0 || missingSkills.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Skills Found */}
          {skillsFound.length > 0 && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center space-x-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">Skills Found</h3>
                </div>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300">
                  {skillsFound.length} Detected
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {skillsFound.map((item, idx) => {
                  const { title, subtitle } = formatItem(item);
                  if (!title) return null;
                  return (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/50"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{title}</span>
                      {subtitle && <span className="opacity-75 font-normal text-[10px]">({subtitle})</span>}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {/* Missing Skills */}
          {missingSkills.length > 0 && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center space-x-2.5">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">Missing Skills</h3>
                </div>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300">
                  {missingSkills.length} Recommended
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {missingSkills.map((item, idx) => {
                  const { title, subtitle } = formatItem(item);
                  if (!title) return null;
                  return (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/50"
                    >
                      <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>{title}</span>
                      {subtitle && <span className="opacity-75 font-normal text-[10px]">({subtitle})</span>}
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 5. Suggestions */}
      {suggestions.length > 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
          <div className="flex items-center space-x-3 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Suggestions for Improvement</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Recommended changes to boost your resume ranking</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {suggestions.map((item, idx) => {
              const { title, subtitle } = formatItem(item);
              if (!title) return null;
              return (
                <div
                  key={idx}
                  className="flex items-start space-x-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/50 hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors"
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 text-white text-xs font-bold shrink-0 shadow-sm">
                    {idx + 1}
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-snug">
                      {title}
                    </h4>
                    {subtitle && (
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        {subtitle}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 6. Learning Roadmap */}
      {learningRoadmap.length > 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
          <div className="flex items-center space-x-3 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
              <Map className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Learning Roadmap</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Step-by-step career development path</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {learningRoadmap.map((item, idx) => {
              const { title, subtitle } = formatItem(item);
              if (!title) return null;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-slate-800/40 dark:to-blue-950/20 border border-slate-200/80 dark:border-slate-800 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300">
                        Step {idx + 1}
                      </span>
                      <BookOpen className="w-4 h-4 text-blue-500 opacity-60" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white pt-1 leading-snug">
                      {title}
                    </h4>
                    {subtitle && (
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        {subtitle}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 7. Interview Questions */}
      {interviewQuestions.length > 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
          <div className="flex items-center space-x-3 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Interview Questions</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Tailored practice questions based on your background</p>
            </div>
          </div>

          <div className="space-y-4">
            {interviewQuestions.map((item, idx) => {
              const { title, subtitle } = formatItem(item);
              if (!title) return null;
              return (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800 space-y-2 hover:border-emerald-200 dark:hover:border-emerald-800/60 transition-colors"
                >
                  <div className="flex items-start space-x-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold shrink-0 mt-0.5">
                      Q{idx + 1}
                    </span>
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-snug">
                      {title}
                    </h4>
                  </div>
                  {subtitle && (
                    <div className="ml-9 p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Answer / Guidance:</span>
                      {subtitle}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
