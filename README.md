# TJS Patient Recovery Store - Standalone Deployment Guide

This is a standalone version of the TJS (Total Joint Specialists) Patient Recovery Store, extracted from the Unite Medical platform for independent deployment.

## Project Structure

```
tjs-standalone/
├── src/
│   ├── app/
│   │   ├── page.tsx                    # Redirects to /store
│   │   ├── layout.tsx                  # Root layout with fonts
│   │   ├── globals.css                 # Global styles
│   │   ├── store/                      # Public storefront
│   │   │   ├── layout.tsx              # Store layout with header/footer
│   │   │   ├── page.tsx                # Store homepage
│   │   │   ├── products/               # Products listing
│   │   │   ├── bundles/                # Recovery kits listing
│   │   │   ├── cart/                   # Shopping cart
│   │   │   ├── checkout/               # Checkout flow
│   │   │   └── category/               # Category pages
│   │   └── dashboard/                  # Admin dashboard
│   │       ├── layout.tsx              # Dashboard layout
│   │       └── page.tsx                # Admin panel
│   ├── components/
│   │   ├── tjs/                        # TJS-specific components
│   │   │   ├── TJSHeader.tsx           # Store header/navbar
│   │   │   └── TJSFooter.tsx           # Store footer
│   │   └── ui/                         # Shadcn UI components
│   └── lib/
│       ├── utils.ts                    # Utility functions
│       ├── store/
│       │   └── tjs-cart.ts             # Zustand cart store
│       └── supabase/
│           ├── client.ts               # Browser Supabase client
│           └── server.ts               # Server Supabase client
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
└── .env.example
```

## Quick Start

### 1. Install Dependencies

```bash
cd tjs-standalone
npm install
# or
bun install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Required environment variables:

```env
# Supabase Configuration (Required)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Database URL (for migrations/direct access)
DATABASE_URL=your_database_connection_string

# Optional: Site URL for production
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### 3. Database Setup

The TJS store requires the following Supabase tables. Run this SQL in your Supabase SQL Editor:

```sql
-- TJS Procedures (surgery categories)
CREATE TABLE IF NOT EXISTS tjs_procedures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- TJS Products (individual items and bundles)
CREATE TABLE IF NOT EXISTS tjs_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sku TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  image_url TEXT,
  unit_price DECIMAL(10,2) NOT NULL,
  msrp DECIMAL(10,2),
  stock_quantity INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  product_type TEXT DEFAULT 'product', -- 'product' or 'bundle'
  procedure_id UUID REFERENCES tjs_procedures(id),
  included_items JSONB, -- For bundles: [{name: "Item 1"}, {name: "Item 2"}]
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- TJS Orders
CREATE TABLE IF NOT EXISTS tjs_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT UNIQUE NOT NULL,
  customer_name TEXT,
  customer_email TEXT,
  customer_phone TEXT,
  shipping_address TEXT,
  items JSONB NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL,
  shipping DECIMAL(10,2) DEFAULT 0,
  tax DECIMAL(10,2) DEFAULT 0,
  total DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_tjs_products_slug ON tjs_products(slug);
CREATE INDEX IF NOT EXISTS idx_tjs_products_procedure ON tjs_products(procedure_id);
CREATE INDEX IF NOT EXISTS idx_tjs_products_active ON tjs_products(is_active);
CREATE INDEX IF NOT EXISTS idx_tjs_orders_number ON tjs_orders(order_number);
CREATE INDEX IF NOT EXISTS idx_tjs_orders_status ON tjs_orders(status);
```

### 4. Run Development Server

```bash
npm run dev
# or
bun dev
```

The app will be available at `http://localhost:3000`

## Key Routes

### Public Store
- `/store` - Store homepage
- `/store/products` - All products listing
- `/store/bundles` - Recovery kits listing
- `/store/products/[slug]` - Product detail page
- `/store/cart` - Shopping cart
- `/store/checkout` - Checkout flow
- `/store/category/[slug]` - Products by procedure

### Admin Dashboard
- `/dashboard` - Admin dashboard with tabs for:
  - Products management
  - Bundles management
  - Orders viewing
  - Procedures viewing

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

The project is a standard Next.js 15 application and can be deployed to:
- Netlify
- Railway
- AWS Amplify
- Self-hosted with Node.js

## Sharing Supabase Database

This standalone app can share the same Supabase database as the Unite Medical platform since it uses the same table structure (`tjs_products`, `tjs_procedures`, `tjs_orders`).

Simply use the same Supabase credentials in your `.env.local` file.

## Customization

### Branding
- Update logo URL in `TJSHeader.tsx` and `TJSFooter.tsx`
- Modify colors in `globals.css` (primary color is `#004b87`)
- Update contact information in header/footer

### Features
- Add payment processing by integrating Stripe
- Add email notifications with Resend/SendGrid
- Add authentication for customer accounts

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS 4
- **Components**: Shadcn UI
- **Database**: Supabase (PostgreSQL)
- **State Management**: Zustand (for cart)
- **Icons**: Lucide React

## Support

For issues or questions about deployment, contact the development team.
# tjs-project
