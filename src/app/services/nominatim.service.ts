import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NominatimResult } from '../models/nominatim.model';

@Injectable({
  providedIn: 'root',
})
export class NominatimService {
  constructor(private http: HttpClient) {}

  searchAddress(q: string): Observable<NominatimResult> {
    const params = new HttpParams().set('q', q).set('format', 'json');

    return this.http.get<NominatimResult>(
      'https://nominatim.openstreetmap.org/search',
      {
        params,
      }
    );
  }
}
