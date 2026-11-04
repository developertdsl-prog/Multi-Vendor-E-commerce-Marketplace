import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalVendors: 0,
    totalProducts: 0,
    totalOrders: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role !== 'admin') return;
    Promise.all([
      API.get('/users/'),
      API.get('/vendors/'),
      API.get('/products/'),
      API.get('/orders/'),
    ])
      .then(([usersRes, vendorsRes, productsRes, ordersRes]) => {
        setStats({
          totalUsers: usersRes.data.length || 0,
          totalVendors: vendorsRes.data.length || 0,
          totalProducts: productsRes.data.products?.length || 0,
          totalOrders: ordersRes.data.length || 0,
        });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-indigo-600 px-4 py-3 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="text-white text-xl font-bold">
            Marketplace
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
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
            <div className="text-gray-500 text-sm font-medium mb-1">Total Users</div>
            <div className="text-3xl font-bold text-gray-900">{stats.totalUsers}</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
            <div className="text-gray-500 text-sm font-medium mb-1">Total Vendors</div>
            <div className="text-3xl font-bold text-gray-900">{stats.totalVendors}</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
            <div className="text-gray-500 text-sm font-medium mb-1">Total Products</div>
            <div className="text-3xl font-bold text-gray-900">{stats.totalProducts}</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
            <div className="text-gray-500 text-sm font-medium mb-1">Total Orders</div>
            <div className="text-3xl font-bold text-gray-900">{stats.totalOrders}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">User Management</h3>
            <p className="text-gray-600 text-sm mb-4">
              Manage all marketplace users.
            </p>
            <Link
              to="/admin/users"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded text-sm font-medium inline-block transition"
            >
              Manage Users
            </Link>
          </div>
          <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Vendor Management</h3>
            <p className="text-gray-600 text-sm mb-4">
              Approve or reject vendor applications.
            </p>
            <Link
              to="/admin/vendors"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded text-sm font-medium inline-block transition"
            >
              Manage Vendors
            </Link>
          </div>
          <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Management</h3>
            <p className="text-gray-600 text-sm mb-4">
              View and manage all orders.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
