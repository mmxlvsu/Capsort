const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL || 'postgresql://test:test@localhost:5432/capsort_test'
    }
  }
});

// Clean database before each test
beforeEach(async () => {
  await prisma.savedProject.deleteMany({});
  await prisma.project.deleteMany({});
  await prisma.user.deleteMany({});
});

// Close database connection after all tests
afterAll(async () => {
  await prisma.$disconnect();
});

module.exports = { prisma };