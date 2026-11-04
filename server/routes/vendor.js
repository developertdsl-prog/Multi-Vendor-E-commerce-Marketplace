const express = require('express');
const router = express.Router();
const {
  registerVendor,
  getVendorProfile,
  updateVendorProfile,
  getAllVendors,
  approveVendor,
} = require('../controllers/vendorController');
const { protect, authorize } = require('../middleware/auth');
const { body } = require('express-validator');

// Vendor registration validation
const vendorRegisterValidation = [
  body('storeName', 'Store name is required').notEmpty(),
  body('storeDescription', 'Store description is required').notEmpty(),
  body('contactEmail', 'Please enter a valid email').optional().isEmail(),
  body('contactPhone', 'Contact phone is required').optional().notEmpty(),
];

// @route   POST /api/vendors/register
router.post(
  '/register',
  protect,
  authorize('vendor'),
  vendorRegisterValidation,
  registerVendor
);

// @route   GET /api/vendors/profile
router.get('/profile', protect, authorize('vendor'), getVendorProfile);

// @route   PUT /api/vendors/profile
router.put('/profile', protect, authorize('vendor'), updateVendorProfile);

// @route   GET /api/vendors (Admin)
router.get('/', protect, authorize('admin'), getAllVendors);

// @route   PUT /api/vendors/:id/approve (Admin)
router.put('/:id/approve', protect, authorize('admin'), approveVendor);

module.exports = router;
