"use client"

import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"

interface FloatingActionButtonProps {
  icon: LucideIcon
  onClick: () => void
  label: string
  variant?: 'primary' | 'secondary' | 'accent'
  size?: 'sm' | 'md' | 'lg'
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  className?: string
}

export default function FloatingActionButton({
  icon: Icon,
  onClick,
  label,
  variant = 'primary',
  size = 'md',
  position = 'bottom-right',
  className = ""
}: FloatingActionButtonProps) {
  const variants = {
    primary: "bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25",
    secondary: "bg-gray-800 hover:bg-gray-700 text-white shadow-lg shadow-black/25",
    accent: "bg-accent hover:bg-accent/90 text-black shadow-lg shadow-accent/25"
  }

  const sizes = {
    sm: "w-12 h-12",
    md: "w-14 h-14", 
    lg: "w-16 h-16"
  }

  const iconSizes = {
    sm: "w-5 h-5",
    md: "w-6 h-6",
    lg: "w-7 h-7"
  }

  const positions = {
    'bottom-right': "bottom-6 right-6",
    'bottom-left': "bottom-6 left-6", 
    'top-right': "top-6 right-6",
    'top-left': "top-6 left-6"
  }

  return (
    <motion.button
      onClick={onClick}
      className={`
        fixed ${positions[position]} ${sizes[size]} ${variants[variant]}
        rounded-full flex items-center justify-center
        transition-all duration-300 hover:scale-110 
        backdrop-blur-xl border border-white/10
        z-40 group touch-target
        ${className}
      `}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      aria-label={label}
    >
      <Icon className={iconSizes[size]} />
      
      {/* Tooltip */}
      <span className="absolute right-full mr-3 px-2 py-1 bg-gray-900 text-white text-xs rounded-lg 
                     opacity-0 group-hover:opacity-100 transition-opacity duration-200 
                     whitespace-nowrap pointer-events-none">
        {label}
      </span>
    </motion.button>
  )
} 