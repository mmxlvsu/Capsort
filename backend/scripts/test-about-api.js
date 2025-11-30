// Test script for About API endpoints
require('dotenv').config();
const fetch = require('node-fetch');

const API_URL = process.env.API_URL || 'http://localhost:5000/api';

async function testAboutAPI() {
  console.log('🧪 Testing About API Endpoints\n');

  try {
    // Test 1: GET /api/about (public)
    console.log('1️⃣ Testing GET /api/about (public access)...');
    const getResponse = await fetch(`${API_URL}/about`);
    const getData = await getResponse.json();
    
    console.log('Status:', getResponse.status);
    console.log('Response:', JSON.stringify(getData, null, 2));
    
    if (getResponse.ok && getData.content) {
      console.log('✅ GET endpoint working!\n');
    } else {
      console.log('❌ GET endpoint failed!\n');
      return;
    }

    // Test 2: PUT /api/about (requires admin auth)
    console.log('2️⃣ Testing PUT /api/about (admin only)...');
    console.log('⚠️  This requires admin authentication token');
    console.log('   To test: Login as admin and copy the token from localStorage\n');

    // Instructions for manual testing
    console.log('📝 Manual Testing Instructions:');
    console.log('   1. Open browser console on the admin about page');
    console.log('   2. Run: localStorage.getItem("authToken")');
    console.log('   3. Copy the token');
    console.log('   4. Test with curl:');
    console.log(`   curl -X PUT ${API_URL}/about \\`);
    console.log('     -H "Content-Type: application/json" \\');
    console.log('     -H "Authorization: Bearer YOUR_TOKEN_HERE" \\');
    console.log('     -d \'{"title":"Test","subtitle":"Test","mission":"Test","contactEmail":"test@ustp.edu.ph"}\'');

  } catch (error) {
    console.error('❌ Error testing API:', error.message);
  }
}

testAboutAPI();
