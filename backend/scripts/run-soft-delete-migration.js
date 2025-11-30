// Script to add soft delete columns to Project table
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function runMigration() {
  try {
    console.log('🔄 Adding soft delete columns to Project table...');

    // Read the SQL migration file
    const sqlPath = path.join(__dirname, '../prisma/migrations/add_soft_delete.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');

    // Execute the SQL
    await prisma.$executeRawUnsafe(sql);

    console.log('✅ Soft delete columns added successfully!');
    console.log('   - updatedAt: TIMESTAMP');
    console.log('   - deletedAt: TIMESTAMP (nullable)');
    console.log('   - isDeleted: BOOLEAN (default: false)');

  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

runMigration();
