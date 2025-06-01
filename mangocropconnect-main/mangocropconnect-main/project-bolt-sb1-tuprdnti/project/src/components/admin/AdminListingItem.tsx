import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, Eye, Trash, Star } from 'lucide-react';

interface Listing {
  _id: string;
  variety: string;
  quantity: number;
  location: string;
  sellerName: string;
  sellerPhone: string;
  harvestDate: string;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected';
  featured: boolean;
  images: string[];
}

interface AdminListingItemProps {
  listing: Listing;
  onApprove: (id: string) => Promise<void>;
  onReject: (id: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onToggleFeature: (id: string) => Promise<void>;
}

const AdminListingItem: React.FC<AdminListingItemProps> = ({
  listing,
  onApprove,
  onReject,
  onDelete,
  onToggleFeature,
}) => {
  const navigate = useNavigate();
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const handleDeleteConfirm = () => {
    setShowConfirmDelete(true);
  };

  const handleDelete = async () => {
    await onDelete(listing._id);
    setShowConfirmDelete(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmDelete(false);
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          {listing.images && listing.images.length > 0 ? (
            <img
              src={listing.images[0]}
              alt={listing.variety}
              className="h-10 w-10 object-cover rounded-md mr-3"
            />
          ) : (
            <div className="h-10 w-10 bg-orange-100 rounded-md mr-3 flex items-center justify-center">
              <span className="text-orange-500 text-xs font-bold">No Img</span>
            </div>
          )}
          <div>
            <div className="font-medium text-gray-900">{listing.variety} Mangoes</div>
            <div className="text-sm text-gray-500">
              {listing.quantity} kg • {listing.location}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{listing.sellerName}</div>
        <div className="text-sm text-gray-500">{listing.sellerPhone}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {formatDate(listing.createdAt)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {listing.status === 'pending' && (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
            Pending
          </span>
        )}
        {listing.status === 'approved' && (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
            Approved
          </span>
        )}
        {listing.status === 'rejected' && (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
            Rejected
          </span>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex justify-end space-x-2">
          {showConfirmDelete ? (
            <>
              <span className="text-sm text-red-600 mr-2">Confirm delete?</span>
              <button
                onClick={handleDelete}
                className="text-red-600 hover:text-red-900"
              >
                Yes
              </button>
              <button
                onClick={handleCancelDelete}
                className="text-gray-600 hover:text-gray-900"
              >
                No
              </button>
            </>
          ) : (
            <>
              {listing.status === 'pending' && (
                <>
                  <button
                    onClick={() => onApprove(listing._id)}
                    className="text-green-600 hover:text-green-900"
                    title="Approve"
                  >
                    <CheckCircle className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => onReject(listing._id)}
                    className="text-red-600 hover:text-red-900"
                    title="Reject"
                  >
                    <XCircle className="h-5 w-5" />
                  </button>
                </>
              )}
              <button
                onClick={() => onToggleFeature(listing._id)}
                className={`${
                  listing.featured ? 'text-yellow-500' : 'text-gray-400'
                } hover:text-yellow-600`}
                title={listing.featured ? 'Remove from featured' : 'Add to featured'}
              >
                <Star className={`h-5 w-5 ${listing.featured ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={() => navigate(`/listings/${listing._id}`)}
                className="text-blue-600 hover:text-blue-900"
                title="View Details"
              >
                <Eye className="h-5 w-5" />
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="text-red-600 hover:text-red-900"
                title="Delete"
              >
                <Trash className="h-5 w-5" />
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

export default AdminListingItem;