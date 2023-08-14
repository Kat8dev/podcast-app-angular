import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PodcastService {

  private title = new BehaviorSubject<string>('');
  private description = new BehaviorSubject<string>('');
  private image = new BehaviorSubject<string>('');
  private artist = new BehaviorSubject<string>('');
  private isNavigation = new BehaviorSubject<boolean>(false);

  currentTitle = this.title.asObservable();
  currentDescription = this.description.asObservable();
  currentImage = this.image.asObservable();
  currentArtist = this.artist.asObservable();
  currentNavigation = this.isNavigation.asObservable();

  constructor(private http: HttpClient) {}

  setTitle(title: string) {
    this.title.next(title);
  }

  setDescription(description: string) {
    this.description.next(description);
  }

  setImage(description: string) {
    this.image.next(description);
  }

  setArtist(artist: string) {
    this.artist.next(artist);
  }

  setIsNavigation(value: boolean) {
    this.isNavigation.next(value);
  }

  getPodcasts(apiUrl: string): Observable<any> {
    return this.http.get(apiUrl);
  }

  getPodcastDetails(apiUrl: string, podcastId: string): Observable<any> {
    return this.http.get(`${apiUrl}/${podcastId}`);
  }

  getEpisodeDetails(apiUrl: string, episodeId: string): Observable<any> {
    return this.http.get(`${apiUrl}/episodes/${episodeId}`);
  }
}
