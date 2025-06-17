"use client"

import { ChefHat, Sparkles } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        {/* Loading Animation */}
        <div className="relative mb-8">
          <div className="w-24 h-24 bg-primary/20 border border-primary/40 rounded-2xl flex items-center justify-center mx-auto shadow-2xl shadow-primary/40 animate-pulse">
            <ChefHat className="w-12 h-12 text-primary animate-bounce" />
          </div>
          
          {/* Floating sparkles */}
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent/20 rounded-full border border-accent/40 flex items-center justify-center animate-spin">
            <Sparkles className="w-3 h-3 text-accent" />
          </div>
        </div>

        {/* Loading text */}
        <h2 className="text-2xl font-heading font-bold text-white mb-2">
          Preparing your recipes...
        </h2>
        <p className="text-gray-300 font-body">
          Our chefs are getting everything ready for you
        </p>

        {/* Loading bar */}
        <div className="mt-6 w-48 h-1 bg-gray-800 rounded-full mx-auto overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full w-full animate-pulse"></div>
        </div>
      </div>
    </div>
  )
} 