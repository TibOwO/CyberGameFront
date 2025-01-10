import { Component, OnInit } from '@angular/core';
import { QuizzService } from '../quizz.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class QuizzComponent implements OnInit {
  userInfo: any = null;
  currentQuestion: any = null;
  selectedOption: any = null;
  remainingQuestions: number = 0;
  gamePoints: number = 0;
  loading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private quizzService: QuizzService, private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUserInfo().subscribe(
      (data) => {
        console.log(data);
        this.userInfo = data;
        this.loading = false;
      },
      (error) => {
        console.error('Erreur lors de la récupération des infos utilisateur', error);
        this.errorMessage = 'Impossible de récupérer les informations utilisateur';
        this.loading = false;
      }
    );
    this.fetchNextQuestion();
  }

  fetchNextQuestion(): void {
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';
    this.quizzService.getQuestions().subscribe(
      (data) => {
        console.log(data);
        this.currentQuestion = data;
        this.remainingQuestions = data.remaining_questions;
        this.loading = false;
      },
      (error) => {
        this.errorMessage = 'Erreur lors de la récupération de la question.';
        this.loading = false;
        console.error(error);
      }
    );
  }

  selectOption(option: any): void {
    this.selectedOption = option;
  }

  submitAnswer(): void {
    if (this.selectedOption) {
      const payload = {
        questionId: this.currentQuestion.id,
        answerId: this.selectedOption.id,
      };

      this.quizzService.submitAnswers(payload).subscribe(
        (response) => {
          console.log(response);

          // Traiter les résultats et points
          this.gamePoints = response.points;

          const result = response.results[0]; // Chaque requête ne retourne qu'un seul résultat
          if (result?.correct) {
            this.successMessage = result?.message; // Bonne réponse
          } else {
            this.errorMessage = result?.message; // Mauvaise réponse
          }

          this.selectedOption = null;

          // Charger la question suivante ou terminer le quiz
          if (this.remainingQuestions > 1) {
            this.fetchNextQuestion();
          } else {
            this.currentQuestion = null;
            this.successMessage = 'Quiz terminé !';
          }
        },
        (error) => {
          this.errorMessage = 'Erreur lors de la soumission de la réponse.';
          console.error(error);
        }
      );
    }
  }
}
