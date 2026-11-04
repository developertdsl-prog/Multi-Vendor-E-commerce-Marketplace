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

const vendorRegisterValidation = [
  body('storeName', 'Store name is required').notEmpty(),
  body('storeDescription', 'Store description is required').notEmpty(),
  body('contactEmail', 'Please enter a valid email').optional().isEmail(),
  body('contactPhone', 'Contact phone is required').optional().notEmpty(),
];

router.post(
  '/register',
  protect,
  authorize('vendor'),
  vendorRegisterValidation,
  registerVendor
);
router.get('/profile', protect, authorize('vendor'), getVendorProfile);
router.put('/profile', protect, authorize('vendor'), updateVendorProfile);
router.get('/', protect, authorize('admin'), getAllVendors);
router.put('/:id/approve', protect, authorize('admin'), approveVendor);

module.exports = router;
