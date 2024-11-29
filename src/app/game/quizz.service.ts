import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private baseUrl = 'http://127.0.0.1:8000/quizz'; // Remplacez par l'URL de votre backend

  constructor(private http: HttpClient) {}

  getQuestions() {
    return this.http.get(`${this.baseUrl}/questions/`);
  }

  submitAnswer(questionId: number, answer: string) {
    return this.http.post(`${this.baseUrl}/submit/`, { question_id: questionId, answer });
  }
}
