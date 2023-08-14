import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { PodcastEffects } from './podcast-store/podcast.effects';
import { podcastReducer } from './podcast-store/podcast.reducers';
import { detailsReducer } from './podcast-store/details.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature('podcasts', podcastReducer),
    StoreModule.forFeature('details', detailsReducer),
    EffectsModule.forFeature([PodcastEffects]),
  ],
})
export class PodcastStoreModule {}
