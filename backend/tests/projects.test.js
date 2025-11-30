const request = require('supertest');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = require('../src/index');
const { prisma } = require('./setup');

describe('Project Endpoints', () => {
  let adminToken, studentToken, adminUser, studentUser;

  beforeEach(async () => {
    // Create admin user
    const hashedPassword = await bcrypt.hash('Password123!', 12);
    adminUser = await prisma.user.create({
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

    // Generate tokens
    adminToken = jwt.sign(
      { userId: adminUser.id, role: adminUser.role },
      process.env.JWT_SECRET || 'test-secret',
      { expiresIn: '1h' }
    );

    studentToken = jwt.sign(
      { userId: studentUser.id, role: studentUser.role },
      process.env.JWT_SECRET || 'test-secret',
      { expiresIn: '1h' }
    );
  });

  describe('GET /api/projects', () => {
    it('should get all projects without authentication', async () => {
      const response = await request(app)
        .get('/api/projects')
        .expect(200);

      expect(response.body.projects).toBeDefined();
      expect(Array.isArray(response.body.projects)).toBe(true);
    });
  });

  describe('POST /api/projects', () => {
    it('should create project as admin', async () => {
      const projectData = {
        title: 'Test Project',
        author: 'Test Author',
        year: 2024,
        field: 'IoT',
        fileUrl: 'https://example.com/test.pdf'
      };

      const response = await request(app)
        .post('/api/projects')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(projectData)
        .expect(201);

      expect(response.body.message).toBe('Project created successfully');
      expect(response.body.project.title).toBe(projectData.title);
    });

    it('should reject project creation by student', async () => {
      const projectData = {
        title: 'Test Project',
        author: 'Test Author',
        year: 2024,
        field: 'IoT',
        fileUrl: 'https://example.com/test.pdf'
      };

      const response = await request(app)
        .post('/api/projects')
        .set('Authorization', `Bearer ${studentToken}`)
        .send(projectData)
        .expect(403);

      expect(response.body.error).toContain('admin role required');
    });
  });
});