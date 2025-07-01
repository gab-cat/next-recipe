import { useEffect } from 'react'
import { useAuthStore } from '@/src/stores/auth-store'
import { api } from '@/src/lib/api/client'

export function useAuthCheck() {
  const { tokens, logout, isAuthenticated } = useAuthStore()

  useEffect(() => {
    // Only run if we think we're authenticated
    if (!isAuthenticated || !tokens?.accessToken) {
      return
    }

    // Validate the token on mount
    const validateToken = async () => {
      try {
        await api.post('/auth/validate', { token: tokens.accessToken })
      } catch {
        // Token is invalid, logout the user
        logout()
      }
    }

    validateToken()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Only run once on mount

  return null
} 