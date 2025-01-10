import { Component, OnInit } from '@angular/core';
import { QuizzService } from '../quizz.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class QuizzComponent implements OnInit {
  questions: any[] = [];
  currentQuestionIndex = 0;
  selectedOption: number | null = null;
  answers: { questionId: number; answerId: number }[] = [];
  score: number | null = null;
  errorMessage = '';

  constructor(private quizzService: QuizzService) {}

  ngOnInit(): void {
    console.log('QuizzComponent initialized');
    this.loadQuestions();
    console.log(this.questions);
  }

  loadQuestions(): void {
    this.quizzService.getQuestions().subscribe(
      (data) => {
        this.questions = [data];
        console.log(this.questions);
      },
      (error) => {
        this.errorMessage = 'Erreur lors de la récupération des questions.';
        console.error(error);
      }
    );
  }

  selectOption(index: number): void {
    this.selectedOption = index;
  }

  nextQuestion(): void {
    if (this.selectedOption !== null) {
      const currentQuestion = this.questions[this.currentQuestionIndex];
      this.answers.push({
        questionId: currentQuestion.id,
        answerId: currentQuestion.options[this.selectedOption].id // Utilisez l'ID de l'option
      });
      this.selectedOption = null;
      this.currentQuestionIndex++;
  
      // Vérifiez si toutes les questions ont été répondues
      if (this.currentQuestionIndex >= this.questions.length) {
        this.submitAnswers();
      }
    }
  }
  

  submitAnswers(): void {
    this.quizzService.submitAnswers(this.answers).subscribe(
      (response) => {
        this.score = response.score;
      },
      (error) => {
        this.errorMessage = 'Erreur lors de la soumission des réponses.';
        console.error(error);
      }
    );
  }
}
