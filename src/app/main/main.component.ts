import { Component } from '@angular/core';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-main',
  imports: [MapComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  mapMarkers = [
    { latitude: 48.8566, longitude: 2.3522, label: 'Bienvenue à Paris !' },
    { latitude: 48.8584, longitude: 2.2945, label: 'Tour Eiffel' },
    { latitude: 48.8606, longitude: 2.3376, label: 'Musée du Louvre' },
  ];
}
