const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');
const { validationResult } = require('express-validator');

const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.page) || 1;

  const keyword = req.query.keyword
    ? {
        $or: [
          { name: { $regex: req.query.keyword, $options: 'i' } },
          { description: { $regex: req.query.keyword, $options: 'i' } },
        ],
      }
    : {};

  const category = req.query.category ? { category: req.query.category } : {};

  const minPrice = req.query.minPrice ? { $gte: Number(req.query.minPrice) } : {};
  const maxPrice = req.query.maxPrice ? { $lte: Number(req.query.maxPrice) } : {};
  const priceFilter =
    minPrice.$gte || maxPrice.$lte ? { price: { ...minPrice, ...maxPrice } } : {};

  const count = await Product.countDocuments({ ...keyword, ...category, isActive: true, ...priceFilter });
  const products = await Product.find({ ...keyword, ...category, isActive: true, ...priceFilter })
    .populate('vendor', 'name')
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate('vendor', 'name email');
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

const createProduct = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    throw new Error(errors.array()[0].msg);
  }

  const { name, description, category, price, stock, images } = req.body;

  const product = await Product.create({
    vendor: req.user.id,
    name,
    description,
    category,
    price,
    stock,
    images: images || [],
  });

  res.status(201).json(product);
});

const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  if (product.vendor.toString() !== req.user.id) {
    res.status(403);
    throw new Error('Not authorized to update this product');
  }

  const { name, description, category, price, stock, images } = req.body;

  product.name = name || product.name;
  product.description = description || product.description;
  product.category = category || product.category;
  product.price = price !== undefined ? price : product.price;
  product.stock = stock !== undefined ? stock : product.stock;
  product.images = images || product.images;

  const updatedProduct = await product.save();
  res.json(updatedProduct);
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  if (product.vendor.toString() !== req.user.id) {
    res.status(403);
    throw new Error('Not authorized to delete this product');
  }

  await product.deleteOne();
  res.json({ message: 'Product removed' });
});

const getVendorProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ vendor: req.user.id });
  res.json(products);
});

const getCategories = asyncHandler(async (req, res) => {
  const categories = await Product.distinct('category');
  res.json(categories);
});

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getVendorProducts,
  getCategories,
};
