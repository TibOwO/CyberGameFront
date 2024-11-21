import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  apiURL = 'http://127.0.0.1:8000';

  // Call to register
  register(userData: { username: string, email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiURL}/register/`, userData);
  }

  // Login API call
  login(credentials: { username_or_email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiURL}/login/`, credentials).pipe(
      tap((response: any) => {
        if (response.access && response.refresh) {
          // Storing both access and refresh tokens
          localStorage.setItem('token', response.access);
          localStorage.setItem('refresh_token', response.refresh);
        }
      })
    );
  }

  // Refresh the access token using the refresh token
  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
      return this.http.post(`${this.apiURL}/token/refresh/`, { refresh: refreshToken }).pipe(
        tap((response: any) => {
          if (response.access) {
            // Update the access token
            localStorage.setItem('token', response.access);
          }
        })
      );
    }
    return of(null); // Return an empty observable if no refresh token is found
  }

  // Check if the user is authenticated and the token is still valid
  isAuthenticated(): boolean {
   // const token = localStorage.getItem('token');
  //  if (token) {
    //  try {
     //   const decoded: any = jwtDecode(token);
    //    const currentTime = Math.floor(Date.now() / 1000);
    //    return decoded.exp > currentTime; // Checks if the token is expired
   //   } catch (error) {
     //   console.error('Invalid token:', error);
     //   return false;
    //  }
    //}
    return true;
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiURL}/forgot-password/`, { email });
  }
  
  resetPassword(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiURL}/reset-password/`, { email, password});
  }
}

