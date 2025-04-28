import { createReducer, on } from '@ngrx/store';
import { appActions } from './app.actions';
import { initialState } from './app.state';

export const appReducer = createReducer(
  initialState,
  on(appActions.setSelectedCity, (state, { city }) => ({
    ...state,
    selectedCity: city,
  })),
  on(appActions.setRestaurants, (state, { restaurants }) => ({
    ...state,
    restaurants,
  })),
  on(appActions.setSelectedRestaurant, (state, { restaurant }) => ({
    ...state,
    selectedRestaurant: restaurant,
  }))
);
