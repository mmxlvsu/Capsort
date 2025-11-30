#!/usr/bin/env node

const { execSync } = require('child_process');

console.log('🚀 Starting Capsort Backend\n');

// Check if we can connect to database
console.log('🔍 Checking database connection...');

try {
  execSync('npm run test:connection', { stdio: 'pipe' });
  console.log('✅ Database connection successful!');
  
  // Check if database is set up
  console.log('📊 Checking database setup...');
  try {
    execSync('npx prisma db pull', { stdio: 'pipe' });
    console.log('✅ Database schema exists');
  } catch (error) {
    console.log('⚠️  Database needs setup, running migrations...');
    try {
      execSync('npm run db:setup', { stdio: 'inherit' });
      console.log('✅ Database setup complete!');
    } catch (setupError) {
      console.log('❌ Database setup failed, but starting server anyway...');
    }
  }
  
} catch (error) {
  console.log('❌ Database connection failed');
  console.log('⚠️  Starting server without database (some features won\'t work)');
  console.log('💡 Fix database connection and restart');
}

console.log('\n🎯 Starting development server...');
console.log('📍 Server will be available at: http://localhost:5000');
console.log('🔍 Health check: http://localhost:5000/health');
console.log('📖 API endpoints:');
console.log('   - Auth: http://localhost:5000/api/auth');
console.log('   - Projects: http://localhost:5000/api/projects');
console.log('   - Saved Projects: http://localhost:5000/api/saved-projects');

console.log('\n🛑 Press Ctrl+C to stop the server\n');

// Start the server
try {
  execSync('npm run dev', { stdio: 'inherit' });
} catch (error) {
  console.log('\n❌ Server failed to start');
  console.log('🔧 Try running: npm install');
}