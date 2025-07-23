// src/pages/Auth/Login.tsx
import React, { useState } from 'react';
import { FiMail, FiLock } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const { login, isLoading, error } = useAuth(); // Destructure 'error' from useAuth

  const validateEmail = (value: string): string | null => {
    if (value.trim().length === 0) {
      return "Email is required.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return "Please enter a valid email address.";
    }
    return null;
  };

  const validatePassword = (value: string): string | null => {
    if (value.trim().length === 0) {
      return "Password is required.";
    }
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

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(validatePassword(value));
  };

  const handlePasswordBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setPasswordError(validatePassword(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);

    setEmailError(emailValidation);
    setPasswordError(passwordValidation);

    if (emailValidation || passwordValidation) {
      return;
    }

    await login({ email, password });
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-16 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl p-8 md:p-10 lg:p-12 border border-gray-100 max-w-md w-full mx-auto my-8">
        <h2 className="text-2xl font-bold font-heading text-[var(--color-dark)] mb-6 text-center">
          Login to Your Account
        </h2>

        {/* --- FIX 1: Ensure global error from useAuth is displayed --- */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
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
              />
            </div>
            {emailError && (
              <p className="text-red-500 text-sm mt-1">{emailError}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                onBlur={handlePasswordBlur}
                className={`w-full p-3 pl-12 border rounded-lg focus:outline-none focus:ring-2 font-body text-gray-700
                  ${passwordError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[var(--color-primary)]'}
                `}
                required
              />
            </div>
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
          </div>

          {/* Forgot Password Link */}
          <div className="text-right text-sm">
            <Link to="/forgot-password" className="text-[var(--color-primary)] hover:underline font-body">
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/80 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg"
            disabled={isLoading}
          >
            {isLoading ? "Logging In..." : "Login"}
          </button>
        </form>

        {/* Register Link */}
        <div className="text-center mt-6 pt-4 border-t border-gray-100">
          <p className="text-gray-600 font-body text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-[var(--color-primary)] hover:underline font-semibold">
              Register Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;