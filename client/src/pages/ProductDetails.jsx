import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import API from '../services/api';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    API.get(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch(() => navigate('/products'))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = cart.find((item) => item.id === product._id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ id: product._id, name: product.name, price: product.price, quantity });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    navigate('/cart');
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  if (!product) return <div className="text-center py-10">Product not found</div>;

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-indigo-600 px-4 py-3 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="text-white text-xl font-bold">
            Marketplace
          </Link>
          <Link to="/products" className="text-white hover:text-indigo-200 px-3 py-2 rounded hover:bg-indigo-700 transition">
            Back to Products
          </Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
            <span className="text-gray-400 text-lg">Product Image</span>
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            <p className="text-gray-600 text-lg mb-6">
              {product.description}
            </p>
            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-3xl font-bold text-indigo-600">
                ${product.price}
              </span>
              <span className="text-gray-500">Stock: {product.stock}</span>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4">
                <label className="text-gray-700 font-medium">Quantity:</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  min="1"
                  max={product.stock}
                  className="w-20 px-3 py-2 border border-gray-300 rounded-md text-center"
                />
              </div>
            </div>

            <button
              onClick={addToCart}
              disabled={product.stock === 0}
              className={`w-full py-3 px-6 rounded-lg text-lg font-medium transition ${
                product.stock === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
