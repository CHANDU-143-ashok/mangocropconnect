import React, { useState, useEffect } from 'react';
import { useListings } from '../contexts/ListingsContext';
import ListingCard from '../components/listings/ListingCard';
import ListingFilter from '../components/listings/ListingFilter';
import { Search } from 'lucide-react';

const ListingsPage = () => {
  const { listings, loading, error } = useListings();
  const [filteredListings, setFilteredListings] = useState(listings);
  const [filters, setFilters] = useState({
    searchTerm: '',
    variety: '',
    location: '',
    harvestDateFrom: '',
    harvestDateTo: '',
    minQuantity: '',
    maxQuantity: '',
  });

  // Get unique varieties for filter dropdown
  const varieties = [...new Set(listings.map(listing => listing.variety))];
  
  // Get unique locations for filter dropdown
  const locations = [...new Set(listings.map(listing => listing.location))];

  useEffect(() => {
    if (listings.length > 0) {
      applyFilters();
    }
  }, [listings, filters]);

  const applyFilters = () => {
    let result = [...listings];
    
    // Only show approved listings
    result = result.filter(listing => listing.status === 'approved');

    // Apply search term
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      result = result.filter(
        listing =>
          listing.variety.toLowerCase().includes(term) ||
          listing.location.toLowerCase().includes(term) ||
          listing.sellerName.toLowerCase().includes(term)
      );
    }

    // Apply variety filter
    if (filters.variety) {
      result = result.filter(
        listing => listing.variety.toLowerCase() === filters.variety.toLowerCase()
      );
    }

    // Apply location filter
    if (filters.location) {
      result = result.filter(
        listing => listing.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Apply harvest date range filter
    if (filters.harvestDateFrom) {
      result = result.filter(
        listing => new Date(listing.harvestDate) >= new Date(filters.harvestDateFrom)
      );
    }

    if (filters.harvestDateTo) {
      result = result.filter(
        listing => new Date(listing.harvestDate) <= new Date(filters.harvestDateTo)
      );
    }

    // Apply quantity range filter
    if (filters.minQuantity) {
      result = result.filter(
        listing => listing.quantity >= parseInt(filters.minQuantity)
      );
    }

    if (filters.maxQuantity) {
      result = result.filter(
        listing => listing.quantity <= parseInt(filters.maxQuantity)
      );
    }

    // Sort listings: featured first, then by creation date
    result.sort((a, b) => {
      if (a.featured !== b.featured) {
        return a.featured ? -1 : 1;
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    setFilteredListings(result);
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
        <h2 className="text-2xl text-red-600 mb-4">Error Loading Listings</h2>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold mb-8">Mango Crop Listings</h1>
      
      {/* Search and Filter Bar */}
      <ListingFilter 
        onFilterChange={handleFilterChange}
        varieties={varieties}
        locations={locations}
      />

      {/* Listings Grid */}
      {filteredListings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredListings.map((listing) => (
            <ListingCard key={listing._id} listing={listing} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-lg shadow">
          <div className="max-w-md mx-auto">
            <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Listings Found</h3>
            <p className="text-gray-600 mb-6">
              We couldn't find any mango listings matching your search criteria. Try adjusting your filters or search term.
            </p>
            <button
              onClick={() => handleFilterChange({
                searchTerm: '',
                variety: '',
                location: '',
                harvestDateFrom: '',
                harvestDateTo: '',
                minQuantity: '',
                maxQuantity: '',
              })}
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition duration-200"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListingsPage;