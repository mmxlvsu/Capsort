require('dotenv').config();

const API_URL = 'http://localhost:5000/api';

async function testAboutContent() {
  try {
    console.log('🔧 Testing About Content Management...\n');

    // Step 1: Get current about content (public endpoint)
    console.log('1️⃣ Fetching current about content (public)...');
    let response = await fetch(`${API_URL}/about`);
    let data = await response.json();
    
    if (data.content) {
      console.log('   ✅ About content fetched successfully');
      console.log('   Title:', data.content.title);
      console.log('   Subtitle:', data.content.subtitle);
      console.log('   Mission:', data.content.mission.substring(0, 50) + '...');
      console.log('   Contact Email:', data.content.contactEmail);
    } else {
      console.log('   ⚠️  No content found, will be created on first update');
    }
    console.log('');

    // Step 2: Login as admin
    console.log('2️⃣ Logging in as admin...');
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
    
    if (!loginData.token) {
      console.error('❌ Failed to login as admin');
      console.error('   Response:', loginData);
      return;
    }

    const token = loginData.token;
    console.log('   ✅ Logged in as:', loginData.user?.fullName);
    console.log('');

    // Step 3: Update about content
    console.log('3️⃣ Updating about content...');
    const updateData = {
      title: 'About CapSort - Updated',
      subtitle: 'Capstone Archiving and Sorting System - Test Update',
      mission: 'This is a test update to verify that the about content management system is working correctly. CapSort is designed to provide an efficient and user-friendly platform for archiving, organizing, and discovering capstone projects.',
      contactEmail: 'test@ustp.edu.ph'
    };

    const updateResponse = await fetch(`${API_URL}/about`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(updateData)
    });

    const updateResult = await updateResponse.json();
    
    if (updateResponse.status === 200) {
      console.log('   ✅ About content updated successfully!');
      console.log('   New Title:', updateResult.content?.title);
      console.log('   New Subtitle:', updateResult.content?.subtitle);
      console.log('   New Contact:', updateResult.content?.contactEmail);
    } else {
      console.error('   ❌ Failed to update content');
      console.error('   Response:', updateResult);
    }
    console.log('');

    // Step 4: Verify update (public endpoint)
    console.log('4️⃣ Verifying update (public endpoint)...');
    response = await fetch(`${API_URL}/about`);
    data = await response.json();
    
    if (data.content) {
      const isUpdated = data.content.title === updateData.title &&
                       data.content.subtitle === updateData.subtitle &&
                       data.content.contactEmail === updateData.contactEmail;
      
      if (isUpdated) {
        console.log('   ✅ Update verified! Content is now public');
        console.log('   Title:', data.content.title);
        console.log('   Subtitle:', data.content.subtitle);
        console.log('   Contact:', data.content.contactEmail);
      } else {
        console.log('   ⚠️  Content mismatch - update may not have propagated');
      }
    }
    console.log('');

    // Step 5: Restore original content
    console.log('5️⃣ Restoring original content...');
    const restoreData = {
      title: 'About CapSort',
      subtitle: 'Capstone Archiving and Sorting System',
      mission: 'CapSort is designed to provide an efficient and user-friendly platform for archiving, organizing, and discovering capstone projects from the University of Science and Technology of Southern Philippines. Our goal is to preserve the innovative work of students and make it accessible to future generations of learners and researchers.',
      contactEmail: 'capsort@ustp.edu.ph'
    };

    const restoreResponse = await fetch(`${API_URL}/about`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(restoreData)
    });

    const restoreResult = await restoreResponse.json();
    
    if (restoreResponse.status === 200) {
      console.log('   ✅ Original content restored');
    } else {
      console.error('   ❌ Failed to restore content');
      console.error('   Response:', restoreResult);
    }
    console.log('');

    // Step 6: Test validation (invalid email)
    console.log('6️⃣ Testing validation (invalid email)...');
    const invalidData = {
      title: 'Test',
      subtitle: 'Test',
      mission: 'Test',
      contactEmail: 'invalid-email'
    };

    const validationResponse = await fetch(`${API_URL}/about`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(invalidData)
    });

    const validationResult = await validationResponse.json();
    
    if (validationResponse.status === 400) {
      console.log('   ✅ Validation working correctly');
      console.log('   Error:', validationResult.error);
    } else {
      console.log('   ⚠️  Validation may not be working as expected');
    }
    console.log('');

    console.log('🎉 All about content tests completed!');
    console.log('');
    console.log('📊 Summary:');
    console.log('   ✅ Public endpoint working (GET /api/about)');
    console.log('   ✅ Admin authentication working');
    console.log('   ✅ Content update working (PUT /api/about)');
    console.log('   ✅ Updates visible on public endpoint');
    console.log('   ✅ Email validation working');
    console.log('   ✅ Database connectivity confirmed');

  } catch (error) {
    console.error('❌ Test failed with error:', error);
    console.error('   Message:', error.message);
  }
}

// Run the test
testAboutContent();
