#!/usr/bin/env node

require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

async function testConnection() {
  console.log('🔍 Testing Neon database connection...\n');
  
  const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });

  try {
    console.log('📡 Attempting to connect to database...');
    
    // Test basic connection
    await prisma.$connect();
    console.log('✅ Successfully connected to Neon database!');
    
    // Test a simple query
    console.log('🔍 Testing database query...');
    const result = await prisma.$queryRaw`SELECT version()`;
    console.log('✅ Database query successful!');
    console.log('📊 PostgreSQL Version:', result[0].version);
    
    // Check if tables exist
    console.log('🔍 Checking database schema...');
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;
    
    if (tables.length === 0) {
      console.log('⚠️  No tables found. You need to run migrations.');
      console.log('💡 Run: npm run db:migrate');
    } else {
      console.log('✅ Found tables:', tables.map(t => t.table_name).join(', '));
    }
    
  } catch (error) {
    console.error('❌ Connection failed!');
    console.error('Error details:', error.message);
    
    if (error.message.includes("Can't reach database server")) {
      console.log('\n🔧 Troubleshooting steps:');
      console.log('1. Check if your Neon project is active (not paused)');
      console.log('2. Verify your connection string in .env file');
      console.log('3. Ensure your internet connection is stable');
      console.log('4. Try removing &channel_binding=require from connection string');
    }
    
    if (error.message.includes('password authentication failed')) {
      console.log('\n🔧 Authentication issue:');
      console.log('1. Check your username and password in the connection string');
      console.log('2. Regenerate your password in Neon console if needed');
    }
    
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();