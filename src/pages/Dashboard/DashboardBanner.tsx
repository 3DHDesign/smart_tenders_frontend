import React from 'react';

interface DashboardBannerProps {
  title: string;
  subtitle?: string; // Optional subtitle
}

const DashboardBanner: React.FC<DashboardBannerProps> = ({ title, subtitle }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6"> {/* Added padding and margin-bottom */}
      <h1 className="text-3xl font-bold font-heading text-[var(--color-dark)] mb-2">
        {title}
      </h1>
      {subtitle && (
        <p className="text-gray-600 font-body text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default DashboardBanner;