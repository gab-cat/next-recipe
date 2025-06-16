import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://recipes.gab-cat.me'
  
  // Base routes
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
  ]

  try {
    // Fetch all recipes to generate recipe pages
    const recipesModule = await import('@/recipes.json')
    const recipes = recipesModule.default

    // Add recipe pages to sitemap
    const recipeRoutes = recipes.map((recipe) => ({
      url: `${baseUrl}/recipes/${recipe.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

    return [...routes, ...recipeRoutes]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    // Return at least the base routes if recipe fetching fails
    return routes
  }
}
