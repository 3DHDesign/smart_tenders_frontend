import React from 'react';
import Button from '../../components/shared/Button'; // Assuming your Button component

const PasswordResetPage: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold font-heading text-[var(--color-dark)] mb-6 text-center">Reset Your Password</h2>
      <form className="space-y-6">
        <div>
          <label htmlFor="current-password" className="block text-gray-700 text-sm font-semibold mb-2">Current Password</label>
          <input
            type="password"
            id="current-password"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] font-body"
            placeholder="Enter current password"
          />
        </div>
        <div>
          <label htmlFor="new-password" className="block text-gray-700 text-sm font-semibold mb-2">New Password</label>
          <input
            type="password"
            id="new-password"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] font-body"
            placeholder="Enter new password"
          />
        </div>
        <div>
          <label htmlFor="confirm-password" className="block text-gray-700 text-sm font-semibold mb-2">Confirm New Password</label>
          <input
            type="password"
            id="confirm-password"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] font-body"
            placeholder="Confirm new password"
          />
        </div>
        <div className="text-center">
          <Button
            label="Reset Password"
            className="bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/80 text-white px-8 py-3 rounded-md font-semibold"
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default PasswordResetPage;