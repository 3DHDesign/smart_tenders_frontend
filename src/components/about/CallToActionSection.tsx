import React from 'react';
import Button from '../shared/Button'; // Assuming your Button component is in src/components/shared

const CallToActionSection: React.FC = () => {
  return (
    <section className="wide-container bg-white py-12 md:py-16 lg:py-20">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Column: Text Content */}
        <div className="text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-[var(--color-dark)] mb-4">
            Looking for Tender Resources?
          </h2>
          <p className="text-gray-600 font-body leading-relaxed mb-6">
            SmartTenders provides comprehensive resources to help you navigate the complex world of public and private tenders. From detailed guides to expert advice, we equip you with the knowledge needed to succeed.
          </p>
          <p className="text-gray-600 font-body leading-relaxed mb-8">
            Whether you're a new bidder or an experienced supplier, our platform offers the tools and insights to streamline your process, identify key opportunities, and enhance your bidding strategy.
          </p>
          {/* Using your shared Button component */}
          <Button label="Explore Resources" className="bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/80 shadow-lg px-8 py-3 text-lg" />
        </div>

        {/* Right Column: Image */}
        <div className="flex justify-center md:justify-end">
          <img
            src="/images/callto.png" // Ensure this image path is correct in your public/images folder
            alt="Looking for Resources"
            className="max-w-full h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;