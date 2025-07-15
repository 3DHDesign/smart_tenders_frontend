import React, { useState } from "react";
import type { ReactNode } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaFileInvoice,
  FaLock,
  FaUser,
  FaHeart,
  FaBars,
  FaTimes,
} from "react-icons/fa";

interface DashboardLayoutProps {
  children: ReactNode;
}

const dashboardNavItems = [
  { path: "/dashboard", label: "Dashboard", icon: FaTachometerAlt },
  { path: "/dashboard/invoices", label: "Invoices", icon: FaFileInvoice },
  { path: "/dashboard/password-reset", label: "Password Reset", icon: FaLock },
  { path: "/dashboard/account", label: "User Account", icon: FaUser },
  { path: "/dashboard/wishlist", label: "Wishlist", icon: FaHeart },
];

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    // This div is the main container for the dashboard layout (sidebar + content)
    // It will now provide the top offset for the main Navbar.
    // Removed pt-16 from here, as mt-16 will be on the main content area.
    <div className="flex flex-col min-h-screen bg-gray-100 font-body ">
      {/* Top Bar for Mobile (Dashboard specific header) */}
      <header className="bg-[var(--color-dark)] text-white p-4 md:hidden flex items-center justify-between shadow-md fixed top-0 left-0 right-0 z-50">
        <Link to="/dashboard" className="text-xl font-bold font-heading">
          SmartTenders{" "}
          <span className="text-[var(--color-primary)]">Dashboard</span>
        </Link>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-white focus:outline-none"
        >
          {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </header>

      {/* Main Dashboard Content Area (flex-grow to push footer down if any) */}
      <div className="flex flex-grow ">
        {/* Left Sidebar Navigation */}
        <aside
          className={`
            fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-xl flex-shrink-0 border-r border-gray-200 p-4
            transform transition-transform duration-300 ease-in-out
            md:relative md:translate-x-0 md:flex md:flex-col
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
            pt-20 md:pt-4  /* Adjusted padding-top for mobile fixed header and desktop sidebar */
          `}
        >
          {/* Sidebar Logo/Brand for Desktop */}
          <Link
            to="/dashboard"
            className="hidden md:block text-2xl font-bold font-heading text-[var(--color-dark)] mb-8 mt-16"
          >
            SmartTenders{" "}
            <span className="text-[var(--color-primary)]">Dash</span>
          </Link>

          <nav className="flex-grow">
            <ul className="space-y-2">
              {dashboardNavItems.map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={item.path}
                    onClick={() => setIsSidebarOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center p-3 rounded-lg font-medium transition-colors duration-200
                       ${
                         isActive
                           ? "bg-[var(--color-primary)] text-white shadow-md"
                           : "text-gray-700 hover:bg-gray-100"
                       }`
                    }
                  >
                    <item.icon className="mr-3" size={20} />
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Optional: Sidebar Footer/Copyright */}
          <div className="mt-auto pt-4 border-t border-gray-200 text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} SmartTenders</p>
          </div>
        </aside>

        {/* Overlay for mobile sidebar */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}

        {/* Right Content Area */}
        {/* KEY FIX: Added mt-16 here to push content below the main Navbar. */}
        {/* md:ml-64 is here to push content right on desktop */}
        <main className="flex-grow bg-gray-100 overflow-y-auto  ">
          {" "}
          {/* Added mt-16 */}
          {children} {/* DashboardPage.tsx content will be rendered here */}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
