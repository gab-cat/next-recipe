'use client'

import { type ReactNode } from 'react'
import { useAuthCheck } from '@/src/features/auth/hooks/use-auth-check'

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  // This will validate the token on mount
  useAuthCheck()

  return <>{children}</>
} 