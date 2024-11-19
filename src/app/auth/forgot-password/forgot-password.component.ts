import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms'; // Import de FormsModule
import { CommonModule } from '@angular/common'; // CommonModule

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule], // Ajout de FormsModule ici
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.successMessage = '';
    this.errorMessage = '';

    this.authService.forgotPassword(this.email).subscribe(
      (response) => {
        this.successMessage =
          'Un e-mail de réinitialisation a été envoyé à votre adresse.';
      },
      (error) => {
        console.error('Erreur lors de la demande de réinitialisation', error);
        this.errorMessage =
          'Impossible d\'envoyer l\'e-mail. Vérifiez votre adresse et réessayez.';
      }
    );
  }
}
