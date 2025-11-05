
import React, { useState, useEffect, useCallback } from 'react';
import { Recipe, DietaryFilters } from './types';
import { analyzeFridgeAndSuggestRecipes } from './services/geminiService';
import ImageUploader from './components/ImageUploader';
import RecipeList from './components/RecipeList';
import CookingMode from './components/CookingMode';
import ShoppingList from './components/ShoppingList';
import Sidebar from './components/Sidebar';
import Spinner from './components/Spinner';
import { ChefHatIcon } from './components/icons/ChefHatIcon';

type View = 'upload' | 'recipes' | 'cooking' | 'shopping';

const App: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [shoppingList, setShoppingList] = useState<string[]>([]);
  const [dietaryFilters, setDietaryFilters] = useState<DietaryFilters>({
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    keto: false,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<View>('upload');
  
  const handleImageUpload = async (imageDataUrl: string) => {
    setUploadedImage(imageDataUrl);
    setIsLoading(true);
    setError(null);
    setRecipes([]);
    setCurrentView('recipes');

    try {
      const activeFilters = Object.entries(dietaryFilters)
        .filter(([, value]) => value)
        .map(([key]) => key);
        
      const suggestedRecipes = await analyzeFridgeAndSuggestRecipes(imageDataUrl, activeFilters);
      setRecipes(suggestedRecipes);
    } catch (err) {
      console.error(err);
      setError('Could not get recipes. Please try a different image or prompt.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setCurrentView('cooking');
  };

  const handleExitCookingMode = () => {
    setSelectedRecipe(null);
    setCurrentView('recipes');
    // Stop any speech synthesis when exiting
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
  };

  const handleAddToShoppingList = (item: string) => {
    setShoppingList((prev) => {
      if (!prev.includes(item)) {
        return [...prev, item];
      }
      return prev;
    });
  };

  const handleRemoveFromShoppingList = (item: string) => {
    setShoppingList(prev => prev.filter(i => i !== item));
  };
  
  const handleFilterChange = useCallback((filters: DietaryFilters) => {
    setDietaryFilters(filters);
  }, []);

  useEffect(() => {
    // This effect is not currently used for filtering since we re-fetch on filter changes,
    // but would be useful for client-side filtering if we cached results.
    setFilteredRecipes(recipes);
  }, [recipes, dietaryFilters]);

  const resetApp = () => {
    setUploadedImage(null);
    setRecipes([]);
    setSelectedRecipe(null);
    setIsLoading(false);
    setError(null);
    setCurrentView('upload');
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-800 font-sans">
      <Sidebar
        filters={dietaryFilters}
        onFilterChange={handleFilterChange}
        currentView={currentView}
        onNavigate={setCurrentView}
        shoppingListCount={shoppingList.length}
        onNewAnalysis={resetApp}
        isAnalysisDone={currentView !== 'upload'}
      />
      <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto">
        {currentView === 'upload' && (
          <ImageUploader onImageUpload={handleImageUpload} isLoading={isLoading} />
        )}
        {currentView === 'recipes' && (
          <div className="h-full">
            <h2 className="text-3xl font-bold mb-4 text-green-400 flex items-center gap-2">
              <ChefHatIcon />
              Suggested Recipes
            </h2>
            {isLoading && <div className="flex justify-center items-center h-full"><Spinner /></div>}
            {error && <p className="text-red-400 bg-red-900/50 p-4 rounded-lg">{error}</p>}
            {!isLoading && recipes.length > 0 && (
              <RecipeList recipes={filteredRecipes} onSelectRecipe={handleSelectRecipe} />
            )}
            {!isLoading && recipes.length === 0 && !error && (
               <div className="text-center text-gray-400 mt-10">
                    <p>No recipes generated yet. Analysis might be in progress or resulted in no recipes.</p>
                </div>
            )}
          </div>
        )}
        {currentView === 'cooking' && selectedRecipe && (
          <CookingMode
            recipe={selectedRecipe}
            onExit={handleExitCookingMode}
            onAddToShoppingList={handleAddToShoppingList}
          />
        )}
        {currentView === 'shopping' && (
          <ShoppingList list={shoppingList} onRemove={handleRemoveFromShoppingList} />
        )}
      </main>
    </div>
  );
};

export default App;
