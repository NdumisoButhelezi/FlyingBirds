import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import { LogOut, Home as HomeIcon, UserPlus, LogIn } from 'lucide-react';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';

const App: React.FC = () => {
  const navigate = useNavigate();

  // Handle user logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation bar with gradient overlay */}
      <nav className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-4 shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link to="/" className="flex items-center text-black hover:text-white transition-colors">
              <HomeIcon className="w-5 h-5 mr-2" />
              <span className="font-bold">Home</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login" className="flex items-center text-black hover:text-white transition-colors">
              <LogIn className="w-5 h-5 mr-2" />
              <span className="font-bold">Login</span>
            </Link>
            <Link to="/register" className="flex items-center text-black hover:text-white transition-colors">
              <UserPlus className="w-5 h-5 mr-2" />
              <span className="font-bold">Register</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center text-black hover:text-white transition-colors"
            >
              <LogOut className="w-5 h-5 mr-2" />
              <span className="font-bold">Logout</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main content area */}
      <div className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </div>
  );
};

export default App