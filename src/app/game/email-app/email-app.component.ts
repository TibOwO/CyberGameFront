import { Component, OnInit } from '@angular/core';
import { Email, EmailService } from '../email.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-email-app',
  templateUrl: './email-app.component.html',
  styleUrls: ['./email-app.component.css'],
  imports: [CommonModule],
})
export class EmailAppComponent implements OnInit {
  emails: Email[] = [];

  constructor(private emailService: EmailService, private router: Router) {}

  ngOnInit(): void {
    // Charger les emails au démarrage
    this.emailService.getEmails().subscribe((emails: Email[]) => {
      this.emails = emails;
    });
  }

  openEmail(emailId: number) {
    this.router.navigate([`/game/email/${emailId}`]);
  }

  returnToDesk() {
    this.router.navigate([`/game`]);
  }
}
