'use client'

import { useUserProfile } from '../hooks/use-user-profile'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CalendarDays, ChefHat, Star, Sparkles, BookOpen, Settings } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import RecipeCard from '@/components/RecipeCard'
import { useAuthStore } from '@/src/stores/auth-store'
import { useState } from 'react'
import { EditProfileModal } from './edit-profile-modal'

interface ProfilePageProps {
  username: string
}

function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-row lg:flex-row gap-8">
          {/* Profile skeleton */}
          <div className="lg:w-1/3">
            <div className="bg-gray-800 backdrop-blur-xl rounded-xl border border-gray-700 p-6 sticky top-8">
              <div className="flex flex-col items-center space-y-6">
                {/* Avatar skeleton */}
                <div className="h-32 w-32 rounded-full bg-gray-700 animate-pulse border-4 border-primary/30" />
                
                {/* Name skeleton */}
                <div className="text-center space-y-3">
                  <div className="h-8 w-36 bg-gray-700 rounded animate-pulse mx-auto" />
                  <div className="flex items-center justify-center space-x-2">
                    <div className="h-5 w-24 bg-gray-700 rounded animate-pulse" />
                    <div className="h-6 w-12 bg-gray-700 rounded-lg animate-pulse" />
                  </div>
                </div>

                {/* Bio skeleton */}
                <div className="w-full">
                  <div className="bg-gray-700/30 rounded-lg p-4">
                    <div className="space-y-2 text-center">
                      <div className="h-4 w-full bg-gray-600 rounded animate-pulse" />
                      <div className="h-4 w-2/3 bg-gray-600 rounded animate-pulse mx-auto" />
                    </div>
                  </div>
                </div>

                {/* Joined date skeleton */}
                <div className="flex items-center text-gray-400 bg-gray-700/30 rounded-lg px-4 py-2">
                  <div className="h-4 w-4 bg-gray-600 rounded animate-pulse mr-2" />
                  <div className="h-4 w-24 bg-gray-600 rounded animate-pulse" />
                </div>

                {/* Stats grid skeleton */}
                <div className="w-full grid grid-cols-2 gap-4">
                  <div className="bg-gray-700/30 rounded-lg p-4 text-center">
                    <div className="h-8 w-6 bg-gray-600 rounded animate-pulse mx-auto mb-1" />
                    <div className="h-3 w-12 bg-gray-600 rounded animate-pulse mx-auto" />
                  </div>
                  <div className="bg-gray-700/30 rounded-lg p-4 text-center">
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-3 h-3 bg-gray-600 rounded animate-pulse" />
                      ))}
                    </div>
                    <div className="h-3 w-16 bg-gray-600 rounded animate-pulse mx-auto" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recipes skeleton */}
          <div className="lg:w-2/3 w-full">
            {/* Header skeleton */}
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-primary/20 rounded-xl border border-primary/30 animate-pulse" />
                <div>
                  <div className="h-8 w-52 bg-gray-700 rounded animate-pulse mb-2" />
                  <div className="h-4 w-44 bg-gray-700 rounded animate-pulse" />
                </div>
              </div>
            </div>

            {/* Recipe cards skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="bg-gray-800 backdrop-blur-xl rounded-xl border border-gray-700 overflow-hidden">
                  {/* Recipe image skeleton with badges */}
                  <div className="relative h-48 w-full bg-gray-700 animate-pulse">
                    <div className="absolute top-4 left-4 h-8 w-8 bg-gray-600 rounded-full animate-pulse" />
                    <div className="absolute top-4 right-4 space-y-2">
                      <div className="h-6 w-20 bg-green-500/20 rounded-full animate-pulse" />
                      <div className="h-6 w-16 bg-orange-500/20 rounded-full animate-pulse" />
                    </div>
                  </div>
                  
                  {/* Recipe content skeleton */}
                  <div className="p-6 space-y-4">
                    {/* Title */}
                    <div className="h-6 w-3/4 bg-gray-700 rounded animate-pulse" />
                    
                    {/* Servings info */}
                    <div className="flex items-center space-x-2">
                      <div className="h-4 w-4 bg-gray-700 rounded animate-pulse" />
                      <div className="h-4 w-20 bg-gray-700 rounded animate-pulse" />
                    </div>
                    
                    {/* Key ingredients label */}
                    <div className="h-4 w-32 bg-gray-700 rounded animate-pulse" />
                    
                    {/* Ingredient tags */}
                    <div className="flex flex-wrap gap-2">
                      <div className="h-6 w-12 bg-gray-700 rounded animate-pulse" />
                      <div className="h-6 w-16 bg-gray-700 rounded animate-pulse" />
                      <div className="h-6 w-14 bg-gray-700 rounded animate-pulse" />
                    </div>
                    
                    {/* Bottom info */}
                    <div className="flex justify-between items-center pt-2">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, j) => (
                          <div key={j} className="w-3 h-3 bg-gray-700 rounded animate-pulse" />
                        ))}
                        <div className="h-4 w-6 bg-gray-700 rounded animate-pulse ml-2" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="h-4 w-4 bg-gray-700 rounded animate-pulse" />
                        <div className="h-4 w-12 bg-gray-700 rounded animate-pulse" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function UserNotFound() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-16">
      <div className="container mx-auto px-4 py-16 text-center">
        <motion.div 
          className="max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <motion.div 
            className="h-32 w-32 mx-auto mb-6 rounded-full bg-gray-800 border-gray-700 flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            <ChefHat className="h-16 w-16 text-gray-600" />
          </motion.div>
          <motion.h1 
            className="text-3xl font-bold mb-4 text-white font-heading"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Chef Not Found
          </motion.h1>
          <motion.p 
            className="text-gray-400 mb-8 font-body"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            The chef you&apos;re looking for doesn&apos;t exist or may have left the kitchen.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Link href="/">
              <Button className="bg-primary text-white hover:bg-primary/90 rounded-xl px-8 py-3 font-semibold transition-all duration-300">
                Back to Kitchen
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export function ProfilePage({ username }: ProfilePageProps) {
  const { user: currentUser } = useAuthStore()
  const { user, recipes, isLoading, isUserError } = useUserProfile(username)
  const [showEditModal, setShowEditModal] = useState(false)
  
  const isOwnProfile = currentUser?.username === username

  if (isLoading) {
    return <ProfileSkeleton />
  }

  if (isUserError || !user) {
    return <UserNotFound />
  }

  const displayName = user.firstName && user.lastName 
    ? `${user.firstName} ${user.lastName}` 
    : user.username

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <>
      <div className="min-h-screen bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-row lg:flex-row gap-8">
            {/* User Profile Section */}
            <motion.div 
              className="lg:w-1/3"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="bg-gray-800 backdrop-blur-xl rounded-xl border border-gray-700 p-6 sticky top-8">
                <div className="flex flex-col items-center space-y-6">
                  {/* Edit Profile Button - Only visible to profile owner */}
                  {isOwnProfile && (
                    <div className="w-full flex justify-end">
                      <Button
                        onClick={() => setShowEditModal(true)}
                        variant="outline"
                        size="sm"
                        className="border-gray-600 text-gray-300 hover:text-white hover:bg-gray-700 rounded-xl"
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Edit Profile
                      </Button>
                    </div>
                  )}

                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <Avatar className="h-32 w-32 border-4 border-primary/30 shadow-lg shadow-primary/20">
                      <AvatarImage src={user.avatar} alt={displayName} />
                      <AvatarFallback className="text-2xl font-bold bg-primary/20 text-primary border border-primary/30">
                        {getInitials(displayName)}
                      </AvatarFallback>
                    </Avatar>
                  </motion.div>
                  
                  <motion.div 
                    className="text-center space-y-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <h1 className="text-3xl font-bold text-white font-heading mt-4">{user.firstName} <span className="text-accent">{user.lastName}</span></h1>
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-primary font-mono">@{user.username}</span>
                      <Badge className="bg-primary/20 text-primary border border-primary/30 rounded-lg">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Chef
                      </Badge>
                    </div>
                  </motion.div>

                  {user.bio && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                      className="w-full"
                    >
                      <div className="bg-gray-700/30 rounded-lg p-4">
                        <p className="text-center text-gray-300 font-mono text-sm">
                          {user.bio}
                        </p>
                      </div>
                    </motion.div>
                  )}

                  <motion.div 
                    className="flex items-center text-gray-400 bg-gray-700/30 rounded-lg px-4 py-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    <CalendarDays className="h-4 w-4 mr-2 text-primary" />
                    <span className="font-mono text-sm">
                      Joined {user.createdAt}
                    </span>
                  </motion.div>

                  <motion.div 
                    className="w-full grid grid-cols-2 gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    <div className="bg-gray-700/30 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-primary font-mono">{recipes.length}</div>
                      <div className="text-xs text-gray-400 font-body">Recipes</div>
                    </div>
                    <div className="bg-gray-700/30 rounded-lg p-4 text-center">
                      <div className="flex items-center justify-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-accent text-accent" />
                        ))}
                      </div>
                      <div className="text-xs text-gray-400 font-body mt-1">Master Chef</div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* User Recipes Section */}
            <motion.div 
              className="lg:w-2/3 w-full"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            >
              <motion.div 
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/30">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white font-heading">
                      {displayName}&apos;s <span className="text-accent">Kitchen</span>
                    </h2>
                    <p className="text-gray-400 text-xs font-mono">
                      {recipes.length === 0 
                        ? "No recipes shared yet." 
                        : `${recipes.length} delicious recipe${recipes.length !== 1 ? 's' : ''} to explore`
                      }
                    </p>
                  </div>
                </div>
              </motion.div>

              {recipes.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="w-full flex flex-col items-center justify-center"
                >
                  <div className="bg-gray-800 backdrop-blur-xl w-full flex flex-col items-center justify-center rounded-xl border border-gray-700 px-12 text-center py-16">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-700/30 flex items-center justify-center border border-gray-600">
                      <ChefHat className="h-12 w-12 text-gray-500" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 font-heading">No Recipes Yet</h3>
                    <p className="text-gray-400 font-body max-w-sm mx-auto text-sm leading-relaxed w-full">
                      {displayName} is still cooking up something special. <br />
                      Check back soon for delicious recipes!
                    </p>
                    <div className="mt-6 flex justify-center space-x-2">
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 rounded-full bg-primary/40"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ 
                            duration: 1.5, 
                            repeat: Infinity, 
                            delay: i * 0.2 
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) :(
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  {recipes.map((recipe, index) => (
                    <RecipeCard key={recipe.id} recipe={recipe} index={index} />
                  ))}
                </motion.div>
              )})
            </motion.div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isOwnProfile && (
        <EditProfileModal
          open={showEditModal}
          onOpenChange={setShowEditModal}
        />
      )}
    </>
  )
} 