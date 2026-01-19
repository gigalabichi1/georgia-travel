import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import BookingForm from '@/components/public/BookingForm';
import { MapPin, Calendar, Users, Check } from 'lucide-react';

export default async function TourDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  // Fetch tour details
  const { data: tour, error } = await supabase
    .from('tours')
    .select('*')
    .eq('id', id)
    .eq('active', true)
    .single();

  if (error || !tour) {
    notFound();
  }

  // Fetch itinerary
  const { data: itinerary } = await supabase
    .from('tour_itinerary')
    .select('*')
    .eq('tour_id', id)
    .order('day_number', { ascending: true });

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="aspect-video bg-gradient-to-br from-indigo-400 to-indigo-600" />
          <div className="p-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{tour.title}</h1>
            <p className="text-xl text-gray-600 mb-6">{tour.description}</p>
            
            <div className="flex flex-wrap gap-6 text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-indigo-600" />
                <span>{tour.duration_days} days</span>
              </div>
              {tour.max_people && (
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-indigo-600" />
                  <span>Max {tour.max_people} people</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-indigo-600">
                  ${tour.price_per_person}
                </span>
                <span className="text-gray-500">per person</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Tour Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Itinerary */}
            {itinerary && itinerary.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold mb-6">Itinerary</h2>
                <div className="space-y-6">
                  {itinerary.map((day) => (
                    <div key={day.id} className="border-l-4 border-indigo-600 pl-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold">
                            {day.day_number}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-2">{day.title}</h3>
                          <p className="text-gray-600">{day.description}</p>
                          {day.activities && day.activities.length > 0 && (
                            <ul className="mt-3 space-y-1">
                              {day.activities.map((activity: string, index: number) => (
                                <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                                  <MapPin className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                                  <span>{activity}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* What's Included */}
            {tour.includes && tour.includes.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold mb-6">What's Included</h2>
                <ul className="space-y-3">
                  {tour.includes.map((item: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* What's Not Included */}
            {tour.excludes && tour.excludes.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold mb-6">What's Not Included</h2>
                <ul className="space-y-3">
                  {tour.excludes.map((item: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-5 h-5 flex-shrink-0 mt-0.5 text-gray-400">✕</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Column - Booking Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Book This Tour</h2>
              <BookingForm tourId={tour.id} pricePerPerson={tour.price_per_person} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
