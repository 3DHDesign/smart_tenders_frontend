 
import { Routes, Route } from 'react-router-dom';

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

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/about-us" element={<AboutUs />} /> 
        <Route path="/tenders" element={<Tenders />} />
        <Route path="/tenders/:id" element={<TenderDetail />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/register" element={<Register />}/>
        <Route path="/dashboard" element={<DashboardLayout><DashboardPage /></DashboardLayout>} />
        <Route path="/dashboard/invoices" element={<DashboardLayout><InvoicesPage /></DashboardLayout>} />
            <Route path="/dashboard/password-reset" element={<DashboardLayout><PasswordResetPage /></DashboardLayout>} />
            <Route path="/dashboard/account" element={<DashboardLayout><UserAccountPage /></DashboardLayout>} />
            <Route path="/dashboard/wishlist" element={<DashboardLayout><WishlistPage /></DashboardLayout>} />


        {/* You can add 404 route here if needed */}
      </Routes>

      <Footer />
    </>
  );
}

export default App;
