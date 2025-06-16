"use client"

import Link from "next/link"
import { ChefHat } from "lucide-react"

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-gray-900 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-primary backdrop-blur-sm rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                <ChefHat className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-xs">+</span>
              </div>
            </div>
            <div>
              <span className="text-2xl font-black text-primary">
                Recipe<span className="text-accent">Hub</span>
              </span>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  )
}
