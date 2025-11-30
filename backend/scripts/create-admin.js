require('dotenv').config();
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createAdminAccount() {
  try {
    console.log('🔧 Creating admin account...');

    // Admin account details
    const adminData = {
      fullName: 'System Administrator',
      email: 'admin@ustp.edu.ph',
      contactNumber: '+63 912 345 6789',
      password: 'Admin123!',
      role: 'admin'
    };

    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: adminData.email }
    });

    if (existingAdmin) {
      console.log('⚠️  Admin account already exists!');
      console.log('📧 Email:', adminData.email);
      console.log('🔑 Password: Admin123!');
      console.log('👤 Role:', existingAdmin.role);
      return;
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(adminData.password, saltRounds);

    // Create admin user
    const admin = await prisma.user.create({
      data: {
        fullName: adminData.fullName,
        email: adminData.email,
        contactNumber: adminData.contactNumber,
        password: hashedPassword,
        role: adminData.role
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        contactNumber: true,
        role: true,
        createdAt: true
      }
    });

    console.log('✅ Admin account created successfully!');
    console.log('📧 Email:', adminData.email);
    console.log('🔑 Password:', adminData.password);
    console.log('👤 Role:', admin.role);
    console.log('🆔 ID:', admin.id);
    console.log('📅 Created:', admin.createdAt);
    console.log('');
    console.log('🚀 You can now login as admin using:');
    console.log('   Email: admin@ustp.edu.ph');
    console.log('   Password: Admin123!');

  } catch (error) {
    console.error('❌ Error creating admin account:', error);
    
    if (error.code === 'P2002') {
      console.log('⚠️  Admin account with this email already exists!');
    }
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
createAdminAccount();