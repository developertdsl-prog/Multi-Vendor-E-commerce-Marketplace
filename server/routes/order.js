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

router.post('/', protect, orderValidation, createOrder);
router.get('/myorders', protect, getMyOrders);
router.get('/vendor', protect, authorize('vendor'), getVendorOrders);
router.get('/', protect, authorize('admin'), getAllOrders);
router.get('/:id', protect, getOrderById);
router.put('/:id/pay', protect, updateOrderToPaid);
router.put('/:id/status', protect, updateOrderStatus);

module.exports = router;
