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
        title: 'Paire de sneakers personnalisées',
        link: 'http://www.sneakers-zone.com/paire?v=447621',
        snippet: 'Paire de sneakers personnalisées pour les fans de One Piece',
      },
      {
        id: 3,
        title: 'Une rencontre chanceuse',
        link: 'https://www.blog-poeme.com/poeme?v=rencontre-chanceuse15464HUUILV24.pdf',
        snippet: 'poème sur une rencontre chanceuse signée d`un y',
      },
      
      { id: 4, 
        title: 'Connexion à votre compte google', 
        link: 'https://www.googgle.com/?login', 
        snippet: 'Google Account',
      },
      { id: 5,
        title: 'Chat mignon',
        link: 'https://www.chat-mignon.com',
        snippet: 'La référence sur les chats mignons',
      }
        
    
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

