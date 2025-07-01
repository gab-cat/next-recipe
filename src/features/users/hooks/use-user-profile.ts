import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/src/lib/api/client'
import { showToast } from '@/lib/toast'
import type { Recipe } from '@/types/recipe'
import { User } from '@/src/types/auth'
import { useAuthStore } from '@/src/stores/auth-store'

export function useUserByUsername(username: string) {
  return useQuery({
    queryKey: ['user', 'username', username],
    queryFn: () => api.get<User>(`/users/username/${username}`, { skipAuth: true }),
    enabled: !!username,
  })
}

export function useRecipesByAuthorEmail(email: string, page = 1, limit = 12) {
  return useQuery({
    queryKey: ['recipes', 'author', email, page, limit],
    queryFn: () => api.get<Recipe[]>(`/recipes/author/${email}?page=${page}&limit=${limit}`, { skipAuth: true }),
    enabled: !!email,
  })
}

export function useUserProfile(username: string) {
  const userQuery = useUserByUsername(username)
  const recipesQuery = useRecipesByAuthorEmail(userQuery.data?.email || '', 1, 12)

  return {
    user: userQuery.data,
    recipes: recipesQuery.data || [],
    isLoading: userQuery.isLoading || recipesQuery.isLoading,
    error: userQuery.error || recipesQuery.error,
    isUserError: userQuery.isError,
    isRecipesError: recipesQuery.isError,
  }
}

// Update user mutation
export function useUpdateUser() {
  const queryClient = useQueryClient()
  const { user, updateUser: updateAuthUser } = useAuthStore()
  
  return useMutation({
    mutationFn: async (data: Partial<User>): Promise<User> => {
      if (!user?.email) throw new Error('User not authenticated')
      const response = await api.patch<User>(`/users/email/${user.email}`, data)
      return response
    },
    onSuccess: (updatedUser) => {
      // Update auth store
      updateAuthUser(updatedUser)
      
      // Invalidate user queries
      queryClient.invalidateQueries({
        queryKey: ['user'],
      })
      
      showToast({
        type: 'success',
        title: 'Profile Updated!',
        description: 'Your profile has been successfully updated.',
      })
    },
    onError: (error) => {
      showToast({
        type: 'error',
        title: 'Update Failed',
        description: error.message || 'Failed to update profile. Please try again.',
      })
    },
  })
}

// Delete user mutation
export function useDeleteUser() {
  const queryClient = useQueryClient()
  const { user, logout } = useAuthStore()
  
  return useMutation({
    mutationFn: async (): Promise<void> => {
      if (!user?.email) throw new Error('User not authenticated')
      await api.delete(`/users/email/${user.email}`)
    },
    onSuccess: () => {
      // Clear all caches and logout
      queryClient.clear()
      logout()
      
      showToast({
        type: 'success',
        title: 'Account Deleted',
        description: 'Your account has been successfully deleted.',
      })
    },
    onError: (error) => {
      showToast({
        type: 'error',
        title: 'Deletion Failed',
        description: error.message || 'Failed to delete account. Please try again.',
      })
    },
  })
} 