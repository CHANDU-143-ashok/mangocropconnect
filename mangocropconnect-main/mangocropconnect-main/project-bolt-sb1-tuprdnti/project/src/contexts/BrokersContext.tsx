import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Broker {
  _id: string;
  name: string;
  phone: string;
  email: string;
  regions?: string[];
  specialties?: string[];
  description?: string;
  isVerified: boolean;
  isPremium: boolean;
  avatar?: string;
  experienceYears: number;
}

interface BrokersContextType {
  brokers: Broker[];
  loading: boolean;
  error: string | null;
  getBroker: (id: string) => Promise<Broker>;
}

const BrokersContext = createContext<BrokersContextType | undefined>(undefined);

export const useBrokers = (): BrokersContextType => {
  const context = useContext(BrokersContext);
  if (context === undefined) {
    throw new Error('useBrokers must be used within a BrokersProvider');
  }
  return context;
};

interface BrokersProviderProps {
  children: ReactNode;
}

export const BrokersProvider: React.FC<BrokersProviderProps> = ({ children }) => {
  const [brokers, setBrokers] = useState<Broker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // In a real app, we would fetch from an API
    const loadBrokers = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        setBrokers([]); // Start with empty brokers list
      } catch (err) {
        setError('Failed to load broker directory. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadBrokers();
  }, []);

  const getBroker = async (id: string): Promise<Broker> => {
    const broker = brokers.find(b => b._id === id);
    
    if (!broker) {
      throw new Error('Broker not found');
    }
    
    return broker;
  };

  const value = {
    brokers,
    loading,
    error,
    getBroker
  };

  return <BrokersContext.Provider value={value}>{children}</BrokersContext.Provider>;
};