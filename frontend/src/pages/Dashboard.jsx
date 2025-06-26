import { useState, useEffect } from 'react';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { getPosts, deletePost } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const { user } = useAuth();
  const { darkMode } = useTheme();

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchPosts();
    }
  }, [user]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await getPosts();
      const postsData = response.data || response;
      setPosts(Array.isArray(postsData) ? postsData : []);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      setDeleteLoading(postId);
      try {
        await deletePost(postId);
        setPosts(posts.filter(post => post._id !== postId));
        
      } catch (error) {
        console.error('Failed to delete post:', error);
        alert('Failed to delete post. Please try again.');
      } finally {
        setDeleteLoading(null);
      }
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    fetchPosts();
    setShowForm(false);
    setEditingPost(null);
  };

  if (user?.role !== 'admin') {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${
        darkMode 
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-red-900' 
          : 'bg-gradient-to-br from-gray-50 via-white to-red-50'
      } flex items-center justify-center p-4`}>
        <div className={`max-w-lg w-full p-8 rounded-3xl shadow-2xl border transition-all duration-300 ${
          darkMode 
            ? 'bg-gray-800/80 backdrop-blur-lg border-gray-700' 
            : 'bg-white/80 backdrop-blur-lg border-gray-200'
        }`}>
          <div className="text-center">
            <div className="text-6xl mb-6">🚫</div>
            <h2 className={`text-3xl font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Access Denied
            </h2>
            <p className={`text-lg mb-8 ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              You need administrator privileges to access this dashboard.
            </p>
            <button
              onClick={() => window.history.back()}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                darkMode 
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/25' 
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/25'
              }`}
            >
              Go Back
            </button>
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
    } py-8`}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className={`mb-12 p-8 rounded-3xl shadow-xl border transition-all duration-300 ${
          darkMode 
            ? 'bg-gray-800/50 backdrop-blur-lg border-gray-700' 
            : 'bg-white/70 backdrop-blur-lg border-gray-200'
        }`}>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <h1 className={`text-4xl font-black mb-2 bg-gradient-to-r ${
                darkMode 
                  ? 'from-white via-indigo-200 to-indigo-400' 
                  : 'from-gray-900 via-indigo-600 to-purple-600'
              } bg-clip-text text-transparent`}>
                Admin Dashboard
              </h1>
              <p className={`text-lg ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Manage your blog posts and content
              </p>
            </div>
            
            <button
              onClick={() => {
                setEditingPost(null);
                setShowForm(!showForm);
              }}
              className={`px-8 py-4 rounded-2xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg ${
                showForm 
                  ? (darkMode 
                      ? 'bg-gray-700 hover:bg-gray-600 text-gray-300 shadow-gray-500/25' 
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700 shadow-gray-500/25'
                    )
                  : (darkMode 
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/25' 
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/25'
                    )
              }`}
            >
              {showForm ? '✕ Cancel' : '✨ Create Post'}
            </button>
          </div>
        </div>

        {/* Post Form */}
        {showForm && (
          <div className={`mb-12 rounded-3xl shadow-xl border transition-all duration-300 overflow-hidden ${
            darkMode 
              ? 'bg-gray-800/50 backdrop-blur-lg border-gray-700' 
              : 'bg-white/70 backdrop-blur-lg border-gray-200'
          }`}>
            <div className={`p-2 ${
              darkMode ? 'bg-gradient-to-r from-indigo-600 to-purple-600' : 'bg-gradient-to-r from-indigo-500 to-purple-500'
            }`}>
              <div className="text-center text-white font-semibold">
                {editingPost ? 'Edit Post' : 'Create New Post'}
              </div>
            </div>
            <div className="p-8">
              <PostForm 
                post={editingPost} 
                onSuccess={handleFormSuccess}
              />
            </div>
          </div>
        )}

        {/* Posts Management Section */}
        <div className={`rounded-3xl shadow-xl border transition-all duration-300 ${
          darkMode 
            ? 'bg-gray-800/50 backdrop-blur-lg border-gray-700' 
            : 'bg-white/70 backdrop-blur-lg border-gray-200'
        }`}>
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className={`text-2xl font-bold ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Manage Posts
              </h2>
              <div className={`px-4 py-2 rounded-full text-sm font-medium ${
                darkMode 
                  ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' 
                  : 'bg-indigo-50 text-indigo-600 border border-indigo-200'
              }`}>
                {posts.length} {posts.length === 1 ? 'post' : 'posts'}
              </div>
            </div>
            
            {loading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className={`animate-pulse h-24 rounded-2xl ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-200'
                  }`}></div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {posts.map(post => (
                  <div 
                    key={post._id} 
                    className={`group rounded-2xl p-6 border transition-all duration-200 hover:shadow-lg ${
                      darkMode 
                        ? 'bg-gray-700/30 border-gray-600 hover:border-gray-500' 
                        : 'bg-gray-50/50 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-bold text-lg mb-2 truncate ${
                          darkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {post.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm">
                          <span className={`flex items-center ${
                            darkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            📅 {new Date(post.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </span>
                          {post.author && (
                            <span className={`flex items-center ${
                              darkMode ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              👤 {post.author}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => handleEdit(post)}
                          disabled={deleteLoading === post._id}
                          className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                            darkMode 
                              ? 'text-indigo-400 hover:text-indigo-300 hover:bg-indigo-600/20' 
                              : 'text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50'
                          } ${deleteLoading === post._id ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          ✏️ Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(post._id)}
                          disabled={deleteLoading === post._id}
                          className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                            darkMode 
                              ? 'text-red-400 hover:text-red-300 hover:bg-red-600/20' 
                              : 'text-red-600 hover:text-red-700 hover:bg-red-50'
                          } ${deleteLoading === post._id ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          {deleteLoading === post._id ? '⏳ Deleting...' : '🗑️ Delete'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                
                {posts.length === 0 && (
                  <div className={`text-center py-16 ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    <div className="text-6xl mb-6">📝</div>
                    <h3 className="text-xl font-semibold mb-2">No posts yet</h3>
                    <p className="text-lg mb-6">Create your first post to get started!</p>
                    <button
                      onClick={() => setShowForm(true)}
                      className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                        darkMode 
                          ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
                          : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                      }`}
                    >
                      Create First Post
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;