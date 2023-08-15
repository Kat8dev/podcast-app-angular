import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PodcastService {
  private title = new BehaviorSubject<string>(
    localStorage.getItem('title') || ''
  );
  private description = new BehaviorSubject<string>(
    localStorage.getItem('description') || ''
  );
  private image = new BehaviorSubject<string>(
    localStorage.getItem('image') || ''
  );
  private artist = new BehaviorSubject<string>(
    localStorage.getItem('artist') || ''
  );
  private isNavigation = new BehaviorSubject<boolean>(false);

  currentTitle = this.title.asObservable();
  currentDescription = this.description.asObservable();
  currentImage = this.image.asObservable();
  currentArtist = this.artist.asObservable();
  currentNavigation = this.isNavigation.asObservable();

  constructor(private http: HttpClient) {}

  setTitle(title: string) {
    this.title.next(title);
    localStorage.setItem('title', title);
  }

  setDescription(description: string) {
    this.description.next(description);
    localStorage.setItem('description', description);
  }

  setImage(image: string) {
    this.image.next(image);
    localStorage.setItem('image', image);
  }

  setArtist(artist: string) {
    this.artist.next(artist);
    localStorage.setItem('artist', artist);
  }

  setIsNavigation(value: boolean) {
    this.isNavigation.next(value);
  }

  getPodcasts(apiUrl: string): Observable<object> {
    const url = `https://api.allorigins.win/get?url=${encodeURIComponent(
      apiUrl
    )}`;
    return this.http.get(url);
  }

  getPodcastDetails(apiUrl: string, podcastId: string): Observable<object> {
    const url = `https://api.allorigins.win/get?url=${encodeURIComponent(
      `${apiUrl}/${podcastId}`
    )}`;
    return this.http.get(url);
  }

}
