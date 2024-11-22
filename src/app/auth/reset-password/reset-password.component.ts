import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  email: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Initialisation du formulaire
    this.resetPasswordForm = this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  ngOnInit() {
    // Récupérer automatiquement l'email depuis l'URL
    const emailFromUrl = this.getEmailFromUrl();
    if (emailFromUrl) {
      this.email = emailFromUrl; // Stocker l'email
    }
  }

  getEmailFromUrl(): string {
    return this.route.snapshot.queryParamMap.get('email') || '';
  }

  passwordsMatchValidator(control: AbstractControl): { [key: string]: any } | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  onSubmit() {
    if (this.resetPasswordForm.valid) {
      const { password } = this.resetPasswordForm.value;
      const token = this.getTokenFromUrl();
      const uidb64 = this.getUidFromUrl();

      this.authService.resetPassword(uidb64, token, password).subscribe(
        () => {
          alert('Mot de passe réinitialisé avec succès.');
          this.router.navigate(['/auth/login']);
        },
        (error) => {
          console.error('Erreur lors de la réinitialisation du mot de passe', error);
          alert('Impossible de réinitialiser le mot de passe.');
        }
      );
    } else {
      this.resetPasswordForm.markAllAsTouched();
    }
  }

  getTokenFromUrl(): string {
    return this.route.snapshot.queryParamMap.get('token') || '';
  }

  getUidFromUrl(): string {
    return this.route.snapshot.queryParamMap.get('uidb64') || '';
  }
}
