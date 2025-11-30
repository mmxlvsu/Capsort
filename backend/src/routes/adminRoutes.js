const express = require('express');
const router = express.Router();
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const {
  getAdminProfile,
  updateAdminProfile,
  getSystemHealth
} = require('../controllers/adminController');

// All routes require authentication and admin role
router.use(authenticateToken);
router.use(requireAdmin);

// GET /api/admin/profile - Get admin profile with statistics
router.get('/profile', getAdminProfile);

// PUT /api/admin/profile - Update admin profile
router.put('/profile', updateAdminProfile);

// GET /api/admin/system/health - Get system health status
router.get('/system/health', getSystemHealth);

module.exports = router;
