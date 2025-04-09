import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  Observable,
  of,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { NominatimResult } from '../models/nominatim.model';
import { NominatimService } from '../services/nominatim.service';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  searchQuery: string = '';
  results$!: Observable<NominatimResult[]>;
  errorMessage: string | null = null;
  isLoading: boolean = false;

  @Output() locations = new EventEmitter<NominatimResult[]>();

  constructor(private searchService: NominatimService) {}

  onSearch() {
    if (this.searchQuery.length <= 2) {
      this.results$ = of([]);
      this.isLoading = false;
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    this.results$ = of(this.searchQuery).pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((query) => this.searchService.searchAddress(query)),
      tap(() => {
        this.isLoading = false;
        this.errorMessage = null;
      }),
      catchError((error) => {
        console.error('API Error:', error);
        this.errorMessage = 'Failed to fetch search results. Please try again.';
        this.isLoading = false;
        return [];
      })
    );
  }

  onSelectLocation(location: NominatimResult) {
    this.results$ = of([]);
    this.searchService
      .searchAddressWithLimit(location.address?.city || location.name)
      .pipe(
        take(1),
        tap((locations) => {
          this.locations.emit(locations);
        }),
        catchError((error) => {
          console.error('API Error:', error);
          return of([]);
        })
      )
      .subscribe();
  }
}
