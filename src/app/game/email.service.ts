import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Email {
  id: number;
  sender: string;
  object: string; // Correspond au sujet de l'email
  content: string;
  date: string;
  attachments: Array<{ url: string; name: string }>;
}

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private apiUrl = 'http://127.0.0.1:8000/jeux-email/';

  constructor(private http: HttpClient) {}

  // Récupérer la liste des emails depuis l'API
  getEmails(): Observable<Email[]> {
    return this.http.get<Email[]>(this.apiUrl);
  }

  // Récupérer un email par son ID (si besoin dans d'autres fonctionnalités)
  getEmailById(emailId: number): Observable<Email> {
    return this.http.get<Email>(`${this.apiUrl}${emailId}/`);
  }
}
