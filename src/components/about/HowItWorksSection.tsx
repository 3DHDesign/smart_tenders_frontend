import React from 'react';

// Data for the "How It Works" steps
const howItWorksSteps = [
  {
    image: '/images/h-i-w-1.png', // Ensure this path is correct in your public/images folder
    title: 'Register Account',
    description: 'Create your SmartTenders account to begin your journey.',
    stepNumber: '01',
  },
  {
    image: '/images/h-i-w-2.png', // Ensure this path is correct
    title: 'Complete Profile',
    description: 'Update your company profile to match with relevant tenders.',
    stepNumber: '02',
  },
  {
    image: '/images/h-i-w-3.png', // Ensure this path is correct
    title: 'Search Tenders',
    description: 'Discover thousands of active tenders using advanced filters.',
    stepNumber: '03',
  },
  {
    image: '/images/h-i-w-4.png', // Ensure this path is correct
    title: 'Apply For Tender',
    description: 'Submit your bids securely and track your application status.',
    stepNumber: '04',
  },
];

const HowItWorksSection: React.FC = () => {
  return (
    <section className="wide-container bg-gray-50 py-12 md:py-16 lg:py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold font-heading text-[var(--color-dark)] mb-4">
          How It Works
        </h2>
        <p className="text-gray-600 font-body max-w-2xl mx-auto mb-12">
          Discover the simple steps to connect with tender opportunities and streamline your bidding process on SmartTenders.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {howItWorksSteps.map((step, index) => (
            <div key={index} className="relative p-6 bg-white rounded-xl shadow-md border border-gray-100 flex flex-col items-center text-center transition-transform hover:-translate-y-2 duration-300">
              {/* Step Number Overlay - KEY FIX: Changed color to gray-400 for better visibility */}
              <span className="absolute top-2 right-4 text-gray-400 font-extrabold text-5xl opacity-70 font-heading">
                {step.stepNumber}
              </span>

              {/* Image */}
              <div className="mb-4 w-24 h-24 flex items-center justify-center relative z-10">
                <img src={step.image} alt={step.title} className="max-w-full max-h-full object-contain" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold font-heading text-[var(--color-dark)] mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-gray-600 font-body">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;