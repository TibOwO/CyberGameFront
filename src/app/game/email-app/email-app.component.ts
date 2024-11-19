import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Email } from '../email.service';
import { EmailService } from '../email.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-email-app',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './email-app.component.html',
  styleUrl: './email-app.component.css'
})
export class EmailAppComponent implements OnInit {
  emails: Email[] = [];

  constructor(private router: Router, private emailService: EmailService) {}

  ngOnInit(): void {
    // Récupérer les emails au chargement du composant
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
