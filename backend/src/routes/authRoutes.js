const express = require('express');
const { body } = require('express-validator');
const { register, login, adminLogin, getCurrentUser, requestPasswordReset, resetPassword } = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');
const { authLimiter } = require('../middleware/security');

const router = express.Router();

// Validation rules
const registerValidation = [
  body('fullName')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Full name must be between 2 and 100 characters'),
  body('contactNumber')
    .trim()
    .isMobilePhone()
    .withMessage('Please provide a valid contact number'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one number')
  // Removed role validation since students can only register as students
];

const loginValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

const passwordResetRequestValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address')
];

const passwordResetValidation = [
  body('token')
    .notEmpty()
    .withMessage('Reset token is required'),
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one number')
];

// Routes
router.post('/register', authLimiter, registerValidation, register); // Student registration only
router.post('/login', authLimiter, loginValidation, login); // General login (students and admins)
router.post('/admin/login', authLimiter, loginValidation, adminLogin); // Admin-specific login
router.get('/me', authenticateToken, getCurrentUser);
router.post('/forgot-password', authLimiter, passwordResetRequestValidation, requestPasswordReset); // Request password reset
router.post('/reset-password', authLimiter, passwordResetValidation, resetPassword); // Reset password with token

module.exports = router;