import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';  // Ensure FormsModule is imported
import { AuthService } from '../services/auth.service';  // Import the AuthService


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  navigateToLogin() {
    this.router.navigate(['/auth/login']);
  }

  onSubmit() {
    const userData = {
      username: this.username,
      email: this.email,
      password: this.password
    };
  
    this.authService.register(userData).subscribe(
      (response) => {
        console.log('Utilisateur enregistré avec succès', response);
        this.router.navigate(['auth/register/verifmail']);
      },
      (error) => {
        console.error('Erreur lors de l’enregistrement', error.error);
        alert('Erreur : ' + JSON.stringify(error.error));
      }
    );
  }  
}
