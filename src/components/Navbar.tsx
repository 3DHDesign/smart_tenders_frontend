import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const mainNavLinkColorClass = isScrolled ? "text-gray-700" : "text-white";
  const mainNavLinkHoverClass = "hover:text-[var(--color-accent-blue-light)]";

  return (
    <header
      className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="wide-container h-16 flex items-center">
        {/* ✅ Left Logo */}
        <Link to="/" className="flex items-center h-full py-2">
          <img
            src="/images/PrimaryLogo.svg"
            alt="SmartTenders Logo"
            className="h-10 transition-all duration-300 ease-in-out"
          />
        </Link>

        {/* ✅ Right section (links + buttons) */}
        <div className="flex items-center gap-6 ml-auto">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {["/", "/tenders", "/about-us", "/contact-us"].map((path, idx) => (
              <NavLink
                key={idx}
                to={path}
                className={({ isActive }) =>
                  `transition-colors duration-300 ${
                    isActive
                      ? "text-[var(--color-accent-blue-main)] font-semibold"
                      : `${mainNavLinkColorClass} ${mainNavLinkHoverClass}`
                  }`
                }
              >
                {path === "/"
                  ? "Home"
                  : path.replace("/", "").replace("-", " ")}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Register/Login or Dashboard */}
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <Link
                to="/dashboard"
                className={`${mainNavLinkColorClass} ${mainNavLinkHoverClass} text-3xl transition-colors duration-300`}
                title="Go to Dashboard"
              >
                <FaUserCircle />
              </Link>
            ) : (
              <>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-md transition-all duration-300 text-sm font-semibold
                     ${
                       isActive
                         ? "bg-[var(--color-accent-blue-main)] text-white"
                         : isScrolled
                         ? "border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white"
                         : "border border-white text-white hover:bg-white hover:text-[var(--color-primary)]"
                     }`
                  }
                >
                  Register
                </NavLink>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-md transition-colors duration-300 text-sm font-semibold
                     ${
                       isActive
                         ? "bg-[var(--color-accent-blue-main)] text-white"
                         : "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary)]/80"
                     }`
                  }
                >
                  Login
                </NavLink>
              </>
            )}
          </div>

          {/* ✅ Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            <svg
              className={`w-8 h-8 transition-colors duration-300 ${
                isScrolled ? "text-[var(--color-dark)]" : "text-white"
              }`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {isOpen ? (
                <path d="M18 6L6 18M6 6L18 18" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* ✅ Mobile Nav */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-[var(--color-dark)] shadow-lg border-t border-gray-800 py-4 px-4 space-y-2 text-white transition-all duration-300 ease-in-out">
          {["/", "/tenders", "/about-us", "/contact-us"].map((path, idx) => (
            <NavLink
              key={idx}
              to={path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block py-2 px-3 rounded-md text-base transition-colors duration-300
                 ${
                   isActive
                     ? "bg-[var(--color-primary)] text-white"
                     : "hover:bg-gray-700"
                 }`
              }
            >
              {path === "/"
                ? "Home"
                : path.replace("/", "").replace("-", " ")}
            </NavLink>
          ))}

          <div className="border-t border-gray-700 my-2 pt-2" />

          {isLoggedIn ? (
            <NavLink
              to="/dashboard"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block w-full text-center py-2 px-3 rounded-md text-base font-semibold transition-colors duration-300
                 ${
                   isActive
                     ? "bg-[var(--color-accent-blue-main)]"
                     : "bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/80"
                 } text-white`
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
                   ${
                     isActive
                       ? "bg-[var(--color-accent-blue-main)]"
                       : "bg-white text-[var(--color-primary)] hover:bg-gray-100"
                   }`
                }
              >
                Register
              </NavLink>
              <NavLink
                to="/login"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block w-full text-center py-2 px-3 rounded-md text-base font-semibold transition-colors duration-300
                   ${
                     isActive
                       ? "bg-[var(--color-accent-blue-main)]"
                       : "bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/80"
                   } text-white`
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
