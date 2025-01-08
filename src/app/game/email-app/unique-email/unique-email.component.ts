import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailService, Email } from '../../email.service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-unique-email',
  standalone: true,
  templateUrl: './unique-email.component.html',
  styleUrls: ['./unique-email.component.css'],
  imports: [DatePipe, CommonModule],
})
export class UniqueEmailComponent implements OnInit {
  email?: Email;

  constructor(
    private emailService: EmailService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const emailId = this.route.snapshot.paramMap.get('emailId');
    if (emailId) {
      this.emailService.getEmailById(parseInt(emailId, 10)).subscribe((email) => {
        this.email = email;
      });
    }
  }

  returnToInbox() {
    this.router.navigate(['/game/email-app']);
  }

  isFishing(userResponse: boolean) {
    const emailId = this.email?.id;
    const username = localStorage.getItem('username') || 'NoUsername';

    if (!emailId) {
      alert('Impossible de soumettre la réponse : ID email invalide.');
      return;
    }

    this.emailService.verifyResponse(emailId, username, userResponse).subscribe({
      
      next: (response) => {
        if (response.message === 'Vous avez déjà répondu à cet email.') {
          alert('Vous avez déjà répondu à cette question.');
        } else if (response.message === 'Bonne réponse !') {
          alert('Bravo ! Vous avez évité le phishing. Vous avez gagné 10 points.');
        } else if (response.message === 'Mauvaise réponse !') {
          alert('Dommage ! Vous avez été victime de phishing. Vous avez perdu 5 points.');
        } else {
          alert('Erreur : erreur inconnue.');
        }
      },

      error: (error) => {
        alert('Erreur lors de la vérification de la réponse.');
        console.error('Erreur lors de la vérification de la réponse :', error);
      },
    });
  }
}