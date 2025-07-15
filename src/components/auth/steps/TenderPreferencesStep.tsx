import React from "react";
import type { RegistrationFormData } from "../MultiStepRegisterForm";

// Mock Tender Categories (reusing from TenderListingSection)
const allTenderCategories = [
  "Construction",
  "Computer & IT",
  "Medical & Pharmaceuticals",
  "Manpower & Security Services",
  "Electrical",
  "Electronics",
  "Vehicles, Auto Parts & Services",
  "Printing & Advertising",
  "Transport & Rent A Car Services",
  "Cleaning & Janitorial Services",
  "Consultancy",
  "Education",
];

interface StepProps {
  formData: RegistrationFormData;
  updateFormData: (newData: Partial<RegistrationFormData>) => void;
}

const TenderPreferencesStep: React.FC<StepProps> = ({
  formData,
  updateFormData,
}) => {
  const handleCategoryChange = (category: string) => {
    const currentCategories = formData.selectedCategories || [];
    if (currentCategories.includes(category)) {
      updateFormData({
        selectedCategories: currentCategories.filter(
          (cat: string) => cat !== category
        ),
      });
    } else {
      updateFormData({ selectedCategories: [...currentCategories, category] });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold font-heading text-[var(--color-dark)] mb-6 text-center">
        Select Tender Preferences
      </h2>
      <p className="text-gray-600 font-body mb-6 text-center">
        Choose the tender categories that are relevant to your business.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {allTenderCategories.map((category, index) => (
          <div key={index} className="flex items-center">
            <input
              type="checkbox"
              id={`category-${index}`}
              name="category"
              value={category}
              checked={formData.selectedCategories.includes(category)}
              onChange={() => handleCategoryChange(category)}
              className="h-5 w-5 text-[var(--color-primary)] rounded border-gray-300 focus:ring-[var(--color-primary)]"
            />
            <label
              htmlFor={`category-${index}`}
              className="ml-2 text-gray-700 font-body text-sm cursor-pointer"
            >
              {category}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TenderPreferencesStep;
