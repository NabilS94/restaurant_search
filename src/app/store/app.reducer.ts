import { createReducer, on } from '@ngrx/store';
import * as AppActions from './app.actions';
import { initialState } from './app.state';

export const appReducer = createReducer(
  initialState,
  on(AppActions.setSelectedCity, (state, { city }) => ({
    ...state,
    selectedCity: city,
  })),
  on(AppActions.setRestaurants, (state, { restaurants }) => ({
    ...state,
    restaurants,
  })),
  on(AppActions.setSelectedRestaurant, (state, { restaurant }) => ({
    ...state,
    selectedRestaurant: restaurant,
  }))
);
