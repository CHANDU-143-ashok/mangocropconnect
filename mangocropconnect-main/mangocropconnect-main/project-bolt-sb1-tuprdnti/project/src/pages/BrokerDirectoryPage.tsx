import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useBrokers } from '../contexts/BrokersContext';
import { Search, Award } from 'lucide-react';
import BrokerCard from '../components/brokers/BrokerCard';
import BrokerFilter from '../components/brokers/BrokerFilter';

const BrokerDirectoryPage = () => {
  const { brokers, loading, error } = useBrokers();
  const [filteredBrokers, setFilteredBrokers] = useState(brokers);
  const [filters, setFilters] = useState({
    searchTerm: '',
    region: '',
    specialty: '',
    verified: false,
    premium: false
  });

  // Get unique regions from all brokers
  const uniqueRegions = [...new Set(
    brokers.flatMap(broker => broker.regions || [])
  )].sort();

  // Get unique specialties from all brokers
  const uniqueSpecialties = [...new Set(
    brokers.flatMap(broker => broker.specialties || [])
  )].sort();

  useEffect(() => {
    if (brokers.length > 0) {
      applyFilters();
    }
  }, [brokers, filters]);

  const applyFilters = () => {
    let result = [...brokers];
    
    // Apply search term
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      result = result.filter(
        broker =>
          broker.name.toLowerCase().includes(term) ||
          (broker.description && broker.description.toLowerCase().includes(term))
      );
    }
    
    // Apply region filter
    if (filters.region) {
      result = result.filter(
        broker => broker.regions && broker.regions.some(region => 
          region.toLowerCase().includes(filters.region.toLowerCase())
        )
      );
    }
    
    // Apply specialty filter
    if (filters.specialty) {
      result = result.filter(
        broker => broker.specialties && broker.specialties.some(specialty => 
          specialty.toLowerCase().includes(filters.specialty.toLowerCase())
        )
      );
    }
    
    // Apply verified filter
    if (filters.verified) {
      result = result.filter(broker => broker.isVerified);
    }
    
    // Apply premium filter
    if (filters.premium) {
      result = result.filter(broker => broker.isPremium);
    }
    
    setFilteredBrokers(result);
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl text-red-600 mb-4">Error Loading Brokers</h2>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Verified Mango Brokers</h1>
          <p className="text-gray-600">Connect with trusted mango brokers in your region</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link 
            to="/subscribe"
            className="btn btn-secondary inline-flex items-center px-4 py-2 rounded-md font-medium transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-green-600 hover:bg-green-700 text-white focus:ring-green-600"
          >
            <Award className="h-5 w-5 mr-2" />
            Premium Broker Subscription
          </Link>
        </div>
      </div>
      
      {/* Search and Filter Section */}
      <BrokerFilter 
        onFilterChange={handleFilterChange}
        regions={uniqueRegions}
        specialties={uniqueSpecialties}
      />
      
      {/* Broker Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBrokers.length > 0 ? (
          filteredBrokers.map((broker) => (
            <BrokerCard key={broker._id} broker={broker} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="max-w-md mx-auto">
              <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Brokers Found</h3>
              <p className="text-gray-600 mb-6">
                We couldn't find any brokers matching your search criteria.
              </p>
              <button
                onClick={() => handleFilterChange({
                  searchTerm: '',
                  region: '',
                  specialty: '',
                  verified: false,
                  premium: false
                })}
                className="btn btn-primary px-4 py-2 rounded-md font-medium transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-orange-500 hover:bg-orange-600 text-white focus:ring-orange-500"
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Become a Broker CTA */}
      <div className="mt-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg shadow-lg text-white overflow-hidden">
        <div className="md:flex">
          <div className="p-8 md:w-2/3">
            <h2 className="text-2xl font-bold mb-4">Become a Verified Broker</h2>
            <p className="mb-6">
              Join our network of trusted mango brokers. Get a verified badge, premium visibility, 
              and connect with more farmers and buyers in your region.
            </p>
            <div className="space-y-2">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <p className="ml-3 text-sm">Verified badge increases trust with farmers</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <p className="ml-3 text-sm">Premium listing in the broker directory</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <p className="ml-3 text-sm">Only ₹499/month with flexible subscription options</p>
              </div>
            </div>
            <div className="mt-8">
              <Link to="/subscribe" className="btn bg-white text-orange-600 hover:bg-gray-100 px-4 py-2 rounded-md font-medium transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">
                Learn More
              </Link>
            </div>
          </div>
          <div className="md:w-1/3 hidden md:block">
            <img 
              src="https://images.pexels.com/photos/7658344/pexels-photo-7658344.jpeg" 
              alt="Broker with farmer" 
              className="object-cover h-full w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrokerDirectoryPage;