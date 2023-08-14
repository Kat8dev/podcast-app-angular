import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PodcastListComponent } from './podcast-list/podcast-list.component';
import { PodcastDetailsComponent } from './podcast-details/podcast-details.component';
import { EpisodeDetailsComponent } from './episode-details/episode-details.component';
import { DetailsCardComponent } from './details-card/details-card.component';
import { SharedModule } from '../shared/shared.module';
import { PodcastRoutingModule } from './podcast-routing.module';
import { PodcastStoreModule } from './podcast-store.module';

@NgModule({
  declarations: [
    PodcastListComponent,
    PodcastDetailsComponent,
    EpisodeDetailsComponent,
    DetailsCardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PodcastRoutingModule,
    PodcastStoreModule
  ]
})
export class PodcastModule { }
