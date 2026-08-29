import bcrypt from 'bcryptjs'
import prisma from '../src/lib/prisma'

const services = [
  {
    slug: 'installation',
    title: 'Rolling Shutter Installation',
    description: 'New manual and automatic shutters measured, fabricated and fitted on site.',
    imageUrl: 'https://overheaddoor-production-assets.azureedge.net/assets/images/default-source/product-images/commercial/rolling-shutter/allura-shutter-653-powder-coat.jpg?sfvrsn=5eea7e43_1',
    order: 1,
  },
  {
    slug: 'repair',
    title: 'Rolling Shutter Repair',
    description: 'Stuck, jammed or noisy shutter? Our team gets it moving the same day.',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRop3j5ILrXarlU1RFWi6uGWN_qS-Z6SAN46CmrW-W2a6H7QJ6oCAQKGpFu&s=10',
    order: 2,
  },
  {
    slug: 'automatic',
    title: 'Automatic Rolling Shutter',
    description: 'Motorised shutters with remote, wall switch and safety stop.',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp0t2bnHipwJrxL6sQ3WxWg-CC9VBprWhHtnNWu9_aRcT6ceT1oWCmtmHF&s=10',
    order: 3,
  },
  {
    slug: 'motor-repair',
    title: 'Motor Repair & Replacement',
    description: 'Motor not responding? We diagnose, rewind or replace it.',
    imageUrl: 'https://shutters4u.com.au/wp-content/uploads/2019/07/s4umanual-roller-shutter-product.png',
    order: 4,
  },
  {
    slug: 'shop-garage',
    title: 'Shop & Garage Shutter',
    description: 'Secure shopfront and villa garage shutters built to daily use.',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTosqTs8iPEF7qg7b857NKfepb5MH7z6smnIKKz-wE_JnN0m_1vB41RQU0&s=10',
    order: 5,
  },
  {
    slug: 'warehouse',
    title: 'Warehouse Shutter',
    description: 'Heavy-duty industrial shutters for large openings and loading bays.',
    imageUrl: 'https://vijayshutterenterprises.com/wp-content/uploads/2026/01/automatic-shutter-control-system-1.jpg',
    order: 6,
  },
  {
    slug: 'sunshade',
    title: 'Sunshade Installation',
    description: 'Fixed and retractable sunshades for villas, cafes and terraces.',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOx9r4qX_f0UYVw_bfqRKCXIbWgCEUECTIU8r2E2azTaGgMVlCvbuLvPA&s=10',
    order: 7,
  },
  {
    slug: 'outdoor-curtains',
    title: 'Outdoor Curtains',
    description: 'Weatherproof PVC and mesh curtains for balconies and majlis areas.',
    imageUrl: 'https://i0.wp.com/www.bmpdoors.com/opt/content/media/2018/03/shutter-doors-2.jpg?fit=800%2C600&ssl=1',
    order: 8,
  },
]

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10)

  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })
  console.log('Admin user seeded:', { admin })

  // Seed services (upsert by slug so re-running is safe)
  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {
        title: service.title,
        description: service.description,
        imageUrl: service.imageUrl,
        order: service.order,
      },
      create: {
        ...service,
        isActive: true,
      },
    })
  }
  console.log(`Seeded ${services.length} services.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
