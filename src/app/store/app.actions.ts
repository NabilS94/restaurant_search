import { createAction, props } from '@ngrx/store';
import { MapLocation } from '../models/map.model';

export const setSelectedCity = createAction(
  '[App] Set Selected City',
  props<{ city: string | null }>()
);

export const setRestaurants = createAction(
  '[App] Set Restaurants',
  props<{ restaurants: MapLocation[] }>()
);

export const setSelectedRestaurant = createAction(
  '[App] Set Selected Restaurant',
  props<{ restaurant: MapLocation | null }>()
);
