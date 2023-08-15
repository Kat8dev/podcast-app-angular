import { createReducer, on } from '@ngrx/store';
import * as PodcastActions from './podcast.actions';
import { Episode } from '../podcast.model';

export interface DetailsState {
  details: Episode[];
  loading: boolean;
  error: any; // TODO: create interface for error
}

const initialState: DetailsState = {
  details: [],
  loading: false,
  error: null,
};

export const detailsReducer = createReducer(
  initialState,
  on(PodcastActions.loadDetails, state => ({ ...state, loading: true })),
  on(PodcastActions.loadDetailsSuccess, (state, { details }) => ({
    ...state,
    details,
    loading: false,
  })),
  on(PodcastActions.loadDetailsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
