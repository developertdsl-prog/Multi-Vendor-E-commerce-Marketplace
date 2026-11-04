const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrderById,
  getMyOrders,
  getVendorOrders,
  getAllOrders,
  updateOrderStatus,
  updateOrderToPaid,
} = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/auth');
const { body } = require('express-validator');

const orderValidation = [
  body('shippingAddress.fullName', 'Full name is required').notEmpty(),
  body('shippingAddress.email', 'Please enter a valid email').isEmail(),
  body('shippingAddress.address', 'Address is required').notEmpty(),
  body('shippingAddress.city', 'City is required').notEmpty(),
  body('shippingAddress.zipCode', 'ZIP code is required').notEmpty(),
  body('paymentMethod', 'Payment method is required').notEmpty(),
];

// @route   POST /api/orders
router.post('/', protect, orderValidation, createOrder);

// @route   GET /api/orders/myorders
router.get('/myorders', protect, getMyOrders);

// @route   GET /api/orders/vendor
router.get('/vendor', protect, authorize('vendor'), getVendorOrders);

// @route   GET /api/orders
router.get('/', protect, authorize('admin'), getAllOrders);

// @route   GET /api/orders/:id
router.get('/:id', protect, getOrderById);

// @route   PUT /api/orders/:id/pay
router.put('/:id/pay', protect, updateOrderToPaid);

// @route   PUT /api/orders/:id/status
router.put('/:id/status', protect, updateOrderStatus);

module.exports = router;
