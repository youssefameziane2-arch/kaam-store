// types/index.ts
// Types TypeScript partagés dans tout le projet

import type { Product, ProductVariant, Category, Order, OrderItem, User } from '@prisma/client'

// ─── Produit enrichi ──────────────────────────────────────────────────────────

export type ProductWithVariants = Product & {
  variants: ProductVariant[]
  category: Category | null
  _count?: { reviews: number }
}

export type ProductWithCategory = Product & {
  category: Category | null
}

// ─── Panier ───────────────────────────────────────────────────────────────────

export interface CartItem {
  productId: string
  variantId: string
  productName: string
  variantLabel: string    // ex: "L / Noir"
  productImage: string
  price: number
  quantity: number
  maxStock: number
}

export interface CartState {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (variantId: string) => void
  updateQuantity: (variantId: string, quantity: number) => void
  clearCart: () => void
  total: number
  itemCount: number
}

// ─── Commande ─────────────────────────────────────────────────────────────────

export type OrderWithItems = Order & {
  items: (OrderItem & {
    product: Product
    variant: ProductVariant | null
  })[]
}

// ─── Filtres catalogue ────────────────────────────────────────────────────────

export interface ProductFilters {
  categorySlug?: string
  minPrice?: number
  maxPrice?: number
  tags?: string[]
  featured?: boolean
  search?: string
  sortBy?: 'price_asc' | 'price_desc' | 'newest' | 'popular'
  page?: number
  limit?: number
}

// ─── API responses ────────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// ─── Session enrichie ─────────────────────────────────────────────────────────

export interface ExtendedUser {
  id: string
  name?: string | null
  email?: string | null
  image?: string | null
  role: 'USER' | 'ADMIN'
}
