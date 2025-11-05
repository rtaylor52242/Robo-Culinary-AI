
import React, { useState, useEffect } from 'react';
import { Recipe, Ingredient } from '../types';
import { VolumeUpIcon } from './icons/VolumeUpIcon';
import { PlusIcon } from './icons/PlusIcon';
import { XIcon } from './icons/XIcon';

interface CookingModeProps {
  recipe: Recipe;
  onExit: () => void;
  onAddToShoppingList: (item: string) => void;
}

const CookingMode: React.FC<CookingModeProps> = ({ recipe, onExit, onAddToShoppingList }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const handleSpeechEnd = () => setIsSpeaking(false);
    window.speechSynthesis.addEventListener('end', handleSpeechEnd);
    return () => {
      window.speechSynthesis.removeEventListener('end', handleSpeechEnd);
      window.speechSynthesis.cancel();
    };
  }, []);

  const handleSpeak = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(recipe.steps[currentStep]);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };
  
  const handleNextStep = () => {
    if (currentStep < recipe.steps.length - 1) {
      setCurrentStep(currentStep + 1);
      if(isSpeaking) window.speechSynthesis.cancel();
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      if(isSpeaking) window.speechSynthesis.cancel();
    }
  };
  
  const renderIngredient = (ingredient: Ingredient) => (
    <li key={ingredient.name} className="flex items-center justify-between py-2 border-b border-gray-600">
        <span className={`${ingredient.inFridge ? 'text-green-400' : 'text-yellow-400'}`}>
            {ingredient.quantity} {ingredient.name}
        </span>
        {!ingredient.inFridge && (
            <button 
              onClick={() => onAddToShoppingList(ingredient.name)}
              className="p-1 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors"
              title={`Add ${ingredient.name} to shopping list`}
            >
                <PlusIcon />
            </button>
        )}
    </li>
  );

  return (
    <div className="bg-gray-800 text-white p-4 md:p-6 rounded-lg shadow-2xl h-full flex flex-col animate-fade-in">
        <div className="flex justify-between items-start mb-4">
            <div>
                <h1 className="text-3xl md:text-4xl font-bold text-green-400">{recipe.recipeName}</h1>
                <p className="text-gray-400">{recipe.description}</p>
            </div>
            <button onClick={onExit} className="p-2 rounded-full hover:bg-gray-700 transition-colors">
                <XIcon />
            </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 flex-1 overflow-hidden">
            {/* Ingredients Panel */}
            <div className="lg:w-1/3 bg-gray-700/50 p-4 rounded-lg overflow-y-auto">
                <h2 className="text-2xl font-semibold mb-3">Ingredients</h2>
                <ul className="space-y-1 text-sm">
                    {recipe.ingredients.map(renderIngredient)}
                </ul>
            </div>

            {/* Steps Panel */}
            <div className="lg:w-2/3 flex flex-col bg-gray-900/70 p-6 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">Step {currentStep + 1} <span className="text-gray-400">/ {recipe.steps.length}</span></h2>
                    <button 
                      onClick={handleSpeak}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${isSpeaking ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}`}
                    >
                        <VolumeUpIcon />
                        {isSpeaking ? 'Stop' : 'Read Aloud'}
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto mb-4">
                    <p className="text-2xl md:text-3xl leading-relaxed text-gray-200">
                        {recipe.steps[currentStep]}
                    </p>
                </div>
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-700">
                    <button 
                        onClick={handlePrevStep} 
                        disabled={currentStep === 0}
                        className="px-6 py-3 bg-gray-600 rounded-lg font-semibold hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Previous
                    </button>
                    <button 
                        onClick={handleNextStep} 
                        disabled={currentStep === recipe.steps.length - 1}
                        className="px-6 py-3 bg-green-600 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default CookingMode;
