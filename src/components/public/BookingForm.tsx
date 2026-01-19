'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createClient } from '@/lib/supabase/client';
import { BookingFormData } from '@/types/database';
import { Calendar, User, Mail, Phone, Users, MessageSquare } from 'lucide-react';

interface BookingFormProps {
  tourId: string;
  pricePerPerson: number;
}

export default function BookingForm({ tourId, pricePerPerson }: BookingFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<BookingFormData>();

  const numberOfPeople = watch('number_of_people', 1);
  const totalPrice = numberOfPeople * pricePerPerson;

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const supabase = createClient();
      
      const { error } = await supabase.from('bookings').insert({
        tour_id: tourId,
        full_name: data.full_name,
        email: data.email,
        phone: data.phone,
        number_of_people: data.number_of_people,
        preferred_date: data.preferred_date || null,
        special_requests: data.special_requests || null,
        status: 'pending',
        total_price: totalPrice,
      });

      if (error) throw error;

      setSubmitStatus('success');
      reset();
    } catch (error) {
      console.error('Booking error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Full Name */}
      <div>
        <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-1">
          Full Name *
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="full_name"
            type="text"
            {...register('full_name', { required: 'Full name is required' })}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="John Doe"
          />
        </div>
        {errors.full_name && (
          <p className="mt-1 text-sm text-red-600">{errors.full_name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email *
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="email"
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="john@example.com"
          />
        </div>
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          Phone *
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Phone className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="phone"
            type="tel"
            {...register('phone', { required: 'Phone number is required' })}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="+995 XXX XXX XXX"
          />
        </div>
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
        )}
      </div>

      {/* Number of People */}
      <div>
        <label htmlFor="number_of_people" className="block text-sm font-medium text-gray-700 mb-1">
          Number of People *
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Users className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="number_of_people"
            type="number"
            min="1"
            {...register('number_of_people', {
              required: 'Number of people is required',
              min: { value: 1, message: 'At least 1 person required' },
              valueAsNumber: true,
            })}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            defaultValue={1}
          />
        </div>
        {errors.number_of_people && (
          <p className="mt-1 text-sm text-red-600">{errors.number_of_people.message}</p>
        )}
      </div>

      {/* Preferred Date */}
      <div>
        <label htmlFor="preferred_date" className="block text-sm font-medium text-gray-700 mb-1">
          Preferred Date
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="preferred_date"
            type="date"
            {...register('preferred_date')}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
      </div>

      {/* Special Requests */}
      <div>
        <label htmlFor="special_requests" className="block text-sm font-medium text-gray-700 mb-1">
          Special Requests
        </label>
        <div className="relative">
          <div className="absolute top-3 left-3 pointer-events-none">
            <MessageSquare className="h-5 w-5 text-gray-400" />
          </div>
          <textarea
            id="special_requests"
            {...register('special_requests')}
            rows={3}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Any special requirements or requests..."
          />
        </div>
      </div>

      {/* Total Price */}
      <div className="bg-indigo-50 rounded-lg p-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-700 font-medium">Total Price:</span>
          <span className="text-2xl font-bold text-indigo-600">${totalPrice}</span>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {isSubmitting ? 'Submitting...' : 'Book Now'}
      </button>

      {/* Status Messages */}
      {submitStatus === 'success' && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
          Booking submitted successfully! We'll contact you soon.
        </div>
      )}
      {submitStatus === 'error' && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          Failed to submit booking. Please try again.
        </div>
      )}
    </form>
  );
}
