import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { DESTINATIONS } from '../src/data/destinations.js';
import { TOURS } from '../src/data/tours.js';
import { BLOG_POSTS } from '../src/data/blog.js';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@oraegypttravel.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'ChangeMe123!';
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      passwordHash,
      name: 'ORA Admin',
      role: 'ADMIN',
    },
  });

  for (const dest of DESTINATIONS) {
    await prisma.destination.upsert({
      where: { slug: dest.id },
      update: {},
      create: {
        slug: dest.id,
        name: dest.name,
        region: dest.region,
        tagline: dest.tagline,
        description: dest.description,
        image: dest.image,
        experiences: JSON.stringify(dest.experiences),
      },
    });
  }

  for (const tour of TOURS) {
    await prisma.tour.upsert({
      where: { slug: tour.id },
      update: {},
      create: {
        slug: tour.id,
        title: tour.title,
        destination: tour.destination,
        destinations: JSON.stringify(tour.destinations),
        durationDays: tour.durationDays,
        durationLabel: tour.durationLabel,
        category: tour.category,
        style: tour.style,
        priceDisplay: tour.priceDisplay,
        featured: Boolean(tour.featured),
        image: tour.image,
        gallery: JSON.stringify(tour.gallery || [tour.image]),
        overview: tour.overview,
        highlights: JSON.stringify(tour.highlights),
        itinerary: JSON.stringify(tour.itinerary),
        included: JSON.stringify(tour.included),
        excluded: JSON.stringify(tour.excluded),
        travelInfo: tour.travelInfo || '',
      },
    });
  }

  for (const post of BLOG_POSTS) {
    await prisma.blogPost.upsert({
      where: { slug: post.id },
      update: {},
      create: {
        slug: post.id,
        title: post.title,
        category: post.category,
        readTime: post.readTime,
        image: post.image,
        excerpt: post.excerpt,
        content: JSON.stringify(post.content),
        published: true,
      },
    });
  }

  const defaultSettings = [
    { key: 'email', value: 'info@oraegypttravel.com' },
    { key: 'phone', value: '+20 000 000 0000' },
    { key: 'whatsapp', value: 'https://wa.me/200000000000' },
    { key: 'address', value: 'Cairo, Egypt' },
    { key: 'instagram', value: 'https://instagram.com/' },
    { key: 'facebook', value: 'https://facebook.com/' },
  ];

  for (const setting of defaultSettings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    });
  }

  console.log('Seed completed successfully.');
  console.log(`Admin login: ${adminEmail} / ${adminPassword}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
