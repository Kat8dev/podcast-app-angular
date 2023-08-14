import { createAction, props } from '@ngrx/store';
import { Podcast } from '../podcast.model';

export const loadPodcasts = createAction('[Podcast List] Load Podcasts');

export const loadPodcastsSuccess = createAction(
  '[Podcast List] Load Podcasts Success',
  props<{ podcasts: Podcast[] }>()
);

export const loadPodcastsFailure = createAction(
  '[Podcast List] Load Podcasts Failure',
  props<{ error: any }>() // TODO: set adecuate type for error
);

export const loadDetails = createAction(
  '[Details] Load Details',
  props<{ podcastId: number }>()
);

export const loadDetailsSuccess = createAction(
  '[Details] Load Details Success',
  props<{ details: any }>() // TODO: set adecuate type for props
);

export const loadDetailsFailure = createAction(
  '[Details] Load Details Failure',
  props<{ error: any }>() // TODO: set adecuate type for error
);
