import { Component } from '@angular/core';
import zxcvbn from 'zxcvbn';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-password-checker',
  templateUrl: './password-checker.component.html',
  styleUrls: ['./password-checker.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],

})
export class PasswordCheckerComponent {
  password: string = '';
  passwordStrength: string = '';
  score: number = 0;
  feedback: string = '';

  checkPasswordStrength() {
    const result = zxcvbn(this.password);
    this.score = result.score;
    this.passwordStrength = this.getStrengthLabel(result.score);
    this.feedback = result.feedback.suggestions.join(' ');
  }

  getStrengthLabel(score: number): string {
    switch (score) {
      case 0: return 'Très Faible';
      case 1: return 'Faible';
      case 2: return 'Ok';
      case 3: return 'Fort';
      case 4: return 'Très Fort';
      default: return 'Bizarre';
    }
  }
}
