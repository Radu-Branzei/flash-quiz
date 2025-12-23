import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AiQuizAssistant } from '../../services/ai-quiz-assistant';
import { QuizConfiguration, QuizQuestion, QuizResults } from '../../models/quiz.model';
import { QuizConfig as QuizConfigComponent } from '../quiz-config/quiz-config';
import { QuizResult as QuizResultComponent } from '../quiz-result/quiz-result';
import { Quiz as QuizComponent } from '../quiz/quiz';

@Component({
  selector: 'app-quiz-config-page',
  imports: [QuizConfigComponent, QuizResultComponent, QuizComponent],
  templateUrl: './quiz-config-page.html',
  styleUrl: './quiz-config-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizConfigPage {
  private aiQuizAssistant = inject(AiQuizAssistant);

  gameState = signal<'config' | 'loading' | 'playing' | 'results'>('config');
  quizQuestions = signal<QuizQuestion[]>([]);
  quizResult = signal<QuizResults | null>(null);

  apiError = this.aiQuizAssistant.error;

  async onQuizConfigured(config: QuizConfiguration) {
    this.gameState.set('loading');
    const questions = await this.aiQuizAssistant.generateQuiz(config);
    if (questions && questions.length > 0) {
      this.quizQuestions.set(questions);
      this.gameState.set('playing');
    } else {
      this.gameState.set('config');
    }
  }

  onQuizFinished(result: QuizResults) {
    this.quizResult.set(result);
    this.gameState.set('results');
  }

  onPlayAgain() {
    this.quizQuestions.set([]);
    this.quizResult.set(null);
    this.apiError.set(null);
    this.gameState.set('config');
  }
}
