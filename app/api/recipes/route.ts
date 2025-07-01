import { NextResponse } from "next/server";
import { api } from "@/src/lib/api/client";
import { Recipe } from "@/types/recipe";

export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.toLowerCase() || "";
    const time = searchParams.get("time") || "";
    const id = searchParams.get("id") || "";
    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "50";

    let recipes: Recipe[] = [];

    // If searching by specific ID, return exact match
    if (id) {
      try {
        const recipe = await api.get<Recipe>(`/recipes/slug/${id}`, { skipAuth: true });
        console.log(recipe);
        return NextResponse.json(recipe ? [recipe] : []);
      } catch (error) {
        // If recipe not found, return empty array
        console.error('Error fetching recipe by ID:', error);
        return NextResponse.json([]);
      }
    }

    // Search functionality
    if (search) {
      try {
        recipes = await api.get<Recipe[]>(`/recipes/search?q=${encodeURIComponent(search)}&page=${page}&limit=${limit}`, { skipAuth: true });
      } catch (error) {
        console.error('Error searching recipes:', error);
        return NextResponse.json([], { status: 500 });
      }
    } else {
      // Get all recipes
      try {
        recipes = await api.get<Recipe[]>(`/recipes?page=${page}&limit=${limit}`, { skipAuth: true });
      } catch (error) {
        console.error('Error fetching recipes:', error);
        return NextResponse.json([], { status: 500 });
      }
    }

    // Time filtering (client-side since backend doesn't support it)
    if (time && time !== "all" && recipes.length > 0) {
      recipes = recipes.filter((recipe) => {
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

    return NextResponse.json(recipes);
  } catch (error) {
    console.error('Unexpected error in recipes route:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
};