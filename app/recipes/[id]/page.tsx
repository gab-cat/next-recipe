import type { Metadata } from "next"
import RecipeDetailClient from "@/components/recipe-detail/recipe-detail-client"
import { Recipe } from "@/types/recipe"

interface RecipeDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export const dynamic = 'force-static'

// Fetch recipe data for metadata generation
async function getRecipe(id: string): Promise<Recipe | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const response = await fetch(`${baseUrl}/api/recipes?id=${id}`, {
      cache: "default",
    })
    if (!response.ok) {
      return null
    }
    const data = await response.json()
    return data.length > 0 ? data[0] : null
  } catch (error) {
    console.error("Error fetching recipe for metadata:", error)
    return null
  }
}

export async function generateMetadata({ params }: RecipeDetailPageProps): Promise<Metadata> {
  const recipe = await getRecipe((await params).id)
  
  if (!recipe) {
    return {
      title: "Recipe Not Found",
      description: "The requested recipe could not be found.",
    }
  }

  const recipeTitle = recipe.name || "Delicious Recipe"
  const recipeDescription = recipe.description || `Learn how to make ${recipeTitle} with our detailed recipe guide.`
  const cookingTime = recipe.cookingTime ? ` • ${recipe.cookingTime} min` : ""
  
  return {
    title: `${recipeTitle} - Recipe Guide`,
    description: `${recipeDescription} Complete with ingredients, instructions, and cooking tips${cookingTime}.`,
    keywords: [
      recipe.name,
      "recipe",
      "cooking",
      "ingredients",
      "instructions",
    ].filter(Boolean),
    openGraph: {
      title: `${recipeTitle} - RecipeHub`,
      description: recipeDescription,
      type: "article",
      images: recipe.image ? [
        {
          url: recipe.image,
          width: 1200,
          height: 630,
          alt: `${recipeTitle} recipe image`,
        }
      ] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${recipeTitle} - RecipeHub`,
      description: recipeDescription,
      images: recipe.image ? [recipe.image] : undefined,
    },
    alternates: {
      canonical: `/recipes/${(await params).id}`,
    },
    other: {
      "recipe:cooking_time": recipe.cookingTime?.toString() || "",
      "recipe:rating": "5",
    },
  }
}

export default function RecipeDetailPage() {
  return <RecipeDetailClient />
}
