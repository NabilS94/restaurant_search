import {
  Component,
  Input,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import * as L from 'leaflet';
import { MapLocation } from '../models/map.model';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [LeafletModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MapComponent {
  @Input() coordinates: MapLocation[] = [];
  @Input() onMarkerSelected: (marker: MapLocation) => void = () => {};
  markers: L.Marker[] = [];
  map!: L.Map;

  options: L.MapOptions = {
    layers: [
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        minZoom: 3,
        attribution: '© OpenStreetMap contributors',
        noWrap: true,
      }),
    ],
    zoom: 13,
    center: L.latLng(48.8566, 2.3522), // Paris
    maxBounds: L.latLngBounds(L.latLng(-90, -180), L.latLng(90, 180)),
    maxBoundsViscosity: 0.7,
  };

  onMapReady(map: L.Map) {
    this.map = map;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['coordinates'] && !changes['coordinates'].firstChange) {
      this.updateMarkers(this.coordinates);
    }
  }

  private updateMarkers(newMarkers: MapLocation[]) {
    this.clearMarkers();

    newMarkers.forEach((coordinate) => {
      this.addMarker(coordinate);
    });

    if (this.map && newMarkers.length > 0) {
      const target = L.latLng(
        Number(newMarkers[0].latitude),
        Number(newMarkers[0].longitude)
      );
      this.map.flyTo(target, this.map.getZoom(), {
        animate: true,
        duration: 1.5, // seconds
      });
    }
  }

  addMarker(mapMarker: MapLocation): void {
    const labelHtml = `
  <div class="wrapped-leaflet-tooltip">
    <div>${mapMarker.label}</div>
    <button id="select-btn-${
      mapMarker.latitude + mapMarker.longitude
    }" class="select-btn">Choisir</button>
  </div>
`;

    const marker = L.marker([mapMarker.latitude, mapMarker.longitude], {
      icon: L.icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: 'assets/marker-icon.png',
        shadowUrl: 'assets/marker-shadow.png',
      }),
    }).bindPopup(labelHtml);

    marker.on('popupopen', () => {
      setTimeout(() => {
        const btn = document.getElementById(
          `select-btn-${mapMarker.latitude + mapMarker.longitude}`
        );
        if (btn) {
          btn.addEventListener('click', () => {
            marker.closePopup();
            this.onMarkerSelected(mapMarker);
          });
        }
      }, 0);
    });

    this.markers.push(marker);
  }

  private clearMarkers() {
    this.markers = [];
  }
}
