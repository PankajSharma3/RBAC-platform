import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const NotFound = () => {
  const { darkMode } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-red-900' 
        : 'bg-gradient-to-br from-gray-50 via-white to-red-50'
    }`}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute top-1/4 left-1/4 w-64 h-64 rounded-full opacity-10 blur-3xl ${
          darkMode ? 'bg-red-600' : 'bg-red-400'
        }`}></div>
        <div className={`absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-10 blur-3xl ${
          darkMode ? 'bg-orange-600' : 'bg-orange-400'
        }`}></div>
      </div>

      <div className="relative text-center max-w-2xl mx-auto">
        {/* Animated 404 */}
        <div className="mb-8">
          <h1 className={`text-8xl md:text-9xl font-black mb-4 bg-gradient-to-r ${
            darkMode 
              ? 'from-red-400 via-orange-400 to-yellow-400' 
              : 'from-red-600 via-orange-600 to-yellow-600'
          } bg-clip-text text-transparent animate-pulse`}>
            404
          </h1>
          
          {/* Floating emojis */}
          <div className="relative">
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 animate-bounce text-4xl">
              🤔
            </div>
            <div className="absolute -top-12 left-1/4 transform animate-bounce text-2xl" style={{ animationDelay: '0.5s' }}>
              ❓
            </div>
            <div className="absolute -top-12 right-1/4 transform animate-bounce text-2xl" style={{ animationDelay: '1s' }}>
              🔍
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className={`mb-12 p-8 rounded-3xl shadow-xl border backdrop-blur-lg ${
          darkMode 
            ? 'bg-gray-800/50 border-gray-700' 
            : 'bg-white/70 border-gray-200'
        }`}>
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Oops! Page Not Found
          </h2>
          
          <p className={`text-lg md:text-xl mb-6 leading-relaxed ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            The page you're looking for seems to have wandered off into the digital wilderness. 
            Don't worry, it happens to the best of us!
          </p>

          {/* Suggestions */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-sm ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            <div className={`p-4 rounded-2xl ${
              darkMode ? 'bg-gray-700/30' : 'bg-gray-50'
            }`}>
              <div className="text-2xl mb-2">🏠</div>
              <p>Check the URL or go back home</p>
            </div>
            <div className={`p-4 rounded-2xl ${
              darkMode ? 'bg-gray-700/30' : 'bg-gray-50'
            }`}>
              <div className="text-2xl mb-2">🔗</div>
              <p>The link might be broken</p>
            </div>
            <div className={`p-4 rounded-2xl ${
              darkMode ? 'bg-gray-700/30' : 'bg-gray-50'
            }`}>
              <div className="text-2xl mb-2">📝</div>
              <p>Browse our latest posts</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/" 
              className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg ${
                darkMode 
                  ? 'bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white shadow-red-500/25' 
                  : 'bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white shadow-red-500/25'
              }`}
            >
              🏠 Go Home
            </Link>
            
            <button 
              onClick={() => window.history.back()}
              className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-200 transform hover:scale-105 border-2 ${
                darkMode 
                  ? 'border-gray-600 text-gray-300 hover:border-gray-500 hover:bg-gray-700/30' 
                  : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50'
              }`}
            >
              ⬅️ Go Back
            </button>
          </div>
        </div>

        {/* Fun fact */}
        <div className={`text-center ${
          darkMode ? 'text-gray-500' : 'text-gray-400'
        }`}>
          <p className="text-sm">
            💡 Fun fact: The first 404 error was at CERN in 1992!
          </p>
        </div>
      </div>

      {/* Floating animation elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/6 animate-float text-6xl opacity-20">
          🌟
        </div>
        <div className="absolute top-1/3 right-1/6 animate-float text-4xl opacity-20" style={{ animationDelay: '2s' }}>
          ✨
        </div>
        <div className="absolute bottom-1/4 left-1/3 animate-float text-5xl opacity-20" style={{ animationDelay: '4s' }}>
          💫
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default NotFound;