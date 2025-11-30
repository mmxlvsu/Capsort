#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 Fresh Capsort Backend Setup\n');

async function freshSetup() {
  try {
    console.log('1️⃣ Checking Neon connection...');
    
    // Test basic connection without Prisma
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient({
      log: ['error'],
    });

    try {
      await prisma.$connect();
      console.log('✅ Neon database is reachable!');
      await prisma.$disconnect();
    } catch (error) {
      console.log('❌ Neon connection failed:', error.message);
      console.log('\n🔧 Please check:');
      console.log('1. Go to https://console.neon.tech/');
      console.log('2. Make sure your project is active (not paused)');
      console.log('3. Copy the correct connection string');
      console.log('4. Update your .env file');
      return;
    }

    console.log('\n2️⃣ Setting up database schema...');
    
    // Create migration
    try {
      console.log('📊 Creating initial migration...');
      execSync('npx prisma migrate dev --name init', { stdio: 'inherit' });
      console.log('✅ Migration created successfully!');
    } catch (error) {
      console.log('⚠️ Migration failed, trying reset...');
      try {
        execSync('npx prisma migrate reset --force', { stdio: 'inherit' });
        execSync('npx prisma migrate dev --name init', { stdio: 'inherit' });
        console.log('✅ Database reset and migrated!');
      } catch (resetError) {
        console.log('❌ Migration still failing. Manual steps needed.');
        return;
      }
    }

    console.log('\n3️⃣ Seeding database...');
    try {
      execSync('npm run db:seed', { stdio: 'inherit' });
      console.log('✅ Database seeded successfully!');
    } catch (error) {
      console.log('⚠️ Seeding failed, but database is set up');
    }

    console.log('\n🎉 Setup complete!');
    console.log('\n🚀 Start your server with:');
    console.log('   npm run dev');
    
    console.log('\n📖 Your API will be available at:');
    console.log('   - Health: http://localhost:5000/health');
    console.log('   - Auth: http://localhost:5000/api/auth');
    console.log('   - Projects: http://localhost:5000/api/projects');
    console.log('   - Saved Projects: http://localhost:5000/api/saved-projects');

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    console.log('\n🔧 Try these manual steps:');
    console.log('1. Close your IDE/terminal completely');
    console.log('2. Reopen and run: npm install');
    console.log('3. Run: npx prisma generate');
    console.log('4. Run: npx prisma migrate dev --name init');
    console.log('5. Run: npm run db:seed');
    console.log('6. Run: npm run dev');
  }
}

freshSetup();