import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuizzService {
  private apiUrl = environment.apiURL;

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
