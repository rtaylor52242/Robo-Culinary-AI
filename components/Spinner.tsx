
import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-green-400"></div>
        <p className="text-lg text-gray-300">AI is thinking...</p>
    </div>
  );
};

export default Spinner;
