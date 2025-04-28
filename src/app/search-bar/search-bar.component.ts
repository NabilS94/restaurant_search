import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  Observable,
  of,
  switchMap,
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
  @Input() handleSuggestionSelect!: (suggestion: NominatimResult) => void;

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

  onSuggestionSelect(suggestion: NominatimResult) {
    this.results$ = of([]);
    this.handleSuggestionSelect(suggestion);
  }
}
