import React from 'react';
import Button from '../shared/Button'; // Assuming your Button component is in src/components/shared

const TenderFilters: React.FC = () => {
  return (
    <div className="bg-white wide-container mx-auto  shadow-lg p-6 mb-8 border border-gray-100">
  <div className="container mx-auto">
  <h3 className="text-xl font-bold font-heading text-[var(--color-dark)] mb-6 text-left">
        Advanced Tender Search
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {/* Tender Code */}
        <div>
          <input
            type="text"
            placeholder="Tender Code"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] font-body"
          />
        </div>
        {/* Tender Title/Keyword */}
        <div>
          <input
            type="text"
            placeholder="Tender Title/Keyword"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] font-body"
          />
        </div>
        {/* Select Paper (Dropdown) */}
        <div>
          <select
            className="w-full p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] font-body appearance-none"
          >
            <option value="">select paper</option>
            <option value="paper1">Paper 1</option>
            <option value="paper2">Paper 2</option>
            {/* Add more options as needed */}
          </select>
        </div>
        {/* Published Date */}
        <div>
          <input
            type="date" // Use type="date" for date picker
            placeholder="Published Date"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] font-body text-gray-500"
          />
        </div>
        {/* Published Month */}
        <div>
          <input
            type="text"
            placeholder="Published Month"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] font-body"
          />
        </div>
        {/* Published Year */}
        <div>
          <input
            type="text"
            placeholder="Published Year"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] font-body"
          />
        </div>
      </div>
      <div className="flex justify-between items-center">
        {/* Filter Button - Using orange as per image for this specific filter button */}
        <Button label="Filter" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg font-semibold" />
        {/* Filter with categories text */}
        <p className="text-gray-600 font-body text-sm">Filter with categories</p>
      </div>
  </div>
    </div>
  );
};

export default TenderFilters;