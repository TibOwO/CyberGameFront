import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmailAppComponent } from './email-app/email-app.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [EmailAppComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {

  constructor(private router: Router) {}

  navigateToApp(appName: string) {
    // Navigate to the selected application's view (e.g., email, phishing)
    this.router.navigate([`/game/${appName}`]);
  }
}
