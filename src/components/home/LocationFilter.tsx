import React, { useState } from 'react';
import { FaMapMarkerAlt, FaChevronDown, FaChevronRight } from 'react-icons/fa'; // Icons for location and toggles

// Data for Sri Lankan Provinces and Districts
const sriLankanLocations = [
  {
    province: 'Western Province', count: 21144,
    districts: [
      { name: 'Colombo', count: 12000 },
      { name: 'Gampaha', count: 7000 },
      { name: 'Kalutara', count: 2144 },
    ]
  },
  {
    province: 'Central Province', count: 1785,
    districts: [
      { name: 'Kandy', count: 1388 },
      { name: 'Nuwara Eliya', count: 221 },
      { name: 'Matale', count: 176 },
    ]
  },
  {
    province: 'Southern Province', count: 1270,
    districts: [
      { name: 'Galle', count: 563 },
      { name: 'Matara', count: 393 },
      { name: 'Hambantota', count: 314 },
    ]
  },
  { province: 'Eastern Province', count: 1102, districts: [] },
  { province: 'Northern Province', count: 1094, districts: [] },
  { province: 'North Western Province', count: 1043, districts: [] },
  { province: 'North Central Province', count: 787, districts: [] },
  { province: 'Sabaragamuwa Province', count: 750, districts: [] },
  { province: 'Uva Province', count: 731, districts: [] },
];

const LocationFilter: React.FC = () => {
  const [openProvinces, setOpenProvinces] = useState<{ [key: string]: boolean }>({});

  const toggleProvince = (provinceName: string) => {
    setOpenProvinces(prev => ({
      ...prev,
      [provinceName]: !prev[provinceName]
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md mb-6">
      <div className="p-4 border-b border-gray-200 flex items-center space-x-2 text-smarttendersSecondary-DEFAULT font-semibold text-lg font-heading"> {/* Used font-heading */}
        <FaMapMarkerAlt className="text-smarttendersPrimary-DEFAULT" />
        <span>Tenders By Locations</span>
      </div>
      <ul className="divide-y divide-gray-100">
        {sriLankanLocations.map((location, index) => (
          <li key={index}>
            <div
              className="flex justify-between items-center p-3 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
              onClick={() => location.districts && location.districts.length > 0 && toggleProvince(location.province)}
            >
              <span className="text-smarttendersSecondary-700 font-medium font-body">{location.province} ({location.count})</span> {/* Applied text-smarttendersSecondary-700 and font-body */}
              {location.districts && location.districts.length > 0 && (
                openProvinces[location.province] ? <FaChevronDown className="text-smarttendersSecondary-500" /> : <FaChevronRight className="text-smarttendersSecondary-500" />  
              )}
            </div>
            {location.districts && location.districts.length > 0 && openProvinces[location.province] && (
              <ul className="bg-gray-50 border-t border-gray-100">
                {location.districts.map((district, distIndex) => (
                  <li key={distIndex} className="flex justify-between items-center p-2 pl-8 hover:bg-gray-100 cursor-pointer transition-colors duration-200 text-sm font-body"> {/* Applied font-body */}
                    <span className="text-smarttendersSecondary-600">{district.name} ({district.count})</span> {/* Applied text-smarttendersSecondary-600 */}
                    <FaChevronRight className="text-smarttendersSecondary-400 text-xs" /> {/* Applied text-smarttendersSecondary-400 */}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LocationFilter;