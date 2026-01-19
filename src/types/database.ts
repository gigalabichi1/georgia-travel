// Database types for Georgia Travel platform

export interface Country {
  id: string;
  name: string;
  name_ka?: string;
  code?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Region {
  id: string;
  country_id: string;
  name: string;
  name_ka?: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface City {
  id: string;
  region_id: string;
  name: string;
  name_ka?: string;
  description?: string;
  latitude?: number;
  longitude?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Hotel {
  id: string;
  city_id: string;
  name: string;
  name_ka?: string;
  description?: string;
  address?: string;
  stars?: number;
  amenities?: string[];
  images?: string[];
  created_at?: string;
  updated_at?: string;
}

export interface RoomType {
  id: string;
  hotel_id: string;
  name: string;
  name_ka?: string;
  description?: string;
  capacity?: number;
  price_per_night?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Placement {
  id: string;
  name: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Tour {
  id: string;
  title: string;
  title_ka?: string;
  description?: string;
  description_ka?: string;
  duration_days: number;
  price_per_person: number;
  max_people?: number;
  includes?: string[];
  excludes?: string[];
  images?: string[];
  featured?: boolean;
  active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface TourItinerary {
  id: string;
  tour_id: string;
  day_number: number;
  title: string;
  title_ka?: string;
  description?: string;
  description_ka?: string;
  city_id?: string;
  activities?: string[];
  created_at?: string;
  updated_at?: string;
}

export interface TourHotel {
  id: string;
  tour_id: string;
  hotel_id: string;
  check_in_day: number;
  check_out_day: number;
  created_at?: string;
  updated_at?: string;
}

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export interface Booking {
  id: string;
  tour_id: string;
  full_name: string;
  email: string;
  phone: string;
  number_of_people: number;
  preferred_date?: string;
  special_requests?: string;
  status: BookingStatus;
  total_price?: number;
  created_at?: string;
  updated_at?: string;
}

// Helper types for forms
export interface BookingFormData {
  full_name: string;
  email: string;
  phone: string;
  number_of_people: number;
  preferred_date?: string;
  special_requests?: string;
}

export interface TourFormData extends Omit<Tour, 'id' | 'created_at' | 'updated_at'> {
  itinerary?: Omit<TourItinerary, 'id' | 'tour_id' | 'created_at' | 'updated_at'>[];
  hotels?: {
    hotel_id: string;
    check_in_day: number;
    check_out_day: number;
  }[];
}
