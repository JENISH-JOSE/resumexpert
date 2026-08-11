import { supabase } from './supabase'
import type { User } from '@supabase/supabase-js'

export type PublicUser = {
  id: string
  onboarding_completed: boolean
}

export async function signInWithGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  })

  if (error) {
    throw error
  }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()

  if (error) {
    throw error
  }
}

export async function ensurePublicUser(user: User): Promise<PublicUser> {
  const { data: existingUser, error: selectError } = await supabase
    .from('users')
    .select('id, onboarding_completed')
    .eq('id', user.id)
    .maybeSingle()

  if (selectError) {
    throw selectError
  }

  if (existingUser) {
    return existingUser
  }

  const fullName =
    typeof user.user_metadata.full_name === 'string'
      ? user.user_metadata.full_name
      : typeof user.user_metadata.name === 'string'
        ? user.user_metadata.name
        : ''

  const { data: insertedUser, error: insertError } = await supabase
    .from('users')
    .insert({
      id: user.id,
      full_name: fullName,
      email: user.email ?? '',
      onboarding_completed: false,
    })
    .select('id, onboarding_completed')
    .single()

  if (insertError && insertError.code !== '23505') {
    throw insertError
  }

  if (insertedUser) {
    return insertedUser
  }

  const { data: userAfterConflict, error: conflictSelectError } = await supabase
    .from('users')
    .select('id, onboarding_completed')
    .eq('id', user.id)
    .single()

  if (conflictSelectError) {
    throw conflictSelectError
  }

  return userAfterConflict
}

export async function getAuthenticatedRedirectPath(user: User) {
  const publicUser = await ensurePublicUser(user)
  return publicUser.onboarding_completed ? '/dashboard' : '/onboarding'
}
