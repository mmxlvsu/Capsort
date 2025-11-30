const bcrypt = require('bcryptjs');
const prisma = require('../config/database');

// Get admin profile with statistics
const getAdminProfile = async (req, res) => {
  try {
    const adminId = req.user.id;

    // Fetch admin data
    const admin = await prisma.user.findUnique({
      where: { id: adminId },
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
        createdAt: true
      }
    });

    if (!admin || admin.role !== 'admin') {
      return res.status(403).json({
        error: 'Access denied',
        status: 403
      });
    }

    // Get statistics
    const [totalPapers, totalUsers] = await Promise.all([
      prisma.project.count(),
      prisma.user.count({ where: { role: 'student' } })
    ]);

    // Extract year from createdAt
    const activeSince = admin.createdAt.getFullYear();

    res.status(200).json({
      admin: {
        id: admin.id,
        name: admin.fullName,
        email: admin.email,
        role: admin.role,
        activeSince
      },
      statistics: {
        totalPapers,
        totalUsers,
        activeSince
      },
      status: 200
    });

  } catch (error) {
    console.error('Get admin profile error:', error);
    res.status(500).json({
      error: 'Internal server error while fetching admin profile',
      status: 500
    });
  }
};

// Update admin profile
const updateAdminProfile = async (req, res) => {
  try {
    const adminId = req.user.id;
    const { fullName, email } = req.body;

    // Validate input
    if (!fullName || !email) {
      return res.status(400).json({
        error: 'Name and email are required',
        status: 400
      });
    }

    // Check if email is already taken by another user
    if (email !== req.user.email) {
      const existingUser = await prisma.user.findUnique({
        where: { email }
      });

      if (existingUser && existingUser.id !== adminId) {
        return res.status(400).json({
          error: 'Email is already in use',
          status: 400
        });
      }
    }

    // Update admin profile
    const updatedAdmin = await prisma.user.update({
      where: { id: adminId },
      data: {
        fullName,
        email
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
        createdAt: true
      }
    });

    res.status(200).json({
      message: 'Admin profile updated successfully',
      admin: {
        id: updatedAdmin.id,
        name: updatedAdmin.fullName,
        email: updatedAdmin.email,
        role: updatedAdmin.role
      },
      status: 200
    });

  } catch (error) {
    console.error('Update admin profile error:', error);
    res.status(500).json({
      error: 'Internal server error while updating admin profile',
      status: 500
    });
  }
};

// Get system health and information
const getSystemHealth = async (req, res) => {
  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`;
    
    const dbStatus = 'Healthy';
    
    // Get last backup timestamp (placeholder - implement actual backup logic)
    const lastBackup = new Date().toISOString();

    res.status(200).json({
      database: {
        status: dbStatus,
        lastBackup
      },
      system: {
        version: '1.0.0',
        uptime: process.uptime()
      },
      status: 200
    });

  } catch (error) {
    console.error('System health check error:', error);
    res.status(500).json({
      database: {
        status: 'Unhealthy',
        error: error.message
      },
      status: 500
    });
  }
};

module.exports = {
  getAdminProfile,
  updateAdminProfile,
  getSystemHealth
};
