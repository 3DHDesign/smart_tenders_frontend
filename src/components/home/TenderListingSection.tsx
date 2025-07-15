import React, { useState, useMemo } from 'react'; // useMemo for filtering
import { Link } from 'react-router-dom';
import Button from '../shared/Button';

// Import all necessary icons for both sections
import { FaMapMarkerAlt, FaChevronDown, FaChevronRight, FaThList } from 'react-icons/fa';

// Mock tender data (same as before)
const allMockTenders = [ // Renamed to allMockTenders as we'll filter this
  {
    id: 'tender-1',
    title: 'Bids for Brand New Generators (450 kVA, 150 kVA, 60 kVA)',
    organization: 'Login to view Organization',
    category: 'Generators',
    source: 'Login to view',
    location: 'Western Province, Colombo',
    publishedDate: 'Login to view',
    closingDate: '7th July 2025',
    referenceNo: 'G029741',
    isTodayTender: true,
    closingInDays: 9, // Will be green/default
  },
  {
    id: 'tender-2',
    title: 'Providing a Vehicle on a Monthly Rental Basis',
    organization: 'Login to view Organization',
    category: 'Rent A Car Services',
    source: 'Login to view',
    location: 'Eastern Province, Ampara',
    publishedDate: 'Login to view',
    closingDate: '11th July 2025',
    referenceNo: 'G029727',
    isTodayTender: true,
    closingInDays: 2, // Will be red
  },
  {
    id: 'tender-3',
    title: 'Supply of Medical Equipment for District Hospital',
    organization: 'Login to view Organization',
    category: 'Medical Supplies',
    source: 'Login to view',
    location: 'Southern Province, Galle',
    publishedDate: '28th June 2025',
    closingDate: '20th July 2025',
    referenceNo: 'M012345',
    isTodayTender: false,
    closingInDays: 0, // Will be red (expired/today)
  },
  {
    id: 'tender-4',
    title: 'Construction of New Bridge',
    organization: 'Govt. Works Dept.',
    category: 'Infrastructure',
    source: 'Public Gazette',
    location: 'Northern Province, Jaffna',
    publishedDate: '1st July 2025',
    closingDate: '15th July 2025',
    referenceNo: 'NB001',
    isTodayTender: false,
    closingInDays: 7, // Will be green/default
  },
  {
    id: 'tender-5',
    title: 'Software Development for CRM',
    organization: 'Tech Innovations',
    category: 'IT & Software',
    source: 'Company Website',
    location: 'Western Province, Colombo',
    publishedDate: '5th July 2025',
    closingDate: '10th July 2025',
    referenceNo: 'CRM005',
    isTodayTender: false,
    closingInDays: 1, // Will be red
  },
];

// Data for Sri Lankan Provinces and Districts (from ContactDetailsStep)
const sriLankanLocations = [
  {
    province: "Western Province", count: 21144,
    districts: [
      { name: "Colombo" }, { name: "Gampaha" }, { name: "Kalutara" }
    ].sort((a, b) => a.name.localeCompare(b.name)),
  },
  {
    province: "Central Province", count: 1785,
    districts: [
      { name: "Kandy" }, { name: "Nuwara Eliya" }, { name: "Matale" }
    ].sort((a, b) => a.name.localeCompare(b.name)),
  },
  {
    province: "Southern Province", count: 1270,
    districts: [
      { name: "Galle" }, { name: "Matara" }, { name: "Hambantota" }
    ].sort((a, b) => a.name.localeCompare(b.name)),
  },
  {
    province: "Eastern Province", count: 1102,
    districts: [
      { name: "Ampara" }, { name: "Batticaloa" }, { name: "Trincomalee" }
    ].sort((a, b) => a.name.localeCompare(b.name)),
  },
  {
    province: "Northern Province", count: 1094,
    districts: [
      { name: "Jaffna" }, { name: "Kilinochchi" }, { name: "Mannar" },
      { name: "Mullaitivu" }, { name: "Vavuniya" }
    ].sort((a, b) => a.name.localeCompare(b.name)),
  },
  {
    province: "North Western Province", count: 1043,
    districts: [
      { name: "Kurunegala" }, { name: "Puttalam" }
    ].sort((a, b) => a.name.localeCompare(b.name)),
  },
  {
    province: "North Central Province", count: 787,
    districts: [
      { name: "Anuradhapura" }, { name: "Polonnaruwa" }
    ].sort((a, b) => a.name.localeCompare(b.name)),
  },
  {
    province: "Sabaragamuwa Province", count: 750,
    districts: [
      { name: "Kegalle" }, { name: "Ratnapura" }
    ].sort((a, b) => a.name.localeCompare(b.name)),
  },
  {
    province: "Uva Province", count: 731,
    districts: [
      { name: "Badulla" }, { name: "Monaragala" }
    ].sort((a, b) => a.name.localeCompare(b.name)),
  },
];

// Mock data for tender categories (same as before)
const tenderCategories = [
  { name: 'Construction', count: 5401 },
  { name: 'Registration of Suppliers', count: 2790 },
  { name: 'Computer & IT', count: 2684 },
  { name: 'Unclassified', count: 2283 },
  { name: 'Electrical', count: 2116 },
  { name: 'Electronics', count: 1572 },
  { name: 'Cleaning & Janitorial Services', count: 1441 },
  { name: 'Medical & Pharmaceuticals', count: 1432 },
  { name: 'Manpower & Security Services', count: 1289 },
  { name: 'Hardware', count: 1241 },
  { name: 'Vehicles, Auto Parts & Services', count: 1072 },
  { name: 'Printing & Advertising', count: 936 },
  { name: 'Transport & Rent A Car Services', count: 685 },
];


const TenderListingSection: React.FC = () => {
  const [openProvinces, setOpenProvinces] = useState<{ [key: string]: boolean }>({});
  const [activeFilter, setActiveFilter] = useState('all'); // State for active filter

  const toggleProvince = (provinceName: string) => {
    setOpenProvinces(prev => ({
      ...prev,
      [provinceName]: !prev[provinceName]
    }));
  };

  // Filter tenders based on activeFilter
  const filteredTenders = useMemo(() => {
    const now = new Date();
    return allMockTenders.filter(tender => {
      if (activeFilter === 'all') return true;
      if (activeFilter === 'today') return tender.isTodayTender;
      if (activeFilter === 'live') return tender.closingInDays > 0; // Assuming live means not yet closed
      if (activeFilter === 'closed') return tender.closingInDays <= 0; // Assuming closed means 0 or negative days
      return true;
    });
  }, [activeFilter]);


  // Function to determine text color for closing date
  const getClosingDateColor = (days: number) => {
    if (days <= 2) { // Less than or equal to 2 days remaining (or expired)
      return 'text-[var(--color-accent-red)]'; // Use accent red
    } else if (days <= 10) { // 3 to 10 days remaining
      return 'text-[var(--color-accent-orange-dark)]'; // Use accent orange
    }
    return 'text-gray-700'; // Default color
  };

  return (
    <section className="bg-gray-50 py-8 sm:py-10 lg:py-12 wide-container">
      <div className="container mx-auto">
        {/* Top Stats Bar - KEY FIX: Redesigned and made clickable */}
        <div className="grid grid-cols-2 sm:grid-cols-4 bg-white rounded-lg shadow-md mb-8 border border-gray-100 overflow-hidden">
          {['all', 'today', 'live', 'closed'].map(filterKey => {
            const item = {
              label: filterKey === 'all' ? 'All Tenders' :
                     filterKey === 'today' ? "Today's Tenders" :
                     filterKey === 'live' ? 'Live Tenders' : 'Closed Tenders',
              count: allMockTenders.filter(tender => { // Calculate counts dynamically
                if (filterKey === 'all') return true;
                if (filterKey === 'today') return tender.isTodayTender;
                if (filterKey === 'live') return tender.closingInDays > 0;
                if (filterKey === 'closed') return tender.closingInDays <= 0;
                return true;
              }).length,
              filter: filterKey
            };

            return (
              <div
                key={item.filter}
                className={`flex flex-col items-center p-4 cursor-pointer transition-all duration-200 border-r border-gray-100 last:border-r-0
                            ${activeFilter === item.filter ? 'bg-[var(--color-primary)] text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                onClick={() => setActiveFilter(item.filter)}
              >
                <span className={`text-2xl font-bold font-heading mb-1 ${activeFilter === item.filter ? 'text-white' : 'text-[var(--color-dark)]'}`}>
                  {item.count}
                </span>
                <span className={`text-sm font-body ${activeFilter === item.filter ? 'text-white' : 'text-gray-600'}`}>
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>


        {/* Main Content Area: Sidebar and Tender List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Upload Your Tenders FREE CTA */}
            <div className="bg-[var(--color-dark)] text-white p-6 rounded-lg text-center shadow-md">
              <p className="text-lg font-semibold font-body mb-3">To Be Connect with Buyer's & Supplies</p>
              <h3 className="text-2xl font-bold font-heading mb-4">Upload Your Tenders FREE</h3>
              <Button label="Upload Tenders Now" className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/80" />
            </div>

            {/* Registration of Suppliers Button - KEY FIX: Used accent-orange-dark */}
            <Button label="Registration of Suppliers (2790)" className="w-full bg-[var(--color-accent-orange-dark)] hover:bg-[var(--color-accent-orange-dark)]/80 text-white shadow-md py-3 text-lg font-semibold" />

            {/* Tenders By Categories Filter (Embedded) */}
            <div className="bg-white rounded-lg shadow-md mb-6">
                <div className="p-4 border-b border-gray-200 flex items-center space-x-2 text-[var(--color-dark)] font-semibold text-lg font-heading">
                    <FaThList className="text-[var(--color-primary)]" />
                    <span>Tenders By Categories</span>
                </div>
                <ul className="divide-y divide-gray-100">
                    {tenderCategories.map((category, index) => (
                    <li key={index}>
                        <div className="flex justify-between items-center p-3 hover:bg-gray-50 cursor-pointer transition-colors duration-200">
                        <span className="text-[var(--color-dark)] font-medium font-body">{category.name} ({category.count})</span>
                        <FaChevronRight className="text-gray-500" />
                        </div>
                    </li>
                    ))}
                </ul>
            </div>

            {/* Tenders By Locations Filter (Embedded) */}
            <div className="bg-white rounded-lg shadow-md mb-6">
                <div className="p-4 border-b border-gray-200 flex items-center space-x-2 text-[var(--color-dark)] font-semibold text-lg font-heading">
                    <FaMapMarkerAlt className="text-[var(--color-primary)]" />
                    <span>Tenders By Locations</span>
                </div>
                <ul className="divide-y divide-gray-100">
                    {sriLankanLocations.map((location, index) => (
                    <li key={index}>
                        <div
                        className="flex justify-between items-center p-3 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                        onClick={() => location.districts && location.districts.length > 0 && toggleProvince(location.province)}
                        >
                        <span className="text-[var(--color-dark)] font-medium font-body">{location.province} ({location.count})</span>
                        {location.districts && location.districts.length > 0 && (
                            openProvinces[location.province] ? <FaChevronDown className="text-gray-500" /> : <FaChevronRight className="text-gray-500" />
                        )}
                        </div>
                        {location.districts && location.districts.length > 0 && openProvinces[location.province] && (
                        <ul className="bg-gray-50 border-t border-gray-100">
                            {location.districts.map((district, distIndex) => (
                            <li key={distIndex} className="flex justify-between items-center p-2 pl-8 hover:bg-gray-100 cursor-pointer transition-colors duration-200 text-sm font-body">
                                <span className="text-gray-600">{district.name} ({district.count})</span>
                                <FaChevronRight className="text-gray-400 text-xs" />
                            </li>
                            ))}
                        </ul>
                        )}
                    </li>
                    ))}
                </ul>
            </div>
          </div>

          {/* Right Main Tender List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="text-sm text-gray-600 mb-4 font-body">
              Showing 1 - {filteredTenders.length} of {allMockTenders.length} total tenders
            </div>

            {filteredTenders.map(tender => (
              <div key={tender.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100
                                             hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out">
                <h2 className="text-xl font-bold font-heading text-[var(--color-dark)] mb-3 leading-tight">
                  {tender.title}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 text-gray-700 text-sm mb-4 font-body">
                  <div><span className="font-semibold text-[var(--color-dark)]">Category:</span> {tender.category}</div>
                  <div><span className="font-semibold text-[var(--color-dark)]">Source:</span> {tender.source}</div>
                  <div><span className="font-semibold">Location:</span> {tender.location}</div>
                  <div><span className="font-semibold">Published Date:</span> {tender.publishedDate}</div>
                  <div><span className="font-semibold">Closing Date:</span> {tender.closingDate}</div>
                  <div><span className="font-semibold">Reference No:</span> {tender.referenceNo}</div>
                </div>
                <div className="flex flex-wrap justify-between items-center mt-4 pt-4 border-t border-gray-100">
                  {tender.isTodayTender && (
                    <span className="bg-[var(--color-accent-green)] text-white text-xs font-semibold px-3 py-1 rounded-full font-body inline-block mb-2 sm:mb-0">
                      Today's Tender
                    </span>
                  )}
                  {/* KEY FIX: Conditional text color for Tender Closing in */}
                  <span className={`text-sm font-semibold font-body inline-block mb-2 sm:mb-0 ${getClosingDateColor(tender.closingInDays)}`}>
                    Tender Closing in: {tender.closingInDays} Day{tender.closingInDays !== 1 ? 's' : ''}
                  </span>
                  <Button
                    label="Click To View"
                    className="bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/80 shadow-md inline-block text-sm py-2 px-4 rounded-md"
                    onClick={() => console.log(`Navigating to tender ${tender.id}`)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TenderListingSection;