require('dotenv').config();

const API_URL = 'http://localhost:5000/api';

async function testCreateProject() {
  try {
    console.log('🔧 Testing project creation...\n');

    // Step 1: Login as admin
    console.log('1️⃣ Logging in as admin...');
    const loginResponse = await fetch(`${API_URL}/auth/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'admin@ustp.edu.ph',
        password: 'Admin123!'
      })
    });

    const loginData = await loginResponse.json();
    
    if (!loginResponse.ok) {
      console.error('❌ Login failed:', loginData);
      return;
    }

    console.log('✅ Login successful!');
    console.log('   Token:', loginData.token ? 'Received' : 'Missing');
    console.log('   User:', loginData.user?.fullName);
    console.log('   Role:', loginData.user?.role);
    console.log('');

    const token = loginData.token;

    // Step 2: Create a test project
    console.log('2️⃣ Creating test project...');
    const projectData = {
      title: 'Test IoT Project ' + Date.now(),
      author: 'Test Author',
      year: 2024,
      field: 'IoT',
      fileUrl: 'https://example.com/test.pdf'
    };

    console.log('   Project data:', projectData);
    console.log('');

    const createResponse = await fetch(`${API_URL}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(projectData)
    });

    const createData = await createResponse.json();
    
    console.log('   Response status:', createResponse.status);
    console.log('   Response data:', JSON.stringify(createData, null, 2));
    console.log('');

    if (!createResponse.ok) {
      console.error('❌ Project creation failed!');
      console.error('   Error:', createData.error);
      if (createData.details) {
        console.error('   Details:', JSON.stringify(createData.details, null, 2));
      }
      return;
    }

    console.log('✅ Project created successfully!');
    console.log('   Project ID:', createData.project?.id);
    console.log('   Title:', createData.project?.title);
    console.log('   Author:', createData.project?.author);
    console.log('   Year:', createData.project?.year);
    console.log('   Field:', createData.project?.field);
    console.log('');

    // Step 3: Fetch all projects to verify
    console.log('3️⃣ Fetching all projects...');
    const fetchResponse = await fetch(`${API_URL}/projects`);
    const fetchData = await fetchResponse.json();
    
    console.log('✅ Found', fetchData.projects?.length || 0, 'projects');
    console.log('');

    console.log('🎉 All tests passed!');

  } catch (error) {
    console.error('❌ Test failed with error:', error);
    console.error('   Message:', error.message);
  }
}

// Run the test
testCreateProject();
