import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import PenguinAnimation from '../components/PenguinAnimation';

const Home: React.FC = () => {
  const [user] = useAuthState(auth);

  return (
    <div className="text-center">
      <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-8 rounded-lg shadow-xl mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">Flying Penguins</h1>
        {user && (
          <p className="text-white text-xl">
            Welcome back, {user.displayName || 'Penguin Friend'}!
          </p>
        )}
      </div>
      <PenguinAnimation />
    </div>
  );
};

export default Home