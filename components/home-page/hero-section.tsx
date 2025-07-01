'use client'

import { motion } from 'framer-motion'
import { ChefHat, Plus, Filter, FunnelX } from 'lucide-react'
import { SearchBar } from './search-bar'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'

interface HeroSectionProps {
  searchInput: string
  setSearchInput: (value: string) => void
  timeFilter: string
  setTimeFilter: (value: string) => void
  clearFilters: () => void
}

const heroVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1] as const
    }
  }
}

const itemVariants = {
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

export function HeroSection({ 
  searchInput, 
  setSearchInput, 
  timeFilter, 
  setTimeFilter, 
  clearFilters 
}: HeroSectionProps) {
  return (
    <motion.div
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
          Discover <span className="text-accent font-semibold font-heading">extraordinary flavors</span> and create culinary masterpieces with our premium collection of 
          <span className="text-accent font-semibold font-heading"> chef-approved recipes</span>.
        </p>
      </motion.div>

      {/* Search and Filter Section */}
      <motion.div
        className="max-w-4xl mx-auto"
        variants={itemVariants}
      >
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <SearchBar
            value={searchInput}
            onChange={setSearchInput}
            placeholder="Search by recipe name, ingredient, or cuisine..."
            className="flex-1"
          />
          
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
                "font-mono bg-gray-800/50 text-xs sm:text-sm hover:text-gray-900 rounded-xl touch-target transition-all duration-300",
                (!searchInput && !timeFilter) 
                  ? "opacity-50 text-gray-400 cursor-not-allowed" 
                  : "hover:text-accent/50 text-accent/60 bg-accent/10 hover:bg-accent/20 border-accent/50 shadow-2xl shadow-accent/20 hover:shadow-accent/40 focus:shadow-accent/60 hover:border-accent/60"
              )}
            >
              <FunnelX className="w-4 h-4" />
              Clear filters
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
} 