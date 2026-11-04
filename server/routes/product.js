const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getVendorProducts,
  getCategories,
} = require('../controllers/productController');
const { protect, authorize } = require('../middleware/auth');
const { body } = require('express-validator');

const productValidation = [
  body('name', 'Product name is required').notEmpty(),
  body('description', 'Product description is required').notEmpty(),
  body('category', 'Category is required').notEmpty(),
  body('price', 'Price must be a positive number').isNumeric(),
  body('stock', 'Stock must be a number').isNumeric(),
];

router.get('/', getProducts);
router.get('/categories', getCategories);
router.get('/vendor', protect, authorize('vendor'), getVendorProducts);
router.get('/:id', getProductById);
router.post('/', protect, authorize('vendor'), productValidation, createProduct);
router.put('/:id', protect, authorize('vendor'), productValidation, updateProduct);
router.delete('/:id', protect, authorize('vendor'), deleteProduct);

module.exports = router;
