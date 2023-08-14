import { Component } from '@angular/core';

export interface PeriodicElement {
  date: string;
  title: number;
  duration: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {title: 1, date: 'Hydrogen', duration: 1.0079},
  {title: 2, date: 'Helium', duration: 4.0026},
  {title: 3, date: 'Lithium', duration: 6.941},
  {title: 4, date: 'Beryllium', duration: 9.0122},
  {title: 5, date: 'Boron', duration: 10.811},
  {title: 6, date: 'Carbon', duration: 12.0107},
  {title: 7, date: 'Nitrogen', duration: 14.0067},
  {title: 8, date: 'Oxygen', duration: 15.9994},
  {title: 9, date: 'Fluorine', duration: 18.9984},
  {title: 10, date: 'Neon', duration: 20.1797},
];

@Component({
  selector: 'app-podcast-details',
  templateUrl: './podcast-details.component.html',
  styleUrls: ['./podcast-details.component.scss']
})
export class PodcastDetailsComponent {
  displayedColumns: string[] = ['Title', 'Date', 'Duration'];
  dataSource = ELEMENT_DATA;
}
