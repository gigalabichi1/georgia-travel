'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TourBuilder from '@/components/admin/TourBuilder';
import { createClient } from '@/lib/supabase/client';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CreateTourPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    setError('');

    try {
      const supabase = createClient();

      // Separate itinerary from tour data
      const { itinerary, ...tourData } = data;

      // Insert tour
      const { data: tour, error: tourError } = await supabase
        .from('tours')
        .insert(tourData)
        .select()
        .single();

      if (tourError) throw tourError;

      // Insert itinerary if exists
      if (itinerary && itinerary.length > 0) {
        const itineraryData = itinerary.map((day: any) => ({
          ...day,
          tour_id: tour.id,
        }));

        const { error: itineraryError } = await supabase
          .from('tour_itinerary')
          .insert(itineraryData);

        if (itineraryError) throw itineraryError;
      }

      router.push('/admin/tours');
      router.refresh();
    } catch (err: any) {
      console.error('Error creating tour:', err);
      setError(err.message || 'Failed to create tour');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/tours"
          className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Create New Tour</h1>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <TourBuilder onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
}
