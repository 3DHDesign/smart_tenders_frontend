import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FiArrowUp } from "react-icons/fi";
import { getFooterDetails } from "../services/footerService";
import type { FooterData } from "../services/footerService";

const Footer: React.FC = () => {
 const topRef = useRef<HTMLDivElement>(null);
 const [footerData, setFooterData] = useState<FooterData | null>(null);

 useEffect(() => {
  const fetchFooter = async () => {
   try {
    const data = await getFooterDetails();
    setFooterData(data);
   } catch (error) {
    console.error("Failed to load footer details:", error);
   }
  };
  fetchFooter();
 }, []);

 const handleBackToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
 };

 if (!footerData) {
  return null; // Or show a loader
 }

 return (
  <footer className="relative bg-gradient-to-br from-[var(--color-dark)] via-gray-900 to-[var(--color-primary)] text-white pt-16 pb-8 px-4 font-body overflow-hidden">
   <div ref={topRef} className="max-w-7xl mx-auto">
    {/* Main Footer Content */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
     {/* About Section: Updated with static content */}
     <div>
      <h3 className="text-2xl font-extrabold font-heading tracking-wide mb-4">
       ABOUT SMART TENDERS
      </h3>
      <p className="text-base leading-relaxed mb-6 text-gray-200">
       SmartTenders.lk is a leading platform in Sri Lanka, centralizing all government and private tender notices to help you find and act on new opportunities efficiently.
      </p>
      <div className="flex space-x-4 mt-4">
       <a
        href={footerData.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-white/10 p-2 rounded-full hover:bg-[var(--color-primary)] hover:scale-110 transition-all duration-200 shadow-lg"
       >
        <FaFacebookF size={20} />
       </a>
       <a
        href={footerData.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-white/10 p-2 rounded-full hover:bg-[var(--color-primary)] hover:scale-110 transition-all duration-200 shadow-lg"
       >
        <FaLinkedinIn size={20} />
       </a>
      </div>
     </div>

     {/* Quick Links: Updated as requested */}
     <div>
      <h3 className="text-2xl font-extrabold font-heading tracking-wide mb-4">
       QUICK LINKS
      </h3>
      <ul className="space-y-2">
       <li><Link to="/" className="text-gray-200 hover:text-[var(--color-primary)]">Home</Link></li>
       <li><Link to="/about-us" className="text-gray-200 hover:text-[var(--color-primary)]">About Us</Link></li>
       <li><Link to="/contact-us" className="text-gray-200 hover:text-[var(--color-primary)]">Contact Us</Link></li>
      </ul>
     </div>

     {/* Tenders Section: Corrected links */}
     <div>
      <h3 className="text-2xl font-extrabold font-heading tracking-wide mb-4">
       TENDERS
      </h3>
      <ul className="space-y-2">
       <li><Link to="/tenders" className="text-gray-200 hover:text-[var(--color-primary)]">All Tenders</Link></li> 
      </ul>
     </div>

     {/* Contact Section */}
     <div>
      <h3 className="text-2xl font-extrabold font-heading tracking-wide mb-4">
       CONTACT US
      </h3>
      <address className="not-italic text-base space-y-1 text-gray-200">
       <p>{footerData.companyName}</p>
       <p>{footerData.address}</p>
       <p>
        Phone:{" "}
        <a href={`tel:${footerData.phone}`} className="hover:text-[var(--color-primary)]">
         {footerData.phone}
        </a>
       </p>
       <p>
        Email:{" "}
        <a href={`mailto:${footerData.email}`} className="hover:text-[var(--color-primary)]">
         {footerData.email}
        </a>
       </p>
      </address>
     </div>
    </div>

    {/* Separator */}
    <hr className="border-gray-700 mb-6" />

    {/* Bottom Section: Year is now dynamic */}
    <div className="flex flex-col md:flex-row justify-between items-center text-xs md:text-sm gap-2 md:gap-0">
     <p className="text-gray-400">
      &copy; {new Date().getFullYear()} {footerData.companyName}. All rights reserved.
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

    {/* Back to Top */}
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