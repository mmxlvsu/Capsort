const prisma = require('../config/database');

// Get analytics dashboard data
const getAnalyticsDashboard = async (req, res) => {
  try {
    // Get total projects count
    const totalProjects = await prisma.project.count();

    // Get total users (students only)
    const totalUsers = await prisma.user.count({
      where: { role: 'student' }
    });

    // Get total saves
    const totalSaves = await prisma.savedProject.count();

    // Get most viewed/saved project (using saves as proxy for views)
    const mostSavedProject = await prisma.savedProject.groupBy({
      by: ['projectId'],
      _count: {
        projectId: true
      },
      orderBy: {
        _count: {
          projectId: 'desc'
        }
      },
      take: 1
    });

    let mostViewedProject = null;
    if (mostSavedProject.length > 0) {
      const projectDetails = await prisma.project.findUnique({
        where: { id: mostSavedProject[0].projectId },
        select: {
          id: true,
          title: true,
          author: true,
          year: true,
          field: true,
          _count: {
            select: {
              savedBy: true
            }
          }
        }
      });
      
      if (projectDetails) {
        mostViewedProject = {
          title: projectDetails.title,
          author: projectDetails.author,
          year: projectDetails.year,
          field: projectDetails.field,
          views: projectDetails._count.savedBy
        };
      }
    }

    // Get active students this month
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const activeStudents = await prisma.user.count({
      where: {
        role: 'student',
        createdAt: {
          gte: oneMonthAgo
        }
      }
    });

    res.status(200).json({
      summary: {
        totalProjects,
        totalUsers,
        totalSaves,
        activeStudents,
        mostViewedProject
      },
      status: 200
    });

  } catch (error) {
    console.error('Get analytics dashboard error:', error);
    res.status(500).json({
      error: 'Internal server error while fetching analytics',
      status: 500
    });
  }
};

// Get projects by year and field
const getProjectsByYear = async (req, res) => {
  try {
    // Get all projects grouped by year and field
    const projects = await prisma.project.findMany({
      select: {
        year: true,
        field: true
      }
    });

    // Group by year and field
    const yearFieldMap = {};
    
    projects.forEach(project => {
      const year = project.year.toString();
      if (!yearFieldMap[year]) {
        yearFieldMap[year] = {};
      }
      
      const field = project.field;
      if (!yearFieldMap[year][field]) {
        yearFieldMap[year][field] = 0;
      }
      yearFieldMap[year][field]++;
    });

    // Convert to array format for charts
    const chartData = Object.keys(yearFieldMap)
      .sort()
      .map(year => {
        const data = { year };
        Object.keys(yearFieldMap[year]).forEach(field => {
          data[field] = yearFieldMap[year][field];
        });
        return data;
      });

    res.status(200).json({
      data: chartData,
      status: 200
    });

  } catch (error) {
    console.error('Get projects by year error:', error);
    res.status(500).json({
      error: 'Internal server error while fetching projects by year',
      status: 500
    });
  }
};

// Get field distribution
const getFieldDistribution = async (req, res) => {
  try {
    // Get count of projects by field
    const fieldCounts = await prisma.project.groupBy({
      by: ['field'],
      _count: {
        field: true
      }
    });

    // Calculate total for percentages
    const total = fieldCounts.reduce((sum, item) => sum + item._count.field, 0);

    // Format for pie chart
    const distribution = fieldCounts.map(item => ({
      name: item.field,
      value: item._count.field,
      percentage: total > 0 ? Math.round((item._count.field / total) * 100) : 0
    }));

    res.status(200).json({
      data: distribution,
      total,
      status: 200
    });

  } catch (error) {
    console.error('Get field distribution error:', error);
    res.status(500).json({
      error: 'Internal server error while fetching field distribution',
      status: 500
    });
  }
};

// Get top saved projects
const getTopSavedProjects = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;

    // Get projects with most saves
    const topProjects = await prisma.savedProject.groupBy({
      by: ['projectId'],
      _count: {
        projectId: true
      },
      orderBy: {
        _count: {
          projectId: 'desc'
        }
      },
      take: limit
    });

    // Get project details
    const projectsWithDetails = await Promise.all(
      topProjects.map(async (item) => {
        const project = await prisma.project.findUnique({
          where: { id: item.projectId },
          select: {
            id: true,
            title: true,
            author: true,
            year: true,
            field: true
          }
        });

        return {
          ...project,
          saves: item._count.projectId
        };
      })
    );

    res.status(200).json({
      data: projectsWithDetails,
      status: 200
    });

  } catch (error) {
    console.error('Get top saved projects error:', error);
    res.status(500).json({
      error: 'Internal server error while fetching top saved projects',
      status: 500
    });
  }
};

// Get user activity metrics
const getUserActivity = async (req, res) => {
  try {
    // Get users registered per month for the last 6 months
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const users = await prisma.user.findMany({
      where: {
        role: 'student',
        createdAt: {
          gte: sixMonthsAgo
        }
      },
      select: {
        createdAt: true
      }
    });

    // Group by month
    const monthlyActivity = {};
    users.forEach(user => {
      const monthYear = user.createdAt.toISOString().slice(0, 7); // YYYY-MM
      if (!monthlyActivity[monthYear]) {
        monthlyActivity[monthYear] = 0;
      }
      monthlyActivity[monthYear]++;
    });

    // Convert to array
    const activityData = Object.keys(monthlyActivity)
      .sort()
      .map(month => ({
        month,
        users: monthlyActivity[month]
      }));

    res.status(200).json({
      data: activityData,
      status: 200
    });

  } catch (error) {
    console.error('Get user activity error:', error);
    res.status(500).json({
      error: 'Internal server error while fetching user activity',
      status: 500
    });
  }
};

module.exports = {
  getAnalyticsDashboard,
  getProjectsByYear,
  getFieldDistribution,
  getTopSavedProjects,
  getUserActivity
};
