
import { Injectable, signal } from '@angular/core';
import { GoogleGenAI, Type } from '@google/genai';
import { QuizConfiguration, QuizQuestion } from '../models/quiz.model';
import { runFlow } from 'genkit/beta/client';

@Injectable({ providedIn: 'root' })
export class AiQuizAssistant {
  loading = signal(false);
  public error = signal<string | null>(null);

  private readonly USE_MOCK_DATA = false;

  async generateQuiz(config: QuizConfiguration): Promise<QuizQuestion[] | null> {
    this.loading.set(true);
    this.error.set(null);

    try {

      if (this.USE_MOCK_DATA) {
        await this.delay(2000);
        return this.getMockQuestions();
      }

      const result = await runFlow({
        url: '/api/quiz-suggestions',
        input: {
          topic: config.topic,
          difficulty: config.difficulty,
          numQuestions: config.numQuestions,
        },
      });

      const questions = result.questions ?? [];

      if (questions.length === 0) {
        this.error.set('No questions were generated.');
        return null;
      }

      return questions;
    } catch (err) {
      console.error(err);
      this.error.set(
        'Failed to generate quiz. Please try again in a moment.'
      );
      return null;
    } finally {
      this.loading.set(false);
    }
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private getMockQuestions(): QuizQuestion[] {
    return [
      {
        question: 'What is the capital of France?',
        options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
        correctAnswer: 'Paris',
        hint: 'It is also called the City of Light.',
      },
      {
        question: 'Which planet is known as the Red Planet?',
        options: ['Earth', 'Mars', 'Jupiter', 'Venus'],
        correctAnswer: 'Mars',
        hint: 'Named after the Roman god of war.',
      },
      {
        question: 'What is 7 × 8?',
        options: ['54', '56', '58', '64'],
        correctAnswer: '56',
        hint: 'It’s less than 60.',
      }
    ];
  }
}
