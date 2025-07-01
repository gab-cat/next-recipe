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
import { useUpdateRecipe } from '@/src/features/recipes/hooks/use-recipes'
import { updateRecipeSchema, type UpdateRecipeFormData } from '@/src/features/recipes/schemas/recipe-schema'
import { Recipe } from '@/types/recipe'
import { useEffect } from 'react'

interface EditRecipeSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  recipe: Recipe
}

export function EditRecipeSheet({ open, onOpenChange, recipe }: EditRecipeSheetProps) {
  const { mutate: updateRecipe, isPending } = useUpdateRecipe()

  const form = useForm<UpdateRecipeFormData>({
    mode: 'onBlur',
    resolver: zodResolver(updateRecipeSchema),
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

  // Update form values when recipe changes
  useEffect(() => {
    if (recipe) {
      form.reset({
        name: recipe.name,
        description: recipe.description || '',
        ingredients: recipe.ingredients.length > 0 ? recipe.ingredients : [''],
        instructions: recipe.instructions.length > 0 ? recipe.instructions : [''],
        cookingTime: recipe.cookingTime,
        servings: recipe.servings,
        image: recipe.image || '',
      })
    }
  }, [recipe, form])

  const { fields: ingredientFields, append: appendIngredient, remove: removeIngredient } = useFieldArray({
    control: form.control,
    name: 'ingredients' as never,
  })

  const { fields: instructionFields, append: appendInstruction, remove: removeInstruction } = useFieldArray({
    control: form.control,
    name: 'instructions' as never,
  })

  const handleSubmit = (data: UpdateRecipeFormData) => {
    // Filter out empty ingredients and instructions
    const cleanedData = {
      ...data,
      ingredients: data.ingredients?.filter(ingredient => ingredient.trim() !== '') || [],
      instructions: data.instructions?.filter(instruction => instruction.trim() !== '') || [],
    }

    updateRecipe({ slug: recipe.slug, data: cleanedData }, {
      onSuccess: () => {
        onOpenChange(false)
      },
    })
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-2xl overflow-y-auto bg-gray-900 border-gray-800">
        <SheetHeader className="space-y-4 pb-6 border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/30">
              <ChefHat className="w-6 h-6 text-primary" />
            </div>
            <div>
              <SheetTitle className="text-2xl font-bold text-white font-heading">
                Edit <span className="text-accent">{recipe.name}</span>
              </SheetTitle>
              <SheetDescription className="text-gray-400 font-mono">
                Update your delicious recipe and share improvements with the community.
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 pt-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white font-heading border-b border-gray-700/50 pb-2">
                Basic Information
              </h3>
              
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-200 font-mono flex items-center gap-1">
                      <ChefHat className="w-4 h-4" />
                      Recipe Name *
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Delicious Pasta Carbonara"
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
                    <FormLabel className="text-gray-200 font-mono">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="A brief description of your recipe..."
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                          placeholder="30 minutes"
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
                  Add Instruction
                </Button>
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
                    <ChefHat className="w-4 h-4 mr-2" />
                    Update Recipe
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
} 