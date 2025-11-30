const request = require('supertest');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = require('../src/index');
const { prisma } = require('./setup');

describe('Saved Projects Endpoints', () => {
  let studentToken, studentUser, project;

  beforeEach(async () => {
    // Create admin user for project creation
    const hashedPassword = await bcrypt.hash('Password123!', 12);
    const adminUser = await prisma.user.create({
      data: {
        fullName: 'Admin User',
        contactNumber: '+1234567890',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'admin'
      }
    });

    // Create student user
    studentUser = await prisma.user.create({
      data: {
        fullName: 'Student User',
        contactNumber: '+1234567891',
        email: 'student@example.com',
        password: hashedPassword,
        role: 'student'
      }
    });

    // Create a test project
    project = await prisma.project.create({
      data: {
        title: 'Test Project',
        author: 'Test Author',
        year: 2024,
        field: 'IoT',
        fileUrl: 'https://example.com/test.pdf',
        uploadedBy: adminUser.id
      }
    });

    // Generate student token
    studentToken = jwt.sign(
      { userId: studentUser.id, role: studentUser.role },
      process.env.JWT_SECRET || 'test-secret',
      { expiresIn: '1h' }
    );
  });

  describe('POST /api/saved-projects', () => {
    it('should save a project successfully', async () => {
      const response = await request(app)
        .post('/api/saved-projects')
        .set('Authorization', `Bearer ${studentToken}`)
        .send({ projectId: project.id })
        .expect(201);

      expect(response.body.message).toBe('Project saved successfully');
      expect(response.body.savedProject.projectId).toBe(project.id);
    });

    it('should prevent duplicate saves', async () => {
      // First save
      await request(app)
        .post('/api/saved-projects')
        .set('Authorization', `Bearer ${studentToken}`)
        .send({ projectId: project.id })
        .expect(201);

      // Second save attempt
      const response = await request(app)
        .post('/api/saved-projects')
        .set('Authorization', `Bearer ${studentToken}`)
        .send({ projectId: project.id })
        .expect(400);

      expect(response.body.error).toBe('Project is already saved');
    });
  });

  describe('GET /api/saved-projects', () => {
    it('should get user saved projects', async () => {
      // Save a project first
      await prisma.savedProject.create({
        data: {
          userId: studentUser.id,
          projectId: project.id
        }
      });

      const response = await request(app)
        .get('/api/saved-projects')
        .set('Authorization', `Bearer ${studentToken}`)
        .expect(200);

      expect(response.body.savedProjects).toBeDefined();
      expect(response.body.savedProjects.length).toBe(1);
    });
  });
});