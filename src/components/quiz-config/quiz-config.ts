import { Component, output, resource, signal } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { runFlow } from 'genkit/beta/client';
import { QuizConfiguration } from '../../models/quiz.model';

@Component({
  selector: 'app-quiz-config',
  imports: [LucideAngularModule],
  templateUrl: './quiz-config.html',
  styleUrl: './quiz-config.css',
})
export class QuizConfig {
  configured = output<QuizConfiguration>();

  topic = signal('');
  difficulty = signal<'easy' | 'medium' | 'hard'>('easy');
  numQuestions = signal(5);

  difficulties: ('easy' | 'medium' | 'hard')[] = ['easy', 'medium', 'hard'];

  setDifficulty(diff: 'easy' | 'medium' | 'hard') {
    this.difficulty.set(diff);
  }

  generateQuiz() {
    if (this.topic().trim() && this.numQuestions() > 0) {
      this.configured.emit({
        topic: this.topic(),
        difficulty: this.difficulty(),
        numQuestions: this.numQuestions()
      });
    }
  }
}
