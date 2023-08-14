import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'podcasts', pathMatch: 'full' },
  {
    path: 'podcasts',
    loadChildren: () =>
      import('./podcast/podcast.module').then(
        (m) => m.PodcastModule
      ),
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes /* , { enableTracing: true } */)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
