'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { User, Mail, Loader2, UserCircle, FileText } from 'lucide-react'
import { z } from 'zod'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useUpdateUser, useUserByUsername } from '@/src/features/users/hooks/use-user-profile'
import { useAuthStore } from '@/src/stores/auth-store'
import { useEffect } from 'react'

const updateProfileSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .max(50, 'First name must not exceed 50 characters'),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .max(50, 'Last name must not exceed 50 characters'),
  bio: z
    .string()
    .max(500, 'Bio must not exceed 500 characters')
    .optional(),
  avatar: z
    .string()
    .url('Avatar must be a valid URL')
    .optional()
    .or(z.literal('')),
})

type UpdateProfileFormData = z.infer<typeof updateProfileSchema>

interface EditProfileModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditProfileModal({ open, onOpenChange }: EditProfileModalProps) {
  const { user } = useAuthStore()
  const { data: userData } = useUserByUsername(user?.username || '')
  const { mutate: updateUser, isPending } = useUpdateUser()

  const form = useForm<UpdateProfileFormData>({
    mode: 'onBlur',
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      bio: '',
      avatar: '',
    },
  })

  // Update form values when user data is available
  useEffect(() => {
    if (userData) {
      form.reset({
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        bio: userData.bio || '',
        avatar: userData.avatar || '',
      })
    }
  }, [user, form, userData])

  const handleSubmit = (data: UpdateProfileFormData) => {
    // Filter out empty avatar URL
    const updateData = {
      ...data,
      avatar: data.avatar?.trim() || undefined,
      bio: data.bio?.trim() || undefined,
    }

    updateUser(updateData, {
      onSuccess: () => {
        onOpenChange(false)
      },
    })
  }

  if (!user) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-gray-900 border-gray-800">
        <DialogHeader className="space-y-4 pb-6 border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/30">
              <UserCircle className="w-6 h-6 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-white font-heading">
                Edit Profile
              </DialogTitle>
              <DialogDescription className="text-gray-400 font-mono">
                Update your profile information and share more about yourself.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 pt-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white font-heading border-b border-gray-700/50 pb-2">
                Basic Information
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200 font-mono flex items-center gap-1">
                        <User className="w-4 h-4" />
                        First Name *
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="John"
                          className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 
                                   focus:border-primary/60 focus:ring-primary/20 rounded-xl 
                                   font-mono"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400 font-mono text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200 font-mono flex items-center gap-1">
                        <User className="w-4 h-4" />
                        Last Name *
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Doe"
                          className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 
                                   focus:border-primary/60 focus:ring-primary/20 rounded-xl 
                                   font-mono"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400 font-mono text-xs" />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-200 font-mono flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      Bio
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Tell us about yourself..."
                        className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 
                                 focus:border-primary/60 focus:ring-primary/20 rounded-xl 
                                 font-mono"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400 font-mono text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="avatar"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-200 font-mono flex items-center gap-1">
                      <UserCircle className="w-4 h-4" />
                      Avatar URL
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="https://example.com/avatar.jpg"
                        className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 
                                 focus:border-primary/60 focus:ring-primary/20 rounded-xl 
                                 font-mono"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400 font-mono text-xs" />
                  </FormItem>
                )}
              />
            </div>

            {/* Read-only Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white font-heading border-b border-gray-700/50 pb-2">
                Account Information
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-200 font-mono flex items-center gap-1 text-sm mb-2">
                    <User className="w-4 h-4" />
                    Username
                  </label>
                  <div className="bg-gray-800/30 border border-gray-700 rounded-xl px-3 py-2 text-gray-400 font-mono text-sm">
                    @{userData?.username}
                  </div>
                </div>

                <div>
                  <label className="text-gray-200 font-mono flex items-center gap-1 text-sm mb-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </label>
                  <div className="bg-gray-800/30 border border-gray-700 rounded-xl px-3 py-2 text-gray-400 font-mono text-sm truncate">
                    {userData?.email}
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-3 pt-6 border-t border-gray-800">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800/50 rounded-xl"
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-primary/20 border border-primary/30 hover:bg-primary/30 
                         hover:border-primary/70 hover:shadow-primary/40 shadow-lg shadow-primary/20 
                         text-white rounded-xl font-mono transition-all duration-300"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <UserCircle className="w-4 h-4 mr-2" />
                    Update Profile
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
} 