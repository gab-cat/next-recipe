'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Eye, EyeOff } from 'lucide-react'
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
import { useLogin } from '@/src/features/auth/hooks/use-auth'
import { loginSchema, type LoginFormData } from '@/src/features/auth/schemas/auth-schema'

interface LoginModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSwitchToRegister: () => void
}

export function LoginModal({ open, onOpenChange, onSwitchToRegister }: LoginModalProps) {
  const [showPassword, setShowPassword] = useState(false)
  const { mutate: login, isPending } = useLogin()

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleSubmit = (data: LoginFormData) => {
    login(data, {
      onSuccess: () => {
        form.reset()
        onOpenChange(false)
      },
    })
  }

  const handleSwitchToRegister = () => {
    form.reset()
    onSwitchToRegister()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-[425px] mx-auto bg-gray-900 border-gray-800 py-6 sm:py-8 px-4 sm:px-6">
        <DialogHeader className="space-y-2 sm:space-y-3">
          <DialogTitle className="text-2xl sm:text-3xl font-bold text-center text-white font-heading pb-1 sm:pb-2">
            Welcome <span className="text-accent">Back</span>!
          </DialogTitle>
          <DialogDescription className="text-center text-gray-300 font-body text-sm sm:text-base">
            Sign in to your account to continue exploring recipes
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 sm:space-y-6 mt-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-gray-200 font-body text-sm">Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Enter your email"
                      className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 
                               focus:border-primary/60 focus:ring-primary/20 rounded-xl 
                               backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300
                               font-mono text-sm h-11 sm:h-12"
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
                <FormItem className="space-y-2">
                  <FormLabel className="text-gray-200 font-body text-sm">Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 
                                 focus:border-primary/60 focus:ring-primary/20 rounded-xl 
                                 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300
                                 font-mono text-sm pr-12 h-11 sm:h-12"
                        disabled={isPending}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 
                                 hover:text-primary/80 transition-colors duration-200 p-1"
                        tabIndex={-1}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-400 font-mono text-xs" />
                </FormItem>
              )}
            />

            <div className="space-y-3 sm:space-y-4 pt-4 sm:pt-6">
              <Button
                type="submit"
                className="w-full bg-primary/20 border border-primary/30 hover:bg-primary/30 
                         hover:border-primary/70 hover:shadow-primary/40 shadow-xl sm:shadow-2xl shadow-primary/20 
                         text-white rounded-xl font-mono text-sm sm:text-base transition-all duration-300
                         disabled:opacity-50 disabled:cursor-not-allowed h-11 sm:h-12"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span className="font-mono">Signing in...</span>
                  </>
                ) : (
                  <span className="font-mono">Sign In</span>
                )}
              </Button>

              <div className="text-center text-sm">
                <span className="text-gray-400 font-body">Don&apos;t have an account? </span>
                <button
                  type="button"
                  onClick={handleSwitchToRegister}
                  className="text-accent hover:text-accent/80 font-semibold font-heading 
                           transition-colors duration-200 underline-offset-4 hover:underline"
                >
                  Sign up
                </button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
} 