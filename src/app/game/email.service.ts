import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Email {
  id: number;
  sender: string;
  subject: string;
  content: string;
  date: string;
  attachments: Array<{ filename: string; size: string; type: string }>;
  read: boolean;
  important: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  // Simuler une liste d'emails détaillés
  private emails: Email[] = [
    {
      id: 1,
      sender: 'john.doe@example.com',
      subject: 'Welcome to Cybersecurity ',
      content: 'This is a welcome email.',
      date: '2024-11-14T10:30:00',
      attachments: [{ filename: 'welcome.pdf', size: '2MB', type: 'application/pdf' }],
      read: false,
      important: true
    },
    {
      id: 2,
      sender: 'phishing@example.com',
      subject: 'Urgent: Your account is at risk!',
      content: 'Please click the link to secure your account.',
      date: '2024-11-13T15:20:00',
      attachments: [],
      read: true,
      important: false
    }
    // Ajouter plus d'emails pour le test
  ];

  constructor() { }

  // Récupérer la liste de tous les emails
  getEmails(): Observable<Email[]> {
    return of(this.emails);
  }

  // Récupérer un email par son ID
  getEmailById(emailId: number): Observable<Email | undefined> {
    const email = this.emails.find(email => email.id === emailId);
    if (!email) {
      console.error(`Email with ID ${emailId} not found`);
    } else {
      console.log(email);
    }
    console.log(email);
    return of(email);
  }
}
