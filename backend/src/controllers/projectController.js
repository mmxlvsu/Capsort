const { validationResult } = require('express-validator');
const prisma = require('../config/database');

const getAllProjects = async (req, res) => {
  try {
    const { 
      field, 
      year, 
      yearFrom, 
      yearTo, 
      search, 
      page = 1, 
      limit = 100, // Increased default limit for better UX
      includeDeleted = false 
    } = req.query;
    
    // Build where clause for filtering
    const where = {};
    
    // Exclude soft-deleted projects by default (unless includeDeleted is true)
    if (includeDeleted !== 'true') {
      where.isDeleted = false;
    }
    
    // Field filter - exact match (case-insensitive)
    if (field && field !== 'all') {
      where.field = {
        equals: field,
        mode: 'insensitive'
      };
    }
    
    // Year range filter
    if (yearFrom || yearTo || year) {
      const yearConditions = {};
      
      if (year) {
        // Single year filter (for backward compatibility)
        yearConditions.equals = parseInt(year);
      } else {
        // Year range filter
        if (yearFrom) {
          yearConditions.gte = parseInt(yearFrom);
        }
        if (yearTo) {
          yearConditions.lte = parseInt(yearTo);
        }
      }
      
      if (Object.keys(yearConditions).length > 0) {
        where.year = yearConditions;
      }
    }
    
    // Search filter - searches in title, author, and field
    if (search) {
      where.OR = [
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

    // Fetch projects with uploader information
    const [projects, totalCount] = await Promise.all([
      prisma.project.findMany({
        where,
        include: {
          uploader: {
            select: {
              id: true,
              fullName: true,
              email: true,
              role: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        skip,
        take
      }),
      prisma.project.count({ where })
    ]);

    const totalPages = Math.ceil(totalCount / parseInt(limit));

    res.status(200).json({
      projects,
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
    console.error('Get all projects error:', error);
    res.status(500).json({
      error: 'Internal server error while fetching projects',
      status: 500
    });
  }
};

const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const projectId = parseInt(id);

    if (isNaN(projectId)) {
      return res.status(400).json({
        error: 'Invalid project ID',
        status: 400
      });
    }

    const project = await prisma.project.findUnique({
      where: { id: projectId },
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
    });

    if (!project) {
      return res.status(404).json({
        error: 'Project not found',
        status: 404
      });
    }

    res.status(200).json({
      project,
      status: 200
    });

  } catch (error) {
    console.error('Get project by ID error:', error);
    res.status(500).json({
      error: 'Internal server error while fetching project',
      status: 500
    });
  }
};

const createProject = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error('Validation errors:', errors.array());
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array(),
        status: 400
      });
    }

    const { title, author, year, field, fileUrl } = req.body;
    
    // Check if user is authenticated
    if (!req.user || !req.user.id) {
      console.error('User not authenticated:', req.user);
      return res.status(401).json({
        error: 'User not authenticated',
        status: 401
      });
    }
    
    const uploadedBy = req.user.id;

    // Use a default placeholder if fileUrl is not provided
    const finalFileUrl = fileUrl || 'https://placeholder.com/default.pdf';

    console.log('Creating project with data:', { title, author, year, field, fileUrl: finalFileUrl, uploadedBy });

    const project = await prisma.project.create({
      data: {
        title,
        author,
        year: parseInt(year),
        field,
        fileUrl: finalFileUrl,
        uploadedBy
      },
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
    });

    res.status(201).json({
      message: 'Project created successfully',
      project,
      status: 201
    });

  } catch (error) {
    console.error('Create project error:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      meta: error.meta
    });
    
    // Handle specific Prisma errors
    if (error.code === 'P2002') {
      return res.status(400).json({
        error: 'A project with this title and author already exists',
        status: 400
      });
    }
    
    res.status(500).json({
      error: 'Internal server error while creating project',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
      status: 500
    });
  }
};

const updateProject = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error('Validation errors:', errors.array());
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array(),
        status: 400
      });
    }

    const { id } = req.params;
    const projectId = parseInt(id);

    if (isNaN(projectId)) {
      return res.status(400).json({
        error: 'Invalid project ID',
        status: 400
      });
    }

    // Check if project exists
    const existingProject = await prisma.project.findUnique({
      where: { id: projectId }
    });

    if (!existingProject) {
      return res.status(404).json({
        error: 'Project not found',
        status: 404
      });
    }

    const { title, author, year, field, fileUrl } = req.body;

    // Prepare update data
    const updateData = {
      title,
      author,
      year: parseInt(year),
      field
    };

    // Only update fileUrl if provided
    if (fileUrl) {
      updateData.fileUrl = fileUrl;
    }

    console.log('Updating project with data:', updateData);

    const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data: updateData,
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
    });

    res.status(200).json({
      message: 'Project updated successfully',
      project: updatedProject,
      status: 200
    });

  } catch (error) {
    console.error('Update project error:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      meta: error.meta
    });
    
    // Handle specific Prisma errors
    if (error.code === 'P2002') {
      return res.status(400).json({
        error: 'A project with this title and author already exists',
        status: 400
      });
    }
    
    res.status(500).json({
      error: 'Internal server error while updating project',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
      status: 500
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const projectId = parseInt(id);
    const { permanent = false } = req.query;

    if (isNaN(projectId)) {
      return res.status(400).json({
        error: 'Invalid project ID',
        status: 400
      });
    }

    // Check if project exists
    const existingProject = await prisma.project.findUnique({
      where: { id: projectId }
    });

    if (!existingProject) {
      return res.status(404).json({
        error: 'Project not found',
        status: 404
      });
    }

    if (permanent === 'true') {
      // Permanent delete (hard delete)
      await prisma.project.delete({
        where: { id: projectId }
      });

      res.status(200).json({
        message: 'Project permanently deleted',
        status: 200
      });
    } else {
      // Soft delete (move to trash)
      const deletedProject = await prisma.project.update({
        where: { id: projectId },
        data: {
          isDeleted: true,
          deletedAt: new Date()
        }
      });

      res.status(200).json({
        message: 'Project moved to trash',
        project: deletedProject,
        status: 200
      });
    }

  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({
      error: 'Internal server error while deleting project',
      status: 500
    });
  }
};

// Restore project from trash
const restoreProject = async (req, res) => {
  try {
    const { id } = req.params;
    const projectId = parseInt(id);

    if (isNaN(projectId)) {
      return res.status(400).json({
        error: 'Invalid project ID',
        status: 400
      });
    }

    // Check if project exists and is deleted
    const existingProject = await prisma.project.findUnique({
      where: { id: projectId }
    });

    if (!existingProject) {
      return res.status(404).json({
        error: 'Project not found',
        status: 404
      });
    }

    if (!existingProject.isDeleted) {
      return res.status(400).json({
        error: 'Project is not in trash',
        status: 400
      });
    }

    // Restore project
    const restoredProject = await prisma.project.update({
      where: { id: projectId },
      data: {
        isDeleted: false,
        deletedAt: null
      }
    });

    res.status(200).json({
      message: 'Project restored successfully',
      project: restoredProject,
      status: 200
    });

  } catch (error) {
    console.error('Restore project error:', error);
    res.status(500).json({
      error: 'Internal server error while restoring project',
      status: 500
    });
  }
};

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  restoreProject
};