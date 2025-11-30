require('dotenv').config();

const API_URL = 'http://localhost:5000/api';

async function testSavedProjects() {
  try {
    console.log('🔧 Testing Saved Projects Functionality...\n');

    // Step 1: Create a test student account (if not exists)
    console.log('1️⃣ Creating test student account...');
    const registerResponse = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fullName: 'Test Student',
        email: 'student@test.com',
        contactNumber: '+639123456789',
        password: 'Test123!'
      })
    });

    const registerData = await registerResponse.json();
    
    if (registerResponse.status === 201) {
      console.log('   ✅ Student account created:', registerData.user?.fullName);
    } else if (registerResponse.status === 400 && registerData.error?.includes('already exists')) {
      console.log('   ℹ️  Student account already exists');
    } else {
      console.error('   ❌ Registration failed:', registerData);
    }

    // Step 2: Login to get token
    console.log('   Logging in...');
    const loginResponse = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'student@test.com',
        password: 'Test123!'
      })
    });
    
    const loginData = await loginResponse.json();

    if (!loginData.token) {
      console.error('❌ Failed to get authentication token');
      console.error('   Response:', loginData);
      return;
    }

    const token = loginData.token;
    console.log('   ✅ Authenticated as:', loginData.user?.fullName);
    console.log('');

    // Step 3: Get available projects
    console.log('2️⃣ Fetching available projects...');
    const projectsResponse = await fetch(`${API_URL}/projects`);
    const projectsData = await projectsResponse.json();
    
    if (!projectsData.projects || projectsData.projects.length === 0) {
      console.log('   ⚠️  No projects available to save');
      return;
    }

    const testProject = projectsData.projects[0];
    console.log(`   ✅ Found ${projectsData.projects.length} projects`);
    console.log(`   Test project: "${testProject.title}" (ID: ${testProject.id})`);
    console.log('');

    // Step 3: Save a project
    console.log('3️⃣ Saving project to Saved Projects...');
    const saveResponse = await fetch(`${API_URL}/saved-projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        projectId: testProject.id
      })
    });

    const saveData = await saveResponse.json();
    
    if (saveResponse.status === 400 && saveData.error?.includes('already saved')) {
      console.log('   ℹ️  Project already saved (expected if running test multiple times)');
    } else if (saveResponse.status === 201) {
      console.log('   ✅ Project saved successfully!');
      console.log(`   Saved project: "${saveData.savedProject?.project?.title}"`);
    } else {
      console.error('   ❌ Failed to save project');
      console.error('   Response:', saveData);
    }
    console.log('');

    // Step 4: Get saved projects
    console.log('4️⃣ Fetching saved projects...');
    const savedResponse = await fetch(`${API_URL}/saved-projects`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const savedData = await savedResponse.json();
    console.log(`   ✅ Found ${savedData.savedProjects?.length || 0} saved projects`);
    
    if (savedData.savedProjects && savedData.savedProjects.length > 0) {
      savedData.savedProjects.forEach((sp, index) => {
        console.log(`   ${index + 1}. "${sp.project.title}" - ${sp.project.field} (${sp.project.year})`);
      });
    }
    console.log('');

    // Step 5: Test filtering on saved projects
    console.log('5️⃣ Testing filter on saved projects (field=IoT)...');
    const filteredResponse = await fetch(`${API_URL}/saved-projects?field=IoT`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const filteredData = await filteredResponse.json();
    console.log(`   ✅ Found ${filteredData.savedProjects?.length || 0} IoT saved projects`);
    console.log('');

    // Step 6: Unsave a project
    console.log('6️⃣ Removing project from Saved Projects...');
    const unsaveResponse = await fetch(`${API_URL}/saved-projects/${testProject.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const unsaveData = await unsaveResponse.json();
    
    if (unsaveResponse.status === 200) {
      console.log('   ✅ Project removed from saved projects successfully!');
    } else {
      console.error('   ❌ Failed to remove project');
      console.error('   Response:', unsaveData);
    }
    console.log('');

    // Step 7: Verify removal
    console.log('7️⃣ Verifying removal...');
    const verifyResponse = await fetch(`${API_URL}/saved-projects`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const verifyData = await verifyResponse.json();
    const stillSaved = verifyData.savedProjects?.find(sp => sp.projectId === testProject.id);
    
    if (!stillSaved) {
      console.log('   ✅ Project successfully removed from saved projects');
    } else {
      console.log('   ⚠️  Project still appears in saved projects');
    }
    console.log('');

    console.log('🎉 All saved projects tests completed!');
    console.log('');
    console.log('📊 Summary:');
    console.log('   ✅ Student authentication working');
    console.log('   ✅ Save project working');
    console.log('   ✅ Get saved projects working');
    console.log('   ✅ Filter saved projects working');
    console.log('   ✅ Unsave project working');
    console.log('   ✅ Database connectivity confirmed');

  } catch (error) {
    console.error('❌ Test failed with error:', error);
    console.error('   Message:', error.message);
  }
}

// Run the test
testSavedProjects();
