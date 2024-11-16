import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';  // Import the AuthService

@Component({
  selector: 'app-verif-mail',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './verif-mail.component.html',
  styleUrls: ['./verif-mail.component.css']
})
export class VerifMailComponent {
  codeVerification: string = '';
  messageErreur: string = '';
  email: string = '';  // L'email pour renvoyer le code

  constructor(private router: Router, private authService: AuthService) {
    // L'email doit être récupéré depuis une autre partie de l'application (ex: localStorage)
    this.email = localStorage.getItem('email') || ''; // Exemple de récupération d'email
  }

  // Cette méthode permet de vérifier le code de vérification
  goToGame() {
    this.router.navigate(['/game']);
  }

  // Appel au service AuthService pour renvoyer le code de vérification
  renvoyerMail() {
    // Appel à la méthode du service pour renvoyer le code
    this.authService.renvoyerMail(this.email).subscribe(
      (response) => {
        console.log(response.message);  // Affiche un message de succès dans la console
        this.messageErreur = '';  // Clear error message if successful
      },
      (error) => {
        console.error('Erreur lors du renvoi du mail:', error);
        this.messageErreur = 'Une erreur est survenue lors du renvoi du code.';  // Message d'erreur en cas d'échec
      }
    );
  }

  goBack() {
    this.router.navigate(['/register']);
  }
  
}


