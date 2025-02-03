import { Component } from '@angular/core';
import zxcvbn from 'zxcvbn';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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
  crackTime: string = '';
  
  constructor(private router: Router) {}

  checkPasswordStrength() {
    const result = zxcvbn(this.password);
    this.score = result.score;
    this.passwordStrength = this.getStrengthLabel(result.score);
  
    // Assurez-vous que crackTime est toujours une chaîne
    const crackTimeEstimate = result.crack_times_display.offline_slow_hashing_1e4_per_second;
    this.crackTime = typeof crackTimeEstimate === 'string' ? crackTimeEstimate : crackTimeEstimate.toString();
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
  returnToDesk() {
    this.router.navigate([`/game`]);
  }
}
