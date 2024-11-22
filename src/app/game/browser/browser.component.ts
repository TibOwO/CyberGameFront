import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BrowserService, Page } from '../browser.service'; // Assurez-vous d'utiliser la bonne interface
import { CommonModule } from '@angular/common';

@Component({
  selector: 'browser',
  standalone: true,
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.css'],
  imports: [CommonModule],
})
export class BrowserComponent implements OnInit {
  results: Page[] = []; // Renommé en Page[] pour correspondre à l'interface utilisée
  searchQuery: string = 'Jeu du navigateur';
  addressBar: string = 'https://www.web-search.com/search?q=Jeu+du+navigateur+Cybersecurite';

  constructor(private router: Router, private browserService: BrowserService) {}

  ngOnInit(): void {
    // Récupérer les pages depuis le BrowserService
    this.browserService.getPages().subscribe((pages: Page[]) => {
      this.results = pages; // Stocker les résultats dans results
    });
  }

  openPage(pageId: number): void {
    this.router.navigate([`/game/browser/${pageId}`]); // Navigation vers la page spécifique
  }

  returnToDesk(): void {
    this.router.navigate(['/game']); // Navigation vers l'accueil du jeu
  }
}

