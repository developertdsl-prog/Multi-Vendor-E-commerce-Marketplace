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
          path="/add-product"
          element={
            <VendorRoute>
              <AddProduct />
            </VendorRoute>
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
