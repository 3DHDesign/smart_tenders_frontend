// src/pages/Auth/ForgotPassword.tsx
import React, { useState } from 'react';
import { FiMail, FiLock, FiEye, FiEyeOff, FiCheckCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { authService } from '../../services/authService';

const ForgotPassword: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');

  const [emailError, setEmailError] = useState<string | null>(null);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [newPasswordError, setNewPasswordError] = useState<string | null>(null);
  const [confirmNewPasswordError, setConfirmNewPasswordError] = useState<string | null>(null);
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState<boolean>(false);

  const validateEmail = (value: string): string | null => {
    if (value.trim().length === 0) {
      return "Email is required.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return "Please enter a valid email address.";
    }
    return null;
  };

  const validatePasswordStrength = (password: string): string | null => {
    if (password.length === 0) return null;
    if (password.length < 8) return "Password must be at least 8 characters long.";
    if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter.";
    if (!/[a-z]/.test(password)) return "Password must contain at least one lowercase letter.";
    if (!/[0-9]/.test(password)) return "Password must contain at least one number.";
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?~` ]/.test(password)) return "Password must contain at least one special character.";
    return null;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(validateEmail(value));
  };

  const handleEmailBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setEmailError(validateEmail(e.target.value));
  };

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalError(null);
    setSuccessMessage(null);

    const emailValidation = validateEmail(email);
    setEmailError(emailValidation);

    if (emailValidation) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await authService.forgotPasswordRequest({ email });
      setSuccessMessage(response.message || "OTP sent to your email. Please check your inbox.");
      setCurrentStep(2); // Move to the next step (OTP & New Password)
    } catch (err: any) {
      setGlobalError(err.message || "Failed to send OTP. Please try again.");
      console.error("Forgot Password Request Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 8);
    setOtp(value);
    setOtpError(value.length !== 8 && value.length > 0 ? "OTP must be 8 digits." : null);
  };

  const handleOtpBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setOtpError(e.target.value.length !== 8 && e.target.value.length > 0 ? "OTP must be 8 digits." : null);
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewPassword(value);
    setNewPasswordError(validatePasswordStrength(value));
    if (confirmNewPassword && value !== confirmNewPassword) {
      setConfirmNewPasswordError("Passwords do not match.");
    } else {
      setConfirmNewPasswordError(null);
    }
  };

  const handleNewPasswordBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setNewPasswordError(validatePasswordStrength(e.target.value));
    if (confirmNewPassword && e.target.value !== confirmNewPassword) {
      setConfirmNewPasswordError("Passwords do not match.");
    } else {
      setConfirmNewPasswordError(null);
    }
  };

  const handleConfirmNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmNewPassword(value);
    if (newPassword && value !== newPassword) {
      setConfirmNewPasswordError("Passwords do not match.");
    } else {
      setConfirmNewPasswordError(null);
    }
  };

  const handleConfirmNewPasswordBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (newPassword && e.target.value !== newPassword) {
      setConfirmNewPasswordError("Passwords do not match.");
    } else {
      setConfirmNewPasswordError(null);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalError(null);
    setSuccessMessage(null);

    const otpValidation = otp.length !== 8 ? "OTP must be 8 digits." : null;
    const newPasswordValidation = validatePasswordStrength(newPassword);
    const confirmNewPasswordValidation = newPassword !== confirmNewPassword ? "Passwords do not match." : null;

    setOtpError(otpValidation);
    setNewPasswordError(newPasswordValidation);
    setConfirmNewPasswordError(confirmNewPasswordValidation);

    if (otpValidation || newPasswordValidation || confirmNewPasswordValidation) {
      return;
    }

    setIsLoading(true);
    try {
      // --- CRITICAL FIX: Pass newPassword and confirmNewPassword to forgotPasswordVerifyOtp ---
      const verifyOtpResponse = await authService.forgotPasswordVerifyOtp({
        email,
        otp,
        password: newPassword, // Pass new password
        password_confirmation: confirmNewPassword, // Pass confirm password
      });
      setSuccessMessage(verifyOtpResponse.message || "OTP verified. Password has been reset.");

    
      setTimeout(() => {
        window.location.href = '/login'; // Redirect to login after successful reset
      }, 2000); // Redirect after 2 seconds to show success message

      
    } catch (err: any) {
      setGlobalError(err.message || "Failed to reset password. Please try again.");
      console.error("Password Reset Error:", err);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="bg-gray-50 min-h-screen pt-16 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl p-8 md:p-10 lg:p-12 border border-gray-100 max-w-md w-full mx-auto my-8">
        <h2 className="text-2xl font-bold font-heading text-[var(--color-dark)] mb-6 text-center">
          {currentStep === 1 ? "Forgot Your Password?" : "Reset Your Password"}
        </h2>

        {globalError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {globalError}</span>
          </div>
        )}

        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6 flex items-center" role="alert">
            <FiCheckCircle className="mr-2" size={20} />
            <span className="block sm:inline"> {successMessage}</span>
          </div>
        )}

        {currentStep === 1 && (
          <form onSubmit={handleRequestOtp} className="space-y-5">
            <p className="text-gray-600 font-body mb-4 text-center">
              Enter your email address to receive a verification code.
            </p>
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="sr-only">Email Address</label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={handleEmailBlur}
                  className={`w-full p-3 pl-12 border rounded-lg focus:outline-none focus:ring-2 font-body text-gray-700
                    ${emailError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[var(--color-primary)]'}
                  `}
                  required
                  disabled={isLoading}
                />
              </div>
              {emailError && (
                <p className="text-red-500 text-sm mt-1">{emailError}</p>
              )}
            </div>

            {/* Request OTP Button */}
            <button
              type="submit"
              className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/80 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg"
              disabled={isLoading}
            >
              {isLoading ? "Sending OTP..." : "Send OTP"}
            </button>

            <div className="text-center mt-6 pt-4 border-t border-gray-100">
              <Link to="/login" className="text-[var(--color-primary)] hover:underline font-semibold">
                Back to Login
              </Link>
            </div>
          </form>
        )}

        {currentStep === 2 && (
          <form onSubmit={handleResetPassword} className="space-y-5">
            <p className="text-gray-600 font-body mb-4 text-center">
              A verification code has been sent to <span className="font-semibold text-[var(--color-primary)]">{email}</span>. Enter the code and your new password.
            </p>
            {/* OTP Field */}
            <div>
              <label htmlFor="otp" className="sr-only">Verification Code</label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  id="otp"
                  name="otp"
                  placeholder="Enter 8-digit code"
                  value={otp}
                  onChange={handleOtpChange}
                  onBlur={handleOtpBlur}
                  className={`w-full p-3 pl-12 border rounded-lg focus:outline-none focus:ring-2 font-body text-gray-700
                    ${otpError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[var(--color-primary)]'}
                  `}
                  maxLength={8}
                  required
                  disabled={isLoading}
                />
              </div>
              {otpError && (
                <p className="text-red-500 text-sm mt-1">{otpError}</p>
              )}
            </div>

            {/* New Password Field */}
            <div>
              <label htmlFor="newPassword" className="sr-only">New Password</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showNewPassword ? "text" : "password"}
                  id="newPassword"
                  name="newPassword"
                  placeholder="New Password (min 8, A-Z, a-z, 0-9, special)"
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                  onBlur={handleNewPasswordBlur}
                  className={`w-full p-3 pl-12 pr-12 border rounded-lg focus:outline-none focus:ring-2 font-body text-gray-700
                    ${newPasswordError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[var(--color-primary)]'}
                  `}
                  required
                  disabled={isLoading}
                />
                <span
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </span>
              </div>
              {newPasswordError && (
                <p className="text-red-500 text-sm mt-1">{newPasswordError}</p>
              )}
            </div>

            {/* Confirm New Password Field */}
            <div>
              <label htmlFor="confirmNewPassword" className="sr-only">Confirm New Password</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showConfirmNewPassword ? "text" : "password"}
                  id="confirmNewPassword"
                  name="confirmNewPassword"
                  placeholder="Confirm New Password"
                  value={confirmNewPassword}
                  onChange={handleConfirmNewPasswordChange}
                  onBlur={handleConfirmNewPasswordBlur}
                  className={`w-full p-3 pl-12 pr-12 border rounded-lg focus:outline-none focus:ring-2 font-body text-gray-700
                    ${confirmNewPasswordError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[var(--color-primary)]'}
                  `}
                  required
                  disabled={isLoading}
                />
                <span
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                  onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                >
                  {showConfirmNewPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </span>
              </div>
              {confirmNewPasswordError && (
                <p className="text-red-500 text-sm mt-1">{confirmNewPasswordError}</p>
              )}
            </div>

            {/* Reset Password Button */}
            <button
              type="submit"
              className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/80 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg"
              disabled={isLoading}
            >
              {isLoading ? "Resetting Password..." : "Reset Password"}
            </button>

            <div className="text-center mt-6 pt-4 border-t border-gray-100">
              <Link to="/login" className="text-[var(--color-primary)] hover:underline font-semibold">
                Back to Login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;