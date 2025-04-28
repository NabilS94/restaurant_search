import { createActionGroup, props } from '@ngrx/store';
import { MapLocation } from '../models/map.model';

export const appActions = createActionGroup({
  source: 'App',
  events: {
    'Set Selected City': props<{ city: string }>(),
    'Set Selected Restaurant': props<{ restaurant: MapLocation | null }>(),
    'Set Restaurants': props<{ restaurants: MapLocation[] }>(),
    'load Restaurants Failure': props<{ error: string }>(),
  },
});
