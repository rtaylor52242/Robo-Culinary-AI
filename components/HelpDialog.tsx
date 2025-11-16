import React from 'react';
import { XIcon } from './icons/XIcon';

interface HelpDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelpDialog: React.FC<HelpDialogProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 animate-fade-in"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="bg-gray-800 rounded-lg shadow-2xl p-6 md:p-8 max-w-2xl w-11/12 border border-gray-700 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white transition-colors"
          aria-label="Close help dialog"
        >
          <XIcon />
        </button>

        <h2 className="text-2xl md:text-3xl font-bold text-green-400 mb-6">
          How to Use Robo AI - Culinary Tool
        </h2>

        <div className="space-y-4 text-gray-300">
          <div>
            <h3 className="font-semibold text-lg text-white mb-1">1. Snap & Upload</h3>
            <p>Take a clear photo of the inside of your fridge. Then, drag and drop it or use the "Browse Files" button to upload.</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-white mb-1">2. Filter (Optional)</h3>
            <p>Use the checkboxes in the sidebar to apply dietary filters like 'Vegetarian' or 'Keto'. Filters are applied when you start a new analysis.</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-white mb-1">3. Discover Recipes</h3>
            <p>Our AI will analyze your ingredients and suggest recipes. Click on any recipe card to see the full details and cooking instructions.</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-white mb-1">4. Cook with a Guide</h3>
            <p>In Cooking Mode, follow the step-by-step instructions. Use the "Read Aloud" button to have the steps spoken to you, perfect for hands-free cooking.</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-white mb-1">5. Build Your Shopping List</h3>
            <p>Missing an ingredient? In Cooking Mode, click the <span className="inline-flex items-center justify-center bg-blue-500 rounded-full w-4 h-4 text-white text-xs font-bold">+</span> button next to it. View your complete list anytime from the sidebar.</p>
          </div>
        </div>

        <div className="mt-8 text-right">
          <button 
            onClick={onClose}
            className="bg-green-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-700 transition-colors"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpDialog;