import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'browser',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './browser.component.html',
  styleUrl: './browser.component.css'
})



export class BrowserComponent{
  currentUrl: string = ''; // URL actuelle
  history: string[] = []; // Historique des URLs
  currentIndex: number = -1; // Index de l'URL courante dans l'historique

  constructor(private router: Router  ) {}


  reload(): void {
    // Recharge simplement l'URL actuelle
    if (this.currentIndex >= 0) {
      this.currentUrl = this.history[this.currentIndex];
    }
  }

  goBack(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.currentUrl = this.history[this.currentIndex];
    }
  }

  goForward(): void {
    if (this.currentIndex < this.history.length - 1) {
      this.currentIndex++;
      this.currentUrl = this.history[this.currentIndex];
    }
  }

  private updateHistory(url: string): void {
    // Met à jour l'historique de navigation
    this.history = this.history.slice(0, this.currentIndex + 1);
    this.history.push(url);
    this.currentIndex = this.history.length - 1;
  }
}
