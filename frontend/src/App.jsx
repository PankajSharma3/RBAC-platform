import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectRoute';
import { useTheme } from './context/ThemeContext'; 

function App() {
  const { darkMode } = useTheme();

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <footer className={`py-6 text-center ${darkMode ? 'bg-gray-900 text-gray-500' : 'bg-gray-100 text-gray-600'}`}>
          <p>© {new Date().getFullYear()} BlogSphere. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;