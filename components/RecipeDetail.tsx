"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Clock, Users, ChefHat, CheckCircle, Star, ArrowLeft, Play, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Recipe } from "@/types/recipe"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface RecipeDetailProps {
  recipe: Recipe
}

export default function RecipeDetail({ recipe }: RecipeDetailProps) {
  const [loaded, setLoaded] = useState(false);
  const router = useRouter()
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [checkedIngredients, setCheckedIngredients] = useState<number[]>([])
  const [isHeroVisible, setIsHeroVisible] = useState(true)
  const heroRef = useRef<HTMLDivElement>(null)

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

  const toggleStep = (stepIndex: number) => {
    setCompletedSteps((prev) => (prev.includes(stepIndex) ? prev.filter((i) => i !== stepIndex) : [...prev, stepIndex]))
  }

  const toggleIngredient = (ingredientIndex: number) => {
    setCheckedIngredients((prev) =>
      prev.includes(ingredientIndex) ? prev.filter((i) => i !== ingredientIndex) : [...prev, ingredientIndex],
    )
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navigation */}
      <div className="bg-gray-900/40 backdrop-blur-xl sticky top-0 z-50 transition-all duration-300">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex flex-row sm:items-center sm:justify-start space-x-4">
            <Button
              onClick={() => router.back()}
              variant="ghost"
              className="text-white bg-gray-900/50 hover:bg-accent/20 hover:text-accent border border-gray-700 hover:border-accent rounded-xl transition-all duration-300 self-center"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              <span className="text-sm sm:text-base flex flex-row">Back&nbsp;<span className="hidden sm:block"> to Recipes</span></span>
            </Button>
            
            {/* Recipe info shown when hero is out of view */}
            <motion.div 
              className="flex items-center justify-between sm:justify-end"
              initial={{ opacity: 0, x: 20 }}
              animate={{ 
                opacity: isHeroVisible ? 0 : 1, 
                x: isHeroVisible ? 20 : 0 
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="flex-1 sm:text-left">
                <h2 className="text-base sm:text-lg font-bold text-white truncate max-w-[200px] sm:max-w-xs">
                  {recipe.name}
                </h2>
                <div className="flex items-center space-x-3 sm:space-x-4 text-xs sm:text-sm text-gray-300 sm:justify-start">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                    <span>{recipe.cookingTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-3 h-3 sm:w-4 sm:h-4 text-accent" />
                    <span>{recipe.servings} servings</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div className="container mx-auto px-4 py-4 sm:py-8" 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.3, ease: "easeIn" }}>
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div ref={heroRef} className="relative mb-6 sm:mb-8 animate-fade-in">
            <div className="relative h-[45vh] sm:h-[60vh] rounded-xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
              <Image 
                src={recipe.image || "/placeholder.svg"} 
                alt={recipe.name} 
                fill 
                className={cn("object-cover opacity-80", loaded ? "fade-in" : "opacity-0")} 
                onLoad={() => setLoaded(true)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
              
              {/* Floating elements - adjusted for mobile */}
              <div className="absolute top-4 sm:top-6 left-4 sm:left-6">
                <div className="flex items-center space-x-1 mb-2 sm:mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 sm:w-5 sm:h-5 fill-accent text-accent" />
                  ))}
                </div>
                <Badge className="bg-primary/60 text-white backdrop-blur-sm border border-white/30 text-xs sm:text-sm">
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Premium Recipe
                </Badge>
              </div>
              
              <div className="absolute top-4 sm:top-6 right-4 sm:right-6">
                <div className="w-10 h-10 sm:w-14 sm:h-14 bg-primary/20 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center border border-primary/30">
                  <ChefHat className="w-5 h-5 sm:w-7 sm:h-7 text-primary" />
                </div>
              </div>

              {/* Main content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8">
                <div className="max-w-4xl">
                  <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black text-white mb-3 sm:mb-4 leading-tight tracking-tight">
                    {recipe.name}
                  </h1>
                  <p className="text-base sm:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl">
                    A premium culinary experience crafted for perfection
                  </p>
                  
                  <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                    <div className="flex items-center space-x-2 sm:space-x-3 bg-gray-900/60 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl border border-gray-700">
                      <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      <span className="text-white font-semibold text-sm sm:text-base">{recipe.cookingTime}</span>
                    </div>
                    <div className="flex items-center space-x-2 sm:space-x-3 bg-gray-900/60 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl border border-gray-700">
                      <Users className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                      <span className="text-white font-semibold text-sm sm:text-base">{recipe.servings} servings</span>
                    </div>
                    <div className="flex items-center space-x-2 sm:space-x-3 bg-primary/20 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl border border-primary/30">
                      <Play className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      <span className="text-primary font-semibold text-sm sm:text-base">{recipe.instructions.length} steps</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Ingredients */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700 p-4 sm:p-6 sticky top-32 animate-slide-up">
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/20 rounded-xl sm:rounded-2xl flex items-center justify-center mr-3 border border-primary/30">
                    <ChefHat className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">Ingredients</h2>
                </div>

                <div className="space-y-2">
                  {recipe.ingredients.map((ingredient, index) => (
                    <div
                      key={index}
                      className={`flex items-center p-2 sm:p-3 rounded-xl cursor-pointer transition-all duration-300 border ${
                        checkedIngredients.includes(index)
                          ? "bg-primary/20 border-primary/50 shadow-lg shadow-primary/20"
                          : "bg-gray-800/30 hover:bg-gray-700/50 border-gray-600 hover:border-gray-500"
                      }`}
                      onClick={() => toggleIngredient(index)}
                    >
                      <div
                        className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center mr-2 sm:mr-3 transition-all duration-300 ${
                          checkedIngredients.includes(index) 
                            ? "bg-primary border-primary" 
                            : "border-gray-500 hover:border-primary"
                        }`}
                      >
                        {checkedIngredients.includes(index) && <CheckCircle className="w-2 h-2 sm:w-3 sm:h-3 text-white" />}
                      </div>
                      <span
                        className={`font-medium transition-all duration-300 text-xs sm:text-sm ${
                          checkedIngredients.includes(index) 
                            ? "line-through text-primary" 
                            : "text-gray-200 hover:text-white"
                        }`}
                      >
                        {ingredient}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-700">
                  <p className="text-xs text-gray-400 text-center mb-2 sm:mb-3">
                    {checkedIngredients.length} of {recipe.ingredients.length} ingredients ready
                  </p>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(checkedIngredients.length / recipe.ingredients.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="lg:col-span-2">
              <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700 p-4 sm:p-6 animate-slide-up">
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent/20 rounded-xl sm:rounded-2xl flex items-center justify-center mr-3 border border-accent/30">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">Instructions</h2>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  {recipe.instructions.map((instruction, index) => (
                    <div
                      key={index}
                      className={`flex items-start p-3 sm:p-4 rounded-xl cursor-pointer transition-all duration-300 border ${
                        completedSteps.includes(index)
                          ? "bg-accent/20 border-accent/50 shadow-lg shadow-accent/20"
                          : "bg-gray-800/30 hover:bg-gray-700/50 border-gray-600 hover:border-gray-500"
                      }`}
                      onClick={() => toggleStep(index)}
                    >
                      <div
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mr-3 sm:mr-4 font-bold text-sm sm:text-base transition-all duration-300 border ${
                          completedSteps.includes(index)
                            ? "bg-accent text-gray-900 border-accent shadow-lg shadow-accent/30"
                            : "bg-gray-800 text-primary border-primary hover:bg-primary hover:text-white"
                        }`}
                      >
                        {completedSteps.includes(index) ? <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" /> : index + 1}
                      </div>
                      <div className="flex-1">
                        <p
                          className={`text-sm sm:text-base leading-relaxed transition-all duration-300 ${
                            completedSteps.includes(index) 
                              ? "text-accent font-medium" 
                              : "text-gray-200 hover:text-white"
                          }`}
                        >
                          {instruction}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {completedSteps.length === recipe.instructions.length && (
                  <div className="mt-4 sm:mt-6 p-4 sm:p-6 bg-gradient-to-br from-primary to-accent rounded-2xl sm:rounded-3xl text-center animate-scale-in border border-accent/30 shadow-2xl shadow-accent/20">
                    <div className="text-gray-900">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                        <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-gray-900" />
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-black mb-2 sm:mb-3">Congratulations!</h3>
                      <p className="text-base sm:text-lg font-medium">You&apos;ve completed this amazing recipe! 🎉</p>
                    </div>
                  </div>
                )}

                <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-700">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 sm:mb-3 space-y-2 sm:space-y-0">
                    <p className="text-gray-400 font-medium text-xs sm:text-sm">
                      {completedSteps.length} of {recipe.instructions.length} steps completed
                    </p>
                    <Button
                      onClick={() => setCompletedSteps([])}
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary hover:text-white bg-transparent rounded-xl text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-2"
                    >
                      Reset Progress
                    </Button>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(completedSteps.length / recipe.instructions.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
