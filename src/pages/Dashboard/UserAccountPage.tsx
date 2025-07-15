import React from 'react';
import Button from '../../components/shared/Button'; // Assuming your Button component

const UserAccountPage: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold font-heading text-[var(--color-dark)] mb-6 text-center">User Account Settings</h2>
      <form className="space-y-6">
        <div>
          <label htmlFor="full-name" className="block text-gray-700 text-sm font-semibold mb-2">Full Name</label>
          <input
            type="text"
            id="full-name"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] font-body"
            placeholder="Your Full Name"
            defaultValue="Jagad Chandana" // Example default value
          />
        </div>
        <div>
          <label htmlFor="contact-number" className="block text-gray-700 text-sm font-semibold mb-2">Contact Number</label>
          <input
            type="tel"
            id="contact-number"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] font-body"
            placeholder="e.g., +94771234567"
            defaultValue="+94771234567" // Example default value
          />
        </div>
        <div>
          <label htmlFor="company-name" className="block text-gray-700 text-sm font-semibold mb-2">Company Name (Optional)</label>
          <input
            type="text"
            id="company-name"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] font-body"
            placeholder="Your Company Name"
          />
        </div>
        <div className="text-center">
          <Button
            label="Save Changes"
            className="bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/80 text-white px-8 py-3 rounded-md font-semibold"
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default UserAccountPage;