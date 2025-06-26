import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from './ThemeToggle';
import { useState } from 'react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMenuOpen(false);
  };

  return (
    <nav className={`sticky top-0 z-50 backdrop-blur-lg transition-all duration-300 ${
      darkMode 
        ? 'bg-gray-900/90 border-gray-700/50' 
        : 'bg-white/90 border-gray-200/50'
    } border-b shadow-sm`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"/>
                </svg>
              </div>
              <span className={`text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent group-hover:from-indigo-500 group-hover:to-purple-500 transition-all duration-300`}>
                BlogSphere
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            
            {user ? (
              <div className="flex items-center space-x-4">
                {user.role === 'admin' && (
                  <Link 
                    to="/dashboard" 
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      darkMode 
                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-xl' 
                        : 'bg-indigo-500 hover:bg-indigo-600 text-white shadow-lg hover:shadow-xl'
                    } transform hover:scale-105`}
                  >
                    Dashboard
                  </Link>
                )}
                
                <div className="flex items-center space-x-3">
                  <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
                    darkMode ? 'bg-gray-800' : 'bg-gray-100'
                  }`}>
                    <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-xs font-semibold text-white">
                        {user.name?.charAt(0)?.toUpperCase() || 'U'}
                      </span>
                    </div>
                    <span className={`text-sm font-medium ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {user.name}
                    </span>
                  </div>
                  
                  <button 
                    onClick={handleLogout}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      darkMode 
                        ? 'bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white' 
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-700 hover:text-gray-900'
                    } transform hover:scale-105`}
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex space-x-3">
                <Link 
                  to="/login" 
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    darkMode 
                      ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900'
                  } transform hover:scale-105`}
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    darkMode 
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700' 
                      : 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600'
                  } text-white shadow-lg hover:shadow-xl transform hover:scale-105`}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-lg ${
                darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              } transition-colors duration-200`}
            >
              <svg className={`w-6 h-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className={`md:hidden border-t ${
            darkMode ? 'border-gray-700' : 'border-gray-200'
          } py-4`}>
            {user ? (
              <div className="space-y-3">
                <div className={`flex items-center space-x-3 px-4 py-2 rounded-lg ${
                  darkMode ? 'bg-gray-800' : 'bg-gray-100'
                }`}>
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-white">
                      {user.name?.charAt(0)?.toUpperCase() || 'U'}
                    </span>
                  </div>
                  <span className={`font-medium ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {user.name}
                  </span>
                </div>
                
                {user.role === 'admin' && (
                  <Link 
                    to="/dashboard" 
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      darkMode 
                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
                        : 'bg-indigo-500 hover:bg-indigo-600 text-white'
                    }`}
                  >
                    Dashboard
                  </Link>
                )}
                
                <button 
                  onClick={handleLogout}
                  className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    darkMode 
                      ? 'bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white' 
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700 hover:text-gray-900'
                  }`}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <Link 
                  to="/login" 
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    darkMode 
                      ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900'
                  }`}
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    darkMode 
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700' 
                      : 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600'
                  } text-white`}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;