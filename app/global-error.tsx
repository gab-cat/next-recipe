"use client"

import { ChefHat, RotateCcw, Home, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Error Animation */}
        <div className="relative mb-8">
          <div className="w-32 h-32 bg-red-500/20 border border-red-500/40 rounded-2xl flex items-center justify-center mx-auto shadow-2xl shadow-red-500/40 relative">
            <ChefHat className="w-16 h-16 text-red-500" />
            
            {/* Warning indicators */}
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500/20 rounded-full border border-red-500/40 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-red-500" />
            </div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-accent/20 rounded-full border border-accent/40 flex items-center justify-center animate-pulse">
              <span className="w-2 h-2 bg-accent rounded-full"></span>
            </div>
          </div>
        </div>

        {/* Error Text */}
        <div className="mb-8">
          <h1 className="text-6xl font-heading font-bold text-accent mb-2">
            Oops!
          </h1>
          <h2 className="text-2xl font-heading font-bold text-white mb-4">
            Something went wrong in the kitchen
          </h2>
          <p className="text-gray-300 font-body leading-relaxed">
            It looks like our recipe servers got a bit too hot and something burned. 
            Don&apos;t worry, we&apos;re working on fixing it right away!
          </p>
          
          {/* Error details for development */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-4 p-3 bg-gray-800/50 rounded-lg border border-gray-700 text-left">
              <p className="text-xs text-gray-400 font-mono break-all">
                {error?.message}
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={reset}
            className="bg-primary/10 border border-primary/30 hover:border-primary/50 hover:bg-primary/20 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 font-mono"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
          
          <Button 
            asChild
            variant="outline"
            className="border-accent/50 bg-accent/10 hover:text-accent/50 text-accent hover:bg-accent/20 font-semibold px-6 py-3 rounded-xl shadow-lg shadow-accent/20 hover:shadow-accent/40 transition-all duration-300 font-mono"
          >
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>

        {/* Chef message */}
        <div className="mt-12 p-4 bg-gray-800/50 backdrop-blur-xl rounded-xl border border-gray-700">
          <p className="text-gray-400 text-sm font-body">
            <span className="text-red-400 font-heading font-semibold">Chef&apos;s Note:</span> Even master chefs burn a dish sometimes. 
            The good news? We&apos;ve got backup recipes ready to serve!
          </p>
        </div>
      </div>
    </div>
  )
} 