import React from 'react';
import { Link } from 'react-router-dom';

// Reusing mock tender data for the wishlist
const mockWishlistTenders = [
  {
    id: 'wishlist-1',
    title: 'Supply of Office Furniture (Modern Design)',
    organization: 'Furniture Solutions Ltd.',
    category: 'Office Supplies',
    location: 'Western Province, Colombo',
    closingDate: '25th July 2025',
    referenceNo: 'OF00123',
    isTodayTender: false,
    closingInDays: 20,
  },
  {
    id: 'wishlist-2',
    title: 'IT Network Infrastructure Upgrade',
    organization: 'Tech Innovations Inc.',
    category: 'IT Services',
    location: 'Central Province, Kandy',
    closingDate: '10th August 2025',
    referenceNo: 'ITN456',
    isTodayTender: false,
    closingInDays: 36,
  },
];

const WishlistPage: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold font-heading text-[var(--color-dark)] mb-6">My Wishlist</h2>
      
      {mockWishlistTenders.length > 0 ? (
        <div className="space-y-6">
          {mockWishlistTenders.map(tender => (
            <div key={tender.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100
                                           hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out">
              <h3 className="text-xl font-bold font-heading text-[var(--color-dark)] mb-3 leading-tight">
                {tender.title}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 text-gray-700 text-sm mb-4 font-body">
                <div><span className="font-semibold text-[var(--color-dark)]">Category:</span> {tender.category}</div>
                <div><span className="font-semibold text-[var(--color-dark)]">Organization:</span> {tender.organization}</div>
                <div><span className="font-semibold">Location:</span> {tender.location}</div>
                <div><span className="font-semibold">Closing Date:</span> {tender.closingDate}</div>
                <div><span className="font-semibold">Reference No:</span> {tender.referenceNo}</div>
              </div>
              <div className="flex flex-wrap justify-between items-center mt-4 pt-4 border-t border-gray-100">
                {tender.isTodayTender && (
                  <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full font-body inline-block mb-2 sm:mb-0">
                    Today's Tender
                  </span>
                )}
                <span className="text-sm text-[var(--color-dark)] font-semibold font-body inline-block mb-2 sm:mb-0">
                  Tender Closing in: {tender.closingInDays} Day{tender.closingInDays !== 1 ? 's' : ''}
                </span>
                <Link
                  to={`/tenders/${tender.id}`}
                  className="bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/80 shadow-md inline-block text-sm py-2 px-4 rounded-md"
                >
                  View Tender
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 font-body">Your wishlist is empty. Start exploring tenders!</p>
      )}
    </div>
  );
};

export default WishlistPage;