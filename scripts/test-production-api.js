#!/usr/bin/env node

const https = require('https');

const API_BASE_URL = 'https://capsort-backend.onrender.com/api';

console.log('🧪 Testing Production API Connection...\n');

async function testEndpoint(path, method = 'GET', description) {
  return new Promise((resolve) => {
    const url = `${API_BASE_URL}${path}`;
    console.log(`📡 Testing: ${description}`);
    console.log(`   URL: ${url}`);
    
    const req = https.request(url, { method }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          console.log(`   ✅ Success: ${res.statusCode}`);
          resolve(true);
        } else {
          console.log(`   ⚠️  Status: ${res.statusCode}`);
          resolve(false);
        }
      });
    });
    
    req.on('error', (error) => {
      console.log(`   ❌ Error: ${error.message}`);
      resolve(false);
    });
    
    req.setTimeout(10000, () => {
      console.log(`   ⏰ Timeout: Request took too long`);
      req.destroy();
      resolve(false);
    });
    
    req.end();
  });
}

async function runTests() {
  console.log('🔍 Testing key API endpoints...\n');
  
  const tests = [
    { path: '/auth/login', method: 'POST', desc: 'Auth Login Endpoint' },
    { path: '/auth/register', method: 'POST', desc: 'Auth Register Endpoint' },
    { path: '/auth/forgot-password', method: 'POST', desc: 'Password Reset Endpoint' },
    { path: '/projects', method: 'GET', desc: 'Projects List Endpoint' },
  ];
  
  let passed = 0;
  let total = tests.length;
  
  for (const test of tests) {
    const result = await testEndpoint(test.path, test.method, test.desc);
    if (result) passed++;
    console.log('');
  }
  
  // Test health endpoint separately
  console.log('📡 Testing: Health Check');
  console.log('   URL: https://capsort-backend.onrender.com/health');
  
  const healthResult = await new Promise((resolve) => {
    https.get('https://capsort-backend.onrender.com/health', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          console.log('   ✅ Success: Backend is healthy');
          resolve(true);
        } else {
          console.log(`   ❌ Status: ${res.statusCode}`);
          resolve(false);
        }
      });
    }).on('error', (error) => {
      console.log(`   ❌ Error: ${error.message}`);
      resolve(false);
    });
  });
  
  if (healthResult) passed++;
  total++;
  
  console.log('\n📊 Test Results:');
  console.log(`   Passed: ${passed}/${total}`);
  console.log(`   Success Rate: ${Math.round((passed/total) * 100)}%`);
  
  if (passed === total) {
    console.log('\n🎉 All tests passed! Your backend is ready for frontend deployment.');
  } else if (passed > total * 0.7) {
    console.log('\n⚠️  Most tests passed. Backend is likely ready, but check failed endpoints.');
  } else {
    console.log('\n❌ Multiple tests failed. Please check your backend deployment.');
  }
  
  console.log('\n💡 Note: Some endpoints may return 400/401 errors due to missing data,');
  console.log('   but this confirms they are accessible and responding correctly.');
}

runTests();