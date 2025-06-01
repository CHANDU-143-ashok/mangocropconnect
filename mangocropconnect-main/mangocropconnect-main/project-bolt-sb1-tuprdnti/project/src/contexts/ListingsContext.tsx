import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Listing {
  _id: string;
  variety: string;
  quantity: number;
  location: string;
  harvestDate: string;
  sellerName: string;
  sellerPhone: string;
  description: string;
  images: string[];
  status: 'pending' | 'approved' | 'rejected';
  featured: boolean;
  createdAt: string;
  qualityGrade?: string;
  farmingMethod?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  broker?: {
    name: string;
    phone: string;
    regions?: string[];
  };
}

interface ListingsContextType {
  listings: Listing[];
  loading: boolean;
  error: string | null;
  getListing: (id: string) => Promise<Listing>;
  addListing: (listing: Partial<Listing>) => Promise<Listing>;
  approveListing: (id: string) => Promise<void>;
  rejectListing: (id: string) => Promise<void>;
  deleteListing: (id: string) => Promise<void>;
}

const ListingsContext = createContext<ListingsContextType | undefined>(undefined);

export const useListings = (): ListingsContextType => {
  const context = useContext(ListingsContext);
  if (context === undefined) {
    throw new Error('useListings must be used within a ListingsProvider');
  }
  return context;
};

interface ListingsProviderProps {
  children: ReactNode;
}

export const ListingsProvider: React.FC<ListingsProviderProps> = ({ children }) => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // In a real app, we would fetch from an API
    const loadListings = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        setListings([]); // Start with empty listings
      } catch (err) {
        setError('Failed to load listings. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadListings();
  }, []);

  const getListing = async (id: string): Promise<Listing> => {
    const listing = listings.find(l => l._id === id);
    
    if (!listing) {
      throw new Error('Listing not found');
    }
    
    return listing;
  };

  const addListing = async (listingData: Partial<Listing>): Promise<Listing> => {
    // Simulate API request
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newListing: Listing = {
      _id: `listing-${Math.random().toString(36).substr(2, 9)}`,
      variety: listingData.variety || '',
      quantity: listingData.quantity || 0,
      location: listingData.location || '',
      harvestDate: listingData.harvestDate || new Date().toISOString().split('T')[0],
      sellerName: listingData.sellerName || '',
      sellerPhone: listingData.sellerPhone || '',
      description: listingData.description || '',
      images: listingData.images || [],
      status: 'pending',
      featured: false,
      createdAt: new Date().toISOString(),
    };
    
    setListings(prev => [newListing, ...prev]);
    
    return newListing;
  };

  const approveListing = async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    setListings(prev => 
      prev.map(listing => 
        listing._id === id ? { ...listing, status: 'approved' } : listing
      )
    );
  };

  const rejectListing = async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    setListings(prev => 
      prev.map(listing => 
        listing._id === id ? { ...listing, status: 'rejected' } : listing
      )
    );
  };

  const deleteListing = async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    setListings(prev => prev.filter(listing => listing._id !== id));
  };

  const value = {
    listings,
    loading,
    error,
    getListing,
    addListing,
    approveListing,
    rejectListing,
    deleteListing
  };

  return <ListingsContext.Provider value={value}>{children}</ListingsContext.Provider>;
};