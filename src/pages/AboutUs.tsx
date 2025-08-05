// src/pages/AboutUs.tsx
import React from "react";
import PageBanner from "../components/shared/PageBanner";
import HowItWorksSection from "../components/about/HowItWorksSection";
import MissionSection from "../components/about/MissionSection";
// import CallToActionSection from '../components/about/CallToActionSection';
import PricingSection from "../components/home/PricingSection";
import TestimonialsSection from "../components/about/TestimonialsSection";

const AboutUs: React.FC = () => {
  // Defined as a regular const
  return (
    <>
      <title>About Us | Our Mission & Story - SmartTenders.lk</title>
      <meta
        name="description"
        content="Learn about the mission, vision, and team behind SmartTenders.lk. We are dedicated to centralizing government and private tender notices in Sri Lanka for your success."
      />
      <meta
        name="keywords"
        content="SmartTenders.lk about us, our mission, company story, Sri Lanka tender platform, team, contact"
      />
      {/* Open Graph Tags for Social Media */}
      <meta property="og:title" content="About SmartTenders.lk" />
      <meta
        property="og:description"
        content="Learn about our mission to revolutionize tender searching in Sri Lanka. Find out what drives us to provide a better platform."
      />
      <meta property="og:url" content="https://smarttenders.lk/about-us" />
      <meta property="og:type" content="website" />
      <meta
        property="og:image"
        content="https://smarttenders.lk/images/about-us-og.jpg"
      />{" "}
      {/* Use a relevant image URL */}
      <link rel="canonical" href="https://smarttenders.lk/about-us" />
      <div className="bg-white  ">
        <PageBanner title="About Us" backgroundImage="/images/download.png" />
        <MissionSection />
        <HowItWorksSection />
        {/* <CallToActionSection /> */}
        <PricingSection />
        <TestimonialsSection />
      </div>
    </>
  );
};

export default AboutUs; // EXPORTED AS DEFAULT
