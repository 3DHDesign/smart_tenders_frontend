// src/pages/App.tsx
// --- CRITICAL FIX: Remove BrowserRouter from here ---
import { Routes, Route, Navigate } from 'react-router-dom'; // Removed BrowserRouter as Router

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Tenders from './pages/Tenders/Tenders';
import DashboardPage from './pages/Dashboard/DashboardPage';
import DashboardLayout from './layouts/DashboardLayout';
import InvoicesPage from './pages/Dashboard/InvoicesPage';
import PasswordResetPage from './pages/Dashboard/PasswordResetPage';
import UserAccountPage from './pages/Dashboard/UserAccountPage';
import WishlistPage from './pages/Dashboard/WishlistPage';
import ContactUs from './pages/ContactUs';
import Register from './pages/Auth/Register';
import TenderDetail from './pages/Tenders/TenderDetail';
import Login from './pages/Auth/Login';
import ForgotPassword from './pages/Auth/ForgotPassword'; // Corrected path

import { useAuthStore } from './stores/authStore';
import { useEffect } from 'react';

function App() {
  const { isLoggedIn, isLoading, initializeAuth } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        Loading application...
      </div>
    );
  }

  return (
    <> {/* Use a Fragment instead of Router */}
      <Navbar />

      <Routes>
        {/* Public Routes - accessible to all */}
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/tenders" element={<Tenders />} />
        <Route path="/tenders/:id" element={<TenderDetail />} />
        <Route path="/contact-us" element={<ContactUs />} />

        {/* Auth Routes - redirect to dashboard if already logged in */}
        <Route path="/register" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Register />} />
        <Route path="/login" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/forgot-password" element={isLoggedIn ? <Navigate to="/dashboard" /> : <ForgotPassword />} />

        {/* Protected Dashboard Routes - require login */}
        <Route
          path="/dashboard"
          element={isLoggedIn ? <DashboardLayout><DashboardPage /></DashboardLayout> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard/invoices"
          element={isLoggedIn ? <DashboardLayout><InvoicesPage /></DashboardLayout> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard/password-reset"
          element={isLoggedIn ? <DashboardLayout><PasswordResetPage /></DashboardLayout> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard/account"
          element={isLoggedIn ? <DashboardLayout><UserAccountPage /></DashboardLayout> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard/wishlist"
          element={isLoggedIn ? <DashboardLayout><WishlistPage /></DashboardLayout> : <Navigate to="/login" />}
        />

        {/* Default redirect */}
        <Route
          path="*" // Catch-all for any other unmatched routes
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;