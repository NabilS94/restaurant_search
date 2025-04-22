import { ChangeDetectorRef, Component } from '@angular/core';
import { MapComponent } from '../map/map.component';
import { RestaurantOM } from '../models/map.model';
import { NominatimResult } from '../models/nominatim.model';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { StickyPopupComponent } from '../sticky-popup/sticky-popup.component';

@Component({
  selector: 'app-main',
  imports: [MapComponent, SearchBarComponent, StickyPopupComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  selectedRestaurantLabel: string = '';
  mapCoordinates: RestaurantOM[] = [];
  constructor(private cd: ChangeDetectorRef) {}

  handleLocations(locations: NominatimResult[]) {
    this.selectedRestaurantLabel = '';
    const restaurantsLocations = locations.map((location) => ({
      latitude: parseFloat(location.lat),
      longitude: parseFloat(location.lon),
      label: location.display_name,
      ...location,
    }));

    this.mapCoordinates = restaurantsLocations;
  }

  onRestaurantSelected(label: string): void {
    this.selectedRestaurantLabel = label;
    this.cd.detectChanges();
  }
}
