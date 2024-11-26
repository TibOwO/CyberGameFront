import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmailService, Email } from '../../email.service';
import { Router } from '@angular/router';
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
  ) { }

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
    const emailId = this.email?.id || 0; // Valeur par défaut si this.email?.id est undefined
    const username = localStorage.getItem('username') || 'NoUsername';

    // Appeler le service pour vérifier et ajouter des points
    this.emailService.addPoints(emailId, userResponse, username).subscribe(
      (response: any) => {
        // Vérifie si la réponse indique un succès
        if (response && response.status === 200 && response.success) {
          alert('Bonne réponse ! Vous avez gagné un point.');
        } else {
          alert('Mauvaise réponse. Essayez encore !');
        }
      },
      (error) => {
        // En cas d'erreur lors de l'appel API
        console.error('Erreur lors de l\'ajout de points:', error);
        alert('Une erreur est survenue, veuillez réessayer.');
      }
    );
  }
}