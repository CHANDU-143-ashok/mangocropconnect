import React from 'react';
import { Link } from 'react-router-dom';
import { useListings } from '../../contexts/ListingsContext';
import ListingCard from './ListingCard';

const FeaturedListings = () => {
  const { listings, loading, error } = useListings();
  
  // Filter out only featured and approved listings
  const featuredListings = listings
    .filter(listing => listing.featured && listing.status === 'approved')
    .slice(0, 3); // Show only 3 featured listings

  if (loading) {
    return (
      <div className="w-full flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (featuredListings.length === 0) {
    return null; // Don't render the section if no featured listings
  }

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Featured Listings</h2>
        <Link 
          to="/listings" 
          className="text-orange-500 hover:text-orange-600 font-semibold flex items-center"
        >
          View All
          <svg 
            className="ml-2 h-5 w-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </Link>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredListings.map(listing => (
          <ListingCard key={listing._id} listing={listing} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedListings;