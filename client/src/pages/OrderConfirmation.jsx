import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const OrderConfirmation = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-indigo-600 px-4 py-3 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="text-white text-xl font-bold">
            Marketplace
          </Link>
        </div>
      </nav>

      <div className="max-w-md mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-green-100 p-6 rounded-full inline-block mb-6">
          <svg className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Placed!</h1>
        <p className="text-gray-600 mb-8">
          Thank you for your purchase. Your order has been confirmed.
        </p>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Order Summary</h3>
          <p className="text-gray-600 mb-2">Order #MV-2026-0001</p>
          <p className="text-gray-600 mb-2">Status: Confirmed</p>
          <p className="text-gray-600">Estimated delivery: 3-5 business days</p>
        </div>
        <Link
          to="/products"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium inline-block transition"
        >
          Continue Shopping
        </Link>
        <button
          onClick={() => navigate('/orders')}
          className="mt-4 text-indigo-600 hover:text-indigo-700 font-medium"
        >
          View My Orders
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
