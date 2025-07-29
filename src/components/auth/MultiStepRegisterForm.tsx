// src/components/auth/MultiStepRegisterForm.tsx
import React, { useState } from "react";
import AccountStep from "./steps/AccountStep";
import ContactDetailsStep from "./steps/ContactDetailsStep";
import TenderPreferencesStep from "./steps/TenderPreferencesStep";
import PackageSelectionStep from "./steps/PackageSelectionStep";
import Button from "../shared/Button";
// --- CRITICAL FIX: Explicitly import RegisterRequest as a type ---
import { authService, type RegisterRequest } from '../../services/authService';
import axios from 'axios'; // Import axios for type guarding in catch blocks

// This interface defines the shape of the form data collected across all steps.
// This is already correctly defined here and exported.
export interface RegistrationFormData {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  phone: string;
  address1: string;
  address2: string;
  city: string;
  province: string;
  country: string;
  postalCode: string;
  dynamicEmails: { id: number; address: string; editable: boolean; error: string | null }[];
  selectedCategories: number[];
  selectedPackage: string;
  paymentMethod: string;
}

interface MultiStepRegisterFormProps {
  onRegistrationSuccess: (email: string) => void;
}

const MultiStepRegisterForm: React.FC<MultiStepRegisterFormProps> = ({ onRegistrationSuccess }) => {
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
      { id: 1, address: "", editable: true, error: null },
      { id: 2, address: "", editable: true, error: null },
    ],
    selectedCategories: [],
    selectedPackage: "",
    paymentMethod: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalSteps = 4;
  const FREE_PACKAGE_ID = "1";

  const updateFormData = (newData: Partial<RegistrationFormData>) => {
    setFormData((prev: RegistrationFormData) => ({ ...prev, ...newData }));
  };

  const handleNext = () => {
    setError(null);
    switch (currentStep) {
      case 1:
        if (
          !formData.email.trim() ||
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) ||
          !formData.password.trim() ||
          formData.password.length < 8 ||
          formData.password !== formData.confirmPassword
        ) {
          setError("Step 1: Please ensure all fields are valid and passwords match and meet strength requirements.");
          return;
        }
        break;
      case 2: {
        const hasEmptyDynamicEmail = formData.dynamicEmails.some(email => email.address.trim() === "");
        const hasInvalidDynamicEmail = formData.dynamicEmails.some(email => email.error !== null);

        if (
          !formData.fullName.trim() ||
          !formData.phone.trim() ||
          !formData.address1.trim() ||
          !formData.country.trim()
        ) {
          setError("Step 2: Please fill in all required contact details.");
          return;
        }

        if (hasEmptyDynamicEmail || hasInvalidDynamicEmail) {
            setError("Step 2: Please ensure all notification email addresses are valid and filled.");
            return;
        }

        if (formData.country === "Sri Lanka" && (!formData.province.trim() || !formData.city.trim())) {
          setError("Step 2: For Sri Lanka, please select your Province and District.");
          return;
        }
        break;
      }
      case 3:
        if (formData.selectedCategories.length === 0) {
          setError("Step 3: Please select at least one tender category.");
          return;
        }
        break;
      case 4:
        if (!formData.selectedPackage) {
          setError("Step 4: Please select a package.");
          return;
        }
        if (formData.selectedPackage !== FREE_PACKAGE_ID && !formData.paymentMethod) {
          setError("Step 4: Please select a payment method for your chosen package.");
          return;
        }
        break;
      default:
        break;
    }

    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setError(null);
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setError(null);
    if (currentStep === totalSteps) {
      if (!formData.selectedPackage) {
        setError("Step 4: Please select a package before submitting.");
        return;
      }
      if (formData.selectedPackage !== FREE_PACKAGE_ID && !formData.paymentMethod) {
        setError("Step 4: Please select a payment method before submitting.");
        return;
      }
    }

    setIsLoading(true);
    try {
      // --- CRITICAL FIX: Use the imported RegisterRequest type directly ---
      const payloadToSend: RegisterRequest = {
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
        name: formData.fullName,
        phone: formData.phone,
        address: formData.address1,
        district: formData.city,
        province: formData.province,
        country: formData.country,
        categories: formData.selectedCategories,
        package_id: formData.selectedPackage,
        payment_method: formData.paymentMethod,
        emails: formData.dynamicEmails.map(e => e.address),
      };

      if (formData.address2) {
        payloadToSend.address_line_2 = formData.address2;
      }
      if (formData.postalCode) {
        payloadToSend.postal_code = formData.postalCode;
      }

      console.log("Submitting Registration Payload:", payloadToSend);

      const response = await authService.register(payloadToSend);
      console.log("Registration successful response object:", response);

      onRegistrationSuccess(formData.email);

    } catch (err: unknown) {
      console.error("Registration failed:", err);
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || err.message || "Registration failed. Please try again.");
      } else if (err instanceof Error) {
        setError(err.message || "Registration failed. Please try again.");
      } else {
        setError("An unexpected error occurred during registration.");
      }
    } finally {
      setIsLoading(false);
    }
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

      {/* General Error Display (for errors not tied to a specific field) */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

      {/* Render the current step's form content */}
      {renderStep()}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
        {currentStep > 1 && (
          <Button
            label="Back"
            onClick={handleBack}
            className="bg-slate-600 hover:bg-slate-700 text-white px-6 py-2 rounded-lg shadow-md transition-colors duration-200"
            disabled={isLoading}
          />
        )}
        {currentStep < totalSteps && (
          <Button
            label={isLoading ? "Processing..." : "Next"}
            onClick={handleNext}
            className="bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/80 text-white px-6 py-2 rounded-lg ml-auto shadow-md transition-colors duration-200"
            disabled={isLoading}
          />
        )}
        {currentStep === totalSteps && (
          <Button
            label={isLoading ? "Submitting..." : "Submit Registration"}
            onClick={handleSubmit}
            className="bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/80 text-white px-6 py-2 rounded-lg ml-auto shadow-md transition-colors duration-200"
            disabled={isLoading}
          />
        )}
      </div>
    </div>
  );
};

export default MultiStepRegisterForm;