import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MapComponent } from '../map/map.component';
import { MapLocation } from '../models/map.model';
import { NominatimResult } from '../models/nominatim.model';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { StickyPopupComponent } from '../sticky-popup/sticky-popup.component';
import { appActions } from '../store/app.actions';
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

  onCitySelect(suggestion: NominatimResult): void {
    const cityName = suggestion.address?.city || suggestion.name;

    this.store.dispatch(appActions.setSelectedCity({ city: cityName }));
    this.store.dispatch(appActions.setSelectedRestaurant({ restaurant: null }));
  }

  onRestaurantSelect(restaurant: MapLocation): void {
    this.store.dispatch(appActions.setSelectedRestaurant({ restaurant }));
  }
}
