import { NominatimResult } from './nominatim.model';

export type MapLocation = Omit<
  NominatimResult,
  'lon' | 'lat' | 'display_name'
> & {
  latitude: number;
  longitude: number;
  label: string;
};
