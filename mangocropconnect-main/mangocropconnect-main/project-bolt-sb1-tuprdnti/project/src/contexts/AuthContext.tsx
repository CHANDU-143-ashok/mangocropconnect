import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'seller' | 'broker' | 'buyer';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load user from localStorage on initial mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // This would be a real API call in production
      // For demo purposes, we're checking against hardcoded credentials
      if (email === 'admin@mangocropconnect.com' && password === 'admin123') {
        const adminUser: User = {
          _id: '1',
          name: 'Admin User',
          email: 'admin@mangocropconnect.com',
          phone: '9876543210',
          role: 'admin'
        };
        setUser(adminUser);
        localStorage.setItem('user', JSON.stringify(adminUser));
      } else if (email === 'seller@mangocropconnect.com' && password === 'seller123') {
        const sellerUser: User = {
          _id: '2',
          name: 'Ramesh Kumar',
          email: 'seller@mangocropconnect.com',
          phone: '9876543211',
          role: 'seller'
        };
        setUser(sellerUser);
        localStorage.setItem('user', JSON.stringify(sellerUser));
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (err) {
      setError('Invalid email or password');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: any) => {
    setLoading(true);
    try {
      // This would be a real API call in production
      // For demo purposes, we're creating a mock user
      const newUser: User = {
        _id: Math.random().toString(36).substr(2, 9),
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        role: userData.role as 'admin' | 'seller' | 'broker' | 'buyer',
      };
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
    } catch (err) {
      setError('Registration failed. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};