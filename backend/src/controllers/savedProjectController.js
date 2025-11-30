const { validationResult } = require('express-validator');
const prisma = require('../config/database');

const getSavedProjects = async (req, res) => {
  try {
    const userId = req.user.id;
    const { 
      field, 
      yearFrom, 
      yearTo, 
      search, 
      page = 1, 
      limit = 100 
    } = req.query;

    // Build where clause for project filtering
    const projectWhere = {
      isDeleted: false // Only show non-deleted projects
    };
    
    // Field filter
    if (field && field !== 'all') {
      projectWhere.field = {
        equals: field,
        mode: 'insensitive'
      };
    }
    
    // Year range filter
    if (yearFrom || yearTo) {
      const yearConditions = {};
      
      if (yearFrom) {
        yearConditions.gte = parseInt(yearFrom);
      }
      if (yearTo) {
        yearConditions.lte = parseInt(yearTo);
      }
      
      if (Object.keys(yearConditions).length > 0) {
        projectWhere.year = yearConditions;
      }
    }
    
    // Search filter
    if (search) {
      projectWhere.OR = [
        {
          title: {
            contains: search,
            mode: 'insensitive'
          }
        },
        {
          author: {
            contains: search,
            mode: 'insensitive'
          }
        },
        {
          field: {
            contains: search,
            mode: 'insensitive'
          }
        }
      ];
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    // Fetch saved projects with full project details and filtering
    const [savedProjects, totalCount] = await Promise.all([
      prisma.savedProject.findMany({
        where: { 
          userId,
          project: projectWhere
        },
        include: {
          project: {
            include: {
              uploader: {
                select: {
                  id: true,
                  fullName: true,
                  email: true,
                  role: true
                }
              }
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        skip,
        take
      }),
      prisma.savedProject.count({ 
        where: { 
          userId,
          project: projectWhere
        } 
      })
    ]);

    const totalPages = Math.ceil(totalCount / parseInt(limit));

    res.status(200).json({
      savedProjects,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalCount,
        hasNext: parseInt(page) < totalPages,
        hasPrev: parseInt(page) > 1
      },
      status: 200
    });

  } catch (error) {
    console.error('Get saved projects error:', error);
    res.status(500).json({
      error: 'Internal server error while fetching saved projects',
      status: 500
    });
  }
};

const saveProject = async (req, res) => {
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

    const { projectId } = req.body;
    const userId = req.user.id;

    // Check if project exists
    const project = await prisma.project.findUnique({
      where: { id: parseInt(projectId) }
    });

    if (!project) {
      return res.status(404).json({
        error: 'Project not found',
        status: 404
      });
    }

    // Check if project is already saved by this user
    const existingSavedProject = await prisma.savedProject.findUnique({
      where: {
        userId_projectId: {
          userId,
          projectId: parseInt(projectId)
        }
      }
    });

    if (existingSavedProject) {
      return res.status(400).json({
        error: 'Project is already saved',
        status: 400
      });
    }

    // Save the project
    const savedProject = await prisma.savedProject.create({
      data: {
        userId,
        projectId: parseInt(projectId)
      },
      include: {
        project: {
          include: {
            uploader: {
              select: {
                id: true,
                fullName: true,
                email: true,
                role: true
              }
            }
          }
        }
      }
    });

    res.status(201).json({
      message: 'Project saved successfully',
      savedProject,
      status: 201
    });

  } catch (error) {
    console.error('Save project error:', error);
    res.status(500).json({
      error: 'Internal server error while saving project',
      status: 500
    });
  }
};

const unsaveProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const userId = req.user.id;

    if (isNaN(parseInt(projectId))) {
      return res.status(400).json({
        error: 'Invalid project ID',
        status: 400
      });
    }

    // Check if the saved project exists
    const savedProject = await prisma.savedProject.findUnique({
      where: {
        userId_projectId: {
          userId,
          projectId: parseInt(projectId)
        }
      }
    });

    if (!savedProject) {
      return res.status(404).json({
        error: 'Saved project not found',
        status: 404
      });
    }

    // Remove the saved project
    await prisma.savedProject.delete({
      where: {
        userId_projectId: {
          userId,
          projectId: parseInt(projectId)
        }
      }
    });

    res.status(200).json({
      message: 'Project removed from saved list successfully',
      status: 200
    });

  } catch (error) {
    console.error('Unsave project error:', error);
    res.status(500).json({
      error: 'Internal server error while removing saved project',
      status: 500
    });
  }
};

module.exports = {
  getSavedProjects,
  saveProject,
  unsaveProject
};