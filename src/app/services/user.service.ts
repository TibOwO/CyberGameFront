import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = environment.apiURL;
  
  constructor(private http: HttpClient) {}

  getUserInfo(): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/get-user/${localStorage.getItem('username')}`, { headers });
  }

  //sécuriser ce truc pitie
  reinitialiserPointsQuestion(): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.apiUrl}/jeux-email/empty-user-answers/`, {}, { headers });
  }
}
