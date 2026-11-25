'use client'

// components/ProductCard.tsx

import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import Badge from './ui/Badge'
import type { ProductWithVariants } from '@/types'

interface ProductCardProps {
  product: ProductWithVariants
}

export default function ProductCard({ product }: ProductCardProps) {
  const minPrice = product.variants.length > 0
    ? Math.min(...product.variants.map((v) => v.price))
    : product.basePrice

  const totalStock = product.variants.reduce((sum, v) => sum + v.stock, 0)
  const isOutOfStock = totalStock === 0
  const mainImage = product.images?.[0] ?? '/placeholder.jpg'

  return (
    <Link href={`/shop/${product.slug}`} className="group block">
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-brand-200 hover:shadow-lg transition-all duration-300">

        {/* Image */}
        <div className="relative aspect-square bg-gray-50 overflow-hidden">
          <Image
            src={mainImage}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.featured && <Badge variant="brand">Nouveauté</Badge>}
            {isOutOfStock && <Badge variant="danger">Rupture</Badge>}
          </div>

          {/* Quick add overlay */}
          {!isOutOfStock && (
            <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button className="w-full bg-white/95 backdrop-blur text-brand-700 text-sm font-medium py-2 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-brand-500 hover:text-white transition-colors shadow-sm">
                <ShoppingCart className="w-4 h-4" />
                Voir les options
              </button>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-4">
          {product.category && (
            <p className="text-xs text-brand-500 font-medium mb-1 uppercase tracking-wide">
              {product.category.name}
            </p>
          )}
          <h3 className="text-sm font-semibold text-gray-900 leading-tight mb-2 group-hover:text-brand-700 transition-colors line-clamp-2">
            {product.name}
          </h3>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-base font-bold text-gray-900">
                {formatPrice(minPrice)}
              </span>
              {product.variants.length > 1 && (
                <span className="text-xs text-gray-400 ml-1">à partir de</span>
              )}
            </div>

            {/* Couleurs disponibles */}
            {product.variants.some((v) => v.colorHex) && (
              <div className="flex gap-1">
                {[...new Map(product.variants.filter((v) => v.colorHex).map((v) => [v.colorHex, v])).values()]
                  .slice(0, 4)
                  .map((v) => (
                    <span
                      key={v.colorHex}
                      className="w-4 h-4 rounded-full border border-gray-200 flex-shrink-0"
                      style={{ backgroundColor: v.colorHex! }}
                      title={v.color ?? ''}
                    />
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
