/* import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectDetails } from '../podcast-store/podcast.selectors';
import { loadDetails } from '../podcast-store/podcast.actions';
import { ActivatedRoute } from '@angular/router';
import { PodcastService } from '../podcast.service';
import { Observable, map, switchMap } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';

export interface TableElement {
  trackName: string;
  releaseDate: string;
  duration: string;
  allData: []
}

@Component({
  selector: 'app-podcast-details',
  templateUrl: './podcast-details.component.html',
  styleUrls: ['./podcast-details.component.scss'],
})
export class PodcastDetailsComponent implements OnInit {
  displayedColumns: string[] = ['Title', 'Date', 'Duration'];
  dataSource!: Observable<TableElement[]>;
  title$: Observable<string> = this.podcastService.currentTitle;
  description$: Observable<string> = this.podcastService.currentDescription;
  image$: Observable<string> = this.podcastService.currentImage;
  artist$: Observable<string> = this.podcastService.currentArtist;
  details$: Observable<any> = this.store.select(selectDetails);
  podcastId!: number;
  episodeNumber!: number;
  tableDetails$: Observable<TableElement[]> = this.route.params.pipe(
    switchMap((params) => {
      this.podcastId = +params['id'];
      return this.store.select(selectDetails);
    }),
    map((details: any) => {
      this.episodeNumber = details.length
      return (this.dataSource = details.map((detail: any) => ({
        trackName: detail.trackName,
        releaseDate: this.formatDate(detail.releaseDate),
        duration: this.formatTime(detail.trackTimeMillis),
        allData: detail
      })));
    })
  );

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private podcastService: PodcastService,
  ) {}

  ngOnInit() {
    this.tableDetails$.subscribe((item) => console.log(item));
    this.store.dispatch(loadDetails({ podcastId: this.podcastId }));
  }

  ngAfterViewInit() {
    this.dataSource. = this.paginator;
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
}
 */
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectDetails } from '../podcast-store/podcast.selectors';
import { loadDetails } from '../podcast-store/podcast.actions';
import { ActivatedRoute } from '@angular/router';
import { PodcastService } from '../podcast.service';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface TableElement {
  trackName: string;
  releaseDate: string;
  duration: string;
  allData: any; // TODO: find out which one is the url for listen music
}

@Component({
  selector: 'app-podcast-details',
  templateUrl: './podcast-details.component.html',
  styleUrls: ['./podcast-details.component.scss'],
})
export class PodcastDetailsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['Title', 'Date', 'Duration'];
  dataSource: MatTableDataSource<TableElement> = new MatTableDataSource<TableElement>();
  podcastId!: number;
  episodeNumber!: number;
  title$: Observable<string> = this.podcastService.currentTitle;
  description$: Observable<string> = this.podcastService.currentDescription;
  image$: Observable<string> = this.podcastService.currentImage;
  artist$: Observable<string> = this.podcastService.currentArtist;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private podcastService: PodcastService,
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.podcastId = +params['id'];
      this.store.dispatch(loadDetails({ podcastId: this.podcastId }));
    });

    this.store.select(selectDetails).subscribe(details => {
      console.log(details)
      this.episodeNumber = details.length;
      this.dataSource.data = details.map((detail: any) => ({
        trackName: detail.trackName,
        releaseDate: this.formatDate(detail.releaseDate),
        duration: this.formatTime(detail.trackTimeMillis),
        allData: detail
      }));
      this.dataSource.paginator = this.paginator;
    });
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
