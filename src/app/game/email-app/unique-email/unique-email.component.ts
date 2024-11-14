import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmailService, Email } from '../../email.service';
import { Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-unique-email',
  standalone: true,
  templateUrl: './unique-email.component.html',
  styleUrls: ['./unique-email.component.css'],
  imports: [DatePipe, CommonModule]
})
export class UniqueEmailComponent {
  email?: Email;

  constructor(
    private emailService: EmailService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const emailId = this.route.snapshot.paramMap.get('emailId');
    
    console.log(emailId);
    if (emailId) {
      this.emailService.getEmailById(parseInt(emailId)).subscribe((email) => {
        this.email = email;
      });
    }
  }

  returnToInbox() {
    this.router.navigate(['/game/email-app']);
  }
}
