import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

interface BrokerFilterProps {
  onFilterChange: (filters: any) => void;
  regions: string[];
  specialties: string[];
}

const BrokerFilter: React.FC<BrokerFilterProps> = ({ 
  onFilterChange, 
  regions, 
  specialties 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    region: '',
    specialty: '',
    verified: false,
    premium: false,
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onFilterChange({ ...filters, searchTerm: e.target.value });
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    const updatedFilters = { ...filters, [name]: newValue };
    setFilters(updatedFilters);
    onFilterChange({ ...updatedFilters, searchTerm });
  };

  const resetFilters = () => {
    const resetValues = {
      region: '',
      specialty: '',
      verified: false,
      premium: false,
    };
    setFilters(resetValues);
    setSearchTerm('');
    onFilterChange({ ...resetValues, searchTerm: '' });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by broker name or description..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-10 input w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
        </div>
        
        <div>
          <select
            name="region"
            value={filters.region}
            onChange={handleFilterChange}
            className="input w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="">All Regions</option>
            {regions.map((region, index) => (
              <option key={index} value={region}>{region}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <select
            name="specialty"
            value={filters.specialty}
            onChange={handleFilterChange}
            className="input w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="">All Specialties</option>
            {specialties.map((specialty, index) => (
              <option key={index} value={specialty}>{specialty}</option>
            ))}
          </select>
        </div>
        
        <div className="flex items-center space-x-6">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="verified"
              checked={filters.verified}
              onChange={handleFilterChange}
              className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">Verified Brokers</span>
          </label>
          
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="premium"
              checked={filters.premium}
              onChange={handleFilterChange}
              className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">Premium Brokers</span>
          </label>
        </div>
        
        <div className="flex justify-end">
          <button
            onClick={resetFilters}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrokerFilter;