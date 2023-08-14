import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectPodcasts,
  selectPodcastsLoading,
  selectPodcastsError,
} from '../podcast-store/podcast.selectors';
import { loadPodcasts } from '../podcast-store/podcast.actions';
import { PodcastService } from '../podcast.service';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith, switchMap } from 'rxjs';
import { Podcast } from '../podcast.model';

@Component({
  selector: 'app-podcast-list',
  templateUrl: './podcast-list.component.html',
  styleUrls: ['./podcast-list.component.scss'],
})
export class PodcastListComponent implements OnInit {
  form = new FormControl('');
  filteredPodcasts$!: Observable<Podcast[]>;
  loadMoreVisible = true;
  currentSize: number = 10;

  podcasts$ = this.store.select(selectPodcasts);
  loading$ = this.store.select(selectPodcastsLoading);
  error$ = this.store.select(selectPodcastsError);

  constructor(private store: Store, private podcastService: PodcastService) {}

  ngOnInit() {
    this.store.dispatch(loadPodcasts());

    this.filteredPodcasts$ = this.podcasts$.pipe(
      switchMap((podcasts) =>
        this.form.valueChanges.pipe(
          startWith(''),
          map((value) => value!.toLowerCase()),
          map((filterValue) =>
            podcasts.filter(
              (podcast) =>
                podcast.title.label.toLowerCase().includes(filterValue) ||
                podcast['im:artist'].label.toLowerCase().includes(filterValue)
            )
          ),
          map((filteredPodcasts) => {
            return filteredPodcasts.slice(0, 10);
          })
        )
      )
    );
  }

  onCardClick(podcast: any): void {
    this.podcastService.setTitle(podcast.title.label);
    this.podcastService.setDescription(podcast.summary.label);
    this.podcastService.setImage(podcast['im:image'][2]?.label);
    this.podcastService.setArtist(podcast['im:artist'].label);
    /* this.router.navigate(['details', podcast.id.attributes['im:id']]); */
  }

  loadMore() {
    this.filteredPodcasts$ = this.podcasts$.pipe(
      switchMap((podcasts) =>
        this.form.valueChanges.pipe(
          startWith(''),
          map((value) => value!.toLowerCase()),
          map((filterValue) =>
            podcasts.filter(
              (podcast) =>
                podcast.title.label.toLowerCase().includes(filterValue) ||
                podcast['im:artist'].label.toLowerCase().includes(filterValue)
            )
          ),
          map((filteredPodcasts) => {
            this.loadMoreVisible = filteredPodcasts.length > this.currentSize;
            return filteredPodcasts.slice(0, this.currentSize);
          })
        )
      )
    );
    this.currentSize += 10;
  }
}
