import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { AuthState, User, AuthTokens } from '@/src/types/auth'

interface AuthStore extends AuthState {
  setUser: (user: User | null) => void
  setTokens: (tokens: AuthTokens | null) => void
  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
  login: (user: User, tokens: AuthTokens) => void
  logout: () => void
  updateUser: (user: Partial<User>) => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      tokens: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user,
        }),

      setTokens: (tokens) =>
        set({
          tokens,
        }),

      setLoading: (isLoading) =>
        set({
          isLoading,
        }),

      setError: (error) =>
        set({
          error,
        }),

      login: (user, tokens) =>
        set({
          user,
          tokens,
          isAuthenticated: true,
          error: null,
        }),

      logout: () =>
        set({
          user: null,
          tokens: null,
          isAuthenticated: false,
          error: null,
        }),

      updateUser: (updatedData) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updatedData } : null,
        })),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        tokens: state.tokens,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
) 