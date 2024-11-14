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
  login(credentials: { username: string, password: string }): Observable<any> {
    console.log('Logging in user:', credentials);
    // Simulate successful login response after 1 second
    return of({ success: true });
}

  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth-token');  // Example check
  }
}
