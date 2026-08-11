"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getAuthenticatedRedirectPath } from '@/lib/auth'
import { supabase } from '@/lib/supabase'
import BrandLogo from '@/components/BrandLogo'

export default function LoginPage() {
  const router = useRouter()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    const isMounted = true

    async function checkSession() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!isMounted) {
          return
        }

        if (user) {
          const redirectPath = await getAuthenticatedRedirectPath(user)
          router.replace(redirectPath)
          return
        }

        setIsChecking(false)
      } catch (error) {
        console.error('Unable to check authenticated user redirect:', error)
        if (isMounted) {
          setIsChecking(false)
        }
      }
    }

    void checkSession()
  }, [router])

  if (isChecking) {
    return null
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, padding: '40px 32px', boxShadow: '0 20px 45px rgba(15, 23, 42, 0.08)', maxWidth: 420, width: '100%' }}>
        {/* Brand identity at the top of the login card */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}>
          <BrandLogo size={40} theme="light" />
        </div>
        <h1 style={{ margin: '0 0 10px', fontSize: 28, fontWeight: 800, color: '#0f172a', textAlign: 'center' }}>Welcome back</h1>
        <p style={{ margin: '0 0 28px', color: '#64748b', lineHeight: 1.6, textAlign: 'center' }}>Sign in to continue to your ResumeXpert dashboard.</p>
        <button
          onClick={() => {
            window.location.href = '/'
          }}
          style={{ width: '100%', padding: '12px 16px', borderRadius: 10, border: 'none', background: '#2563eb', color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}
        >
          Go to home
        </button>
      </div>
    </div>
  )
}
