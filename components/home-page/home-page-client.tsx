"use client"

import { useState, useRef, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { useDebounce } from "use-debounce"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { Search, Filter, ChefHat, ArrowUp, X, Plus, ArrowRight, FunnelX } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import RecipeCard from "@/components/RecipeCard"
import RecipeCardSkeleton from "@/components/home-page/recipe-card-skeleton"
import FloatingActionButton from "@/components/ui/floating-action-button"
import { showToast } from "@/lib/toast"
import { Recipe } from "@/types/recipe"
import { motion, Variants } from "framer-motion"
import { cn } from "@/lib/utils"

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
      ease: [0.4, 0, 0.2, 1]
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
      ease: [0.4, 0, 0.2, 1]
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
      ease: [0.4, 0, 0.2, 1]
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
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  // Initialize state from URL params
  const [searchInput, setSearchInput] = useState(searchParams.get('search') || "")
  const [timeFilter, setTimeFilter] = useState(searchParams.get('time') || "")
  const [isHeroVisible, setIsHeroVisible] = useState(true)
  const heroRef = useRef<HTMLDivElement>(null)
  
  // Debounce the search term to avoid too many API calls
  const [debouncedSearchTerm] = useDebounce(searchInput, 500)
  
  const { data: recipes = [], isLoading, error } = useRecipes(debouncedSearchTerm, timeFilter)

  // Show skeletons while searching is happening
  const isSearching = searchInput !== debouncedSearchTerm

  // Update URL when debounced search term or time filter changes
  useEffect(() => {
    const updateUrlParams = (search: string, time: string) => {
      const params = new URLSearchParams()
      if (search) params.set('search', search)
      if (time && time !== 'all') params.set('time', time)
    
      const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname
      router.replace(newUrl, { scroll: false })
    }
    updateUrlParams(debouncedSearchTerm, timeFilter)
  }, [debouncedSearchTerm, timeFilter, pathname, router])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting)
      },
      {
        threshold: 0.1, 
        rootMargin: '-100px 0px 0px 0px'
      }
    )

    if (heroRef.current) {
      observer.observe(heroRef.current)
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current)
      }
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const clearFilters = () => {
    setSearchInput("")
    setTimeFilter("")
    showToast({
      type: "info",
      title: "Filters cleared",
      description: "Showing all recipes"
    })
  }



  return (
    <div className="min-h-screen bg-gray-900">
      {/* Sticky Navigation - shown when hero is out of view */}
      <motion.div 
        className="bg-gray-900/40 backdrop-blur-xl sticky top-0 z-50 transition-all duration-300 border-b border-gray-700/50"
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: isHeroVisible ? -100 : 0,
          opacity: isHeroVisible ? 0 : 1
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div 
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: isHeroVisible ? 0 : 1,
                x: isHeroVisible ? -20 : 0
              }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="w-10 h-10 bg-primary/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-primary/30">
                <ChefHat className="w-6 h-6 text-primary" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-heading">
                Recipe<span className="text-accent">Hub</span>
              </span>
            </motion.div>

            {/* Compact Search Bar */}
            <motion.div 
              className="flex-1 max-w-md mx-6"
              initial={{ opacity: 0, y: -10 }}
              animate={{ 
                opacity: isHeroVisible ? 0 : 1,
                y: isHeroVisible ? -10 : 0
              }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <div className="relative">
                <Search className="absolute  left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search recipes..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="pl-10 font-mono text-xs sm:text-sm bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-primary rounded-xl"
                />
              </div>
            </motion.div>


          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-8 sm:py-16">
        {/* Hero Section */}
        <motion.div
          ref={heroRef}
          className="text-center mb-12 sm:mb-16"
          variants={heroVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="mb-8">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <motion.div className="relative">
                <motion.div 
                  className="size-24 bg-primary/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-primary/30 shadow-lg shadow-primary/20"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <ChefHat className="size-14 text-primary" />
                </motion.div>
                <div className="absolute -top-1 -right-1 size-8 bg-accent rounded-full flex items-center justify-center">
                  <Plus size={20} strokeWidth={3} className="text-black" />
                </div>
              </motion.div>
            </div>
            
            <h1 className="text-display text-sm font-heading tracking-tight text-white mb-6 leading-tight">
              Recipe<span className="text-accent">Hub</span>
            </h1>
            <p className="text-subtitle text-gray-300 max-w-2xl mx-auto font-body leading-relaxed">
              Discover extraordinary flavors and create culinary masterpieces with our premium collection of 
              <span className="text-accent font-semibold font-heading"> chef-approved recipes</span>
            </p>
          </motion.div>

          {/* Search and Filter Section */}
          <motion.div
            className="max-w-4xl mx-auto"
            variants={itemVariants}
          >
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                <Input
                  type="text"
                  placeholder="Search by recipe name, ingredient, or cuisine..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="pl-12 pr-4 py-4 bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 
                           focus:border-primary rounded-xl backdrop-blur-sm hover:bg-gray-800/70 
                           transition-all duration-300 touch-target text-xs sm:text-sm font-mono shadow-2xl shadow-primary/20 
                           hover:shadow-primary/40 focus:shadow-primary/60 hover:border-primary/60 "
                />
                {searchInput && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSearchInput("")}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:bg-gray-700/40 rounded-full hover:text-white touch-target"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
              
              <div className="flex gap-4 font-mono">
                <Select value={timeFilter} onValueChange={setTimeFilter}>
                  <SelectTrigger className="w-48 text-xs sm:text-sm font-mono bg-gray-800/50 border-gray-600 text-white rounded-xl backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300 touch-target shadow-2xl shadow-primary/20 hover:shadow-primary/40 focus:shadow-primary/60 hover:border-primary/60">
                    <Filter className="w-4 h-4 mr-2 text-gray-400" />
                    <SelectValue placeholder="Cooking time" className="text-xs sm:text-sm" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 text-white rounded-xl border-gray-600 font-mono text-xs sm:text-sm">
                    <SelectItem className="rounded-xl text-xs sm:text-sm" value="all">All times</SelectItem>
                    <SelectItem className="rounded-xl text-xs sm:text-sm" value="quick">Quick (under 30 min)</SelectItem>
                    <SelectItem className="rounded-xl text-xs sm:text-sm" value="medium">Medium (30-60 min)</SelectItem>
                    <SelectItem className="rounded-xl text-xs sm:text-sm" value="long">Long (60+ min)</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  onClick={clearFilters}
                  disabled={!searchInput && !timeFilter}
                  className={cn(
                    "font-mono bg-gray-800/50 text-xs sm:text-sm  hover:text-gray-900 rounded-xl touch-target transition-all duration-300 ",
                    (!searchInput && !timeFilter) ? "opacity-50 text-gray-400 cursor-not-allowed" : "hover:text-accent/50 text-accent/60 bg-accent/10 hover:bg-accent/20 border-accent/50 shadow-2xl shadow-accent/20 hover:shadow-accent/40 focus:shadow-accent/60 hover:border-accent/60"
                  )}
                >
                  <FunnelX className="w-4 h-4" />
                  Clear filters
                </Button>
              </div>
            </div>


          </motion.div>
        </motion.div>

        {/* Results Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {error && (
            <motion.div 
              className="text-center py-12"
              variants={itemVariants}
            >
              <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-6 max-w-md mx-auto">
                <p className="text-red-400 font-body">Failed to load recipes. Please try again.</p>
              </div>
            </motion.div>
          )}

          {isLoading || isSearching ? (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
              variants={gridVariants}
            >
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  variants={skeletonVariants}
                >
                  <RecipeCardSkeleton />
                </motion.div>
              ))}
            </motion.div>
          ) : recipes.length > 0 ? (
            <>
              {/* Results header */}
              <motion.div 
                className="flex items-center justify-between mb-8"
                variants={itemVariants}
              >
                <div>
                  <h2 className="text-2xl font-bold text-white font-heading">
                    {searchInput || timeFilter ? 'Search Results' : 'Featured Recipes'}
                  </h2>
                  <p className="text-gray-400 mt-1 font-body">
                    {recipes.length} {recipes.length === 1 ? 'recipe' : 'recipes'} found
                  </p>
                </div>
                
                {recipes.length > 0 && (
                  <div className="flex items-center space-x-2 text-sm text-gray-400 font-mono">
                    <span>Sorted by relevance</span>
                  </div>
                )}
              </motion.div>

              {/* Recipe Grid */}
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
                variants={gridVariants}
              >
                {recipes.map((recipe, index) => (
                  <motion.div
                    key={recipe.id}
                    variants={itemVariants}
                  >
                    <RecipeCard recipe={recipe} index={index} />
                  </motion.div>
                ))}
              </motion.div>
            </>
          ) : (
            <motion.div 
              className="text-center py-16"
              variants={itemVariants}
            >
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-12 h-12 text-gray-600" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 font-heading">No recipes found</h3>
                <p className="text-gray-400 mb-6 font-body text-sm">
                  Try adjusting your search terms or filters to find more recipes.
                </p>
                <Button
                  onClick={clearFilters}
                  className="bg-primary/10 py-2 px-4 border border-primary/30 hover:bg-primary/30 hover:border-primary/70 hover:shadow-primary/40 shadow-2xl shadow-primary/20 text-white rounded-xl font-mono text-xs sm:text-sm transition-all duration-300"
                >
                  <span className="flex items-center space-x-2">
                    <ArrowRight className="w-4 h-4" />
                    <span>View all recipes</span>
                  </span>
                </Button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Floating Action Buttons */}
      <FloatingActionButton
        icon={ArrowUp}
        onClick={scrollToTop}
        label="Scroll to top"
        position="bottom-right"
      />
      
      {(searchInput || timeFilter) && (
        <FloatingActionButton
          icon={X}
          onClick={clearFilters}
          label="Clear all filters"
          variant="secondary"
          position="bottom-left"
        />
      )}
    </div>
  )
} 