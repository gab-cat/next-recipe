"use client"

import { useState, useRef, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { useDebounce } from "use-debounce"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { ArrowUp, X, ArrowRight } from "lucide-react"
import RecipeCard from "@/components/RecipeCard"
import RecipeCardSkeleton from "@/components/home-page/recipe-card-skeleton"
import FloatingActionButton from "@/components/ui/floating-action-button"
import { StickyNavbar } from "@/components/shared/sticky-navbar"
import { HeroSection } from "@/components/home-page/hero-section"
import { SearchBar } from "@/components/home-page/search-bar"
import { Button } from "@/components/ui/button"
import { showToast } from "@/lib/toast"
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
      ease: [0.4, 0, 0.2, 1] as const
    }
  }
}

const gridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1] as const
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
      ease: [0.4, 0, 0.2, 1] as const
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
      {/* Sticky Navigation with Auth */}
      <StickyNavbar isVisible={!isHeroVisible}>
        <SearchBar
          value={searchInput}
          onChange={setSearchInput}
          placeholder="Search recipes..."
          compact
        />
      </StickyNavbar>

      <div className="container mx-auto px-4 py-8 sm:py-16">
        {/* Hero Section */}
        <div ref={heroRef}>
          <HeroSection
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            timeFilter={timeFilter}
            setTimeFilter={setTimeFilter}
            clearFilters={clearFilters}
          />
        </div>

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
              {[...Array(8)].map((_, i) => (
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
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] as const }}
            >
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <X className="w-12 h-12 text-gray-600" />
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