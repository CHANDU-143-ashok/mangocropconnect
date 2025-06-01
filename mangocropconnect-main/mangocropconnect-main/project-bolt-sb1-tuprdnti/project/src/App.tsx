import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ListingsProvider } from './contexts/ListingsContext';
import { BrokersProvider } from './contexts/BrokersContext';

// Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Page Components
import HomePage from './pages/HomePage';
import ListingsPage from './pages/ListingsPage';
import ListingDetailsPage from './pages/ListingDetailsPage';
import SellerUploadPage from './pages/SellerUploadPage';
import BrokerDirectoryPage from './pages/BrokerDirectoryPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ListingsProvider>
          <BrokersProvider>
            <div className="flex flex-col min-h-screen bg-yellow-50">
              <Header />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/listings" element={<ListingsPage />} />
                  <Route path="/listings/:id" element={<ListingDetailsPage />} />
                  <Route path="/seller/upload" element={<SellerUploadPage />} />
                  <Route path="/brokers" element={<BrokerDirectoryPage />} />
                  <Route path="/admin" element={<AdminDashboardPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </BrokersProvider>
        </ListingsProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;