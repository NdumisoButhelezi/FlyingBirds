import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { LogIn, AlertCircle } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-yellow-500 rounded-lg shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-yellow-600 to-yellow-500 p-6">
          <h2 className="text-3xl font-bold text-white text-center flex items-center justify-center">
            <LogIn className="w-8 h-8 mr-2" />
            Login
          </h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6 bg-black bg-opacity-90">
          <div>
            <label className="block text-yellow-500 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-yellow-500 text-white focus:outline-none focus:border-yellow-600 focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter your email"
            />
          </div>
          
          <div>
            <label className="block text-yellow-500 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-yellow-500 text-white focus:outline-none focus:border-yellow-600 focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter your password"
            />
          </div>

          {error && (
            <div className="bg-red-500 bg-opacity-10 border border-red-500 text-red-500 px-4 py-3 rounded-lg flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold py-3 px-4 rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-200 transform hover:scale-105 ${
              isLoading ? 'btn-loading' : ''
            }`}
          >
            <span>Sign In</span>
            {isLoading && <LoadingSpinner />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login