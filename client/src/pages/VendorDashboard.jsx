import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../services/api';

const VendorDashboard = () => {
  const { user } = useAuth();
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/vendors/profile')
      .then((res) => setVendor(res.data))
      .catch(() => setVendor(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading vendor dashboard...
      </div>
    );
  }

  if (!vendor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
        <div className="max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Vendor Registration Required</h2>
          <p className="text-gray-600 mb-6">
            You need to register your store before accessing the vendor dashboard.
          </p>
          <Link
            to="/vendor-register"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold inline-block transition"
          >
            Register Store
          </Link>
        </div>
      </div>
    );
  }

  const isApproved = vendor.approvalStatus === 'approved';

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-indigo-600 px-4 py-3 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="text-white text-xl font-bold">
            Marketplace
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/vendor-orders" className="text-white hover:text-indigo-200 px-3 py-2 rounded hover:bg-indigo-700 transition">
              Orders
            </Link>
            <span className="text-white text-sm">
              {user?.name} - {vendor.storeName}
            </span>
            <span
              className={`px-2 py-1 rounded text-xs font-medium ${
                isApproved
                  ? 'bg-green-100 text-green-700'
                  : 'bg-yellow-100 text-yellow-700'
              }`}
            >
              {isApproved ? 'Approved' : 'Pending Approval'}
            </span>
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-medium transition">
              Sign out
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Vendor Dashboard - {vendor.storeName}
        </h1>

        {!isApproved && (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded mb-6">
            Your store is pending admin approval. You will be notified once approved.
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Store Name</h3>
            <p className="text-gray-600">{vendor.storeName}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
            <p className="text-gray-600">{vendor.storeDescription || 'No description'}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Status</h3>
            <p className={`text-gray-600 ${isApproved ? 'text-green-600' : 'text-yellow-600'}`}>
              {vendor.approvalStatus}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Contact Email</h3>
            <p className="text-gray-600">{vendor.contactEmail}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Contact Phone</h3>
            <p className="text-gray-600">{vendor.contactPhone}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Products</h3>
            <p className="text-gray-600">Manage via Add Product</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
