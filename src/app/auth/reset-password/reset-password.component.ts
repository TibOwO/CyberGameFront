import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.resetPasswordForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  passwordsMatchValidator(control: AbstractControl): { [key: string]: any } | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  onSubmit() {
    if (this.resetPasswordForm.valid) {
      const { email, password } = this.resetPasswordForm.value;
      //console.log(this.resetPasswordForm.value);
      console.log('Réinitialisation du mot de passe pour:', email, "password:", password);
      this.authService.resetPassword(email, password).subscribe(
        (response) => {
          alert('Mot de passe réinitialisé avec succès.');
          this.router.navigate(['/auth/login']);
        },
        (error) => {
          console.log('Erreur lors de la réinitialisation du mot de passe', error);
          alert('Impossible de réinitialiser le mot de passe.',);
        }
      );
    } else {
      this.resetPasswordForm.markAllAsTouched();
    }
  }
}
