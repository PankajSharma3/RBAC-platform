import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();
  const { darkMode } = useTheme();
  const location = useLocation();

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        darkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className="text-center">
          {/* Animated loading spinner */}
          <div className="relative">
            <div className="w-20 h-20 border-4 border-gray-200 dark:border-gray-700 rounded-full animate-spin"></div>
            <div className="absolute top-0 left-0 w-20 h-20 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
          
          {/* Loading text */}
          <div className="mt-6 space-y-2">
            <h3 className={`text-lg font-semibold ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Loading...
            </h3>
            <p className={`text-sm ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Please wait while we verify your credentials
            </p>
          </div>

          {/* Loading dots animation */}
          <div className="flex justify-center space-x-1 mt-4">
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce delay-100"></div>
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce delay-200"></div>
          </div>
        </div>
      </div>
    );
  }

  // Check if user is authenticated
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check for admin access if required
  if (adminOnly && user.role !== 'admin') {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        darkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className="text-center max-w-md mx-auto p-8">
          {/* Access denied icon */}
          <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${
            darkMode 
              ? 'bg-red-900/30 border-2 border-red-700' 
              : 'bg-red-100 border-2 border-red-300'
          }`}>
            <svg className={`w-12 h-12 ${
              darkMode ? 'text-red-400' : 'text-red-500'
            }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H10m4-9V6a1 1 0 00-1-1H9a1 1 0 00-1 1v4h4z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          {/* Error message */}
          <h2 className={`text-2xl font-bold mb-3 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Access Denied
          </h2>
          <p className={`text-sm mb-6 ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            You don't have permission to access this page. Admin privileges are required.
          </p>

          {/* Action buttons */}
          <div className="space-y-3">
            <button
              onClick={() => window.history.back()}
              className={`w-full px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                darkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
              } transform hover:scale-105`}
            >
              Go Back
            </button>
            <Navigate to="/" replace />
          </div>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;