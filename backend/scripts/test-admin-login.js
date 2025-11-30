require('dotenv').config();
const fetch = require('node-fetch');

const API_BASE_URL = 'http://localhost:5000/api';

async function testAdminLogin() {
  try {
    console.log('🧪 Testing Admin Login...');
    console.log('📡 API URL:', API_BASE_URL);
    
    // Test admin login
    const loginData = {
      email: 'admin@ustp.edu.ph',
      password: 'Admin123!'
    };

    console.log('📧 Testing with email:', loginData.email);
    
    const response = await fetch(`${API_BASE_URL}/auth/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    });

    const data = await response.json();

    if (response.ok) {
      console.log('✅ Admin login successful!');
      console.log('👤 User:', data.user.fullName);
      console.log('📧 Email:', data.user.email);
      console.log('🔑 Role:', data.user.role);
      console.log('🎫 Token received:', data.token ? 'Yes' : 'No');
      console.log('💬 Message:', data.message);
    } else {
      console.log('❌ Admin login failed!');
      console.log('📄 Response:', data);
    }

  } catch (error) {
    console.error('💥 Error testing admin login:', error.message);
    console.log('⚠️  Make sure the backend server is running on port 5000');
  }
}

// Test regular login endpoint too
async function testRegularLogin() {
  try {
    console.log('\n🧪 Testing Regular Login Endpoint...');
    
    const loginData = {
      email: 'admin@ustp.edu.ph',
      password: 'Admin123!'
    };

    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    });

    const data = await response.json();

    if (response.ok) {
      console.log('✅ Regular login successful!');
      console.log('👤 User:', data.user.fullName);
      console.log('🔑 Role:', data.user.role);
      console.log('💬 Message:', data.message);
    } else {
      console.log('❌ Regular login failed!');
      console.log('📄 Response:', data);
    }

  } catch (error) {
    console.error('💥 Error testing regular login:', error.message);
  }
}

// Run tests
async function runTests() {
  await testAdminLogin();
  await testRegularLogin();
}

runTests();