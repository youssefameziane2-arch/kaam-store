// prisma/seed.ts
// Données initiales pour tester la boutique

import { PrismaClient, ProductStatus } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Admin
  const adminPassword = await bcrypt.hash('admin123', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@kaamstore.ma' },
    update: {},
    create: {
      name: 'KAAM Admin',
      email: 'admin@kaamstore.ma',
      password: adminPassword,
      role: 'ADMIN',
    },
  })
  console.log('✅ Admin créé:', admin.email)

  // Catégories
  const tshirts = await prisma.category.upsert({
    where: { slug: 't-shirts' },
    update: {},
    create: { name: 'T-Shirts', slug: 't-shirts', description: 'T-shirts personnalisés' },
  })
  const hoodies = await prisma.category.upsert({
    where: { slug: 'hoodies' },
    update: {},
    create: { name: 'Hoodies', slug: 'hoodies', description: 'Sweats et hoodies' },
  })
  const amazigh = await prisma.category.upsert({
    where: { slug: 'culture-amazighe' },
    update: {},
    create: { name: 'Culture Amazighe', slug: 'culture-amazighe', description: 'Designs amazighs et berbères' },
  })
  console.log('✅ Catégories créées')

  // Produits exemple
  const product1 = await prisma.product.upsert({
    where: { slug: 'tshirt-amazigh-tifinagh' },
    update: {},
    create: {
      name: 'T-Shirt Tifinagh Heritage',
      slug: 'tshirt-amazigh-tifinagh',
      description: 'T-shirt premium avec design Tifinagh brodé, 100% coton. Livraison 2-3 jours au Maroc.',
      basePrice: 80,
      status: ProductStatus.ACTIVE,
      categoryId: amazigh.id,
      featured: true,
      tags: ['amazigh', 'tifinagh', 'heritage', 'coton'],
      images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600'],
      variants: {
        create: [
          { size: 'S',   color: 'Noir',  colorHex: '#1a1a1a', stock: 15, price: 120, sku: 'TIF-BLK-S' },
          { size: 'M',   color: 'Noir',  colorHex: '#1a1a1a', stock: 20, price: 120, sku: 'TIF-BLK-M' },
          { size: 'L',   color: 'Noir',  colorHex: '#1a1a1a', stock: 18, price: 120, sku: 'TIF-BLK-L' },
          { size: 'XL',  color: 'Noir',  colorHex: '#1a1a1a', stock: 10, price: 120, sku: 'TIF-BLK-XL' },
          { size: 'M',   color: 'Blanc', colorHex: '#f5f5f5', stock: 12, price: 120, sku: 'TIF-WHT-M' },
          { size: 'L',   color: 'Blanc', colorHex: '#f5f5f5', stock: 8,  price: 120, sku: 'TIF-WHT-L' },
        ],
      },
    },
  })

  const product2 = await prisma.product.upsert({
    where: { slug: 'hoodie-gamer-maroc' },
    update: {},
    create: {
      name: 'Hoodie Gamer Edition',
      slug: 'hoodie-gamer-maroc',
      description: 'Hoodie confort avec design gaming exclusif. Parfait pour les sessions longues.',
      basePrice: 150,
      status: ProductStatus.ACTIVE,
      categoryId: hoodies.id,
      featured: true,
      tags: ['gaming', 'hoodie', 'gamer'],
      images: ['https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600'],
      variants: {
        create: [
          { size: 'S',  color: 'Gris',  colorHex: '#6b7280', stock: 8,  price: 220, sku: 'HOD-GRY-S' },
          { size: 'M',  color: 'Gris',  colorHex: '#6b7280', stock: 15, price: 220, sku: 'HOD-GRY-M' },
          { size: 'L',  color: 'Gris',  colorHex: '#6b7280', stock: 12, price: 220, sku: 'HOD-GRY-L' },
          { size: 'XL', color: 'Gris',  colorHex: '#6b7280', stock: 6,  price: 220, sku: 'HOD-GRY-XL' },
          { size: 'M',  color: 'Noir',  colorHex: '#1a1a1a', stock: 10, price: 220, sku: 'HOD-BLK-M' },
        ],
      },
    },
  })

  const product3 = await prisma.product.upsert({
    where: { slug: 'tshirt-fes-medina' },
    update: {},
    create: {
      name: 'T-Shirt Fès Médina Art',
      slug: 'tshirt-fes-medina',
      description: 'Design artistique de la médina de Fès, impression DTF haute qualité.',
      basePrice: 90,
      status: ProductStatus.ACTIVE,
      categoryId: tshirts.id,
      featured: false,
      tags: ['fes', 'medina', 'maroc', 'art'],
      images: ['https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600'],
      variants: {
        create: [
          { size: 'S',  color: 'Sable', colorHex: '#d4b896', stock: 10, price: 140, sku: 'FES-SND-S' },
          { size: 'M',  color: 'Sable', colorHex: '#d4b896', stock: 15, price: 140, sku: 'FES-SND-M' },
          { size: 'L',  color: 'Sable', colorHex: '#d4b896', stock: 10, price: 140, sku: 'FES-SND-L' },
        ],
      },
    },
  })

  console.log('✅ Produits créés:', product1.name, '|', product2.name, '|', product3.name)
  console.log('✅ Seed terminé!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
