require('dotenv').config();

const API_URL = 'http://localhost:5000/api';

async function testRegistration() {
  try {
    console.log('🧪 Testing Registration Endpoint...\n');

    const testData = {
      fullName: 'Test User New',
      contactNumber: '+639123456789',
      email: 'testuser' + Date.now() + '@example.com',
      password: 'Test123!'
    };

    console.log('📤 Sending registration request...');
    console.log('Data:', testData);
    console.log('');

    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testData)
    });

    const data = await response.json();

    console.log('📥 Response Status:', response.status);
    console.log('📥 Response Data:', JSON.stringify(data, null, 2));
    console.log('');

    if (response.status === 201) {
      console.log('✅ Registration successful!');
    } else {
      console.log('❌ Registration failed!');
      console.log('Error:', data.error);
      if (data.details) {
        console.log('Details:', data.details);
      }
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testRegistration();
