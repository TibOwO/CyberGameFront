import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Email {
  id: number;
  sender: string;
  object: string; // Subject of the email
  content: string;
  date: string;
  attachments: Array<{ url: string; name: string }>;
}

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private apiUrl = environment.apiURL + '/jeux-email/';

  constructor(private http: HttpClient) {}

  // Get the list of emails from the API
  getEmails(): Observable<Email[]> {
    return this.http.get<Email[]>(this.apiUrl);
  }

  // Get a single email by its ID
  getEmailById(emailId: number): Observable<Email> {
    return this.http.get<Email>(`${this.apiUrl}${emailId}/`);
  }

  // Verify user response and add points
  verifyResponse(emailId: number, username: string, userResponse: boolean): Observable<{ message: string; success: boolean; answer: boolean }> {
    const token = localStorage.getItem('access_token'); 
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
  
    return this.http.post<{ message: string; success: boolean; answer: boolean }>(
      `${this.apiUrl}verify-email/`,
      { emailId, isFishing: userResponse, username },
      { headers }
    );
  }
  
}
