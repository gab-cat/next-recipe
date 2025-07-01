'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { showToast } from '@/lib/toast'
import { CreateRecipeDto, Recipe, UpdateRecipeDto } from '@/types/recipe'
import { useAuthStore } from '@/src/stores/auth-store'
import { api } from '@/src/lib/api/client'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

// Get recipes by author email
export function useUserRecipes() {
  const { user } = useAuthStore()
  
  return useQuery({
    queryKey: ['recipes', 'user', user?.email],
    queryFn: async (): Promise<Recipe[]> => {
      if (!user?.email) throw new Error('User email not found')
      
      const response = await fetch(`${API_BASE_URL}/recipes/author/${user.email}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      
      if (!response.ok) {
        throw new Error('Failed to fetch user recipes')
      }
      
      return response.json()
    },
    enabled: !!user?.email,
  })
}

// Create recipe mutation
export function useCreateRecipe() {
  const queryClient = useQueryClient()
  const { user } = useAuthStore()
  
  return useMutation({
    mutationFn: async (data: CreateRecipeDto): Promise<Recipe> => {
      const response = await api.post<Recipe>('/recipes', data)
      return response
    },
    onSuccess: (newRecipe) => {
      // Invalidate and refetch user recipes
      queryClient.invalidateQueries({
        queryKey: ['recipes', 'user', user?.email],
      })
      
      // Optimistically update the cache
      queryClient.setQueryData(['recipes', 'user', user?.email], (old: Recipe[] = []) => [
        newRecipe,
        ...old,
      ])
      
      showToast({
        type: 'success',
        title: 'Recipe Created!',
        description: `"${newRecipe.name}" has been successfully created.`,
      })
    },
    onError: (error) => {
      showToast({
        type: 'error',
        title: 'Creation Failed',
        description: error.message || 'Failed to create recipe. Please try again.',
      })
    },
  })
}

// Delete recipe mutation
export function useDeleteRecipe() {
  const queryClient = useQueryClient()
  const { user } = useAuthStore()
  
  return useMutation({
    mutationFn: async (slug: string): Promise<void> => {
      const response = await fetch(`${API_BASE_URL}/api/v1/recipes/slug/${slug}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to delete recipe')
      }
    },
    onMutate: async (slug) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: ['recipes', 'user', user?.email],
      })
      
      // Snapshot the previous value
      const previousRecipes = queryClient.getQueryData(['recipes', 'user', user?.email])
      
      // Optimistically remove the recipe
      queryClient.setQueryData(['recipes', 'user', user?.email], (old: Recipe[] = []) =>
        old.filter(recipe => recipe.slug !== slug)
      )
      
      return { previousRecipes }
    },
    onError: (err, slug, context) => {
      // Rollback on error
      if (context?.previousRecipes) {
        queryClient.setQueryData(['recipes', 'user', user?.email], context.previousRecipes)
      }
      
      showToast({
        type: 'error',
        title: 'Deletion Failed',
        description: err.message || 'Failed to delete recipe. Please try again.',
      })
    },
    onSuccess: () => {
      showToast({
        type: 'success',
        title: 'Recipe Deleted',
        description: 'Recipe has been successfully deleted.',
      })
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({
        queryKey: ['recipes', 'user', user?.email],
      })
    },
  })
}

// Update recipe mutation
export function useUpdateRecipe() {
  const queryClient = useQueryClient()
  const { user } = useAuthStore()
  
  return useMutation({
    mutationFn: async ({ slug, data }: { slug: string; data: UpdateRecipeDto }): Promise<Recipe> => {
      const response = await api.patch<Recipe>(`/recipes/slug/${slug}`, data)
      return response
    },
    onMutate: async ({ slug, data }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: ['recipes', 'user', user?.email],
      })
      
      // Snapshot the previous value
      const previousRecipes = queryClient.getQueryData(['recipes', 'user', user?.email])
      
      // Optimistically update the recipe
      queryClient.setQueryData(['recipes', 'user', user?.email], (old: Recipe[] = []) =>
        old.map(recipe => 
          recipe.slug === slug 
            ? { ...recipe, ...data, updatedAt: new Date().toISOString() }
            : recipe
        )
      )
      
      return { previousRecipes }
    },
    onError: (err, _, context) => {
      // Rollback on error
      if (context?.previousRecipes) {
        queryClient.setQueryData(['recipes', 'user', user?.email], context.previousRecipes)
      }
      
      showToast({
        type: 'error',
        title: 'Update Failed',
        description: err.message || 'Failed to update recipe. Please try again.',
      })
    },
    onSuccess: (updatedRecipe) => {
      showToast({
        type: 'success',
        title: 'Recipe Updated!',
        description: `"${updatedRecipe.name}" has been successfully updated.`,
      })
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({
        queryKey: ['recipes', 'user', user?.email],
      })
    },
  })
} 