import type { Metadata } from "next"
import Link from "next/link"
import { ChefHat, Home, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Page Not Found - RecipeHub",
  description: "The page you're looking for doesn't exist. Discover amazing recipes on RecipeHub.",
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Animation */}
        <div className="relative mb-8">
          <div className="w-32 h-32 bg-primary/20 border border-primary/40 rounded-2xl flex items-center justify-center mx-auto shadow-2xl shadow-primary/40 relative">
            <ChefHat className="w-16 h-16 text-primary" />
            
            {/* Floating sparkles */}
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent/20 rounded-full border border-accent/40 flex items-center justify-center">
              <span className="text-accent text-xs font-bold">?</span>
            </div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-accent/20 rounded-full border border-accent/40 flex items-center justify-center">
              <span className="text-accent text-xs font-bold">!</span>
            </div>
          </div>
        </div>

        {/* 404 Text */}
        <div className="mb-8">
          <h1 className="text-8xl font-heading font-bold text-accent mb-2">
            404
          </h1>
          <h2 className="text-2xl font-heading font-bold text-white mb-4">
            Recipe Not Found
          </h2>
          <p className="text-gray-300 font-body leading-relaxed">
            Oops! This recipe seems to have been eaten already. 
            Let&apos;s get you back to the kitchen where all the delicious recipes are waiting.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            asChild
            className="bg-primary/10 border-primary/50 border hover:bg-primary/20 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 font-mono"
          >
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          
          <Button 
            asChild
            variant="outline"
            className="border-accent/50 bg-accent/10 text-accent hover:bg-accent/20 font-semibold px-6 py-3 rounded-xl shadow-lg shadow-accent/20 hover:shadow-accent/40 transition-all duration-300 font-mono"
          >
            <Link href="/">
              <Search className="w-4 h-4 mr-2" />
              Browse Recipes
            </Link>
          </Button>
        </div>

        {/* Fun message */}
        <div className="mt-12 p-4 bg-gray-800/50 backdrop-blur-xl rounded-xl border border-gray-700">
          <p className="text-gray-400 text-sm font-body">
            <span className="text-accent font-heading font-semibold">Chef&apos;s Tip:</span> Even the best chefs sometimes lose track of their recipes. 
            Good thing we have plenty more where that came from!
          </p>
        </div>
      </div>
    </div>
  )
} 