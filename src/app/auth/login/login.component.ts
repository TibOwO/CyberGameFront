import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';  // Assurez-vous que FormsModule est importé
import { CommonModule } from '@angular/common';  // Import de CommonModule
import { AuthService } from '../services/auth.service';  // Import du AuthService

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],  // Ajoutez CommonModule ici
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username_or_email: string = '';
  password: string = '';
  errorMessage: string = '';  // Variable pour stocker le message d'erreur

  constructor(private router: Router, private authService: AuthService) {}


  ngOnInit() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
  onSubmit() {
    const credentials = {
      username_or_email: this.username_or_email,
      password: this.password
    };

    // Réinitialisation du message d'erreur avant chaque tentative
    this.errorMessage = '';

    // Appel du service de connexion
    this.authService.login(credentials).subscribe(
      (response) => {
        console.log('User logged in successfully', response);
        console.log('reponse', response);
        //log cookie
        this.router.navigate(['/game']);  // Redirige vers la page du jeu après une connexion réussie
      },
      (error) => {
        console.log('Login failed', error);

        // Gestion des erreurs
        if (error.status === 401) {
          this.errorMessage = 'Nom d\'utilisateur ou mot de passe incorrect.';
        } else if (error.status === 0) {
          this.errorMessage = 'Impossible de se connecter au serveur. Vérifiez votre connexion internet.';
        } else {
          this.errorMessage = 'Une erreur inconnue est survenue. Veuillez réessayer.';
        }
      }
    );
  }

  navigateToRegister() {
    this.router.navigate(['/auth/register']);
  }

  navigateToForgotPassword() {
    this.router.navigate(['/auth/forgot-password']);
  }
}
