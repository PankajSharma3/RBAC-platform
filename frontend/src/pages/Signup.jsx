import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { signup } = useAuth();
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    
    if (name.trim().length < 2) {
      setError('Name must be at least 2 characters long');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      await signup({ name: name.trim(), email, password, role });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || err.response?.data?.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrength = (password) => {
    if (password.length === 0) return { strength: 0, label: '', color: '' };
    if (password.length < 6) return { strength: 25, label: 'Too short', color: 'red' };
    if (password.length < 8) return { strength: 50, label: 'Weak', color: 'orange' };
    if (password.length < 12 && /[A-Z]/.test(password) && /[0-9]/.test(password)) {
      return { strength: 75, label: 'Good', color: 'yellow' };
    }
    if (password.length >= 12 && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) {
      return { strength: 100, label: 'Strong', color: 'green' };
    }
    return { strength: 60, label: 'Fair', color: 'yellow' };
  };

  const passwordStrength = getPasswordStrength(password);

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900' 
        : 'bg-gradient-to-br from-gray-50 via-white to-purple-50'
    }`}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-20 blur-3xl ${
          darkMode ? 'bg-purple-600' : 'bg-purple-400'
        }`}></div>
        <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-20 blur-3xl ${
          darkMode ? 'bg-indigo-600' : 'bg-indigo-400'
        }`}></div>
      </div>

      <div className={`relative w-full max-w-md p-8 rounded-3xl shadow-2xl border backdrop-blur-lg transition-all duration-300 ${
        darkMode 
          ? 'bg-gray-800/80 border-gray-700' 
          : 'bg-white/80 border-gray-200'
      }`}>
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-4">✨</div>
          <h1 className={`text-3xl font-black mb-2 bg-gradient-to-r ${
            darkMode 
              ? 'from-white via-purple-200 to-purple-400' 
              : 'from-gray-900 via-purple-600 to-indigo-600'
          } bg-clip-text text-transparent`}>
            Create Account
          </h1>
          <p className={`text-lg ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Join our creative community
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
          {/* Name Field */}
          <div>
            <label htmlFor="name" className={`block mb-2 text-sm font-semibold ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full px-4 py-3 pl-12 rounded-2xl border-2 transition-all duration-200 focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 ${
                  darkMode 
                    ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                placeholder="Enter your full name"
                required
              />
              <div className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                👤
              </div>
            </div>
          </div>
          
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
                className={`w-full px-4 py-3 pl-12 rounded-2xl border-2 transition-all duration-200 focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 ${
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
                className={`w-full px-4 py-3 pl-12 pr-12 rounded-2xl border-2 transition-all duration-200 focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 ${
                  darkMode 
                    ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                placeholder="Create a strong password"
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
            
            {/* Password Strength Indicator */}
            {password && (
              <div className="mt-2">
                <div className={`flex items-center justify-between text-xs ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  <span>Password strength</span>
                  <span className={`font-semibold ${
                    passwordStrength.color === 'red' ? 'text-red-500' :
                    passwordStrength.color === 'orange' ? 'text-orange-500' :
                    passwordStrength.color === 'yellow' ? 'text-yellow-500' :
                    'text-green-500'
                  }`}>
                    {passwordStrength.label}
                  </span>
                </div>
                <div className={`mt-1 h-2 rounded-full ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-200'
                }`}>
                  <div 
                    className={`h-full rounded-full transition-all duration-300 ${
                      passwordStrength.color === 'red' ? 'bg-red-500' :
                      passwordStrength.color === 'orange' ? 'bg-orange-500' :
                      passwordStrength.color === 'yellow' ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`}
                    style={{ width: `${passwordStrength.strength}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
          
          {/* Role Field */}
          <div>
            <label htmlFor="role" className={`block mb-2 text-sm font-semibold ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Account Type
            </label>
            <div className="relative">
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className={`w-full px-4 py-3 pl-12 rounded-2xl border-2 transition-all duration-200 focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 ${
                  darkMode 
                    ? 'bg-gray-700/50 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option value="user">👤 Regular User</option>
                <option value="admin">👑 Administrator</option>
              </select>
              <div className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                🎭
              </div>
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
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-purple-500/25' 
                    : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-purple-500/25'
                  )
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                Creating account...
              </div>
            ) : (
              '🎉 Create Account'
            )}
          </button>
        </form>
        
        {/* Footer */}
        <div className="mt-8 text-center">
          <p className={`text-sm ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Already have an account?{' '}
            <Link 
              to="/login" 
              className={`font-semibold transition-colors ${
                darkMode 
                  ? 'text-purple-400 hover:text-purple-300' 
                  : 'text-purple-600 hover:text-purple-700'
              }`}
            >
              Sign in here
            </Link>
          </p>
        </div>

        {/* Terms notice */}
        <div className={`mt-6 p-4 rounded-2xl border-2 border-dashed ${
          darkMode 
            ? 'border-gray-600 bg-gray-700/30' 
            : 'border-gray-300 bg-gray-50'
        }`}>
          <p className={`text-xs text-center ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            By creating an account, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;