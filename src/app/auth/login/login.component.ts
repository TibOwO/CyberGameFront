import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';  // Assurez-vous que FormsModule est importé
import { CommonModule } from '@angular/common';  // Import de CommonModule
import { AuthService } from '../services/auth.service';  // Import du AuthService
import { ToastrService } from 'ngx-toastr';  // Import de ToastrService
import { AuthModule } from '../auth.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, AuthModule],  // Ajoutez CommonModule ici
  providers: [ToastrService],  // Ajoutez ToastrService ici
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username_or_email: string = '';
  password: string = '';
  errorMessage: string = '';  // Variable pour stocker le message d'erreur
    // Injection de ToastrService

  constructor(private router: Router, private authService: AuthService, private toastr: ToastrService) {}


  ngOnInit() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    console.log('Tokens removed in login component');
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
        this.router.navigate(['/game']);  // Redirige vers la page du jeu après une connexion réussie
        this.showSuccess('Connexion réussie');
      },
      (error) => {
        this.errorMessage = error.error.message;
        this.showError(this.errorMessage);

        // Gestion des erreurs
        if (error.status === 401) {
          this.errorMessage = 'Nom d\'utilisateur ou mot de passe incorrect.';
          this.showError(this.errorMessage);
        } else if (error.status === 0) {
          this.errorMessage = 'Impossible de se connecter au serveur. Vérifiez votre connexion internet.';
          this.showError(this.errorMessage);
        } else {
          this.errorMessage = 'Une erreur inconnue est survenue. Veuillez réessayer.';
          this.showError(this.errorMessage);
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

  // Fonction pour afficher la notification de succès
  showSuccess(message: string): void {
    this.toastr.success(message, 'Succès', { timeOut: 3000 });
  }

  // Fonction pour afficher la notification d'erreur
  showError(message: string): void {
    this.toastr.error(message, 'Erreur', { timeOut: 3000 });
  }

}
