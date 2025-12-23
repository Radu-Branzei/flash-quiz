import { Routes } from '@angular/router';
import { HomePage } from '../components/home-page/home-page';
import { QuizConfigPage } from '../components/quiz-config-page/quiz-config-page';

export const routes: Routes = [
    { path: '', component: HomePage },
    { path: 'quiz-config', component: QuizConfigPage },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
