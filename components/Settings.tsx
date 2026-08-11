"use client"

import { useEffect, useState } from "react"
import type { User } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase"

type ThemePreference = "Light" | "Dark" | "System"
type Profile = {
  avatarUrl: string | null
  fullName: string
  email: string
}

const themeOptions: ThemePreference[] = ["Light", "Dark", "System"]
const themeStorageKey = "resumexpert-theme"

function metadataString(user: User, key: string) {
  const value = user.user_metadata[key]
  return typeof value === "string" && value.trim() ? value : null
}

function profileFromUser(user: User): Profile {
  const fullName = metadataString(user, "full_name") ?? metadataString(user, "name") ?? "ResumeXpert member"

  return {
    avatarUrl: metadataString(user, "avatar_url"),
    fullName,
    email: user.email ?? "No email available",
  }
}

function getInitials(name: string, email: string) {
  const source = name !== "ResumeXpert member" ? name : email
  const initials = source
    .split(/[\s@.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase())
    .join("")

  return initials || "RX"
}

function applyTheme(theme: ThemePreference) {
  const root = document.documentElement
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
  const resolvedTheme = theme === "System" ? (systemPrefersDark ? "dark" : "light") : theme.toLowerCase()

  root.classList.toggle("dark", resolvedTheme === "dark")
  root.dataset.theme = resolvedTheme
  localStorage.setItem(themeStorageKey, theme)
}

export default function Settings() {
  const [theme, setTheme] = useState<ThemePreference>(() => {
    if (typeof window === "undefined") return "System"

    const savedTheme = localStorage.getItem(themeStorageKey)
    return savedTheme === "Light" || savedTheme === "Dark" || savedTheme === "System" ? savedTheme : "System"
  })
  const [profile, setProfile] = useState<Profile | null>(null)
  const [profileLoading, setProfileLoading] = useState(true)
  const [profileError, setProfileError] = useState<string | null>(null)

  useEffect(() => {
    applyTheme(theme)

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleSystemThemeChange = () => {
      const currentTheme = localStorage.getItem(themeStorageKey)
      if (currentTheme === "System") {
        applyTheme("System")
      }
    }

    mediaQuery.addEventListener("change", handleSystemThemeChange)
    return () => mediaQuery.removeEventListener("change", handleSystemThemeChange)
  }, [theme])

  useEffect(() => {
    let cancelled = false

    async function fetchProfile() {
      setProfileLoading(true)
      setProfileError(null)

      const { data, error } = await supabase.auth.getUser()

      if (cancelled) return

      if (error) {
        setProfile(null)
        setProfileError(error.message)
        setProfileLoading(false)
        return
      }

      if (!data.user) {
        setProfile(null)
        setProfileError("No active session found. Please sign in again.")
        setProfileLoading(false)
        return
      }

      setProfile(profileFromUser(data.user))
      setProfileLoading(false)
    }

    fetchProfile()

    return () => {
      cancelled = true
    }
  }, [])

  function handleThemeChange(option: ThemePreference) {
    setTheme(option)
    applyTheme(option)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-['Plus_Jakarta_Sans',sans-serif] text-[26px] font-extrabold tracking-[-0.5px] text-slate-900 dark:text-white">Settings</h1>
        <p className="mt-2 text-[14.5px] leading-7 text-slate-500 dark:text-slate-400">Manage your account and personalize your ResumeXpert experience.</p>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_4px_rgba(15,23,42,0.04)] sm:p-6 dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-5"><h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-lg font-bold text-slate-900 dark:text-white">Profile</h2><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Your personal details from your signed-in Google account.</p></div>
        {profileLoading ? (
          <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center dark:border-slate-700 dark:bg-slate-800/50">
            <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Loading your profile...</p>
          </div>
        ) : profileError ? (
          <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-4 dark:border-rose-900/60 dark:bg-rose-950/30">
            <p className="text-sm font-bold text-rose-700 dark:text-rose-300">Could not load profile</p>
            <p className="mt-1 text-sm text-rose-600 dark:text-rose-300/80">{profileError}</p>
          </div>
        ) : profile ? (
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
            <div className="flex items-center gap-4 lg:w-56 lg:flex-col lg:items-start">
              {profile.avatarUrl ? (
                <div className="h-20 w-20 shrink-0 rounded-2xl bg-cover bg-center shadow-[0_4px_14px_rgba(37,99,235,0.18)]" style={{ backgroundImage: `url(${profile.avatarUrl})` }} aria-label={`${profile.fullName} profile picture`} role="img" />
              ) : (
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-2xl font-extrabold text-white shadow-[0_4px_14px_rgba(37,99,235,0.25)]">{getInitials(profile.fullName, profile.email)}</div>
              )}
              <div><p className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-slate-900 dark:text-white">{profile.fullName}</p><p className="mt-1 text-xs font-semibold text-blue-600 dark:text-blue-400">ResumeXpert member</p></div>
            </div>
            <div className="grid flex-1 gap-4 sm:grid-cols-2">
              <ProfileField label="Full Name" value={profile.fullName} />
              <ProfileField label="Email" value={profile.email} />
            </div>
          </div>
        ) : null}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_4px_rgba(15,23,42,0.04)] sm:p-6 dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-5"><h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-lg font-bold text-slate-900 dark:text-white">Appearance</h2><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Choose how ResumeXpert looks for you.</p></div>
        <div className="grid gap-3 sm:grid-cols-3">
          {themeOptions.map(option => (
            <button key={option} onClick={() => handleThemeChange(option)} className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition ${theme === option ? "border-blue-300 bg-blue-50 text-blue-700 shadow-[0_0_0_2px_rgba(147,197,253,0.25)] dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-300" : "border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-blue-800 dark:hover:bg-slate-800"}`}>
              <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${theme === option ? "bg-white text-blue-600 dark:bg-slate-900 dark:text-blue-300" : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"}`}>{option === "Light" ? <SunIcon /> : option === "Dark" ? <MoonIcon /> : <SystemIcon />}</span>
              <span className="text-sm font-bold">{option}</span>{theme === option && <span className="ml-auto h-2 w-2 rounded-full bg-blue-600" />}
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}

function ProfileField({ label, value }: { label: string; value: string }) {
  return <div><p className="mb-2 text-xs font-bold uppercase tracking-[0.06em] text-slate-400 dark:text-slate-500">{label}</p><div className="rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">{value}</div></div>
}

function SunIcon() { return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.4" /><path d="M8 1.5v1.3M8 13.2v1.3M1.5 8h1.3M13.2 8h1.3M3.4 3.4l.9.9M11.7 11.7l.9.9M12.6 3.4l-.9.9M4.3 11.7l-.9.9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg> }
function MoonIcon() { return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M13.2 10.4A5.7 5.7 0 015.6 2.8 5.8 5.8 0 1013.2 10.4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg> }
function SystemIcon() { return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><rect x="2" y="2.5" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.4" /><path d="M5.5 13.5h5M8 10.5v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg> }
