import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PodcastState } from './podcast.reducers';
import { DetailsState } from './details.reducer';

export const selectPodcastState = createFeatureSelector<PodcastState>('podcasts');
export const selectDetailsState = createFeatureSelector<DetailsState>('details')

export const selectPodcasts = createSelector(
  selectPodcastState,
  state => state.podcasts
);

export const selectPodcastsLoading = createSelector(
  selectPodcastState,
  state => state.loading
);

export const selectPodcastsError = createSelector(
  selectPodcastState,
  state => state.error
);

export const selectDetails = createSelector(
  selectDetailsState,
  state => state.details
);
