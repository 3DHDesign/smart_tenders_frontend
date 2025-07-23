 // auth/steps/ContactDetailsStep.tsx
import React, { useState } from 'react'; // Import useState for local component state
import { FiUser, FiPhone, FiMapPin, FiMail, FiPlus, FiMinus } from 'react-icons/fi'; // Icons for fields
import type { RegistrationFormData } from '../MultiStepRegisterForm'; // Import the main form data type for type safety

// Data for Sri Lankan Provinces and Districts (unchanged - this is your existing data)
const sriLankanLocations = [
  {
    province: "Western Province",
    districts: [
      { name: "Colombo" }, { name: "Gampaha" }, { name: "Kalutara" }
    ].sort((a, b) => a.name.localeCompare(b.name)),
  },
  {
    province: "Central Province",
    districts: [
      { name: "Kandy" }, { name: "Nuwara Eliya" }, { name: "Matale" }
    ].sort((a, b) => a.name.localeCompare(b.name)),
  },
  {
    province: "Southern Province",
    districts: [
      { name: "Galle" }, { name: "Matara" }, { name: "Hambantota" }
    ].sort((a, b) => a.name.localeCompare(b.name)),
  },
  {
    province: "Eastern Province",
    districts: [
      { name: "Ampara" }, { name: "Batticaloa" }, { name: "Trincomalee" }
    ].sort((a, b) => a.name.localeCompare(b.name)),
  },
  {
    province: "Northern Province",
    districts: [
      { name: "Jaffna" }, { name: "Kilinochchi" }, { name: "Mannar" },
      { name: "Mullaitivu" }, { name: "Vavuniya" }
    ].sort((a, b) => a.name.localeCompare(b.name)),
  },
  {
    province: "North Western Province",
    districts: [
      { name: "Kurunegala" }, { name: "Puttalam" }
    ].sort((a, b) => a.name.localeCompare(b.name)),
  },
  {
    province: "North Central Province",
    districts: [
      { name: "Anuradhapura" }, { name: "Polonnawela" } // Corrected typo: Polonnawela
    ].sort((a, b) => a.name.localeCompare(b.name)),
  },
  {
    province: "Sabaragamuwa Province",
    districts: [
      { name: "Kegalle" }, { name: "Ratnapura" }
    ].sort((a, b) => a.name.localeCompare(b.name)),
  },
  {
    province: "Uva Province",
    districts: [
      { name: "Badulla" }, { name: "Monaragala" }
    ].sort((a, b) => a.name.localeCompare(b.name)),
  },
];

// Hardcoded list of common countries (unchanged - your existing data)
const mockCountryOptions = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda",
  "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas",
  "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin",
  "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei",
  "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon",
  "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia",
  "Comoros", "Congo (Brazzaville)", "Congo (Kinshasa)", "Costa Rica", "Croatia",
  "Cuba", "Cyprus", "Czechia", "Denmark", "Djibouti", "Dominica",
  "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea",
  "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France",
  "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada",
  "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras",
  "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland",
  "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya",
  "Kiribati", "Korea (North)", "Korea (South)", "Kosovo", "Kuwait", "Kyrgyzstan",
  "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein",
  "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives",
  "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico",
  "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco",
  "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands",
  "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway",
  "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea",
  "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania",
  "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia",
  "Saint Vincent and the Grenadines", "Samoa", "San Marino",
  "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles",
  "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands",
  "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan",
  "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan",
  "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago",
  "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine",
  "United Arab Emirates", "United Kingdom", "United States", "Uruguay",
  "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen",
  "Zambia", "Zimbabwe"
].sort();

// Update StepProps to use the imported RegistrationFormData type for strong typing
interface StepProps {
  formData: RegistrationFormData;
  updateFormData: (newData: Partial<RegistrationFormData>) => void;
}

const ContactDetailsStep: React.FC<StepProps> = ({
  formData,
  updateFormData,
}) => {
  // Local state for validation errors for each input field
  const [fullNameError, setFullNameError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [address1Error, setAddress1Error] = useState<string | null>(null);
  const [countryError, setCountryError] = useState<string | null>(null);
  const [provinceError, setProvinceError] = useState<string | null>(null);
  const [cityError, setCityError] = useState<string | null>(null);

  // Helper function to get districts based on selected province
  const getDistrictsForProvince = (provinceName: string) => {
    const province = sriLankanLocations.find(p => p.province === provinceName);
    return province ? province.districts : [];
  };

  // --- Validation Functions for each field ---

  const validateFullName = (name: string): string | null => {
    if (name.trim().length === 0) {
      return "Full Name is required.";
    }
    return null;
  };

  const validatePhone = (phone: string): string | null => {
    if (phone.trim().length === 0) {
      return "Phone Number is required.";
    }
    // Regex to allow only digits (no letters or special characters)
    if (!/^\d+$/.test(phone)) {
      return "Phone Number can only contain digits.";
    }
    // Basic length check (e.g., 10 digits for most mobile numbers in Sri Lanka)
    if (phone.length !== 10) { // Adjust this length based on your specific requirements/country
      return "Phone Number must be 10 digits long.";
    }
    return null;
  };

  const validateAddress1 = (address: string): string | null => {
    if (address.trim().length === 0) {
      return "Address Line 1 is required.";
    }
    return null;
  };

  const validateCountry = (country: string): string | null => {
    if (country.trim().length === 0) {
      return "Country is required.";
    }
    return null;
  };

  const validateProvince = (province: string, country: string): string | null => {
    // Province is only required if the selected country is "Sri Lanka"
    if (country === "Sri Lanka" && province.trim().length === 0) {
      return "Province is required for Sri Lanka.";
    }
    return null;
  };

  const validateCity = (city: string, province: string, country: string): string | null => {
    // City/District is only required if the selected country is "Sri Lanka" AND a province is selected
    if (country === "Sri Lanka" && province.trim().length > 0 && city.trim().length === 0) {
      return "District/City is required for Sri Lanka.";
    }
    return null;
  };

  const validateDynamicEmail = (email: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim().length === 0) {
      return "Email address is required.";
    } else if (!emailRegex.test(email)) {
      return "Please enter a valid email address.";
    }
    return null;
  };

  // --- Input Change and Blur Handlers for each field ---

  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    updateFormData({ fullName: value }); // Update global form data
    setFullNameError(validateFullName(value)); // Validate and set local error state
  };

  const handleFullNameBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFullNameError(validateFullName(e.target.value)); // Validate on blur
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Filter out non-digits immediately
    updateFormData({ phone: value }); // Update global form data
    setPhoneError(validatePhone(value)); // Validate and set local error state
  };

  const handlePhoneBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setPhoneError(validatePhone(e.target.value)); // Validate on blur
  };

  const handleAddress1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    updateFormData({ address1: value }); // Update global form data
    setAddress1Error(validateAddress1(value)); // Validate and set local error state
  };

  const handleAddress1Blur = (e: React.FocusEvent<HTMLInputElement>) => {
    setAddress1Error(validateAddress1(e.target.value)); // Validate on blur
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCountry = e.target.value;
    updateFormData({
      country: newCountry,
      province: "", // Reset province when country changes
      city: "",     // Reset city when country changes
    });
    setCountryError(validateCountry(newCountry)); // Validate country
    setProvinceError(null); // Clear province error as it might become irrelevant
    setCityError(null);     // Clear city error as it might become irrelevant
  };

  const handleCountryBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
    setCountryError(validateCountry(e.target.value)); // Validate on blur
  };

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newProvince = e.target.value;
    updateFormData({ province: newProvince, city: "" }); // Reset city when province changes
    setProvinceError(validateProvince(newProvince, formData.country)); // Validate province
    setCityError(null); // Clear city error on province change
  };

  const handleProvinceBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
    setProvinceError(validateProvince(e.target.value, formData.country)); // Validate on blur
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCity = e.target.value;
    updateFormData({ city: newCity }); // Update global form data
    setCityError(validateCity(newCity, formData.province, formData.country)); // Validate city
  };

  const handleCityBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
    setCityError(validateCity(e.target.value, formData.province, formData.country)); // Validate on blur
  };

  // --- Dynamic Email Handlers ---
  const handleDynamicEmailChange = (id: number, newAddress: string) => {
    const updatedEmails = formData.dynamicEmails.map((email) =>
      // Update the address and immediately validate, storing the error directly on the email object
      email.id === id ? { ...email, address: newAddress, error: validateDynamicEmail(newAddress) } : email
    );
    updateFormData({ dynamicEmails: updatedEmails });
  };

  const handleDynamicEmailBlur = (id: number, address: string) => {
    const updatedEmails = formData.dynamicEmails.map((email) =>
      // Validate on blur, storing the error directly on the email object
      email.id === id ? { ...email, error: validateDynamicEmail(address) } : email
    );
    updateFormData({ dynamicEmails: updatedEmails });
  };

  const addDynamicEmail = () => {
    // Calculate a new unique ID for the email
    const newId =
      formData.dynamicEmails.length > 0
        ? Math.max(...formData.dynamicEmails.map((e) => e.id)) + 1
        : 1;
    updateFormData({
      dynamicEmails: [
        ...formData.dynamicEmails,
        { id: newId, address: "", editable: true, error: null }, // Initialize new email with no error
      ],
    });
  };

  const removeDynamicEmail = (id: number) => {
    updateFormData({
      dynamicEmails: formData.dynamicEmails.filter(
        (email) => email.id !== id
      ),
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold font-heading text-[var(--color-dark)] mb-6 text-center">
        Contact & Email Settings
      </h2>
      <div className="space-y-5">
        {/* Full Name Field */}
        <div>
          <label htmlFor="fullName" className="sr-only">
            Full Name
          </label>
          <div className="relative">
            <FiUser
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleFullNameChange} // Call handler on change
              onBlur={handleFullNameBlur}     // Call handler on blur
              className={`w-full p-3 pl-12 border rounded-lg focus:outline-none focus:ring-2 font-body text-gray-700
                ${
                  fullNameError // Apply red border if there's an error
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-[var(--color-primary)]"
                }
              `}
              required
            />
          </div>
          {fullNameError && ( // Display error message
            <p className="text-red-500 text-sm mt-1">{fullNameError}</p>
          )}
        </div>

        {/* Phone Number Field */}
        <div>
          <label htmlFor="phone" className="sr-only">
            Phone Number
          </label>
          <div className="relative">
            <FiPhone
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="tel" // Use tel type for phone numbers (keyboard hint for mobile)
              id="phone"
              name="phone"
              placeholder="Phone Number (e.g., 07XXXXXXXX)"
              value={formData.phone}
              onChange={handlePhoneChange} // Call handler on change
              onBlur={handlePhoneBlur}     // Call handler on blur
              className={`w-full p-3 pl-12 border rounded-lg focus:outline-none focus:ring-2 font-body text-gray-700
                ${
                  phoneError // Apply red border if there's an error
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-[var(--color-primary)]"
                }
              `}
              required
            />
          </div>
          {phoneError && ( // Display error message
            <p className="text-red-500 text-sm mt-1">{phoneError}</p>
          )}
        </div>

        {/* Address 1 Field */}
        <div>
          <label htmlFor="address1" className="sr-only">
            Address Line 1
          </label>
          <div className="relative">
            <FiMapPin
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              id="address1"
              name="address1"
              placeholder="Address Line 1"
              value={formData.address1}
              onChange={handleAddress1Change} // Call handler on change
              onBlur={handleAddress1Blur}     // Call handler on blur
              className={`w-full p-3 pl-12 border rounded-lg focus:outline-none focus:ring-2 font-body text-gray-700
                ${
                  address1Error // Apply red border if there's an error
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-[var(--color-primary)]"
                }
              `}
              required
            />
          </div>
          {address1Error && ( // Display error message
            <p className="text-red-500 text-sm mt-1">{address1Error}</p>
          )}
        </div>

        {/* Address 2 (Optional - no validation added unless specified) */}
        <div>
          <label htmlFor="address2" className="sr-only">
            Address Line 2 (Optional)
          </label>
          <div className="relative">
            <FiMapPin
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              id="address2"
              name="address2"
              placeholder="Address Line 2 (Optional)"
              value={formData.address2}
              onChange={(e) => updateFormData({ address2: e.target.value })}
              className="w-full p-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] font-body text-gray-700"
            />
          </div>
        </div>

        {/* Country Select Field */}
        <div>
          <label htmlFor="country" className="sr-only">
            Country
          </label>
          <div className="relative">
            <FiMapPin
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleCountryChange} // Call handler on change
              onBlur={handleCountryBlur}     // Call handler on blur
              className={`w-full p-3 pl-12 border rounded-lg bg-white focus:outline-none focus:ring-2 font-body text-gray-700 appearance-none
                ${
                  countryError // Apply red border if there's an error
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-[var(--color-primary)]"
                }
              `}
              required
            >
              <option value="">Select Country</option>
              {mockCountryOptions.map((country, idx) => (
                <option key={idx} value={country}>
                  {country}
                </option>
              ))}
            </select>
            {/* Custom SVG for dropdown arrow */}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
          {countryError && ( // Display error message
            <p className="text-red-500 text-sm mt-1">{countryError}</p>
          )}
        </div>

        {/* State (Province) Select Field - Only for Sri Lanka */}
        {formData.country === "Sri Lanka" && (
          <div>
            <label htmlFor="province" className="sr-only">
              Province
            </label>
            <div className="relative">
              <FiMapPin
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <select
                id="province"
                name="province"
                value={formData.province}
                onChange={handleProvinceChange} // Call handler on change
                onBlur={handleProvinceBlur}     // Call handler on blur
                className={`w-full p-3 pl-12 border rounded-lg bg-white focus:outline-none focus:ring-2 font-body text-gray-700 appearance-none
                  ${
                    provinceError // Apply red border if there's an error
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-[var(--color-primary)]"
                  }
                `}
                required
              >
                <option value="">Select Province</option>
                {sriLankanLocations.map((prov, idx) => (
                  <option key={idx} value={prov.province}>
                    {prov.province}
                  </option>
                ))}
              </select>
              {/* Custom SVG for dropdown arrow */}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
            {provinceError && ( // Display error message
              <p className="text-red-500 text-sm mt-1">{provinceError}</p>
            )}
          </div>
        )}

        {/* City (District) Select Field - Only for Sri Lanka */}
        {formData.country === "Sri Lanka" && (
          <div>
            <label htmlFor="city" className="sr-only">
              City
            </label>
            <div className="relative">
              <FiMapPin
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <select
                id="city"
                name="city"
                value={formData.city}
                onChange={handleCityChange} // Call handler on change
                onBlur={handleCityBlur}     // Call handler on blur
                className={`w-full p-3 pl-12 border rounded-lg bg-white focus:outline-none focus:ring-2 font-body text-gray-700 appearance-none
                  ${
                    cityError // Apply red border if there's an error
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-[var(--color-primary)]"
                  }
                `}
                required
                disabled={!formData.province} // Disable if no province selected
              >
                <option value="">Select District</option>
                {formData.province &&
                  getDistrictsForProvince(formData.province).map((district, idx) => (
                    <option key={idx} value={district.name}>
                      {district.name}
                    </option>
                  ))}
              </select>
              {/* Custom SVG for dropdown arrow */}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
            {cityError && ( // Display error message
              <p className="text-red-500 text-sm mt-1">{cityError}</p>
            )}
          </div>
        )}

        {/* Dynamic Email Fields Section */}
        <div className="pt-4 border-t border-gray-100">
          <h3 className="text-lg font-semibold font-heading text-[var(--color-dark)] mb-3">
            Notification Emails
          </h3>
          {formData.dynamicEmails.map((email, index: number) => (
            <div key={email.id} className="flex items-center gap-2 mb-3">
              <FiMail className="text-[var(--color-primary)]" size={20} />
              <input
                type="email"
                placeholder={`Email Address ${index + 1}`}
                value={email.address}
                onChange={(e) => handleDynamicEmailChange(email.id, e.target.value)}
                onBlur={(e) => handleDynamicEmailBlur(email.id, e.target.value)}
                className={`flex-grow p-3 border rounded-lg focus:outline-none focus:ring-2 font-body text-gray-700
                  ${
                    email.error // Apply red border if this specific dynamic email has an error
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-[var(--color-primary)]"
                  }
                `}
                required={email.editable} // Required if editable (initial two are required)
                disabled={!email.editable} // Disable if not editable
              />
              {/* Show remove button only if email is editable and there are more than 2 emails */}
              {email.editable && formData.dynamicEmails.length > 2 && (
                <button
                  type="button"
                  onClick={() => removeDynamicEmail(email.id)}
                  className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
                >
                  <FiMinus size={16} />
                </button>
              )}
            </div>
          ))}
          {/* Display errors for dynamic emails (each error below its respective input) */}
          {formData.dynamicEmails.map((email) => email.error && (
            <p key={`dynamic-email-error-${email.id}`} className="text-red-500 text-sm mt-1 ml-6">
              {email.error}
            </p>
          ))}
          <button
            type="button"
            onClick={addDynamicEmail}
            className="flex items-center gap-2 text-[var(--color-primary)] hover:text-[var(--color-primary)]/80 font-semibold text-sm mt-3"
          >
            <FiPlus size={16} /> Add Another Email
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactDetailsStep;