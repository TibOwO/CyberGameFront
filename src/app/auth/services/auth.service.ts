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
}
