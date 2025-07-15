import React from 'react';

interface PageBannerProps {
  title: string; // The main title to display on the banner
  backgroundImage: string; // Path to the background image (e.g., '/images/download.jpg')
}

const PageBanner: React.FC<PageBannerProps> = ({ title, backgroundImage }) => {
  return (
    <section
      className="relative bg-cover bg-center min-h-[40vh] flex items-center justify-center text-white text-center"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.4)), url('${backgroundImage}')`,
      }}
    >
      {/* No separate overlay div needed, as gradient is part of backgroundImage */}
      <div className="relative z-10 container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold font-heading">
          {title}
        </h1>
      </div>
    </section>
  );
};

export default PageBanner;