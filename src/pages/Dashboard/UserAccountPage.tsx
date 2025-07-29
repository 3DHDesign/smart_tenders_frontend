// src/pages/UserAccountPage.tsx
import React, { useEffect, useState } from "react";
import Button from "../../components/shared/Button"; // Adjust path if necessary
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import from userService.ts for initial dashboard data (UserDetails)
import {
  getDashboardData,
  type UserMail,
  type Meta,
} from "../../services/userService";

// Import from api.ts for all categories
import { apiService, type Category } from "../../services/api";

// Import from userAccountService.ts for update actions
import { userAccountService } from "../../services/userAccountService";

import {
  FiMail,
  FiCheckCircle,
  FiPlus,
  FiTrash2,
  FiSave,
  FiTag,
  FiHome, // For address
  FiGlobe, // For country
  FiMapPin, // For province/district
  FiBriefcase, // For company name
} from "react-icons/fi";

// Define an interface for the category card (without icon)
interface CategoryCardProps {
  category: Category;
  isSelected: boolean;
  onToggle: (id: number) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  isSelected,
  onToggle,
}) => {
  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all duration-225 group
        ${
          isSelected
            ? "bg-blue-50 border-[var(--color-primary)] shadow-md" // Using var(--color-primary) here for active state
            : "bg-gray-50 border-gray-200 hover:border-gray-300"
        }`}
      onClick={() => onToggle(category.id)}
    >
      <input
        type="checkbox"
        checked={isSelected}
        readOnly // Prevent direct manipulation, clicks handle toggle
        className="form-checkbox h-5 w-5 text-[var(--color-primary)] rounded-md focus:ring-[var(--color-primary)] accent-[var(--color-primary)]"
        // The `accent-[var(--color-primary)]` class is important for styling the checkbox itself
      />
      <div>
        <p className="font-medium text-sm text-gray-800">{category.name}</p>
        <p className="text-xs text-gray-500">{category.tender_count} Tenders</p>
      </div>
    </div>
  );
};

const UserAccountPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [allCategories, setAllCategories] = useState<Category[]>([]); // Use Category from apiService

  // Form states for profile details
  const [fullName, setFullName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");

  // Form state for emails
  const [currentEmails, setCurrentEmails] = useState<UserMail[]>([]); // Use UserMail from userService
  const [newEmail, setNewEmail] = useState("");

  // Form state for categories
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);

  // Helper to extract meta value
  const getMetaValue = (metas: Meta[] | undefined, key: string): string => {
    // Use Meta from userService, handle undefined
    if (!metas) return "";
    return metas.find((m) => m.key === key)?.value || "";
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch User Details from Dashboard API
        const dashboardData = await getDashboardData();
        // setUser(dashboardData); // Removed unused 'user' state variable

        // Populate profile form fields from dashboardData
        setFullName(dashboardData.name); // Name is from UserDetails directly
        setContactNumber(getMetaValue(dashboardData.metas, "phone"));
        setCompanyName(getMetaValue(dashboardData.metas, "company_name")); // Assuming 'company_name' meta key
        setAddress(getMetaValue(dashboardData.metas, "address"));
        setCountry(getMetaValue(dashboardData.metas, "country"));
        setProvince(getMetaValue(dashboardData.metas, "province"));
        setDistrict(getMetaValue(dashboardData.metas, "district"));

        setCurrentEmails(dashboardData.user_mails);
        setSelectedCategoryIds(dashboardData.categories.map((cat) => cat.id));

        // Fetch ALL Categories from the separate /categories API
        const allCats = await apiService.getCategories();
        setAllCategories(allCats);
      } catch (err: unknown) {
        console.error("Failed to fetch data:", err);
        const message =
          err instanceof Error
            ? err.message
            : "Failed to load account data. Please try again.";
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Create payload matching the /account/update API's form-data
      // Only include fields that are actually sent to this specific API as per your screenshot
      const payload = {
        phone: contactNumber,
        address: address,
        country: country,
        province: province,
        district: district,
        // name and company_name are NOT sent here as per your API screenshot for /account/update.
        // If they are updated via a different endpoint, handle that separately,
        // or add them here if the API was designed to accept them as well (but not shown in screenshot).
      };
      await userAccountService.updateProfile(payload);
      toast.success("Profile updated successfully!");
    } catch (err: unknown) {
      console.error("Failed to update profile:", err);
      const message =
        err instanceof Error
          ? err.message
          : "Failed to update profile. Please try again.";
      toast.error(message);
    }
  };

  const handleEmailChange = (id: number, value: string) => {
    setCurrentEmails((prev) =>
      prev.map((email) =>
        email.id === id ? { ...email, email: value } : email
      )
    );
  };

  const handleSaveEmail = async (id: number) => {
    const emailToUpdate = currentEmails.find((e) => e.id === id);
    if (emailToUpdate && emailToUpdate.email.trim() !== "") {
      try {
        await userAccountService.updateEmail({
          id: emailToUpdate.id,
          email: emailToUpdate.email,
        });
        toast.success("Email updated successfully!");
      } catch (err: unknown) {
        console.error("Failed to update email:", err);
        const message =
          err instanceof Error
            ? err.message
            : "Failed to update email. Please try again.";
        toast.error(message);
      }
    } else {
      toast.warn("Email field cannot be empty.");
    }
  };

  const handleAddEmail = async () => {
    if (newEmail.trim() === "") {
      toast.warn("New email field cannot be empty.");
      return;
    }
    try {
      const response = await userAccountService.addEmail({ email: newEmail });
      // If your API returns the new mail object, you'd add it directly to state.
      // If not, re-fetching the dashboard data is a safe way to update the list.
      if (response.message) {
        toast.success(response.message);
        setNewEmail("");
        // Refetch user data to get the updated list of emails with their IDs
        // This ensures the new email's ID from backend is captured correctly.
        const updatedUserData = await getDashboardData();
        setCurrentEmails(updatedUserData.user_mails);
      } else {
        toast.error("Failed to add email: Unknown response.");
      }
    } catch (err: unknown) {
      console.error("Failed to add email:", err);
      const message =
        err instanceof Error
          ? err.message
          : "Failed to add email. Please try again.";
      toast.error(message);
    }
  };

  const handleDeleteEmail = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this email?")) {
      try {
        await userAccountService.deleteEmail({ id });
        setCurrentEmails((prev) => prev.filter((email) => email.id !== id));
        toast.success("Email deleted successfully!");
      } catch (err: unknown) {
        console.error("Failed to delete email:", err);
        const message =
          err instanceof Error
            ? err.message
            : "Failed to delete email. Please try again.";
        toast.error(message);
      }
    }
  };

  const handleCategoryToggle = (categoryId: number) => {
    setSelectedCategoryIds((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleCategoryUpdate = async () => {
    try {
      await userAccountService.updateCategories({
        selected_categories: selectedCategoryIds,
      });
      toast.success("Categories updated successfully!");
    } catch (err: unknown) {
      console.error("Failed to update categories:", err);
      const message =
        err instanceof Error
          ? err.message
          : "Failed to update categories. Please try again.";
      toast.error(message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-xl font-medium text-gray-500 animate-pulse">
          Loading account settings...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-10">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <h1 className="text-3xl font-bold font-heading text-center text-gray-800 mb-8">
        Account Settings
      </h1>

      {/* Profile Information Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
          <FiSave className="text-teal-500" /> General Profile
        </h2>
        <form onSubmit={handleProfileSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="full-name"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              id="full-name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] font-body transition-all duration-200"
              placeholder="Your Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              // Note: 'name' is retrieved from dashboard data but NOT sent to /account/update as per your screenshot.
              // If editable, it's presumed to be handled by another API or not editable here.
            />
          </div>
          <div>
            <label
              htmlFor="contact-number"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Contact Number
            </label>
            <input
              type="tel"
              id="contact-number"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] font-body transition-all duration-200"
              placeholder="e.g., +94771234567"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="company-name"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              <FiBriefcase className="inline-block mr-1 text-gray-500" />{" "}
              Company Name (Optional)
            </label>
            <input
              type="text"
              id="company-name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] font-body transition-all duration-200"
              placeholder="Your Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              // Note: 'company_name' is retrieved from dashboard data but NOT sent to /account/update as per your screenshot.
            />
          </div>
          <div>
            <label
              htmlFor="address"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              <FiHome className="inline-block mr-1 text-gray-500" /> Address
            </label>
            <input
              type="text"
              id="address"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] font-body transition-all duration-200"
              placeholder="Your Street Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label
                htmlFor="country"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                <FiGlobe className="inline-block mr-1 text-gray-500" /> Country
              </label>
              <input
                type="text"
                id="country"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] font-body transition-all duration-200"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="province"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                <FiMapPin className="inline-block mr-1 text-gray-500" />{" "}
                Province
              </label>
              <input
                type="text"
                id="province"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] font-body transition-all duration-200"
                placeholder="Province"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="district"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                <FiMapPin className="inline-block mr-1 text-gray-500" />{" "}
                District
              </label>
              <input
                type="text"
                id="district"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] font-body transition-all duration-200"
                placeholder="District"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
              />
            </div>
          </div>

          <div className="pt-4">
            <Button
              label="Save Profile Changes"
              className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-white px-8 py-3 rounded-lg font-semibold shadow-md transition-colors duration-200"
              type="submit"
            />
          </div>
        </form>
      </div>

      {/* Email Notification Settings */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
          <FiMail className="text-blue-500" /> Notification Emails
        </h2>
        <div className="space-y-4">
          {currentEmails.length === 0 ? (
            <p className="text-gray-500 text-center py-4 bg-gray-50 rounded-lg border border-dashed border-gray-200">
              No notification emails added yet.
            </p>
          ) : (
            currentEmails.map((email) => (
              <div
                key={email.id}
                className="flex flex-col sm:flex-row items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="relative flex-grow w-full">
                  <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={email.email}
                    onChange={(e) =>
                      handleEmailChange(email.id, e.target.value)
                    }
                    className="flex-grow w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all duration-200 text-gray-700"
                    placeholder="Enter email address"
                  />
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <Button
                    label={
                      <span className="flex gap-1 items-center">
                        <FiCheckCircle /> Save
                      </span>
                    }
                    className="w-1/2 sm:w-auto px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-sm transition-colors duration-200 font-medium text-sm"
                    onClick={() => handleSaveEmail(email.id)}
                  />
                  <Button
                    label={
                      <span className="flex gap-1 items-center">
                        <FiTrash2 /> Delete
                      </span>
                    }
                    className="w-1/2 sm:w-auto px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-sm transition-colors duration-200 font-medium text-sm"
                    onClick={() => handleDeleteEmail(email.id)}
                  />
                </div>
              </div>
            ))
          )}

          {/* Add New Email Input */}
          <div className="flex flex-col sm:flex-row items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200 mt-6">
            <div className="relative flex-grow w-full">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" />
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="flex-grow w-full pl-10 pr-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all duration-200 text-gray-700"
                placeholder="Add a new email address"
              />
            </div>
            <Button
              label={
                <span className="flex gap-1 items-center">
                  <FiPlus /> Add Email
                </span>
              }
              className="w-full sm:w-auto px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-sm transition-colors duration-200 font-medium text-sm"
              onClick={handleAddEmail}
            />
          </div>
        </div>
      </div>

      {/* Preferred Categories Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
          <FiTag className="text-purple-500" /> Preferred Categories
        </h2>
        {allCategories.length === 0 ? (
          <p className="text-gray-500 text-center py-4 bg-gray-50 rounded-lg border border-dashed border-gray-200">
            No categories available at the moment.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">
            {allCategories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                isSelected={selectedCategoryIds.includes(category.id)}
                onToggle={handleCategoryToggle}
              />
            ))}
          </div>
        )}
        <div className="pt-4 text-center">
          <Button
            label="Update Categories"
            className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold shadow-md transition-colors duration-200"
            onClick={handleCategoryUpdate}
          />
        </div>
      </div>
    </div>
  );
};

export default UserAccountPage;
