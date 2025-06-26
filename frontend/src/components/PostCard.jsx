import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useState } from 'react';

const PostCard = ({ post, onDelete }) => {
  const { user } = useAuth();
  const { darkMode } = useTheme();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setIsDeleting(true);
      try {
        await onDelete(post._id);
      } catch (error) {
        console.error('Error deleting post:', error);
        setIsDeleting(false);
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const truncateContent = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substr(0, maxLength) + '...';
  };

  return (
    <div className={`group relative rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 shadow-xl border border-gray-700/50' 
        : 'bg-gradient-to-br from-white via-white to-gray-50 shadow-lg border border-gray-200/50'
    }`}>
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
      
      <div className="relative z-10 p-6">
        {/* Header with title and delete button */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1 pr-4">
            <h2 className={`text-xl font-bold leading-tight transition-colors duration-200 ${
              darkMode 
                ? 'text-white group-hover:text-indigo-300' 
                : 'text-gray-900 group-hover:text-indigo-600'
            }`}>
              {post.title}
            </h2>
            
            {/* Category badge (if you have categories) */}
            <div className="mt-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                darkMode 
                  ? 'bg-indigo-900/50 text-indigo-300 border border-indigo-700/50' 
                  : 'bg-indigo-100 text-indigo-800 border border-indigo-200'
              }`}>
                Blog Post
              </span>
            </div>
          </div>

          {user?.role === 'admin' && onDelete && (
            <div className="flex-shrink-0">
              <button 
                onClick={handleDelete}
                disabled={isDeleting}
                className={`p-2 rounded-xl transition-all duration-200 ${
                  darkMode 
                    ? 'bg-red-900/30 hover:bg-red-900/50 text-red-400 hover:text-red-300 border border-red-800/30' 
                    : 'bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-700 border border-red-200'
                } transform hover:scale-110 ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`}
                title="Delete post"
              >
                {isDeleting ? (
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            </div>
          )}
        </div>
        
        {/* Content preview */}
        <div className="mb-6">
          <p className={`text-sm leading-relaxed ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {truncateContent(post.content)}
          </p>
        </div>
        
        {/* Footer with date and read more */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center space-x-2">
            <svg className={`w-4 h-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            <span className={`text-sm font-medium ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {formatDate(post.createdAt)}
            </span>
          </div>
          
          <Link 
            to={`/post/${post._id}`} 
            className={`inline-flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
              darkMode 
                ? 'bg-indigo-600/80 hover:bg-indigo-600 text-white shadow-lg hover:shadow-xl' 
                : 'bg-indigo-500 hover:bg-indigo-600 text-white shadow-lg hover:shadow-xl'
            } transform hover:scale-105`}
          >
            <span>Read More</span>
            <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Hover effect border */}
      <div className={`absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-indigo-500/20 transition-all duration-300 pointer-events-none`}></div>
    </div>
  );
};

export default PostCard;