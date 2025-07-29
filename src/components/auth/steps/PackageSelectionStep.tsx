// auth/steps/PackageSelectionStep.tsx
import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaMoneyBillWave } from "react-icons/fa";
import type { RegistrationFormData } from "../MultiStepRegisterForm";
import { packageService, type Package } from "../../../services/packageService";

interface StepProps {
  formData: RegistrationFormData;
  updateFormData: (newData: Partial<RegistrationFormData>) => void;
}

const PackageSelectionStep: React.FC<StepProps> = ({
  formData,
  updateFormData,
}) => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [isLoadingPackages, setIsLoadingPackages] = useState<boolean>(true);
  const [packagesError, setPackagesError] = useState<string | null>(null);

  const paymentMethods = [
    // --- CHANGE HERE: Only include Bank Transfer ---
    // { id: "card", name: "Credit/Debit Card", icon: FaCreditCard }, // Removed this line
    { id: "bank", name: "Bank Transfer", icon: FaMoneyBillWave },
  ];

  useEffect(() => {
    const fetchPackages = async () => {
      setIsLoadingPackages(true);
      setPackagesError(null);
      try {
        const fetchedPackages = await packageService.getPackages();
        console.log("API Response - Fetched Packages Data:", fetchedPackages);
        setPackages(fetchedPackages);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setPackagesError(err.message || "Failed to load pricing packages.");
          console.error("Error fetching packages:", err);
        } else {
          setPackagesError("Failed to load pricing packages.");
          console.error("Error fetching packages:", err);
        }
      } finally {
        setIsLoadingPackages(false);
      }
    };

    fetchPackages();
  }, []);

  const [packageSelectionError, setPackageSelectionError] = useState<
    string | null
  >(null);
  const [paymentMethodError, setPaymentMethodError] = useState<string | null>(
    null
  );

  // Define the ID for the "Trial" (Free) package, based on your API response
  // From your Postman screenshot, Trial has id: 1
  const FREE_PACKAGE_ID = "1"; // Ensure this matches the ID of your 'Trial' package from the API

  const handlePackageSelection = (packageId: number | string) => {
    updateFormData({ selectedPackage: String(packageId) });
    setPackageSelectionError(null);

    // --- CHANGE HERE: Check against FREE_PACKAGE_ID ---
    if (String(packageId) !== FREE_PACKAGE_ID && !formData.paymentMethod) {
      setPaymentMethodError("Please select a payment method.");
    } else {
      setPaymentMethodError(null);
    }
  };

  const handlePaymentMethodSelection = (methodId: string) => {
    updateFormData({ paymentMethod: methodId });
    setPaymentMethodError(null);
  };

  const handlePackageBlur = () => {
    if (!formData.selectedPackage) {
      setPackageSelectionError("Please select a package.");
    }
  };

  const handlePaymentMethodBlur = () => {
    // --- CHANGE HERE: Check against FREE_PACKAGE_ID ---
    if (
      formData.selectedPackage !== FREE_PACKAGE_ID &&
      !formData.paymentMethod
    ) {
      setPaymentMethodError("Please select a payment method.");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold font-heading text-[var(--color-dark)] mb-6 text-center">
        Select Your Package
      </h2>
      <div className="space-y-6">
        {isLoadingPackages && (
          <div className="text-center text-gray-600 font-body mb-4">
            Loading packages...
          </div>
        )}

        {packagesError && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6"
            role="alert"
          >
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {packagesError}</span>
          </div>
        )}

        {!isLoadingPackages && !packagesError && packages.length === 0 && (
          <div className="text-center text-gray-600 font-body mb-4">
            No pricing packages available.
          </div>
        )}

        {/* Package Selection */}
        {!isLoadingPackages && !packagesError && packages.length > 0 && (
          <div className="grid grid-cols-1 gap-4" onBlur={handlePackageBlur}>
            {packages.map((pkg) => {
              // Use pkg.id for selection and comparison
              const isSelected = formData.selectedPackage === String(pkg.id);

              // Features will now come directly from the backend 'pkg.features' array.
              // If your backend doesn't send them yet, they will simply not display.
              const featuresToDisplay = pkg.features || [];

              return (
                <div
                  key={pkg.id}
                  className={`
                    p-4 rounded-lg border-2 cursor-pointer transition-all duration-200
                    ${
                      isSelected
                        ? "border-[var(--color-primary)] shadow-md bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }
                  `}
                  onClick={() => handlePackageSelection(pkg.id)} // Pass pkg.id
                >
                  <h3 className="text-lg font-bold font-heading text-[var(--color-dark)] mb-1">
                    {pkg.name}
                  </h3>
                  <p className="text-xl font-bold text-[var(--color-primary)] mb-3">
                    {pkg.price}
                    {pkg.duration && (
                      <span className="text-sm font-normal text-gray-500">
                        {" "}
                        / {pkg.duration} Days
                      </span>
                    )}
                  </p>
                  <ul className="space-y-1 text-sm text-gray-700 font-body">
                    {featuresToDisplay.length > 0 ? (
                      featuresToDisplay.map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          <FaCheckCircle
                            className={`mr-2 flex-shrink-0 ${
                              feature.included
                                ? "text-green-500"
                                : "text-gray-300"
                            }`}
                            size={14}
                          />
                          <span
                            className={`${
                              !feature.included
                                ? "line-through text-gray-400"
                                : ""
                            }`}
                          >
                            {feature.text}
                          </span>
                        </li>
                      ))
                    ) : (
                      <li className="text-gray-500 italic">
                        No features listed.
                      </li>
                    )}
                  </ul>
                </div>
              );
            })}
          </div>
        )}
        {packageSelectionError && (
          <p className="text-red-500 text-sm mt-1">{packageSelectionError}</p>
        )}

        {/* Payment Method Selection */}
        {/* --- CHANGE HERE: Show payment methods ONLY if a package is selected AND it's NOT the free package --- */}
        {formData.selectedPackage &&
          formData.selectedPackage !== FREE_PACKAGE_ID && (
            <div className="pt-6 border-t border-gray-100 mt-6 space-y-4">
              <h3 className="text-lg font-bold font-heading text-[var(--color-dark)] mb-3">
                Payment Method
              </h3>
              <div
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                onBlur={handlePaymentMethodBlur}
              >
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
                    onClick={() => handlePaymentMethodSelection(method.id)}
                  >
                    <input
                      type="radio"
                      id={method.id}
                      name="paymentMethod"
                      value={method.id}
                      checked={formData.paymentMethod === method.id}
                      onChange={() => handlePaymentMethodSelection(method.id)}
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
              {paymentMethodError && (
                <p className="text-red-500 text-sm mt-1">
                  {paymentMethodError}
                </p>
              )}
            </div>
          )}
      </div>
    </div>
  );
};

export default PackageSelectionStep;
