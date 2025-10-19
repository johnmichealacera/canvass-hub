import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@canvasshub.com' },
    update: {},
    create: {
      email: 'admin@canvasshub.com',
      name: 'Admin User',
      role: 'ADMIN',
    },
  });

  // Create sample user
  const user = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      name: 'John Doe',
      role: 'USER',
    },
  });

  // Create sample products
  const products = [
    {
      name: 'Office Desk Chair',
      description: 'Ergonomic office chair with lumbar support and adjustable height',
      category: 'Furniture',
      imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop',
    },
    {
      name: 'Standing Desk',
      description: 'Electric height-adjustable standing desk with spacious work surface',
      category: 'Furniture',
      imageUrl: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop',
    },
    {
      name: 'Wireless Mouse',
      description: 'Ergonomic wireless mouse with precision tracking and long battery life',
      category: 'Electronics',
      imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop',
    },
    {
      name: 'Mechanical Keyboard',
      description: 'RGB backlit mechanical keyboard with tactile switches',
      category: 'Electronics',
      imageUrl: 'https://images.unsplash.com/photo-1601445638532-3c6f6c3aa1d6?w=400&h=400&fit=crop',
    },
    {
      name: 'Monitor Stand',
      description: 'Adjustable monitor stand with cable management and extra storage',
      category: 'Accessories',
      imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop',
    },
    {
      name: 'Desk Lamp',
      description: 'LED desk lamp with adjustable brightness and color temperature',
      category: 'Accessories',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    },
    {
      name: 'Laptop Stand',
      description: 'Portable aluminum laptop stand for better ergonomics',
      category: 'Accessories',
      imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop',
    },
    {
      name: 'Office Plant',
      description: 'Low-maintenance office plant to brighten up your workspace',
      category: 'Decor',
      imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop',
    },
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }

  // Create sample canvass request
  const deskChair = await prisma.product.findFirst({ where: { name: 'Office Desk Chair' } });
  const standingDesk = await prisma.product.findFirst({ where: { name: 'Standing Desk' } });
  const wirelessMouse = await prisma.product.findFirst({ where: { name: 'Wireless Mouse' } });

  if (deskChair && standingDesk && wirelessMouse) {
    const canvassRequest = await prisma.canvassRequest.create({
      data: {
        userId: user.id,
        notes: 'Looking for ergonomic office setup for new workspace',
        status: 'PENDING',
        canvassItems: {
          create: [
            { productId: deskChair.id, quantity: 2 },
            { productId: standingDesk.id, quantity: 1 },
            { productId: wirelessMouse.id, quantity: 3 },
          ],
        },
      },
    });

    console.log(`Created canvass request: ${canvassRequest.id}`);
  }

  console.log('✅ Seed completed successfully!');
  console.log(`👤 Admin user: admin@canvasshub.com`);
  console.log(`👤 Sample user: user@example.com`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
