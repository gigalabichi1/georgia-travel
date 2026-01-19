import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

export default async function ToursPage() {
  const supabase = await createClient();
  
  // Fetch all active tours
  const { data: tours, error } = await supabase
    .from('tours')
    .select('*')
    .eq('active', true)
    .order('created_at', { ascending: false });

  return (
    <div className="py-12 md:py-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Tours</h1>
          <p className="text-xl text-gray-600">
            Explore our carefully curated tour packages designed to showcase the best of Georgia.
          </p>
        </div>

        {error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            Failed to load tours. Please try again later.
          </div>
        ) : tours && tours.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.map((tour) => (
              <Link
                key={tour.id}
                href={`/tours/${tour.id}`}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden group"
              >
                <div className="aspect-video bg-gradient-to-br from-indigo-400 to-indigo-600 group-hover:from-indigo-500 group-hover:to-indigo-700 transition-colors relative">
                  {tour.featured && (
                    <span className="absolute top-4 right-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold">
                      Featured
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-semibold mb-2 group-hover:text-indigo-600 transition-colors">
                    {tour.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {tour.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">
                        Duration: {tour.duration_days} days
                      </p>
                      {tour.max_people && (
                        <p className="text-sm text-gray-500">
                          Max: {tour.max_people} people
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">From</p>
                      <p className="text-2xl font-bold text-indigo-600">
                        ${tour.price_per_person}
                      </p>
                      <p className="text-xs text-gray-500">per person</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <span className="text-indigo-600 font-medium group-hover:underline">
                      View Details →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-500 text-lg mb-4">
              No tours available at the moment.
            </p>
            <p className="text-gray-400">
              Please check back later for new tour packages.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
