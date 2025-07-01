'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Eye, EyeOff, ArrowRight } from 'lucide-react'
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
import { useRegister } from '@/src/features/auth/hooks/use-auth'
import { registerSchema, type RegisterFormData } from '@/src/features/auth/schemas/auth-schema'

interface RegisterModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSwitchToLogin: () => void
}

export function RegisterModal({ open, onOpenChange, onSwitchToLogin }: RegisterModalProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { mutate: register, isPending } = useRegister()

  const form = useForm<RegisterFormData>({
    mode: 'onBlur',
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      bio: '',
    },
  })

  const handleSubmit = (data: RegisterFormData) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...registerData } = data
    console.log(registerData)
    register(registerData, {
      onSuccess: () => {
        form.reset()
        onOpenChange(false)
      },
    })
  }

  const handleSwitchToLogin = () => {
    form.reset()
    onSwitchToLogin()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-[700px] max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-800 py-4 sm:py-6 px-4 sm:px-6">
        <DialogHeader className="space-y-1 sm:space-y-2">
          <DialogTitle className="text-xl sm:text-2xl font-bold text-center text-white font-heading">
            Join Recipe<span className="text-accent">Hub</span>
          </DialogTitle>
          <DialogDescription className="text-center text-gray-300 font-body text-sm">
            Create your account to share and discover amazing recipes
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 sm:space-y-6 mt-4">
            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
              {/* Left Column - Authentication Fields */}
              <div className="space-y-3 sm:space-y-4">
                <div className="mb-3">
                  <h3 className="text-sm font-semibold text-gray-300 font-heading mb-3 pb-2 border-b border-gray-700/50">
                    Account Details
                  </h3>
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-1 sm:space-y-2">
                      <FormLabel className="text-gray-200 font-mono text-sm">Email *</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="john@example.com"
                          className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 
                                   focus:border-primary/60 focus:ring-primary/20 rounded-xl 
                                   backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300
                                   font-mono text-sm h-10 sm:h-11"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400 font-mono text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="space-y-1 sm:space-y-2">
                      <FormLabel className="text-gray-200 font-mono text-sm">Username *</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="johndoe"
                          className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 
                                   focus:border-primary/60 focus:ring-primary/20 rounded-xl 
                                   backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300
                                   font-mono text-sm h-10 sm:h-11"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400 font-mono text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="space-y-1 sm:space-y-2">
                      <FormLabel className="text-gray-200 font-mono text-sm">Password *</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your password"
                            className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 
                                     focus:border-primary/60 focus:ring-primary/20 rounded-xl 
                                     backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300
                                     font-mono text-sm pr-12 h-10 sm:h-11"
                            disabled={isPending}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 
                                     hover:text-primary/80 transition-colors duration-200 p-1"
                            tabIndex={-1}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-400 font-mono text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className="space-y-1 sm:space-y-2">
                      <FormLabel className="text-gray-200 font-mono text-sm">Confirm Password *</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="Confirm your password"
                            className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 
                                     focus:border-primary/60 focus:ring-primary/20 rounded-xl 
                                     backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300
                                     font-mono text-sm pr-12 h-10 sm:h-11"
                            disabled={isPending}
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 
                                     hover:text-primary/80 transition-colors duration-200 p-1"
                            tabIndex={-1}
                          >
                            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-400 font-mono text-xs" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Right Column - Profile Fields */}
              <div className="space-y-3 sm:space-y-4">
                <div className="mb-3">
                  <h3 className="text-sm font-semibold text-gray-300 font-heading mb-3 pb-2 border-b border-gray-700/50">
                    Profile Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3 sm:gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="space-y-1 sm:space-y-2">
                        <FormLabel className="text-gray-200 font-mono text-sm">First Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="John"
                            className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 
                                     focus:border-primary/60 focus:ring-primary/20 rounded-xl 
                                     backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300
                                     font-mono text-sm h-10 sm:h-11"
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
                      <FormItem className="space-y-1 sm:space-y-2">
                        <FormLabel className="text-gray-200 font-mono text-sm">Last Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Doe"
                            className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 
                                     focus:border-primary/60 focus:ring-primary/20 rounded-xl 
                                     backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300
                                     font-mono text-sm h-10 sm:h-11"
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
                    <FormItem className="space-y-1 sm:space-y-2">
                      <FormLabel className="text-gray-200 font-mono text-sm">Bio</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Tell us about yourself"
                          className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 
                                   focus:border-primary/60 focus:ring-primary/20 rounded-xl 
                                   backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300
                                   font-mono text-sm h-10 sm:h-11"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400 font-mono text-xs" />
                    </FormItem>
                  )}
                />

                {/* Spacer to balance the columns visually */}
                <div className="hidden lg:block lg:h-12 xl:h-16"></div>
              </div>
            </div>

            {/* Submit Button and Login Link */}
            <div className="space-y-3 sm:space-y-4 pt-2 sm:pt-4 border-t border-gray-700/30 mt-6">
              {/* Display form errors */}
              {form.formState.errors && (
                <div className="text-red-400 font-mono text-xs">
                  {Object.values(form.formState.errors).map((error) => error.message).join(', ')}
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-primary/20 border border-primary/30 hover:bg-primary/30 
                         hover:border-primary/70 hover:shadow-primary/40 shadow-xl sm:shadow-2xl shadow-primary/20 
                         text-white rounded-xl font-mono text-sm transition-all duration-300
                         disabled:opacity-50 disabled:cursor-not-allowed h-10 sm:h-11"
                disabled={isPending || !form.formState.isValid}
                onClick={() => form.trigger()}
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span className="font-mono">Creating account...</span>
                  </>
                ) : (
                  <>
                    <ArrowRight className="mr-2 h-4 w-4" />
                    <span className="font-mono">Create Account</span>
                  </>
                )}
              </Button>

              <div className="text-center text-sm">
                <span className="text-gray-400 font-body">Already have an account? </span>
                <button
                  type="button"
                  onClick={handleSwitchToLogin}
                  className="text-accent hover:text-accent/80 font-semibold font-heading 
                           transition-colors duration-200 underline-offset-4 hover:underline"
                >
                  Sign in
                </button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
} 