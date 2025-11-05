
import React from 'react';
import { ShoppingCartIcon } from './icons/ShoppingCartIcon';
import { XIcon } from './icons/XIcon';

interface ShoppingListProps {
  list: string[];
  onRemove: (item: string) => void;
}

const ShoppingList: React.FC<ShoppingListProps> = ({ list, onRemove }) => {
  return (
    <div className="bg-gray-800 text-white p-4 sm:p-6 rounded-lg shadow-2xl h-full flex flex-col">
      <h2 className="text-3xl font-bold mb-6 text-green-400 flex items-center gap-3">
        <ShoppingCartIcon />
        Shopping List
      </h2>
      {list.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-center">
          <p className="text-gray-400">Your shopping list is empty. <br/> Add missing ingredients from a recipe to see them here.</p>
        </div>
      ) : (
        <ul className="space-y-3 overflow-y-auto">
          {list.map((item, index) => (
            <li 
              key={index} 
              className="flex justify-between items-center bg-gray-700 p-4 rounded-lg animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <span className="text-lg">{item}</span>
              <button
                onClick={() => onRemove(item)}
                className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-red-600 transition-colors"
                title={`Remove ${item}`}
              >
                <XIcon />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShoppingList;
