'use client'

import { useState } from 'react'
import { Plus, ChefHat, Search, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAuthStore } from '@/src/stores/auth-store'
import { useUserRecipes } from '@/src/features/recipes/hooks/use-recipes'
import { CreateRecipeSheet } from '@/src/features/recipes/components/create-recipe-sheet'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import RecipeCardSkeleton from '@/components/home-page/recipe-card-skeleton'
import { StickyNavbar } from '@/components/shared/sticky-navbar'
import RecipeCard from '@/components/RecipeCard'



export default function RecipesPage() {
  const { user, isAuthenticated } = useAuthStore()
  const { data: recipes, isLoading, error } = useUserRecipes()
  const [showCreateSheet, setShowCreateSheet] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Filter recipes based on search query
  const filteredRecipes = recipes?.filter(recipe =>
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.ingredients.some(ingredient => 
      ingredient.toLowerCase().includes(searchQuery.toLowerCase())
    )
  ) || []

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <ChefHat className="w-16 h-16 text-primary mx-auto" />
          <h1 className="text-2xl font-bold text-white font-heading">Authentication Required</h1>
          <p className="text-gray-400 font-mono">Please sign in to view your recipes.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <StickyNavbar isVisible={true} />
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-left space-y-4 flex flex-col items-start"
        >
          <div className="flex items-start justify-start gap-3">
            <h1 className="text-4xl md:text-5xl font-bold text-white font-heading">
              My <span className="text-accent">Recipes</span>
            </h1>
          </div>
          <p className="text-gray-300 font-mono max-w-2xl">
            Welcome back, <span className="text-accent font-semibold">{user?.firstName || user?.username}</span>! 
            Manage your culinary creations and share them with the community.
          </p>
        </motion.div>

        {/* Actions Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-between"
        >
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search your recipes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 
                       focus:border-primary/60 focus:ring-primary/20 rounded-xl font-mono"
            />
          </div>

          {/* Create Button */}
          <Button
            onClick={() => setShowCreateSheet(true)}
            className="bg-primary/20 border border-primary/30 hover:bg-primary/30 
                     hover:border-primary/70 hover:shadow-primary/40 shadow-lg shadow-primary/20 
                     text-white rounded-xl font-mono transition-all duration-300 px-6"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Recipe
          </Button>
        </motion.div>

        {/* Stats */}
        {recipes && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            <Card className="bg-gray-800/30 border-gray-700/50 p-4 text-center">
              <div className="text-2xl font-bold text-primary font-heading">{recipes.length}</div>
              <div className="text-sm text-gray-400 font-mono">Total Recipes</div>
            </Card>
            <Card className="bg-gray-800/30 border-gray-700/50 p-4 text-center">
              <div className="text-2xl font-bold text-green-400 font-heading">
                {recipes.filter(r => r.isPublished).length}
              </div>
              <div className="text-sm text-gray-400 font-mono">Published</div>
            </Card>
            <Card className="bg-gray-800/30 border-gray-700/50 p-4 text-center">
              <div className="text-2xl font-bold text-yellow-400 font-heading">
                {recipes.filter(r => !r.isPublished).length}
              </div>
              <div className="text-sm text-gray-400 font-mono">Drafts</div>
            </Card>
          </motion.div>
        )}

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <RecipeCardSkeleton key={i} />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12 space-y-4">
              <ChefHat className="w-16 h-16 text-gray-600 mx-auto" />
              <h3 className="text-xl font-semibold text-white font-heading">Failed to Load Recipes</h3>
              <p className="text-gray-400 font-mono">There was an error loading your recipes. Please try again.</p>
            </div>
          ) : filteredRecipes.length === 0 ? (
            <div className="text-center py-12 space-y-6">
              <div className="relative">
                <div className="w-24 h-24 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto border border-primary/30">
                  <ChefHat className="w-12 h-12 text-primary" />
                </div>
                <div className="absolute -top-2 -right-2">
                  <Sparkles className="w-8 h-8 text-accent" />
                </div>
              </div>
              
              {searchQuery ? (
                <>
                  <h3 className="text-2xl font-bold text-white font-heading">
                     No recipes found for &quot;{searchQuery}&quot;
                  </h3>
                  <p className="text-gray-400 font-mono max-w-md mx-auto">
                    Try adjusting your search terms or create a new recipe with that name!
                  </p>
                </>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-white font-heading">
                    Ready to Create Your First Recipe?
                  </h3>
                  <p className="text-gray-400 font-mono max-w-md mx-auto">
                    Share your culinary creativity with the RecipeHub community. 
                    Your delicious creations are waiting to be discovered!
                  </p>
                </>
              )}
              
              <Button
                onClick={() => setShowCreateSheet(true)}
                className="bg-primary/20 border border-primary/30 hover:bg-primary/30 
                         hover:border-primary/70 hover:shadow-primary/40 shadow-xl shadow-primary/20 
                         text-white rounded-xl font-mono transition-all duration-300 px-8 py-3"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Your First Recipe
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Create Recipe Sheet */}
      <CreateRecipeSheet
        open={showCreateSheet}
        onOpenChange={setShowCreateSheet}
      />
    </div>
  )
}
