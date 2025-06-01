import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Package, Calendar } from 'lucide-react';

interface Listing {
  _id: string;
  variety: string;
  quantity: number;
  location: string;
  harvestDate: string;
  sellerName: string;
  images: string[];
  featured: boolean;
  status: string;
  createdAt: string;
  description?: string;
  sellerPhone?: string;
}

interface ListingCardProps {
  listing: Listing;
}

const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <Link 
      to={`/listings/${listing._id}`}
      className="card group h-full flex flex-col overflow-hidden transition duration-300 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative h-48 bg-orange-100">
        {listing.images && listing.images.length > 0 ? (
          <img 
            src={listing.images[0]} 
            alt={`${listing.variety} mangoes`}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-orange-100 text-orange-500">
            <span className="text-lg font-medium">No Image</span>
          </div>
        )}
        
        {/* Featured Badge */}
        {listing.featured && (
          <div className="absolute top-2 right-2">
            <span className="badge badge-featured">Featured</span>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold mb-2 text-gray-900">{listing.variety} Mangoes</h3>
        
        <div className="flex items-center mb-2 text-gray-600">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{listing.location}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-3 my-3">
          <div className="flex items-center text-gray-600">
            <Package className="h-4 w-4 mr-1" />
            <span className="text-sm">{listing.quantity} kg</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Calendar className="h-4 w-4 mr-1" />
            <span className="text-sm">Harvest: {formatDate(listing.harvestDate)}</span>
          </div>
        </div>
        
        <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
          <span className="text-sm text-gray-500">
            Seller: {listing.sellerName}
          </span>
          <span className="inline-flex items-center text-orange-500 text-sm font-medium group-hover:text-orange-600">
            View Details
            <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ListingCard;