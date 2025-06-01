import React from 'react';
import { MapPin, Phone, Badge, Star, Award } from 'lucide-react';

interface Broker {
  _id: string;
  name: string;
  phone: string;
  regions?: string[];
  specialties?: string[];
  description?: string;
  isVerified: boolean;
  isPremium: boolean;
  avatar?: string;
  experienceYears: number;
  averageRating?: number;
}

interface BrokerCardProps {
  broker: Broker;
}

const BrokerCard: React.FC<BrokerCardProps> = ({ broker }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            {broker.avatar ? (
              <img 
                src={broker.avatar} 
                alt={broker.name} 
                className="h-14 w-14 object-cover rounded-full"
              />
            ) : (
              <div className="h-14 w-14 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-orange-500">
                  {broker.name.substring(0, 2).toUpperCase()}
                </span>
              </div>
            )}
            <div className="ml-4">
              <h3 className="text-lg font-semibold">{broker.name}</h3>
              <div className="flex items-center">
                {broker.isPremium && (
                  <span className="flex items-center text-sm text-orange-500 mr-2">
                    <Star className="h-4 w-4 mr-1" />
                    Premium
                  </span>
                )}
                {broker.averageRating && (
                  <span className="flex items-center text-sm text-yellow-500 mr-2">
                    <Star className="h-4 w-4 mr-1 fill-current" />
                    {broker.averageRating}
                  </span>
                )}
                <span className="text-sm text-gray-500">
                  {broker.experienceYears} years experience
                </span>
              </div>
            </div>
          </div>
          {broker.isVerified && (
            <div className="bg-green-100 px-2 py-1 rounded-full flex items-center">
              <Badge className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-xs font-medium text-green-800">Verified</span>
            </div>
          )}
        </div>
        
        <div className="mt-4">
          {broker.description && (
            <p className="text-gray-600 text-sm mb-4">{broker.description}</p>
          )}
          
          <div className="space-y-2">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 text-gray-500 mr-2" />
              <span className="text-sm">
                {broker.regions ? broker.regions.join(', ') : 'Region not specified'}
              </span>
            </div>
            <div className="flex items-center">
              <Phone className="h-4 w-4 text-gray-500 mr-2" />
              <a href={`tel:${broker.phone}`} className="text-sm text-blue-600 hover:underline">
                {broker.phone}
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <a
            href={`tel:${broker.phone}`}
            className="btn btn-outline w-full justify-center inline-block px-4 py-2 rounded-md font-medium transition duration-200 border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            Contact
          </a>
        </div>
      </div>
      
      {broker.specialties && broker.specialties.length > 0 && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Specializes in:</h4>
          <div className="flex flex-wrap gap-2">
            {broker.specialties.map((specialty, index) => (
              <span 
                key={index} 
                className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BrokerCard;