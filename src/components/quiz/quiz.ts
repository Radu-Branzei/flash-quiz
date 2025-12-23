import { Component, computed, input, output, signal } from '@angular/core';
import { QuizQuestion, QuizResults } from '../../models/quiz.model';

@Component({
  selector: 'app-quiz',
  imports: [],
  templateUrl: './quiz.html',
  styleUrl: './quiz.css',
})
export class Quiz {
  questions = input.required<QuizQuestion[]>();
  quizFinished = output<QuizResults>();

  currentIndex = signal(0);
  score = signal(0);
  selectedAnswer = signal<string | null>(null);
  feedback = signal<'correct' | 'incorrect' | ''>('');
  hintVisible = signal(false);
  answered = signal(false);

  answers: Array<{ question: string; providedAnswer: string | null; correctAnswer: string }> = [];

  currentQuestion = computed(() => this.questions()[this.currentIndex()]);
  progress = computed(() => ((this.currentIndex() + 1) / this.questions().length) * 100);

  selectAnswer(option: string) {
    if (!this.answered()) {
      this.selectedAnswer.set(option);
    }
  }

  submitAnswer() {
    if (this.selectedAnswer() === null) return;

    this.answered.set(true);
    const isCorrect = this.selectedAnswer() === this.currentQuestion().correctAnswer;

    if (isCorrect) {
      this.feedback.set('correct');
      this.score.update(s => s + 1);
    } else {
      this.feedback.set('incorrect');
    }

    this.answers.push({
      question: this.currentQuestion().question,
      providedAnswer: this.selectedAnswer(),
      correctAnswer: this.currentQuestion().correctAnswer,
    });

    setTimeout(() => this.nextQuestion(), 2000);
  }

  nextQuestion() {
    if (this.currentIndex() < this.questions().length - 1) {
      this.currentIndex.update(i => i + 1);
      this.resetQuestionState();
    } else {
      this.quizFinished.emit({ score: this.score(), totalQuestions: this.questions().length, details: this.answers });
    }
  }

  resetQuestionState() {
    this.selectedAnswer.set(null);
    this.feedback.set('');
    this.hintVisible.set(false);
    this.answered.set(false);
  }

  toggleHint() {
    this.hintVisible.set(!this.hintVisible());
  }
}
