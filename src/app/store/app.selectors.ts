// app.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './app.state';

export const selectAppState = createFeatureSelector<AppState>('app');

export const selectSelectedCity = createSelector(
  selectAppState,
  (state) => state.selectedCity
);

export const selectRestaurants = createSelector(
  selectAppState,
  (state) => state.restaurants
);

export const selectChosenRestaurant = createSelector(
  selectAppState,
  (state) => state.selectedRestaurant
);
