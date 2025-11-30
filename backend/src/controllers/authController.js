const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const prisma = require('../config/database');

const generateToken = (userId, role) => {
  return jwt.sign(
    { userId, role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

const register = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array(),
        status: 400
      });
    }

    const { fullName, contactNumber, email, password, role } = req.body;

    // Prevent admin registration through public endpoint
    if (role && role === 'admin') {
      return res.status(403).json({
        error: 'Admin accounts cannot be created through registration',
        message: 'Admin accounts are pre-created. Please contact system administrator.',
        status: 403
      });
    }

    // Force role to be student for public registration
    const userRole = 'student';

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({
        error: 'User with this email already exists',
        status: 400
      });
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const user = await prisma.user.create({
      data: {
        fullName,
        contactNumber,
        email,
        password: hashedPassword,
        role: userRole
      },
      select: {
        id: true,
        fullName: true,
        contactNumber: true,
        email: true,
        role: true,
        createdAt: true
      }
    });

    res.status(201).json({
      message: 'Student account registered successfully',
      user,
      status: 201
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      error: 'Internal server error during registration',
      status: 500
    });
  }
};

const login = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array(),
        status: 400
      });
    }

    const { email, password } = req.body;

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(401).json({
        error: 'Invalid credentials',
        status: 401
      });
    }

    // IMPORTANT: Student login endpoint should ONLY accept student accounts
    // Admin accounts must use the /auth/admin/login endpoint
    if (user.role === 'admin') {
      return res.status(403).json({
        error: 'Access denied',
        message: 'Admin accounts must use the admin login portal',
        status: 403
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        error: 'Invalid credentials',
        status: 401
      });
    }

    // Generate JWT token
    const token = generateToken(user.id, user.role);

    // Return user data without password
    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({
      message: 'Student login successful',
      token,
      user: userWithoutPassword,
      status: 200
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      error: 'Internal server error during login',
      status: 500
    });
  }
};

const adminLogin = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array(),
        status: 400
      });
    }

    const { email, password } = req.body;

    // Find admin user by email
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user || user.role !== 'admin') {
      return res.status(401).json({
        error: 'Invalid admin credentials',
        message: 'Admin account not found or access denied',
        status: 401
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        error: 'Invalid admin credentials',
        status: 401
      });
    }

    // Generate JWT token
    const token = generateToken(user.id, user.role);

    // Return user data without password
    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({
      message: 'Admin login successful',
      token,
      user: userWithoutPassword,
      status: 200
    });

  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({
      error: 'Internal server error during admin login',
      status: 500
    });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    // User is already attached to req by authenticateToken middleware
    res.status(200).json({
      user: req.user,
      status: 200
    });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({
      error: 'Internal server error while fetching user data',
      status: 500
    });
  }
};

const requestPasswordReset = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array(),
        status: 400
      });
    }

    const { email } = req.body;

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email }
    });

    // Always return success to prevent email enumeration
    if (!user) {
      return res.status(200).json({
        message: 'If an account exists with this email, a password reset link has been sent',
        status: 200
      });
    }

    // Only allow students to reset password through this endpoint
    if (user.role === 'admin') {
      return res.status(200).json({
        message: 'If an account exists with this email, a password reset link has been sent',
        status: 200
      });
    }

    // Generate reset token (valid for 1 hour)
    const resetToken = jwt.sign(
      { userId: user.id, email: user.email, type: 'password-reset' },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Store reset token in database
    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken,
        resetTokenExpiry: new Date(Date.now() + 3600000) // 1 hour from now
      }
    });

    // TODO: Send email with reset link
    // For now, we'll return the token in development mode
    const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;
    
    console.log('Password reset link:', resetLink);
    console.log('Reset token:', resetToken);

    res.status(200).json({
      message: 'If an account exists with this email, a password reset link has been sent',
      // Remove this in production - only for development
      ...(process.env.NODE_ENV === 'development' && { resetLink, resetToken }),
      status: 200
    });

  } catch (error) {
    console.error('Password reset request error:', error);
    res.status(500).json({
      error: 'Internal server error during password reset request',
      status: 500
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array(),
        status: 400
      });
    }

    const { token, newPassword } = req.body;

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      if (decoded.type !== 'password-reset') {
        return res.status(400).json({
          error: 'Invalid reset token',
          status: 400
        });
      }
    } catch (err) {
      return res.status(400).json({
        error: 'Invalid or expired reset token',
        status: 400
      });
    }

    // Find user and check token
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    });

    if (!user || user.resetToken !== token) {
      return res.status(400).json({
        error: 'Invalid reset token',
        status: 400
      });
    }

    // Check if token is expired
    if (user.resetTokenExpiry && new Date() > user.resetTokenExpiry) {
      return res.status(400).json({
        error: 'Reset token has expired',
        status: 400
      });
    }

    // Hash new password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update password and clear reset token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null
      }
    });

    res.status(200).json({
      message: 'Password has been reset successfully',
      status: 200
    });

  } catch (error) {
    console.error('Password reset error:', error);
    res.status(500).json({
      error: 'Internal server error during password reset',
      status: 500
    });
  }
};

module.exports = {
  register,
  login,
  adminLogin,
  getCurrentUser,
  requestPasswordReset,
  resetPassword
};