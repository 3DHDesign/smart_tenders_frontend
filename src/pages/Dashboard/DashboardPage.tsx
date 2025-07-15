import React, { useState } from "react";
import Button from "../../components/shared/Button";
import { FiMail, FiCheckCircle } from "react-icons/fi";
import PageBanner from '../../components/shared/PageBanner'; // Import PageBanner

// Mock User Data (no API connection yet)
const mockUser = {
  name: "Jagad Chandana",
  email: "jagadchandana@gmail.com",
  referenceNo: "REF8793",
  avatar: "https://placehold.co/100x100/00A3DF/FFFFFF?text=JC", // Placeholder avatar
  package: {
    name: "Premium Plan",
    details: "Unlimited Tenders, Advanced Analytics",
    status: "Active",
    renewalDate: "2026-07-01",
  },
  favoritesCount: 12, // Example: number of favorited tenders
  emails: [
    { id: 1, address: "jagad.chandana@example.com", editable: true },
    { id: 2, address: "backup.email@example.com", editable: true },
  ],
};

const DashboardPage: React.FC = () => {
  const [userEmails, setUserEmails] = useState(mockUser.emails);

  const handleEmailChange = (id: number, newAddress: string) => {
    setUserEmails((prevEmails) =>
      prevEmails.map((email) =>
        email.id === id ? { ...email, address: newAddress } : email
      )
    );
  };

  const handleSaveEmail = (id: number) => {
    const emailToSave = userEmails.find((email) => email.id === id);
    if (emailToSave) {
      console.log(`Saving email ${emailToSave.address} for ID: ${id}`);
      alert(`Email saved: ${emailToSave.address}`); // Using alert for demo, replace with proper UI feedback
    }
  };

  return (
    // This div controls the padding and max-width for the content.
    <div className="max-w-screen-xl mx-auto  space-y-8">
      {/* Page Banner for Dashboard - Rendered here */}
      <PageBanner
        title={`Hello, ${mockUser.name}!`} // Dynamic title from mockUser
        backgroundImage="/images/download.png" // Using dashboard-banner-bg.jpg as requested
      />

    <div className="p-4">
          {/* User Profile and Package Details Card - Removed redundant "Hello, Jagad Chandana" heading */}
      <div className="bg-white rounded-3xl shadow-xl p-8 flex flex-col md:flex-row items-center md:items-start gap-8 border border-gray-100 ">
        <img
          src={mockUser.avatar}
          alt={mockUser.name}
          className="w-28 h-28 rounded-full object-cover border-4 border-[var(--color-primary)] shadow-md"
        />
        <div className="text-center md:text-left flex-grow space-y-2">
          {/* Removed: <h1 className="text-4xl font-extrabold font-heading text-[var(--color-dark)] mb-1 tracking-tight">Hello, {mockUser.name}</h1> */}
          <p className="text-gray-500 font-body text-lg mb-0.5 flex items-center justify-center md:justify-start gap-2">
            <FiMail className="text-[var(--color-primary)]" />{" "}
            <span className="font-semibold">{mockUser.email}</span>
          </p>
          <p className="text-gray-400 font-body text-md mb-2">
            Reference No:{" "}
            <span className="font-semibold text-gray-700">
              {mockUser.referenceNo}
            </span>
          </p>

          <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 mt-2">
            <span className="bg-[var(--color-primary)]/90 text-white px-5 py-2 rounded-full text-base font-semibold shadow-sm">
              Package: {mockUser.package.name}{" "}
              <span className="ml-1 text-xs font-normal">
                ({mockUser.package.status})
              </span>
            </span>
            <span className="text-gray-700 text-sm bg-gray-100 px-3 py-1 rounded-full">
              Renews: {mockUser.package.renewalDate}
            </span>
            <button className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white px-5 py-2 rounded-full text-base font-bold shadow-md transition-all duration-200">
              RENEW MY ACCOUNT
            </button>
          </div>
        </div>
        <div className="flex-shrink-0 text-center md:text-right bg-[var(--color-primary)]/10 rounded-2xl px-6 py-4 shadow-inner">
          <span className="text-5xl font-extrabold text-[var(--color-primary)] drop-shadow-lg">
            {mockUser.favoritesCount}
          </span>
          <p className="text-gray-600 font-body text-base mt-1">Favorites</p>
        </div>
      </div>

      {/* Editable Email Fields */}
      <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 mt-5">
        <h2 className="text-3xl font-extrabold font-heading text-[var(--color-dark)] mb-3 tracking-tight">
          Email Settings
        </h2>
        <p className="text-gray-500 font-body mb-6">
          You have{" "}
          <span className="font-bold text-[var(--color-primary)]">
            2 free email slots
          </span>{" "}
          for tender notifications. You can edit these addresses below:
        </p>
        <div className="space-y-5">
          {userEmails.map((email) => (
            <div
              key={email.id}
              className="flex flex-col sm:flex-row items-center gap-3 bg-gray-50 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center w-full sm:w-auto gap-2">
                <FiMail className="text-[var(--color-primary)] text-xl" />
                <input
                  type="email"
                  value={email.address}
                  onChange={(e) => handleEmailChange(email.id, e.target.value)}
                  className="flex-grow p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] font-body bg-white text-gray-700 shadow-inner transition-all"
                  disabled={!email.editable}
                />
              </div>
              {email.editable && (
                <Button
                  label={
                    <span className="flex items-center gap-1">
                      <FiCheckCircle className="inline text-lg" /> Save
                    </span>
                  }
                  className="bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/80 text-white px-6 py-2 rounded-lg text-base font-semibold shadow-md w-full sm:w-auto"
                  onClick={() => handleSaveEmail(email.id)}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>

      {/* Placeholder for other dashboard overview sections */}
    </div>
  );
};

export default DashboardPage;