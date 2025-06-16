import { NextResponse } from "next/server";
import recipes from "@/recipes.json";
import { Recipe } from "@/types/recipe";

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search")?.toLowerCase() || "";
  const time = searchParams.get("time") || "";
  const id = searchParams.get("id") || "";

  let filteredRecipes: Recipe[] = recipes;

  // If searching by specific ID, return exact match
  if (id) {
    const recipe = recipes.find(r => r.id === id);
    return NextResponse.json(recipe ? [recipe] : []);
  }

  // Search functionality
  if (search) {
    filteredRecipes = filteredRecipes.filter((recipe) =>
      recipe.id.toLowerCase().includes(search) ||
      recipe.name.toLowerCase().includes(search) ||
      recipe.ingredients.some(ingredient => 
        ingredient.toLowerCase().includes(search)
      )
    );
  }

  // Time filtering
  if (time && time !== "all") {
    filteredRecipes = filteredRecipes.filter((recipe) => {
      const cookingTimeNumber = parseInt(recipe.cookingTime);
      
      switch (time) {
      case "quick":
        return cookingTimeNumber < 30;
      case "medium":
        return cookingTimeNumber >= 30 && cookingTimeNumber <= 60;
      case "long":
        return cookingTimeNumber > 60;
      default:
        return true;
      }
    });
  }

  return NextResponse.json(filteredRecipes);
};