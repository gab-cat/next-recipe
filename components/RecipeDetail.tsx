"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Clock, Users, ChefHat, CheckCircle, Star, ArrowLeft, Play, Sparkles, ArrowUp, BookOpen, Timer, Share2, RotateCcw, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Recipe } from "@/types/recipe"
import { cn } from "@/lib/utils"
import { motion, useScroll, useTransform } from "framer-motion"
import { showToast } from "@/lib/toast"
import ProgressRing from "@/components/ui/progress-ring"
import FloatingActionButton from "@/components/ui/floating-action-button"
import ConfettiExplosion from "react-confetti-explosion"

interface RecipeDetailProps {
  recipe: Recipe
}



// Reading time calculator
const calculateReadingTime = (recipe: Recipe): number => {
  const wordsPerMinute = 200
  const instructionWords = recipe.instructions.join(' ').split(' ').length
  const ingredientWords = recipe.ingredients.join(' ').split(' ').length
  const totalWords = instructionWords + ingredientWords
  return Math.ceil(totalWords / wordsPerMinute)
}

// Difficulty calculator based on cooking time and instruction count
const getDifficulty = (recipe: Recipe): 'easy' | 'medium' | 'hard' => {
  const cookingMinutes = parseInt(recipe.cookingTime)
  const instructionCount = recipe.instructions.length
  
  if (cookingMinutes <= 30 && instructionCount <= 5) return 'easy'
  if (cookingMinutes <= 60 && instructionCount <= 8) return 'medium'
  return 'hard'
}

export default function RecipeDetail({ recipe }: RecipeDetailProps) {
  const [loaded, setLoaded] = useState(false);
  const router = useRouter()
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [checkedIngredients, setCheckedIngredients] = useState<number[]>([])
  const [isHeroVisible, setIsHeroVisible] = useState(true)
  const [showConfetti, setShowConfetti] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()

  // Parallax transforms
  const yBg = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0.35])
  const badgeOpacity = useTransform(scrollY, [0, 300], [1, 0])
  const bottomOpacity = useTransform(scrollY, [0, 300], [1, 0.75])

  const difficulty = getDifficulty(recipe)
  const readingTime = calculateReadingTime(recipe)

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

  const toggleStep = useCallback((stepIndex: number) => {
    setCompletedSteps((prev) => {
      const newCompleted = prev.includes(stepIndex) 
        ? prev.filter((i) => i !== stepIndex) 
        : [...prev, stepIndex]
      
      return newCompleted
    })
  }, [])

  // Separate effect to handle completion detection
  useEffect(() => {
    if (completedSteps.length === recipe.instructions.length && completedSteps.length > 0) {
      setShowConfetti(true)
      showToast({
        type: "success",
        title: "Recipe Complete! 🎉",
        description: "You've finished all the cooking steps!"
      })
      setTimeout(() => setShowConfetti(false), 3000)
    }
  }, [completedSteps.length, recipe.instructions.length])

  const toggleIngredient = useCallback((ingredientIndex: number) => {
    setCheckedIngredients((prev) => {
      const newChecked = prev.includes(ingredientIndex) 
        ? prev.filter((i) => i !== ingredientIndex) 
        : [...prev, ingredientIndex]
      
      return newChecked
    })
    showToast({
      type: "success",
      title: "Ingredient added!",
      description: "Ready to cook!"
    })
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const shareRecipe = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: recipe.name,
          text: `Check out this amazing recipe for ${recipe.name}!`,
          url: window.location.href,
        })
        showToast({
          type: "success",
          title: "Recipe shared!",
          description: "Thanks for sharing this delicious recipe!"
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      showToast({
        type: "success",
        title: "Link copied!",
        description: "Recipe link copied to clipboard!"
      })
    }
  }

  const getDifficultyColors = (diff: string) => {
    switch (diff) {
    case 'easy': return 'difficulty-easy text-white'
    case 'medium': return 'difficulty-medium text-white'
    case 'hard': return 'difficulty-hard text-white'
    default: return 'bg-gray-600 text-white'
    }
  }

  const ingredientProgress = (checkedIngredients.length / recipe.ingredients.length) * 100
  const stepProgress = (completedSteps.length / recipe.instructions.length) * 100

  return (
    <div className="min-h-screen bg-gray-900">
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <ConfettiExplosion
            force={0.8}
            duration={3000}
            particleCount={250}
            width={1600}
            colors={['#adfc03', '#1d43d8', '#ffffff', '#ffd700']}
          />
        </div>
      )}
      
      {/* Navigation */}
      <div className="bg-gray-900/40 backdrop-blur-xl sticky top-0 z-20">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex flex-col">
            
            <div className="flex flex-row py-2 sm:py-4 items-center justify-between h-[60px] sm:h-[72px]">
              <Button
                onClick={() => router.back()}
                variant="ghost"
                className="text-white self-center font-mono shadow-2xl shadow-accent/20 hover:shadow-accent/40 bg-gray-900/50 hover:bg-accent/20 hover:text-accent border border-gray-700 hover:border-accent rounded-xl transition-all duration-300 px-3 py-2 sm:px-4 sm:py-2"
              >
                <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="text-xs sm:text-sm">Back <span className="hidden sm:inline">to Recipes</span></span>
              </Button>
              
              {/* Recipe info shown when hero is out of view*/}
              <div className="flex items-center flex-1 justify-end ml-3">
                <motion.div 
                  className="text-right"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: isHeroVisible ? 0 : 1
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <h2 className="text-lg sm:text-2xl font-heading font-bold text-white truncate max-w-[180px] sm:max-w-xs">
                    {recipe.name}
                  </h2>
                  <div className="flex font-mono items-center justify-end space-x-2 sm:space-x-4 text-xs sm:text-sm text-gray-300">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-primary" />
                      <span>{recipe.cookingTime}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-3 h-3 text-accent" />
                      <span className="hidden xs:inline">{recipe.servings} servings</span>
                      <span className="xs:hidden">{recipe.servings}</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <motion.div className="container mx-auto px-3 sm:px-4 py-3 sm:py-8" 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.3, ease: "easeIn" }}>
        <div className="max-w-7xl mx-auto">
          {/* Hero Section with Parallax  */}
          <motion.div 
            className="relative mb-4 sm:mb-8 animate-fade-in parallax border-none"
            style={{ y: yBg }}
          >
            <div className="relative h-[35vh] sm:h-[60vh] rounded-xl border-none rounded-b-none overflow-hidden bg-gradient-to-t from-gray-800 to-gray-900">
              <motion.div style={{ opacity }}>
                <Image 
                  src={recipe.image ?? "/placeholder.svg"} 
                  alt={recipe.name} 
                  fill={true}
                  objectFit="cover"
                  className={cn("object-cover opacity-0 rounded-xl rounded-b-none border-none blur-up", loaded ? "loaded fade-in" : "")} 
                  onLoad={() => setLoaded(true)}
                />
              </motion.div>
              <div className="absolute border-none inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
              
              {/* Floating elements */}
              <motion.div style={{ opacity: badgeOpacity }} className="absolute top-3 sm:top-6 left-3 sm:left-6">
                <div className="flex items-center space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 sm:w-5 sm:h-5 fill-accent text-accent hover-scale" />
                  ))}
                </div>
                <div className="flex flex-col space-y-1 sm:space-y-2">
                  <Badge className="hidden sm:flex bg-primary/60 rounded-lg text-white backdrop-blur-sm border border-white/30 text-xs px-2 py-1">
                    <Sparkles className="w-3 h-3 mr-1" />
                    <span className="hidden xs:inline">Premium Recipe</span>
                    <span className="xs:hidden">Premium</span>
                  </Badge>
                  <Badge className={`${getDifficultyColors(difficulty)} hidden sm:block rounded-lg backdrop-blur-sm border border-white/30 text-xs font-mono px-2 py-1`}>
                    {difficulty.toUpperCase()}
                  </Badge>
                </div>
              </motion.div>
              
              <motion.div style={{ opacity: badgeOpacity }} className="absolute top-3 sm:top-6 right-3 sm:right-6">
                <div className="flex flex-col space-y-2 items-end">
                  <div className="w-8 h-8 sm:w-14 sm:h-14 bg-primary/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-primary/30">
                    <ChefHat className="w-4 h-4 sm:w-7 sm:h-7 text-primary" />
                  </div>
                  <div className="flex items-center space-x-1 bg-gray-900/60 backdrop-blur-sm px-2 py-1 rounded-lg text-xs text-gray-300">
                    <BookOpen className="w-3 h-3" />
                    <span className="hidden xs:inline">{readingTime} min read</span>
                    <span className="xs:hidden">{readingTime}m</span>
                  </div>
                </div>
              </motion.div>

              {/* Main content */}
              <motion.div style={{ opacity: bottomOpacity }} className="absolute bottom-0 left-0 right-0 p-3 sm:p-8">
                <div className="max-w-4xl">
                  <h1 ref={heroRef} className="font-heading text-4xl sm:text-7xl text-white mb-2 sm:mb-4 leading-tight tracking-tight hover:text-accent transition-all duration-300">
                    {recipe.name}
                  </h1>
                  <p className="text-sm sm:text-lg text-gray-300 mb-4 sm:mb-6 max-w-2xl font-body">
                    A <span className="text-accent font-heading font-bold">premium</span> culinary experience crafted for <span className="text-accent font-heading font-bold">perfection</span>.
                  </p>
                  
                  <motion.div style={{ opacity: badgeOpacity }} className="flex flex-wrap gap-2 sm:gap-4">
                    {/* Author Information */}
                    {recipe.author && (
                      <motion.div style={{ opacity: badgeOpacity }}>
                        <Link 
                          href={`/${recipe.author.username}`}
                          className="inline-flex items-center space-x-3 bg-gray-900/60 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-xl border border-accent/25 hover:border-accent/50 transition-all duration-300 hover:bg-gray-900/80 group"
                        >
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-accent/20 rounded-full flex items-center justify-center border border-accent/30 group-hover:bg-accent/30 transition-colors duration-300">
                            <User className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                          </div>
                          <div className="text-left">
                            <p className="text-accent font-bold text-sm sm:text-base font-heading">
                              <span className="text-gray-200 font-light font-mono">{'>'}</span> {recipe.author.firstName && recipe.author.lastName 
                                ? `${recipe.author.firstName} ${recipe.author.lastName}` 
                                : recipe.author.username}
                            </p>
                            <p className="text-xs text-gray-200 font-mono">
                              {new Date(recipe.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })}
                            </p>
                          </div>
                        </Link>
                      </motion.div>
                    )}
                    <div className="flex items-center space-x-2 bg-gray-900/60 backdrop-blur-sm px-3 sm:px-6 py-2 sm:py-3 rounded-xl border border-gray-700">
                      <Clock className="w-4 h-4 text-primary" />
                      <span className="text-white font-semibold text-xs sm:text-sm font-mono">{recipe.cookingTime}</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-gray-900/60 backdrop-blur-sm px-3 sm:px-6 py-2 sm:py-3 rounded-xl border border-gray-700">
                      <Users className="w-4 h-4 text-accent" />
                      <span className="text-white font-semibold text-xs sm:text-sm font-mono">
                        <span className="hidden xs:inline">{recipe.servings}</span>
                        <span className="xs:hidden">{recipe.servings} servings</span>
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 bg-primary/20 backdrop-blur-sm px-3 sm:px-6 py-2 sm:py-3 rounded-xl border border-primary/30">
                      <Play className="w-4 h-4 text-primary" />
                      <span className="text-primary font-semibold text-xs sm:text-sm font-mono">
                        <span className="hidden xs:inline">{recipe.instructions.length}</span>
                        <span className="xs:hidden">{recipe.instructions.length} steps</span>
                      </span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

            </div>
          </motion.div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-3 gap-4 sm:gap-8 pt-6 sm:pt-10">
            {/* Ingredients */}
            <div className="lg:col-span-1 order-1">
              <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border-none border-gray-700 p-4 sm:p-6 lg:sticky lg:top-32 animate-slide-up">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <div className="flex items-center">
                    <div className="w-8 h-8 sm:w-12 sm:h-12 bg-primary/20 rounded-xl flex items-center justify-center mr-2 sm:mr-3 border border-primary/30">
                      <ChefHat className="w-4 h-4 sm:w-6 sm:h-6 text-primary" />
                    </div>
                    <h2 className="text-xl sm:text-3xl font-heading font-bold text-white">Ingredients</h2>
                  </div>
                  <ProgressRing 
                    progress={ingredientProgress} 
                    size={32} 
                    strokeWidth={3}
                    className="text-primary sm:w-10 sm:h-10"
                  />
                </div>

                <div className="space-y-2">
                  {recipe.ingredients.map((ingredient, index) => (
                    <motion.div
                      key={index}
                      className={`flex font-mono items-center p-3 rounded-xl cursor-pointer transition-all duration-300 border-[0.1px] touch-target ${
                        checkedIngredients.includes(index)
                          ? "bg-primary/20 border-primary/30 shadow-lg shadow-primary/20"
                          : "bg-gray-800/30 hover:bg-gray-700/50 border-gray-600/50 hover:border-gray-500"
                      }`}
                      onClick={() => toggleIngredient(index)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      animate={checkedIngredients.includes(index) ? { x: [0, -5, 5, 0] } : {}}
                    >
                      <motion.div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 transition-all duration-300 ${
                          checkedIngredients.includes(index) 
                            ? "bg-primary border-primary" 
                            : "border-gray-500 hover:border-primary"
                        }`}
                        animate={checkedIngredients.includes(index) ? "bounce-gentle" : ""}
                      >
                        {checkedIngredients.includes(index) && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          >
                            <CheckCircle className="w-3 h-3 text-white" />
                          </motion.div>
                        )}
                      </motion.div>
                      <span
                        className={`font-medium font-mono transition-all duration-300 text-sm ${
                          checkedIngredients.includes(index) 
                            ? "line-through text-primary" 
                            : "text-gray-200 hover:text-white"
                        }`}
                      >
                        {ingredient}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-700">
                  <p className="text-xs text-gray-400 text-center mb-2 sm:mb-3 font-mono">
                    {checkedIngredients.length} of {recipe.ingredients.length} ingredients ready
                  </p>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-primary to-accent h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${ingredientProgress}%` }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border-none border-gray-700 p-4 sm:p-6 animate-slide-up">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <div className="flex items-center">
                    <div className="w-8 h-8 sm:w-12 sm:h-12 bg-accent/20 rounded-xl flex items-center justify-center mr-2 sm:mr-3 border border-accent/30">
                      <CheckCircle className="w-4 h-4 sm:w-6 sm:h-6 text-accent" />
                    </div>
                    <h2 className="text-xl sm:text-3xl font-heading font-bold text-white">Instructions</h2>
                  </div>
                  <ProgressRing 
                    progress={stepProgress} 
                    size={32} 
                    strokeWidth={3}
                    color="#adfc03"
                    className="text-accent sm:w-10 sm:h-10"
                  />
                </div>

                <div className="space-y-3 sm:space-y-4">
                  {recipe.instructions.map((instruction, index) => (
                    <motion.div
                      key={index}
                      className={`flex items-start p-3 sm:p-4 rounded-xl cursor-pointer transition-all duration-300 border-[0.5px] touch-target ${
                        completedSteps.includes(index)
                          ? "bg-accent/20 border-accent/50 shadow-lg shadow-accent/20"
                          : "bg-gray-800/30 hover:bg-gray-700/50 border-gray-600/50 hover:border-gray-500"
                      }`}
                      onClick={() => toggleStep(index)}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <motion.div
                        className={`w-8 h-8 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mr-3 sm:mr-4 font-bold text-sm transition-all duration-300 border font-mono ${
                          completedSteps.includes(index)
                            ? "bg-accent text-gray-900 border-accent shadow-lg shadow-accent/30"
                            : "bg-gray-800 text-primary border-primary hover:bg-primary hover:text-white"
                        }`}
                        animate={completedSteps.includes(index) ? { scale: [1, 1.1, 1] } : {}}
                        transition={{ duration: 0.3 }}
                      >
                        {completedSteps.includes(index) ? (
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          >
                            <CheckCircle className="w-4 h-4 sm:w-6 sm:h-6" />
                          </motion.div>
                        ) : (
                          index + 1
                        )}
                      </motion.div>
                      <div className="flex-1">
                        <p
                          className={`text-sm sm:text-base leading-relaxed transition-all duration-300 font-body ${
                            completedSteps.includes(index) 
                              ? "text-accent font-medium" 
                              : "text-gray-200 hover:text-white"
                          }`}
                        >
                          {instruction}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {completedSteps.length === recipe.instructions.length && (
                  <motion.div 
                    className="mt-4 sm:mt-6 p-4 sm:p-6 bg-accent/10 text-white rounded-2xl text-center animate-scale-in border border-accent/50 shadow-2xl shadow-accent/20"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <div className="text-gray-900">
                      <motion.div 
                        className="size-12 sm:size-16 shadow-2xl shadow-accent/50 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-4"
                      >
                        <CheckCircle className="w-6 h-6 sm:w-10 sm:h-10 text-accent" />
                      </motion.div>
                      <h3 className="text-xl sm:text-3xl text-accent mb-1 sm:mb-3 font-heading">Congratulations!</h3>
                      <p className="text-sm sm:text-lg font-medium font-body text-white">You&apos;ve completed this amazing recipe.</p>
                      <p className="text-xs sm:text-sm font-mono text-white/60 mt-2">You may now share it with your friends and family.</p>
                    </div>
                  </motion.div>
                )}

                <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-700">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 sm:mb-3 space-y-2 sm:space-y-0">
                    <p className="text-gray-400 font-medium text-xs sm:text-sm font-mono">
                      {completedSteps.length} of {recipe.instructions.length} steps completed
                    </p>
                    <Button
                      onClick={() => {
                        setCompletedSteps([])
                        showToast({
                          type: "info",
                          title: "Progress reset",
                          description: "Starting fresh!"
                        })
                      }}
                      variant="outline"
                      className="shadow-2xl shadow-primary/50 font-mono hover:shadow-primary/40 border-white/30 hover:border-primary/40 text-white bg-gray-900/50 hover:bg-primary/10 hover:text-primary rounded-xl text-xs sm:text-sm px-3 py-2 sm:px-4 sm:py-2"
                    >
                      <span className="flex items-center space-x-2">
                        <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="">Reset Progress</span>
                      </span>
                    </Button>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-primary to-accent h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${stepProgress}%` }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Floating Action Buttons - Better mobile positioning */}
      <div className="hidden sm:block">
        <FloatingActionButton
          icon={ArrowUp}
          onClick={scrollToTop}
          label="Scroll to top"
          position="bottom-right"
        />
        
        <FloatingActionButton
          icon={Share2}
          onClick={shareRecipe}
          label="Share recipe"
          variant="accent"
          position="bottom-left"
        />
        
        <FloatingActionButton
          icon={Timer}
          onClick={() => showToast({
            type: "info",
            title: "Timer",
            description: "Feature coming soon!"
          })}
          label="Cooking timer"
          variant="secondary"
          position="top-right"
          size="sm"
        />
      </div>

      {/* Mobile-only floating buttons - Single share button */}
      <div className="sm:hidden fixed bottom-4 right-4 z-30">
        <FloatingActionButton
          icon={Share2}
          onClick={shareRecipe}
          label="Share recipe"
          variant="accent"
          size="md"
        />
      </div>
    </div>
  )
}
