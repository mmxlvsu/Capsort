require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkDatabase() {
  try {
    console.log('📊 Checking database contents...\n');

    // Check users
    const users = await prisma.user.findMany({
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
        createdAt: true
      }
    });

    console.log('👥 Users:');
    users.forEach(user => {
      console.log(`   ${user.id}. ${user.fullName} (${user.email}) - ${user.role}`);
    });
    console.log('');

    // Check projects
    const projects = await prisma.project.findMany({
      select: {
        id: true,
        title: true,
        author: true,
        year: true,
        field: true,
        isDeleted: true
      }
    });

    console.log('📄 Projects:');
    projects.forEach(project => {
      console.log(`   ${project.id}. ${project.title} - ${project.field} (${project.year})${project.isDeleted ? ' [DELETED]' : ''}`);
    });
    console.log('');

    // Check saved projects
    const savedProjects = await prisma.savedProject.findMany({
      include: {
        user: { select: { fullName: true } },
        project: { select: { title: true } }
      }
    });

    console.log('💾 Saved Projects:');
    if (savedProjects.length === 0) {
      console.log('   None');
    } else {
      savedProjects.forEach(sp => {
        console.log(`   ${sp.user.fullName} saved "${sp.project.title}"`);
      });
    }
    console.log('');

    // Check about content
    const aboutContent = await prisma.aboutContent.findFirst();
    console.log('📖 About Content:');
    if (aboutContent) {
      console.log(`   Title: ${aboutContent.title}`);
      console.log(`   Email: ${aboutContent.contactEmail}`);
    } else {
      console.log('   None');
    }
    console.log('');

    console.log('✅ Database check complete!');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkDatabase();
