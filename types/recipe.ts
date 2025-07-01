export type Recipe = {
  id: string;
  name: string;
  description?: string;
  ingredients: string[];
  instructions: string[];
  cookingTime: string;
  servings: number;
  slug: string;
  image?: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  author?: {
    id: string;
    username: string;
    firstName?: string;
    lastName?: string;
  };
};

export type CreateRecipeDto = {
  name: string;
  description?: string;
  ingredients: string[];
  instructions: string[];
  cookingTime: string;
  servings: number;
  image?: string;
};

export type UpdateRecipeDto = {
  name?: string;
  description?: string;
  ingredients?: string[];
  instructions?: string[];
  cookingTime?: string;
  servings?: number;
  image?: string;
};
