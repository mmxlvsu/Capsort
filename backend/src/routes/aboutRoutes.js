const express = require('express');
const router = express.Router();
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const {
  getAboutContent,
  updateAboutContent
} = require('../controllers/aboutController');

// GET /api/about - Get about content (public)
router.get('/', getAboutContent);

// PUT /api/about - Update about content (admin only)
router.put('/', authenticateToken, requireAdmin, updateAboutContent);

module.exports = router;
