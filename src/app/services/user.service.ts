import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root', // Fournit le service à l'échelle de l'application
})
export class UserService {
  apiUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  // Méthode pour récupérer les informations utilisateur
  getUserInfo(): Observable<any> {
    const token = localStorage.getItem('token'); // Récupérer le JWT
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Ajouter l'en-tête

    return this.http.get<any>(`${this.apiUrl}/get-user/${localStorage.getItem('username')}`, { headers });
  }
}
