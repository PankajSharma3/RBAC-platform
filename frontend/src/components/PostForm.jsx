import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { createPost, updatePost } from '../services/api';

const PostForm = ({ post, onSuccess }) => {
  const { darkMode } = useTheme();
  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [wordCount, setWordCount] = useState(post?.content?.split(' ').length || 0);

  const handleContentChange = (e) => {
    const newContent = e.target.value;
    setContent(newContent);
    setWordCount(newContent.trim() ? newContent.trim().split(' ').length : 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      setError('Both title and content are required');
      return;
    }

    if (title.length < 5) {
      setError('Title must be at least 5 characters long');
      return;
    }

    if (content.length < 10) {
      setError('Content must be at least 10 characters long');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      if (post) {
        await updatePost(post._id, { title: title.trim(), content: content.trim() });
      } else {
        await createPost({ title: title.trim(), content: content.trim() });
      }
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`max-w-4xl mx-auto p-6 rounded-2xl shadow-2xl border ${
      darkMode 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-200'
    }`}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg`}>
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
            </svg>
          </div>
          <h2 className={`text-3xl font-bold ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {post ? 'Edit Post' : 'Create New Post'}
          </h2>
        </div>
        <p className={`text-sm ${
          darkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {post ? 'Update your existing blog post' : 'Share your thoughts with the world'}
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className={`mb-6 p-4 rounded-xl border-l-4 ${
          darkMode 
            ? 'bg-red-900/30 border-red-500 text-red-300' 
            : 'bg-red-50 border-red-400 text-red-700'
        }`}>
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">{error}</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Input */}
        <div className="space-y-2">
          <label htmlFor="title" className={`flex items-center text-sm font-semibold ${
            darkMode ? 'text-gray-200' : 'text-gray-700'
          }`}>
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"/>
              <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd"/>
            </svg>
            Post Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter an engaging title for your post..."
            className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-4 ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500/20' 
                : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:ring-indigo-500/20'
            }`}
            required
            maxLength={100}
          />
          <div className={`text-xs ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            {title.length}/100 characters
          </div>
        </div>

        {/* Content Textarea */}
        <div className="space-y-2">
          <label htmlFor="content" className={`flex items-center text-sm font-semibold ${
            darkMode ? 'text-gray-200' : 'text-gray-700'
          }`}>
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
            </svg>
            Content
          </label>
          <textarea
            id="content"
            rows={12}
            value={content}
            onChange={handleContentChange}
            placeholder="Write your blog post content here... Share your ideas, experiences, or insights with your readers."
            className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-4 resize-none ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500/20' 
                : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:ring-indigo-500/20'
            }`}
            required
          />
          <div className={`flex justify-between text-xs ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            <span>{wordCount} words</span>
            <span>{content.length} characters</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <button
            type="submit"
            disabled={loading || !title.trim() || !content.trim()}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
              loading || !title.trim() || !content.trim()
                ? 'bg-gray-400 cursor-not-allowed text-gray-600' 
                : darkMode
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                  : 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
            }`}
          >
            {loading ? (
              <>
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                <span>{post ? 'Update Post' : 'Publish Post'}</span>
              </>
            )}
          </button>

          {/* Preview Button */}
          <button
            type="button"
            className={`sm:w-auto px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
              darkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white border border-gray-600' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 border border-gray-300'
            } transform hover:scale-105`}
            onClick={() => {
              // You can implement preview functionality here
              console.log('Preview functionality - show modal or navigate to preview page');
            }}
          >
            <svg className="w-5 h-5 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
            </svg>
            Preview
          </button>
        </div>

        {/* Tips Section */}
        <div className={`mt-8 p-4 rounded-xl border ${
          darkMode 
            ? 'bg-gray-700/50 border-gray-600' 
            : 'bg-gray-50 border-gray-200'
        }`}>
          <h3 className={`text-sm font-semibold mb-2 ${
            darkMode ? 'text-gray-200' : 'text-gray-700'
          }`}>
            💡 Writing Tips
          </h3>
          <ul className={`text-xs space-y-1 ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            <li>• Keep your title concise and engaging</li>
            <li>• Use clear paragraphs to break up your content</li>
            <li>• Include examples or stories to illustrate your points</li>
            <li>• End with a call-to-action or thought-provoking question</li>
          </ul>
        </div>
      </form>
    </div>
  );
};

export default PostForm;