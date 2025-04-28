export interface AppState {
  selectedCity: string | null;
  restaurants: MapLocation[];
  selectedRestaurant: MapLocation | null;
}

import { MapLocation } from '../models/map.model';

export const initialState: AppState = {
  selectedCity: null,
  restaurants: [],
  selectedRestaurant: null,
};
