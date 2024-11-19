import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service'; // Import du UserService

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  userInfo: any = null; // Pour stocker les infos utilisateur
  loading: boolean = true; // Indicateur de chargement
  errorMessage: string = ''; // Message d'erreur

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.fetchUserInfo();
  }

  fetchUserInfo() {
    this.userService.getUserInfo().subscribe(
      (data) => {
        this.userInfo = data; // Stockez les infos utilisateur
        this.loading = false;
      },
      (error) => {
        console.error('Erreur lors de la récupération des infos utilisateur', error);
        this.errorMessage = 'Impossible de récupérer les informations utilisateur.';
        this.loading = false;
      }
    );
  }

  navigateToApp(appName: string) {
    this.router.navigate([`/game/${appName}`]);
  }
}
