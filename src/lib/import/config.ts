// Import configurations for different entity types

export interface ImportConfig {
  tableName: string;
  columns: {
    csv: string; // CSV column name
    db: string; // Database column name
    required?: boolean;
    transform?: (value: any) => any;
  }[];
}

export const importConfigs: Record<string, ImportConfig> = {
  countries: {
    tableName: 'countries',
    columns: [
      { csv: 'name', db: 'name', required: true },
      { csv: 'name_ka', db: 'name_ka' },
      { csv: 'code', db: 'code' },
    ],
  },
  regions: {
    tableName: 'regions',
    columns: [
      { csv: 'country_id', db: 'country_id', required: true },
      { csv: 'name', db: 'name', required: true },
      { csv: 'name_ka', db: 'name_ka' },
      { csv: 'description', db: 'description' },
    ],
  },
  cities: {
    tableName: 'cities',
    columns: [
      { csv: 'region_id', db: 'region_id', required: true },
      { csv: 'name', db: 'name', required: true },
      { csv: 'name_ka', db: 'name_ka' },
      { csv: 'description', db: 'description' },
      {
        csv: 'latitude',
        db: 'latitude',
        transform: (val) => (val ? parseFloat(val) : null),
      },
      {
        csv: 'longitude',
        db: 'longitude',
        transform: (val) => (val ? parseFloat(val) : null),
      },
    ],
  },
  hotels: {
    tableName: 'hotels',
    columns: [
      { csv: 'city_id', db: 'city_id', required: true },
      { csv: 'name', db: 'name', required: true },
      { csv: 'name_ka', db: 'name_ka' },
      { csv: 'description', db: 'description' },
      { csv: 'address', db: 'address' },
      {
        csv: 'stars',
        db: 'stars',
        transform: (val) => (val ? parseInt(val) : null),
      },
      {
        csv: 'amenities',
        db: 'amenities',
        transform: (val) => (val ? val.split(',').map((s: string) => s.trim()) : []),
      },
      {
        csv: 'images',
        db: 'images',
        transform: (val) => (val ? val.split(',').map((s: string) => s.trim()) : []),
      },
    ],
  },
  room_types: {
    tableName: 'room_types',
    columns: [
      { csv: 'hotel_id', db: 'hotel_id', required: true },
      { csv: 'name', db: 'name', required: true },
      { csv: 'name_ka', db: 'name_ka' },
      { csv: 'description', db: 'description' },
      {
        csv: 'capacity',
        db: 'capacity',
        transform: (val) => (val ? parseInt(val) : null),
      },
      {
        csv: 'price_per_night',
        db: 'price_per_night',
        transform: (val) => (val ? parseFloat(val) : null),
      },
    ],
  },
  placements: {
    tableName: 'placements',
    columns: [
      { csv: 'name', db: 'name', required: true },
      { csv: 'description', db: 'description' },
    ],
  },
};
