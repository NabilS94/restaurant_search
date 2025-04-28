// app.effects.ts
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { MapLocation } from '../models/map.model';
import { NominatimService } from '../services/nominatim.service';
import { appActions } from './app.actions';

@Injectable()
export class AppEffects {
  private actions$ = inject(Actions);
  private searchService = inject(NominatimService);

  loadCityRestaurants$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appActions.setSelectedCity),
      switchMap(({ city }) =>
        this.searchService.searchAddressWithLimit(city).pipe(
          map((locations) => {
            const locationsList: MapLocation[] = locations.map((location) => ({
              latitude: parseFloat(location.lat),
              longitude: parseFloat(location.lon),
              label: location.display_name,
              ...location,
            }));
            return appActions.setRestaurants({ restaurants: locationsList });
          }),
          catchError((err) => {
            console.error('Search error:', err);
            return of(appActions.loadRestaurantsFailure({ error: err }));
          })
        )
      )
    )
  );
}
