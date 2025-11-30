#!/usr/bin/env node

const { PrismaClient } = require('@prisma/client');
const { execSync } = require('child_process');

const prisma = new PrismaClient();

async function resetDatabase() {
  console.log('🔄 Resetting database...');
  
  try {
    // Clear all data
    console.log('🗑️  Clearing existing data...');
    await prisma.savedProject.deleteMany();
    await prisma.project.deleteMany();
    await prisma.user.deleteMany();
    
    console.log('✅ Data cleared successfully');
    
    // Run seed
    console.log('🌱 Re-seeding database...');
    execSync('npm run db:seed', { stdio: 'inherit' });
    
    console.log('🎉 Database reset complete!');
    
  } catch (error) {
    console.error('❌ Reset failed:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

resetDatabase();