'use client';

import Image from "next/image"
import Link from "next/link"
import { Clock, Users, Star, ChefHat, Sparkles, BookOpen } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Recipe } from "@/types/recipe"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { motion } from "framer-motion"

interface RecipeCardProps {
  recipe: Recipe
  index?: number
}

// Helper functions
const calculateReadingTime = (recipe: Recipe): number => {
  const wordsPerMinute = 200
  const instructionWords = recipe.instructions.join(' ').split(' ').length
  const ingredientWords = recipe.ingredients.join(' ').split(' ').length
  const totalWords = instructionWords + ingredientWords
  return Math.ceil(totalWords / wordsPerMinute)
}

const getDifficulty = (recipe: Recipe): 'easy' | 'medium' | 'hard' => {
  const cookingMinutes = parseInt(recipe.cookingTime)
  const instructionCount = recipe.instructions.length
  
  if (cookingMinutes <= 30 && instructionCount <= 7) return 'easy'
  if (cookingMinutes <= 60 && instructionCount <= 9) return 'medium'
  return 'hard'
}

const getDifficultyColors = (diff: string) => {
  switch (diff) {
  case 'easy': return 'difficulty-easy text-white'
  case 'medium': return 'difficulty-medium text-white'
  case 'hard': return 'difficulty-hard text-white'
  default: return 'bg-gray-600 text-white'
  }
}

export default function RecipeCard({ recipe, index = 0 }: RecipeCardProps) {
  const [loaded, setLoaded] = useState(false);
  
  const getTimeColor = (time: string) => {
    const minutes = Number.parseInt(time)
    if (minutes <= 30) return "bg-accent text-gray-900"
    if (minutes <= 60) return "bg-primary text-white"
    return "bg-gray-700 text-white"
  }

  const difficulty = getDifficulty(recipe)
  const readingTime = calculateReadingTime(recipe)

  const viewportSettings = {
    once: true,
    margin: "100px",
    amount: 0.1 
  }

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        y: 60, 
        scale: 0.8,
        rotateX: 15
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0, 
        scale: 1,
        rotateX: 0
      }}
      viewport={viewportSettings}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.4, 0, 0.2, 1],
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      className="group perspective-1000 h-full"
    >
      <Link href={`/recipes/${recipe.id}`}>
        <motion.div 
          className="bg-gray-800 backdrop-blur-xl rounded-xl border h-full border-gray-900 overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/30 hover-lift"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="relative overflow-hidden">
            <motion.div
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="relative"
            >
              <Image
                src={recipe.image || "/placeholder.svg"}
                alt={recipe.name}
                width={400}
                height={250}
                className={cn(
                  "w-full h-52 object-cover opacity-0 blur-up transition-all duration-300",
                  loaded ? "loaded hover-scale fade-in" : ""
                )}
                onLoad={() => setLoaded(true)}
              />
            </motion.div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-gray-800 via-gray-900/40 to-transparent group-hover:from-gray-800 group-hover:via-gray-800/40 transition-all duration-300"></div>

            {/* Time and Difficulty Badges */}
            <motion.div 
              className="absolute top-4 right-4 flex flex-col space-y-2"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.05, duration: 0.4 }}
              viewport={viewportSettings}
            >
              <Badge className={`${getTimeColor(recipe.cookingTime)} rounded-lg font-semibold shadow-lg font-mono`}>
                <Clock className="w-3 h-3 mr-1" />
                {recipe.cookingTime}
              </Badge>
              <Badge className={`${getDifficultyColors(difficulty)} rounded-lg font-semibold shadow-lg font-mono text-xs`}>
                {difficulty.toUpperCase()}
              </Badge>
            </motion.div>

            {/* Hover stars animation */}
            <motion.div 
              className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"  
            >
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      delay: 0.4 + index * 0.05 + i * 0.1, 
                      duration: 0.3,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                    viewport={viewportSettings}
                  >
                    <Star className="w-4 h-4 fill-accent text-accent hover-scale" />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Chef hat icon */}
            <motion.div 
              className="absolute top-4 left-4"
              initial={{ opacity: 0, scale: 0, rotate: -90 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ 
                delay: 0.1 + index * 0.05, 
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1]
              }}
              viewport={viewportSettings}
            >
              <div className="w-10 h-10 bg-primary/30 backdrop-blur-md rounded-2xl flex items-center justify-center border border-primary/30 shadow-lg shadow-primary/20 hover-scale">
                <ChefHat className="w-5 h-5 text-primary" />
              </div>
            </motion.div>
          </div>

          {/* Card content */}
          <motion.div 
            className="p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: 0.3 + index * 0.05, 
              duration: 0.5,
              ease: [0.4, 0, 0.2, 1]
            }}
            viewport={viewportSettings}
          >
            <motion.h3 
              className="text-xl font-bold text-white mb-4 group-hover:text-accent transition-colors duration-300 line-clamp-2 font-heading"
            >
              {recipe.name}
            </motion.h3>

            <motion.div 
              className="flex items-center justify-between mb-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ 
                delay: 0.4 + index * 0.05, 
                duration: 0.4 
              }}
              viewport={viewportSettings}
            >
              <div className="flex items-center text-gray-300">
                <Users className="w-4 h-4 mr-2 text-accent" />
                <span className="text-sm font-medium font-mono">{recipe.servings} servings</span>
              </div>
              <div className="flex items-center space-x-2">
                <motion.div 
                  className="flex items-center space-x-2 bg-primary/20 px-3 py-1 rounded-full border border-primary/30"
                >
                  <Sparkles className="w-3 h-3 text-primary" />
                  <span className="text-xs text-primary font-semibold font-mono">Premium</span>
                </motion.div>
                <div className="flex items-center space-x-1 bg-gray-700/50 px-2 py-1 rounded-lg">
                  <BookOpen className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-400 font-mono">{readingTime}m</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 0.5 + index * 0.05, 
                duration: 0.4 
              }}
              viewport={viewportSettings}
            >
              <p className="text-xs text-gray-400 font-medium font-body">Key Ingredients:</p>
              <div className="flex flex-wrap gap-2">
                {recipe.ingredients.slice(0, 3).map((ingredient, badgeIndex) => (
                  <motion.div
                    key={badgeIndex}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      delay: 0.6 + index * 0.05 + badgeIndex * 0.05, 
                      duration: 0.3,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                    viewport={viewportSettings}
                    whileHover={{ scale: 1.1 }}
                  >
                    <Badge
                      variant="secondary"
                      className="text-xs rounded-lg bg-gray-700/50 text-gray-300 hover:bg-primary/20 hover:text-primary transition-colors duration-300 border border-gray-600 font-body"
                    >
                      {ingredient.split(' ').slice(-1)[0]}
                    </Badge>
                  </motion.div>
                ))}
                {recipe.ingredients.length > 3 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      delay: 0.75 + index * 0.05, 
                      duration: 0.3,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                    viewport={viewportSettings}
                  >
                    <Badge
                      variant="secondary"
                      className="text-xs rounded-lg bg-accent/20 text-accent border border-accent/30 font-mono"
                    >
                      +{recipe.ingredients.length - 3}
                    </Badge>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Simple step indicator */}
            <motion.div 
              className="mt-6 pt-4 border-t border-gray-700/50"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 0.7 + index * 0.05, 
                duration: 0.3 
              }}
              viewport={viewportSettings}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    {[...Array(Math.min(recipe.instructions.length, 5))].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-primary/40"
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ 
                          delay: 0.8 + index * 0.05 + i * 0.05, 
                          duration: 0.2 
                        }}
                        viewport={viewportSettings}
                      />
                    ))}
                    {recipe.instructions.length > 5 && (
                      <span className="text-xs text-gray-500 ml-1 font-mono">+{recipe.instructions.length - 5}</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-1 text-gray-500">
                  <span className="text-xs font-mono">{recipe.instructions.length}</span>
                  <span className="text-xs">steps</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </Link>
    </motion.div>
  )
}
