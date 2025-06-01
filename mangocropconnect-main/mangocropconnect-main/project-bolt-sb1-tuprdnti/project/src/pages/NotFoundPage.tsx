import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-yellow-50 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center">
      <Leaf className="h-24 w-24 text-orange-500 mb-6 animate-bounce-slow" />
      <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-700 mb-6">Page Not Found</h2>
      <p className="text-lg text-gray-600 max-w-md mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="btn btn-primary text-lg px-8 py-3 shadow-lg transform transition duration-300 hover:scale-105">
        Back to Home
      </Link>
      <div className="mt-16 text-gray-400">
        <p>Lost in a sea of mangoes...</p>
      </div>
    </div>
  );
};

export default NotFoundPage;