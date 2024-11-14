import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Email {
  id: number;
  sender: string;
  subject: string;
  content: string;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor() { }

  // Simuler quelques emails
  private emails: Email[] = [
    { id: 1, sender: 'john.doe@example.com', subject: 'Welcome to Cybersecurity Game', content: 'This is a welcome email.', date: '2024-11-14' },
    { id: 2, sender: 'phishing@example.com', subject: 'Urgent: Your account is at risk!', content: 'Please click the link to secure your account.', date: '2024-11-13' },
    { id: 3, sender: 'security@example.com', subject: 'Security Tips', content: 'Here are some tips to keep your account safe.', date: '2024-11-12' },
  ];

  // Récupérer la liste des emails
  getEmails(): Observable<Email[]> {
    return of(this.emails);
  }
}
