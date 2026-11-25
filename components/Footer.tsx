// components/Footer.tsx

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">K</span>
              <span className="font-bold text-white text-lg">KAAM Store</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Vêtements personnalisés Print on Demand. Production locale à Fès, livraison rapide au Maroc et en Europe.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="https://tiktok.com/@kaam9091" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm">TikTok</a>
              <a href="https://instagram.com/kaam_amka" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm">Instagram</a>
              <a href="https://youtube.com/@KAAM" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm">YouTube</a>
            </div>
          </div>

          {/* Boutique */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm">Boutique</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/shop" className="hover:text-white transition-colors">Tous les produits</Link></li>
              <li><Link href="/shop?category=culture-amazighe" className="hover:text-white transition-colors">Culture Amazighe</Link></li>
              <li><Link href="/shop?category=hoodies" className="hover:text-white transition-colors">Hoodies</Link></li>
              <li><Link href="/shop?category=t-shirts" className="hover:text-white transition-colors">T-Shirts</Link></li>
              <li><Link href="/shop?featured=true" className="hover:text-white transition-colors">Nouveautés</Link></li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm">Informations</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">À propos</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/shipping" className="hover:text-white transition-colors">Livraison</Link></li>
              <li><Link href="/returns" className="hover:text-white transition-colors">Retours</Link></li>
            </ul>
          </div>

          {/* Livraison */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm">Livraison</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></span>
                Maroc : 2-3 jours
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-brand-400 rounded-full flex-shrink-0"></span>
                Europe : 7-10 jours
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-gray-500 rounded-full flex-shrink-0"></span>
                Paiement à la livraison (COD)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-gray-500 rounded-full flex-shrink-0"></span>
                Stripe · PayPal · YouCan Pay
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} KAAM Store — Fès, Maroc</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-gray-300 transition-colors">Confidentialité</Link>
            <Link href="/terms" className="hover:text-gray-300 transition-colors">CGV</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
