"use client"

import { ChefHat, Sparkles, Plus } from "lucide-react"
import { useEffect, useState } from "react"

export default function GlobalLoading() {
  const [dots, setDots] = useState("")
  const [cookingStep, setCookingStep] = useState(0)
  
  const cookingSteps = [
    "Gathering fresh ingredients",
    "Prepping the workspace", 
    "Mixing flavors together",
    "Adding the secret sauce",
    "Plating the masterpiece"
  ]

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? "" : prev + ".")
    }, 500)

    const stepInterval = setInterval(() => {
      setCookingStep(prev => (prev + 1) % cookingSteps.length)
    }, 2000)

    return () => {
      clearInterval(dotInterval)
      clearInterval(stepInterval)
    }
  }, [cookingSteps.length])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Main loading content */}
      <div className="relative text-center animate-fade-in">
        {/* Animated chef hat with glow */}
        <div className="relative mb-8 mx-auto">
          <div className="relative">
            {/* Outer glow ring */}
            <div className="absolute inset-0 w-32 h-32 rounded-full bg-primary/20 animate-ping"></div>
            
            {/* Main chef hat container */}
            <div className="relative w-32 h-32 bg-gradient-to-br from-primary/30 to-primary/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-primary/30 shadow-2xl shadow-primary/20">
              <ChefHat className="w-16 h-16 text-primary animate-bounce" />
              
              {/* Rotating accent badge */}
              <div className="absolute -top-2 -right-2 w-10 h-10 bg-accent rounded-full flex items-center justify-center shadow-lg shadow-accent/30 animate-spin" style={{ animationDuration: '3s' }}>
                <Plus className="w-6 h-6 font-bold text-gray-900" />
              </div>
              
              {/* Floating sparkles */}
              <div className="absolute -top-4 -left-4 animate-pulse">
                <Sparkles className="w-6 h-6 text-accent" />
              </div>
              <div className="absolute -bottom-4 -right-4 animate-pulse" style={{ animationDelay: '1s' }}>
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
            </div>
          </div>
        </div>

        {/* Brand text */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl font-black mb-4 tracking-tight">
            <span className="text-white">Recipe</span>
            <span className="text-accent">Hub</span>
          </h1>
          
          {/* Decorative line with animated dot */}
          <div className="flex items-center justify-center space-x-4">
            <div className="h-1 w-16 bg-gradient-to-r from-transparent to-primary rounded-full"></div>
            <div className="h-3 w-3 bg-accent rounded-full shadow-lg shadow-accent/30 animate-pulse"></div>
            <div className="h-1 w-16 bg-gradient-to-l from-transparent to-primary rounded-full"></div>
          </div>
        </div>

        {/* Loading text with animated dots */}
        <div className="mb-8">
          <p className="text-2xl text-white font-semibold mb-2">
            {cookingSteps[cookingStep]}
            <span className="text-accent inline-block w-8 text-left">{dots}</span>
          </p>
          <p className="text-gray-400 text-lg">
            Creating something delicious for you
          </p>
        </div>

        {/* Animated progress bar */}
        <div className="w-80 mx-auto">
          <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-pulse rounded-full" 
              style={{ 
                animation: 'shimmer 2s ease-in-out infinite',
                backgroundPosition: '-200% 0'
              }}
            />
          </div>
          <p className="text-sm text-gray-500 mt-3">Preparing your culinary experience...</p>
        </div>

        {/* Floating ingredients animation */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-accent/20 rounded-full animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '3s' }}></div>
          <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-primary/20 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '2.5s' }}></div>
          <div className="absolute bottom-1/3 left-1/3 w-4 h-4 bg-accent/30 rounded-full animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '3.5s' }}></div>
          <div className="absolute bottom-1/4 right-1/3 w-5 h-5 bg-primary/30 rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '2s' }}></div>
        </div>
      </div>

      {/* Custom shimmer keyframe animation */}
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  )
} 