// src/pages/AboutUs.tsx
import React from 'react';
import PageBanner from '../components/shared/PageBanner';
import HowItWorksSection from '../components/about/HowItWorksSection';
import MissionSection from '../components/about/MissionSection';
import CallToActionSection from '../components/about/CallToActionSection';
import PricingSection from '../components/home/PricingSection';
import TestimonialsSection from '../components/about/TestimonialsSection';

const AboutUs: React.FC = () => { // Defined as a regular const
  return (
    <div className="bg-white  ">
      <PageBanner
        title="About Us"
        backgroundImage="/images/download.png"
      />
      <MissionSection />
      <HowItWorksSection />
      <CallToActionSection />
      <PricingSection/>
      <TestimonialsSection/>
    </div>
  );
};

export default AboutUs; // EXPORTED AS DEFAULT