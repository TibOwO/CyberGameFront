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
  goHome() {
    this.router.navigate(['/']);
  }

  // Appel au service AuthService pour renvoyer le code de vérification
  renvoyerMail() {
    return true;
  }

  goBack() {
    this.router.navigate(['/register']);
  }
  
}


