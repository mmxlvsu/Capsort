const express = require('express');
const { body, query } = require('express-validator');
const {
  getSavedProjects,
  saveProject,
  unsaveProject
} = require('../controllers/savedProjectController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Validation rules
const saveProjectValidation = [
  body('projectId')
    .isInt({ min: 1 })
    .withMessage('Project ID must be a positive integer')
];

const queryValidation = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100')
];

// All routes require authentication
router.use(authenticateToken);

// Routes
router.get('/', queryValidation, getSavedProjects);
router.post('/', saveProjectValidation, saveProject);
router.delete('/:projectId', unsaveProject);

module.exports = router;