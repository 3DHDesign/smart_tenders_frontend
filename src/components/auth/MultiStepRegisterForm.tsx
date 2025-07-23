// src/components/auth/MultiStepRegisterForm.tsx
import React, { useState } from "react";
import AccountStep from "./steps/AccountStep";
import ContactDetailsStep from "./steps/ContactDetailsStep";
import TenderPreferencesStep from "./steps/TenderPreferencesStep";
import PackageSelectionStep from "./steps/PackageSelectionStep";
import Button from "../shared/Button";
import { authService } from '../../services/authService';

// ... (RegistrationFormData interface - UNCHANGED) ...

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
    setFormData((prev) => ({ ...prev, ...newData }));
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
      case 2:
        if (
          !formData.fullName.trim() ||
          !formData.phone.trim() ||
          !formData.address1.trim() ||
          !formData.country.trim()
        ) {
          setError("Step 2: Please fill in all required contact details.");
          return;
        }
        const hasEmptyDynamicEmail = formData.dynamicEmails.some(email => email.address.trim() === "");
        const hasInvalidDynamicEmail = formData.dynamicEmails.some(email => email.error !== null);

        if (hasEmptyDynamicEmail || hasInvalidDynamicEmail) {
            setError("Step 2: Please ensure all notification email addresses are valid and filled.");
            return;
        }

        if (formData.country === "Sri Lanka" && (!formData.province.trim() || !formData.city.trim())) {
          setError("Step 2: For Sri Lanka, please select your Province and District.");
          return;
        }
        break;
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
      const payloadToSend = {
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
        (payloadToSend as any).address_line_2 = formData.address2;
      }
      if (formData.postalCode) {
        (payloadToSend as any).postal_code = formData.postalCode;
      }

      console.log("Submitting Registration Payload:", payloadToSend);

      const response = await authService.register(payloadToSend as any);
      console.log("Registration successful response object:", response);

      // --- CRITICAL FIX: REMOVED TOKEN SAVING HERE ---
      // Token is now only saved AFTER successful OTP verification.
      // console.log("Response.access_token:", response.access_token);
      // console.log("Response.token:", response.token);
      // if (response.access_token) {
      //   localStorage.setItem('authToken', response.access_token);
      //   console.log("Auth token stored (access_token path):", response.access_token);
      // } else if (response.token) {
      //   localStorage.setItem('authToken', response.token);
      //   console.log("Auth token stored (token path):", response.token);
      // } else {
      //   console.warn("Registration successful, but no token (access_token or token) found in response.");
      // }

      onRegistrationSuccess(formData.email); // Redirect to OTP verification page

    } catch (err: any) {
      console.error("Registration failed:", err);
      setError(err.message || "Registration failed. Please try again.");
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