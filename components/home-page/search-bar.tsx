'use client'

import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  compact?: boolean
}

export function SearchBar({ 
  value, 
  onChange, 
  placeholder = "Search recipes...", 
  className = "",
  compact = false 
}: SearchBarProps) {
  return (
    <div className={`relative ${className}`}>
      <Search className={`absolute left-${compact ? '3' : '4'} top-1/2 transform -translate-y-1/2 ${compact ? 'w-4 h-4' : 'w-5 h-5'} text-gray-400 z-10`} />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${compact 
          ? 'pl-10 font-mono text-xs sm:text-sm bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-primary rounded-xl'
          : 'pl-12 pr-4 py-4 bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-primary rounded-xl backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300 touch-target text-xs sm:text-sm font-mono shadow-2xl shadow-primary/20 hover:shadow-primary/40 focus:shadow-primary/60 hover:border-primary/60'
        }`}
      />
      {value && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onChange("")}
          className={`absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 ${compact 
            ? 'hover:bg-gray-700/40' 
            : 'hover:bg-gray-700/40'
          } rounded-full hover:text-white touch-target`}
        >
          <X className="w-4 h-4" />
        </Button>
      )}
    </div>
  )
} 