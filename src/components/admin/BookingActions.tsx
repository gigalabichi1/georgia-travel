'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Check, X } from 'lucide-react';

interface BookingActionsProps {
  bookingId: string;
  currentStatus: string;
}

export default function BookingActions({ bookingId, currentStatus }: BookingActionsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleStatusChange = async (newStatus: 'confirmed' | 'cancelled') => {
    if (!confirm(`Are you sure you want to ${newStatus === 'confirmed' ? 'confirm' : 'cancel'} this booking?`)) {
      return;
    }

    setIsLoading(true);

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('bookings')
        .update({ status: newStatus })
        .eq('id', bookingId);

      if (error) throw error;

      router.refresh();
    } catch (error) {
      console.error('Error updating booking:', error);
      alert('Failed to update booking');
    } finally {
      setIsLoading(false);
    }
  };

  if (currentStatus === 'confirmed' || currentStatus === 'cancelled') {
    return (
      <span className="text-sm text-gray-500">
        Already {currentStatus}
      </span>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => handleStatusChange('confirmed')}
        disabled={isLoading}
        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors disabled:opacity-50"
        title="Confirm booking"
      >
        <Check className="w-5 h-5" />
      </button>
      <button
        onClick={() => handleStatusChange('cancelled')}
        disabled={isLoading}
        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
        title="Cancel booking"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}
