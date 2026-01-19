# Georgia Travel 🇬🇪

A complete travel booking platform for Georgia tours built with Next.js, TypeScript, Tailwind CSS, and Supabase.

## 🌟 Features

### Public Website
- **Home Page**: Hero section, "Why Georgia" features, featured tours, and CTA
- **Tours Listing**: Browse all available tours with filtering
- **Tour Details**: Detailed tour information with day-by-day itinerary
- **Booking Form**: Submit booking requests with validation
- **About Page**: Information about Georgia and the travel company
- **Responsive Design**: Mobile-friendly with hamburger navigation

### Admin Panel
- **Dashboard**: Statistics overview with recent bookings
- **Tours Management**: Create, edit, and manage tours with rich itinerary builder
- **Bookings Management**: View and manage customer bookings (confirm/cancel)
- **Data Import**: Upload CSV/Excel files for bulk data import with preview
- **Protected Routes**: Secure admin access with Supabase authentication

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Forms**: React Hook Form
- **Icons**: Lucide React
- **Data Import**: PapaParser (CSV) + ExcelJS (Excel)

## 📋 Prerequisites

- Node.js 18+ and npm
- A Supabase account and project
- Git

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/gigalabichi1/georgia-travel.git
   cd georgia-travel
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. **Set up the database**
   
   See [DATABASE.md](./DATABASE.md) for complete schema and setup instructions.
   
   Quick steps:
   - Create a new Supabase project
   - Run the SQL schema from `DATABASE.md` in the SQL editor
   - Enable Email/Password authentication
   - Create an admin user

5. **Run the development server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
georgia-travel/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── (public)/            # Public routes
│   │   │   ├── page.tsx         # Home page
│   │   │   ├── tours/           # Tours listing & details
│   │   │   ├── about/           # About page
│   │   │   └── layout.tsx       # Public layout (Header/Footer)
│   │   ├── admin/               # Admin routes
│   │   │   ├── page.tsx         # Dashboard
│   │   │   ├── login/           # Admin login
│   │   │   ├── tours/           # Tours management
│   │   │   ├── bookings/        # Bookings management
│   │   │   ├── import/          # Data import
│   │   │   └── layout.tsx       # Admin layout (Sidebar)
│   │   ├── api/                 # API routes
│   │   │   └── admin/import/    # Import endpoints
│   │   ├── globals.css          # Global styles
│   │   └── layout.tsx           # Root layout
│   ├── components/
│   │   ├── public/              # Public components
│   │   │   ├── MobileNav.tsx    # Mobile navigation
│   │   │   └── BookingForm.tsx  # Booking form
│   │   └── admin/               # Admin components
│   │       ├── AdminSidebar.tsx # Admin sidebar
│   │       ├── TourBuilder.tsx  # Tour creation form
│   │       └── BookingActions.tsx # Booking actions
│   ├── lib/
│   │   ├── supabase/            # Supabase clients
│   │   │   ├── client.ts        # Browser client
│   │   │   └── server.ts        # Server client
│   │   └── import/              # Import utilities
│   │       ├── config.ts        # Import configurations
│   │       └── parser.ts        # File parsing logic
│   ├── types/
│   │   └── database.ts          # TypeScript types
│   └── middleware.ts            # Route protection
├── public/                      # Static assets
├── .env.example                 # Environment variables template
├── DATABASE.md                  # Database schema documentation
├── next.config.ts              # Next.js configuration
├── tailwind.config.ts          # Tailwind configuration
└── tsconfig.json               # TypeScript configuration
```

## 🔑 Key Features Explained

### Tour Management
- Create tours with dynamic itinerary builder
- Add multiple days with activities
- Set pricing, duration, and capacity
- Mark tours as featured or active/inactive
- Specify inclusions and exclusions

### Booking System
- Customers can submit booking requests
- Real-time price calculation
- Admin can confirm or cancel bookings
- Email and phone contact details captured
- Special requests handling

### Data Import
- Upload CSV or Excel files
- Preview data before import
- Validation with error reporting
- Support for: countries, regions, cities, hotels, room types, placements
- Transform and map columns to database fields

### Authentication
- Middleware protects `/admin` routes
- Redirects to login if not authenticated
- Secure session management with Supabase

## 🎨 Design System

- **Primary Color**: Indigo (indigo-600)
- **Typography**: System fonts
- **Components**: Clean, modern cards with shadows
- **Icons**: Lucide React
- **Responsive**: Mobile-first design

## 🚀 Deployment

### Build for production
```bash
npm run build
```

### Start production server
```bash
npm start
```

### Deploy to Vercel (Recommended)
1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/gigalabichi1/georgia-travel)

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous key | Yes |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Supabase for the backend infrastructure
- Tailwind CSS for the styling system
- Lucide for the icon set