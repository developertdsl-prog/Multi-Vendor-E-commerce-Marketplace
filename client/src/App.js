import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import VendorRegister from './pages/VendorRegister';
import VendorDashboard from './pages/VendorDashboard';
import StoreProfile from './pages/StoreProfile';
import ProductList from './pages/ProductList';
import ProductDetails from './pages/ProductDetails';
import AddProduct from './pages/AddProduct';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import Orders from './pages/Orders';
import VendorOrders from './pages/VendorOrders';
import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/AdminUsers';
import AdminVendors from './pages/AdminVendors';

const Loading = () => <div className="flex items-center justify-center min-h-screen">Loading...</div>;

const ProtectedRoute = ({ element }) => {
  const { user, loading } = useAuth();
  if (loading) return <Loading />;
  return user ? element : <Navigate to="/login" replace />;
};

const VendorRoute = ({ element }) => {
  const { user, loading } = useAuth();
  if (loading) return <Loading />;
  if (!user || user.role !== 'vendor') return <Navigate to="/login" replace />;
  return element;
};

const AdminRoute = ({ element }) => {
  const { user, loading } = useAuth();
  if (loading) return <Loading />;
  if (!user || user.role !== 'admin') return <Navigate to="/login" replace />;
  return element;
};

const AppWithAuth = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<ProtectedRoute element={<Checkout />} />} />
        <Route
          path="/order-confirmation"
          element={<ProtectedRoute element={<OrderConfirmation />} />}
        />
        <Route path="/orders" element={<ProtectedRoute element={<Orders />} />} />

        <Route
          path="/vendor-register"
          element={
            <VendorRoute>
              <VendorRegister />
            </VendorRoute>
          }
        />
        <Route
          path="/vendor-dashboard"
          element={
            <VendorRoute>
              <VendorDashboard />
            </VendorRoute>
          }
        />
        <Route
          path="/store-profile"
          element={
            <VendorRoute>
              <StoreProfile />
            </VendorRoute>
          }
        />
        <Route
          path="/vendor-orders"
          element={
            <VendorRoute>
              <VendorOrders />
            </VendorRoute>
          }
        />
        <Route
          path="/add-product"
          element={
            <VendorRoute>
              <AddProduct />
            </VendorRoute>
          }
        />

        <Route
          path="/admin-dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <AdminUsers />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/vendors"
          element={
            <AdminRoute>
              <AdminVendors />
            </AdminRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <div className="p-4">Dashboard - protected area</div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppWithAuth />
      </CartProvider>
    </AuthProvider>
  );
}
