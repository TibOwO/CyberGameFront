import { Component, inject, OnInit } from '@angular/core';
import { QuizzService } from '../quizz.service';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr'; // Importer ToastrService et ToastrModule
import { QuizzModule } from './quizz.module'; // Importer QuizzModule
import { AppModule } from '../../app.module';
import { trigger, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css'],
  standalone: true,
  imports: [QuizzModule],
  providers: [QuizzService, UserService, ToastrService],
  animations: [
    trigger('flyInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.3s ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('0.3s ease-out', style({ opacity: 0 })),
      ]),
    ]),
  ],

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
  questions: any[] = [];
  questionIndex: number = 0;
  noMoreQuestions: boolean = false;

  constructor(
    private quizzService: QuizzService,
    private userService: UserService,
    private toastr: ToastrService, // Injection de ToastrService
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.getUserInfo().subscribe(
      (data) => {
        this.userInfo = data;
        this.loading = false;
      },
      (error) => {
        console.error('Erreur lors de la récupération des infos utilisateur', error);
        this.errorMessage = 'Impossible de récupérer les informations utilisateur';
        this.loading = false;
      }
    );
    this.fetchQuestions();
  }

  fetchQuestions(): void {
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';
    this.quizzService.getQuestions().subscribe(
      (data) => {
        console.log(data);
        this.questions = data.questions;
        this.remainingQuestions = data.remaining_questions;
        this.loading = false;
        this.loadNextQuestion();
      },
      (error) => {
        this.errorMessage = 'Erreur lors de la récupération des questions.';
        this.loading = false;
        console.error(error);
      }
    );
  }

  loadNextQuestion(): void {
    if (this.questionIndex < this.questions.length) {
      this.currentQuestion = this.questions[this.questionIndex];
    } else {
      this.currentQuestion = null;
      this.successMessage = 'Quiz terminé !';
      this.showSuccess('Quiz terminé !');
      this.noMoreQuestions = true;
    }
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
          this.gamePoints = response.points;

          const result = response.results[0]; // Chaque requête ne retourne qu'un seul résultat
          if (result?.correct) {
            this.showSuccess(result?.message); // Notification de succès
          } else {
            this.showError(result?.message); // Notification d'erreur
          }

          this.selectedOption = null;
          this.questionIndex++;
          this.loadNextQuestion(); // Charger la question suivante ou terminer le quiz
        },
        (error) => {
          this.errorMessage = 'Erreur lors de la soumission de la réponse.';
          console.error(error);
          this.showError('Erreur lors de la soumission de la réponse.');
        }
      );
    }
  }

  // Fonction pour afficher la notification de succès
  showSuccess(message: string): void {
    this.toastr.success(message, 'Succès', { timeOut: 3000 });
  }

  // Fonction pour afficher la notification d'erreur
  showError(message: string): void {
    this.toastr.error(message, 'Erreur', { timeOut: 3000 });
  }

  backToMenu(): void {
    this.router.navigate([`/game`]);
  }
}
