import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Page {
  id: number;
  title: string;
  link: string;
  snippet: string;
}

@Injectable({
  providedIn: 'root',
})
export class BrowserService {
  private pages: Page[] = [
    {
        id: 1,
        title: 'Introduction au jeu',
        link: 'http://intro.com/introduction-au-jeu',
        snippet: 'Introduction au jeu du navigateur',
      },
      {
        id: 2,
        title: 'Page normale',
        link: 'http://example.com/exemple',
        snippet: 'Site 2 normal',
      },
      {
        id: 3,
        title: 'Defung URL',
        link: 'http://example.com/exemple',
        snippet: 'Site 3 defung url',
      },
    
  ];

  constructor() {}

  getPages(): Observable<Page[]> {
    return of(this.pages);
  }

  getPageById(browserId: number): Observable<Page | undefined> {
    const page = this.pages.find((p) => p.id === browserId);
    if (!page) {
        console.error(`Email with ID ${browserId} not found`);
      } else {
        console.log(page);
      }
      console.log(page);
      return of(page);
    }
  
}

