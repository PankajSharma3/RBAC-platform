import { useTheme } from '../context/ThemeContext';
import { useState } from 'react';

const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = () => {
    setIsAnimating(true);
    toggleTheme();
    
    // Reset animation state
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  return (
    <button 
      onClick={handleToggle}
      className={`relative p-2 rounded-xl transition-all duration-300 group ${
        darkMode 
          ? 'bg-gray-700 hover:bg-gray-600 shadow-lg hover:shadow-xl' 
          : 'bg-gray-100 hover:bg-gray-200 shadow-md hover:shadow-lg'
      } transform hover:scale-110`}
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {/* Background glow effect */}
      <div className={`absolute inset-0 rounded-xl transition-opacity duration-300 ${
        darkMode 
          ? 'bg-yellow-400/20 opacity-0 group-hover:opacity-100' 
          : 'bg-indigo-500/20 opacity-0 group-hover:opacity-100'
      }`}></div>

      {/* Icon container */}
      <div className="relative z-10">
        {darkMode ? (
          // Sun icon for dark mode
          <div className={`transition-all duration-300 ${
            isAnimating ? 'rotate-180 scale-110' : 'rotate-0 scale-100'
          }`}>
            <svg 
              className="w-5 h-5 text-yellow-400 group-hover:text-yellow-300 transition-colors duration-200" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"/>
            </svg>
          </div>
        ) : (
          // Moon icon for light mode
          <div className={`transition-all duration-300 ${
            isAnimating ? 'rotate-180 scale-110' : 'rotate-0 scale-100'
          }`}>
            <svg 
              className="w-5 h-5 text-indigo-600 group-hover:text-indigo-500 transition-colors duration-200" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd"/>
            </svg>
          </div>
        )}
      </div>

      {/* Ripple effect */}
      <div className={`absolute inset-0 rounded-xl transition-all duration-300 ${
        isAnimating 
          ? 'animate-ping bg-current opacity-20' 
          : 'opacity-0'
      }`}></div>

      {/* Tooltip on hover */}
      <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 ${
        darkMode 
          ? 'bg-gray-800 text-white border border-gray-700' 
          : 'bg-white text-gray-900 border border-gray-200 shadow-lg'
      }`}>
        {darkMode ? 'Light mode' : 'Dark mode'}
        {/* Tooltip arrow */}
        <div className={`absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 ${
          darkMode 
            ? 'border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-800' 
            : 'border-l-4 border-r-4 border-b-4 border-transparent border-b-white'
        }`}></div>
      </div>
    </button>
  );
};

export default ThemeToggle;