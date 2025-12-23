import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizConfig } from './quiz-config';

describe('QuizConfig', () => {
  let component: QuizConfig;
  let fixture: ComponentFixture<QuizConfig>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizConfig]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizConfig);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
