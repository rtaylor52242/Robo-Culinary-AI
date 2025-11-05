
import React from 'react';
import { Recipe } from '../types';
import RecipeCard from './RecipeCard';

interface RecipeListProps {
  recipes: Recipe[];
  onSelectRecipe: (recipe: Recipe) => void;
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes, onSelectRecipe }) => {
  if (recipes.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-400">No recipes match the current criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {recipes.map((recipe, index) => (
        <RecipeCard key={index} recipe={recipe} onSelect={() => onSelectRecipe(recipe)} />
      ))}
    </div>
  );
};

export default RecipeList;
