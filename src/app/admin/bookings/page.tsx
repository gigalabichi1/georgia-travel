import { createClient } from '@/lib/supabase/server';
import BookingActions from '@/components/admin/BookingActions';
import { Calendar, User, Mail, Phone, Users, MessageSquare } from 'lucide-react';

export default async function AdminBookingsPage() {
  const supabase = await createClient();

  const { data: bookings, error } = await supabase
    .from('bookings')
    .select('*, tours(title)')
    .order('created_at', { ascending: false });

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Bookings</h1>

      {error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          Failed to load bookings
        </div>
      ) : bookings && bookings.length > 0 ? (
        <div className="space-y-4">
          {bookings.map((booking: any) => (
            <div key={booking.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Customer Info */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-gray-900">
                      Customer Information
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <User className="w-4 h-4 flex-shrink-0" />
                        <span>{booking.full_name}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail className="w-4 h-4 flex-shrink-0" />
                        <a
                          href={`mailto:${booking.email}`}
                          className="hover:text-indigo-600"
                        >
                          {booking.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone className="w-4 h-4 flex-shrink-0" />
                        <a
                          href={`tel:${booking.phone}`}
                          className="hover:text-indigo-600"
                        >
                          {booking.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Middle Column - Booking Details */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-gray-900">
                      Booking Details
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-600">Tour:</span>
                        <p className="font-medium text-gray-900">
                          {booking.tours?.title || 'N/A'}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Users className="w-4 h-4 flex-shrink-0" />
                        <span>{booking.number_of_people} people</span>
                      </div>
                      {booking.preferred_date && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="w-4 h-4 flex-shrink-0" />
                          <span>
                            {new Date(booking.preferred_date).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                      <div>
                        <span className="text-gray-600">Total:</span>
                        <p className="text-xl font-bold text-indigo-600">
                          ${booking.total_price || 0}
                        </p>
                      </div>
                    </div>
                  </div>

                  {booking.special_requests && (
                    <div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                        <MessageSquare className="w-4 h-4 flex-shrink-0" />
                        <span className="font-medium">Special Requests:</span>
                      </div>
                      <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded">
                        {booking.special_requests}
                      </p>
                    </div>
                  )}
                </div>

                {/* Right Column - Status & Actions */}
                <div className="flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-gray-900">Status</h3>
                    <span
                      className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
                        booking.status === 'confirmed'
                          ? 'bg-green-100 text-green-800'
                          : booking.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : booking.status === 'cancelled'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                    
                    <p className="text-xs text-gray-500 mt-4">
                      Booked: {new Date(booking.created_at).toLocaleString()}
                    </p>
                  </div>

                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Actions</h4>
                    <BookingActions
                      bookingId={booking.id}
                      currentStatus={booking.status}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-gray-500 text-lg">No bookings yet</p>
        </div>
      )}
    </div>
  );
}
