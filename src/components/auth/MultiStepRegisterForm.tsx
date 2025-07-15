import React, { useState } from "react";
import AccountStep from "./steps/AccountStep";
import ContactDetailsStep from "./steps/ContactDetailsStep"; // Step 2
import TenderPreferencesStep from "./steps/TenderPreferencesStep";
import PackageSelectionStep from "./steps/PackageSelectionStep";
import Button from "../shared/Button";

// Define a type for the form data that will be collected across all steps
export interface RegistrationFormData {
  email: string;
  password: string;
  confirmPassword: string;
  // Contact & Email Settings
  fullName: string;
  phone: string;
  address1: string;
  address2: string;
  city: string;
  province: string;
  country: string;
  postalCode: string;
  dynamicEmails: { id: number; address: string; editable: boolean }[];
  // Tender Preferences
  selectedCategories: string[];
  // Package Selection & Payment
  selectedPackage: string;
  paymentMethod: string;
}

const MultiStepRegisterForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<RegistrationFormData>({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    province: "",
    country: "",
    postalCode: "",
    dynamicEmails: [
      // Initialize with 2 free email slots
      { id: 1, address: "", editable: true },
      { id: 2, address: "", editable: true },
    ],
    selectedCategories: [],
    selectedPackage: "",
    paymentMethod: "",
  });

  const totalSteps = 4;

  const updateFormData = (newData: Partial<RegistrationFormData>) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const handleNext = () => {
    // Basic validation for the current step
    switch (currentStep) {
      case 1: // AccountStep validation
        if (
          !formData.email ||
          !formData.password ||
          formData.password !== formData.confirmPassword
        ) {
          alert(
            "Step 1: Please fill in all fields and ensure passwords match."
          );
          return;
        }
        break;
      case 2: // ContactDetailsStep validation
        // KEY FIX: Refined validation for Step 2
        // Check if fullName, phone, address1 are filled
        // Check if ALL *initial* dynamic emails are filled (the two free ones)
        // If additional emails were added, they should also be validated.
        const allEmailsFilled = formData.dynamicEmails.every(
          (email) => email.address.trim() !== ""
        );

        if (
          !formData.fullName.trim() ||
          !formData.phone.trim() ||
          !formData.address1.trim() ||
          !allEmailsFilled
        ) {
          alert(
            "Step 2: Please fill in required contact details and all email addresses."
          );
          return;
        }
        // Basic email format validation for dynamic emails
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (
          formData.dynamicEmails.some(
            (email) =>
              email.address.trim() !== "" && !emailRegex.test(email.address)
          )
        ) {
          alert("Step 2: Please enter valid email addresses.");
          return;
        }
        break;
      case 3: // TenderPreferencesStep validation
        if (formData.selectedCategories.length === 0) {
          alert("Step 3: Please select at least one tender category.");
          return;
        }
        break;
      case 4: // PackageSelectionStep validation (optional, can be done on final submit)
        if (!formData.selectedPackage || !formData.paymentMethod) {
          alert("Step 4: Please select a package and payment method.");
          return;
        }
        break;
    }

    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    // Final validation for the last step
    if (currentStep === totalSteps) {
      if (!formData.selectedPackage || !formData.paymentMethod) {
        alert(
          "Step 4: Please select a package and payment method before submitting."
        );
        return;
      }
    }
    console.log("Final Registration Data:", formData);
    alert("Registration Complete! (Check console for data)");
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <AccountStep formData={formData} updateFormData={updateFormData} />
        );
      case 2:
        return (
          <ContactDetailsStep
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 3:
        return (
          <TenderPreferencesStep
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 4:
        return (
          <PackageSelectionStep
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      default:
        return (
          <AccountStep formData={formData} updateFormData={updateFormData} />
        );
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-8 md:p-10 lg:p-12 border border-gray-100 max-w-md mx-auto my-8">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-gray-600">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-sm font-semibold text-[var(--color-primary)]">
            {currentStep === 1 && "Account Details"}
            {currentStep === 2 && "Contact & Emails"}
            {currentStep === 3 && "Tender Preferences"}
            {currentStep === 4 && "Package & Payment"}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-[var(--color-primary)] h-2 rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Render Current Step */}
      {renderStep()}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
        {currentStep > 1 && (
          <Button
            label="Back"
            onClick={handleBack}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg"
          />
        )}
        {currentStep < totalSteps && (
          <Button
            label="Next"
            onClick={handleNext}
            className="bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/80 text-white px-6 py-2 rounded-lg ml-auto"
          />
        )}
        {currentStep === totalSteps && (
          <Button
            label="Submit Registration"
            onClick={handleSubmit}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg ml-auto"
          />
        )}
      </div>
    </div>
  );
};

export default MultiStepRegisterForm;
