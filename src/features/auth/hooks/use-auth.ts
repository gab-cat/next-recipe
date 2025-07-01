import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { api, ApiError } from '@/src/lib/api/client'
import { useAuthStore } from '@/src/stores/auth-store'
import type { AuthResponse, LoginDto, RegisterDto } from '@/src/types/auth'
import { showToast } from '@/lib/toast'

export function useLogin() {
  const authStore = useAuthStore()

  return useMutation({
    mutationFn: async (data: LoginDto) => {
      return api.post<AuthResponse>('/auth/login', data, { skipAuth: true })
    },
    onSuccess: (data) => {
      authStore.login(data.user, data.tokens)
      showToast({
        title: 'Welcome back!',
        description: 'You are now logged in',
        type: 'success',
      })
    },
    onError: (error) => {
      if (error instanceof ApiError) {
        showToast({
          title: 'Invalid credentials',
          description: error.message,
          type: 'error',
        })
      } else {
        showToast({
          title: 'An unexpected error occurred',
          description: 'Please try again',
          type: 'error',
        })
      }
    },
  })
}

export function useRegister() {
  const router = useRouter()
  const authStore = useAuthStore()

  return useMutation({
    mutationFn: async (data: RegisterDto) => {
      return api.post<AuthResponse>('/auth/register', data, { skipAuth: true })
    },
    onSuccess: (data) => {
      authStore.login(data.user, data.tokens)
      showToast({
        title: 'Account created successfully!',
        description: 'You are now logged in',
        type: 'success',
      })
      router.push('/')
    },
    onError: (error) => {
      if (error instanceof ApiError) {
        if (error.status === 409) {
          showToast({
            title: 'Email or username already exists',
            description: 'Please try again',
            type: 'error',
          })
        } else {
          showToast({
            title: 'Registration failed',
            description: error.message,
            type: 'error',
          })
        }
      } else {
        showToast({
          title: 'An unexpected error occurred',
          description: 'Please try again',
          type: 'error',
        })
      }
    },
  })
}

export function useLogout() {
  const router = useRouter()
  const authStore = useAuthStore()

  return useMutation({
    mutationFn: async () => {
      const refreshToken = authStore.tokens?.refreshToken
      if (refreshToken) {
        await api.post('/auth/logout', { refreshToken }).catch(() => {
          // Ignore logout errors, we'll clear local state anyway
        })
      }
    },
    onSuccess: () => {
      authStore.logout()
      showToast({
        title: 'Logged out successfully',
        description: 'You are now logged out',
        type: 'success',
      })
      router.push('/')
    },
    onError: () => {
      // Even if server logout fails, clear local state
      authStore.logout()
      router.push('/')
    },
  })
}

export function useValidateToken() {
  const authStore = useAuthStore()

  return useMutation({
    mutationFn: async (token: string) => {
      return api.post('/auth/validate', { token }, { skipAuth: true })
    },
    onError: () => {
      authStore.logout()
    },
  })
} 