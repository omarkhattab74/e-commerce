FreshCart
A modern, full-featured e-commerce web application built with Next.js 15 and TypeScript
[Live Demo →](https://e-commerce-topaz-mu-75.vercel.app/)

 Overview
FreshCart is a fully responsive e-commerce platform that delivers a easy shopping experience. Built with the latest Next.js App Router, it features a clean UI, fast page loads, secure authentication, and a complete product browsing flow — from categories and brands to cart and checkout.

 Features
 Home Page — Hero slider with category highlights and featured products
 Products — Browse all products with detailed product pages
 Categories — Organized product categories for easy navigation
 Brands — Organized product brands for easy navigation
 Shopping Cart — Add, remove, and update product quantities
 Authentication — Secure login & registration with NextAuth
 Fully Responsive — Optimized for mobile, tablet, and desktop
 Performance — Static & dynamic rendering with Next.js App Router
 Deployed on Vercel — Production-ready with zero-config deployment

 Tech Stack

Next.js 15 : React framework with App Router & SSR/SSG
TypeScript : Type safety across the entire codebase
Tailwind CSS : Utility-first styling
NextAuth.js : Authentication & session management
shadcn/ui : Accessible, reusable UI components
Vercel : Hosting & continuous deployment


 Project Structure
e-commerce/
├── public/              # Static assets (images, icons)
├── src/
│   ├── app/             # Next.js App Router pages & layouts
│   │   ├── (auth)/      # Login & Register pages
│   │   ├── products/    # Products listing & detail pages
│   │   ├── categories/  # Categories page
│   │   ├── brands/      # Brands page
│   │   └── layout.tsx   # Root layout
│   ├── components/      # Reusable UI components
│   └── lib/             # Utility functions & helpers
├── auth.ts              # NextAuth configuration
├── next.config.ts       # Next.js configuration
├── tailwind.config.ts   # Tailwind CSS configuration
└── tsconfig.json        # TypeScript configuration


 Getting Started
Installation
# 1. Clone the repository
git clone https://github.com/omarkhattab74/e-commerce.git

# 2. Navigate into the project
cd e-commerce

# 3. Install dependencies
npm install

# 4. Run the development server
npm run dev
Open http://localhost:3000 in your browser.
Environment Variables
Create a .env.local file in the root directory:

Available Scripts
npm run dev       # Start development server
npm run build     # Build for production
npm run start     # Start production server
npm run lint      # Run ESLint

 Deployment
This project is deployed on Vercel with automatic deployments on every push to master.
npm run build     # Build for production
npm run start     # Start production server
npm run lint      # Run ESLint
