import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  // Simulating registration API call
  register(userData: { username: string, email: string, password: string }): Observable<any> {
    console.log('Registering user:', userData);
    // Simulate successful registration response after 1 second
    return of({ success: true });
  }

  // Simulating login API call
  login(credentials: { username_or_email: string, password: string }): Observable<any> {
    console.log('Logging in user:', credentials);
    // Simulate successful login response after 1 second
    return of({ success: true });
  }

  renvoyerMail(email: string): Observable<any> {
    console.log('Resending verification email to:', email);
    // Simulate email resend and return a successful response after 1 second
    return of({ success: true });
  }

  isAuthenticated(): boolean {
    return true;
    //    return !!localStorage.getItem('auth-token');  // Example check
  }
}
