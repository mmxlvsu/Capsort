#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Capsort Frontend - Vercel Deployment Helper\n');

// Check if we're in the right directory
const packageJsonPath = path.join(process.cwd(), 'package.json');
if (!fs.existsSync(packageJsonPath)) {
  console.error('❌ Error: package.json not found. Please run this script from the frontend root directory.');
  process.exit(1);
}

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
if (packageJson.name !== 'capsort') {
  console.error('❌ Error: This doesn\'t appear to be the Capsort frontend directory.');
  process.exit(1);
}

console.log('✅ Verified: Running from Capsort frontend directory\n');

// Pre-deployment checks
console.log('🔍 Running pre-deployment checks...\n');

try {
  // Check if build works
  console.log('📦 Testing build process...');
  execSync('npm run build', { stdio: 'pipe' });
  console.log('✅ Build successful\n');

  // Check environment variables
  console.log('🔧 Checking environment configuration...');
  const envExists = fs.existsSync('.env');
  const envProdExists = fs.existsSync('.env.production');
  const vercelJsonExists = fs.existsSync('vercel.json');
  const redirectsExists = fs.existsSync('public/_redirects');

  console.log(`   .env file: ${envExists ? '✅' : '❌'}`);
  console.log(`   .env.production file: ${envProdExists ? '✅' : '❌'}`);
  console.log(`   vercel.json: ${vercelJsonExists ? '✅' : '❌'}`);
  console.log(`   _redirects: ${redirectsExists ? '✅' : '❌'}`);

  if (!envProdExists || !vercelJsonExists || !redirectsExists) {
    console.log('\n⚠️  Some configuration files are missing. Please run the setup first.');
    process.exit(1);
  }

  console.log('\n✅ All configuration files present\n');

  // Display deployment instructions
  console.log('📋 Deployment Instructions:\n');
  console.log('1. 🌐 Go to https://vercel.com/dashboard');
  console.log('2. 📁 Click "New Project" and import your GitHub repository');
  console.log('3. ⚙️  Configure build settings:');
  console.log('   - Framework: Create React App');
  console.log('   - Root Directory: frontend_capsort/Capsort');
  console.log('   - Build Command: npm run build');
  console.log('   - Output Directory: build');
  console.log('4. 🔧 Add environment variables:');
  console.log('   - REACT_APP_API_URL = https://capsort-backend.onrender.com/api');
  console.log('   - GENERATE_SOURCEMAP = false');
  console.log('5. 🚀 Click "Deploy"\n');

  console.log('🎉 Your frontend is ready for Vercel deployment!');
  console.log('📖 For detailed instructions, see: VERCEL-DEPLOYMENT-GUIDE.md');

} catch (error) {
  console.error('❌ Pre-deployment check failed:', error.message);
  console.log('\n🔧 Troubleshooting:');
  console.log('1. Run "npm install" to ensure all dependencies are installed');
  console.log('2. Check for any TypeScript or ESLint errors');
  console.log('3. Verify your .env files are properly configured');
  process.exit(1);
}