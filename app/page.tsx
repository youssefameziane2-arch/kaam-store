// app/page.tsx
// Page d'accueil KAAM Store

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Truck, Zap, Shield, Star } from 'lucide-react'
import Button from '@/components/ui/Button'
import ProductCard from '@/components/ProductCard'
import prisma from '@/lib/prisma'

// Récupère les produits mis en avant depuis la DB
async function getFeaturedProducts() {
  try {
    return await prisma.product.findMany({
      where: { status: 'ACTIVE', featured: true },
      include: { variants: true, category: true },
      orderBy: { createdAt: 'desc' },
      take: 4,
    })
  } catch {
    return []
  }
}

async function getCategories() {
  try {
    return await prisma.category.findMany({
      where: { parentId: null },
      include: { _count: { select: { products: true } } },
      take: 4,
    })
  } catch {
    return []
  }
}

const features = [
  { icon: Zap,    title: 'Production locale',  desc: 'Machine DTF/DTG à Fès — qualité pro' },
  { icon: Truck,  title: 'Livraison rapide',   desc: '2-3 jours au Maroc, 7-10 j. en Europe' },
  { icon: Shield, title: 'Paiement sécurisé',  desc: 'COD · Stripe · PayPal · YouCan Pay' },
  { icon: Star,   title: 'Designs exclusifs',  desc: 'Amazigh, gaming, sur commande' },
]

const testimonials = [
  { name: 'Imane B.', city: 'Casablanca', rating: 5, text: 'Qualité top ! Le t-shirt amazigh est exactement ce que je cherchais. Livré en 2 jours à Casa.' },
  { name: 'Yassir K.', city: 'Paris',      rating: 5, text: 'Commande pour la diaspora marocaine, parfait. Expédié rapidement et l\'impression tient bien.' },
  { name: 'Sara M.',   city: 'Fès',        rating: 5, text: 'J\'ai commandé des hoodies pour mon équipe. Service rapide et prix imbattables.' },
]

export default async function HomePage() {
  const [featuredProducts, categories] = await Promise.all([getFeaturedProducts(), getCategories()])

  return (
    <div className="animate-fade-in">

      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-brand-950 via-brand-900 to-brand-700 text-white overflow-hidden">
        {/* Pattern déco */}
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 25% 25%, #fff 1px, transparent 1px), radial-gradient(circle at 75% 75%, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <span className="inline-flex items-center gap-2 bg-brand-500/30 text-brand-200 text-sm font-medium px-4 py-1.5 rounded-full mb-6 border border-brand-400/30">
                <Zap className="w-3.5 h-3.5" /> Production locale à Fès
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
                Tes vêtements,<br />
                <span className="text-brand-300">ton identité.</span>
              </h1>
              <p className="text-brand-100/80 text-lg mb-8 leading-relaxed max-w-lg">
                Designs amazighs, gaming, cadeaux personnalisés — impression DTF/DTG haute qualité. Livraison 2-3 jours au Maroc, expédition vers l'Europe.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/shop">
                  <Button size="lg" className="bg-white text-brand-700 hover:bg-brand-50 focus:ring-white">
                    Découvrir la boutique <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/shop?category=culture-amazighe">
                  <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 focus:ring-white">
                    Collection Amazighe
                  </Button>
                </Link>
              </div>
              {/* Social proof */}
              <div className="flex items-center gap-4 mt-8 text-sm text-brand-200/70">
                <div className="flex -space-x-2">
                  {['#d97706','#dc2626','#2563eb'].map((c, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-brand-800 bg-current flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: c }}>
                      {['I','Y','S'][i]}
                    </div>
                  ))}
                </div>
                <span>+200 clients satisfaits au Maroc et en Europe</span>
              </div>
            </div>

            {/* Image hero */}
            <div className="relative hidden md:block">
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <div className="absolute inset-4 bg-brand-500/20 rounded-3xl rotate-6 border border-brand-400/20" />
                <div className="absolute inset-0 bg-brand-800/40 rounded-3xl overflow-hidden border border-brand-500/20">
                  <Image
                    src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600"
                    alt="T-shirt personnalisé KAAM Store"
                    fill
                    className="object-cover opacity-80"
                  />
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-4 -left-4 bg-white text-gray-900 rounded-2xl px-4 py-2.5 shadow-xl text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-brand-500" />
                    <span>Livré en <strong>2-3 jours</strong></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─────────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex flex-col items-center text-center gap-3 p-4">
                <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center text-brand-600">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRODUITS MIS EN AVANT ────────────────────────────────────────── */}
      {featuredProducts.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-brand-500 text-sm font-medium uppercase tracking-wide mb-1">Sélection</p>
              <h2 className="text-3xl font-display font-bold text-gray-900">Produits populaires</h2>
            </div>
            <Link href="/shop" className="hidden md:flex items-center gap-1 text-sm text-brand-600 font-medium hover:underline">
              Voir tout <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product as any} />
            ))}
          </div>
          <div className="text-center mt-8 md:hidden">
            <Link href="/shop">
              <Button variant="outline" size="lg">Voir tous les produits <ArrowRight className="w-4 h-4" /></Button>
            </Link>
          </div>
        </section>
      )}

      {/* ─── CATÉGORIES ───────────────────────────────────────────────────── */}
      {categories.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className="text-brand-500 text-sm font-medium uppercase tracking-wide mb-1">Collections</p>
              <h2 className="text-3xl font-display font-bold text-gray-900">Explorer par catégorie</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((cat) => (
                <Link key={cat.id} href={`/shop?category=${cat.slug}`}
                  className="group relative bg-white rounded-2xl border border-gray-200 hover:border-brand-300 hover:shadow-md transition-all duration-300 p-6 text-center overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="w-14 h-14 bg-brand-100 rounded-xl mx-auto mb-3 flex items-center justify-center text-2xl">
                      {cat.slug === 'culture-amazighe' ? '⵿' : cat.slug === 'hoodies' ? '🧥' : cat.slug === 't-shirts' ? '👕' : '🎁'}
                    </div>
                    <h3 className="font-semibold text-gray-900 text-sm group-hover:text-brand-700 transition-colors">{cat.name}</h3>
                    <p className="text-xs text-gray-400 mt-1">{(cat as any)._count.products} produits</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── CTA PERSONNALISATION ─────────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-brand-600 to-brand-800 rounded-3xl p-10 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }}
          />
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Tu as un design en tête ?</h2>
            <p className="text-brand-100 text-lg mb-8 max-w-xl mx-auto">
              Envoie-nous ton design et on s'occupe du reste. Impression DTF/DTG professionnelle sur t-shirts, hoodies, et plus.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-white text-brand-700 hover:bg-brand-50">
                  Commander sur mesure <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/shop">
                <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10">
                  Voir le catalogue
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TÉMOIGNAGES ──────────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-brand-500 text-sm font-medium uppercase tracking-wide mb-1">Avis clients</p>
            <h2 className="text-3xl font-display font-bold text-gray-900">Ils nous font confiance</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-brand-400 text-brand-400" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">"{t.text}"</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-brand-100 rounded-full flex items-center justify-center text-brand-700 font-bold text-xs">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
