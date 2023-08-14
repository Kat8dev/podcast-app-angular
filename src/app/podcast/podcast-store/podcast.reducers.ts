import { createReducer, on } from '@ngrx/store';
import { Podcast } from '../podcast.model';
import * as PodcastActions from './podcast.actions';

export interface PodcastState {
  podcasts: Podcast[];
  loading: boolean;
  error: any;
}

const initialState: PodcastState = {
  podcasts: [],
  loading: false,
  error: null,
};

export const podcastReducer = createReducer(
  initialState,
  on(PodcastActions.loadPodcasts, state => ({ ...state, loading: true })),
  on(PodcastActions.loadPodcastsSuccess, (state, { podcasts }) => ({
    ...state,
    podcasts,
    loading: false,
  })),
  on(PodcastActions.loadPodcastsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
