// src/components/layout/Navbar.tsx
import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom"; // Import useLocation
import Button from "./shared/Button";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const location = useLocation(); // Get current location object
  // TEMPORARY: Determine isLoggedIn based on URL for immediate testing
  // REPLACE THIS WITH YOUR REAL AUTHENTICATION LOGIC LATER
  const isLoggedIn = location.pathname.startsWith('/dashboard');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const mainNavLinkColorClass = isScrolled ? 'text-gray-700' : 'text-white';
  const mainNavLinkHoverClass = 'hover:text-[var(--color-accent-blue-light)]';

  return (
    <header className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out
                        ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className="container h-16 flex items-center justify-between
                      sm:sm-container md:md-container lg:lg-container xl:xl-container xxl:xxl-container">
        <Link to="/" className="flex items-center h-full py-2">
          <img
            src="/images/PrimaryLogo.svg"
            alt="SmartTenders Logo"
            className={`h-10 transition-all duration-300 ease-in-out`}
          />
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `transition-colors duration-300 ${isActive ? 'text-[var(--color-accent-blue-main)] font-semibold' : mainNavLinkColorClass + ' ' + mainNavLinkHoverClass}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/tenders"
            className={({ isActive }) =>
              `transition-colors duration-300 ${isActive ? 'text-[var(--color-accent-blue-main)] font-semibold' : mainNavLinkColorClass + ' ' + mainNavLinkHoverClass}`
            }
          >
            Tenders
          </NavLink>
          <NavLink
            to="/about-us"
            className={({ isActive }) =>
              `transition-colors duration-300 ${isActive ? 'text-[var(--color-accent-blue-main)] font-semibold' : mainNavLinkColorClass + ' ' + mainNavLinkHoverClass}`
            }
          >
            About Us
          </NavLink>
          <NavLink
            to="/contact-us"
            className={({ isActive }) =>
              `transition-colors duration-300 ${isActive ? 'text-[var(--color-accent-blue-main)] font-semibold' : mainNavLinkColorClass + ' ' + mainNavLinkHoverClass}`
            }
          >
            Contact Us
          </NavLink>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {isLoggedIn ? (
            // This block renders if isLoggedIn is true (based on URL for now)
            <Link
              to="/dashboard"
              className={`${mainNavLinkColorClass} ${mainNavLinkHoverClass} text-3xl transition-colors duration-300`}
              title="Go to Dashboard"
            >
              <FaUserCircle />
            </Link>
          ) : (
            // This block renders if isLoggedIn is false (based on URL for now)
            <>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-md transition-all duration-300 text-sm font-semibold
                   ${isActive
                      ? 'bg-[var(--color-accent-blue-main)] text-white'
                      : isScrolled
                        ? 'border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white'
                        : 'border border-white text-white hover:bg-white hover:text-[var(--color-primary)]'
                   }`
                }
              >
                Register
              </NavLink>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-md transition-colors duration-300 text-sm font-semibold
                   ${isActive
                      ? 'bg-[var(--color-accent-blue-main)] text-white'
                      : 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary)]/80'
                   }`
                }
              >
                Login
              </NavLink>
            </>
          )}
        </div>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          <svg
            className={`w-8 h-8 transition-colors duration-300
                        ${isScrolled ? 'text-[var(--color-dark)]' : 'text-white'}`}
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {isOpen ? <path d="M18 6L6 18M6 6L18 18"/> : <path d="M4 6h16M4 12h16M4 18h16"/>}
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-[var(--color-dark)] shadow-lg border-t border-gray-800 py-4 px-4 space-y-2 text-white transition-all duration-300 ease-in-out">
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block py-2 px-3 rounded-md text-base transition-colors duration-300
               ${isActive ? 'bg-[var(--color-primary)] text-white' : 'hover:bg-gray-700'}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/tenders"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block py-2 px-3 rounded-md text-base transition-colors duration-300
               ${isActive ? 'bg-[var(--color-primary)] text-white' : 'hover:bg-gray-700'}`
            }
          >
            Tenders
          </NavLink>
          <NavLink
            to="/about-us"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block py-2 px-3 rounded-md text-base transition-colors duration-300
               ${isActive ? 'bg-[var(--color-primary)] text-white' : 'hover:bg-gray-700'}`
            }
          >
            About Us
          </NavLink>
          <NavLink
            to="/contact-us"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `block py-2 px-3 rounded-md text-base transition-colors duration-300
               ${isActive ? 'bg-[var(--color-primary)] text-white' : 'hover:bg-gray-700'}`
            }
          >
            Contact Us
          </NavLink>

          <div className="border-t border-gray-700 my-2 pt-2"></div>

          {isLoggedIn ? (
            <NavLink
              to="/dashboard"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block w-full text-center py-2 px-3 rounded-md text-base font-semibold transition-colors duration-300
                 ${isActive ? 'bg-[var(--color-accent-blue-main)]' : 'bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/80'} text-white`
              }
            >
              Dashboard
            </NavLink>
          ) : (
            <div className="flex flex-col gap-2">
              <NavLink
                to="/register"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block w-full text-center py-2 px-3 rounded-md text-base font-semibold transition-colors duration-300
                   ${isActive ? 'bg-[var(--color-accent-blue-main)]' : 'bg-white text-[var(--color-primary)] hover:bg-gray-100'} `
                }
              >
                Register
              </NavLink>
              <NavLink
                to="/login"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block w-full text-center py-2 px-3 rounded-md text-base font-semibold transition-colors duration-300
                   ${isActive ? 'bg-[var(--color-accent-blue-main)]' : 'bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/80'} text-white`
                }
              >
                Login
              </NavLink>
            </div>
          )}
        </div>
      )}
    </header>
  );
}