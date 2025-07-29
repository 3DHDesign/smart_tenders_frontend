// src/pages/Auth/VerifyOTP.tsx
import React, { useState, useEffect } from 'react';
import { FiMail, FiCheckCircle } from 'react-icons/fi';
import { authService } from '../../services/authService'; 

interface VerifyOTPProps {
  email: string;
  onVerified: () => void;
  onBackToRegister?: () => void;
}

const VerifyOTP: React.FC<VerifyOTPProps> = ({ email, onVerified, onBackToRegister }) => {
  const [otp, setOtp] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [resendTimer, setResendTimer] = useState<number>(60);
  const [canResend, setCanResend] = useState<boolean>(false);

  useEffect(() => {
    // --- CRITICAL FIX: Use ReturnType<typeof setTimeout> for timer type ---
    let timer: ReturnType<typeof setTimeout>; // Fixed NodeJS.Timeout error

    if (resendTimer > 0 && !canResend) {
      timer = setTimeout(() => setResendTimer(prev => prev - 1), 1000);
    } else if (resendTimer === 0) {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [resendTimer, canResend]);

  const handleVerifyOtp = async () => {
    setError(null);
    setSuccessMessage(null);
    if (!otp.trim()) {
      setError("Please enter the OTP.");
      return;
    }
    if (otp.length !== 8) {
      setError("OTP must be 8 digits long.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await authService.verifyOtp({ email, otp });
      setSuccessMessage(response.message || "OTP verified successfully!");
      console.log("OTP Verified response object:", response);

      if (response.token) {
        localStorage.setItem('authToken', response.token);
        console.log("Auth token stored after OTP verification (VerifyOTP path):", response.token);
        window.location.href = '/dashboard';
      } else {
        console.warn("OTP verification successful, but no token found in response.");
        onVerified();
      }

    } catch (err: unknown) { // Changed 'any' to 'unknown'
      setError(err instanceof Error ? err.message : "Failed to verify OTP.");
      console.error("OTP Verification Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setError(null);
    setSuccessMessage(null);
    setCanResend(false);
    setResendTimer(60);

    setIsLoading(true);
    try {
      const response = await authService.resendOtp(email);
      setSuccessMessage(response.message || "A new OTP has been sent! Check your email.");
      console.log("OTP Resent:", response);
    } catch (err: unknown) { // Changed 'any' to 'unknown'
      setError(err instanceof Error ? err.message : "Failed to resend OTP.");
      console.error("Resend OTP Error:", err);
      setCanResend(true);
      setResendTimer(0);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-8 md:p-10 lg:p-12 border border-gray-100 max-w-md mx-auto my-8 font-inter">
      <h2 className="text-2xl font-bold font-heading text-[var(--color-dark)] mb-6 text-center">
        Verify Your Email
      </h2>
      <p className="text-gray-600 font-body mb-6 text-center">
        A 8-digit verification code has been sent to <span className="font-semibold text-[var(--color-primary)]">{email}</span>. Please enter it below.
      </p>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6 flex items-center" role="alert">
          <FiCheckCircle className="mr-2" size={20} />
          <span className="block sm:inline"> {successMessage}</span>
        </div>
      )}

      <div className="space-y-5">
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
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 8))}
              className="w-full p-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] font-body text-gray-700 text-center tracking-widest"
              maxLength={8}
              required
              disabled={isLoading}
            />
          </div>
        </div>

        <button
          onClick={handleVerifyOtp}
          className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/80 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg"
          disabled={isLoading}
        >
          {isLoading ? "Verifying..." : "Verify Code"}
        </button>

        <div className="text-center mt-4">
          {resendTimer > 0 && !canResend ? (
            <p className="text-gray-600 font-body">Resend code in {resendTimer} seconds</p>
          ) : (
            <button
              onClick={handleResendOtp}
              className="text-[var(--color-primary)] hover:text-[var(--color-primary)]/80 font-semibold text-sm bg-transparent border-none p-0 underline"
              disabled={isLoading || !canResend}
            >
              {isLoading ? "Resending..." : "Resend Code"}
            </button>
          )}
        </div>

        {onBackToRegister && (
          <div className="text-center mt-6 pt-4 border-t border-gray-100">
            <button
              onClick={onBackToRegister}
              className="text-gray-500 hover:text-gray-700 font-body text-sm bg-transparent border-none p-0 underline"
              disabled={isLoading}
            >
              Back to Registration
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyOTP;