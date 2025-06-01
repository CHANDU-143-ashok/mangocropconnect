import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';

interface ListingFilterProps {
  onFilterChange: (filters: any) => void;
  varieties: string[];
  locations: string[];
}

const ListingFilter: React.FC<ListingFilterProps> = ({ 
  onFilterChange, 
  varieties, 
  locations 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    variety: '',
    location: '',
    harvestDateFrom: '',
    harvestDateTo: '',
    minQuantity: '',
    maxQuantity: '',
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onFilterChange({ ...filters, searchTerm: e.target.value });
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    onFilterChange({ ...updatedFilters, searchTerm });
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const resetFilters = () => {
    const resetValues = {
      variety: '',
      location: '',
      harvestDateFrom: '',
      harvestDateTo: '',
      minQuantity: '',
      maxQuantity: '',
    };
    setFilters(resetValues);
    setSearchTerm('');
    onFilterChange({ ...resetValues, searchTerm: '' });
  };

  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by variety, location or seller..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="pl-10 input w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
        <button 
          onClick={toggleFilters}
          className="flex items-center justify-center px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition duration-200"
          aria-expanded={showFilters}
        >
          <Filter className="h-5 w-5 mr-2" />
          Filters
        </button>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label htmlFor="variety" className="block text-sm font-medium text-gray-700 mb-1">
                Variety
              </label>
              <select
                id="variety"
                name="variety"
                value={filters.variety}
                onChange={handleFilterChange}
                className="input w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">All Varieties</option>
                {varieties.map((variety, index) => (
                  <option key={index} value={variety}>
                    {variety}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <select
                id="location"
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                className="input w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">All Locations</option>
                {locations.map((location, index) => (
                  <option key={index} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="harvestDateFrom" className="block text-sm font-medium text-gray-700 mb-1">
                Harvest Date From
              </label>
              <input
                type="date"
                id="harvestDateFrom"
                name="harvestDateFrom"
                value={filters.harvestDateFrom}
                onChange={handleFilterChange}
                className="input w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div>
              <label htmlFor="harvestDateTo" className="block text-sm font-medium text-gray-700 mb-1">
                Harvest Date To
              </label>
              <input
                type="date"
                id="harvestDateTo"
                name="harvestDateTo"
                value={filters.harvestDateTo}
                onChange={handleFilterChange}
                className="input w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div>
              <label htmlFor="minQuantity" className="block text-sm font-medium text-gray-700 mb-1">
                Min Quantity (kg)
              </label>
              <input
                type="number"
                id="minQuantity"
                name="minQuantity"
                value={filters.minQuantity}
                onChange={handleFilterChange}
                min="0"
                className="input w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div>
              <label htmlFor="maxQuantity" className="block text-sm font-medium text-gray-700 mb-1">
                Max Quantity (kg)
              </label>
              <input
                type="number"
                id="maxQuantity"
                name="maxQuantity"
                value={filters.maxQuantity}
                onChange={handleFilterChange}
                min="0"
                className="input w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={resetFilters}
              className="px-4 py-2 text-gray-700 hover:text-gray-900 mr-2"
            >
              Reset Filters
            </button>
            <button
              onClick={() => onFilterChange({ ...filters, searchTerm })}
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition duration-200"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListingFilter;