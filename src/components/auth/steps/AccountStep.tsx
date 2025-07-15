import React from 'react';
import { FiMail, FiLock } from 'react-icons/fi'; // Icons for email and password

// Define props for individual step components
interface StepProps {
  formData: any; // Use 'any' for now, or define a more specific type if not using global RegistrationFormData
  updateFormData: (newData: any) => void;
}

const AccountStep: React.FC<StepProps> = ({ formData, updateFormData }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold font-heading text-[var(--color-dark)] mb-6 text-center">
        Create Your Account
      </h2>
      <div className="space-y-5">
        {/* Email Field */}
        <div>
          <label htmlFor="email" className="sr-only">Email Address</label>
          <div className="relative">
            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email Address" // Placeholder is here
              value={formData.email} // Value is correctly bound
              onChange={(e) => updateFormData({ email: e.target.value })}
              className="w-full p-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] font-body text-gray-700"
              required
            />
          </div>
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
              placeholder="Password" // Placeholder is here
              value={formData.password} // Value is correctly bound
              onChange={(e) => updateFormData({ password: e.target.value })}
              className="w-full p-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] font-body text-gray-700"
              required
            />
          </div>
        </div>

        {/* Confirm Password Field */}
        <div>
          <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
          <div className="relative">
            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password" // Placeholder is here
              value={formData.confirmPassword}
              onChange={(e) => updateFormData({ confirmPassword: e.target.value })}
              className="w-full p-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] font-body text-gray-700"
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountStep;