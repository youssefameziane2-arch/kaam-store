// app/layout.tsx

import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Playfair_Display } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })
const playfair = Playfair_Display({ variable: '--font-display', subsets: ['latin'] })

export const metadata: Metadata = {
  title: { default: 'KAAM Store — Vêtements Personnalisés au Maroc', template: '%s | KAAM Store' },
  description: 'Boutique de vêtements personnalisés Print on Demand. Designs amazighs, gaming, cadeaux. Livraison 2-3 jours au Maroc, 7-10 jours en Europe.',
  keywords: ['vêtements personnalisés', 'print on demand', 'maroc', 'amazigh', 'DTF', 'DTG', 'Fès'],
  openGraph: {
    title: 'KAAM Store',
    description: 'Vêtements personnalisés au Maroc — livraison rapide',
    locale: 'fr_MA',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} font-sans bg-gray-50 text-gray-900 flex flex-col min-h-screen antialiased`}>
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 3000,
            style: { background: '#1a1a1a', color: '#fff', borderRadius: '12px', fontSize: '14px' },
            success: { iconTheme: { primary: '#d96415', secondary: '#fff' } },
          }}
        />
      </body>
    </html>
  )
}
