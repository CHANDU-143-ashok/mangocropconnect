import React from 'react';
import { Link } from 'react-router-dom';
import { useListings } from '../contexts/ListingsContext';
import ListingCard from '../components/listings/ListingCard';
import { Search, Map, Users, Shield, TrendingUp } from 'lucide-react';

const HomePage = () => {
  const { listings } = useListings();
  const featuredListings = listings.filter(listing => listing.featured).slice(0, 3);

  return (
    <div className="bg-yellow-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-500 to-yellow-500 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <img 
            src="https://images.pexels.com/photos/2363347/pexels-photo-2363347.jpeg" 
            alt="Mango farm background" 
            className="object-cover w-full h-full"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Connecting Mango Farmers, Brokers & Buyers
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mb-8">
            The premier marketplace for mango crop yields in rural India
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/listings" className="btn bg-white text-orange-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-bold shadow-md transform transition hover:scale-105">
              Find Mangoes
            </Link>
            <Link to="/seller/upload" className="btn bg-green-600 text-white hover:bg-green-700 px-6 py-3 rounded-lg font-bold shadow-md transform transition hover:scale-105">
              Sell Your Crop
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">How MangoCropConnect Works</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-white p-8 rounded-lg shadow-md transform transition hover:-translate-y-1 hover:shadow-lg">
            <div className="bg-orange-100 p-4 rounded-full inline-flex items-center justify-center mb-4">
              <Search className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Find Local Mangoes</h3>
            <p className="text-gray-600">
              Search and discover fresh mango crops available in your area. Filter by variety, location, and harvest time.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-md transform transition hover:-translate-y-1 hover:shadow-lg">
            <div className="bg-orange-100 p-4 rounded-full inline-flex items-center justify-center mb-4">
              <Users className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Connect with Sellers</h3>
            <p className="text-gray-600">
              Communicate directly with farmers or connect through verified brokers to arrange purchases and logistics.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-md transform transition hover:-translate-y-1 hover:shadow-lg">
            <div className="bg-orange-100 p-4 rounded-full inline-flex items-center justify-center mb-4">
              <TrendingUp className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Grow Your Business</h3>
            <p className="text-gray-600">
              Farmers get fair prices, brokers expand their network, and buyers access quality produce.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gradient-to-b from-yellow-50 to-orange-50">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Listings</h2>
          <Link to="/listings" className="text-orange-500 hover:text-orange-600 font-semibold flex items-center">
            View All
            <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </Link>
        </div>
        
        {featuredListings.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredListings.map(listing => (
              <ListingCard key={listing._id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">No featured listings available at the moment.</p>
          </div>
        )}
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white">
        <h2 className="text-3xl font-bold text-center mb-12">Success Stories</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-yellow-50 p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <img 
                src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg" 
                alt="Farmer testimonial" 
                className="w-12 h-12 object-cover rounded-full mr-4"
              />
              <div>
                <h3 className="font-bold">Rajesh Patel</h3>
                <p className="text-sm text-gray-600">Mango Farmer, Gujarat</p>
              </div>
            </div>
            <p className="text-gray-700 italic">
              "MangoCropConnect helped me find buyers for my entire Alphonso crop this season. The direct connection meant better prices than I've ever received before."
            </p>
          </div>
          
          <div className="bg-yellow-50 p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <img 
                src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg" 
                alt="Broker testimonial" 
                className="w-12 h-12 object-cover rounded-full mr-4"
              />
              <div>
                <h3 className="font-bold">Priya Sharma</h3>
                <p className="text-sm text-gray-600">Broker, Maharashtra</p>
              </div>
            </div>
            <p className="text-gray-700 italic">
              "The broker subscription is worth every rupee. I've expanded my network of farmers and buyers, and the verified badge gives farmers confidence in working with me."
            </p>
          </div>
          
          <div className="bg-yellow-50 p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <img 
                src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg" 
                alt="Buyer testimonial" 
                className="w-12 h-12 object-cover rounded-full mr-4"
              />
              <div>
                <h3 className="font-bold">Amir Khan</h3>
                <p className="text-sm text-gray-600">Restaurant Owner, Delhi</p>
              </div>
            </div>
            <p className="text-gray-700 italic">
              "I source all my mangoes for my restaurant through this platform now. The quality is consistent, and I can plan my menu based on upcoming harvests."
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-orange-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Connect?</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Join thousands of mango farmers, brokers, and buyers already using MangoCropConnect
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/register" className="btn bg-white text-orange-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-bold shadow-md">
              Register Now
            </Link>
            <Link to="/listings" className="btn bg-transparent border-2 border-white text-white hover:bg-orange-600 px-6 py-3 rounded-lg font-bold">
              Browse Listings
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;