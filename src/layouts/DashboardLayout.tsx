// src/layouts/DashboardLayout.tsx
import React, { useState, type ReactNode } from "react";
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
  { path: "/dashboard/account", label: "User Account", icon: FaUser },
  { path: "/dashboard/invoices", label: "Invoices", icon: FaFileInvoice, disabled: true },
  { path: "/dashboard/password-reset", label: "Password Reset", icon: FaLock, disabled: true },
  { path: "/dashboard/wishlist", label: "Wishlist", icon: FaHeart, disabled: true },
];

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

 
  const headerOffsetVar = "var(--app-header-h-mobile, 64px)";

  return (
    <>
    <div className="bg-black/50 h-[60px] sm:h-[100px]"></div>

    <div className="flex flex-col min-h-screen bg-gray-100 font-body">

{/* Mobile dashboard top bar, positioned BELOW the main site header */}
<header
  className="bg-[var(--color-dark)] text-white p-4 md:hidden flex items-center justify-between shadow-md fixed left-0 right-0 z-40"
  style={{ top: `calc(${headerOffsetVar})` }}
>
  <Link to="/dashboard" className="text-xl font-bold font-heading">
    SmartTenders <span className="text-[var(--color-primary)]">Dashboard</span>
  </Link>
  <button
    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
    className="text-white focus:outline-none"
    aria-label="Toggle sidebar"
  >
    {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
  </button>
</header>

<div className="flex flex-grow">
  {/* Sidebar */}
  <aside
  className={`
    fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-xl flex-shrink-0 border-r border-gray-200 p-4
    transform transition-transform duration-300 ease-in-out
    md:relative md:translate-x-0 md:flex md:flex-col
    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}

    pt-[calc(var(--app-header-h-mobile,64px)+56px)]  /* ✅ mobile only padding */
    md:pt-4                                         /* ✅ smaller on desktop */
  `}
>

    {/* Desktop brand (kept), add a bit of margin to clear site header on desktop if needed */}
    <Link
      to="/dashboard"
      className="hidden md:block text-2xl font-bold font-heading text-[var(--color-dark)] mb-8 mt-6"
    >
      SmartTenders <span className="text-[var(--color-primary)]">Dash</span>
    </Link>

    <nav className="flex-grow">
      <ul className="space-y-2">
        {dashboardNavItems.map((item, index) => (
          <li key={index}>
            {item.disabled ? (
              <div
                className="flex items-center p-3 rounded-lg font-medium cursor-not-allowed text-gray-400"
                aria-disabled="true"
              >
                <item.icon className="mr-3" size={20} />
                <span>{item.label}</span>
              </div>
            ) : (
              <NavLink
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-lg font-medium transition-colors duration-200 ${
                    isActive
                      ? "bg-[var(--color-primary)] text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                <item.icon className="mr-3" size={20} />
                <span>{item.label}</span>
              </NavLink>
            )}
          </li>
        ))}
      </ul>
    </nav>

    <div className="mt-auto pt-4 border-t border-gray-200 text-sm text-gray-500">
      <p>&copy; {new Date().getFullYear()} SmartTenders</p>
    </div>
  </aside>

  {/* Mobile overlay for sidebar */}
  {isSidebarOpen && (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
      onClick={() => setIsSidebarOpen(false)}
    />
  )}
  

  {/* Main content area */}
  <main
  className="flex-grow bg-gray-100 overflow-y-auto pt-[calc(var(--app-header-h-mobile,px)+56px)] md:pt-[10px]"
>
  {children}
</main>

</div>
</div>
    </>
  
  );
};

export default DashboardLayout;
