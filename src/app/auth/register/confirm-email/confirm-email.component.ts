import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit {
  message: string = '';
  isLoading: boolean = true;
  isError: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    // Récupérer le token depuis l'URL
    const token = this.route.snapshot.queryParamMap.get('token');
    if (token) {
      this.http.get<any>(`http://127.0.0.1:8000/confirm-email?token=${token}`)
        .subscribe(
          (response) => {
            this.message = response.detail;
            this.isLoading = false;
          },
          (error) => {
            this.message = error.error.detail || 'Erreur lors de la validation.';
            this.isError = true;
            this.isLoading = false;
          }
        );
    } else {
      this.message = 'Token manquant ou invalide.';
      this.isError = true;
      this.isLoading = false;
    }
  }

  // Méthode pour rediriger l'utilisateur vers le jeu
  goToLogin() {
    this.router.navigate(['/auth/login']);
  }
}

