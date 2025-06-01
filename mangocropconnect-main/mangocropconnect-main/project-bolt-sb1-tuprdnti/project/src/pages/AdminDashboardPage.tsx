import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useListings } from '../contexts/ListingsContext';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, AlertTriangle, FileCheck, Users, Package, Filter } from 'lucide-react';
import AdminListingItem from '../components/admin/AdminListingItem';

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { listings, approveListing, rejectListing, deleteListing } = useListings();
  const [activeTab, setActiveTab] = useState('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredListings, setFilteredListings] = useState(listings);

  // Redirect if not admin
  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
    }
  }, [user, navigate]);

  // Filter listings when tabs, search or listings change
  useEffect(() => {
    if (listings.length > 0) {
      let result = [...listings];
      
      // Filter by status
      result = result.filter(listing => listing.status === activeTab);
      
      // Filter by search term
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        result = result.filter(
          listing =>
            listing.variety.toLowerCase().includes(term) ||
            listing.location.toLowerCase().includes(term) ||
            listing.sellerName.toLowerCase().includes(term)
        );
      }
      
      setFilteredListings(result);
    }
  }, [listings, activeTab, searchTerm]);

  const pendingCount = listings.filter(listing => listing.status === 'pending').length;
  const approvedCount = listings.filter(listing => listing.status === 'approved').length;
  const rejectedCount = listings.filter(listing => listing.status === 'rejected').length;

  const handleApprove = async (id: string) => {
    await approveListing(id);
  };

  const handleReject = async (id: string) => {
    await rejectListing(id);
  };

  const handleDelete = async (id: string) => {
    await deleteListing(id);
  };

  const handleToggleFeature = async (id: string) => {
    // This would call the API in a real application
    console.log(`Toggle feature for listing ${id}`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  if (!user || user.role !== 'admin') {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
      <p className="text-gray-600 mb-8">Manage listings, users, and platform settings</p>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-orange-100 text-orange-600 mr-4">
              <Package className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Listings</p>
              <p className="text-2xl font-bold">{listings.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
              <FileCheck className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Approved Listings</p>
              <p className="text-2xl font-bold">{approvedCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Approvals</p>
              <p className="text-2xl font-bold">{pendingCount}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('pending')}
              className={`py-4 px-6 font-medium text-sm border-b-2 focus:outline-none ${
                activeTab === 'pending'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Pending Review 
              <span className="ml-2 bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full text-xs">
                {pendingCount}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('approved')}
              className={`py-4 px-6 font-medium text-sm border-b-2 focus:outline-none ${
                activeTab === 'approved'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Approved
              <span className="ml-2 bg-green-100 text-green-600 px-2 py-0.5 rounded-full text-xs">
                {approvedCount}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('rejected')}
              className={`py-4 px-6 font-medium text-sm border-b-2 focus:outline-none ${
                activeTab === 'rejected'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Rejected
              <span className="ml-2 bg-red-100 text-red-600 px-2 py-0.5 rounded-full text-xs">
                {rejectedCount}
              </span>
            </button>
          </nav>
        </div>

        {/* Search Bar */}
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <div className="relative">
            <input
              type="text"
              placeholder="Search listings by variety, seller, or location..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="input w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 pr-10"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <Filter className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Listings Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Listing Details
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Seller
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Submitted
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredListings.length > 0 ? (
                filteredListings.map((listing) => (
                  <AdminListingItem
                    key={listing._id}
                    listing={listing}
                    onApprove={handleApprove}
                    onReject={handleReject}
                    onDelete={handleDelete}
                    onToggleFeature={handleToggleFeature}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    {activeTab === 'pending' ? (
                      <div>
                        <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                        <p className="text-lg font-medium text-gray-900">No pending listings</p>
                        <p className="text-gray-500">All caught up! There are no listings waiting for review.</p>
                      </div>
                    ) : activeTab === 'approved' ? (
                      <div>
                        <AlertTriangle className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                        <p className="text-lg font-medium text-gray-900">No approved listings found</p>
                        <p className="text-gray-500">There are no listings matching your search criteria.</p>
                      </div>
                    ) : (
                      <div>
                        <AlertTriangle className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                        <p className="text-lg font-medium text-gray-900">No rejected listings found</p>
                        <p className="text-gray-500">There are no listings matching your search criteria.</p>
                      </div>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;