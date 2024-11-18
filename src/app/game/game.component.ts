import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmailAppComponent } from './email-app/email-app.component';
import { BrowserComponent } from './browser/browser.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [EmailAppComponent, BrowserComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {

  constructor(private router: Router) {}

  navigateToApp(appName: string) {
    // Navigate to the selected application's view (e.g., email, phishing)
    console.log(localStorage.getItem('token'));
    this.router.navigate([`/game/${appName}`]);
  }
}
