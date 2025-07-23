import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import Button from "./shared/Button";
import { FaPlus } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false); // State to track scroll position

  // Effect to handle scroll for affix behavior
  useEffect(() => {
    const handleScroll = () => {
      // Set threshold to 10px or similar small value for immediate effect
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    // Added sticky, top-0, z-50.
    // Dynamic background and shadow based on scroll state.
    <header className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out
                       ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}> {/* Removed border-b for cleaner transition */}
      {/* KEY FIX: Adjusted px- for wide-container to ensure logo has space */}
      <div className="wide-container flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8"> {/* Added responsive padding here */}
        {/* Logo - KEY FIX: Sized for prominence within h-16 Navbar, maintains aspect ratio */}
        <Link to="/" className="flex items-center h-full py-2"> {/* py-2 for vertical padding within h-16 */}
          {/* Assuming PrimaryLogo.svg is in public/images/ */}
          <img
            src="/images/PrimaryLogo.svg"
            alt="SmartTenders Logo"
            className={`h-10 transition-all duration-300 ease-in-out`} // h-full and w-auto
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `transition-colors duration-300
               ${isActive
                 ? 'text-[var(--color-accent-blue-main)] font-semibold'
                 : isScrolled
                   ? 'text-gray-700 hover:text-[var(--color-accent-blue-light)]' // Dark text on white background
                   : 'text-white hover:text-[var(--color-accent-blue-light)]' // White text on transparent background
               }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/tenders"
            className={({ isActive }) =>
              `transition-colors duration-300
               ${isActive
                 ? 'text-[var(--color-accent-blue-main)] font-semibold'
                 : isScrolled
                   ? 'text-gray-700 hover:text-[var(--color-accent-blue-light)]'
                   : 'text-white hover:text-[var(--color-accent-blue-light)]'
               }`
            }
          >
            Tenders
          </NavLink>
          <NavLink
            to="/about-us"
            className={({ isActive }) =>
              `transition-colors duration-300
               ${isActive
                 ? 'text-[var(--color-accent-blue-main)] font-semibold'
                 : isScrolled
                   ? 'text-gray-700 hover:text-[var(--color-accent-blue-light)]'
                   : 'text-white hover:text-[var(--color-accent-blue-light)]'
               }`
            }
          >
            About Us
          </NavLink>
          <NavLink
            to="/contact-us"
            className={({ isActive }) =>
              `transition-colors duration-300
               ${isActive
                 ? 'text-[var(--color-accent-blue-main)] font-semibold'
                 : isScrolled
                   ? 'text-gray-700 hover:text-[var(--color-accent-blue-light)]'
                   : 'text-white hover:text-[var(--color-accent-blue-light)]'
               }`
            }
          >
            Contact Us
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `transition-colors duration-300
               ${isActive
                 ? 'text-[var(--color-accent-blue-main)] font-semibold'
                 : isScrolled
                   ? 'text-gray-700 hover:text-[var(--color-accent-blue-light)]'
                   : 'text-white hover:text-[var(--color-accent-blue-light)]'
               }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/register"
            className={({ isActive }) =>
              `transition-colors duration-300
               ${isActive
                 ? 'text-[var(--color-accent-blue-main)] font-semibold'
                 : isScrolled
                   ? 'text-gray-700 hover:text-[var(--color-accent-blue-light)]'
                   : 'text-white hover:text-[var(--color-accent-blue-light)]'
               }`
            }
          >
            Register
          </NavLink>

          <NavLink
            to="/login"
            className={({ isActive }) =>
              `transition-colors duration-300
               ${isActive
                 ? 'text-[var(--color-accent-blue-main)] font-semibold'
                 : isScrolled
                   ? 'text-gray-700 hover:text-[var(--color-accent-blue-light)]'
                   : 'text-white hover:text-[var(--color-accent-blue-light)]'
               }`
            }
          >
            login
          </NavLink>
        </nav>

        {/* Free Tender CTA - Button uses var() internally */}
        <Link to="/post-tender" className="hidden md:inline-block">
          <Button label="Free Tender" icon={FaPlus} />
        </Link>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          <svg
            className={`w-6 h-6 transition-colors duration-300
                        ${isScrolled ? 'text-[var(--color-dark)]' : 'text-white'}`} // Icon color changes
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {isOpen ? <path d="M18 6L6 18M6 6L18 18"/> : <path d="M4 6h16M4 12h16M4 18h16"/>}
          </svg>
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-[var(--color-dark)] border-t border-gray-800 px-4 py-3 space-y-2 text-white">
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className="block py-2 hover:text-[var(--color-accent-blue-light)] transition-colors duration-300"
          >
            Home
          </NavLink>
          <NavLink
            to="/tenders"
            onClick={() => setIsOpen(false)}
            className="block py-2 hover:text-[var(--color-accent-blue-light)] transition-colors duration-300"
          >
            Tenders
          </NavLink>
          <NavLink
            to="/about-us"
            onClick={() => setIsOpen(false)}
            className="block py-2 hover:text-[var(--color-accent-blue-light)] transition-colors duration-300"
          >
            About Us
          </NavLink>
          <NavLink
            to="/contact-us"
            onClick={() => setIsOpen(false)}
            className="block py-2 hover:text-[var(--color-accent-blue-light)] transition-colors duration-300"
          >
            Contact Us
          </NavLink>
          <NavLink
            to="/dashboard"
            onClick={() => setIsOpen(false)}
            className="block py-2 hover:text-[var(--color-accent-blue-light)] transition-colors duration-300"
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/register"
            onClick={() => setIsOpen(false)}
            className="block py-2 hover:text-[var(--color-accent-blue-light)] transition-colors duration-300"
          >
            Register
          </NavLink>
          <Link
            to="/post-tender"
            onClick={() => setIsOpen(false)}
            className="block text-[var(--color-primary)] font-semibold py-2 hover:text-white transition-colors duration-300"
          >
            Free Tender
          </Link>
        </div>
      )}
    </header>
  );
}