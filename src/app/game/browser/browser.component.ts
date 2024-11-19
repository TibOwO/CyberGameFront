import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface SearchResult {
  id: number;
  title: string;
  link: string;
  snippet: string;
}

@Component({
  selector: 'browser',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.css'],
})
export class BrowserComponent implements OnInit {
  results: SearchResult[] = [];
  searchQuery: string = 'Cybersecurite'; // Texte statique de la barre de recherche
  addressBar: string = 'https://www.web-search.com/search?q=Cybersecurite'; // Lien affiché en haut

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Simuler les résultats de recherche
    this.results = [
      {
        id: 1,
        title: 'Introduction au jeu',
        link: 'http://intro.com/introduction-au-jeu',
        snippet:
          'Introduction au jeu du navigateur',
      },
      {
        id: 2,
        title: 'Page normal',
        link: 'http://example.com/exemple',
        snippet:
          'Site 2 normal',
      },
      {
        id: 3,
        title: 'Defung url',
        link: 'http://example.com/exemple',
        snippet:
          'Site 3 defung url',
      },
    ];
  }

  openPage(resultId: number): void {
    // Simuler la navigation vers une page liée au résultat de recherche
    this.router.navigate([`/game/page/${resultId}`]);
  }

  returnToDesk() {
    this.router.navigate([`/game`]);
  }
}