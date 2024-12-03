import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  apiURL = 'http://127.0.0.1:8000';

  // Login API call
  login(credentials: { username_or_email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiURL}/login/`, credentials).pipe(
      tap((response: any) => {
        // Stockage des tokens dans le localStorage
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('refresh_token', response.refresh_token);

        console.log('Access Token:', response.access_token);
        console.log('Refresh Token:', response.refresh_token);
      })
    );
  }

  

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiURL}/register/`, data);
  }

  // Refresh the access token using the refresh token
  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
      return this.http.post(`${this.apiURL}/token/refresh/`, { refresh: refreshToken }, { withCredentials: true }).pipe(
        tap((response: any) => {
          if (response.access) {
            localStorage.setItem('access_token', response.access);
          }
          else {
            console.error('No access token received');
          }
        })
      );
    }
    return of(null); // Return an empty observable if no refresh token is found
  }
  

  // Vérifier si l'utilisateur est authentifié avec les cookies
  isAuthenticated(): Observable<boolean> {
    const token = localStorage.getItem('access_token');
    console.log('Token :', token);
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);
        return of(decoded.exp > currentTime);
      } catch (error) {
        console.error('Erreur lors de la validation du token :', error);
        return of(false);
      }
    }
    return this.verifyAuthStatus(); // Appel serveur pour vérifier l'authentification
  }

  // Vérifier l'état de l'authentification côté serveur
  verifyAuthStatus(): Observable<boolean> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Ajout de l'en-tête Authorization

    return this.http.post(`${this.apiURL}/api/validate-token/`, {}, { headers, withCredentials: true }).pipe(
      tap((response: any) => {
        if (response.authenticated) {
          return true;
        }
        return false;
      })
    );
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiURL}/forgot-password/`, { email });
  }

  resetPassword(uidb64: string, token: string, password: string): Observable<any> {
    return this.http.post(`${this.apiURL}/reset-password/`, { uidb64, token, new_password: password });
  }

  // Effacer les tokens des cookies
  clearTokens(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
}
