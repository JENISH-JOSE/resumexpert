"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../lib/supabase'
import BrandLogo from './BrandLogo'
import { ensurePublicUser } from '../lib/auth'

type ExperienceLevel = 'student' | 'fresher' | 'professional' | ''
type SelectedExperienceLevel = Exclude<ExperienceLevel, ''>

export default function OnboardingPage() {
  const router = useRouter()
  const [experience, setExperience] = useState<ExperienceLevel>('')
  const [isCheckingAccess, setIsCheckingAccess] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const isValid = experience !== ''
  const canSubmit = isValid && !isLoading

  useEffect(() => {
    let isMounted = true

    async function checkOnboardingAccess() {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser()

        if (!isMounted) {
          return
        }

        if (error || !user) {
          router.replace('/')
          return
        }

        const publicUser = await ensurePublicUser(user)

        if (!isMounted) {
          return
        }

        if (publicUser.onboarding_completed) {
          router.replace('/dashboard')
          return
        }

        setIsCheckingAccess(false)
      } catch (error) {
        console.error('Unable to check onboarding status:', error)
        if (isMounted) {
          setIsCheckingAccess(false)
        }
      }
    }

    void checkOnboardingAccess()

    return () => {
      isMounted = false
    }
  }, [router])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSubmit) return

    setIsLoading(true)

    try {
      const selectedExperience = experience as SelectedExperienceLevel
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()

      if (userError) {
        throw userError
      }

      if (!user) {
        router.replace('/')
        return
      }

      const publicUser = await ensurePublicUser(user)

      if (publicUser.onboarding_completed) {
        router.replace('/dashboard')
        return
      }

      const onboardingPayload = {
        user_id: user.id,
        experience_level: selectedExperience,
      }

      console.log('Saving onboarding for user:', user.id, onboardingPayload)

      const { error: upsertError } = await supabase
        .from('onboarding')
        .upsert(
          onboardingPayload,
          { onConflict: 'user_id' },
        )

      if (upsertError) {
        console.error('Supabase onboarding upsert error:', upsertError)
        throw upsertError
      }

      const { error: profileUpdateError } = await supabase
  .from('users')
  .update({
    experience_level: experience,
    onboarding_completed: true,
  })
  .eq('id', user.id)

      if (profileUpdateError) {
        console.error('Supabase users onboarding completion update error:', profileUpdateError)
        throw profileUpdateError
      }

      router.replace('/dashboard')
    } catch (error) {
      console.error('Unable to save onboarding:', error)
      alert('We could not save your onboarding details. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isCheckingAccess) {
    return null
  }

  return (
    <div className="min-h-screen overflow-x-hidden" style={{
      minHeight: '100vh', display: 'flex',
      fontFamily: "'Inter', system-ui, sans-serif",
      overflowX: 'hidden',
    }}>
      {/* Left panel */}
      <LeftPanel />

      {/* Right panel */}
      <div className="onboarding-content" style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '48px 40px',
        background: '#fff',
        overflowY: 'auto',
        overflowX: 'hidden',
        minHeight: '100vh',
      }}>
        <div className="onboarding-form-wrap" style={{ width: '100%', maxWidth: 440 }}>
          {/* Logo */}
          <div className="onboarding-logo-wrap" style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 44 }}>
            <BrandLogo className="onboarding-logo" size={40} theme="light" />
          </div>

          {/* Heading */}
          <div className="onboarding-heading" style={{ marginBottom: 40 }}>
            <h1 className="onboarding-title" style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 30, fontWeight: 800, color: '#0f172a',
              letterSpacing: '-0.7px', margin: '0 0 12px', lineHeight: 1.15,
            }}>
              Let&apos;s Get Started
            </h1>
            <p className="onboarding-description" style={{ fontSize: 15, color: '#64748b', margin: 0, lineHeight: 1.65 }}>
              Choose your experience level to personalize your ResumeXpert experience.
            </p>
          </div>

          {/* Form */}
          <form className="onboarding-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {/* Experience Level options */}
            {[
              {
                key: 'student' as ExperienceLevel,
                label: 'Student',
                desc: 'Currently enrolled in a degree program',
                icon: (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 2L2 7l8 4 8-4-8-4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
                    <path d="M5.5 9.5v5.5c0 1.5 2 3 4.5 3s4.5-1.5 4.5-3V9.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                    <path d="M17.5 7v4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                  </svg>
                ),
              },
              {
                key: 'fresher' as ExperienceLevel,
                label: 'Fresher',
                desc: 'Less than 1 year of professional experience',
                icon: (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 2v4M10 14v4M2 10h4M14 10h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                    <circle cx="10" cy="10" r="3.5" stroke="currentColor" strokeWidth="1.6"/>
                  </svg>
                ),
              },
              {
                key: 'professional' as ExperienceLevel,
                label: 'Working Professional',
                desc: '1+ years of industry experience',
                icon: (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect x="2.5" y="7" width="15" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.6"/>
                    <path d="M7 7V6a3 3 0 016 0v1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                    <path d="M2.5 11.5h15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                    <circle cx="10" cy="11.5" r="1.8" fill="currentColor"/>
                  </svg>
                ),
              },
            ].map(opt => {
              const active = experience === opt.key
              return (
                <button
                  className="onboarding-option"
                  key={opt.key}
                  type="button"
                  onClick={() => setExperience(opt.key)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 16,
                    padding: '16px 18px', borderRadius: 12,
                    border: `1.5px solid ${active ? '#2563eb' : '#e2e8f0'}`,
                    background: active ? '#f0f7ff' : '#fff',
                    cursor: 'pointer', textAlign: 'left',
                    transition: 'all 0.15s',
                    boxShadow: active ? '0 0 0 3px rgba(37,99,235,0.1)' : 'none',
                    width: '100%',
                  }}
                  onMouseEnter={e => {
                    if (!active) {
                      const el = e.currentTarget as HTMLButtonElement
                      el.style.borderColor = '#bfdbfe'
                      el.style.background = '#f8fbff'
                    }
                  }}
                  onMouseLeave={e => {
                    if (!active) {
                      const el = e.currentTarget as HTMLButtonElement
                      el.style.borderColor = '#e2e8f0'
                      el.style.background = '#fff'
                    }
                  }}
                >
                  <div className="onboarding-option-icon" style={{
                    width: 44, height: 44, borderRadius: 11, flexShrink: 0,
                    background: active ? 'rgba(37,99,235,0.1)' : '#f1f5f9',
                    border: `1px solid ${active ? '#bfdbfe' : '#e2e8f0'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: active ? '#2563eb' : '#64748b',
                    transition: 'all 0.15s',
                  }}>
                    {opt.icon}
                  </div>

                  <div className="onboarding-option-copy" style={{ flex: 1, minWidth: 0 }}>
                    <div className="onboarding-option-label" style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: 15, fontWeight: 700,
                      color: active ? '#1d4ed8' : '#0f172a',
                      marginBottom: 3,
                      transition: 'color 0.15s',
                    }}>{opt.label}</div>
                    <div className="onboarding-option-description" style={{
                      fontSize: 13,
                      color: active ? '#3b82f6' : '#94a3b8',
                      transition: 'color 0.15s',
                    }}>{opt.desc}</div>
                  </div>

                  {/* Radio indicator */}
                  <div className="onboarding-option-radio" style={{
                    width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                    border: `2px solid ${active ? '#2563eb' : '#cbd5e1'}`,
                    background: active ? '#2563eb' : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.15s',
                  }}>
                    {active && (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5l2.5 2.5 4-4" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                </button>
              )
            })}

            {/* Continue button */}
            <button
              type="submit"
              disabled={!canSubmit}
              style={{
                marginTop: 12,
                padding: '14px 24px', borderRadius: 12, border: 'none',
                background: isValid
                  ? 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)'
                  : '#e2e8f0',
                color: isValid ? '#fff' : '#94a3b8',
                fontSize: 15, fontWeight: 700,
                cursor: isLoading ? 'wait' : isValid ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s',
                boxShadow: isValid ? '0 4px 16px rgba(37,99,235,0.28)' : 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                width: '100%',
              }}
              onMouseEnter={e => {
                if (canSubmit) {
                  const el = e.currentTarget as HTMLButtonElement
                  el.style.transform = 'translateY(-1px)'
                  el.style.boxShadow = '0 8px 24px rgba(37,99,235,0.38)'
                }
              }}
              onMouseLeave={e => {
                if (canSubmit) {
                  const el = e.currentTarget as HTMLButtonElement
                  el.style.transform = 'translateY(0)'
                  el.style.boxShadow = '0 4px 16px rgba(37,99,235,0.28)'
                }
              }}
            >
              {isLoading ? 'Saving...' : 'Continue'}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </form>

          {/* Legal */}
          <p style={{ fontSize: 12, color: '#94a3b8', textAlign: 'center', marginTop: 24, lineHeight: 1.6 }}>
            By continuing, you agree to our{' '}
            <a href="#" style={{ color: '#475569', textDecoration: 'underline', textDecorationColor: '#cbd5e1' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#2563eb' }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#475569' }}>
              Privacy Policy
            </a>{' '}and{' '}
            <a href="#" style={{ color: '#475569', textDecoration: 'underline', textDecorationColor: '#cbd5e1' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#2563eb' }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#475569' }}>
              Terms of Service
            </a>.
          </p>
        </div>
      </div>

      <style>{`
        .onboarding-content { box-sizing: border-box; }
        .onboarding-form-wrap { box-sizing: border-box; }
        .onboarding-logo { display: inline-flex; }

         @media (max-width: 768px) {
           .onboarding-left {
             display: none !important;
           }
         
           .onboarding-content {
             padding: 24px 16px !important;
             box-sizing: border-box !important;
             overflow-x: hidden !important;
             overflow-y: auto !important;
             min-height: 100vh !important;
             justify-content: flex-start !important;
           }
         
           .onboarding-form-wrap {
             box-sizing: border-box !important;
             width: 100% !important;
             max-width: 100% !important;
           }
         
           .onboarding-logo-wrap {
             margin-bottom: 24px !important;
           }
         
           .onboarding-logo {
             transform: scale(0.8);
             transform-origin: left center;
           }
         
           .onboarding-heading {
             margin-bottom: 24px !important;
           }
         
           .onboarding-title {
             font-size: 24px !important;
             line-height: 1.15 !important;
             letter-spacing: -0.5px !important;
           }
         
           .onboarding-description {
             font-size: 14px !important;
             line-height: 1.55 !important;
           }
         
           .onboarding-form {
             width: 100% !important;
             gap: 10px !important;
           }
         
           .onboarding-option {
             box-sizing: border-box !important;
             gap: 12px !important;
             padding: 14px 13px !important;
             border-radius: 12px !important;
           }
         
           .onboarding-option-icon {
             width: 38px !important;
             height: 38px !important;
             border-radius: 10px !important;
           }
         
           .onboarding-option-icon svg {
             width: 18px !important;
             height: 18px !important;
           }
         
           .onboarding-option-copy {
             min-width: 0 !important;
             flex: 1 !important;
           }
         
           .onboarding-option-label {
             font-size: 14px !important;
             line-height: 1.2 !important;
           }
         
           .onboarding-option-description {
             font-size: 12px !important;
             line-height: 1.4 !important;
           }
         
           .onboarding-option-radio {
             width: 20px !important;
             height: 20px !important;
           }
         
           .onboarding-form button[type="submit"] {
             min-height: 44px !important;
             margin-top: 10px !important;
             padding: 13px 20px !important;
             font-size: 14px !important;
           }
         }
      `}</style>
    </div>
  )
}

function LeftPanel() {
  return (
    <div
      className="onboarding-left"
      style={{
        width: '48%',
        minHeight: '100vh',
        background: 'linear-gradient(160deg, #0f172a 0%, #1e3a8a 55%, #1d4ed8 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 56px',
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: -100, right: -100, width: 400, height: 400,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: -80, left: -60, width: 300, height: 300,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(37,99,235,0.2) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', width: '100%', maxWidth: 420 }}>
        <IllustrationScene />

        <div style={{ textAlign: 'center', marginTop: 44 }}>
          <h2 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 26, fontWeight: 800, color: '#fff',
            letterSpacing: '-0.5px', margin: '0 0 14px', lineHeight: 1.2,
          }}>
            Your AI career analyst,<br />ready in seconds.
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, margin: '0 0 36px' }}>
            Upload your resume and get a detailed skill gap report, learning roadmap, and personalized project recommendations — all in one place.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              'AI Skill Gap Detection',
              'Personalized Learning Roadmap',
              'Project Recommendations',
            ].map(label => (
              <div key={label} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '12px 16px', borderRadius: 12,
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.12)',
                backdropFilter: 'blur(8px)',
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 8,
                  background: 'rgba(37,99,235,0.4)',
                  border: '1px solid rgba(96,165,250,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M2 12l3.5-3.5 2.5 2.5 5-7" stroke="#60a5fa" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function IllustrationScene() {
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <svg viewBox="0 0 420 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', display: 'block' }}>
        <rect x="30" y="20" width="200" height="260" rx="14" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
        <rect x="50" y="44" width="60" height="60" rx="10" fill="rgba(37,99,235,0.35)" stroke="rgba(96,165,250,0.4)" strokeWidth="1"/>
        <circle cx="80" cy="66" r="14" fill="rgba(147,197,253,0.5)"/>
        <path d="M60 100c0-8 9-14 20-14s20 6 20 14" fill="rgba(147,197,253,0.3)"/>
        <rect x="124" y="52" width="88" height="9" rx="4" fill="rgba(255,255,255,0.5)"/>
        <rect x="124" y="68" width="60" height="7" rx="3" fill="rgba(255,255,255,0.25)"/>
        <rect x="124" y="82" width="72" height="6" rx="3" fill="rgba(255,255,255,0.15)"/>
        <line x1="50" y1="118" x2="210" y2="118" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
        {[130, 142, 154, 168, 180, 192, 206, 218, 230].map((y, i) => (
          <rect key={y} x="50" y={y} width={[140, 100, 120, 140, 90, 110, 130, 80, 115][i]} height="6" rx="3" fill="rgba(255,255,255,0.12)"/>
        ))}
        {[
          { x: 50, label: 'React', color: 'rgba(96,165,250,0.3)' },
          { x: 94, label: 'Node.js', color: 'rgba(74,222,128,0.25)' },
          { x: 148, label: 'SQL', color: 'rgba(251,191,36,0.25)' },
        ].map(b => (
          <g key={b.label}>
            <rect x={b.x} y="245" width={b.label.length * 8 + 16} height="20" rx="6" fill={b.color} stroke="rgba(255,255,255,0.2)" strokeWidth="0.8"/>
            <text x={b.x + (b.label.length * 8 + 16) / 2} y="259" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="9" fontWeight="600" fontFamily="Inter, sans-serif">{b.label}</text>
          </g>
        ))}
        <rect x="246" y="14" width="160" height="175" rx="14" fill="rgba(15,23,42,0.7)" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
        <rect x="246" y="14" width="160" height="36" rx="14" fill="rgba(37,99,235,0.5)"/>
        <rect x="246" y="36" width="160" height="14" rx="0" fill="rgba(37,99,235,0.5)"/>
        <text x="326" y="37" textAnchor="middle" fill="rgba(255,255,255,0.9)" fontSize="10" fontWeight="700" fontFamily="Inter, sans-serif">AI Analysis</text>
        <circle cx="293" cy="87" r="28" stroke="rgba(255,255,255,0.08)" strokeWidth="6"/>
        <circle cx="293" cy="87" r="28" stroke="url(#scoreG)" strokeWidth="6" strokeLinecap="round" strokeDasharray="123 176" strokeDashoffset="44"/>
        <text x="293" y="84" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="800" fontFamily="Inter, sans-serif">78</text>
        <text x="293" y="96" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="7" fontFamily="Inter, sans-serif">Score</text>
        <rect x="332" y="66" width="60" height="26" rx="7" fill="rgba(34,197,94,0.15)" stroke="rgba(74,222,128,0.3)" strokeWidth="0.8"/>
        <text x="362" y="76" textAnchor="middle" fill="#4ade80" fontSize="8" fontWeight="700" fontFamily="Inter, sans-serif">Skills</text>
        <text x="362" y="87" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="800" fontFamily="Inter, sans-serif">7</text>
        <rect x="332" y="100" width="60" height="26" rx="7" fill="rgba(245,158,11,0.15)" stroke="rgba(251,191,36,0.3)" strokeWidth="0.8"/>
        <text x="362" y="110" textAnchor="middle" fill="#fbbf24" fontSize="8" fontWeight="700" fontFamily="Inter, sans-serif">Gaps</text>
        <text x="362" y="121" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="800" fontFamily="Inter, sans-serif">4</text>
        <text x="260" y="140" fill="rgba(255,255,255,0.5)" fontSize="8" fontFamily="Inter, sans-serif">TypeScript</text>
        <rect x="260" y="145" width="130" height="5" rx="2.5" fill="rgba(255,255,255,0.08)"/>
        <rect x="260" y="145" width="104" height="5" rx="2.5" fill="url(#barG1)"/>
        <text x="260" y="160" fill="rgba(255,255,255,0.5)" fontSize="8" fontFamily="Inter, sans-serif">System Design</text>
        <rect x="260" y="165" width="130" height="5" rx="2.5" fill="rgba(255,255,255,0.08)"/>
        <rect x="260" y="165" width="52" height="5" rx="2.5" fill="url(#barG2)"/>
        <text x="260" y="180" fill="rgba(255,255,255,0.5)" fontSize="8" fontFamily="Inter, sans-serif">AWS</text>
        <rect x="260" y="185" width="130" height="5" rx="2.5" fill="rgba(255,255,255,0.08)"/>
        <rect x="260" y="185" width="26" height="5" rx="2.5" fill="url(#barG2)"/>
        <rect x="246" y="200" width="160" height="90" rx="14" fill="rgba(15,23,42,0.6)" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
        <text x="262" y="218" fill="rgba(255,255,255,0.6)" fontSize="8" fontWeight="700" fontFamily="Inter, sans-serif" letterSpacing="1">ROADMAP</text>
        {[
          { y: 232, label: 'Advanced TypeScript', done: true },
          { y: 249, label: 'Docker & K8s', done: true },
          { y: 266, label: 'AWS Fundamentals', done: false },
          { y: 283, label: 'System Design', done: false },
        ].map(item => (
          <g key={item.y}>
            <circle cx="262" cy={item.y - 3} r="5" fill={item.done ? '#2563eb' : 'rgba(255,255,255,0.08)'} stroke={item.done ? '#60a5fa' : 'rgba(255,255,255,0.2)'} strokeWidth="0.8"/>
            {item.done && <path d={`M${262 - 3} ${item.y - 3}l2 2 4-4`} stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>}
            <text x="272" y={item.y} fill={item.done ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.35)'} fontSize="9" fontFamily="Inter, sans-serif">{item.label}</text>
          </g>
        ))}
        <path d="M230 148 C238 148 238 148 246 148" stroke="rgba(96,165,250,0.5)" strokeWidth="1.5" strokeDasharray="4 3" strokeLinecap="round"/>
        <circle cx="232" cy="148" r="3" fill="rgba(96,165,250,0.4)"/>
        <defs>
          <linearGradient id="scoreG" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#60a5fa"/>
            <stop offset="100%" stopColor="#818cf8"/>
          </linearGradient>
          <linearGradient id="barG1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#2563eb"/>
            <stop offset="100%" stopColor="#60a5fa"/>
          </linearGradient>
          <linearGradient id="barG2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#f59e0b"/>
            <stop offset="100%" stopColor="#fbbf24"/>
          </linearGradient>
        </defs>
      </svg>

      <div style={{
        position: 'absolute', top: 8, right: -8,
        padding: '8px 14px', borderRadius: 10,
        background: 'rgba(34,197,94,0.15)',
        border: '1px solid rgba(74,222,128,0.3)',
        backdropFilter: 'blur(12px)',
        display: 'flex', alignItems: 'center', gap: 7,
      }}>
        <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 0 3px rgba(74,222,128,0.2)' }} />
        <span style={{ fontSize: 12, color: '#4ade80', fontWeight: 700 }}>Analysis Ready</span>
      </div>
    </div>
  )
}
