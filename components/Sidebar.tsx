import React from 'react';
import { DietaryFilters } from '../types';
import { ShoppingCartIcon } from './icons/ShoppingCartIcon';
import { BookOpenIcon } from './icons/BookOpenIcon';
import { ChefHatIcon } from './icons/ChefHatIcon';

type View = 'upload' | 'recipes' | 'cooking' | 'shopping';

interface SidebarProps {
  filters: DietaryFilters;
  onFilterChange: (filters: DietaryFilters) => void;
  currentView: View;
  onNavigate: (view: View) => void;
  shoppingListCount: number;
  onNewAnalysis: () => void;
  isAnalysisDone: boolean;
}

const NavItem: React.FC<{
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
  badge?: number;
}> = ({ label, icon, isActive, onClick, badge }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
      isActive ? 'bg-green-600 text-white' : 'text-gray-300 hover:bg-gray-700'
    }`}
  >
    {icon}
    <span className="flex-1 font-semibold">{label}</span>
    {badge !== undefined && badge > 0 && (
      <span className="bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
        {badge}
      </span>
    )}
  </button>
);


const FilterCheckbox: React.FC<{ label: string; checked: boolean; onChange: (checked: boolean) => void }> = ({ label, checked, onChange }) => (
    <label className="flex items-center space-x-3 cursor-pointer">
      <div className="relative">
        <input 
            type="checkbox" 
            className="sr-only" 
            checked={checked} 
            onChange={(e) => onChange(e.target.checked)}
        />
        <div className={`block w-10 h-6 rounded-full transition-colors ${checked ? 'bg-green-500' : 'bg-gray-600'}`}></div>
        <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${checked ? 'transform translate-x-4' : ''}`}></div>
      </div>
      <span className="text-gray-300">{label}</span>
    </label>
);


const Sidebar: React.FC<SidebarProps> = ({ filters, onFilterChange, currentView, onNavigate, shoppingListCount, onNewAnalysis, isAnalysisDone }) => {
  const handleCheckboxChange = (filterName: keyof DietaryFilters, isChecked: boolean) => {
    onFilterChange({ ...filters, [filterName]: isChecked });
  };

  return (
    <aside className="w-full md:w-72 bg-gray-900 p-6 flex-shrink-0 flex flex-col gap-8 border-b-2 md:border-b-0 md:border-r-2 border-gray-700">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2 mb-6">
          <ChefHatIcon className="text-green-400" />
          Robo Culinary AI
        </h1>
        <button
          onClick={onNewAnalysis}
          className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
        >
          Start New Analysis
        </button>
      </div>

      {isAnalysisDone && (
         <nav className="flex flex-col gap-2">
            <NavItem 
                label="Recipes" 
                icon={<BookOpenIcon />} 
                isActive={currentView === 'recipes' || currentView === 'cooking'}
                onClick={() => onNavigate('recipes')}
            />
            <NavItem 
                label="Shopping List" 
                icon={<ShoppingCartIcon />} 
                isActive={currentView === 'shopping'}
                onClick={() => onNavigate('shopping')}
                badge={shoppingListCount}
            />
        </nav>
      )}

      <div className="flex-1">
        <h2 className="text-lg font-semibold text-gray-200 mb-4">Dietary Filters</h2>
        <div className="space-y-4">
          <FilterCheckbox label="Vegetarian" checked={filters.vegetarian} onChange={(c) => handleCheckboxChange('vegetarian', c)} />
          <FilterCheckbox label="Vegan" checked={filters.vegan} onChange={(c) => handleCheckboxChange('vegan', c)} />
          <FilterCheckbox label="Gluten-Free" checked={filters.glutenFree} onChange={(c) => handleCheckboxChange('glutenFree', c)} />
          <FilterCheckbox label="Keto" checked={filters.keto} onChange={(c) => handleCheckboxChange('keto', c)} />
        </div>
        <p className="text-xs text-gray-500 mt-4">Filters are applied when you start a new analysis.</p>
      </div>
      
      <div className="text-center text-xs text-gray-500 mt-auto">
        Powered by Gemini
      </div>
    </aside>
  );
};

export default Sidebar;