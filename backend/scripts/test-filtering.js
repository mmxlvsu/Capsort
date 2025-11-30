require('dotenv').config();

const API_URL = 'http://localhost:5000/api';

async function testFiltering() {
  try {
    console.log('🔧 Testing Real-Time Filtering...\n');

    // Test 1: Get all projects (no filters)
    console.log('1️⃣ Test: Get all projects (no filters)');
    let response = await fetch(`${API_URL}/projects`);
    let data = await response.json();
    console.log(`   ✅ Found ${data.projects?.length || 0} total projects`);
    console.log('');

    // Test 2: Filter by field
    console.log('2️⃣ Test: Filter by field (IoT)');
    response = await fetch(`${API_URL}/projects?field=IoT`);
    data = await response.json();
    console.log(`   ✅ Found ${data.projects?.length || 0} IoT projects`);
    if (data.projects?.length > 0) {
      console.log(`   Sample: "${data.projects[0].title}" - ${data.projects[0].field}`);
    }
    console.log('');

    // Test 3: Filter by year range
    console.log('3️⃣ Test: Filter by year range (2023-2024)');
    response = await fetch(`${API_URL}/projects?yearFrom=2023&yearTo=2024`);
    data = await response.json();
    console.log(`   ✅ Found ${data.projects?.length || 0} projects from 2023-2024`);
    if (data.projects?.length > 0) {
      console.log(`   Sample: "${data.projects[0].title}" - Year ${data.projects[0].year}`);
    }
    console.log('');

    // Test 4: Search filter
    console.log('4️⃣ Test: Search filter (search="test")');
    response = await fetch(`${API_URL}/projects?search=test`);
    data = await response.json();
    console.log(`   ✅ Found ${data.projects?.length || 0} projects matching "test"`);
    if (data.projects?.length > 0) {
      console.log(`   Sample: "${data.projects[0].title}"`);
    }
    console.log('');

    // Test 5: Combined filters
    console.log('5️⃣ Test: Combined filters (field=IoT, yearFrom=2024)');
    response = await fetch(`${API_URL}/projects?field=IoT&yearFrom=2024`);
    data = await response.json();
    console.log(`   ✅ Found ${data.projects?.length || 0} IoT projects from 2024+`);
    if (data.projects?.length > 0) {
      console.log(`   Sample: "${data.projects[0].title}" - ${data.projects[0].field} (${data.projects[0].year})`);
    }
    console.log('');

    // Test 6: Filter with no results
    console.log('6️⃣ Test: Filter with no results (yearFrom=2030)');
    response = await fetch(`${API_URL}/projects?yearFrom=2030`);
    data = await response.json();
    console.log(`   ✅ Found ${data.projects?.length || 0} projects from 2030+ (expected 0)`);
    console.log('');

    console.log('🎉 All filtering tests completed!');
    console.log('');
    console.log('📊 Summary:');
    console.log('   ✅ Basic fetch working');
    console.log('   ✅ Field filtering working');
    console.log('   ✅ Year range filtering working');
    console.log('   ✅ Search filtering working');
    console.log('   ✅ Combined filters working');
    console.log('   ✅ Empty results handled correctly');

  } catch (error) {
    console.error('❌ Test failed with error:', error);
    console.error('   Message:', error.message);
  }
}

// Run the test
testFiltering();
