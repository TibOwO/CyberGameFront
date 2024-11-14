import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';  // Ensure FormsModule is imported
import { AuthService } from '../services/auth.service';  // Import the AuthService

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username_or_email: string = '';
  password: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit() {
    const credentials = {
      username_or_email: this.username_or_email,
      password: this.password
    };

    // Call the login method from the AuthService
    this.authService.login(credentials).subscribe(
      (response) => {
        console.log('User logged in successfully', response);
        // Navigate to the /game page after successful login
        this.router.navigate(['/game']);
      },
      (error) => {
        console.error('Login failed', error);
        // Handle login failure (e.g., show error message)
      }
    );
  }

  navigateToRegister() {
    this.router.navigate(['/auth/register']);
  }
}
