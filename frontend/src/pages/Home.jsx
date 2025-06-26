import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import { getPosts } from '../services/api';
import { useTheme } from '../context/ThemeContext';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { darkMode } = useTheme();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPosts();
        const postsData = response.data || response;
        console.log('Fetched posts:', postsData);
        setPosts(Array.isArray(postsData) ? postsData : []);
      } catch (err) {
        console.error('Failed to fetch posts:', err);
        setError('Something went wrong while loading posts.');
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${
        darkMode 
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900' 
          : 'bg-gradient-to-br from-gray-50 via-white to-indigo-50'
      } py-16`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="animate-pulse space-y-8" role="status" aria-busy="true">
            {/* Hero skeleton */}
            <div className="text-center mb-20">
              <div className={`h-12 w-96 mx-auto mb-4 rounded-full ${
                darkMode ? 'bg-gray-700' : 'bg-gray-300'
              }`}></div>
              <div className={`h-6 w-80 mx-auto rounded-full ${
                darkMode ? 'bg-gray-700' : 'bg-gray-300'
              }`}></div>
            </div>
            
            {/* Posts skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <div className={`h-48 rounded-2xl ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-300'
                  }`}></div>
                  <div className={`h-6 w-3/4 rounded-full ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-300'
                  }`}></div>
                  <div className={`h-4 w-full rounded-full ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-300'
                  }`}></div>
                  <div className={`h-4 w-2/3 rounded-full ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-300'
                  }`}></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900' 
        : 'bg-gradient-to-br from-gray-50 via-white to-indigo-50'
    } py-16`}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-20 relative">
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <div className={`w-96 h-96 rounded-full blur-3xl ${
              darkMode ? 'bg-indigo-600' : 'bg-indigo-400'
            }`}></div>
          </div>
          
          <div className="relative z-10">
            <h1 className={`text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r h-24 ${
              darkMode 
                ? 'from-white via-indigo-200 to-indigo-400' 
                : 'from-gray-900 via-indigo-600 to-purple-600'
            } bg-clip-text text-transparent`}>
              BlogSphere
            </h1>
            
            <p className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Discover insightful articles and stories from our creative community
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              {['Technology', 'Lifestyle', 'Travel', 'Food', 'Art'].map((tag, index) => (
                <span 
                  key={index}
                  className={`px-4 py-2 rounded-full border transition-colors duration-200 ${
                    darkMode 
                      ? 'border-gray-600 text-gray-400 hover:border-indigo-500 hover:text-indigo-400' 
                      : 'border-gray-300 text-gray-600 hover:border-indigo-500 hover:text-indigo-600'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className={`text-center mb-12 p-6 rounded-2xl border-2 border-dashed ${
            darkMode 
              ? 'border-red-800 bg-red-900/20 text-red-400' 
              : 'border-red-300 bg-red-50 text-red-700'
          }`}>
            <div className="text-4xl mb-4">😵</div>
            <p className="text-lg font-medium">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className={`mt-4 px-6 py-2 rounded-lg font-medium transition-colors ${
                darkMode 
                  ? 'bg-red-600 hover:bg-red-700 text-white' 
                  : 'bg-red-600 hover:bg-red-700 text-white'
              }`}
            >
              Try Again
            </button>
          </div>
        )}

        {/* Posts Grid */}
        {Array.isArray(posts) && posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map(post => (
              <div 
                key={post._id} 
                className="transform hover:scale-105 transition-all duration-300"
              >
                <PostCard post={post} />
              </div>
            ))}
          </div>
        ) : (
          !error && (
            <div className={`text-center py-20 ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              <div className="text-8xl mb-8">📝</div>
              <h3 className="text-2xl font-bold mb-4">No posts yet</h3>
              <p className="text-lg mb-8 max-w-md mx-auto">
                Be the first to share your story with our community!
              </p>
              <div className={`inline-flex items-center px-6 py-3 rounded-full border-2 border-dashed transition-colors ${
                darkMode 
                  ? 'border-gray-600 text-gray-400 hover:border-indigo-500 hover:text-indigo-400' 
                  : 'border-gray-300 text-gray-600 hover:border-indigo-500 hover:text-indigo-600'
              }`}>
                <span className="mr-2">✨</span>
                Start writing amazing content
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Home;