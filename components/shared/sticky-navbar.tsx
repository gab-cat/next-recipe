'use client'

import { useState } from 'react'
import { ChefHat, User, LogOut, BookOpen, Plus } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAuthStore } from '@/src/stores/auth-store'
import { useLogout } from '@/src/features/auth/hooks/use-auth'
import { LoginModal } from '@/src/features/auth/components/login-modal'
import { RegisterModal } from '@/src/features/auth/components/register-modal'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'
import { CreateRecipeSheet } from '@/src/features/recipes/components/create-recipe-sheet'

interface StickyNavbarProps {
  isVisible: boolean
  children?: React.ReactNode
}

export function StickyNavbar({ isVisible, children }: StickyNavbarProps) {
  const { user, isAuthenticated } = useAuthStore()
  const { mutate: logout } = useLogout()
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [showCreateRecipeSheet, setShowCreateRecipeSheet] = useState(false)

  const handleSwitchToRegister = () => {
    setShowLoginModal(false)
    setShowRegisterModal(true)
  }

  const handleSwitchToLogin = () => {
    setShowRegisterModal(false)
    setShowLoginModal(true)
  }

  const getUserInitials = () => {
    if (!user) return ''
    const firstInitial = user.firstName?.charAt(0) || user.username.charAt(0)
    const lastInitial = user.lastName?.charAt(0) || ''
    return `${firstInitial}${lastInitial}`.toUpperCase()
  }

  const getDisplayName = () => {
    if (!user) return ''
    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`
    }
    return user.username
  }

  return (
    <>
      <div 
        className="bg-gray-900/40 backdrop-blur-xl sticky top-0 z-50 transition-all duration-300 border-b border-gray-700/50"
      >
        <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-3">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Logo */}
            <Link href="/" className='cursor-pointer hover:opacity-80 transition-all duration-300 hover:bg-gray-800/50 rounded-xl p-2'>
              <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
                <div className="relative">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 bg-primary/20 border border-primary/30 rounded-lg sm:rounded-xl flex items-center justify-center">
                    <ChefHat className="w-4 h-4 sm:w-7 sm:h-7 text-primary" />
                  </div>
                  <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-3 h-3 sm:w-5 sm:h-5 bg-accent rounded-full flex items-center justify-center">
                    <span className="text-black font-bold text-xs sm:text-base">+</span>
                  </div>
                </div>
                <span className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-white font-heading">
                  Recipe<span className="text-accent">Hub</span>
                </span>
              </div>
            </Link>

            {/* Middle Content (Search Bar or Custom Content) - Hidden on very small screens */}
            <motion.div 
              className="hidden sm:flex flex-1 max-w-md mx-2 md:mx-6"
              initial={{ opacity: 0, y: -10 }}
              animate={{ 
                opacity: isVisible ? 1 : 0,
                y: isVisible ? 0 : -10
              }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              {children}
            </motion.div>

            {/* Auth Section */}
            <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
              {isAuthenticated && user ? (
                <div className="flex items-center space-x-2 sm:space-x-3">
                  {/* Welcome text - hidden on mobile */}
                  <span className="hidden lg:block text-xs xl:text-sm font-mono text-white whitespace-nowrap">
                    Welcome, <span className="font-medium font-mono text-accent">{getDisplayName()}</span>!
                  </span>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-8 w-8 sm:h-10 sm:w-10 rounded-full p-0 hover:bg-gray-800/50">
                        <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                          <AvatarImage 
                            src={user.avatar || ''} 
                            alt={getDisplayName()} 
                          />
                          <AvatarFallback className="bg-primary/20 border border-primary/30 text-primary font-semibold font-mono text-xs sm:text-sm">
                            {getUserInitials()}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent 
                      className="w-48 sm:w-56 bg-gray-900 border-gray-800 rounded-xl mr-2 sm:mr-0" 
                      align="end"
                      sideOffset={8}
                    >
                      <DropdownMenuLabel className="font-normal px-3 py-2">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none text-white font-heading truncate">
                            {getDisplayName()}
                          </p>
                          <p className="text-xs leading-none text-gray-400 font-mono truncate">
                            {user.email}
                          </p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator className="bg-gray-800" />
                      <DropdownMenuItem className="cursor-pointer hover:bg-gray-800 rounded-xl focus:bg-gray-800 px-3 py-2">
                        <Link href={`/@${user.username}`} className="flex items-center">
                          <User className="mr-2 h-4 w-4 flex-shrink-0" />
                          <span className="font-mono text-sm">Profile</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => setShowCreateRecipeSheet(true)}
                        className="cursor-pointer hover:bg-gray-800 rounded-xl focus:bg-gray-800 px-3 py-2"
                      >
                        <Plus className="mr-2 h-4 w-4 flex-shrink-0" />
                        <span className="font-mono text-sm">Create Recipe</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer hover:bg-gray-800 rounded-xl focus:bg-gray-800 px-3 py-2">
                        <Link href="/recipes" className="flex items-center">
                          <BookOpen className="mr-2 h-4 w-4 flex-shrink-0" />
                          <span className="font-mono text-sm">My Recipes</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-gray-800" />
                      <DropdownMenuItem
                        onClick={() => logout()}
                        className="cursor-pointer text-red-400 focus:text-red-400 rounded-xl hover:bg-red-500/10 focus:bg-red-500/10 px-3 py-2"
                      >
                        <LogOut className="mr-2 h-4 w-4 flex-shrink-0" />
                        <span className="font-mono text-sm">Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <Button
                    variant="ghost"
                    onClick={() => setShowLoginModal(true)}
                    className="text-gray-300 cursor-pointer rounded-xl px-4 hover:text-white hover:bg-gray-800/50 font-mono text-xs sm:text-sm sm:px-3 py-1 sm:py-2 h-auto"
                  >
                    Sign In
                  </Button>
                  <Button
                    onClick={() => setShowRegisterModal(true)}
                    className="bg-primary/20 border border-primary/30 cursor-pointer hover:bg-primary/30 
                             hover:border-primary/70 hover:shadow-primary/40 shadow-lg sm:shadow-2xl shadow-primary/20 
                             text-white rounded-lg sm:rounded-xl font-mono text-xs sm:text-sm transition-all duration-300
                             px-2 sm:px-3 py-1 sm:py-2 h-auto whitespace-nowrap"
                  >
                    Get Started
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          {/* Mobile Search Bar - Show below navbar on small screens when search is visible */}
          {children && (
            <motion.div 
              className="sm:hidden mt-2 pt-2 border-t border-gray-700/30"
              initial={{ opacity: 0, height: 0 }}
              animate={{ 
                opacity: isVisible ? 1 : 0,
                height: isVisible ? 'auto' : 0
              }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {children}
            </motion.div>
          )}
        </div>
      </div>

      {/* Modals */}
      <LoginModal
        open={showLoginModal}
        onOpenChange={setShowLoginModal}
        onSwitchToRegister={handleSwitchToRegister}
      />
      <RegisterModal
        open={showRegisterModal}
        onOpenChange={setShowRegisterModal}
        onSwitchToLogin={handleSwitchToLogin}
      />
      
      {/* Create Recipe Sheet */}
      {isAuthenticated && (
        <CreateRecipeSheet
          open={showCreateRecipeSheet}
          onOpenChange={setShowCreateRecipeSheet}
        />
      )}
    </>
  )
} 