import bcrypt from 'bcrypt';
import { PrismaClient, Role } from '@prisma/client';
import env from '../src/config/env';

const prisma = new PrismaClient();

const seed = async () => {
  try {
    const hashedPassword = await bcrypt.hash(env.SUPER_ADMIN_PASSWORD, 10);

    await prisma.user.upsert({
      where: { email: env.SUPER_ADMIN_EMAIL },
      update: {},
      create: {
        name: 'super-admin',
        role: Role.SUPER_ADMIN,
        email: env.SUPER_ADMIN_EMAIL,
        password: hashedPassword,
      },
    });

    console.log('Super Admin created');
    await prisma.$disconnect();
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }
};

seed();
