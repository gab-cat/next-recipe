'use client'

import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChefHat, Clock, Users, Image as ImageIcon, Loader2, Plus, X } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
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
import { useCreateRecipe } from '@/src/features/recipes/hooks/use-recipes'
import { createRecipeSchema, type CreateRecipeFormData } from '@/src/features/recipes/schemas/recipe-schema'

interface CreateRecipeSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateRecipeSheet({ open, onOpenChange }: CreateRecipeSheetProps) {
  const { mutate: createRecipe, isPending } = useCreateRecipe()

  const form = useForm<CreateRecipeFormData>({
    mode: 'onBlur',
    resolver: zodResolver(createRecipeSchema),
    defaultValues: {
      name: '',
      description: '',
      ingredients: [''],
      instructions: [''],
      cookingTime: '',
      servings: 1,
      image: '',
    },
  })

  const { fields: ingredientFields, append: appendIngredient, remove: removeIngredient } = useFieldArray({
    control: form.control,
    name: 'ingredients' as never,
  })

  const { fields: instructionFields, append: appendInstruction, remove: removeInstruction } = useFieldArray({
    control: form.control,
    name: 'instructions' as never,
  })

  const handleSubmit = (data: CreateRecipeFormData) => {
    // Filter out empty ingredients and instructions
    const cleanedData = {
      ...data,
      ingredients: data.ingredients.filter(ingredient => ingredient.trim() !== ''),
      instructions: data.instructions.filter(instruction => instruction.trim() !== ''),
    }

    createRecipe(cleanedData, {
      onSuccess: () => {
        form.reset({
          name: '',
          description: '',
          ingredients: [''],
          instructions: [''],
          cookingTime: '',
          servings: 1,
          image: '',
        })
        onOpenChange(false)
      },
    })
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[95vw] max-w-[600px] max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-800 p-0">
        <div className="p-6 space-y-6">
          <SheetHeader className="space-y-2">
            <SheetTitle className="text-2xl font-bold text-white font-heading flex items-center gap-2">
              <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center border border-primary/30">
                <ChefHat className="w-5 h-5 text-primary" />
              </div>
              Create<span className="text-accent">New Recipe</span>
            </SheetTitle>
            <SheetDescription className="text-gray-300 font-body">
              Share your culinary creation with the <span className="font-heading">Recipe<span className="text-accent">Hub</span></span> community
            </SheetDescription>
          </SheetHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white font-heading border-b border-gray-700/50 pb-2">
                  Basic Information
                </h3>
                
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200 font-mono">Recipe Name *</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="e.g., Classic Spaghetti Carbonara"
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
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200 font-mono">Description</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Brief description of your recipe..."
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

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="cookingTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-200 font-mono flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          Cooking Time *
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="e.g., 30 minutes"
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
                    name="servings"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-200 font-mono flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          Servings *
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            min="1"
                            max="50"
                            placeholder="4"
                            className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 
                                     focus:border-primary/60 focus:ring-primary/20 rounded-xl 
                                     font-mono"
                            disabled={isPending}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400 font-mono text-xs" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200 font-mono flex items-center gap-1">
                        <ImageIcon className="w-4 h-4" />
                        Image URL
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="url"
                          placeholder="https://example.com/recipe-image.jpg"
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

              {/* Ingredients */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white font-heading border-b border-gray-700/50 pb-2">
                  Ingredients *
                </h3>
                <div className="space-y-3">
                  {ingredientFields.map((field, index) => (
                    <FormField
                      key={field.id}
                      control={form.control}
                      name={`ingredients.${index}`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex gap-2">
                              <Input
                                {...field}
                                placeholder={`Ingredient ${index + 1}`}
                                className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 
                                         focus:border-primary/60 focus:ring-primary/20 rounded-xl 
                                         font-mono"
                                disabled={isPending}
                              />
                              {ingredientFields.length > 1 && (
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => removeIngredient(index)}
                                  className="border-gray-600 text-gray-400 hover:text-red-400 hover:border-red-400 rounded-xl"
                                  disabled={isPending}
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          </FormControl>
                          <FormMessage className="text-red-400 font-mono text-xs" />
                        </FormItem>
                      )}
                    />
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => appendIngredient('')}
                    className="w-full border-gray-600 text-gray-300 bg-gray-800/50 hover:bg-gray-800/50 rounded-xl"
                    disabled={isPending}
                  >
                    <Plus className="w-4 h-4" />
                    Add Ingredient
                  </Button>
                </div>
              </div>

              {/* Instructions */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white font-heading border-b border-gray-700/50 pb-2">
                  Instructions *
                </h3>
                <div className="space-y-3">
                  {instructionFields.map((field, index) => (
                    <FormField
                      key={field.id}
                      control={form.control}
                      name={`instructions.${index}`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex items-start gap-2">
                              <div className="w-6 h-6 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center mt-2 flex-shrink-0">
                                <span className="text-xs font-bold text-primary">{index + 1}</span>
                              </div>
                              <div className="flex-1 flex gap-2">
                                <Input
                                  {...field}
                                  placeholder={`Step ${index + 1} instructions...`}
                                  className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 
                                           focus:border-primary/60 focus:ring-primary/20 rounded-xl 
                                           font-mono"
                                  disabled={isPending}
                                />
                                {instructionFields.length > 1 && (
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => removeInstruction(index)}
                                    className="border-gray-600 text-gray-400 hover:text-red-400 hover:border-red-400 rounded-xl"
                                    disabled={isPending}
                                  >
                                    <X className="w-4 h-4" />
                                  </Button>
                                )}
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage className="text-red-400 font-mono text-xs" />
                        </FormItem>
                      )}
                    />
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => appendInstruction('')}
                    className="w-full border-gray-600 text-gray-300 bg-gray-800/50 hover:bg-gray-800/50 rounded-xl"
                    disabled={isPending}
                  >
                    <Plus className="w-4 h-4" />
                    Add Step
                  </Button>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-gray-700/30">
                <Button
                  type="submit"
                  className="w-full bg-primary/20 border border-primary/30 hover:bg-primary/30 
                           hover:border-primary/70 hover:shadow-primary/40 shadow-xl shadow-primary/20 
                           text-white rounded-xl font-mono transition-all duration-300
                           disabled:opacity-50 disabled:cursor-not-allowed h-12"
                  disabled={isPending || !form.formState.isValid}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      <span>Creating Recipe...</span>
                    </>
                  ) : (
                    <>
                      <ChefHat className="mr-2 h-4 w-4" />
                      <span>Create Recipe</span>
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  )
} 