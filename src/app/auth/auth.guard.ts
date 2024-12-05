import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, GuardResult } from '@angular/router';
import { AuthService } from './services/auth.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<GuardResult> {
    // On utilise 'firstValueFrom' pour récupérer la valeur de l'Observable
    const isAuthenticated = await firstValueFrom(this.authService.isAuthenticated());

    if (isAuthenticated) {
      return true; // Utilisateur authentifié, accès autorisé
    }

    // Utilisateur non authentifié, redirection vers la page de connexion
    this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
    // On retire les tokens de l'utilisateur
    this.authService.clearTokens();
    return false; // Accès refusé
  }
}
