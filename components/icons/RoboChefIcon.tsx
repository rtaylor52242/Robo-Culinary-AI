
import React from 'react';

export const RoboChefIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* The hat puff */}
    <path d="M12 2a5 5 0 0 1 5 5c0 1.6-1.4 3-3 3H10c-1.6 0-3-1.4-3-3a5 5 0 0 1 5-5z" />
    
    {/* The robot head / hat band */}
    <rect x="4" y="10" width="16" height="12" rx="2" />
    
    {/* The robot eyes (as slots) */}
    <line x1="9" y1="16" x2="11" y2="16" />
    <line x1="13" y1="16" x2="15" y2="16" />
  </svg>
);
