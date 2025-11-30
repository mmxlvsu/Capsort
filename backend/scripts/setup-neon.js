#!/usr/bin/env node

const readline = require('readline');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🚀 Capsort Backend - Neon Database Setup\n');

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function setupNeon() {
  try {
    console.log('Please provide your Neon database connection details:\n');
    
    const connectionString = await askQuestion('Enter your Neon connection string: ');
    
    if (!connectionString.includes('neon.tech')) {
      console.log('⚠️  Warning: This doesn\'t look like a Neon connection string.');
      const confirm = await askQuestion('Continue anyway? (y/N): ');
      if (confirm.toLowerCase() !== 'y') {
        console.log('Setup cancelled.');
        process.exit(0);
      }
    }

    // Generate JWT secret
    const jwtSecret = crypto.randomBytes(64).toString('hex');
    
    const clientUrl = await askQuestion('Enter your frontend URL (default: http://localhost:3000): ') || 'http://localhost:3000';
    
    // Create .env file
    const envContent = `# Neon Database Configuration
DATABASE_URL="${connectionString}"
DIRECT_URL="${connectionString}"

# JWT Configuration  
JWT_SECRET="${jwtSecret}"
JWT_EXPIRES_IN="7d"

# Server Configuration
PORT=5000
NODE_ENV="development"
CLIENT_URL="${clientUrl}"
`;

    const envPath = path.join(process.cwd(), '.env');
    fs.writeFileSync(envPath, envContent);
    
    console.log('\n✅ Environment file created successfully!');
    console.log('📁 Location:', envPath);
    console.log('\n🔑 Generated JWT Secret:', jwtSecret.substring(0, 20) + '...');
    
    console.log('\n📋 Next steps:');
    console.log('1. Run: npm install');
    console.log('2. Run: npm run db:setup');
    console.log('3. Run: npm run dev');
    
    console.log('\n🎉 Setup complete! Your Capsort backend is ready to use with Neon.');
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

setupNeon();