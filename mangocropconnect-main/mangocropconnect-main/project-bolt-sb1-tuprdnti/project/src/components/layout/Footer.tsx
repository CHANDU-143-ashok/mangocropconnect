import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and About Section */}
          <div>
            <div className="flex items-center mb-4">
              <Leaf className="h-8 w-8 text-orange-500" />
              <span className="ml-2 text-xl font-bold text-white">MangoCropConnect</span>
            </div>
            <p className="mb-4">
              Connecting mango farmers, brokers, and buyers to create a more efficient and 
              transparent marketplace for mango crops across rural India.
            </p>
            <p className="text-sm">
              &copy; {new Date().getFullYear()} MangoCropConnect. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-orange-400 transition">Home</Link>
              </li>
              <li>
                <Link to="/listings" className="hover:text-orange-400 transition">Mango Listings</Link>
              </li>
              <li>
                <Link to="/brokers" className="hover:text-orange-400 transition">Broker Directory</Link>
              </li>
              <li>
                <Link to="/seller/upload" className="hover:text-orange-400 transition">Sell Your Crop</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-orange-400 transition">Login / Register</Link>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition">Terms & Conditions</a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition">Privacy Policy</a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-2 mt-0.5 text-orange-500" />
                <span>+91 98490 24168</span>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-2 mt-0.5 text-orange-500" />
                <span>info@mangocropconnect.com</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5 text-orange-500" />
                <span>123 Mango Lane, Ratnagiri, Maharashtra, India</span>
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-white mb-3">Subscribe for Updates</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-3 py-2 rounded-l-md w-full focus:outline-none text-gray-800"
                />
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 rounded-r-md transition">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;