import { Component, computed, input, output } from '@angular/core';
import { QuizResults } from '../../models/quiz.model';

@Component({
  selector: 'app-quiz-result',
  imports: [],
  templateUrl: './quiz-result.html',
  styleUrl: './quiz-result.css',
})
export class QuizResult {
  result = input.required<QuizResults>();
  playAgain = output<void>();

  percentage = computed(() => {
    const res = this.result();
    return res.totalQuestions > 0 ? Math.round((res.score / res.totalQuestions) * 100) : 0;
  });

  feedbackMessage = computed(() => {
    const p = this.percentage();
    if (p === 100) return 'Perfect Score! You are a genius!';
    if (p >= 80) return 'Excellent work! You really know your stuff.';
    if (p >= 50) return 'Good job! A solid performance.';
    return 'Nice try! Keep learning and try again.';
  });

  onPlayAgain() {
    this.playAgain.emit();
  }
}
