// src/pages/Home.tsx
import React from 'react';
import Hero from '../components/home/Hero';
import TenderListingSection from '../components/home/TenderListingSection';
import DescriptionSection from '../components/home/DescriptionSection';
import BrowseCategories from '../components/home/BrowseCategories';
import PricingSection from '../components/home/PricingSection';

const Home: React.FC = () => { // Defined as a regular const
  return (
    <>
      <Hero />
      <TenderListingSection />
      <DescriptionSection />
      <BrowseCategories />
      <PricingSection />
    </>
  );
};

export default Home; // EXPORTED AS DEFAULT