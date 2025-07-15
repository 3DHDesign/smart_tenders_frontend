import React from 'react';
import Button from '../shared/Button'; // Assuming Button component is in src/components/shared

const DescriptionSection: React.FC = () => {
  return (
    <section
      className="relative bg-cover bg-center py-16 md:py-24"
      style={{
        backgroundImage: `url('/images/desc.jpg')`, // Using your specified image name
      }}
    >
      {/* KEY FIX: Overlay with a stronger gradient for better text readability and modern look */}
      <div className="absolute inset-0" style={{
        backgroundImage: `linear-gradient(to right, 
                            rgba(0, 0, 0, 0.7) 0%,   /* Darker on left */
                            rgba(0, 0, 0, 0.4) 50%,  /* Fades to mid-opacity */
                            rgba(0, 0, 0, 0.2) 100% /* Lighter on right */
                           )`
      }}></div>

      {/* Content container: Align content to the right, and text within it left-aligned */}
      <div className="relative z-10 container mx-auto flex flex-col items-center md:items-end px-4">
        {/* Text content container: Width and text alignment. Explicitly setting text-white. */}
        <div className="md:w-1/2 text-center md:text-left text-white"> {/* Setting text-white here */}
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 leading-tight">
            Seamlessly Discover & Manage Tenders
          </h2>
          <p className="text-lg font-body mb-6">
            Our platform connects you with the best tender opportunities and helps you manage your bidding process with ease.
          </p>
          {/* Using your shared Button component with var() for primary color */}
          <Button
            label="Explore Tenders"
            className="bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/80 shadow-lg px-8 py-3 text-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default DescriptionSection;