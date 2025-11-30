const prisma = require('../config/database');

// Get About page content
const getAboutContent = async (req, res) => {
  try {
    // Get the most recent about content (there should only be one)
    let aboutContent = await prisma.aboutContent.findFirst({
      orderBy: { updatedAt: 'desc' }
    });

    // If no content exists, create default content
    if (!aboutContent) {
      aboutContent = await prisma.aboutContent.create({
        data: {
          title: 'About CapSort',
          subtitle: 'Capstone Archiving and Sorting System',
          mission: 'CapSort is designed to provide an efficient and user-friendly platform for archiving, organizing, and discovering capstone projects from the University of Science and Technology of Southern Philippines. Our goal is to preserve the innovative work of students and make it accessible to future generations of learners and researchers.',
          contactEmail: 'capsort@ustp.edu.ph'
        }
      });
    }

    res.status(200).json({
      content: aboutContent,
      status: 200
    });

  } catch (error) {
    console.error('Get about content error:', error);
    res.status(500).json({
      error: 'Internal server error while fetching about content',
      status: 500
    });
  }
};

// Update About page content (Admin only)
const updateAboutContent = async (req, res) => {
  try {
    const { title, subtitle, mission, contactEmail } = req.body;

    // Validate input
    if (!title || !subtitle || !mission || !contactEmail) {
      return res.status(400).json({
        error: 'All fields are required',
        status: 400
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactEmail)) {
      return res.status(400).json({
        error: 'Invalid email format',
        status: 400
      });
    }

    // Get existing content
    const existingContent = await prisma.aboutContent.findFirst({
      orderBy: { updatedAt: 'desc' }
    });

    let updatedContent;

    if (existingContent) {
      // Update existing content
      updatedContent = await prisma.aboutContent.update({
        where: { id: existingContent.id },
        data: {
          title,
          subtitle,
          mission,
          contactEmail
        }
      });
    } else {
      // Create new content if none exists
      updatedContent = await prisma.aboutContent.create({
        data: {
          title,
          subtitle,
          mission,
          contactEmail
        }
      });
    }

    res.status(200).json({
      message: 'About content updated successfully',
      content: updatedContent,
      status: 200
    });

  } catch (error) {
    console.error('Update about content error:', error);
    res.status(500).json({
      error: 'Internal server error while updating about content',
      status: 500
    });
  }
};

module.exports = {
  getAboutContent,
  updateAboutContent
};
