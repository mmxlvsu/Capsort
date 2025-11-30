const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@capsort.com' },
    update: {},
    create: {
      fullName: 'System Administrator',
      contactNumber: '+1234567890',
      email: 'admin@capsort.com',
      password: hashedPassword,
      role: 'admin',
    },
  });

  console.log('✅ Created admin user:', admin.email);

  // Create sample student user
  const studentPassword = await bcrypt.hash('student123', 10);
  
  const student = await prisma.user.upsert({
    where: { email: 'student@example.com' },
    update: {},
    create: {
      fullName: 'John Doe',
      contactNumber: '+1234567891',
      email: 'student@example.com',
      password: studentPassword,
      role: 'student',
    },
  });

  console.log('✅ Created student user:', student.email);

  // Create sample projects
  const sampleProjects = [
    {
      title: 'IoT Smart Home System',
      author: 'Jane Smith',
      year: 2024,
      field: 'IoT',
      fileUrl: 'https://example.com/project1.pdf',
      uploadedBy: admin.id,
    },
    {
      title: 'Database Management System for Library',
      author: 'Bob Johnson',
      year: 2023,
      field: 'Database',
      fileUrl: 'https://example.com/project2.pdf',
      uploadedBy: admin.id,
    },
    {
      title: 'Machine Learning Prediction Model',
      author: 'Alice Brown',
      year: 2024,
      field: 'AI/ML',
      fileUrl: 'https://example.com/project3.pdf',
      uploadedBy: student.id,
    },
  ];

  for (const projectData of sampleProjects) {
    const project = await prisma.project.upsert({
      where: { 
        title_author: {
          title: projectData.title,
          author: projectData.author
        }
      },
      update: {},
      create: projectData,
    });
    console.log('✅ Created project:', project.title);
  }

  console.log('🎉 Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });