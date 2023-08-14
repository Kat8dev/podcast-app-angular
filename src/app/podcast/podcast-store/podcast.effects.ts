import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import * as PodcastActions from './podcast.actions';
import { PodcastService } from '../podcast.service';
import { environment } from 'src/environments/environments';

@Injectable()
export class PodcastEffects {
  loadPodcasts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PodcastActions.loadPodcasts),
      mergeMap(() => {
        const cachedPodcasts = this.getCachedPodcasts();

        if (cachedPodcasts) {
          return of(
            PodcastActions.loadPodcastsSuccess({ podcasts: cachedPodcasts })
          );
        }

        return this.podcastService.getPodcasts(environment.podcastList).pipe(
          map((res) => res.feed.entry),
          tap((podcasts) => this.cachePodcasts(podcasts)),
          map((podcasts) => PodcastActions.loadPodcastsSuccess({ podcasts })),
          catchError((error) =>
            of(PodcastActions.loadPodcastsFailure({ error }))
          )
        );
      })
    )
  );

  loadDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PodcastActions.loadDetails),
      mergeMap((actions) =>
        this.podcastService
          .getPodcasts(
            `${environment.podcastDetails}?id=${actions.podcastId}&media=podcast&entity=podcastEpisode`
          )
          .pipe(
            map((res) => res.results),
            map((details) => PodcastActions.loadDetailsSuccess({ details })),
            catchError((error) =>
              of(PodcastActions.loadDetailsFailure({ error }))
            )
          )
      )
    )
  );

  private getCachedPodcasts(): any[] | null {
    const cachedData = localStorage.getItem('cachedPodcasts');
    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);
      const currentTime = new Date().getTime();
      if (currentTime - timestamp < 24 * 60 * 60 * 1000) {
        return data;
      } else {
        localStorage.removeItem('cachedPodcasts');
      }
    }
    return null;
  }

  private cachePodcasts(podcasts: any[]): void {
    const cachedData = {
      data: podcasts,
      timestamp: new Date().getTime(),
    };
    localStorage.setItem('cachedPodcasts', JSON.stringify(cachedData));
  }

  constructor(
    private actions$: Actions,
    private podcastService: PodcastService
  ) {}
}
