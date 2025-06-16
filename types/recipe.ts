export type Recipe = {
  id: string;
  name: string;
  description?: string;
  ingredients: string[];
  instructions: string[];
  cookingTime: string;
  servings: number;
  image: string;
};
