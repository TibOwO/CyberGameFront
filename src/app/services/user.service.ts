import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  getUserInfo(): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log(localStorage.getItem('username'));
    return this.http.get<any>(`${this.apiUrl}/get-user/${localStorage.getItem('username')}`, { headers });
  }
}
