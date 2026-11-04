import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, [keyword, selectedCategory, minPrice, maxPrice]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (keyword) params.append('keyword', keyword);
      if (selectedCategory) params.append('category', selectedCategory);
      if (minPrice) params.append('minPrice', minPrice);
      if (maxPrice) params.append('maxPrice', maxPrice);

      const res = await API.get(`/products?${params.toString()}`);
      setProducts(res.data.products);
      setPages(res.data.pages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    API.get('/products/categories').then((res) => setCategories(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-indigo-600 px-4 py-3 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="text-white text-xl font-bold">
            Marketplace
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/products" className="text-white hover:text-indigo-200 px-3 py-2 rounded hover:bg-indigo-700 transition">
              Products
            </Link>
            <Link to="/cart" className="text-white hover:text-indigo-200 px-3 py-2 rounded hover:bg-indigo-700 transition">
              Cart
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end gap-4 mb-8">
          <div className="flex-1 md:flex-1">
            <input
              type="text"
              placeholder="Search products..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            />
          </div>
          <div className="flex-1 md:flex-1">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1 md:flex-1 grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="Min price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            />
            <input
              type="number"
              placeholder="Max price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-10">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="text-center py-10 text-gray-600">
            No products found matching your criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product._id} className="bg-white p-4 rounded-lg shadow border border-gray-100 hover:shadow-md transition">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-3">
                  {product.description?.substring(0, 100)}...
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-indigo-600">
                    ${product.price}
                  </span>
                  <span className="text-gray-500 text-sm">Stock: {product.stock}</span>
                </div>
                <Link
                  to={`/products/${product._id}`}
                  className="w-full mt-4 block py-2 px-4 border border-indigo-600 rounded-md text-indigo-600 text-sm font-medium text-center hover:bg-indigo-600 hover:text-white transition"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}

        {pages > 1 && (
          <div className="mt-8 flex justify-center gap-2">
            {[...Array(pages)].map((_, i) => (
              <button
                key={i}
                onClick={() => {}}
                className={`px-4 py-2 rounded border ${
                  i + 1 === 1 ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-indigo-50'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
