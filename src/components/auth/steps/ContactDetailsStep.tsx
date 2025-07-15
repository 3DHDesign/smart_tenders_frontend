import React from 'react';
import { FiUser, FiPhone, FiMapPin, FiMail, FiPlus, FiMinus } from 'react-icons/fi'; // Icons

// Data for Sri Lankan Provinces and Districts - KEY FIX: Added comprehensive mock district data
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
      { name: "Anuradhapura" }, { name: "Polonnaruwa" }
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

// Hardcoded list of common countries (as country-list caused issues)
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
].sort(); // Ensure it's sorted alphabetically

interface StepProps {
  formData: any;
  updateFormData: (newData: any) => void;
}

const ContactDetailsStep: React.FC<StepProps> = ({
  formData,
  updateFormData,
}) => {
  const handleDynamicEmailChange = (id: number, newAddress: string) => {
    const updatedEmails = formData.dynamicEmails.map((email: any) =>
      email.id === id ? { ...email, address: newAddress } : email
    );
    updateFormData({ dynamicEmails: updatedEmails });
  };

  const addDynamicEmail = () => {
    const newId =
      formData.dynamicEmails.length > 0
        ? Math.max(...formData.dynamicEmails.map((e: any) => e.id)) + 1
        : 1;
    updateFormData({
      dynamicEmails: [
        ...formData.dynamicEmails,
        { id: newId, address: "", editable: true },
      ],
    });
  };

  const removeDynamicEmail = (id: number) => {
    updateFormData({
      dynamicEmails: formData.dynamicEmails.filter(
        (email: any) => email.id !== id
      ),
    });
  };

  // Helper to get districts for selected province - KEY FIX: Logic is correct
  const getDistrictsForProvince = (provinceName: string) => {
    const province = sriLankanLocations.find(p => p.province === provinceName);
    return province ? province.districts : [];
  };

  return (
    <div>
      <h2 className="text-2xl font-bold font-heading text-[var(--color-dark)] mb-6 text-center">
        Contact & Email Settings
      </h2>
      <div className="space-y-5">
        {/* Full Name */}
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
              onChange={(e) => updateFormData({ fullName: e.target.value })}
              className="w-full p-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] font-body text-gray-700"
              required
            />
          </div>
        </div>

        {/* Phone Number */}
        <div>
          <label htmlFor="phone" className="sr-only">
            Phone Number
          </label>
          <div className="relative">
            <FiPhone
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />{" "}
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) => updateFormData({ phone: e.target.value })}
              className="w-full p-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] font-body text-gray-700"
              required
            />
          </div>
        </div>

        {/* Address 1 */}
        <div>
          <label htmlFor="address1" className="sr-only">
            Address Line 1
          </label>
          <div className="relative">
            <FiMapPin
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />{" "}
            <input
              type="text"
              id="address1"
              name="address1"
              placeholder="Address"
              value={formData.address1}
              onChange={(e) => updateFormData({ address1: e.target.value })}
              className="w-full p-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] font-body text-gray-700"
              required
            />
          </div>
        </div>

        {/* Country */}
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
              onChange={(e) => {
                updateFormData({
                  country: e.target.value,
                  province: "", // Reset province when country changes
                  city: "",     // Reset city when country changes
                });
              }}
              className="w-full p-3 pl-12 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] font-body text-gray-700 appearance-none"
              required
            >
              <option value="">Select Country</option>
              {mockCountryOptions.map((country, idx) => (
                <option key={idx} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* State (Province) - Only for Sri Lanka */}
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
                onChange={(e) => {
                  updateFormData({ province: e.target.value, city: "" }); // Reset city when province changes
                }}
                className="w-full p-3 pl-12 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] font-body text-gray-700 appearance-none"
                required
              >
                <option value="">Select Province</option>
                {sriLankanLocations.map((prov, idx) => (
                  <option key={idx} value={prov.province}>
                    {prov.province}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* City (District) - Only for Sri Lanka */}
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
                onChange={(e) => updateFormData({ city: e.target.value })}
                className="w-full p-3 pl-12 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] font-body text-gray-700 appearance-none"
                required
                disabled={!formData.province} // Disable if no province selected
              >
                <option value="">Select District</option>
                {formData.province &&
                  getDistrictsForProvince(formData.province).map((district, idx) => ( // KEY FIX: Use helper function
                    <option key={idx} value={district.name}>
                      {district.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        )}

        {/* Dynamic Email Fields */}
        <div className="pt-4 border-t border-gray-100">
          <h3 className="text-lg font-semibold font-heading text-[var(--color-dark)] mb-3">
            Notification Emails
          </h3>
          {formData.dynamicEmails.map((email: any, index: number) => (
            <div key={email.id} className="flex items-center gap-2 mb-3">
              <FiMail className="text-[var(--color-primary)]" size={20} />
              <input
                type="email"
                placeholder={`Email Address ${index + 1}`}
                value={email.address}
                onChange={(e) => handleDynamicEmailChange(email.id, e.target.value)}
                className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] font-body text-gray-700"
                required={email.editable}
                disabled={!email.editable}
              />
              {email.editable && formData.dynamicEmails.length > 2 && ( // Only show remove if more than 2 emails
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