"use client"

import { useState, type ReactNode } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { AnimatePresence } from "framer-motion"
import Footer from "@/components/shared/footer"
import SplashScreen from "@/components/shared/splash-screen"

interface ClientLayoutProps {
  children: ReactNode
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [queryClient] = useState(() => new QueryClient())
  const [isLoaded, setIsLoaded] = useState(false)


  const handleSplashComplete = () => {
    setIsLoaded(true)
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AnimatePresence mode="wait">
        {!isLoaded ? (
          <SplashScreen key="splash" onComplete={handleSplashComplete} />
        ) : (
          <div key="main">
            <main>{children}</main>
            <Footer />
          </div>
        )}
      </AnimatePresence>
    </QueryClientProvider>
  )
} 