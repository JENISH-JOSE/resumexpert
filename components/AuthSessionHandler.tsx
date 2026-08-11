"use client"

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import type { Session } from '@supabase/supabase-js'
import { getAuthenticatedRedirectPath } from '../lib/auth'
import { supabase } from '../lib/supabase'

export default function AuthSessionHandler() {
  const router = useRouter()
  const handledUserId = useRef<string | null>(null)

  useEffect(() => {
    let isMounted = true

    async function handleSession(session: Session | null) {
      const user = session?.user

      if (!user || handledUserId.current === user.id) {
        return
      }

      handledUserId.current = user.id

      try {
        const redirectPath = await getAuthenticatedRedirectPath(user)

        if (isMounted) {
          router.replace(redirectPath)
        }
      } catch (error) {
        handledUserId.current = null
        console.error('Unable to prepare authenticated user session:', error)
      }
    }

    supabase.auth.getSession().then(({ data, error }) => {
      if (error) {
        console.error('Unable to read Supabase session:', error)
        return
      }

      void handleSession(data.session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      void handleSession(session)
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [router])

  return null
}
