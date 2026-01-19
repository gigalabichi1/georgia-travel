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

## 🚀 Deployment

### Deploy to Vercel (Recommended)
1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy!

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous key | Yes |

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ for Georgia