import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa"; // Social icons
import { FiArrowUp } from "react-icons/fi";

const Footer: React.FC = () => {
  const topRef = useRef<HTMLDivElement>(null);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-gradient-to-br from-[var(--color-dark)] via-gray-900 to-[var(--color-primary)] text-white pt-16 pb-8 px-4 font-body overflow-hidden">
      <div ref={topRef} className="max-w-7xl mx-auto">
        {/* Main Footer Content - Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1: About Tender Notices */}
          <div>
            <h3 className="text-2xl font-extrabold font-heading tracking-wide mb-4">
              ABOUT TENDER NOTICES
            </h3>
            <p className="text-base leading-relaxed mb-6 text-gray-200">
              We are a team with a passion to help businesses grow. Each
              business is unique in its own way and we like to help them succeed
              with exclusive solutions to match their needs. Many businesses
              have internal systems to help with their day to day operations and
              we build a system with all the features to make your daily life
              easier.
            </p>
            <div className="flex space-x-4 mt-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 p-2 rounded-full hover:bg-[var(--color-primary)] hover:scale-110 transition-all duration-200 shadow-lg"
              >
                <FaFacebookF size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 p-2 rounded-full hover:bg-[var(--color-primary)] hover:scale-110 transition-all duration-200 shadow-lg"
              >
                <FaLinkedinIn size={20} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-2xl font-extrabold font-heading tracking-wide mb-4">
              QUICK LINKS
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-base text-gray-200 hover:text-[var(--color-primary)] transition-colors duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/how-it-works"
                  className="text-base text-gray-200 hover:text-[var(--color-primary)] transition-colors duration-200"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="text-base text-gray-200 hover:text-[var(--color-primary)] transition-colors duration-200"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  to="/about-us"
                  className="text-base text-gray-200 hover:text-[var(--color-primary)] transition-colors duration-200"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/our-clients"
                  className="text-base text-gray-200 hover:text-[var(--color-primary)] transition-colors duration-200"
                >
                  Our Clients
                </Link>
              </li>
              <li>
                <Link
                  to="/contact-us"
                  className="text-base text-gray-200 hover:text-[var(--color-primary)] transition-colors duration-200"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Tenders */}
          <div>
            <h3 className="text-2xl font-extrabold font-heading tracking-wide mb-4">
              TENDERS
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/tenders"
                  className="text-base text-gray-200 hover:text-[var(--color-primary)] transition-colors duration-200"
                >
                  All Tenders
                </Link>
              </li>
              <li>
                <Link
                  to="/tenders/today"
                  className="text-base text-gray-200 hover:text-[var(--color-primary)] transition-colors duration-200"
                >
                  Today's Tenders
                </Link>
              </li>
              <li>
                <Link
                  to="/tenders/live"
                  className="text-base text-gray-200 hover:text-[var(--color-primary)] transition-colors duration-200"
                >
                  Live Tenders
                </Link>
              </li>
              <li>
                <Link
                  to="/tenders/closed"
                  className="text-base text-gray-200 hover:text-[var(--color-primary)] transition-colors duration-200"
                >
                  Closed Tenders
                </Link>
              </li>
              <li>
                <Link
                  to="/tenders/government"
                  className="text-base text-gray-200 hover:text-[var(--color-primary)] transition-colors duration-200"
                >
                  Government Tenders
                </Link>
              </li>
              <li>
                <Link
                  to="/tenders/private"
                  className="text-base text-gray-200 hover:text-[var(--color-primary)] transition-colors duration-200"
                >
                  Private Tenders
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div>
            <h3 className="text-2xl font-extrabold font-heading tracking-wide mb-4">
              CONTACT US
            </h3>
            <address className="not-italic text-base space-y-1 text-gray-200">
              <p>Tender Notices (Pvt) Ltd</p>
              <p>08, Gamini Mawatha, Mirihana, Kotte, Sri Lanka.</p>
              <p>
                Phone:{" "}
                <a
                  href="tel:+94117445485"
                  className="hover:text-[var(--color-primary)] transition-colors duration-200"
                >
                  (+94) 117 445 485
                </a>
              </p>
              <p>
                Email:{" "}
                <a
                  href="mailto:info@tendernotices.lk"
                  className="hover:text-[var(--color-primary)] transition-colors duration-200"
                >
                  info@tendernotices.lk
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Separator Line */}
        <hr className="border-gray-700 mb-6" />

        {/* Bottom Copyright Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs md:text-sm gap-2 md:gap-0">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Tender Notices (Pvt) Ltd. Solution
            by   Technologies
          </p>
          <div className="flex space-x-4">
            <Link
              to="/privacy-policy"
              className="hover:text-[var(--color-primary)] transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-conditions"
              className="hover:text-[var(--color-primary)] transition-colors duration-200"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
        {/* Back to Top Button */}
        <button
          onClick={handleBackToTop}
          className="fixed bottom-8 right-8 z-50 bg-[var(--color-primary)] text-white p-3 rounded-full shadow-lg hover:bg-white hover:text-[var(--color-primary)] transition-colors duration-200 flex items-center justify-center"
          aria-label="Back to top"
        >
          <FiArrowUp size={22} />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
