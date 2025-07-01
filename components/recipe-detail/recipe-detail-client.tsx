"use client"

import { useParams, useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { ArrowLeft, ChefHat } from "lucide-react"
import { Button } from "@/components/ui/button"
import RecipeDetail from "@/components/RecipeDetail"
import RecipeDetailSkeleton from "@/components/recipe-detail/recipe-detail-skeleton"
import { Recipe } from "@/types/recipe"

// Custom hook for fetching a single recipe
const useRecipe = (id: string) => {
  return useQuery({
    queryKey: ['recipe', id],
    queryFn: async () => {
      const response = await fetch(`/api/recipes?id=${id}`, {
        cache: "default",
      })
      if (!response.ok) {
        throw new Error('Failed to fetch recipe')
      }
      const data = await response.json() as Recipe[]
      if (data.length === 0) {
        throw new Error('Recipe not found')
      }
      return data[0]
    },
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

export default function RecipeDetailClient() {
  const params = useParams()
  const router = useRouter()
  const recipeId = params.id as string
  
  const { data: recipe, isLoading, error } = useRecipe(recipeId)

  if (isLoading) {
    return <RecipeDetailSkeleton />
  }

  if (error || !recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center animate-fade-in">
          <div className="w-24 h-24 bg-primary/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
            <ChefHat className="w-12 h-12 text-primary" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Recipe Not Found</h2>
          <p className="text-gray-300 text-lg mb-8">This recipe seems to have gone on a culinary adventure!</p>
          <Button
            onClick={() => router.push("/")}
            className="bg-primary text-white hover:bg-primary/90 px-8 py-3 rounded-xl text-lg font-semibold transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Recipes
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <RecipeDetail recipe={recipe} />
    </div>
  )
} 