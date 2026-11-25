// lib/utils.ts

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Merge Tailwind classes safely
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format prix en MAD
export function formatPrice(amount: number, currency = 'MAD'): string {
  if (currency === 'MAD') return `${amount.toLocaleString('fr-MA')} MAD`
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency }).format(amount)
}

// Générer un slug depuis un nom
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Truncate text
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length) + '...'
}

// Générer un numéro de commande lisible
export function generateOrderNumber(): string {
  const date = new Date()
  const year = date.getFullYear().toString().slice(-2)
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const random = Math.floor(Math.random() * 9000 + 1000)
  return `KAAM-${year}${month}-${random}`
}

// Calculer le délai de livraison estimé
export function getDeliveryEstimate(country = 'MA'): string {
  const delays: Record<string, string> = {
    MA: '2-3 jours ouvrables',
    FR: '7-10 jours ouvrables',
    BE: '7-10 jours ouvrables',
    NL: '8-12 jours ouvrables',
    DE: '8-12 jours ouvrables',
    ES: '7-10 jours ouvrables',
  }
  return delays[country] ?? '10-15 jours ouvrables'
}
