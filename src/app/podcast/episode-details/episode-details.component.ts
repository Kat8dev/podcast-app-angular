import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map, of, switchMap } from 'rxjs';
import { selectDetails } from '../podcast-store/podcast.selectors';

@Component({
  selector: 'app-episode-details',
  templateUrl: './episode-details.component.html',
  styleUrls: ['./episode-details.component.scss'],
})
export class EpisodeDetailsComponent implements OnInit {
  episodeId!: string | null;
  podcast$: Observable<any> = this.store.select(selectDetails);
  episode$!: Observable<any>;

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit() {
    this.episode$ = this.route.paramMap.pipe(
      map((param) => param.get('episodeId')),
      switchMap((episodeId) =>
        this.podcast$.pipe(
          map((episodeList) =>
            episodeList.find(
              (episode: { trackId: string | null }) =>
                episode.trackId?.toString() === episodeId
            )
          )
        )
      )
    );
  }
}
