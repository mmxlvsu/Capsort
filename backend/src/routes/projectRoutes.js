const express = require('express');
const { body, query } = require('express-validator');
const {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  restoreProject
} = require('../controllers/projectController');
const { authenticateToken, requireRole } = require('../middleware/auth');

const router = express.Router();

// Validation rules
const projectValidation = [
  body('title')
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Title must be between 1 and 200 characters'),
  body('author')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Author must be between 1 and 100 characters'),
  body('year')
    .isInt({ min: 1900, max: new Date().getFullYear() + 10 })
    .withMessage('Year must be a valid year'),
  body('field')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Field must be between 1 and 50 characters'),
  body('fileUrl')
    .optional()
    .isURL()
    .withMessage('File URL must be a valid URL')
];

const queryValidation = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  query('year')
    .optional()
    .isInt({ min: 1900, max: new Date().getFullYear() + 10 })
    .withMessage('Year must be a valid year'),
  query('field')
    .optional()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Field must be between 1 and 50 characters'),
  query('search')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Search query must be between 1 and 100 characters')
];

// Public routes
router.get('/', queryValidation, getAllProjects);
router.get('/:id', getProjectById);

// Admin-only routes
router.post('/', authenticateToken, requireRole('admin'), projectValidation, createProject);
router.put('/:id', authenticateToken, requireRole('admin'), projectValidation, updateProject);
router.delete('/:id', authenticateToken, requireRole('admin'), deleteProject);
router.post('/:id/restore', authenticateToken, requireRole('admin'), restoreProject);

module.exports = router;