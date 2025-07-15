import React from 'react';
import {
  FaGraduationCap, FaUtensils, FaHeartbeat, FaBullhorn, // Re-using existing icons
  FaTshirt, // Example for Fitness Trainer
  FaCogs, // Example for Other Services (reused)
  FaHeadset, // Example for HR (reused)
  FaLayerGroup // Example for Designer (reused)
} from 'react-icons/fa';

// Data for the categories (adjust icons and counts as needed)
const browseCategoriesData = [
  { icon: <FaLayerGroup size={36} />, title: 'Designer', openings: 0 },
  { icon: <FaGraduationCap size={36} />, title: 'Education', openings: 0 },
  { icon: <FaHeartbeat size={36} />, title: 'Health and Care', openings: 1 },
  { icon: <FaBullhorn size={36} />, title: 'Marketing', openings: 1 },
  { icon: <FaTshirt size={36} />, title: 'Fitness Trainer', openings: 0 },
  { icon: <FaCogs size={36} />, title: 'Other Services', openings: 1 },
  { icon: <FaHeadset size={36} />, title: 'HR', openings: 0 },
  { icon: <FaUtensils size={36} />, title: 'Food Service', openings: 0 },
];

const BrowseCategories: React.FC = () => {
  return (
    // Apply wide-container for consistent padding and max-width.
    <section className="wide-container bg-white py-12 md:py-16 lg:py-20">
      <div className="mx-auto text-center px-4">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold font-heading text-[var(--color-dark)] mb-4"> {/* Using var() for text color */}
          Browse Categories
        </h2>
        {/* Section Description */}
        <p className="text-gray-600 font-body max-w-2xl mx-auto mb-10">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
        </p>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {browseCategoriesData.map((category, index) => (
            <div
              key={index}
              className="flex items-center p-4 bg-white rounded-lg shadow-md border border-gray-100
                         hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-in-out"
            >
              {/* Icon Container */}
              <div
                className="flex-shrink-0 flex items-center justify-center
                           rounded-md p-3 text-white mr-4"
                style={{ backgroundColor: '#0798F2' }} // KEY FIX: Used raw hex code for accent-blue-main
              >
                {category.icon}
              </div>
              {/* Text Content */}
              <div className="text-left">
                <h3 className="text-lg font-semibold font-heading text-[var(--color-dark)]"> {/* Using var() for text color */}
                  {category.title}
                </h3>
                <p className="text-sm font-body text-gray-500">
                  {category.openings} Opening{category.openings !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrowseCategories;