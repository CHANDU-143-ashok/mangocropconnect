import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useListings } from '../contexts/ListingsContext';
import { Calendar, MapPin, User, Package, Phone, Calendar as HarvestIcon } from 'lucide-react';

const ListingDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { getListing } = useListings();
  const [listing, setListing] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        if (id) {
          const data = await getListing(id);
          setListing(data);
        }
      } catch (err) {
        setError('Failed to load listing details. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id, getListing]);

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? (listing.images.length - 1) : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === listing.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
        <p className="text-gray-700 mb-6">{error || 'Listing not found'}</p>
        <Link to="/listings" className="btn-primary">
          Back to Listings
        </Link>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumbs */}
      <nav className="mb-6">
        <ol className="flex text-sm">
          <li>
            <Link to="/" className="text-orange-500 hover:text-orange-600">Home</Link>
          </li>
          <li className="mx-2">/</li>
          <li>
            <Link to="/listings" className="text-orange-500 hover:text-orange-600">Listings</Link>
          </li>
          <li className="mx-2">/</li>
          <li className="text-gray-600">{listing.variety} Mangoes</li>
        </ol>
      </nav>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Carousel */}
          <div className="relative h-96">
            {listing.images && listing.images.length > 0 ? (
              <>
                <img
                  src={listing.images[currentImageIndex]}
                  alt={`${listing.variety} mangoes`}
                  className="w-full h-full object-cover"
                />
                {listing.images.length > 1 && (
                  <>
                    <button
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition"
                      onClick={handlePrevImage}
                    >
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                      </svg>
                    </button>
                    <button
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition"
                      onClick={handleNextImage}
                    >
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </button>
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                      {listing.images.map((_: any, index: number) => (
                        <button
                          key={index}
                          className={`h-2 w-2 rounded-full ${
                            index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                          }`}
                          onClick={() => setCurrentImageIndex(index)}
                        ></button>
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                <p>No image available</p>
              </div>
            )}
            {listing.featured && (
              <div className="absolute top-4 right-4">
                <span className="badge-featured">Featured</span>
              </div>
            )}
          </div>

          {/* Listing Details */}
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-2">{listing.variety} Mangoes</h1>
            
            <div className="flex items-center mb-6">
              <MapPin className="h-5 w-5 text-gray-500 mr-1" />
              <span className="text-gray-600">{listing.location}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center">
                <Package className="h-5 w-5 text-orange-500 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Quantity</p>
                  <p className="font-semibold">{listing.quantity} kg</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <HarvestIcon className="h-5 w-5 text-orange-500 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Harvest Date</p>
                  <p className="font-semibold">{formatDate(listing.harvestDate)}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <User className="h-5 w-5 text-orange-500 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Seller</p>
                  <p className="font-semibold">{listing.sellerName}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-orange-500 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Listed On</p>
                  <p className="font-semibold">{formatDate(listing.createdAt)}</p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-700">{listing.description}</p>
            </div>

            {/* Broker Contact Information */}
            {listing.broker && (
              <div className="mb-8 p-4 bg-orange-50 rounded-lg border border-orange-200">
                <h3 className="text-lg font-semibold mb-2">Contact Broker</h3>
                <div className="flex items-start">
                  <div>
                    <p className="font-medium">{listing.broker.name}</p>
                    <div className="flex items-center mt-1">
                      <Phone className="h-4 w-4 text-orange-500 mr-1" />
                      <a href={`tel:${listing.broker.phone}`} className="text-blue-600 hover:underline">
                        {listing.broker.phone}
                      </a>
                    </div>
                    {listing.broker.regions && (
                      <p className="text-sm text-gray-600 mt-1">
                        Regions: {listing.broker.regions.join(', ')}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-4">
              <a
                href={`tel:${listing.sellerPhone}`}
                className="btn btn-primary flex items-center"
              >
                <Phone className="h-5 w-5 mr-2" />
                Contact Seller
              </a>
              <Link to="/listings" className="btn btn-outline">
                Back to Listings
              </Link>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {listing.qualityGrade && (
              <div>
                <p className="text-sm text-gray-500">Quality Grade</p>
                <p>{listing.qualityGrade}</p>
              </div>
            )}
            {listing.priceRange && (
              <div>
                <p className="text-sm text-gray-500">Price Range</p>
                <p>₹{listing.priceRange.min} - ₹{listing.priceRange.max} per kg</p>
              </div>
            )}
            {listing.farmingMethod && (
              <div>
                <p className="text-sm text-gray-500">Farming Method</p>
                <p>{listing.farmingMethod}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Related Listings */}
      {/* This would typically be populated with similar listings */}
    </div>
  );
};

export default ListingDetailsPage;