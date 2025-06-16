'use client';

import Image from "next/image"
import Link from "next/link"
import { Clock, Users, Star, ChefHat, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Recipe } from "@/types/recipe"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { motion } from "framer-motion"

interface RecipeCardProps {
  recipe: Recipe
  index?: number
}

export default function RecipeCard({ recipe, index = 0 }: RecipeCardProps) {
  const [loaded, setLoaded] = useState(false);
  
  const getTimeColor = (time: string) => {
    const minutes = Number.parseInt(time)
    if (minutes <= 30) return "bg-accent text-gray-900"
    if (minutes <= 60) return "bg-primary text-white"
    return "bg-gray-700 text-white"
  }

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
          className="bg-gray-800 backdrop-blur-xl rounded-xl border h-full border-gray-700 overflow-hidden transition-all duration-500 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20"
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
                  "w-full h-52 object-cover opacity-80",
                  loaded ? "fade-in" : "opacity-0"
                )}
                onLoad={() => setLoaded(true)}
              />
            </motion.div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-gray-800 via-gray-900/40 to-transparent"></div>

            <motion.div 
              className="absolute top-4 right-4"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.05, duration: 0.4 }}
              viewport={viewportSettings}
            >
              <Badge className={`${getTimeColor(recipe.cookingTime)} font-semibold shadow-lg`}>
                <Clock className="w-3 h-3 mr-1" />
                {recipe.cookingTime}
              </Badge>
            </motion.div>

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
                    <Star className="w-4 h-4 fill-accent text-accent" />
                  </motion.div>
                ))}
              </div>
            </motion.div>

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
              <div className="w-10 h-10 bg-primary/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-primary/30 shadow-lg shadow-primary/20">
                <ChefHat className="w-5 h-5 text-primary" />
              </div>
            </motion.div>
          </div>

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
              className="text-xl font-bold text-white mb-4 group-hover:text-accent transition-colors duration-300 line-clamp-2"
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
                <span className="text-sm font-medium">{recipe.servings} servings</span>
              </div>
              <motion.div 
                className="flex items-center space-x-2 bg-primary/20 px-3 py-1 rounded-full border border-primary/30"
              >
                <Sparkles className="w-3 h-3 text-primary" />
                <span className="text-xs text-primary font-semibold">Premium</span>
              </motion.div>
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
              <p className="text-sm text-gray-400 font-medium">Key Ingredients:</p>
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
                  >
                    <Badge
                      variant="secondary"
                      className="text-xs bg-gray-700/50 text-gray-300 hover:bg-primary/20 hover:text-primary transition-colors duration-300 border border-gray-600"
                    >
                      {ingredient}
                    </Badge>
                  </motion.div>
                ))}
                {recipe.ingredients.length > 3 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      delay: 0.6 + index * 0.05 + 3 * 0.05, 
                      duration: 0.3,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                    viewport={viewportSettings}
                  >
                    <Badge variant="secondary" className="text-xs bg-accent/20 text-accent font-semibold border border-accent/30">
                      +{recipe.ingredients.length - 3} more
                    </Badge>
                  </motion.div>
                )}
              </div>
            </motion.div>

            <motion.div 
              className="mt-6 pt-4 border-t border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 0.7 + index * 0.05, 
                duration: 0.4 
              }}
              viewport={viewportSettings}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400 font-medium">{recipe.instructions.length} steps</span>
                <motion.div 
                  className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300 border border-primary/30 shadow-lg shadow-primary/20"  
                >
                  <motion.svg 
                    className="w-4 h-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </motion.svg>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </Link>
    </motion.div>
  )
}
