'use client'

// components/Navbar.tsx

import Link from 'next/link'
import { ShoppingCart, Search, Menu, X, User } from 'lucide-react'
import { useState } from 'react'
import { useCartStore } from '@/lib/store/cart'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/shop', label: 'Boutique' },
  { href: '/shop?category=culture-amazighe', label: 'Amazigh' },
  { href: '/shop?category=hoodies', label: 'Hoodies' },
  { href: '/shop?category=t-shirts', label: 'T-Shirts' },
  { href: '/shop?featured=true', label: 'Nouveautés' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const itemCount = useCartStore((s) => s.itemCount)

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-display text-xl font-bold text-brand-600">
            <span className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">K</span>
            KAAM Store
          </Link>

          {/* Nav desktop */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-gray-600 hover:text-brand-600 transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button className="p-2 text-gray-500 hover:text-brand-600 transition-colors rounded-lg hover:bg-brand-50">
              <Search className="w-5 h-5" />
            </button>

            <Link
              href="/account"
              className="hidden md:flex p-2 text-gray-500 hover:text-brand-600 transition-colors rounded-lg hover:bg-brand-50"
            >
              <User className="w-5 h-5" />
            </Link>

            <Link
              href="/cart"
              className="relative p-2 text-gray-500 hover:text-brand-600 transition-colors rounded-lg hover:bg-brand-50"
            >
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold animate-fade-in">
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </Link>

            {/* Menu mobile */}
            <button
              className="md:hidden p-2 text-gray-500 hover:text-brand-600 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile déroulant */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white animate-slide-up">
          <nav className="px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2 text-sm text-gray-700 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-gray-100 mt-2 pt-2">
              <Link href="/account" onClick={() => setMobileOpen(false)} className="px-3 py-2 text-sm text-gray-700 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors flex items-center gap-2">
                <User className="w-4 h-4" /> Mon compte
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
