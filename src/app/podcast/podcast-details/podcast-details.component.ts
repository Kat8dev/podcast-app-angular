import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectDetails,
  selectDetailsError,
  selectDetailsLoading,
} from '../podcast-store/podcast.selectors';
import { loadDetails } from '../podcast-store/podcast.actions';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { PodcastService } from '../podcast.service';
import { Observable, filter } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface TableElement {
  trackName: string;
  releaseDate: string;
  duration: string;
  trackId: number;
}

@Component({
  selector: 'app-podcast-details',
  templateUrl: './podcast-details.component.html',
  styleUrls: ['./podcast-details.component.scss'],
})
export class PodcastDetailsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['Title', 'Date', 'Duration'];
  dataSource: MatTableDataSource<TableElement> =
    new MatTableDataSource<TableElement>();
  podcastId!: number;
  episodeNumber!: number;
  title$: Observable<string> = this.podcastService.currentTitle;
  description$: Observable<string> = this.podcastService.currentDescription;
  image$: Observable<string> = this.podcastService.currentImage;
  artist$: Observable<string> = this.podcastService.currentArtist;
  loading$ = this.store.select(selectDetailsLoading);
  error$ = this.store.select(selectDetailsError);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private podcastService: PodcastService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.podcastId = +params['id'];
      this.store.dispatch(loadDetails({ podcastId: this.podcastId }));
    });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateChildRouteStatus();
    });

    this.store.select(selectDetails).subscribe((details) => {
      // Exclude the element at index 0
      const filteredDetails = details.slice(1);
      this.episodeNumber = filteredDetails.length;
      this.dataSource.data = filteredDetails.map((detail: any) => ({
        trackName: detail.trackName,
        releaseDate: this.formatDate(detail.releaseDate),
        duration: this.formatTime(detail.trackTimeMillis),
        trackId: detail.trackId,
      }));
      this.dataSource.paginator = this.paginator;
    });
  }

  isChildRouteActive(): boolean {
    return this.route.firstChild?.routeConfig?.path === 'episodes/:episodeId';
  }

  private updateChildRouteStatus(): void {
    this.isChildRouteActive();
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  formatTime(timeMillis: number): string {
    const hours = Math.floor(timeMillis / 3600000);
    const minutes = Math.floor((timeMillis % 3600000) / 60000);
    return `${hours}:${minutes}`;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
