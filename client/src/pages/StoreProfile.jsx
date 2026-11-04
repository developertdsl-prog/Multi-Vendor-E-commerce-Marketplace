import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../services/api';

const StoreProfile = () => {
  const { user } = useAuth();
  const [vendor, setVendor] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/vendors/profile')
      .then((res) => setVendor(res.data))
      .catch(() => setVendor(null))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const updates = {
      storeName: formData.get('storeName'),
      storeDescription: formData.get('storeDescription'),
      contactEmail: formData.get('contactEmail'),
      contactPhone: formData.get('contactPhone'),
      address: {
        street: formData.get('addressStreet'),
        city: formData.get('addressCity'),
        state: formData.get('addressState'),
        zipCode: formData.get('addressZipCode'),
        country: formData.get('addressCountry'),
      },
    };

    try {
      await API.put('/vendors/profile', updates);
      setError('Store information updated successfully!');
    } catch (err) {
      setError(
        err.response?.data?.message || 'Failed to update store information.'
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading || !vendor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        Loading store profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-indigo-600 px-4 py-3 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="/" className="text-white text-xl font-bold">
            Marketplace
          </a>
          <div className="flex items-center space-x-4">
            <span className="text-white text-sm">{user?.name}</span>
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-medium transition">
              Sign out
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Store Profile</h1>

        {error && (
          <div
            className={`mb-6 p-4 rounded ${
              error.includes('successfully') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
            }`}
          >
            {error}
          </div>
        )}

        <form className="bg-white p-6 rounded-lg shadow border border-gray-100 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label htmlFor="storeName" className="block text-sm font-medium text-gray-700">
              Store Name
            </label>
            <input
              id="storeName"
              name="storeName"
              type="text"
              defaultValue={vendor.storeName}
              required
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="storeDescription" className="block text-sm font-medium text-gray-700">
              Store Description
            </label>
            <textarea
              id="storeDescription"
              name="storeDescription"
              rows={3}
              defaultValue={vendor.storeDescription}
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">
              Contact Email
            </label>
            <input
              id="contactEmail"
              name="contactEmail"
              type="email"
              defaultValue={vendor.contactEmail}
              required
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700">
              Contact Phone
            </label>
            <input
              id="contactPhone"
              name="contactPhone"
              type="tel"
              defaultValue={vendor.contactPhone}
              required
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="addressStreet" className="block text-sm font-medium text-gray-700">
                Street Address
              </label>
              <input
                id="addressStreet"
                name="addressStreet"
                type="text"
                defaultValue={vendor.address?.street || ''}
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="addressCity" className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                id="addressCity"
                name="addressCity"
                type="text"
                defaultValue={vendor.address?.city || ''}
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="addressState" className="block text-sm font-medium text-gray-700">
                State
              </label>
              <input
                id="addressState"
                name="addressState"
                type="text"
                defaultValue={vendor.address?.state || ''}
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="addressZipCode" className="block text-sm font-medium text-gray-700">
                ZIP Code
              </label>
              <input
                id="addressZipCode"
                name="addressZipCode"
                type="text"
                defaultValue={vendor.address?.zipCode || ''}
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="addressCountry" className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <input
              id="addressCountry"
              name="addressCountry"
              type="text"
              defaultValue={vendor.address?.country || ''}
              required
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {loading ? 'Updating...' : 'Update Store Information'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StoreProfile;
