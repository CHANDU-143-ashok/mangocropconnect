import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Menu, X, Leaf, User, LogOut } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center" onClick={closeMenu}>
              <Leaf className="h-8 w-8 text-orange-500" />
              <span className="ml-2 text-xl font-bold text-gray-900">MangoCropConnect</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link 
              to="/" 
              className={`px-3 py-2 text-sm font-medium ${isActive('/') ? 'text-orange-500' : 'text-gray-700 hover:text-orange-500'}`}
            >
              Home
            </Link>
            <Link 
              to="/listings" 
              className={`px-3 py-2 text-sm font-medium ${isActive('/listings') ? 'text-orange-500' : 'text-gray-700 hover:text-orange-500'}`}
            >
              Listings
            </Link>
            <Link 
              to="/brokers" 
              className={`px-3 py-2 text-sm font-medium ${isActive('/brokers') ? 'text-orange-500' : 'text-gray-700 hover:text-orange-500'}`}
            >
              Brokers
            </Link>
            <Link 
              to="/seller/upload" 
              className={`px-3 py-2 text-sm font-medium ${isActive('/seller/upload') ? 'text-orange-500' : 'text-gray-700 hover:text-orange-500'}`}
            >
              Sell Crops
            </Link>

            {user ? (
              <>
                {user.role === 'admin' && (
                  <Link 
                    to="/admin" 
                    className={`px-3 py-2 text-sm font-medium ${isActive('/admin') ? 'text-orange-500' : 'text-gray-700 hover:text-orange-500'}`}
                  >
                    Admin
                  </Link>
                )}
                <div className="relative group">
                  <button className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-orange-500">
                    <User className="h-5 w-5 mr-1" />
                    {user.name}
                  </button>
                  <div className="absolute right-0 w-48 mt-2 origin-top-right bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="py-1">
                      <button
                        onClick={handleLogout}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Log Out
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className={`px-4 py-2 text-sm font-medium ${isActive('/login') ? 'bg-orange-500 text-white' : 'text-gray-700 hover:bg-orange-100'} rounded-md`}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="px-4 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-md"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-orange-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500"
              aria-expanded="false"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/') ? 'bg-orange-100 text-orange-500' : 'text-gray-700 hover:bg-orange-50 hover:text-orange-500'
              }`}
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link
              to="/listings"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/listings') ? 'bg-orange-100 text-orange-500' : 'text-gray-700 hover:bg-orange-50 hover:text-orange-500'
              }`}
              onClick={closeMenu}
            >
              Listings
            </Link>
            <Link
              to="/brokers"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/brokers') ? 'bg-orange-100 text-orange-500' : 'text-gray-700 hover:bg-orange-50 hover:text-orange-500'
              }`}
              onClick={closeMenu}
            >
              Brokers
            </Link>
            <Link
              to="/seller/upload"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/seller/upload') ? 'bg-orange-100 text-orange-500' : 'text-gray-700 hover:bg-orange-50 hover:text-orange-500'
              }`}
              onClick={closeMenu}
            >
              Sell Crops
            </Link>
            
            {user ? (
              <>
                {user.role === 'admin' && (
                  <Link
                    to="/admin"
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      isActive('/admin') ? 'bg-orange-100 text-orange-500' : 'text-gray-700 hover:bg-orange-50 hover:text-orange-500'
                    }`}
                    onClick={closeMenu}
                  >
                    Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                  onClick={closeMenu}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 rounded-md text-base font-medium bg-orange-500 text-white hover:bg-orange-600"
                  onClick={closeMenu}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;