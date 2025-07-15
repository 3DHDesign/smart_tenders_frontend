import React from 'react';
import Button from '../shared/Button'; // Assuming Button component exists

const pricingPlans = [
  {
    name: 'Basic Tender Insight',
    price: 'Free',
    buttonLabel: 'Start Free',
    features: [
      { text: 'Access to All Tender Listings (limited details)', included: true },
      { text: 'Daily Tender Email Alerts (2 free emails for view-only tenders)', included: true },
      { text: 'Filter & Search Basic Tenders', included: true },
      { text: 'Basic Analytics & Trends', included: false },
      { text: 'Full Tender Document Access', included: false },
      { text: 'Dedicated Account Manager', included: false },
      { text: 'Direct Bid Submission', included: false },
      { text: 'Priority Support', included: false },
    ],
    highlight: false,
  },
  {
    name: 'Premium Bidder',
    price: 'Rs. 15,000/-',
    buttonLabel: 'Choose Premium',
    features: [
      { text: 'Access to All Tender Listings (full details)', included: true },
      { text: 'Customized Tender Email Alerts (up to 5 emails)', included: true },
      { text: 'Advanced Filter & Search Tools', included: true },
      { text: 'In-depth Tender Analysis', included: true },
      { text: 'Full Tender Document Access', included: true },
      { text: 'Dedicated Account Manager (limited)', included: false },
      { text: 'Direct Bid Submission (limited)', included: false },
      { text: 'Standard Support', included: true },
    ],
    highlight: true, // Recommended Plan
  },
  {
    name: 'Enterprise Solution',
    price: 'Rs. 30,000/-',
    buttonLabel: 'Contact Sales',
    features: [
      { text: 'Unlimited Access to All Tenders', included: true },
      { text: 'Unlimited Customized Tender Email Alerts', included: true },
      { text: 'Advanced Filter & Search Tools', included: true },
      { text: 'Comprehensive Tender Analysis & Reports', included: true },
      { text: 'Full Tender Document Access', included: true },
      { text: 'Dedicated Account Manager', included: true },
      { text: 'Direct Bid Submission & Management', included: true },
      { text: 'Priority 24/7 Support', included: true },
    ],
    highlight: false,
  },
];

const PricingSection: React.FC = () => {
  return (
    <section className="bg-[var(--color-light)] py-16 wide-container">
      <div className="mx-auto px-4 text-center">
        {/* Section Title */}
        <h2 className="text-4xl md:text-5xl font-bold font-heading text-[var(--color-dark)] mb-4">
          Our Flexible Tender Plans
        </h2>
        <p className="text-gray-500 font-body max-w-2xl mx-auto mb-12">
          Unlock more opportunities with SmartTenders. Pick the plan that fits your tender discovery and bidding needs.
        </p>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative flex flex-col rounded-2xl border shadow-lg transition-all duration-300
                ${plan.highlight
                  ? 'border-[var(--color-primary)] scale-105 shadow-xl bg-white'
                  : 'border-gray-200 bg-white hover:shadow-lg hover:-translate-y-1'}
              `}
            >
              {/* Highlight Badge */}
              {plan.highlight && (
                <span className="absolute -top-3 right-3 bg-[var(--color-primary)] text-white text-xs px-3 py-1 rounded-full font-medium shadow">
                  Recommended
                </span>
              )}

              {/* Plan Header */}
              <div className={`p-6 rounded-t-2xl text-center`}>
                <h3 className="text-2xl font-bold font-heading text-[var(--color-dark)] mb-2">{plan.name}</h3>
                <p className="text-3xl md:text-4xl font-bold text-[var(--color-primary)]">{plan.price}</p>
              </div>

              {/* Plan Features */}
              <ul className="flex-grow p-6 space-y-3 text-left">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    {feature.included ? (
                      <svg
                        className="w-5 h-5 text-green-500 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5 text-red-500 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                    <span className={`text-gray-600 font-body ${!feature.included ? 'line-through opacity-60' : ''}`}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Plan Button */}
              <div className="p-6 border-t">
                <Button
                  label={plan.buttonLabel}
                  className={`w-full py-3 text-lg font-semibold rounded-lg
                    ${plan.highlight
                      ? 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-dark)]'
                      : 'bg-[var(--color-dark)] text-white hover:bg-[var(--color-primary)]'}
                  `}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
