"use client"

import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { motion } from "framer-motion"

export interface BreadcrumbItem {
  label: string
  href?: string
  current?: boolean
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export default function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={`flex items-center space-x-1 text-sm ${className}`}>
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Link 
          href="/" 
          className="flex items-center space-x-1 text-gray-400 hover:text-accent transition-colors duration-200"
        >
          <Home className="w-4 h-4" />
          <span>Home</span>
        </Link>
      </motion.div>

      {items.map((item, index) => (
        <motion.div
          key={index}
          className="flex items-center space-x-1"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <ChevronRight className="w-4 h-4 text-gray-600" />
          {item.href && !item.current ? (
            <Link 
              href={item.href}
              className="text-gray-400 hover:text-accent transition-colors duration-200 font-medium"
            >
              {item.label}
            </Link>
          ) : (
            <span className={`font-medium ${item.current ? 'text-white' : 'text-gray-400'}`}>
              {item.label}
            </span>
          )}
        </motion.div>
      ))}
    </nav>
  )
} 