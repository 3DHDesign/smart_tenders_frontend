 // auth/steps/AccountStep.tsx
import React, { useState } from "react";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi"; // Import all necessary icons
import type { RegistrationFormData } from "../MultiStepRegisterForm"; // Import the type for better type safety

// Define props for individual step components
interface StepProps {
  formData: RegistrationFormData; // Use the specific type for better safety
  updateFormData: (newData: Partial<RegistrationFormData>) => void; // Use Partial for partial updates
}

const AccountStep: React.FC<StepProps> = ({ formData, updateFormData }) => {
  // State to hold validation errors for each field in this step
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);

  // State for password visibility toggles
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

 
  const validatePassword = (password: string): string | null => {
    if (password.length === 0) {
      return null; // No error if field is empty (validation will be stricter on submit)
    }
    if (password.length < 8) {
      return "Password must be at least 8 characters long.";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter.";
    }
    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter.";
    }
    if (!/[0-9]/.test(password)) {
      return "Password must contain at least one number.";
    }
    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~` ]/.test(password)) {
      return "Password must contain at least one special character.";
    }
    return null;
  };

  /**
   * Validates the email format and emptiness.
   * @param email The email string to validate.
   * @returns A string containing an error message if validation fails, otherwise null.
   */
  const validateEmail = (email: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.length === 0) {
      return "Email address is required.";
    } else if (!emailRegex.test(email)) {
      return "Please enter a valid email address.";
    }
    return null;
  };

  /**
   * Handles changes in the email input field.
   * Updates form data and performs validation on change.
   * @param e The change event from the input element.
   */
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    updateFormData({ email: newEmail }); // Update the global form data

    // Validate immediately on change for real-time feedback
    setEmailError(validateEmail(newEmail));
  };

  /**
   * Handles the blur event for the email input field.
   * Ensures validation is run when the user leaves the field.
   * @param e The blur event from the input element.
   */
  const handleEmailBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // Re-validate on blur to catch cases where user might leave field empty
    setEmailError(validateEmail(e.target.value));
  };


  /**
   * Handles changes in the password input field.
   * Performs password strength validation and updates form data and error state.
   * Also re-validates confirm password to ensure consistency.
   * @param e The change event from the input element.
   */
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    updateFormData({ password: newPassword });

    const error = validatePassword(newPassword);
    setPasswordError(error);

    if (formData.confirmPassword && newPassword !== formData.confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
    } else {
      setConfirmPasswordError(null);
    }
  };

  /**
   * Handles changes in the confirm password input field.
   * Checks if it matches the main password and updates form data and error state.
   * @param e The change event from the input element.
   */
  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newConfirmPassword = e.target.value;
    updateFormData({ confirmPassword: newConfirmPassword });

    if (formData.password && newConfirmPassword !== formData.password) {
      setConfirmPasswordError("Passwords do not match.");
    } else {
      setConfirmPasswordError(null);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold font-heading text-[var(--color-dark)] mb-6 text-center">
        Create Your Account
      </h2>
      <div className="space-y-5">
        {/* Email Field */}
        <div>
          <label htmlFor="email" className="sr-only">
            Email Address
          </label>
          <div className="relative">
            <FiMail
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleEmailChange} // Validate on change
              onBlur={handleEmailBlur}     // NEW: Validate on blur
              className={`w-full p-3 pl-12 border rounded-lg focus:outline-none focus:ring-2 font-body text-gray-700
                ${
                  emailError // Apply red border if there's an email error
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-[var(--color-primary)]"
                }
              `}
              required
            />
          </div>
          {emailError && ( // Display email error message below the input
            <p className="text-red-500 text-sm mt-1">{emailError}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <div className="relative">
            <FiLock
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Password (min 8, A-Z, a-z, 0-9, special)"
              value={formData.password}
              onChange={handlePasswordChange}
              className={`w-full p-3 pl-12 pr-12 border rounded-lg focus:outline-none focus:ring-2 font-body text-gray-700
                ${
                  passwordError
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-[var(--color-primary)]"
                }
              `}
              required
            />
            <span
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </span>
          </div>
          {passwordError && (
            <p className="text-red-500 text-sm mt-1">{passwordError}</p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div>
          <label htmlFor="confirmPassword" className="sr-only">
            Confirm Password
          </label>
          <div className="relative">
            <FiLock
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleConfirmPasswordChange}
              className={`w-full p-3 pl-12 pr-12 border rounded-lg focus:outline-none focus:ring-2 font-body text-gray-700
                ${
                  confirmPasswordError
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-[var(--color-primary)]"
                }
              `}
              required
            />
            <span
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </span>
          </div>
          {confirmPasswordError && (
            <p className="text-red-500 text-sm mt-1">{confirmPasswordError}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountStep;