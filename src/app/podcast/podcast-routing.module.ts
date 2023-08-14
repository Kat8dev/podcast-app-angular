import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PodcastListComponent } from './podcast-list/podcast-list.component';
import { PodcastDetailsComponent } from './podcast-details/podcast-details.component';
import { EpisodeDetailsComponent } from './episode-details/episode-details.component';

const routes: Routes = [
  {
    path: '',
    component: PodcastListComponent,
    /*  children: [
      { path: 'details', component: PodcastDetailsComponent },
      { path: 'episodes', component: EpisodeDetailsComponent },
    ], */
  },
  { path: 'details/:id', component: PodcastDetailsComponent },
  { path: 'episodes', component: EpisodeDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PodcastRoutingModule {}
