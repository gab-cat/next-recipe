"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { useDebounce } from "use-debounce"
import { Search, Filter, ChefHat, TrendingUp, Sparkles, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import RecipeCard from "@/components/RecipeCard"
import RecipeCardSkeleton from "@/components/home-page/recipe-card-skeleton"
import { Recipe } from "@/types/recipe"
import { motion, Variants } from "framer-motion"

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1
    }
  }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1] // easeOut curve
    }
  }
}

const heroVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1] // easeOut curve
    }
  }
}

const gridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1]
    }
  }
}

const skeletonVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1] // easeOut curve
    }
  }
}

// Custom hook for fetching recipes
const useRecipes = (searchTerm: string, timeFilter: string) => {
  return useQuery({
    queryKey: ['recipes', searchTerm, timeFilter],
    queryFn: async () => {
      const params = new URLSearchParams()
      if (searchTerm) params.append("search", searchTerm)
      if (timeFilter) params.append("time", timeFilter)
      
      const response = await fetch(`/api/recipes?${params}`,{
        cache: "force-cache",
      })
      if (!response.ok) {
        throw new Error('Failed to fetch recipes')
      }
      return response.json() as Promise<Recipe[]>
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export default function HomePageClient() {
  const [searchInput, setSearchInput] = useState("")
  const [timeFilter, setTimeFilter] = useState("")
  
  // Debounce the search term to avoid too many API calls
  const [debouncedSearchTerm] = useDebounce(searchInput, 500)
  
  const { data: recipes = [], isLoading, error } = useRecipes(debouncedSearchTerm, timeFilter)

  // Show skeletons while searching is happening
  const isSearching = searchInput !== debouncedSearchTerm

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <motion.div 
        className="relative overflow-hidden bg-gray-900 pb-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>

        {/* Floating geometric patterns */}
        <motion.div 
          className="absolute inset-0 opacity-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.div 
            className="absolute top-10 left-20 w-16 h-16 border border-primary/50 rounded-full"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: [0.4, 0, 0.6, 1]
            }}
          />
          <motion.div 
            className="absolute bottom-20 right-32 w-12 h-12 border border-accent/50 rounded-full"
            animate={{ 
              scale: [1, 1.3, 1],
              y: [0, -20, 0]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: [0.4, 0, 0.6, 1],
              delay: 1
            }}
          />
          <motion.div 
            className="absolute top-1/2 left-1/4 w-8 h-8 border border-primary/30 rotate-45"
            animate={{ 
              rotate: [45, 225, 405],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 5,
              repeat: Infinity,
              ease: "linear",
              delay: 2
            }}
          />
          <motion.div 
            className="absolute bottom-32 left-1/3 w-6 h-6 bg-accent/20 rounded-full"
            animate={{ 
              y: [0, -15, 0],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{ 
              duration: 2.5,
              repeat: Infinity,
              ease: [0.4, 0, 0.6, 1],
              delay: 0.5
            }}
          />
        </motion.div>

        <div className="relative container mx-auto px-4 pt-16 pb-12">
          <motion.div 
            className="text-center max-w-6xl mx-auto"
            variants={containerVariants}
          >
            <motion.div 
              className="flex justify-center mb-8"
              variants={heroVariants}
            >
              <div className="relative">
                <motion.div 
                  className="w-20 h-20 bg-primary/20 backdrop-blur-sm rounded-3xl flex items-center justify-center border border-primary/30 shadow-lg shadow-primary/20"
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 5,
                    transition: { duration: 0.2 }
                  }}
                >
                  <ChefHat className="w-10 h-10 text-primary" />
                </motion.div>
                <motion.div 
                  className="absolute -top-3 -right-3 w-8 h-8 bg-accent rounded-full flex items-center justify-center shadow-lg shadow-accent/30"
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: [0.4, 0, 0.6, 1]
                  }}
                >
                  <Plus className="w-7 h-7 font-bold text-gray-900 fill-gray-900" />
                </motion.div>
              </div>
            </motion.div>

            <motion.div 
              className="mb-8"
              variants={itemVariants}
            >
              <motion.h1 
                className="text-5xl md:text-7xl font-black mb-6 tracking-tight text-white"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Recipe<span className="text-accent">Hub</span>
              </motion.h1>
              <motion.div 
                className="flex items-center justify-center space-x-4 mb-8"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent rounded-full"></div>
                <motion.div 
                  className="h-3 w-3 bg-accent rounded-full shadow-lg shadow-accent/30"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    boxShadow: [
                      "0 0 20px rgba(173, 252, 3, 0.3)",
                      "0 0 40px rgba(173, 252, 3, 0.6)",
                      "0 0 20px rgba(173, 252, 3, 0.3)"
                    ]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: [0.4, 0, 0.6, 1]
                  }}
                />
                <div className="h-1 w-20 bg-gradient-to-r from-accent to-primary rounded-full"></div>
              </motion.div>
            </motion.div>

            <motion.p 
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light mb-12"
              variants={itemVariants}
            >
              Discover extraordinary flavors and create culinary masterpieces with our premium collection
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 mb-12"
              variants={containerVariants}
            >
              <motion.div 
                className="flex items-center space-x-3 bg-primary/20 backdrop-blur-sm px-6 py-3 rounded-full border border-primary/30 shadow-lg shadow-primary/20"
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  y: -2,
                  transition: { duration: 0.2 }
                }}
              >
                <TrendingUp className="w-5 h-5 text-primary" />
                <span className="text-white font-semibold">{recipes.length}+ Premium Recipes</span>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-3 bg-accent/20 backdrop-blur-sm px-6 py-3 rounded-full border border-accent/30 shadow-lg shadow-accent/20"
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  y: -2,
                  transition: { duration: 0.2 }
                }}
              >
                <Sparkles className="w-5 h-5 text-accent" />
                <span className="text-white font-semibold">Chef Approved</span>
              </motion.div>
            </motion.div>

            {/* Search Section */}
            <motion.div 
              className="max-w-5xl mx-auto"
              variants={itemVariants}
            >
              <motion.div 
                className="bg-gray-800/30 backdrop-blur-2xl rounded-3xl p-8 border border-gray-700/50 shadow-2xl"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                whileHover={{
                  boxShadow: "0 25px 50px -12px rgba(29, 67, 216, 0.25)",
                  transition: { duration: 0.3 }
                }}
              >
                <div className="flex flex-col lg:flex-row gap-6 items-center">
                  <div className="flex-1 relative w-full">
                    <div className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <Search className="w-6 h-6" />
                    </div>
                    <Input
                      type="text"
                      placeholder="Search recipes, ingredients, cuisines..."
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      className="pl-16 pr-6 h-16 text-lg border-2 border-gray-600/50 focus:border-primary rounded-2xl transition-all duration-300 bg-gray-800/50 text-white placeholder:text-gray-400 hover:border-gray-500/70 shadow-inner"
                    />
                    {isSearching && (
                      <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
                        <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}
                  </div>
                  <div className="lg:w-72 w-full">
                    <Select value={timeFilter} onValueChange={setTimeFilter}>
                      <SelectTrigger className="h-16 text-lg border-2 border-gray-600/50 focus:border-accent rounded-2xl bg-gray-800/50 text-white hover:border-gray-500/70 transition-all duration-300 shadow-inner">
                        <div className="flex items-center">
                          <Filter className="w-5 h-5 mr-3 text-gray-400" />
                          <SelectValue placeholder="Filter by cooking time" />
                        </div>
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800/95 backdrop-blur-xl border-gray-700 rounded-2xl">
                        <SelectItem value="all" className="text-white hover:bg-gray-700/70 rounded-xl">All Recipes</SelectItem>
                        <SelectItem value="quick" className="text-white hover:bg-gray-700/70 rounded-xl">⚡ Quick (&lt;30 min)</SelectItem>
                        <SelectItem value="medium" className="text-white hover:bg-gray-700/70 rounded-xl">🔥 Medium (30-60 min)</SelectItem>
                        <SelectItem value="long" className="text-white hover:bg-gray-700/70 rounded-xl">🍲 Long (&gt;60 min)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {/* Search stats */}
                <motion.div 
                  className="mt-6 pt-6 border-t border-gray-700/50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.8 }}
                >
                  <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-gray-400">
                    <span>
                      {isLoading || isSearching ? 'Searching...' : recipes.length > 0 ? `Showing ${recipes.length} premium recipes` : 'Start searching to discover recipes'}
                    </span>
                    <div className="flex items-center space-x-4 mt-2 sm:mt-0">
                      <div className="flex items-center space-x-2">
                        <motion.div 
                          className="w-2 h-2 bg-primary rounded-full"
                          animate={{ 
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 1, 0.5]
                          }}
                          transition={{ 
                            duration: 1.5,
                            repeat: Infinity,
                            ease: [0.4, 0, 0.6, 1]
                          }}
                        />
                        <span>Real-time search</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <motion.div 
                          className="w-2 h-2 bg-accent rounded-full"
                          animate={{ 
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 1, 0.5]
                          }}
                          transition={{ 
                            duration: 1.5,
                            repeat: Infinity,
                            ease: [0.4, 0, 0.6, 1],
                            delay: 0.75
                          }}
                        />
                        <span>Smart filtering</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <div className="bg-gray-900 min-h-screen">
        <div className="container mx-auto px-4 py-16">
          {/* Recipe Grid */}
          {isLoading || isSearching ? (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              variants={gridVariants}
              initial="hidden"
              animate="visible"
            >
              {Array.from({ length: 8 }).map((_, index) => (
                <motion.div 
                  key={`skeleton-${index}`}
                  variants={skeletonVariants}
                >
                  <RecipeCardSkeleton />
                </motion.div>
              ))}
            </motion.div>
          ) : error ? (
            <motion.div 
              className="text-center py-20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className="w-24 h-24 bg-red-500/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-8 border border-red-500/30"
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: [0.4, 0, 0.6, 1]
                }}
              >
                <Search className="w-12 h-12 text-red-400" />
              </motion.div>
              <motion.h3 
                className="text-3xl font-bold text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Something went wrong
              </motion.h3>
              <motion.p 
                className="text-gray-300 text-lg mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Failed to load recipes. Please try again.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Button
                  onClick={() => window.location.reload()}
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 shadow-lg shadow-primary/30"
                >
                  Retry
                </Button>
              </motion.div>
            </motion.div>
          ) : recipes.length === 0 ? (
            <motion.div 
              className="text-center py-20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className="w-24 h-24 bg-gray-700/50 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-8 border border-gray-600"
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 2, -2, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: [0.4, 0, 0.6, 1]
                }}
              >
                <Search className="w-12 h-12 text-gray-400" />
              </motion.div>
              <motion.h3 
                className="text-3xl font-bold text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                No recipes found
              </motion.h3>
              <motion.p 
                className="text-gray-300 text-lg mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Try adjusting your search or filters
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Button
                  onClick={() => {
                    setSearchInput("")
                    setTimeFilter("")
                  }}
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 shadow-lg shadow-primary/30"
                >
                  Show All Recipes
                </Button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              variants={gridVariants}
              initial="hidden"
              animate="visible"
            >
              {recipes.map((recipe, index) => (
                <RecipeCard 
                  key={recipe.id}
                  recipe={recipe}
                  index={index}
                />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
} 