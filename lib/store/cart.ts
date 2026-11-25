// lib/store/cart.ts
// Zustand store — panier persistant (localStorage)

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem, CartState } from '@/types'

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (newItem) => {
        const items = get().items
        const existing = items.find((i) => i.variantId === newItem.variantId)

        if (existing) {
          const newQty = Math.min(existing.quantity + 1, existing.maxStock)
          set({
            items: items.map((i) =>
              i.variantId === newItem.variantId ? { ...i, quantity: newQty } : i
            ),
          })
        } else {
          set({ items: [...items, { ...newItem, quantity: 1 }] })
        }
      },

      removeItem: (variantId) => {
        set({ items: get().items.filter((i) => i.variantId !== variantId) })
      },

      updateQuantity: (variantId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(variantId)
          return
        }
        set({
          items: get().items.map((i) =>
            i.variantId === variantId
              ? { ...i, quantity: Math.min(quantity, i.maxStock) }
              : i
          ),
        })
      },

      clearCart: () => set({ items: [] }),

      get total() {
        return get().items.reduce((sum, i) => sum + i.price * i.quantity, 0)
      },

      get itemCount() {
        return get().items.reduce((sum, i) => sum + i.quantity, 0)
      },
    }),
    {
      name: 'kaam-cart',
      // Ne pas persister les getters
      partialize: (state) => ({ items: state.items }),
    }
  )
)
