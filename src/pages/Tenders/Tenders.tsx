import React, { useEffect } from "react";
import PageBanner from "../../components/shared/PageBanner";
import TenderFilters from "../../components/tenders/TenderFilters";
import { getTenders } from "../../services/tenderService";
import TenderPageList from "../../components/tenders/TendersPageList";

const Tenders: React.FC = () => {
  useEffect(() => {
    getTenders(1).catch(console.error); // <- should print JSON in console
  }, []);

  return (
    <div className=" ">
      {" "}
      {/* Removed pt-20 from here, as PageBanner will handle top spacing */}
      <title>All Tenders & Procurement Opportunities | SmartTenders.lk</title>
      <meta
        name="description"
        content="Browse and search the latest government and private tenders in Sri Lanka. Get real-time tender notices, bid invitations, and procurement opportunities for all industries."
      />
      <meta
        name="keywords"
        content="Sri Lanka tenders, government tenders, private tenders, tender notices, tender search, procurement opportunities, bid invitations, tender listing, tenders by sector"
      />
      {/* Open Graph tags for social media sharing */}
      <meta
        property="og:title"
        content="All Tenders & Procurement Opportunities"
      />
      <meta
        property="og:description"
        content="Browse and search the latest government and private tenders in Sri Lanka. Get real-time tender notices, bid invitations, and procurement opportunities."
      />
      <meta property="og:url" content="https://smarttenders.lk/tenders" />
      <meta property="og:type" content="website" />
      <meta
        property="og:image"
        content="https://smarttenders.lk/images/tenders-og-image.jpg"
      />
      {/* Page Banner for Tenders page */}
      <PageBanner
        title="All Tenders" // Title for the Tenders page banner
        backgroundImage="/images/download.png" // You can use the same image or a different one
      />
      <TenderFilters /> {/* Render the new filter section first */}
      <TenderPageList /> {/* Then render the main listing section */}
    </div>
  );
};

export default Tenders;
