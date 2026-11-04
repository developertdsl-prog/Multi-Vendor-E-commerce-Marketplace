const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  registerUser,
  loginUser,
  getUserProfile,
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');

// Validation rules
const registerValidation = [
  body('name', 'Name is required').notEmpty(),
  body('email', 'Please enter a valid email').isEmail(),
  body('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  body('role', 'Invalid role').optional().isIn(['customer', 'vendor', 'admin']),
];

const loginValidation = [
  body('email', 'Please enter a valid email').isEmail(),
  body('password', 'Password is required').notEmpty(),
];

// @route   POST /api/auth/register
router.post('/register', registerValidation, registerUser);

// @route   POST /api/auth/login
router.post('/login', loginValidation, loginUser);

// @route   GET /api/auth/me
router.get('/me', protect, getUserProfile);

module.exports = router;
