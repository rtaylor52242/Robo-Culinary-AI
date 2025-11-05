
export interface Ingredient {
  name: string;
  quantity: string;
  inFridge: boolean;
}

export interface Recipe {
  recipeName: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  prepTime: string;
  calories: number;
  ingredients: Ingredient[];
  steps: string[];
}

export interface DietaryFilters {
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  keto: boolean;
}
