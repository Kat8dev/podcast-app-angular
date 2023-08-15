import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PodcastListComponent } from './podcast-list/podcast-list.component';
import { PodcastDetailsComponent } from './podcast-details/podcast-details.component';
import { EpisodeDetailsComponent } from './episode-details/episode-details.component';

const routes: Routes = [
  {
    path: '',
    component: PodcastListComponent,
  },
  {
    path: 'podcast/:id',
    component: PodcastDetailsComponent,
    children: [
      {
        path: 'episode/:episodeId',
        component: EpisodeDetailsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PodcastRoutingModule {}
