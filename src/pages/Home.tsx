// src/pages/Home.tsx
import React from "react";
import TenderListingSection from "../components/home/TenderListingSection";
import DescriptionSection from "../components/home/DescriptionSection";
import BrowseCategories from "../components/home/BrowseCategories";
import PricingSection from "../components/home/PricingSection";
import Hero from "../components/home/Hero";
// import FaqSection from "../components/home/FaqSection";

const Home: React.FC = () => {
  // Defined as a regular const
  return (
    <>
      <title>
        Tenders Sri Lanka | Government & Private Tender Notices -
        SmartTenders.lk
      </title>
      <meta
        name="description"
        content="Search and find all government and private tenders in Sri Lanka in one place. Get real-time tender notices, procurement opportunities, and daily alerts. Your trusted source for all bidding information."
      />
      <meta
        name="keywords"
        content="Sri Lanka tenders, government tenders, private tenders, eTenders LK, tender notices, tender alerts, procurement opportunities, bidding, tender documents, tender results, online tenders, tender search Sri Lanka, public procurement"
      />
       <link rel="canonical" href="https://smarttenders.lk/" />
      <meta
        property="og:title"
        content="Tenders Sri Lanka | Government & Private Tender Notices"
      />
      <meta
        property="og:description"
        content="Search and find all government and private tenders in Sri Lanka in one place. Get real-time tender notices and procurement opportunities with SmartTenders.lk."
      />
      <meta property="og:url" content="https://smarttenders.lk/" />
      <meta property="og:type" content="website" />
      <meta
        property="og:image"
        content="https://smarttenders.lk/og-image.jpg"
      />{" "}
      {/* Replace with a high-quality, relevant image URL */}
      <meta
        property="og:image:alt"
        content="SmartTenders.lk logo with a collage of tender documents and projects"
      />
      <meta property="og:locale" content="en_LK" />
      <Hero />
      <TenderListingSection />
      <DescriptionSection />
      <BrowseCategories />
      <PricingSection />
      {/* <FaqSection /> */}
    </>
  );
};

export default Home; // EXPORTED AS DEFAULT
