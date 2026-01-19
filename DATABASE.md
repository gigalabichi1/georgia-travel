# Database Schema

This document describes the Supabase database schema required for the Georgia Travel application.

## Tables

### countries
```sql
CREATE TABLE countries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  name_ka TEXT,
  code TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### regions
```sql
CREATE TABLE regions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  country_id UUID REFERENCES countries(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  name_ka TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### cities
```sql
CREATE TABLE cities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  region_id UUID REFERENCES regions(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  name_ka TEXT,
  description TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### hotels
```sql
CREATE TABLE hotels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  city_id UUID REFERENCES cities(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  name_ka TEXT,
  description TEXT,
  address TEXT,
  stars INTEGER CHECK (stars >= 1 AND stars <= 5),
  amenities TEXT[],
  images TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### room_types
```sql
CREATE TABLE room_types (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  hotel_id UUID REFERENCES hotels(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  name_ka TEXT,
  description TEXT,
  capacity INTEGER,
  price_per_night DECIMAL(10, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### placements
```sql
CREATE TABLE placements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### tours
```sql
CREATE TABLE tours (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  title_ka TEXT,
  description TEXT,
  description_ka TEXT,
  duration_days INTEGER NOT NULL CHECK (duration_days > 0),
  price_per_person DECIMAL(10, 2) NOT NULL CHECK (price_per_person >= 0),
  max_people INTEGER,
  includes TEXT[],
  excludes TEXT[],
  images TEXT[],
  featured BOOLEAN DEFAULT FALSE,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### tour_itinerary
```sql
CREATE TABLE tour_itinerary (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tour_id UUID REFERENCES tours(id) ON DELETE CASCADE,
  day_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  title_ka TEXT,
  description TEXT,
  description_ka TEXT,
  city_id UUID REFERENCES cities(id),
  activities TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(tour_id, day_number)
);
```

### tour_hotels
```sql
CREATE TABLE tour_hotels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tour_id UUID REFERENCES tours(id) ON DELETE CASCADE,
  hotel_id UUID REFERENCES hotels(id) ON DELETE CASCADE,
  check_in_day INTEGER NOT NULL,
  check_out_day INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### bookings
```sql
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tour_id UUID REFERENCES tours(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  number_of_people INTEGER NOT NULL CHECK (number_of_people > 0),
  preferred_date DATE,
  special_requests TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  total_price DECIMAL(10, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Indexes

```sql
CREATE INDEX idx_regions_country ON regions(country_id);
CREATE INDEX idx_cities_region ON cities(region_id);
CREATE INDEX idx_hotels_city ON hotels(city_id);
CREATE INDEX idx_room_types_hotel ON room_types(hotel_id);
CREATE INDEX idx_tour_itinerary_tour ON tour_itinerary(tour_id);
CREATE INDEX idx_tour_hotels_tour ON tour_hotels(tour_id);
CREATE INDEX idx_tour_hotels_hotel ON tour_hotels(hotel_id);
CREATE INDEX idx_bookings_tour ON bookings(tour_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_tours_featured ON tours(featured) WHERE featured = TRUE;
CREATE INDEX idx_tours_active ON tours(active) WHERE active = TRUE;
```

## Row Level Security (RLS)

Enable RLS on all tables and create appropriate policies:

### For public tables (read-only for everyone):
```sql
ALTER TABLE tours ENABLE ROW LEVEL SECURITY;
ALTER TABLE tour_itinerary ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read on active tours"
  ON tours FOR SELECT
  USING (active = TRUE);

CREATE POLICY "Allow public read on tour itinerary"
  ON tour_itinerary FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM tours
      WHERE tours.id = tour_itinerary.tour_id
      AND tours.active = TRUE
    )
  );
```

### For bookings (authenticated users can insert, admins can manage):
```sql
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anyone to insert bookings"
  ON bookings FOR INSERT
  WITH CHECK (TRUE);

CREATE POLICY "Allow authenticated users to view and manage bookings"
  ON bookings FOR ALL
  USING (auth.role() = 'authenticated');
```

### For admin-only tables:
```sql
ALTER TABLE countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE regions ENABLE ROW LEVEL SECURITY;
ALTER TABLE cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE hotels ENABLE ROW LEVEL SECURITY;
ALTER TABLE room_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE placements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users full access"
  ON countries FOR ALL
  USING (auth.role() = 'authenticated');

-- Repeat for other admin tables...
```

## Setup Instructions

1. Create a new Supabase project at https://supabase.com
2. Run the SQL schema in the Supabase SQL editor
3. Enable authentication (Email/Password)
4. Create an admin user in the Authentication section
5. Copy your project URL and anon key to `.env.local`
