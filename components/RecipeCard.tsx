
import React from 'react';
import { Recipe } from '../types';
import { ClockIcon } from './icons/ClockIcon';
import { FireIcon } from './icons/FireIcon';
import { ChefHatIcon } from './icons/ChefHatIcon';

interface RecipeCardProps {
  recipe: Recipe;
  onSelect: () => void;
}

const difficultyColors = {
  Easy: 'bg-green-600',
  Medium: 'bg-yellow-600',
  Hard: 'bg-red-600',
};

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onSelect }) => {
  const ingredientsInFridge = recipe.ingredients.filter(i => i.inFridge).length;
  const totalIngredients = recipe.ingredients.length;

  return (
    <div 
      className="bg-gray-700 rounded-lg shadow-lg overflow-hidden cursor-pointer transform hover:-translate-y-1 transition-transform duration-300 flex flex-col"
      onClick={onSelect}
    >
      <div className="h-40 bg-gray-600 flex items-center justify-center">
         <img src={`https://picsum.photos/seed/${recipe.recipeName}/400/200`} alt={recipe.recipeName} className="w-full h-full object-cover"/>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-white mb-2">{recipe.recipeName}</h3>
        <p className="text-gray-300 text-sm mb-4 flex-grow">{recipe.description}</p>
        
        <div className="text-sm text-green-300 mb-4">
          You have {ingredientsInFridge} of {totalIngredients} ingredients.
        </div>

        <div className="flex justify-between items-center text-gray-300 text-sm mt-auto">
          <div className="flex items-center gap-1">
            <ClockIcon />
            <span>{recipe.prepTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <FireIcon />
            <span>{recipe.calories} kcal</span>
          </div>
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-white text-xs font-semibold ${difficultyColors[recipe.difficulty]}`}>
            <ChefHatIcon className="w-4 h-4" />
            <span>{recipe.difficulty}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
