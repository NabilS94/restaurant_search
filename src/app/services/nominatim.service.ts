import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NominatimResult } from '../models/nominatim.model';

@Injectable({
  providedIn: 'root',
})
export class NominatimService {
  url: string = 'https://nominatim.openstreetmap.org/search';
  constructor(private http: HttpClient) {}

  searchAddress(q: string): Observable<NominatimResult[]> {
    const params = new HttpParams().set('q', q).set('format', 'json');

    return this.http.get<NominatimResult[]>(this.url, { params });
  }

  searchAddressWithLimit(city: string): Observable<NominatimResult[]> {
    const params = new HttpParams()
      .set('q', "McDonald's" + ', ' + city)
      .set('format', 'json');

    return this.http.get<NominatimResult[]>(this.url, { params });
  }
}
