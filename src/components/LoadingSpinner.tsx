import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="inline-block">
      <div className="w-4 h-4 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;