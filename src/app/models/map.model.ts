import { NominatimResult } from './nominatim.model';

export type RestaurantOM = Omit<
  NominatimResult,
  'lon' | 'lat' | 'display_name'
> & {
  latitude: number;
  longitude: number;
  label: string;
};
