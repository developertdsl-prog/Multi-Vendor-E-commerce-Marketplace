import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const { cart, removeItem, updateQuantity, clearCart, cartTotal, cartItemCount } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <nav className="bg-indigo-600 px-4 py-3 shadow-md">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link to="/" className="text-white text-xl font-bold">
              Marketplace
            </Link>
            <Link to="/products" className="text-white hover:text-indigo-200 px-3 py-2 rounded hover:bg-indigo-700 transition">
              Continue Shopping
            </Link>
          </div>
        </nav>

        <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Looks like you haven't added any items yet.</p>
          <Link
            to="/products"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium inline-block transition"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-indigo-600 px-4 py-3 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="text-white text-xl font-bold">
            Marketplace
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/products" className="text-white hover:text-indigo-200 px-3 py-2 rounded hover:bg-indigo-700 transition">
              Continue Shopping
            </Link>
            {user && (
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-medium transition">
                Sign out
              </button>
            )}
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 lg:w-3/4">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Shopping Cart</h1>
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="bg-white p-4 rounded-lg shadow border border-gray-100 flex items-center gap-4">
                  <div className="h-20 w-20 bg-gray-100 rounded-md flex-shrink-0 flex items-center justify-center">
                    <span className="text-gray-400 text-sm">Img</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-gray-600 text-sm">$${item.price} each</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1 border border-gray-300 rounded text-gray-600 hover:bg-gray-50"
                    >
                      −
                    </button>
                    <span className="font-medium w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1 border border-gray-300 rounded text-gray-600 hover:bg-gray-50"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/4">
            <div className="bg-gray-50 p-6 rounded-lg shadow border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cartItemCount} items)</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-gray-900 font-bold border-t pt-3">
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={() => {
                  if (!user) {
                    navigate('/login');
                  } else {
                    navigate('/checkout');
                  }
                }}
                disabled={!user}
                className={`w-full py-3 px-4 rounded-lg text-lg font-medium transition ${
                  !user
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                {!user ? 'Please sign in to checkout' : 'Proceed to Checkout'}
              </button>
              <button
                onClick={clearCart}
                className="mt-3 w-full py-2 px-4 border border-gray-300 rounded-lg text-gray-600 font-medium hover:bg-gray-50 transition"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
