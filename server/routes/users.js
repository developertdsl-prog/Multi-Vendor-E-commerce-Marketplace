const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

// @route   GET /api/users
// @access  Private (Admin only)
router.get('/', protect, authorize('admin'), (req, res) => {
  res.json({ message: 'Admin users list - to be implemented in Day 5' });
});

// @route   GET /api/users/:id
// @access  Private (Admin only)
router.get('/:id', protect, authorize('admin'), (req, res) => {
  res.json({ message: 'Get user by ID - to be implemented in Day 5' });
});

module.exports = router;
