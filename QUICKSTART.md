# CanvassHub - Professional Canvassing Platform

## Quick Start Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment
```bash
cp env.example .env.local
# Edit .env.local with your database URL and NextAuth secret
```

### 3. Set Up Database
```bash
npx prisma db push
npx prisma db seed
```

### 4. Start Development Server
```bash
npm run dev
```

### 5. Access the Application
- **URL**: http://localhost:3000
- **Admin**: admin@canvasshub.com / admin123
- **User**: user@example.com / password123

## Key Features

✅ **Product Catalog** - Browse and search products by category  
✅ **Canvass Requests** - Create procurement requests without seeing prices  
✅ **Admin Dashboard** - Manage requests and product catalog  
✅ **User Authentication** - Secure login with role-based access  
✅ **Responsive Design** - Works on desktop and mobile  

## Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **UI**: shadcn/ui components
- **Database**: PostgreSQL with Prisma ORM
- **Auth**: NextAuth.js
- **Deployment**: Vercel + Railway

## Project Structure

```
src/
├── app/           # Next.js App Router pages
├── components/    # Reusable UI components
├── lib/          # Utilities and configuration
└── types/        # TypeScript definitions
```

## Available Scripts

- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run db:push` - Update database schema
- `npm run db:seed` - Populate with sample data
- `npm run db:studio` - Open Prisma Studio

## Next Steps

1. **Customize Products**: Add your own products to the catalog
2. **Configure Auth**: Set up proper user registration
3. **Deploy**: Push to Vercel for production
4. **Extend**: Add supplier portal and quoting features

For detailed documentation, see [README.md](./README.md)
