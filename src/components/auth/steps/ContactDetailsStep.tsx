// auth/steps/ContactDetailsStep.tsx
import React, { useState } from 'react';
import { FiUser, FiPhone, FiMapPin, FiMail, FiPlus, FiMinus } from 'react-icons/fi';
import type { RegistrationFormData } from '../MultiStepRegisterForm';

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
      { name: "Anuradhapura" }, { name: "Polonnawela" }
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

interface StepProps {
  formData: RegistrationFormData;
  updateFormData: (newData: Partial<RegistrationFormData>) => void;
}

const ContactDetailsStep: React.FC<StepProps> = ({
  formData,
  updateFormData,
}) => {
  const [fullNameError, setFullNameError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [address1Error, setAddress1Error] = useState<string | null>(null);
  const [countryError, setCountryError] = useState<string | null>(null);
  const [provinceError, setProvinceError] = useState<string | null>(null);
  const [cityError, setCityError] = useState<string | null>(null);

  const getDistrictsForProvince = (provinceName: string) => {
    const province = sriLankanLocations.find(p => p.province === provinceName);
    return province ? province.districts : [];
  };

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
    if (!/^\d+$/.test(phone)) {
      return "Phone Number can only contain digits.";
    }
    if (phone.length !== 10) {
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
    if (country === "Sri Lanka" && province.trim().length === 0) {
      return "Province is required for Sri Lanka.";
    }
    return null;
  };

  const validateCity = (city: string, province: string, country: string): string | null => {
    if (country === "Sri Lanka" && province.trim().length > 0 && city.trim().length === 0) {
      return "District/City is required for Sri Lanka.";
    }
    return null;
  };

  const validateDynamicEmail = (email: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim().length > 0 && !emailRegex.test(email)) {
      return "Please enter a valid email address.";
    }
    return null;
  };

  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    updateFormData({ fullName: value });
    setFullNameError(validateFullName(value));
  };

  const handleFullNameBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFullNameError(validateFullName(e.target.value));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    updateFormData({ phone: value });
    setPhoneError(validatePhone(value));
  };

  const handlePhoneBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setPhoneError(validatePhone(e.target.value));
  };

  const handleAddress1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    updateFormData({ address1: value });
    setAddress1Error(validateAddress1(value));
  };

  const handleAddress1Blur = (e: React.FocusEvent<HTMLInputElement>) => {
    setAddress1Error(validateAddress1(e.target.value));
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCountry = e.target.value;
    updateFormData({
      country: newCountry,
      province: "",
      city: "",
    });
    setCountryError(validateCountry(newCountry));
    setProvinceError(null);
    setCityError(null);
  };

  const handleCountryBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
    setCountryError(validateCountry(e.target.value));
  };

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newProvince = e.target.value;
    updateFormData({ province: newProvince, city: "" });
    setProvinceError(validateProvince(newProvince, formData.country));
    setCityError(null);
  };

  const handleProvinceBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
    setProvinceError(validateProvince(e.target.value, formData.country));
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCity = e.target.value;
    updateFormData({ city: newCity });
    setCityError(validateCity(newCity, formData.province, formData.country));
  };

  const handleCityBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
    setCityError(validateCity(e.target.value, formData.province, formData.country));
  };

  const handleDynamicEmailChange = (id: number, newAddress: string) => {
    const updatedEmails = formData.dynamicEmails.map((email) =>
      email.id === id ? { ...email, address: newAddress, error: validateDynamicEmail(newAddress) } : email
    );
    updateFormData({ dynamicEmails: updatedEmails });
  };

  const handleDynamicEmailBlur = (id: number, address: string) => {
    const updatedEmails = formData.dynamicEmails.map((email) =>
      email.id === id ? { ...email, error: validateDynamicEmail(address) } : email
    );
    updateFormData({ dynamicEmails: updatedEmails });
  };

  const addDynamicEmail = () => {
    const newId =
      formData.dynamicEmails.length > 0
        ? Math.max(...formData.dynamicEmails.map((e) => e.id)) + 1
        : 1;
    updateFormData({
      dynamicEmails: [
        ...formData.dynamicEmails,
        { id: newId, address: "", editable: true, error: null },
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
              onChange={handleFullNameChange}
              onBlur={handleFullNameBlur}
              className={`w-full p-3 pl-12 border rounded-lg focus:outline-none focus:ring-2 font-body text-gray-700
                ${
                  fullNameError
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-[var(--color-primary)]"
                }
              `}
              required
            />
          </div>
          {fullNameError && (
            <p className="text-red-500 text-sm mt-1">{fullNameError}</p>
          )}
        </div>

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
              type="tel"
              id="phone"
              name="phone"
              placeholder="Phone Number (e.g., 07XXXXXXXX)"
              value={formData.phone}
              onChange={handlePhoneChange}
              onBlur={handlePhoneBlur}
              className={`w-full p-3 pl-12 border rounded-lg focus:outline-none focus:ring-2 font-body text-gray-700
                ${
                  phoneError
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-[var(--color-primary)]"
                }
              `}
              required
            />
          </div>
          {phoneError && (
            <p className="text-red-500 text-sm mt-1">{phoneError}</p>
          )}
        </div>

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
              onChange={handleAddress1Change}
              onBlur={handleAddress1Blur}
              className={`w-full p-3 pl-12 border rounded-lg focus:outline-none focus:ring-2 font-body text-gray-700
                ${
                  address1Error
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-[var(--color-primary)]"
                }
              `}
              required
            />
          </div>
          {address1Error && (
            <p className="text-red-500 text-sm mt-1">{address1Error}</p>
          )}
        </div>

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
              onChange={handleCountryChange}
              onBlur={handleCountryBlur}
              className={`w-full p-3 pl-12 border rounded-lg bg-white focus:outline-none focus:ring-2 font-body text-gray-700 appearance-none
                ${
                  countryError
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
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
          {countryError && (
            <p className="text-red-500 text-sm mt-1">{countryError}</p>
          )}
        </div>

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
                onChange={handleProvinceChange}
                onBlur={handleProvinceBlur}
                className={`w-full p-3 pl-12 border rounded-lg bg-white focus:outline-none focus:ring-2 font-body text-gray-700 appearance-none
                  ${
                    provinceError
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
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
            {provinceError && (
              <p className="text-red-500 text-sm mt-1">{provinceError}</p>
            )}
          </div>
        )}

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
                onChange={handleCityChange}
                onBlur={handleCityBlur}
                className={`w-full p-3 pl-12 border rounded-lg bg-white focus:outline-none focus:ring-2 font-body text-gray-700 appearance-none
                  ${
                    cityError
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-[var(--color-primary)]"
                  }
                `}
                required
                disabled={!formData.province}
              >
                <option value="">Select District</option>
                {formData.province &&
                  getDistrictsForProvince(formData.province).map((district, idx) => (
                    <option key={idx} value={district.name}>
                      {district.name}
                    </option>
                  ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
            {cityError && (
              <p className="text-red-500 text-sm mt-1">{cityError}</p>
            )}
          </div>
        )}

        <div className="pt-4 border-t border-gray-100">
          <h3 className="text-lg font-semibold font-heading text-[var(--color-dark)] mb-3">
            Notification Emails
          </h3>
          {formData.dynamicEmails.map((email, index: number) => (
  <div key={email.id} className="flex items-center gap-2 mb-3">
    <FiMail className="text-[var(--color-primary)]" size={20} />
    <input
      type="email"
      placeholder={`Email Address ${index + 1} (Optional)`}
      value={email.address}
      onChange={(e) => handleDynamicEmailChange(email.id, e.target.value)}
      onBlur={(e) => handleDynamicEmailBlur(email.id, e.target.value)}
      className={`flex-grow p-3 border rounded-lg focus:outline-none focus:ring-2 font-body text-gray-700
        ${
          email.error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-[var(--color-primary)]"
        }
      `}
      disabled={!email.editable}
    />
    {/* Corrected: Show remove button only if there are MORE THAN 2 emails. */}
    {formData.dynamicEmails.length > 2 && (
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