"use client"
import DashboardHome, { type ResumeAnalysis, type ResumeRecord } from "./DashboardHome";
import InterviewPreparation from "./InterviewPreparation";
import LearningRoadmap from "./LearningRoadmap";
import MyReports, { type Report } from "./MyReports";
import ProjectRecommendations from "./ProjectRecommendations";
import Settings from "./Settings";
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { getAuthenticatedRedirectPath, signOut } from '../lib/auth'
import { supabase } from '../lib/supabase'
import OverallPerformance from './OverallPerformance'
import RecentActivity from './RecentActivity'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

const MAX_RESUME_SIZE_BYTES = 5 * 1024 * 1024
const RESUME_BUCKET = 'resumes'
const AI_UNAVAILABLE_MESSAGE = 'AI service is temporarily unavailable. Please try again in a few minutes.'
const SUPPORTED_RESUME_EXTENSIONS = [
  'pdf',
  'doc',
  'docx',
  'txt',
  'jpg',
  'jpeg',
  'png',
]

const QUICK_ACTIONS = [
  { label: 'View Sample Report', href: '/sample-report', desc: 'See what your analysis will look like', accent: '#dbeafe', border: '#bfdbfe',
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M9.5 1.5H4A1.5 1.5 0 002.5 3v10A1.5 1.5 0 004 14.5h8a1.5 1.5 0 001.5-1.5V5.5L9.5 1.5z" stroke="#2563eb" strokeWidth="1.5" strokeLinejoin="round"/><path d="M9.5 1.5V5.5h4" stroke="#2563eb" strokeWidth="1.5" strokeLinejoin="round"/><path d="M5 8.5h6M5 11h4" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round"/></svg> },
  { label: 'Resume Tips', href: '/resume-tips', desc: 'Best practices for ATS-friendly resumes', accent: '#ede9fe', border: '#c4b5fd',
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="#7c3aed" strokeWidth="1.5"/><path d="M8 5v4M8 11v.5" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round"/></svg> },
]

function encodeStoragePath(path: string) {
  return path.split('/').map(encodeURIComponent).join('/')
}

function isSupportedResumeFile(file: File) {
  const extension = file.name.split('.').pop()?.toLowerCase() ?? ''
  return SUPPORTED_RESUME_EXTENSIONS.includes(extension)
}

function uploadResumeToStorage(
  file: File,
  storagePath: string,
  accessToken: string,
  onProgress: (progress: number) => void,
) {
  return new Promise<void>((resolve, reject) => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      reject(new Error('Missing Supabase environment variables.'))
      return
    }

    const xhr = new XMLHttpRequest()
    const objectUrl = `${supabaseUrl}/storage/v1/object/${RESUME_BUCKET}/${encodeStoragePath(storagePath)}`

    xhr.open('POST', objectUrl)
    xhr.setRequestHeader('Authorization', `Bearer ${accessToken}`)
    xhr.setRequestHeader('apikey', supabaseAnonKey)
    const contentType = file.type || 'application/octet-stream'
    xhr.setRequestHeader('Content-Type', contentType)
    xhr.setRequestHeader('Cache-Control', '3600')
    xhr.setRequestHeader('x-upsert', 'false')

    xhr.upload.onprogress = event => {
      if (event.lengthComputable) {
        onProgress(Math.round((event.loaded / event.total) * 100))
      }
    }

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve()
        return
      }

      reject(new Error(xhr.responseText || `Resume upload failed with status ${xhr.status}.`))
    }

    xhr.onerror = () => reject(new Error('Resume upload failed.'))
    xhr.send(file)
  })
}

export default function Dashboard() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [activeNav, setActiveNav] = useState('Dashboard')
  const [resume, setResume] = useState<ResumeRecord | null>(null)
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const [isUploading, setIsUploading] = useState(false)
  const [isAnalysisLoading, setIsAnalysisLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadMessage, setUploadMessage] = useState('')
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [reports, setReports] = useState<Report[]>([]);
  const [isDragging, setIsDragging] = useState(false)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [careerGoal, setCareerGoal] = useState<string>('')

  useEffect(() => {
    let isMounted = true

    async function checkAuth() {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser()

      if (!isMounted) {
        return
      }

      if (error || !user) {
        router.replace('/login')
        return
      }

      const redirectPath = await getAuthenticatedRedirectPath(user)

      if (!isMounted) {
        return
      }

      if (redirectPath === '/onboarding') {
        router.replace('/onboarding')
        return
      }

      setIsCheckingAuth(false)
      void loadLatestResume()
      void loadReports()
    }

    void checkAuth()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) {
        router.replace('/login')
        return
      }

      void getAuthenticatedRedirectPath(session.user)
        .then(redirectPath => {
          if (!isMounted) {
            return
          }

          if (redirectPath === '/onboarding') {
            router.replace('/onboarding')
            return
          }

          setIsCheckingAuth(false)
        })
        .catch(error => {
          console.error('Unable to check onboarding status:', error)
          if (isMounted) {
            setIsCheckingAuth(false)
          }
        })
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [router])

  async function loadLatestResume() {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return
    }

    const { data, error } = await supabase
      .from('resumes')
      .select('id, user_id, file_name, storage_path, uploaded_at')
      .eq('user_id', user.id)
      .order('uploaded_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (error) {
      console.error('Unable to load resume:', error)
      return
    }

    setResume(data)
  }

  async function handleLogout() {
    if (isLoggingOut) {
      return
    }

    setIsLoggingOut(true)

    try {
      await signOut()
      router.replace('/login')
    } catch (error) {
      console.error('Unable to sign out:', error)
      alert('We could not sign you out right now. Please try again.')
    } finally {
      setIsLoggingOut(false)
    }
  }

  function handleUploadClick() {
    if (!careerGoal) {
      toast.error('Please enter your career goal before uploading your resume.')
      return
    }
    if (!isUploading) {
      fileInputRef.current?.click()
    }
  }

  async function loadReports() {
    const { data, error } = await supabase
      .from("resumes")
      .select(`
        id,
        file_name,
        uploaded_at,
        resume_analysis (
          analysis
        )
      `)
      .order("uploaded_at", { ascending: false });
  
    if (error) {
      console.error("Error loading reports:", error);
      return;
    }
  
    console.log(JSON.stringify(data, null, 2));
    setReports(data ?? []);
  }
     
  async function handleResumeSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    e.target.value = ''

    if (!file) {
      return
    }

    if (!careerGoal) {
      toast.error('Please enter your career goal before uploading your resume.')
      return
    }

    if (!isSupportedResumeFile(file)) {
      toast.error(
        'Please upload a supported resume file: PDF, DOCX, TXT, JPG/JPEG, or PNG.'
      )
      return
    }

    if (file.size > MAX_RESUME_SIZE_BYTES) {
      toast.error('PDF must be under 5 MB.')
      return
    }

    setAnalysis(null)
    setIsUploading(true)
    setIsAnalysisLoading(true)
    setUploadProgress(0)
    setUploadMessage('')

    try {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession()

      if (sessionError) {
        throw sessionError
      }

      const user = session?.user

      if (!session || !user) {
        router.replace('/')
        return
      }

      const storageFileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '-')}`
      const storagePath = `${user.id}/${storageFileName}`

      await uploadResumeToStorage(file, storagePath, session.access_token, setUploadProgress)

      const formData = new FormData()
      formData.append('resume', file)
      formData.append('careerGoal', careerGoal)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      type UploadAnalysis = {
        success?: boolean;
        analysis?: ResumeAnalysis;
      };

      type UploadResponse = {
        success?: boolean;
        analysis?: UploadAnalysis;
        error?: string;
        message?: string;
      };

      let result: UploadResponse | null = null
      try {
        result = (await response.json()) as UploadResponse
      } catch {
        const fallbackText = await response.text()
        throw new Error(
          fallbackText || `Upload failed with status ${response.status}`
        )
      }

      if (!response.ok) {
        throw new Error(
          result?.error || result?.message || `Upload failed with status ${response.status}`
        )
      }

      console.log(result)

      const { data: resumeData, error: insertError } = await supabase
        .from('resumes')
        .insert({
          user_id: user.id,
          file_name: file.name,
          storage_path: storagePath,
        })
        .select()
        .single()

      if (insertError) {
        throw insertError
      }

      console.log('Inserted Resume:', resumeData)

      if (result.success && result.analysis?.success && result.analysis?.analysis) {
        setAnalysis(result.analysis.analysis)
        setIsAnalysisLoading(false)

        const { error: analysisError } = await supabase
          .from('resume_analysis')
          .insert({
            resume_id: resumeData.id,
            analysis: result.analysis.analysis,
          })

        if (analysisError) {
          throw analysisError
        }

        console.log('Analysis saved successfully.')
      } else {
        setAnalysis(null)
        setIsAnalysisLoading(false)
        const errorMessage =
          typeof result?.error === 'string' && result.error
            ? result.error
            : AI_UNAVAILABLE_MESSAGE

        setUploadMessage(errorMessage)
        setUploadProgress(100)
        await loadLatestResume()
        router.refresh()
        return
      }

      await loadLatestResume()
      router.refresh()
      setUploadMessage('Upload complete')
      setUploadProgress(100)
      toast.success('Resume uploaded successfully!')
    } catch (error) {
      console.error('Unable to upload resume:', error)
      const errorMessage = error instanceof Error && error.message
        ? error.message
        : 'We could not upload your resume. Please try again.'

      setUploadMessage(errorMessage)
      if (errorMessage.includes("scanned document")) {
        toast.error(errorMessage)
      } else {
        toast.error('Upload failed. Please try again.')
      }
    } finally {
      setIsUploading(false)
    }
  }

  if (isCheckingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--app-bg)]">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
          <p className="mt-3 text-sm font-semibold text-[var(--app-text-muted)]">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full overflow-x-clip bg-[var(--app-bg)] font-['Inter',system-ui,sans-serif]">

      {/* ── SIDEBAR ── */}
      <Sidebar
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        handleLogout={handleLogout}
        isLoggingOut={isLoggingOut}
        isMobileOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />

      {/* ── MAIN AREA ── */}
      <div className="flex min-h-screen min-w-0 flex-col lg:pl-[236px]">
        {/* ── TOP NAV ── */}
        <Topbar onMenuClick={() => setIsMobileSidebarOpen(true)} />

        {/* ── CONTENT + RIGHT SIDEBAR ── */}
        <div className="flex w-full min-w-0 flex-1 flex-col gap-5 px-4 py-5 sm:px-6 lg:px-8 xl:flex-row xl:items-start">

          {/* ── MAIN CONTENT ── */}
          <main
           className="min-w-0 w-full flex-1 overflow-x-hidden"
            onDragOver={(e) => {
            e.preventDefault()
            setIsDragging(true)
           }}
           onDragLeave={() => setIsDragging(false)}
           onDrop={(e) => {
            e.preventDefault()
             setIsDragging(false)
              const file = e.dataTransfer.files?.[0]

              if (!file) {
                return
              }

              if (!isSupportedResumeFile(file)) {
                toast.error(
                  'Please upload a supported resume file: PDF, DOCX, TXT, JPG/JPEG, or PNG.'
                )
                return
              }

              handleResumeSelected({
                target: {
                  files: e.dataTransfer.files,
                  value: '',
                },
              } as React.ChangeEvent<HTMLInputElement>)
             }}
            >
            {isDragging ? (
              <div
                style={{
                  position: "fixed",
                  inset: 0,
                  zIndex: 9999,
                  background: "rgba(37, 99, 235, 0.35)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    background: "#ffffff",
                    border: "2px dashed #2563eb",
                    borderRadius: 12,
                    padding: "32px 40px",
                    color: "#1d4ed8",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: 18,
                    fontWeight: 800,
                  }}
                >
                  📄 Drop your resume here
                </div>
              </div>
            ) : null}
            {isUploading ? (
              <div
                style={{
                  position: "fixed",
                  inset: 0,
                  zIndex: 10000,
                  background: "rgba(0,0,0,0.35)",
                  backdropFilter: "blur(4px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    width: "min(360px, calc(100vw - 40px))",
                    borderRadius: 18,
                    background: "#ffffff",
                    boxShadow: "0 24px 60px rgba(15, 23, 42, 0.22)",
                    padding: "34px 32px",
                    textAlign: "center",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}
                >
                  <svg
                    width="44"
                    height="44"
                    viewBox="0 0 44 44"
                    fill="none"
                    style={{ marginBottom: 18 }}
                  >
                    <circle
                      cx="22"
                      cy="22"
                      r="18"
                      stroke="#dbeafe"
                      strokeWidth="5"
                    />
                    <path
                      d="M40 22a18 18 0 0 1-18 18"
                      stroke="#2563eb"
                      strokeWidth="5"
                      strokeLinecap="round"
                    >
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 22 22"
                        to="360 22 22"
                        dur="0.9s"
                        repeatCount="indefinite"
                      />
                    </path>
                  </svg>
                  <div
                    style={{
                      color: "#0f172a",
                      fontSize: 20,
                      fontWeight: 800,
                      marginBottom: 10,
                    }}
                  >
                    Uploading Resume...
                  </div>
                  <div
                    style={{
                      color: "#2563eb",
                      fontSize: 15,
                      fontWeight: 700,
                    }}
                  >
                    {uploadProgress}%
                  </div>
                </div>
              </div>
            ) : null}
            {activeNav === "Dashboard" ? (
              <DashboardHome
                analysis={analysis}
                resume={resume}
                fileInputRef={fileInputRef}
                uploadResume={handleUploadClick}
                handleResumeSelected={handleResumeSelected}
                uploadMessage={uploadMessage}
                uploadProgress={uploadProgress}
                isUploading={isUploading}
                isAnalysisLoading={isAnalysisLoading}
                careerGoal={careerGoal}
                setCareerGoal={setCareerGoal}
              />
            ) : activeNav === "My Reports" ? (
              <MyReports
                reports={reports}
                onDeleteReport={(deletedId) => {
                  setReports((prev) => prev.filter((r) => r.id !== deletedId));
                }}
              />
            ) : activeNav === "Learning Roadmap" ? (
              <LearningRoadmap />
            ) : activeNav === "Project Recommendations" ? (
              <ProjectRecommendations />
            ) : activeNav === "Interview Preparation" ? (
              <InterviewPreparation />
            ) : activeNav === "Settings" ? (
              <Settings />
            ) : null}
          </main>

          {/* ── RIGHT SIDEBAR ── */}
          <aside className="w-full min-w-0 rounded-[16px] border border-[var(--app-border)] bg-[var(--app-surface)] p-4 shadow-[var(--app-shadow)] xl:sticky xl:top-[80px] xl:w-[280px] xl:flex-shrink-0 xl:p-5">
            {/* Quick Actions */}
            <div style={{ marginBottom: 28 }}>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 800, color: 'var(--app-text)', letterSpacing: '-0.1px', margin: '0 0 14px' }}>Quick Actions</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {QUICK_ACTIONS.map(action => (
                  <button key={action.label} onClick={() => router.push(action.href)} style={{
                    display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 11,
                    border: '1px solid var(--app-border)', background: 'var(--app-surface)', cursor: 'pointer', textAlign: 'left',
                    transition: 'all 0.14s', width: '100%',
                  }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.borderColor = action.border; el.style.background = action.accent }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.borderColor = 'var(--app-border)'; el.style.background = 'var(--app-surface)' }}>
                    <div style={{ width: 34, height: 34, borderRadius: 9, flexShrink: 0, background: action.accent, border: `1px solid ${action.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {action.icon}
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--app-text)', marginBottom: 2 }}>{action.label}</div>
                      <div style={{ fontSize: 11.5, color: 'var(--app-text-subtle)', lineHeight: 1.4 }}>{action.desc}</div>
                    </div>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginLeft: 'auto', flexShrink: 0, color: '#cbd5e1' }}>
                      <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <RecentActivity />
              <OverallPerformance analysis={analysis} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
