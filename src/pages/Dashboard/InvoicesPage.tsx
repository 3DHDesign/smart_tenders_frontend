import React from 'react';
import PageBanner from '../../components/shared/PageBanner';

// Mock Invoice Data
const mockInvoices = [
  { invoiceNo: 'INV-2025-001', date: '2025-06-15', package: 'Trial', amount: '0.00', extraEmail: '0.00', dueDate: '2025-07-15', total: '0.00', status: 'Paid' },
  { invoiceNo: 'INV-2025-002', date: '2025-07-01', package: 'Premium', amount: '15,000.00', extraEmail: '0.00', dueDate: '2025-08-01', total: '15,000.00', status: 'Pending' },
  { invoiceNo: 'INV-2025-003', date: '2025-05-20', package: 'Basic', amount: '0.00', extraEmail: '0.00', dueDate: '2025-06-20', total: '0.00', status: 'Expired' },
];

const InvoicesPage: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="max-w-screen-xl mx-auto  space-y-8">
      {/* Page Banner for Dashboard - Rendered here */}
      <PageBanner
        title="invoice"// Dynamic title from mockUser
        backgroundImage="/images/download.png" // Using dashboard-banner-bg.jpg as requested
      />
      </div>
      <h2 className="text-2xl font-bold font-heading text-[var(--color-dark)] mb-6">My Invoices</h2>
      
      {mockInvoices.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200 text-gray-700 text-sm font-semibold text-left font-body">
                <th className="py-3 px-4 whitespace-nowrap">Invoice No</th>
                <th className="py-3 px-4 whitespace-nowrap">Invoice Date</th>
                <th className="py-3 px-4 whitespace-nowrap">Package Detail</th>
                <th className="py-3 px-4 whitespace-nowrap">Package Amount (Rs.)</th>
                <th className="py-3 px-4 whitespace-nowrap">Extra Email (Rs.)</th>
                <th className="py-3 px-4 whitespace-nowrap">Due Date</th>
                <th className="py-3 px-4 whitespace-nowrap">Total Amount (Rs.)</th>
                <th className="py-3 px-4 whitespace-nowrap">Invoice Status</th>
                <th className="py-3 px-4 whitespace-nowrap">Pay Online</th>
              </tr>
            </thead>
            <tbody>
              {mockInvoices.map((invoice, index) => (
                <tr key={index} className="border-b border-gray-100 text-gray-800 text-sm font-body">
                  <td className="py-3 px-4 whitespace-nowrap">{invoice.invoiceNo}</td>
                  <td className="py-3 px-4 whitespace-nowrap">{invoice.date}</td>
                  <td className="py-3 px-4 whitespace-nowrap">{invoice.package}</td>
                  <td className="py-3 px-4 whitespace-nowrap">{invoice.amount}</td>
                  <td className="py-3 px-4 whitespace-nowrap">{invoice.extraEmail}</td>
                  <td className="py-3 px-4 whitespace-nowrap">{invoice.dueDate}</td>
                  <td className="py-3 px-4 whitespace-nowrap">{invoice.total}</td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold
                      ${invoice.status === 'Paid' ? 'bg-green-100 text-green-700' :
                        invoice.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'}`
                    }>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    {invoice.status === 'Pending' && (
                      <button className="bg-[var(--color-primary)] text-white px-3 py-1 rounded-md text-xs hover:bg-[var(--color-primary)]/80">Pay</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600 font-body">No invoices found.</p>
      )}
    </div>
  );
};

export default InvoicesPage;