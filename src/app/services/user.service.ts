import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // Fournit le service à l'échelle de l'application
})
export class UserService {
  apiUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  // Méthode pour récupérer les informations utilisateur
  getUserInfo(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/${localStorage.getItem('username')}/`);
  }
}
