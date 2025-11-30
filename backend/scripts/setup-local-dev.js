#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

async function setupLocalDev() {
  console.log('🚀 Setting up local development environment\n');
  
  try {
    // Create local .env for development
    const envContent = `# Local Development Database
DATABASE_URL="file:./dev.db"
DIRECT_URL="file:./dev.db"

# JWT Configuration  
JWT_SECRET="6f8d302e289fd800dde6cff1799034d448f5eb96d116913153cb8d9b13f4a7ee2fbe604de3a18a45ac7eaafb249a63702b4c701e5a5525ab4a1d234f3ca03fc9"
JWT_EXPIRES_IN="7d"

# Server Configuration
PORT=5000
NODE_ENV="development"
CLIENT_URL="http://localhost:3000"
`;

    // Backup current .env
    const envPath = path.join(process.cwd(), '.env');
    const backupPath = path.join(process.cwd(), '.env.neon.backup');
    
    if (fs.existsSync(envPath)) {
      fs.copyFileSync(envPath, backupPath);
      console.log('📁 Backed up current .env to .env.neon.backup');
    }
    
    // Write local development .env
    fs.writeFileSync(envPath, envContent);
    console.log('✅ Created local development .env file');
    
    // Update Prisma schema for SQLite
    const schemaPath = path.join(process.cwd(), 'prisma', 'schema.prisma');
    let schemaContent = fs.readFileSync(schemaPath, 'utf8');
    
    // Backup original schema
    fs.writeFileSync(schemaPath + '.backup', schemaContent);
    console.log('📁 Backed up Prisma schema');
    
    // Update schema for SQLite
    schemaContent = schemaContent.replace(
      'provider  = "postgresql"',
      'provider  = "sqlite"'
    );
    schemaContent = schemaContent.replace(
      'directUrl = env("DIRECT_URL")',
      '// directUrl = env("DIRECT_URL") // Not needed for SQLite'
    );
    
    fs.writeFileSync(schemaPath, schemaContent);
    console.log('✅ Updated Prisma schema for SQLite');
    
    // Install SQLite if needed
    console.log('📦 Installing dependencies...');
    try {
      execSync('npm install', { stdio: 'inherit' });
    } catch (error) {
      console.log('⚠️  npm install had some issues, but continuing...');
    }
    
    // Generate Prisma client
    console.log('🔧 Generating Prisma client...');
    execSync('npx prisma generate', { stdio: 'inherit' });
    
    // Run migrations
    console.log('📊 Running database migrations...');
    execSync('npx prisma migrate dev --name init', { stdio: 'inherit' });
    
    // Seed database
    console.log('🌱 Seeding database...');
    execSync('npm run db:seed', { stdio: 'inherit' });
    
    console.log('\n🎉 Local development setup complete!');
    console.log('\n🚀 You can now start your backend:');
    console.log('   npm run dev');
    console.log('\n📝 Note: This uses SQLite for local development.');
    console.log('📝 Your Neon config is backed up in .env.neon.backup');
    console.log('📝 When Neon is working, you can restore it.');
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    console.log('\n🔧 Manual steps:');
    console.log('1. Make sure you have Node.js installed');
    console.log('2. Run: npm install');
    console.log('3. Try the setup again');
  }
}

setupLocalDev();