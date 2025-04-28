import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, Observable, of, take, tap } from 'rxjs';
import { MapComponent } from '../map/map.component';
import { MapLocation } from '../models/map.model';
import { NominatimResult } from '../models/nominatim.model';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { NominatimService } from '../services/nominatim.service';
import { StickyPopupComponent } from '../sticky-popup/sticky-popup.component';
import {
  setRestaurants,
  setSelectedCity,
  setSelectedRestaurant,
} from '../store/app.actions';
import {
  selectChosenRestaurant,
  selectRestaurants,
} from '../store/app.selectors';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [MapComponent, SearchBarComponent, StickyPopupComponent, AsyncPipe],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {
  boundOnCitySelect = (suggestion: NominatimResult) =>
    this.onCitySelect(suggestion);
  boundOnRestaurantSelect = (restaurant: MapLocation) =>
    this.onRestaurantSelect(restaurant);

  private store = inject(Store);
  restaurants$: Observable<MapLocation[]> =
    this.store.select(selectRestaurants);
  chosenRestaurant$: Observable<MapLocation | null> = this.store.select(
    selectChosenRestaurant
  );

  constructor(private searchService: NominatimService) {}

  onCitySelect(suggestion: NominatimResult): void {
    const cityName = suggestion.address?.city || suggestion.name;

    this.store.dispatch(setSelectedCity({ city: cityName }));
    this.store.dispatch(setSelectedRestaurant({ restaurant: null }));

    this.searchService
      .searchAddressWithLimit(cityName)
      .pipe(
        take(1),
        tap((locations) => {
          const locationsList: MapLocation[] = locations.map((location) => ({
            latitude: parseFloat(location.lat),
            longitude: parseFloat(location.lon),
            label: location.display_name,
            ...location,
          }));
          this.store.dispatch(setRestaurants({ restaurants: locationsList }));
        }),
        catchError((err) => {
          console.error('Search error:', err);
          return of([]);
        })
      )
      .subscribe();
  }

  onRestaurantSelect(restaurant: MapLocation): void {
    this.store.dispatch(setSelectedRestaurant({ restaurant }));
  }
}
