#!/usr/bin/env node

const readline = require('readline');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function setupBackend() {
  console.log('🚀 Capsort Backend Setup\n');
  
  try {
    console.log('📋 Current Status Check:');
    console.log('❌ Database connection failed');
    console.log('⚠️  Your Neon database appears to be paused or unreachable\n');
    
    console.log('🔧 To fix this, please:');
    console.log('1. Go to https://console.neon.tech/');
    console.log('2. Find your project (it might show as "Paused")');
    console.log('3. Click to resume/activate it');
    console.log('4. Copy the new connection string\n');
    
    const hasNewConnection = await askQuestion('Do you have a working Neon connection string? (y/N): ');
    
    if (hasNewConnection.toLowerCase() === 'y') {
      const connectionString = await askQuestion('Enter your Neon connection string: ');
      
      // Update .env file
      const envPath = path.join(process.cwd(), '.env');
      let envContent = fs.readFileSync(envPath, 'utf8');
      
      // Replace DATABASE_URL and DIRECT_URL
      envContent = envContent.replace(/DATABASE_URL="[^"]*"/, `DATABASE_URL="${connectionString}"`);
      envContent = envContent.replace(/DIRECT_URL="[^"]*"/, `DIRECT_URL="${connectionString}"`);
      
      fs.writeFileSync(envPath, envContent);
      console.log('✅ Updated .env file with new connection string');
      
      // Test connection
      console.log('\n🔍 Testing new connection...');
      try {
        execSync('npm run test:connection', { stdio: 'inherit' });
        
        console.log('\n🎉 Connection successful! Setting up database...');
        
        // Run database setup
        console.log('📊 Running database migrations...');
        execSync('npm run db:setup', { stdio: 'inherit' });
        
        console.log('\n✅ Backend setup complete!');
        console.log('\n🚀 Ready to start:');
        console.log('   npm run dev');
        
      } catch (error) {
        console.log('\n❌ Connection still failing. Please check:');
        console.log('1. Neon project is active (not paused)');
        console.log('2. Connection string is correct');
        console.log('3. Try generating a new connection string');
      }
      
    } else {
      console.log('\n📝 Steps to get a working connection:');
      console.log('1. Go to https://console.neon.tech/');
      console.log('2. Create a new project or resume existing one');
      console.log('3. Copy the connection string');
      console.log('4. Run this script again');
    }
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
  } finally {
    rl.close();
  }
}

setupBackend();