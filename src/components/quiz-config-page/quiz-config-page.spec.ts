import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizConfigPage } from './quiz-config-page';

describe('QuizConfigPage', () => {
  let component: QuizConfigPage;
  let fixture: ComponentFixture<QuizConfigPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizConfigPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizConfigPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
