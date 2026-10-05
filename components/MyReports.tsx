"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { CheckCircle2, FileText, Search, Trash2, TriangleAlert } from "lucide-react";

export type Report = {
  id: string;
  file_name: string;
  uploaded_at: string;
  resume_analysis?: {
    analysis: {
      resumeScore: number;
      atsScore: number;
    };
  }[];
};

type MyReportsProps = {
  reports: Report[];
  onDeleteReport?: (id: string) => void;
};

export default function MyReports({ reports, onDeleteReport }: MyReportsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [reportToDelete, setReportToDelete] = useState<Report | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [deletedReportIds, setDeletedReportIds] = useState<Set<string>>(() => new Set());

  async function confirmDelete() {
    if (!reportToDelete) return;
    setIsDeleting(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    const targetId = reportToDelete.id;

    try {
      // 1. Attempt delete from 'reports' table in Supabase using its id
      const { error: reportsErr } = await supabase
        .from("reports")
        .delete()
        .eq("id", targetId);

      // 2. Also delete from 'resume_analysis' and 'resumes' tables if using that schema
      await supabase
        .from("resume_analysis")
        .delete()
        .eq("resume_id", targetId);

      const { error: resumesErr } = await supabase
        .from("resumes")
        .delete()
        .eq("id", targetId);

      if (reportsErr && resumesErr) {
        throw reportsErr || resumesErr;
      }

      // Hide the deleted report immediately while the parent refreshes its list.
      setDeletedReportIds((prev) => new Set(prev).add(targetId));
      if (onDeleteReport) {
        onDeleteReport(targetId);
      }

      setSuccessMessage(`Report "${reportToDelete.file_name}" deleted successfully.`);
      setReportToDelete(null);

      // Auto dismiss success message after 4 seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 4000);
    } catch (err: unknown) {
      console.error("Error deleting report:", err);
      setErrorMessage(
        err instanceof Error ? err.message : "Failed to delete report. Please try again."
      );
    } finally {
      setIsDeleting(false);
    }
  }

  const filteredReports = reports.filter(
    (report) =>
      !deletedReportIds.has(report.id) &&
      report.file_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="rounded-[16px] border border-[var(--app-border)] bg-[var(--app-surface)] p-5 shadow-[var(--app-shadow)]">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px] border border-blue-200 bg-blue-50 text-[#2563eb]">
            <FileText size={19} strokeWidth={2.2} />
          </div>
          <div className="min-w-0">
            <h1 className="font-['Plus_Jakarta_Sans',sans-serif] text-[22px] font-extrabold leading-tight text-[var(--app-text)]">My Reports</h1>
            <p className="mt-1 text-[13px] leading-5 text-[var(--app-text-muted)]">
              View all your previous resume analysis reports.
            </p>
          </div>
        </div>
      </div>

      {/* Success Notification */}
      {successMessage && (
        <div className="flex items-center justify-between rounded-[14px] border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800 shadow-[var(--app-shadow)]">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" strokeWidth={2.2} />
            <span>{successMessage}</span>
          </div>
          <button
            onClick={() => setSuccessMessage(null)}
            className="text-emerald-600 hover:text-emerald-800 font-bold ml-4"
          >
            &times;
          </button>
        </div>
      )}

      {/* Error Notification */}
      {errorMessage && (
        <div className="flex items-center justify-between rounded-[14px] border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800 shadow-[var(--app-shadow)]">
          <div className="flex items-center gap-2">
            <TriangleAlert className="h-5 w-5 shrink-0 text-rose-600" strokeWidth={2.2} />
            <span>{errorMessage}</span>
          </div>
          <button
            onClick={() => setErrorMessage(null)}
            className="text-rose-600 hover:text-rose-800 font-bold ml-4"
          >
            &times;
          </button>
        </div>
      )}

      {/* Search Bar */}
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--app-text-subtle)]" strokeWidth={2.2} />
        <input
          type="text"
          placeholder="Search reports..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-[14px] border border-[var(--app-border)] bg-[var(--app-surface)] px-11 py-3 text-sm font-semibold text-[var(--app-text)] shadow-[var(--app-shadow)] outline-none transition placeholder:text-[var(--app-text-subtle)] focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
        />
      </div>

      {/* Empty State */}
      {filteredReports.length === 0 ? (
        <div className="rounded-[16px] border border-dashed border-[var(--app-border)] bg-[var(--app-surface)] p-10 text-center shadow-[var(--app-shadow)]">
          <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-xl font-extrabold text-[var(--app-text)]">
            {searchTerm ? "No matching reports found" : "No reports found"}
          </h2>

          <p className="mt-2 text-[var(--app-text-muted)]">
            {searchTerm
              ? "Try searching with a different keyword."
              : "Upload your first resume to generate an AI report."}
          </p>
        </div>
      ) : (
        <div className="grid gap-3">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              className="rounded-[16px] border border-[var(--app-border)] bg-[var(--app-surface)] p-5 shadow-[var(--app-shadow)]"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:items-center lg:justify-between">
                <div className="min-w-0">
                  <h2 className="truncate font-['Plus_Jakarta_Sans',sans-serif] text-[16px] font-extrabold text-[var(--app-text)]">{report.file_name}</h2>

                  <p className="mt-1 text-sm text-[var(--app-text-muted)]">
                    Analyzed on{" "}
                    {new Date(report.uploaded_at).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:min-w-[260px]">
                  <ReportScore label="Resume Score" value={report.resume_analysis?.[0]?.analysis?.resumeScore ?? 0} tone="blue" />
                  <ReportScore label="ATS Score" value={report.resume_analysis?.[0]?.analysis?.atsScore ?? 0} tone="green" />
                </div>

                <div className="flex flex-col gap-2 sm:flex-row lg:shrink-0">
                  <Link
                    href={`/dashboard/reports/${report.id}`}
                    className="rounded-[11px] bg-blue-600 px-4 py-2.5 text-center text-sm font-bold text-white shadow-[0_2px_10px_rgba(37,99,235,0.22)] hover:bg-blue-700"
                  >
                    View Report
                  </Link>

                  <button
                    onClick={() => setReportToDelete(report)}
                    className="inline-flex items-center justify-center gap-2 rounded-[11px] border border-rose-200 bg-rose-50 px-4 py-2.5 text-sm font-bold text-rose-700 hover:bg-rose-100"
                  >
                    <Trash2 size={15} strokeWidth={2.2} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirmation Modal */}
      {reportToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md space-y-4 rounded-[18px] bg-[var(--app-surface)] p-6 shadow-xl">
            <div className="flex items-center space-x-3 text-rose-600">
              <Trash2 className="h-6 w-6 shrink-0" strokeWidth={2.2} />
              <h3 className="text-lg font-bold text-[var(--app-text)]">Delete Report</h3>
            </div>

            <p className="text-sm text-[var(--app-text-muted)]">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-[var(--app-text)]">
                &quot;{reportToDelete.file_name}&quot;
              </span>
              ? This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setReportToDelete(null)}
                disabled={isDeleting}
                className="rounded-[11px] border border-[var(--app-border)] px-4 py-2 text-sm font-bold text-[var(--app-text-muted)] hover:bg-[var(--app-surface-muted)] disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={isDeleting}
                className="flex items-center gap-2 rounded-[11px] bg-rose-600 px-4 py-2 text-sm font-bold text-white hover:bg-rose-700 disabled:opacity-50"
              >
                {isDeleting ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                    </svg>
                    <span>Deleting...</span>
                  </>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ReportScore({ label, value, tone }: { label: string; value: number; tone: "blue" | "green" }) {
  const color = tone === "blue" ? "text-blue-700" : "text-emerald-700";

  return (
    <div className="rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-muted)] px-3 py-3">
      <p className="text-[11px] font-bold uppercase text-[var(--app-text-subtle)]">{label}</p>
      <p className={`mt-1 font-['Plus_Jakarta_Sans',sans-serif] text-[22px] font-extrabold leading-none ${color}`}>
        {value}<span className="text-[11px] text-[var(--app-text-subtle)]">/100</span>
      </p>
    </div>
  );
}
