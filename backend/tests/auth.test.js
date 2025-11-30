const request = require('supertest');
const bcrypt = require('bcryptjs');
const app = require('../src/index');
const { prisma } = require('./setup');

describe('Authentication Endpoints', () => {
  describe('POST /api/auth/register', () => {
    it('should register a new user successfully', async () => {
      const userData = {
        fullName: 'John Doe',
        contactNumber: '+1234567890',
        email: 'john@example.com',
        password: 'Password123!',
        role: 'student'
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(201);

      expect(response.body.message).toBe('User registered successfully');
      expect(response.body.user.email).toBe(userData.email);
      expect(response.body.user.password).toBeUndefined();
    });

    it('should reject registration with duplicate email', async () => {
      const userData = {
        fullName: 'John Doe',
        contactNumber: '+1234567890',
        email: 'john@example.com',
        password: 'Password123!',
        role: 'student'
      };

      // First registration
      await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(201);

      // Second registration with same email
      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(400);

      expect(response.body.error).toBe('User with this email already exists');
    });
  });

  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      const hashedPassword = await bcrypt.hash('Password123!', 12);
      await prisma.user.create({
        data: {
          fullName: 'John Doe',
          contactNumber: '+1234567890',
          email: 'john@example.com',
          password: hashedPassword,
          role: 'student'
        }
      });
    });

    it('should login with valid credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'john@example.com',
          password: 'Password123!'
        })
        .expect(200);

      expect(response.body.message).toBe('Login successful');
      expect(response.body.token).toBeDefined();
      expect(response.body.user.password).toBeUndefined();
    });
  });
});