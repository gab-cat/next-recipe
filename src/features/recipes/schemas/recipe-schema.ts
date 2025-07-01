import { z } from 'zod'

export const createRecipeSchema = z.object({
  name: z
    .string()
    .min(1, 'Recipe name is required')
    .max(100, 'Recipe name must not exceed 100 characters'),
  description: z
    .string()
    .max(500, 'Description must not exceed 500 characters')
    .optional(),
  ingredients: z
    .array(z.string().min(1, 'Ingredient cannot be empty'))
    .min(1, 'At least one ingredient is required')
    .max(50, 'Cannot exceed 50 ingredients'),
  instructions: z
    .array(z.string().min(1, 'Instruction cannot be empty'))
    .min(1, 'At least one instruction is required')
    .max(20, 'Cannot exceed 20 instructions'),
  cookingTime: z
    .string()
    .min(1, 'Cooking time is required')
    .regex(/^\d+\s*(minutes?|hours?|hrs?)$/i, 'Cooking time must be in format like "30 minutes" or "2 hours"'),
  servings: z
    .number()
    .min(1, 'Servings must be at least 1')
    .max(50, 'Servings cannot exceed 50'),
  image: z
    .string()
    .url('Image must be a valid URL')
    .optional(),
})

export const updateRecipeSchema = createRecipeSchema.partial()

export type CreateRecipeFormData = z.infer<typeof createRecipeSchema>
export type UpdateRecipeFormData = z.infer<typeof updateRecipeSchema> 