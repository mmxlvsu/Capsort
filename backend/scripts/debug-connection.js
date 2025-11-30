#!/usr/bin/env node

require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

async function debugConnection() {
  console.log('🔍 Debugging Neon database connection...\n');
  
  // Original connection string
  const originalUrl = process.env.DATABASE_URL;
  console.log('Original URL:', originalUrl.replace(/:[^:@]*@/, ':***@'));
  
  // Try different connection variations
  const variations = [
    // Remove sslmode parameter
    originalUrl.replace('?sslmode=require', ''),
    // Add connect_timeout
    originalUrl + '&connect_timeout=10',
    // Try with different SSL mode
    originalUrl.replace('sslmode=require', 'sslmode=prefer'),
  ];
  
  for (let i = 0; i < variations.length; i++) {
    console.log(`\n🔄 Trying variation ${i + 1}...`);
    
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: variations[i]
        }
      },
      log: ['error'],
    });

    try {
      await prisma.$connect();
      console.log('✅ Connection successful with variation', i + 1);
      await prisma.$disconnect();
      return;
    } catch (error) {
      console.log('❌ Failed:', error.message.split('\n')[0]);
      await prisma.$disconnect();
    }
  }
  
  console.log('\n🚨 All connection attempts failed.');
  console.log('\n💡 Next steps:');
  console.log('1. Check your Neon dashboard - the project might be paused');
  console.log('2. Verify the connection string is correct');
  console.log('3. Try regenerating the connection string from Neon console');
}

debugConnection();