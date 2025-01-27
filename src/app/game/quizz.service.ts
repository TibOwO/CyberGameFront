import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuizzService {
  private apiUrl = 'https://apidjangoseriousgame-k333.onrender.com';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getQuestions(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/quiz/questions/`, {
      headers: this.getHeaders(),
    });
  }

  submitAnswers(payload: { questionId: number; answerId: number }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/quiz/submit/`, payload, {
      headers: this.getHeaders(),
    });
  }
}
