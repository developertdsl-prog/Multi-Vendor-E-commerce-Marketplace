import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Home = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="bg-indigo-600 px-4 py-3 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="text-white text-xl font-bold">
            Marketplace
          </Link>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-white text-sm">
                  Welcome, {user.name} ({user.role})
                </span>
                <button
                  onClick={logout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-medium transition"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-white hover:text-indigo-200 px-3 py-2 rounded hover:bg-indigo-700 transition">
                  Sign in
                </Link>
                <Link to="/register" className="bg-white text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded text-sm font-medium transition">
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="bg-indigo-50 py-12 px-4 text-center">
        <h1 className="text-4xl font-bold text-indigo-900 mb-4">
          Multi-Vendor E-commerce Marketplace
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Buy and sell products from multiple vendors in one place.
        </p>
        {!user && (
          <div className="space-y-2">
            <Link to="/register" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold inline-block transition">
              Get Started
            </Link>
            <Link to="/login" className="text-indigo-600 hover:text-indigo-800 font-medium inline-block">
              Already have an account? Sign in
            </Link>
          </div>
        )}
        {user && (
          <div className="space-y-2">
            {user.role === 'vendor' && (
              <Link to="/vendor-dashboard" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold inline-block transition">
                Vendor Dashboard
              </Link>
            )}
            {user.role === 'admin' && (
              <Link to="/admin-dashboard" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold inline-block transition">
                Admin Dashboard
              </Link>
            )}
            {user.role === 'customer' && (
              <Link to="/products" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold inline-block transition">
                Browse Products
              </Link>
            )}
          </div>
        )}
      </header>

      {/* Features */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">For Customers</h3>
              <p className="text-gray-600">Browse, search, and purchase products from multiple vendors.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">For Vendors</h3>
              <p className="text-gray-600">Create your store, manage products and orders.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">For Admins</h3>
              <p className="text-gray-600">Manage users, vendors, products, and orders.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
