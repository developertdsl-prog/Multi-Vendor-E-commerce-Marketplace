const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

router.get('/', protect, authorize('admin'), (req, res) => {
  res.json({ message: 'Admin users list' });
});

router.get('/:id', protect, authorize('admin'), (req, res) => {
  res.json({ message: 'Get user by ID' });
});

module.exports = router;
