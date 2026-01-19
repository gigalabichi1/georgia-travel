'use client';

import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Plus, Trash2, Save } from 'lucide-react';

interface ItineraryDay {
  day_number: number;
  title: string;
  description: string;
  activities: string;
}

interface TourBuilderProps {
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

export default function TourBuilder({ onSubmit, isLoading = false }: TourBuilderProps) {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      duration_days: 1,
      price_per_person: 0,
      max_people: undefined,
      includes: '',
      excludes: '',
      featured: false,
      active: true,
      itinerary: [
        { day_number: 1, title: '', description: '', activities: '' },
      ] as ItineraryDay[],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'itinerary',
  });

  const durationDays = watch('duration_days');

  const addDay = () => {
    append({
      day_number: fields.length + 1,
      title: '',
      description: '',
      activities: '',
    });
  };

  const handleFormSubmit = (data: any) => {
    // Transform data
    const transformedData = {
      ...data,
      includes: data.includes ? data.includes.split('\n').filter(Boolean) : [],
      excludes: data.excludes ? data.excludes.split('\n').filter(Boolean) : [],
      itinerary: data.itinerary.map((day: ItineraryDay) => ({
        day_number: day.day_number,
        title: day.title,
        description: day.description,
        activities: day.activities ? day.activities.split('\n').filter(Boolean) : [],
      })),
    };
    onSubmit(transformedData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
      {/* Basic Information */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-6">Basic Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Tour Title *
            </label>
            <input
              id="title"
              type="text"
              {...register('title', { required: 'Title is required' })}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Amazing Georgia Tour"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              id="description"
              {...register('description', { required: 'Description is required' })}
              rows={4}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Detailed tour description..."
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="duration_days" className="block text-sm font-medium text-gray-700 mb-1">
              Duration (days) *
            </label>
            <input
              id="duration_days"
              type="number"
              min="1"
              {...register('duration_days', {
                required: 'Duration is required',
                min: { value: 1, message: 'At least 1 day required' },
                valueAsNumber: true,
              })}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.duration_days && (
              <p className="mt-1 text-sm text-red-600">{errors.duration_days.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="price_per_person" className="block text-sm font-medium text-gray-700 mb-1">
              Price per Person ($) *
            </label>
            <input
              id="price_per_person"
              type="number"
              min="0"
              step="0.01"
              {...register('price_per_person', {
                required: 'Price is required',
                min: { value: 0, message: 'Price must be positive' },
                valueAsNumber: true,
              })}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.price_per_person && (
              <p className="mt-1 text-sm text-red-600">{errors.price_per_person.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="max_people" className="block text-sm font-medium text-gray-700 mb-1">
              Max People
            </label>
            <input
              id="max_people"
              type="number"
              min="1"
              {...register('max_people', { valueAsNumber: true })}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register('featured')}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm font-medium text-gray-700">Featured Tour</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register('active')}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm font-medium text-gray-700">Active</span>
            </label>
          </div>
        </div>
      </div>

      {/* What's Included/Excluded */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-6">Inclusions & Exclusions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="includes" className="block text-sm font-medium text-gray-700 mb-1">
              What's Included (one per line)
            </label>
            <textarea
              id="includes"
              {...register('includes')}
              rows={6}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Accommodation&#10;Meals&#10;Transportation"
            />
          </div>

          <div>
            <label htmlFor="excludes" className="block text-sm font-medium text-gray-700 mb-1">
              What's Not Included (one per line)
            </label>
            <textarea
              id="excludes"
              {...register('excludes')}
              rows={6}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Flights&#10;Personal expenses&#10;Travel insurance"
            />
          </div>
        </div>
      </div>

      {/* Itinerary */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Itinerary</h2>
          <button
            type="button"
            onClick={addDay}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            <Plus className="w-4 h-4" />
            Add Day
          </button>
        </div>

        <div className="space-y-6">
          {fields.map((field, index) => (
            <div key={field.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Day {index + 1}</h3>
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="space-y-4">
                <input type="hidden" {...register(`itinerary.${index}.day_number`)} value={index + 1} />
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Day Title *
                  </label>
                  <input
                    type="text"
                    {...register(`itinerary.${index}.title`, { required: 'Title is required' })}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Arrival in Tbilisi"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    {...register(`itinerary.${index}.description`, { required: 'Description is required' })}
                    rows={3}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Detailed description of the day..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Activities (one per line)
                  </label>
                  <textarea
                    {...register(`itinerary.${index}.activities`)}
                    rows={3}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Visit Old Town&#10;Wine tasting&#10;Dinner at traditional restaurant"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          <Save className="w-5 h-5" />
          {isLoading ? 'Creating...' : 'Create Tour'}
        </button>
      </div>
    </form>
  );
}
