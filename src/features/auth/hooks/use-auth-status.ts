import { useAuthStore } from '@/src/stores/auth-store'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

/**
 * Hook to check if user is authenticated
 */
export function useIsAuthenticated() {
  const { isAuthenticated } = useAuthStore()
  return isAuthenticated
}

/**
 * Hook to get current user
 */
export function useCurrentUser() {
  const { user } = useAuthStore()
  return user
}

/**
 * Hook that redirects to login if not authenticated
 */
export function useRequireAuth(redirectUrl = '/') {
  const { isAuthenticated } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      // Store the intended destination
      sessionStorage.setItem('redirectAfterLogin', redirectUrl)
      router.push('/')
    }
  }, [isAuthenticated, redirectUrl, router])

  return isAuthenticated
}

/**
 * Hook that redirects to home if authenticated
 */
export function useRedirectIfAuthenticated(redirectUrl = '/') {
  const { isAuthenticated } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push(redirectUrl)
    }
  }, [isAuthenticated, redirectUrl, router])
} 