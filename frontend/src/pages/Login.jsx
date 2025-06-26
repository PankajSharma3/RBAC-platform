import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await login({ email, password });
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900' 
        : 'bg-gradient-to-br from-gray-50 via-white to-indigo-50'
    }`}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-20 blur-3xl ${
          darkMode ? 'bg-indigo-600' : 'bg-indigo-400'
        }`}></div>
        <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-20 blur-3xl ${
          darkMode ? 'bg-purple-600' : 'bg-purple-400'
        }`}></div>
      </div>

      <div className={`relative w-full max-w-md p-8 rounded-3xl shadow-2xl border backdrop-blur-lg transition-all duration-300 ${
        darkMode 
          ? 'bg-gray-800/80 border-gray-700' 
          : 'bg-white/80 border-gray-200'
      }`}>
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-4">👋</div>
          <h1 className={`text-3xl font-black mb-2 bg-gradient-to-r ${
            darkMode 
              ? 'from-white via-indigo-200 to-indigo-400' 
              : 'from-gray-900 via-indigo-600 to-purple-600'
          } bg-clip-text text-transparent`}>
            Welcome Back
          </h1>
          <p className={`text-lg ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Sign in to your account
          </p>
        </div>
        
        {/* Error Message */}
        {error && (
          <div className={`mb-6 p-4 rounded-2xl border-l-4 ${
            darkMode 
              ? 'bg-red-900/20 border-red-500 text-red-400' 
              : 'bg-red-50 border-red-500 text-red-700'
          }`}>
            <div className="flex items-center">
              <span className="mr-2">⚠️</span>
              {error}
            </div>
          </div>
        )}
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className={`block mb-2 text-sm font-semibold ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-3 pl-12 rounded-2xl border-2 transition-all duration-200 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 ${
                  darkMode 
                    ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                placeholder="Enter your email"
                required
              />
              <div className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                📧
              </div>
            </div>
          </div>
          
          {/* Password Field */}
          <div>
            <label htmlFor="password" className={`block mb-2 text-sm font-semibold ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 pl-12 pr-12 rounded-2xl border-2 transition-all duration-200 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 ${
                  darkMode 
                    ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                placeholder="Enter your password"
                required
              />
              <div className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                🔒
              </div>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-4 top-1/2 transform -translate-y-1/2 transition-colors ${
                  darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {!showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>
          
          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg ${
              loading 
                ? 'bg-gray-400 cursor-not-allowed text-gray-600' 
                : (darkMode 
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-indigo-500/25' 
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-indigo-500/25'
                  )
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                Signing in...
              </div>
            ) : (
              '🚀 Sign In'
            )}
          </button>
        </form>
        
        {/* Footer */}
        <div className="mt-8 text-center">
          <p className={`text-sm ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Don't have an account?{' '}
            <Link 
              to="/signup" 
              className={`font-semibold transition-colors ${
                darkMode 
                  ? 'text-indigo-400 hover:text-indigo-300' 
                  : 'text-indigo-600 hover:text-indigo-700'
              }`}
            >
              Sign up here
            </Link>
          </p>
        </div>

        {/* Demo credentials hint */}
        <div className={`mt-6 p-4 rounded-2xl border-2 border-dashed ${
          darkMode 
            ? 'border-gray-600 bg-gray-700/30' 
            : 'border-gray-300 bg-gray-50'
        }`}>
          <p className={`text-xs text-center ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            💡 Demo Mode: Use any valid email format and password
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;