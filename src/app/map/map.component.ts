import { Component, Input, OnInit } from '@angular/core';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import * as L from 'leaflet';
import { MapCoordinate } from '../models/map.model';

@Component({
  selector: 'app-map',
  standalone: true, // Si Angular standalone est utilisé
  imports: [
    LeafletModule, // Import du module Leaflet
  ],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  @Input() coordinates: MapCoordinate[] = [];
  markers: L.Marker[] = [];

  options = {
    layers: [
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap contributors',
      }),
    ],
    zoom: 13,
    center: L.latLng(48.8566, 2.3522), // Paris
  };

  ngOnInit(): void {
    this.coordinates.map((co) => this.addMarker(co));
  }

  addMarker(mapMarker: MapCoordinate): void {
    const marker = L.marker([mapMarker.latitude, mapMarker.longitude], {
      icon: L.icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: 'assets/marker-icon.png',
        shadowUrl: 'assets/marker-shadow.png',
      }),
    }).bindPopup(mapMarker.label);

    this.markers.push(marker);
  }
}
