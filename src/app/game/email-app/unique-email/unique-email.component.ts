import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailService, Email } from '../../email.service';
import { CommonModule, DatePipe } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr'; // Importation de ToastrService
import { UniqueEmailModuleModule } from './unique-email-module/unique-email-module.module'; // Importez le module UniqueEmailModuleModule

@Component({
  selector: 'app-unique-email',
  standalone: true,
  templateUrl: './unique-email.component.html',
  styleUrls: ['./unique-email.component.css'],
  providers: [DatePipe, CommonModule, ToastrService], // Ajoutez le module UniqueEmailModuleModule
  imports: [UniqueEmailModuleModule],
})
export class UniqueEmailComponent implements OnInit {
  email?: Email;

  constructor(
    private emailService: EmailService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private toastr: ToastrService, // Injection de ToastrService

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
          this.ShowInfo("Vous avez déjà répondu à cet email.");
        } else if (response.message === 'Bonne réponse !') {
          this.ShowSuccess("Bravo ! Vous avez évité le phishing et gagné 10 points.");
        } else if (response.message === 'Mauvaise réponse !') {
          this.ShowError("Dommage ! Vous avez cliqué sur un lien de phishing et perdu 5 points.");
        } else {
          this.ShowError("Erreur inconnue lors de la vérification de la réponse.");
        }
      },

      error: (error) => {
        this.ShowError("Erreur inconnue lors de la vérification de la réponse.");
        console.error('Erreur lors de la vérification de la réponse :', error);
      },
    });
  }

  // Créez une méthode pour "sanitiser" le contenu HTML
  getSanitizedContent(content: string) {
    // Nettoyer l'URL en supprimant les guillemets encodés (%22)
    const cleanedContent = content.replace(/%22/g, ''); // Remplacer les guillemets encodés
    return this.sanitizer.bypassSecurityTrustHtml(cleanedContent);
  }

  // Créez une méthode pour afficher un message de succès
  ShowSuccess(message: string) {
    this.toastr.success(message);
  }

  // Créez une méthode pour afficher un message d'erreur
  ShowError(message: string) {
    this.toastr.error(message);
  }

  // Créez une méthode pour afficher un message d'information
  ShowInfo(message: string) {
    this.toastr.info(message, 'Information');
  }
  
}
