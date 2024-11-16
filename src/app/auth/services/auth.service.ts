import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  apiURL = 'http://127.0.0.1:8000';
  //call to register
  register(userData: { username: string, email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiURL}/register/`, userData); // Slash final
  }
  

  // Simulating login API call
  login(credentials: { username_or_email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiURL}/login/`, credentials).pipe(
      tap((response: any) => {
        if (response.token) {
          // Enregistrer le token dans le Local Storage
          localStorage.setItem('token', response.token);
        }
      })
    );
  }  

  renvoyerMail(email: string): Observable<any> {
    return this.http.post(`${this.apiURL}/renvoyerMail`, { email });
  }

  isAuthenticated(): boolean {
    return true;
    //return !!localStorage.getItem('token');
  }
}
