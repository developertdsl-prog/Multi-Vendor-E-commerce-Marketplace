import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

const VendorRegister = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const vendorData = {
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
      await API.post('/vendors/register', vendorData);
      navigate('/vendor-dashboard');
    } catch (err) {
      setError(
        err.response?.data?.message || 'Vendor registration failed. Please try again.'
      );
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Register Your Store
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Create your vendor profile to start selling products.
          </p>
        </div>

        {user && user.role !== 'vendor' && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            Your account role is set to {user.role}. Please register as a vendor to create a store.
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label htmlFor="storeName" className="block text-sm font-medium text-gray-700">
              Store Name
            </label>
            <input
              id="storeName"
              name="storeName"
              type="text"
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
              required
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
              required
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="addressStreet" className="block text-sm font-medium text-gray-700">
              Street Address
            </label>
            <input
              id="addressStreet"
              name="addressStreet"
              type="text"
              required
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="addressCity" className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                id="addressCity"
                name="addressCity"
                type="text"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="addressState" className="block text-sm font-medium text-gray-700">
                State
              </label>
              <input
                id="addressState"
                name="addressState"
                type="text"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="addressZipCode" className="block text-sm font-medium text-gray-700">
                ZIP Code
              </label>
              <input
                id="addressZipCode"
                name="addressZipCode"
                type="text"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="addressCountry" className="block text-sm font-medium text-gray-700">
                Country
              </label>
              <input
                id="addressCountry"
                name="addressCountry"
                type="text"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {loading ? 'Registering...' : 'Register Store'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VendorRegister;
