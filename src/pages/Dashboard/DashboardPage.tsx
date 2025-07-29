import React, { useEffect, useState } from "react";
import { FiMail, FiCheckCircle, FiPhone, FiHome, FiGlobe, FiMapPin, FiPackage } from "react-icons/fi"; // Added more icons
import PageBanner from "../../components/shared/PageBanner";
import Button from "../../components/shared/Button";
import {
  getDashboardData,
  type UserDetails,
  type UserMail,
  type Payment, 
} from "../../services/userService";

const DashboardPage: React.FC = () => {
  const [user, setUser] = useState<UserDetails | null>(null);
  const [emails, setEmails] = useState<UserMail[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getDashboardData();
        setUser(res);
        setEmails(res.user_mails);
      } catch (err) {
        console.error(err);
        // Optionally, show an error message to the user
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const handleEmailChange = (id: number, value: string) => {
    setEmails(prev =>
      prev.map(email => (email.id === id ? { ...email, email: value } : email))
    );
  };

  const handleSaveEmail = (id: number) => {
    const email = emails.find(e => e.id === id);
    if (email) {
      alert(`Email saved: ${email.email}`);
      // In a real application, you would send this to your backend
    }
  };

  const getMeta = (key: string): string => {
    return user?.metas.find(m => m.key === key)?.value || "N/A"; // Changed default to N/A
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-xl font-medium text-gray-500 animate-pulse">Loading dashboard...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-xl font-medium text-red-600">Failed to load user data. Please try again.</div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto p-4 sm:p-6 lg:p-8 space-y-10">
      <PageBanner
        title={`Hello, ${user.name}!`} 
        backgroundImage="/images/download.png"
      />

      {/* Profile & Package Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-center gap-6 md:gap-8 border border-gray-100">
        <img
          src={user.avatar_url}
          alt={user.name}
          className="w-28 h-28 rounded-full border-4 border-teal-400 object-cover shadow-md"
        />
        <div className="flex-grow space-y-2 text-center md:text-left">
          <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
          <p className="text-base text-gray-600 flex items-center justify-center md:justify-start gap-2">
            <FiMail className="text-teal-500 text-lg" />
            {user.email}
          </p>
          <p className="text-sm text-gray-500">Ref No: <span className="font-semibold">{user.reference_code}</span></p>
          <p className="text-sm text-gray-500">Status: <span className="font-semibold text-green-600">{user.status}</span></p>
        </div>
        <div className="text-center bg-teal-50 rounded-xl px-5 py-3 border border-teal-100 shadow-sm flex flex-col items-center">
          <FiPackage className="text-teal-600 text-3xl mb-1" />
          <p className="text-sm text-gray-700">Current Plan</p>
          <p className="text-xl font-bold text-teal-700 mt-1">{user.user_package.package.name}</p>
          <p className="text-sm text-gray-600 mt-1">Expires: <span className="font-medium">{user.user_package.expiration_date}</span></p>
        </div>
      </div>

      {/* Contact Information Section */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-gray-100">
        <h3 className="text-2xl font-semibold mb-5 text-gray-800">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-gray-700">
          <p className="flex items-center gap-3 text-lg"><FiPhone className="text-blue-500" /> <strong>Phone:</strong> {getMeta("phone")}</p>
          <p className="flex items-center gap-3 text-lg"><FiHome className="text-blue-500" /> <strong>Address:</strong> {getMeta("address")}</p>
          <p className="flex items-center gap-3 text-lg"><FiGlobe className="text-blue-500" /> <strong>Country:</strong> {getMeta("country")}</p>
          <p className="flex items-center gap-3 text-lg"><FiMapPin className="text-blue-500" /> <strong>Province:</strong> {getMeta("province")}</p>
          <p className="flex items-center gap-3 text-lg"><FiMapPin className="text-blue-500" /> <strong>District:</strong> {getMeta("district")}</p>
        </div>
      </div>

      {/* Preferred Categories Section */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-gray-100">
        <h3 className="text-2xl font-semibold mb-5 text-gray-800">Preferred Categories</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {user.categories.map(cat => (
            <div
              key={cat.id}
              className="bg-gray-50 rounded-xl p-4 flex flex-col items-center justify-center text-center gap-2 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
            >
              <img src={cat.icon_url} alt={cat.name} className="w-12 h-12 object-contain mb-2" />
              <p className="font-semibold text-sm text-gray-800">{cat.name}</p>
              <p className="text-xs text-gray-500">{cat.tender_count} Tenders</p>
            </div>
          ))}
        </div>
      </div> 

      {/* Tender Notification Emails Section */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-gray-100">
        <h3 className="text-2xl font-semibold mb-5 text-gray-800">Tender Notification Emails</h3>
        <div className="space-y-4">
          {emails.map(email => (
            <div key={email.id} className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-grow w-full">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email" // Added type for better validation
                  value={email.email}
                  onChange={(e) => handleEmailChange(email.id, e.target.value)}
                  className="flex-grow w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 text-gray-700"
                  placeholder="Enter email address"
                />
              </div>
              <Button
                label={<span className="flex gap-2 items-center text-base"><FiCheckCircle /> Save</span>}
                className="w-full sm:w-auto px-6 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg shadow-md transition-colors duration-200 font-medium"
                onClick={() => handleSaveEmail(email.id)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Payment History Section */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-gray-100">
        <h3 className="text-2xl font-semibold mb-5 text-gray-800">Payment History</h3>
        {user.payments.length === 0 ? (
          <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-200">
            <p className="text-lg">No payments made yet.</p>
            <p className="text-sm mt-2">Your payment history will appear here once you make a transaction.</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
            <table className="min-w-full text-sm text-left divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th scope="col" className="p-4 font-semibold text-gray-700 uppercase tracking-wider">Date</th>
                  <th scope="col" className="p-4 font-semibold text-gray-700 uppercase tracking-wider">Type</th>
                  <th scope="col" className="p-4 font-semibold text-gray-700 uppercase tracking-wider">Amount</th>
                  <th scope="col" className="p-4 font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                  <th scope="col" className="p-4 font-semibold text-gray-700 uppercase tracking-wider">Transaction ID</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {user.payments.map((p: Payment) => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="p-4 text-gray-700">{p.created_at_human}</td>
                    <td className="p-4 text-gray-700">{p.payment_type}</td>
                    <td className="p-4 text-gray-700 font-medium">Rs. {p.amount}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        p.status === "completed" ? "bg-green-100 text-green-800" :
                        p.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                        "bg-red-100 text-red-800"
                      }`}>
                        {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                      </span>
                    </td>
                    <td className="p-4 text-gray-600 font-mono">{p.transaction_id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;