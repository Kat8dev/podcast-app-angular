import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import * as PodcastActions from './podcast.actions';
import { PodcastService } from '../podcast.service';
import { environment } from 'src/environments/environments';

@Injectable()
export class PodcastEffects {
  loadPodcasts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PodcastActions.loadPodcasts),
      mergeMap(() => {
        const cachedPodcasts = this.getCachedData('cachedPodcasts');

        if (cachedPodcasts) {
          return of(
            PodcastActions.loadPodcastsSuccess({ podcasts: cachedPodcasts })
          );
        }

        return this.podcastService.getPodcasts(environment.podcastList).pipe(
          switchMap((res: any) => {
            const parsedContents = JSON.parse(res.contents);
            const entryArray = parsedContents.feed.entry;
            this.cacheData(entryArray, 'cachedPodcasts');
            return of(entryArray);
          }),
          tap((podcasts) => this.cacheData(podcasts, 'cachedPodcasts')),
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
      mergeMap((actions) => {
        const cachedDetails = this.getCachedData(`podcast${actions.podcastId}`);

        if (cachedDetails) {
          return of(
            PodcastActions.loadDetailsSuccess({ details: cachedDetails })
          );
        }
        return this.podcastService
          .getPodcasts(
            `${environment.podcastDetails}?id=${actions.podcastId}&media=podcast&entity=podcastEpisode`
          )
          .pipe(
            switchMap((res: any) => {
              const parsedContents = JSON.parse(res.contents);
              const details = parsedContents.results;
              this.cacheData(details, `podcast${actions.podcastId}`);
              return of(details);
            }),
            map((details) => PodcastActions.loadDetailsSuccess({ details })),
            catchError((error) =>
              of(PodcastActions.loadDetailsFailure({ error }))
            )
          );
      })
    )
  );

  private getCachedData(value: string): any[] | null {
    const cachedData = localStorage.getItem(value);
    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);
      const currentTime = new Date().getTime();
      if (currentTime - timestamp < 24 * 60 * 60 * 1000) {
        return data;
      } else {
        localStorage.removeItem(value);
      }
    }
    return null;
  }

  private cacheData(data: any[], title: string): void {
    const cachedData = {
      data: data,
      timestamp: new Date().getTime(),
    };
    localStorage.setItem(title, JSON.stringify(cachedData));
  }

  constructor(
    private actions$: Actions,
    private podcastService: PodcastService
  ) {}
}
