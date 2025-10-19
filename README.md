# CanvassHub - Professional Canvassing Platform

A modern Next.js application for streamlining procurement processes through professional canvassing. Unlike traditional e-commerce platforms, CanvassHub focuses on collecting product requests and facilitating supplier sourcing without displaying prices to customers.

## 🚀 Features

### Core Functionality
- **Product Catalog**: Browse products by category with search and filtering
- **Smart Cart System**: Add products to canvass with real-time cart management
- **Multi-Format Document Upload**: Upload purchase orders as PDFs (converted to images) or direct image files (JPG, PNG, GIF, WebP, SVG)
- **Flexible Canvass Requests**: Submit requests with products, documents, or both
- **Admin Dashboard**: Review requests and manage product catalog
- **User Authentication**: Secure login with role-based access (User/Admin)

### Advanced Features
- **PDF to Image Conversion**: Automatic conversion of PDF documents to PNG images using PDF.js
- **Cloudinary Integration**: Seamless file uploads with image optimization
- **Real-time Cart Storage**: Persistent cart state across page navigation
- **Toast Notifications**: User-friendly feedback for actions
- **Responsive Design**: Mobile-first approach with modern UI

### Key Pages
- **Home** (`/`) - Overview and landing page
- **Products** (`/products`) - Product catalog with search/filter
- **Create Canvass** (`/canvass/new`) - Submit new procurement requests
- **My Canvasses** (`/canvass`) - Track user's requests
- **Admin Dashboard** (`/admin`) - Manage requests and products

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui with Radix UI primitives
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with email/password
- **File Processing**: PDF.js for PDF to image conversion
- **File Upload**: Cloudinary integration with @jmacera/cloudinary-image-upload
- **State Management**: React Context API for cart management
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React for consistent iconography

## 📦 Database Schema

### Main Entities
- **User**: Authentication and role management (Admin/User roles)
- **Product**: Catalog items with categories, descriptions, and images
- **CanvassRequest**: User procurement requests with notes and optional PDF attachments
- **CanvassItem**: Individual items within requests with quantities

### Key Fields
- **CanvassRequest.pdfUrl**: Optional Cloudinary URL for uploaded documents
- **CanvassRequest.status**: Request lifecycle tracking (PENDING → UNDER_REVIEW → QUOTED → APPROVED/REJECTED)
- **Product.imageUrl**: Product images from Unsplash
- **User.role**: Role-based access control (ADMIN/USER)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Cloudinary account (for file uploads)
- npm or yarn

### Installation

1. **Clone and install dependencies**:
   ```bash
   cd canvassing-app
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp env.example .env.local
   ```
   
   Update `.env.local` with your configuration:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/canvasshub?schema=public"
   
   # Authentication
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"
   
   # Cloudinary (for file uploads)
   NEXT_PUBLIC_CLOUDINARY_URL="https://api.cloudinary.com/v1_1/your-cloud-name/image/upload"
   NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET="your-upload-preset"
   NEXT_PUBLIC_CLOUDINARY_API_KEY="your-api-key"
   ```

3. **Set up Cloudinary**:
   - Create a Cloudinary account
   - Create an unsigned upload preset
   - Update the Cloudinary variables in `.env.local`

4. **Set up the database**:
   ```bash
   npx prisma db push
   npx prisma db seed
   ```

5. **Start the development server**:
   ```bash
   npm run dev
   ```

6. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

### Demo Credentials

**Admin Account**:
- Email: `admin@canvasshub.com`
- Password: `admin123`

**User Account**:
- Email: `user@example.com` 
- Password: `password123`

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication pages
│   ├── admin/             # Admin dashboard
│   ├── api/               # API routes
│   ├── canvass/           # Canvass management
│   ├── products/          # Product catalog
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── pdf-upload.tsx    # Multi-format file upload
│   ├── cart-storage.tsx  # Floating cart component
│   ├── cart-indicator.tsx # Cart summary display
│   ├── toast.tsx         # Notification component
│   └── ...               # Other custom components
├── lib/                  # Utilities and configuration
│   ├── auth.ts           # NextAuth configuration
│   ├── prisma.ts         # Prisma client
│   ├── canvass-context.tsx # Cart state management
│   └── utils.ts          # Helper functions
├── types/                # TypeScript type definitions
└── public/               # Static assets
    ├── pdf.worker.min.js # PDF.js worker file
    └── favicon.svg       # Application favicon
```

## 📤 File Upload System

### Supported Formats
- **PDF Documents**: Automatically converted to PNG images using PDF.js
- **Image Files**: JPG, JPEG, PNG, GIF, WebP, SVG uploaded directly
- **File Size Limit**: 10MB maximum per file

### Technical Implementation
- **PDF Processing**: Client-side conversion using PDF.js library
- **Cloud Storage**: Cloudinary integration for reliable file hosting
- **Image Optimization**: Automatic optimization and CDN delivery
- **Worker Configuration**: PDF.js worker properly configured for Next.js

### Upload Flow
1. User selects PDF or image file
2. File validation (type and size)
3. PDF files are converted to PNG images
4. Images are uploaded to Cloudinary
5. Secure URL is stored in database
6. Files are accessible via Cloudinary CDN

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:push` - Push schema changes to database
- `npm run db:seed` - Seed database with sample data
- `npm run db:studio` - Open Prisma Studio

## 🎨 Design System

The application uses a consistent design system built on:
- **shadcn/ui**: Modern, accessible component library
- **Tailwind CSS**: Utility-first styling
- **Radix UI**: Unstyled, accessible primitives
- **Lucide React**: Consistent iconography

## 🔐 Authentication & Authorization

- **NextAuth.js**: Handles authentication with email/password
- **Role-based Access**: Users and Admins with different permissions
- **Session Management**: JWT-based sessions with database persistence
- **Protected Routes**: Admin-only access to dashboard and management features

## 📊 Admin Features

- **Request Management**: Review and update canvass request status
- **Document Review**: View uploaded PDFs and images from users
- **Product Catalog**: Add, edit, and manage products with images
- **User Overview**: Monitor system usage and statistics
- **Status Tracking**: Track request lifecycle (Pending → Under Review → Quoted → Approved/Rejected)
- **Flexible Requests**: Handle requests with products only, documents only, or both

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard:
   - `DATABASE_URL`
   - `NEXTAUTH_URL`
   - `NEXTAUTH_SECRET`
   - `NEXT_PUBLIC_CLOUDINARY_URL`
   - `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`
   - `NEXT_PUBLIC_CLOUDINARY_API_KEY`
3. Deploy automatically on push to main branch

### Railway (Database)
1. Create a new PostgreSQL database on Railway
2. Update `DATABASE_URL` with Railway connection string
3. Run migrations: `npx prisma db push`

### Cloudinary Setup
1. Create a Cloudinary account
2. Create an unsigned upload preset
3. Configure environment variables for file uploads
4. Test file upload functionality

## 🔮 Future Enhancements

- **Supplier Portal**: Allow suppliers to submit quotes
- **Email Notifications**: Status change notifications
- **PDF Export**: Generate canvass request summaries
- **Advanced Analytics**: Request trends and insights
- **AI Matching**: Intelligent supplier-product matching
- **Mobile App**: React Native companion app

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [shadcn/ui](https://ui.shadcn.com/) for beautiful components
- [Prisma](https://prisma.io/) for the excellent ORM
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [PDF.js](https://mozilla.github.io/pdf.js/) for PDF processing
- [Cloudinary](https://cloudinary.com/) for cloud-based file storage
- [NextAuth.js](https://next-auth.js.org/) for authentication
- [Lucide React](https://lucide.dev/) for consistent iconography
