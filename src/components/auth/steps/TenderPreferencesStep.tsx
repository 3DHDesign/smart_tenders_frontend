 // auth/steps/TenderPreferencesStep.tsx
import React, { useState, useEffect } from "react";
import type { RegistrationFormData } from "../MultiStepRegisterForm";
import { apiService, type Category } from '../../../services/api';
import { FaCheckCircle } from 'react-icons/fa';

interface StepProps {
  formData: RegistrationFormData;
  updateFormData: (newData: Partial<RegistrationFormData>) => void;
}

const TenderPreferencesStep: React.FC<StepProps> = ({
  formData,
  updateFormData,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState<boolean>(true);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoadingCategories(true);
      setCategoriesError(null);
      try {
        const fetchedCategories = await apiService.getCategories();
        // --- NEW DEBUGGING LOG ---
        console.log("API Response - Fetched Categories Data:", fetchedCategories);
        setCategories(fetchedCategories);
      } catch (err: any) {
        setCategoriesError(err.message || "Failed to load tender categories.");
        console.error("API Error - Error fetching categories:", err);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // --- NEW DEBUGGING LOGS FOR RENDERING CONDITIONS ---
  console.log("TenderPreferencesStep - Current State for Rendering:");
  console.log("  isLoadingCategories:", isLoadingCategories);
  console.log("  categoriesError:", categoriesError);
  console.log("  categories.length:", categories.length);
  console.log("  Should categories render? ", !isLoadingCategories && !categoriesError && categories.length > 0);
  // --- END NEW DEBUGGING LOGS ---

  const handleCategoryChange = (categoryId: number) => {
    const currentCategories = formData.selectedCategories || [];
    if (currentCategories.includes(categoryId)) {
      updateFormData({
        selectedCategories: currentCategories.filter(
          (id: number) => id !== categoryId
        ),
      });
    } else {
      updateFormData({ selectedCategories: [...currentCategories, categoryId] });
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

      {isLoadingCategories && (
        <div className="text-center text-gray-600 font-body mb-4">Loading categories...</div>
      )}

      {categoriesError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {categoriesError}</span>
        </div>
      )}

      {!isLoadingCategories && !categoriesError && categories.length === 0 && (
        <div className="text-center text-gray-600 font-body mb-4">No tender categories available.</div>
      )}

      {/* This is the crucial block that should render your categories */}
      {!isLoadingCategories && !categoriesError && categories.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {categories.map((category) => {
            const isSelected = formData.selectedCategories.includes(category.id);
            return (
              <div
                key={category.id}
                className={`
                  flex items-center justify-center p-3 border rounded-lg cursor-pointer text-center
                  transition-all duration-200 ease-in-out select-none
                  ${
                    isSelected
                      ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white shadow-md"
                      : "border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:shadow-sm"
                  }
                `}
                onClick={() => handleCategoryChange(category.id)}
              >
                <span className="font-body text-sm font-medium">
                  {category.name}
                </span>
                {isSelected && (
                  <FaCheckCircle className="ml-2 text-white" size={16} />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TenderPreferencesStep;