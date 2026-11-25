# KAAM Store

> Plateforme e-commerce print-on-demand pour vêtements personnalisés — Next.js 14 App Router, Prisma, NextAuth, Stripe, PayPal, Cloudinary, Zustand.

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue?logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-5.14-2D3748?logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?logo=postgresql)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)
![Stripe](https://img.shields.io/badge/Stripe-15-635BFF?logo=stripe)

---

## Fonctionnalités

| Module | Description |
|--------|-------------|
| 🛍️ **Catalogue** | Liste de produits avec filtres par catégorie, variantes tailles/couleurs |
| 🔐 **Auth** | Email/mot de passe + OAuth Google via NextAuth.js |
| 🛒 **Panier** | État global persistant avec Zustand (localStorage) |
| 💳 **Paiement** | Stripe (carte), PayPal, paiement à la livraison (COD) |
| 🖼️ **Images** | Upload et optimisation via Cloudinary |
| 👤 **Compte client** | Historique des commandes, profil |
| 🛠️ **Dashboard admin** | Gestion produits, commandes, statistiques |

---

## Stack technique

```
Frontend / Backend  Next.js 14 (App Router, Server Actions)
Styles              Tailwind CSS 3.4
Base de données     PostgreSQL + Prisma ORM 5.14
Authentification    NextAuth.js 4 (email + Google OAuth)
Paiement            Stripe 15, PayPal SDK
Images              Cloudinary 2.3
State management    Zustand 4.5 (panier persistant)
Validation          Zod 3.23
Déploiement         Vercel (front) + Railway (PostgreSQL)
```

---

## Installation

### Prérequis

- Node.js 18+
- PostgreSQL (local, Railway ou Supabase)

### 1. Cloner et installer

```bash
git clone https://github.com/youssefameziane2-arch/kaam-store.git
cd kaam-store
npm install
```

### 2. Variables d'environnement

```bash
cp .env.local.example .env.local
# Édite .env.local avec tes vraies valeurs
```

Variables requises :

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | URL PostgreSQL (Railway, Supabase ou local) |
| `NEXTAUTH_SECRET` | Secret JWT (`openssl rand -base64 32`) |
| `NEXTAUTH_URL` | URL de base de l'app (`http://localhost:3000`) |
| `STRIPE_SECRET_KEY` | Clé secrète Stripe (test : `sk_test_...`) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Clé publique Stripe |
| `CLOUDINARY_CLOUD_NAME` | Nom du cloud Cloudinary |
| `CLOUDINARY_API_KEY` | API key Cloudinary |
| `CLOUDINARY_API_SECRET` | API secret Cloudinary |

### 3. Base de données

```bash
# Créer le schéma
npx prisma db push

# Générer le client Prisma
npx prisma generate

# Seed — admin + catégories + produits de test
npm run db:seed
```

Données créées par le seed :
- Admin : `admin@kaamstore.ma` / `admin123`
- 3 catégories : T-Shirts, Hoodies, Culture Amazighe
- 3 produits avec variantes (tailles + couleurs)

### 4. Démarrer

```bash
npm run dev
# → http://localhost:3000
```

---

## Structure du projet

```
kaam-store/
├── app/
│   ├── layout.tsx              # Layout racine (Navbar + Footer)
│   ├── page.tsx                # Page d'accueil
│   ├── globals.css
│   └── api/
│       └── auth/[...nextauth]/ # NextAuth API route
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ProductCard.tsx
│   └── ui/
│       ├── Button.tsx
│       └── Badge.tsx
├── lib/
│   ├── prisma.ts               # Client Prisma singleton
│   ├── auth.ts                 # Config NextAuth
│   ├── utils.ts                # formatPrice, slugify…
│   └── store/
│       └── cart.ts             # Zustand — panier persistant
├── prisma/
│   ├── schema.prisma           # Modèles (User, Product, Order…)
│   └── seed.ts                 # Données initiales
├── types/
│   └── index.ts                # Types TypeScript partagés
└── .env.local.example
```

---

## Commandes utiles

```bash
npm run dev            # Serveur de développement
npm run build          # Build production
npm run start          # Démarrer en production
npx prisma studio      # Interface visuelle PostgreSQL
npx prisma db push     # Appliquer les modifications du schéma
npx prisma generate    # Régénérer le client
npm run db:seed        # Injecter les données de test
```

---

## Roadmap

- [x] Module 1 — Infrastructure, auth, panier Zustand, layout
- [ ] Module 2 — Catalogue, filtres, page produit, variantes
- [ ] Module 3 — Checkout complet (Stripe + PayPal + COD)
- [ ] Module 4 — Dashboard admin
- [ ] Module 5 — Éditeur de personnalisation (upload design + preview en temps réel)

---

## Auteur

**Youssef Ameziane** — Élève ingénieur GSCSI, ENSA Fès  
[github.com/youssefameziane2-arch](https://github.com/youssefameziane2-arch)
