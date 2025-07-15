import React from "react";
import { FaCheckCircle, FaCreditCard, FaMoneyBillWave } from "react-icons/fa"; // Icons for features and payment

// Pricing plans data (reusing from PricingSection)
const pricingPlans = [
  {
    id: "free",
    name: "Basic Tender Insight",
    price: "Free",
    features: [
      {
        text: "Access to All Tender Listings (limited details)",
        included: true,
      },
      { text: "Daily Tender Email Alerts (2 free emails)", included: true },
      { text: "Filter & Search Basic Tenders", included: true },
      { text: "Basic Analytics & Trends", included: false },
      { text: "Full Tender Document Access", included: false },
    ],
  },
  {
    id: "premium",
    name: "Premium Bidder",
    price: "Rs. 15,000/-",
    features: [
      { text: "Access to All Tender Listings (full details)", included: true },
      {
        text: "Customized Tender Email Alerts (up to 5 emails)",
        included: true,
      },
      { text: "Advanced Filter & Search Tools", included: true },
      { text: "In-depth Tender Analysis", included: true },
      { text: "Full Tender Document Access", included: true },
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise Solution",
    price: "Rs. 30,000/-",
    features: [
      { text: "Unlimited Access to All Tenders", included: true },
      { text: "Unlimited Customized Tender Email Alerts", included: true },
      { text: "Advanced Filter & Search Tools", included: true },
      { text: "Comprehensive Tender Analysis & Reports", included: true },
      { text: "Full Tender Document Access", included: true },
    ],
  },
];

interface StepProps {
  formData: any;
  updateFormData: (newData: any) => void;
}

const PackageSelectionStep: React.FC<StepProps> = ({
  formData,
  updateFormData,
}) => {
  const paymentMethods = [
    { id: "card", name: "Credit/Debit Card", icon: FaCreditCard },
    { id: "bank", name: "Bank Transfer", icon: FaMoneyBillWave },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold font-heading text-[var(--color-dark)] mb-6 text-center">
        Select Your Package
      </h2>
      <div className="space-y-6">
        {/* Package Selection - KEY FIX: Changed grid-cols-1 md:grid-cols-3 to flex flex-col md:grid md:grid-cols-3 */}
        <div className="flex flex-col gap-4">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`
                p-4 rounded-lg border-2 cursor-pointer transition-all duration-200
                ${
                  formData.selectedPackage === plan.id
                    ? "border-[var(--color-primary)] shadow-md bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }
              `}
              onClick={() => updateFormData({ selectedPackage: plan.id })}
            >
              <h3 className="text-lg font-bold font-heading text-[var(--color-dark)] mb-1">
                {plan.name}
              </h3>
              <p className="text-xl font-bold text-[var(--color-primary)] mb-3">
                {plan.price}
              </p>
              <ul className="space-y-1 text-sm text-gray-700 font-body">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <FaCheckCircle
                      className="text-green-500 mr-2 flex-shrink-0"
                      size={14}
                    />
                    <span>{feature.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Payment Method Selection */}
        {formData.selectedPackage && formData.selectedPackage !== "free" && (
          <div className="pt-6 border-t border-gray-100 mt-6 space-y-4">
            <h3 className="text-lg font-bold font-heading text-[var(--color-dark)] mb-3">
              Payment Method
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className={`
                    flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200
                    ${
                      formData.paymentMethod === method.id
                        ? "border-[var(--color-primary)] shadow-md bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }
                  `}
                  onClick={() => updateFormData({ paymentMethod: method.id })}
                >
                  <input
                    type="radio"
                    id={method.id}
                    name="paymentMethod"
                    value={method.id}
                    checked={formData.paymentMethod === method.id}
                    onChange={() =>
                      updateFormData({ paymentMethod: method.id })
                    }
                    className="h-5 w-5 text-[var(--color-primary)] focus:ring-[var(--color-primary)] mr-3"
                  />
                  <method.icon
                    className="text-[var(--color-dark)] mr-2"
                    size={20}
                  />
                  <label
                    htmlFor={method.id}
                    className="text-gray-700 font-body text-base cursor-pointer"
                  >
                    {method.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PackageSelectionStep;
