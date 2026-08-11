"use client"

import { useEffect, useState } from 'react'
import Image from 'next/image'
import type { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

type TopbarProfile = {
  avatarUrl: string | null
  displayName: string
  email: string
  initials: string
}

type TopbarProps = {
  onMenuClick?: () => void
}

function metadataString(user: User, key: string): string | null {
  const value = user.user_metadata[key]
  return typeof value === 'string' && value.trim() ? value : null
}

function buildProfile(user: User): TopbarProfile {
  const displayName =
    metadataString(user, 'full_name') ??
    metadataString(user, 'name') ??
    user.email?.split('@')[0] ??
    'User'

  const email = user.email ?? ''

  const source = displayName !== 'User' ? displayName : email
  const initials = source
    .split(/[\s@.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part: string) => part[0]?.toUpperCase())
    .join('') || 'RX'

  return {
    avatarUrl: metadataString(user, 'avatar_url'),
    displayName,
    email,
    initials,
  }
}

export default function Topbar({ onMenuClick }: TopbarProps) {
  const [profile, setProfile] = useState<TopbarProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function fetchUser() {
      const { data, error } = await supabase.auth.getUser()

      if (cancelled) return

      if (error || !data.user) {
        setLoading(false)
        return
      }

      setProfile(buildProfile(data.user))
      setLoading(false)
    }

    void fetchUser()

    return () => {
      cancelled = true
    }
  }, [])

  const displayName = profile?.displayName ?? ''
  const initials = profile?.initials ?? ''
  const avatarUrl = profile?.avatarUrl ?? null

  return (
    <header className="sticky top-0 z-30 flex h-[60px] w-full min-w-0 items-center justify-between gap-3 border-b border-[var(--app-border)] bg-[var(--app-surface)] px-4 sm:px-6 lg:px-8">
      <button
        type="button"
        onClick={onMenuClick}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--app-border)] bg-[var(--app-surface)] text-[var(--app-text-muted)] transition hover:border-blue-200 hover:bg-[var(--app-surface-muted)] hover:text-[#2563eb] lg:hidden"
        aria-label="Open sidebar"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>

      <div className="ml-auto flex min-w-0 items-center gap-2 sm:gap-3">
        <button style={{
          width: 36, height: 36, borderRadius: 9, border: '1.5px solid var(--app-border)', background: 'var(--app-surface)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', position: 'relative', transition: 'all 0.13s',
        }}
        onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.borderColor = '#bfdbfe'; el.style.background = '#f0f7ff' }}
        onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.borderColor = 'var(--app-border)'; el.style.background = 'var(--app-surface)' }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 1.5a4.5 4.5 0 00-4.5 4.5v2.5l-1 1.5h11l-1-1.5V6A4.5 4.5 0 008 1.5z" stroke="#64748b" strokeWidth="1.5" strokeLinejoin="round"/>
            <path d="M6.5 12.5a1.5 1.5 0 003 0" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span style={{ position: 'absolute', top: 6, right: 6, width: 7, height: 7, borderRadius: '50%', background: '#ef4444', border: '1.5px solid #fff' }} />
        </button>
        <div className="hidden h-6 w-px bg-[var(--app-border)] sm:block" />
        <div className="flex min-w-0 cursor-pointer items-center gap-2 rounded-[10px] px-1.5 py-1 transition sm:gap-2.5"
          onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = 'var(--app-surface-muted)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = 'transparent' }}>

          {/* Avatar */}
          {loading ? (
            <div style={{
              width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
              background: 'var(--app-border)',
              boxShadow: '0 1px 4px rgba(37,99,235,0.1)',
            }} />
          ) : avatarUrl ? (
            <Image
              src={avatarUrl}
              alt={displayName}
              width={32}
              height={32}
              unoptimized
              referrerPolicy="no-referrer"
              style={{
                borderRadius: '50%', flexShrink: 0,
                objectFit: 'cover',
                boxShadow: '0 1px 4px rgba(37,99,235,0.3)',
              }}
            />
          ) : (
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              boxShadow: '0 1px 4px rgba(37,99,235,0.3)',
            }}>
              <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 800, color: '#fff' }}>
                {initials}
              </span>
            </div>
          )}

          {/* Name + email badge */}
          <div className="hidden min-w-0 sm:block">
            {loading ? (
              <>
                <div style={{ width: 72, height: 12, borderRadius: 6, background: 'var(--app-border)', marginBottom: 5 }} />
                <div style={{ width: 48, height: 10, borderRadius: 6, background: 'var(--app-border)' }} />
              </>
            ) : (
              <>
                <div className="max-w-[150px] truncate" style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--app-text)', lineHeight: 1.2 }}>
                  {displayName}
                </div>
                <span className="block max-w-[180px] truncate" style={{ fontSize: 11, fontWeight: 700, color: '#2563eb', background: '#dbeafe', padding: '1px 7px', borderRadius: 100 }}>
                  {profile?.email ?? ''}
                </span>
              </>
            )}
          </div>

          <svg className="hidden shrink-0 sm:block" width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ color: '#94a3b8' }}>
            <path d="M3.5 5.5l3.5 3.5 3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </header>
  )
}
