const express = require('express');
const router = express.Router();
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const {
  getAnalyticsDashboard,
  getProjectsByYear,
  getFieldDistribution,
  getTopSavedProjects,
  getUserActivity
} = require('../controllers/analyticsController');

// All routes require authentication and admin role
router.use(authenticateToken);
router.use(requireAdmin);

// GET /api/analytics/dashboard - Get dashboard summary
router.get('/dashboard', getAnalyticsDashboard);

// GET /api/analytics/projects-by-year - Get projects grouped by year and field
router.get('/projects-by-year', getProjectsByYear);

// GET /api/analytics/field-distribution - Get field distribution for pie chart
router.get('/field-distribution', getFieldDistribution);

// GET /api/analytics/top-saved - Get top saved projects
router.get('/top-saved', getTopSavedProjects);

// GET /api/analytics/user-activity - Get user activity metrics
router.get('/user-activity', getUserActivity);

module.exports = router;
