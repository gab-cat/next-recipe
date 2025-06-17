"use client"

import { useState, useEffect, type ReactNode } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { AnimatePresence } from "framer-motion"
import Footer from "@/components/shared/footer"
import SplashScreen from "@/components/shared/splash-screen"
import { Toaster } from "sonner"

interface ClientLayoutProps {
  children: ReactNode
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [queryClient] = useState(() => new QueryClient())
  const [isLoaded, setIsLoaded] = useState(false)
  const [showSplash, setShowSplash] = useState(false)

  useEffect(() => {
    setShowSplash(true)
  }, [])

  const handleSplashComplete = () => {
    setIsLoaded(true)
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ display: showSplash && !isLoaded ? 'none' : 'block' }}>
        <main>{children}</main>
        <Footer />
      </div>
      <Toaster />
      <AnimatePresence>
        {showSplash && !isLoaded && (
          <SplashScreen key="splash" onComplete={handleSplashComplete} />
        )}
      </AnimatePresence>
    </QueryClientProvider>
  )
} 