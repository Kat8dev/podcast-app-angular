import { PodcastService } from '../podcast.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-details-card',
  templateUrl: './details-card.component.html',
  styleUrls: ['./details-card.component.scss'],
})
export class DetailsCardComponent implements OnInit {

  title$: Observable<string> = this.podcastService.currentTitle;
  description$: Observable<string> = this.podcastService.currentDescription;
  image$: Observable<string> = this.podcastService.currentImage;
  artist$: Observable<string> = this.podcastService.currentArtist;

  constructor(
    private podcastService: PodcastService,
  ) {}

  ngOnInit() {

  }

}
