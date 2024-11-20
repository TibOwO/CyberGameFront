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
        title: 'Introduction au jeu du navigateur',
        link: 'https://intro.com/introduction-au-jeu',
        snippet: 'Introduction au jeu du navigateur et explication des règles',
      },
      {
        id: 2,
        title: 'Une rencontre chanceuse',
        link: 'https://www.blog-poeme.com/poeme-rencontre-chanceuse.pdf',
        snippet: 'poème sur une rencontre chanceuse signée d`un y',
      },
      {
        id: 3,
        title: 'Defung URL',
        link: 'https://example.com/exemple',
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

