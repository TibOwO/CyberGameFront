import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.isAuthenticated()) {
      return true; // Accès autorisé
    } else {
      localStorage.removeItem('token'); // Supprimez les tokens invalides
      localStorage.removeItem('refresh_token'); // Supprimez également le refresh token
      this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } }); // Redirection
      return false; // Accès refusé
    }
  }
}
  