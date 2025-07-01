import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
})

export const registerSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address'),
  username: z
    .string()
    .min(1, 'Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must not exceed 20 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z
    .string()
    .min(1, 'Please confirm your password'),
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
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema> 