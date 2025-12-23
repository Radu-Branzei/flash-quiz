import { TestBed } from '@angular/core/testing';

import { AiQuizAssistant } from './ai-quiz-assistant';

describe('AiQuizAssistant', () => {
  let service: AiQuizAssistant;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AiQuizAssistant);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
