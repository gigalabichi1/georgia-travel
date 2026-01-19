# Georgia Travel - Application Architecture

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         Georgia Travel                          │
│                   Next.js 16 + TypeScript                       │
└─────────────────────────────────────────────────────────────────┘
                                │
                ┌───────────────┴───────────────┐
                │                               │
        ┌───────▼────────┐              ┌──────▼────────┐
        │  Public Site   │              │  Admin Panel  │
        │   (Visitors)   │              │ (Authenticated)│
        └───────┬────────┘              └──────┬────────┘
                │                               │
    ┌───────────┼───────────┐       ┌──────────┼──────────┐
    │           │           │       │          │          │
┌───▼──┐   ┌───▼──┐   ┌───▼──┐ ┌──▼───┐ ┌───▼──┐ ┌────▼───┐
│ Home │   │Tours │   │About │ │Dash- │ │Tours │ │Bookings│
│      │   │      │   │      │ │board │ │      │ │        │
└──────┘   └───┬──┘   └──────┘ └──────┘ └──────┘ └───┬────┘
               │                                       │
           ┌───▼────┐                             ┌───▼────┐
           │ Tour   │                             │ Import │
           │Details │                             │  Data  │
           └───┬────┘                             └────────┘
               │
          ┌────▼─────┐
          │ Booking  │
          │   Form   │
          └────┬─────┘
               │
               ▼
        ┌──────────────┐
        │   Supabase   │
        │   Database   │
        └──────────────┘
```

## 📂 File Organization

### Public Routes (`/src/app/(public)`)
```
(public)/
├── layout.tsx          → Header, Footer, Navigation
├── page.tsx            → Home (Hero, Features, Featured Tours)
├── tours/
│   ├── page.tsx        → Tours Listing
│   └── [id]/
│       └── page.tsx    → Tour Details + Booking Form
└── about/
    └── page.tsx        → About Georgia
```

### Admin Routes (`/src/app/admin`)
```
admin/
├── layout.tsx          → Sidebar Navigation
├── login/
│   └── page.tsx        → Admin Login
├── page.tsx            → Dashboard (Stats, Recent Bookings)
├── tours/
│   ├── page.tsx        → Tours List
│   └── create/
│       └── page.tsx    → Create Tour (TourBuilder)
├── bookings/
│   └── page.tsx        → Bookings Management
└── import/
    └── page.tsx        → CSV/Excel Import with Preview
```

### API Routes (`/src/app/api`)
```
api/
└── admin/
    └── import/
        ├── route.ts         → Import Data Endpoint
        └── preview/
            └── route.ts     → Preview Import Endpoint
```

## 🔄 Data Flow

### Public Booking Flow
```
User → Tour Details → Booking Form → Supabase → Admin Dashboard
```

### Admin Tour Creation Flow
```
Admin → Login → TourBuilder → Supabase → Public Tours List
```

### Import Flow
```
Admin → Upload CSV/Excel → Preview → Validate → Import → Database
```

## 🔐 Security Layers

1. **Middleware** (`src/middleware.ts`)
   - Protects `/admin/*` routes
   - Redirects unauthenticated users to login
   - Uses Supabase session management

2. **Row Level Security (RLS)**
   - Public can read active tours
   - Public can insert bookings
   - Authenticated users manage all data

3. **API Protection**
   - All admin APIs check authentication
   - Return 401 for unauthorized access

## 🗃️ Database Schema

```
Countries → Regions → Cities → Hotels → Room Types
                        │
                        ├→ Tour Itinerary
                        └→ Tour Hotels
Tours → Bookings
        │
        └→ Tour Itinerary (days, activities)
```

## 🎨 Component Structure

### Public Components
- `MobileNav.tsx` - Responsive hamburger menu
- `BookingForm.tsx` - Form with validation (React Hook Form)

### Admin Components
- `AdminSidebar.tsx` - Navigation sidebar
- `TourBuilder.tsx` - Dynamic itinerary builder
- `BookingActions.tsx` - Confirm/Cancel buttons

## 🚀 Key Technologies

| Technology | Purpose |
|------------|---------|
| Next.js 16 | Framework with App Router |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Supabase | Database + Auth |
| React Hook Form | Form management |
| PapaParser | CSV parsing |
| XLSX | Excel parsing |
| Lucide React | Icons |

## 🔄 State Management

- **Server Components**: Fetch data directly from Supabase
- **Client Components**: Use `'use client'` directive for interactivity
- **Form State**: Managed by React Hook Form
- **Auth State**: Managed by Supabase client

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: `sm`, `md`, `lg`
- Mobile navigation with hamburger menu
- Responsive grids and cards
- Touch-friendly buttons and forms

## 🌐 Deployment Checklist

- [ ] Set up Supabase project
- [ ] Run database migrations
- [ ] Create admin user
- [ ] Configure environment variables
- [ ] Deploy to Vercel/other hosting
- [ ] Test authentication flow
- [ ] Verify public pages work
- [ ] Test admin functionality
- [ ] Configure custom domain (optional)
