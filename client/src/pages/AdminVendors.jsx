import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';

const AdminVendors = () => {
  const { user } = useAuth();
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role !== 'admin') return;
    API.get('/vendors/')
      .then((res) => setVendors(res.data || []))
      .catch(() => setVendors([]))
      .finally(() => setLoading(false));
  }, [user]);

  const approveVendor = async (vendorId, status) => {
    try {
      await API.put(`/vendors/${vendorId}/approve`, { approvalStatus: status });
      setVendors((prev) =>
        prev.map((v) =>
          v._id === vendorId
            ? { ...v, approvalStatus: status, isActive: status === 'approved' }
            : v
        )
      );
    } catch (err) {
      alert('Failed to update vendor status');
    }
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-indigo-600 px-4 py-3 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/admin-dashboard" className="text-white text-xl font-bold">
            Admin Panel
          </Link>
          <div className="flex items-center space-x-4">
            <span className="text-white text-sm">{user?.name} (Admin)</span>
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-medium transition">
              Sign out
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Vendor Management</h1>

        <div className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-sm font-semibold text-gray-900">Store Name</th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-900">Owner</th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-900">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {vendors.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-600">
                    No vendors found.
                  </td>
                </tr>
              ) : (
                vendors.map((v) => (
                  <tr key={v._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {v.storeName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {v.user?.name || 'Unknown'} ({v.user?.email || 'N/A'})
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          v.approvalStatus === 'approved'
                            ? 'bg-green-100 text-green-700'
                            : v.approvalStatus === 'rejected'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {v.approvalStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {v.approvalStatus === 'pending' ? (
                        <>
                          <button
                            onClick={() => approveVendor(v._id, 'approved')}
                            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium mr-4"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => approveVendor(v._id, 'rejected')}
                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                          >
                            Reject
                          </button>
                        </>
                      ) : (
                        <span className="text-gray-400 text-sm">—</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminVendors;
