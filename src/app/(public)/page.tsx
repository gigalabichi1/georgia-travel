import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { Mountain, Users, Star } from 'lucide-react';

export default async function HomePage() {
  const supabase = await createClient();
  
  // Fetch featured tours
  const { data: featuredTours } = await supabase
    .from('tours')
    .select('*')
    .eq('featured', true)
    .eq('active', true)
    .limit(3);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-600 to-indigo-800 text-white">
        <div className="container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Discover the Beauty of Georgia
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-indigo-100">
              Experience unforgettable adventures in one of the world's most beautiful countries.
              Ancient history, stunning mountains, and warm hospitality await you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/tours"
                className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors text-center"
              >
                Explore Tours
              </Link>
              <Link
                href="/about"
                className="inline-block bg-indigo-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-600 transition-colors text-center border border-indigo-500"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Georgia Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Visit Georgia?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Mountain className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Stunning Nature</h3>
              <p className="text-gray-600">
                From the Caucasus Mountains to the Black Sea coast, Georgia offers
                breathtaking landscapes and diverse natural beauty.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Rich History</h3>
              <p className="text-gray-600">
                Explore ancient churches, medieval fortresses, and UNESCO World
                Heritage sites that tell the story of this fascinating country.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Warm Hospitality</h3>
              <p className="text-gray-600">
                Experience the legendary Georgian hospitality, delicious cuisine, and
                world-famous wine culture that makes visitors feel at home.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tours Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Featured Tours
          </h2>
          
          {featuredTours && featuredTours.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredTours.map((tour) => (
                <Link
                  key={tour.id}
                  href={`/tours/${tour.id}`}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden group"
                >
                  <div className="aspect-video bg-gradient-to-br from-indigo-400 to-indigo-600 group-hover:from-indigo-500 group-hover:to-indigo-700 transition-colors" />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-indigo-600 transition-colors">
                      {tour.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {tour.description}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">
                        {tour.duration_days} days
                      </span>
                      <span className="text-indigo-600 font-semibold">
                        ${tour.price_per_person}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500">
              <p>No featured tours available at the moment.</p>
              <Link href="/tours" className="text-indigo-600 hover:underline mt-2 inline-block">
                View all tours
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Adventure?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Browse our curated tour packages and book your dream trip to Georgia today.
          </p>
          <Link
            href="/tours"
            className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
          >
            View All Tours
          </Link>
        </div>
      </section>
    </div>
  );
}
